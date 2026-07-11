import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthFacade } from '@features/auth/services/auth.facade';

export const authGuard: CanActivateFn = (route, state) => {
  const authFacade = inject(AuthFacade);
  return true; //authFacade.isAuthenticated$;
};
