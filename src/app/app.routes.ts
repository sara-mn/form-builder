import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { Dashboard } from '@features/dashboard/dashboard';
import { Notfound } from '@features/notfound/notfound';
import { Landing } from '@features/landing/landing';
import { Login } from '@app/presentation/features/auth/login/login';
import { permissionGuard } from '@presentation/core/guards/permission-guard';
import { UserPermissionEnum } from '@domain/user/enums/user-permission.enum';
import { Unauthorized } from './presentation/features/unauthorized/unauthorized';
import { Shell } from './presentation/shell/shell';
import { Register } from './presentation/features/auth/register/register';

export const routes: Routes = [
    {
        path: '',
        component: Shell,
        children: [
            { path: '', component: Dashboard },
            {
                path: 'forms/:id/edit',
                data: { permissions: [UserPermissionEnum.FormCreate, UserPermissionEnum.FormEdit, UserPermissionEnum.FormDelete] },
                canActivate: [authGuard, permissionGuard],
                loadComponent: () => import('./presentation/features/form-designer/components/form-designer-page/form-designer-page').then((m) => m.FormDesignerPage)
            },
            {
                path: 'form-list',
                data: { permissions: [] },
                canActivate: [authGuard, permissionGuard],
                loadComponent: () => import('./presentation/features/form-list/components/form-list-page/form-list-page').then((m) => m.FormListPage)
            },
            {
                path: 'forms/:id/fill',
                data: { permissions: [UserPermissionEnum.FormGenerate, UserPermissionEnum.FormCreate] },
                canActivate: [authGuard, permissionGuard],
                loadComponent: () => import('./presentation/features/form-renderer/components/form-renderer-page/form-renderer-page').then((m) => m.FormRendererPage)
            }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'unauthorized', component: Unauthorized },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
    // { path: '**', redirectTo: 'panel/home' },
    // { path: '',   redirectTo: '/', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent },
];
