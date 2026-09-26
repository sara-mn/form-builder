import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../services/auth-state';
import { inject } from '@angular/core';
import { UserPermissionEnum } from '@app/domain/user/enums/user-permission.enum';
import { AuthFacade } from '@app/presentation/features/auth/services/auth.facade';

export const permissionGuard: CanActivateFn = async (route, state) => {
    const authState = inject(AuthState);
    const router = inject(Router);
    const authFacade = inject(AuthFacade);

    if (!authState.sessionRestored()) {
        await authFacade.restoreSession();
    }

    const requiredPermissions = route.data['permissions'] as UserPermissionEnum[] | undefined;
    if (!requiredPermissions || requiredPermissions.length === 0) {
        return true;
    }

    const hasAccess = requiredPermissions.every((p) => authState.hasPermission(p));

    if (!hasAccess) {
        return router.createUrlTree(['/unauthorized']);
    }

    return true;
};
