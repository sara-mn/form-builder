import { TestBed } from '@angular/core/testing';
import { AuthState } from './auth-state';
import { User } from '@app/domain/user/models/user.model';
import { UserRoleEnum } from '@domain/user/enums/user-role.enum';
import { UserPermissionEnum } from '@app/domain/user/enums/user-permission.enum';

describe('AuthState', () => {
    let service: AuthState;

    function makeUser(roles: UserRoleEnum[]): User {
        return {
            id: 'u1',
            email: 'user@example.com',
            name: 'Test User',
            roles,
            profile: { mobile: '' } as any
        };
    }

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthState);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should start with no user and isAuthenticated false', () => {
        expect(service.currentUser()).toBeNull();
        expect(service.isAuthenticated()).toBe(false);
    });

    it('should start with sessionRestored false', () => {
        expect(service.sessionRestored()).toBe(false);
    });

    it('should start with an empty permissions list', () => {
        expect(service.permissions()).toEqual([]);
    });

    describe('setUser', () => {
        it('should set the current user and make isAuthenticated true', () => {
            const user = makeUser([UserRoleEnum.Viewer]);
            service.setUser(user);

            expect(service.currentUser()).toEqual(user);
            expect(service.isAuthenticated()).toBe(true);
        });
    });

    describe('clearUser', () => {
        it('should clear the current user and make isAuthenticated false', () => {
            service.setUser(makeUser([UserRoleEnum.Admin]));
            service.clearUser();

            expect(service.currentUser()).toBeNull();
            expect(service.isAuthenticated()).toBe(false);
        });
    });

    describe('setSessionRestored', () => {
        it('should update the sessionRestored flag', () => {
            service.setSessionRestored(true);
            expect(service.sessionRestored()).toBe(true);
        });
    });

    describe('permissions', () => {
        it('should return all permissions for the Admin role', () => {
            service.setUser(makeUser([UserRoleEnum.Admin]));

            const perms = service.permissions();
            expect(perms).toContain(UserPermissionEnum.FormView);
            expect(perms).toContain(UserPermissionEnum.FormCreate);
            expect(perms).toContain(UserPermissionEnum.FormEdit);
            expect(perms).toContain(UserPermissionEnum.FormDelete);
            expect(perms).toContain(UserPermissionEnum.FormGenerate);
            expect(perms).toContain(UserPermissionEnum.UserManage);
        });

        it('should return limited permissions for the Editor role', () => {
            service.setUser(makeUser([UserRoleEnum.Editor]));

            const perms = service.permissions();
            expect(perms).toContain(UserPermissionEnum.FormCreate);
            expect(perms).not.toContain(UserPermissionEnum.FormDelete);
            expect(perms).not.toContain(UserPermissionEnum.UserManage);
        });

        it('should return only FormView for the Viewer role', () => {
            service.setUser(makeUser([UserRoleEnum.Viewer]));

            expect(service.permissions()).toEqual([UserPermissionEnum.FormView]);
        });

        it('should merge permissions across multiple roles without duplicates', () => {
            service.setUser(makeUser([UserRoleEnum.Viewer, UserRoleEnum.Editor]));

            const perms = service.permissions();
            const formViewCount = perms.filter((p) => p === UserPermissionEnum.FormView).length;
            expect(formViewCount).toBe(1);
            expect(perms).toContain(UserPermissionEnum.FormCreate);
        });
    });

    describe('hasPermission', () => {
        it('should return false when no user is set', () => {
            expect(service.hasPermission(UserPermissionEnum.FormView)).toBe(false);
        });

        it('should return true when the user has the permission via their role', () => {
            service.setUser(makeUser([UserRoleEnum.Editor]));
            expect(service.hasPermission(UserPermissionEnum.FormCreate)).toBe(true);
        });

        it('should return false when the user does not have the permission', () => {
            service.setUser(makeUser([UserRoleEnum.Viewer]));
            expect(service.hasPermission(UserPermissionEnum.FormDelete)).toBe(false);
        });
    });
});
