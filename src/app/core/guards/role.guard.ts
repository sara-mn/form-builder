import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {RoleService} from '@core/services/role.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const roleService = inject(RoleService),
    router = inject(Router),
    expectedRoles = route.data['roles'] as string[];

  if (!roleService?.hasAnyRole(expectedRoles)) {
    router.navigate(['/unauthorized']).then();
    return false;
  }
  return true;
};
