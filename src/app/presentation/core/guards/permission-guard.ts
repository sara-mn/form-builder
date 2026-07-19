import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../services/auth-state';
import { inject } from '@angular/core';
import { UserPermissionEnum } from '@app/domain/user/enums/user-permission.enum';

export const permissionGuard: CanActivateFn = (route, state) => {
    const authState = inject(AuthState);
    const router = inject(Router);

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
