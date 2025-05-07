import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {AuthUseCase} from '@application/auth.use.case';

export const authGuard: CanActivateFn = (route, state) => {
   const authUseCase = inject(AuthUseCase);
   return authUseCase.isAuthenticated();
};
