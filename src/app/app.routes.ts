import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { AppLayout } from '@presentation/layout/component/app.layout';
import { Dashboard } from '@features/dashboard/dashboard';
import { Notfound } from '@features/notfound/notfound';
import { Landing } from '@features/landing/landing';
import { LoginComponent } from '@presentation/features/auth/login/component/login.component';
import { permissionGuard } from '@presentation/core/guards/permission-guard';
import { UserPermissionEnum } from '@domain/user/enums/user-permission.enum';
import { Unauthorized } from './presentation/features/unauthorized/unauthorized';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            {
                path: 'form-list',
                data: { permissions: [] },
                canActivate: [authGuard, permissionGuard],
                loadChildren: () => import('./presentation/features/form-list/form-list.module').then((module) => module.FormListModule)
            },
            {
                path: 'dynamic-form',
                data: { permissions: [UserPermissionEnum.FormGenerate, UserPermissionEnum.FormCreate] },
                canActivate: [authGuard, permissionGuard],
                loadChildren: () => import('./presentation/features/form-renderer/form-renderer.module').then((module) => module.FormRendererModule)
            },
            {
                path: '',
                data: { permissions: [UserPermissionEnum.FormCreate, UserPermissionEnum.FormEdit, UserPermissionEnum.FormDelete] },
                canActivate: [authGuard, permissionGuard],
                loadChildren: () => import('./presentation/features/form-designer/form-designer.module').then((module) => module.FormDesignerModule)
            }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'login', component: LoginComponent },
    { path: 'unauthorized', component: Unauthorized },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
    // { path: '**', redirectTo: 'panel/home' },
    // { path: '',   redirectTo: '/', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent },
];
