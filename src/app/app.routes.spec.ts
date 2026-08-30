import { routes } from './app.routes';
import { authGuard } from '@core/guards/auth.guard';
import { permissionGuard } from '@presentation/core/guards/permission-guard';
import { UserPermissionEnum } from '@domain/user/enums/user-permission.enum';

describe('app routes', () => {
    const shellRoute = routes.find((r) => r.path === '');
    const children = shellRoute?.children ?? [];

    it('should protect every child route under Shell with both authGuard and permissionGuard', () => {
        for (const child of children) {
            expect(child.canActivate).toContain(authGuard);
            expect(child.canActivate).toContain(permissionGuard);
        }
    });

    it('should require FormCreate, FormEdit, or FormDelete permissions for the form designer route', () => {
        const designerRoute = children.find((r) => r.path === 'forms/:id/edit');
        expect(designerRoute?.data?.['permissions']).toEqual(expect.arrayContaining([UserPermissionEnum.FormCreate, UserPermissionEnum.FormEdit, UserPermissionEnum.FormDelete]));
    });

    it('should require FormGenerate or FormCreate permissions for the form renderer route', () => {
        const rendererRoute = children.find((r) => r.path === 'forms/:id/fill');
        expect(rendererRoute?.data?.['permissions']).toEqual(expect.arrayContaining([UserPermissionEnum.FormGenerate, UserPermissionEnum.FormCreate]));
    });

    it('should require no specific permissions for the dashboard route (any authenticated user)', () => {
        const dashboardRoute = children.find((r) => r.path === '');
        expect(dashboardRoute?.data?.['permissions']).toEqual([]);
    });

    it('should require no specific permissions for the form-list route (any authenticated user)', () => {
        const listRoute = children.find((r) => r.path === 'form-list');
        expect(listRoute?.data?.['permissions']).toEqual([]);
    });

    it('should have public routes for login, register, and unauthorized without guards', () => {
        const publicPaths = ['login', 'register', 'unauthorized', 'notfound'];
        for (const path of publicPaths) {
            const route = routes.find((r) => r.path === path);
            expect(route).toBeTruthy();
            expect(route?.canActivate).toBeUndefined();
        }
    });

    it('should redirect unmatched routes to /notfound', () => {
        const wildcard = routes.find((r) => r.path === '**');
        expect(wildcard?.redirectTo).toBe('/notfound');
    });
});
