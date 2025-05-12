import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dynamic-form',
    data: {},
    canActivate: [authGuard],
    loadChildren: () =>
      import('./presentation/features/form-renderer/form-renderer.module').then(( module ) => module.FormRendererModule),
  },
  // { path: '**', redirectTo: 'panel/home' },
  // { path: '',   redirectTo: '/', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];
