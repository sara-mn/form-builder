import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, provideRouter, RouterStateSnapshot } from '@angular/router';
import { permissionGuard } from './permission-guard';
import { AuthState } from '../services/auth-state';
import { AuthFacade } from '@app/presentation/features/auth/services/auth.facade';
import { UserPermissionEnum } from '@app/domain/user/enums/user-permission.enum';

describe('permissionGuard', () => {
    let authState: AuthState;
    let authFacade: Pick<AuthFacade, 'restoreSession'>;

    const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => permissionGuard(...guardParameters));

    beforeEach(() => {
        authFacade = { restoreSession: vi.fn().mockResolvedValue(undefined) };

        TestBed.configureTestingModule({
            providers: [provideRouter([]), { provide: AuthFacade, useValue: authFacade }]
        });
        authState = TestBed.inject(AuthState);
    });

    function makeRoute(permissions?: UserPermissionEnum[]): ActivatedRouteSnapshot {
        return { data: { permissions } } as unknown as ActivatedRouteSnapshot;
    }

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });

    it('should allow activation when the route has no permissions data', async () => {
        authState.setSessionRestored(true);

        const result = await executeGuard(makeRoute(undefined), {} as RouterStateSnapshot);
        expect(result).toBe(true);
    });

    it('should allow activation when the route has an empty permissions array', async () => {
        authState.setSessionRestored(true);

        const result = await executeGuard(makeRoute([]), {} as RouterStateSnapshot);
        expect(result).toBe(true);
    });

    it('should allow activation when the user has all required permissions', async () => {
        authState.setSessionRestored(true);
        vi.spyOn(authState, 'hasPermission').mockReturnValue(true);

        const result = await executeGuard(makeRoute([UserPermissionEnum.FormView]), {} as RouterStateSnapshot);

        expect(result).toBe(true);
    });

    it('should redirect to /unauthorized when the user is missing a required permission', async () => {
        authState.setSessionRestored(true);
        vi.spyOn(authState, 'hasPermission').mockReturnValue(false);

        const result = await executeGuard(makeRoute([UserPermissionEnum.UserManage]), {} as RouterStateSnapshot);

        expect((result as any).toString()).toBe('/unauthorized');
    });

    it('should require every listed permission, not just one', async () => {
        authState.setSessionRestored(true);
        vi.spyOn(authState, 'hasPermission').mockImplementation((p: UserPermissionEnum) => p === UserPermissionEnum.FormView);

        const result = await executeGuard(makeRoute([UserPermissionEnum.FormView, UserPermissionEnum.FormDelete]), {} as RouterStateSnapshot);

        expect((result as any).toString()).toBe('/unauthorized');
    });

    it('awaits restoreSession before checking permissions when the session has not been restored yet', async () => {
        let resolveRestoreSession!: () => void;
        (authFacade.restoreSession as ReturnType<typeof vi.fn>).mockReturnValue(
            new Promise<void>((resolve) => {
                resolveRestoreSession = () => {
                    authState.setSessionRestored(true);
                    resolve();
                };
            })
        );
        vi.spyOn(authState, 'hasPermission').mockReturnValue(true);

        const resultPromise = executeGuard(makeRoute([UserPermissionEnum.FormView]), {} as RouterStateSnapshot);

        expect(authFacade.restoreSession).toHaveBeenCalledTimes(1);

        resolveRestoreSession();
        const result = await resultPromise;

        expect(result).toBe(true);
    });

    it('does not call restoreSession again when the session was already restored', async () => {
        authState.setSessionRestored(true);
        vi.spyOn(authState, 'hasPermission').mockReturnValue(true);

        await executeGuard(makeRoute([UserPermissionEnum.FormView]), {} as RouterStateSnapshot);

        expect(authFacade.restoreSession).not.toHaveBeenCalled();
    });
});
