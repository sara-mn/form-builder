import { TestBed } from '@angular/core/testing';
import { CanActivateFn, provideRouter, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthState } from '../services/auth-state';
import { AuthFacade } from '@app/presentation/features/auth/services/auth.facade';
import { User } from '@app/domain/user/models/user.model';

describe('authGuard', () => {
    let authState: AuthState;
    let authFacade: Pick<AuthFacade, 'restoreSession'>;

    const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => authGuard(...guardParameters));

    beforeEach(() => {
        authFacade = { restoreSession: vi.fn().mockResolvedValue(undefined) };

        TestBed.configureTestingModule({
            providers: [provideRouter([]), { provide: AuthFacade, useValue: authFacade }]
        });

        authState = TestBed.inject(AuthState);
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });

    it('should allow activation if session is already restored and user is authenticated', async () => {
        authState.setSessionRestored(true);
        authState.setUser({ id: 'u1' } as User);

        const result = await executeGuard({} as any, {} as any);

        expect(result).toBe(true);
        expect(authFacade.restoreSession).not.toHaveBeenCalled();
    });

    it('should redirect to /login if session is restored but user is not authenticated', async () => {
        authState.setSessionRestored(true);

        const result = await executeGuard({} as any, {} as any);

        expect((result as any).toString()).toBe('/login');
    });

    it('should call restoreSession if the session has not been restored yet', async () => {
        authState.setSessionRestored(false);
        (authFacade.restoreSession as ReturnType<typeof vi.fn>).mockImplementation(async () => {
            authState.setUser({ id: 'u1' } as User);
            authState.setSessionRestored(true);
        });

        const result = await executeGuard({} as any, {} as any);

        expect(authFacade.restoreSession).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    it('should redirect to /login if restoreSession completes without authenticating the user', async () => {
        authState.setSessionRestored(false);
        (authFacade.restoreSession as ReturnType<typeof vi.fn>).mockImplementation(async () => {
            authState.setSessionRestored(true);
        });

        const result = await executeGuard({} as any, {} as any);

        expect((result as any).toString()).toBe('/login');
    });
});
