import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roles: string[] = [];

  constructor() {
  }

  setRoles(roles: string[]) {
    this.roles = roles;
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.roles.includes(role));
  }
}
