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

    it('should require FormEdit for the form designer route', () => {
        const designerRoute = children.find((r) => r.path === 'forms/:id/edit');
        expect(designerRoute?.data?.['permissions']).toEqual([UserPermissionEnum.FormEdit]);
    });

    it('should require SubmissionCreate for the form renderer route', () => {
        const rendererRoute = children.find((r) => r.path === 'forms/:id/fill');
        expect(rendererRoute?.data?.['permissions']).toEqual([UserPermissionEnum.SubmissionCreate]);
    });

    it('should require FormView for the dashboard route', () => {
        const dashboardRoute = children.find((r) => r.path === '');
        expect(dashboardRoute?.data?.['permissions']).toEqual([UserPermissionEnum.FormView]);
    });

    it('should require FormView for the form-list route', () => {
        const listRoute = children.find((r) => r.path === 'form-list');
        expect(listRoute?.data?.['permissions']).toEqual([UserPermissionEnum.FormView]);
    });

    it('should require SubmissionView for the submissions route', () => {
        const submissionsRoute = children.find((r) => r.path === 'forms/:id/submissions');
        expect(submissionsRoute?.data?.['permissions']).toEqual([UserPermissionEnum.SubmissionView]);
    });

    it('should name at most one permission per route, so "all of" versus "any of" never matters', () => {
        for (const child of children) {
            expect((child.data?.['permissions'] as UserPermissionEnum[]).length).toBeLessThanOrEqual(1);
        }
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
