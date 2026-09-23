import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { Dashboard } from '@features/dashboard/dashboard';
import { permissionGuard } from '@presentation/core/guards/permission-guard';
import { UserPermissionEnum } from '@domain/user/enums/user-permission.enum';
import { Shell } from './presentation/shell/shell';

export const routes: Routes = [
    {
        path: '',
        component: Shell,
        children: [
            { path: '', data: { permissions: [] }, canActivate: [authGuard, permissionGuard], component: Dashboard },
            {
                path: 'forms/:id/edit',
                data: { permissions: [UserPermissionEnum.FormCreate, UserPermissionEnum.FormEdit, UserPermissionEnum.FormDelete] },
                canActivate: [authGuard, permissionGuard],
                loadComponent: () => import('@features/form-designer/form-designer').then((m) => m.FormDesigner)
            },
            {
                path: 'form-list',
                data: { permissions: [] },
                canActivate: [authGuard, permissionGuard],
                loadComponent: () => import('@features/form-list/form-list').then((m) => m.FormList)
            },
            {
                path: 'forms/:id/fill',
                data: { permissions: [UserPermissionEnum.FormGenerate, UserPermissionEnum.FormCreate] },
                canActivate: [authGuard, permissionGuard],
                loadComponent: () => import('@features/form-renderer/form-renderer').then((m) => m.FormRenderer)
            },
            {
                path: 'account',
                data: { permissions: [] },
                canActivate: [authGuard, permissionGuard],
                loadComponent: () => import('@features/account/account').then((m) => m.Account)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('@features/auth/login/login').then((m) => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('@features/auth/register/register').then((m) => m.Register)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('@features/auth/forgot-password/forgot-password').then((m) => m.ForgotPassword)
    },
    {
        path: 'reset-password',
        loadComponent: () => import('@features/auth/reset-password/reset-password').then((m) => m.ResetPassword)
    },
    {
        path: 'unauthorized',
        loadComponent: () => import('@features/unauthorized/unauthorized').then((m) => m.Unauthorized)
    },
    {
        path: 'notfound',
        loadComponent: () => import('@features/not-found/not-found').then((m) => m.NotFound)
    },
    { path: '**', redirectTo: '/notfound' }
];
