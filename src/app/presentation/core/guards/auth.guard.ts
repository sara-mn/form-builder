import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthState } from '../services/auth-state';
import { AuthFacade } from '@app/presentation/features/auth/services/auth.facade';

export const authGuard: CanActivateFn = async () => {
    const authState = inject(AuthState);
    const authFacade = inject(AuthFacade);
    const router = inject(Router);

    if (!authState.sessionRestored()) {
        await authFacade.restoreSession();
    }

    return authState.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
