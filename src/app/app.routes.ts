import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dynamic-form',
    data: {},
    canActivate: [authGuard],
    loadChildren: () =>
      import('./presentation/features/form-renderer/form-renderer.module').then(( module ) => module.FormRendererModule),
  }, {
    path: 'create-form',
    data: {},
    canActivate: [authGuard],
    loadChildren: () =>
      import('./presentation/features/form-designer/form-designer.module').then(( module ) => module.FormDesignerModule),
  },
  // { path: '**', redirectTo: 'panel/home' },
  // { path: '',   redirectTo: '/', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];
