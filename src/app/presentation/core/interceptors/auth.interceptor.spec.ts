import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { of, throwError, firstValueFrom } from 'rxjs';
import { authInterceptor } from './auth.interceptor';
import { AuthFacade } from '@app/presentation/features/auth/services/auth.facade';

describe('authInterceptor', () => {
    let authFacade: Pick<AuthFacade, 'getAccessToken' | 'refreshAccessToken' | 'logout'>;
    let router: Router;

    function runInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
        return TestBed.runInInjectionContext(() => authInterceptor(req, next));
    }

    beforeEach(() => {
        authFacade = {
            getAccessToken: vi.fn().mockReturnValue('token123'),
            refreshAccessToken: vi.fn(),
            logout: vi.fn().mockResolvedValue(undefined)
        };

        TestBed.configureTestingModule({
            providers: [provideRouter([]), { provide: AuthFacade, useValue: authFacade }]
        });

        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(runInterceptor).toBeTruthy();
    });

    it('should attach an Authorization header when a token exists and the request is not an auth endpoint', async () => {
        const req = new HttpRequest('GET', '/api/forms');
        const next: HttpHandlerFn = vi.fn().mockReturnValue(of({} as any));

        await firstValueFrom(runInterceptor(req, next));

        const forwardedReq = (next as ReturnType<typeof vi.fn>).mock.calls[0][0] as HttpRequest<unknown>;
        expect(forwardedReq.headers.get('Authorization')).toBe('Bearer token123');
    });

    it('should not attach an Authorization header for auth endpoints', async () => {
        const req = new HttpRequest('POST', '/api/auth/login', {});
        const next: HttpHandlerFn = vi.fn().mockReturnValue(of({} as any));

        await firstValueFrom(runInterceptor(req, next));

        const forwardedReq = (next as ReturnType<typeof vi.fn>).mock.calls[0][0] as HttpRequest<unknown>;
        expect(forwardedReq.headers.has('Authorization')).toBe(false);
    });

    it('should pass through non-401 errors unchanged', async () => {
        const req = new HttpRequest('GET', '/api/forms');
        const error = new HttpErrorResponse({ status: 500 });
        const next: HttpHandlerFn = vi.fn().mockReturnValue(throwError(() => error));

        await expect(firstValueFrom(runInterceptor(req, next))).rejects.toBe(error);
        expect(authFacade.refreshAccessToken).not.toHaveBeenCalled();
    });

    it('should pass through 401 errors from auth endpoints unchanged', async () => {
        const req = new HttpRequest('POST', '/api/auth/login', {});
        const error = new HttpErrorResponse({ status: 401 });
        const next: HttpHandlerFn = vi.fn().mockReturnValue(throwError(() => error));

        await expect(firstValueFrom(runInterceptor(req, next))).rejects.toBe(error);
        expect(authFacade.refreshAccessToken).not.toHaveBeenCalled();
    });

    it('should retry the request with a new token on a 401 when refresh succeeds', async () => {
        const req = new HttpRequest('GET', '/api/forms');
        const error = new HttpErrorResponse({ status: 401 });
        (authFacade.refreshAccessToken as ReturnType<typeof vi.fn>).mockResolvedValue('newToken456');

        let callCount = 0;
        const next: HttpHandlerFn = vi.fn().mockImplementation(() => {
            callCount++;
            return callCount === 1 ? throwError(() => error) : of({ status: 200 } as any);
        });

        const result = await firstValueFrom(runInterceptor(req, next));

        expect(authFacade.refreshAccessToken).toHaveBeenCalled();
        expect(callCount).toBe(2);
        const retriedReq = (next as ReturnType<typeof vi.fn>).mock.calls[1][0] as HttpRequest<unknown>;
        expect(retriedReq.headers.get('Authorization')).toBe('Bearer newToken456');
        expect(result).toEqual({ status: 200 });
    });

    it('should log out and navigate to /login on a 401 when refresh fails', async () => {
        const req = new HttpRequest('GET', '/api/forms');
        const error = new HttpErrorResponse({ status: 401 });
        (authFacade.refreshAccessToken as ReturnType<typeof vi.fn>).mockResolvedValue(null);
        const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

        const next: HttpHandlerFn = vi.fn().mockReturnValue(throwError(() => error));

        await expect(firstValueFrom(runInterceptor(req, next))).rejects.toBe(error);

        expect(authFacade.logout).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
});
