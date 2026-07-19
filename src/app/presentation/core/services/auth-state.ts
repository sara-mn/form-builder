import { computed, Service, signal } from '@angular/core';
import { ROLE_PERMISSIONS, UserPermissionEnum } from '@app/domain';
import { User } from '@app/domain/user/models/user.model';

@Service()
export class AuthState {
    private readonly _currentUser = signal<User | null>(null);
    readonly currentUser = this._currentUser.asReadonly();

    readonly isAuthenticated = computed(() => !!this._currentUser());
    readonly permissions = computed<UserPermissionEnum[]>(() => {
        const user = this._currentUser();
        if (!user) {
            return [];
        }
        const permitionSet: Set<UserPermissionEnum> = new Set<UserPermissionEnum>();
        user.roles.forEach((role) => {
            (ROLE_PERMISSIONS[role] || []).forEach((permission: UserPermissionEnum) => {
                permitionSet.add(permission);
            });
        });
        return Array.from(permitionSet);
    });

    setUser(user: User): void {
        this._currentUser.set(user);
    }

    clearUser(): void {
        this._currentUser.set(null);
    }

    hasPermission(permission: UserPermissionEnum): boolean {
        return this.permissions().includes(permission);
    }
}
