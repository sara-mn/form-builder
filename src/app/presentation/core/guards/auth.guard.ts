import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthFacadeService } from '@features/auth/auth-facade.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authFacadeService = inject(AuthFacadeService);
  return true; //authFacadeService.isAuthenticated$;
};
