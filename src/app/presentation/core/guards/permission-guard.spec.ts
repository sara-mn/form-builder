import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, provideRouter, RouterStateSnapshot } from '@angular/router';
import { permissionGuard } from './permission-guard';
import { AuthState } from '../services/auth-state';
import { UserPermissionEnum } from '@app/domain/user/enums/user-permission.enum';

describe('permissionGuard', () => {
    let authState: AuthState;

    const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => permissionGuard(...guardParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter([])]
        });
        authState = TestBed.inject(AuthState);
    });

    function makeRoute(permissions?: UserPermissionEnum[]): ActivatedRouteSnapshot {
        return { data: { permissions } } as unknown as ActivatedRouteSnapshot;
    }

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });

    it('should allow activation when the route has no permissions data', () => {
        const result = executeGuard(makeRoute(undefined), {} as RouterStateSnapshot);
        expect(result).toBe(true);
    });

    it('should allow activation when the route has an empty permissions array', () => {
        const result = executeGuard(makeRoute([]), {} as RouterStateSnapshot);
        expect(result).toBe(true);
    });

    it('should allow activation when the user has all required permissions', () => {
        vi.spyOn(authState, 'hasPermission').mockReturnValue(true);

        const result = executeGuard(makeRoute([UserPermissionEnum.FormView]), {} as RouterStateSnapshot);

        expect(result).toBe(true);
    });

    it('should redirect to /unauthorized when the user is missing a required permission', () => {
        vi.spyOn(authState, 'hasPermission').mockReturnValue(false);

        const result = executeGuard(makeRoute([UserPermissionEnum.UserManage]), {} as RouterStateSnapshot);

        expect((result as any).toString()).toBe('/unauthorized');
    });

    it('should require every listed permission, not just one', () => {
        vi.spyOn(authState, 'hasPermission').mockImplementation((p: UserPermissionEnum) => p === UserPermissionEnum.FormView);

        const result = executeGuard(makeRoute([UserPermissionEnum.FormView, UserPermissionEnum.FormDelete]), {} as RouterStateSnapshot);

        expect((result as any).toString()).toBe('/unauthorized');
    });
});
