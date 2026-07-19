import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthState } from '../services/auth-state';

export const authGuard: CanActivateFn = (route, state) => {
    const authState = inject(AuthState);
    const router = inject(Router);

    if (authState.isAuthenticated()) {
        return true;
    }

    return router.createUrlTree(['/login']);
};
