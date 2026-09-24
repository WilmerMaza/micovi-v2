import { Routes } from '@angular/router';
import { IgnoreLoginGuard } from './core/guard/ignoreLoginGuard';
import { JwtGuard } from './core/guard/JwtGuard';
import { permissionChildGuard } from './core/permissions/permission.guard';
import { HOME_ROUTES } from './features/home/home.routes';
import { Layout as HomeLayout } from './layout/home/layout';
import { LoginComponent } from './view/pages/auth/login/login.component';
import { Page404Component } from './view/pages/page404/page404.component';
import { Page500Component } from './view/pages/page500/page500.component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [IgnoreLoginGuard],
    component: LoginComponent,
  },
  {
    path: 'registers',
    canActivate: [IgnoreLoginGuard],
    loadComponent: () =>
      import('./view/pages/auth/register/view/register').then((m) => m.Register),
  },

  // Shell visible de inmediato; JwtGuard + permisos solo en el contenido hijo
  {
    path: '',
    component: HomeLayout,
    data: { title: 'Home', showMenuToggle: true },
    children: [
      {
        path: '',
        canActivate: [JwtGuard],
        canActivateChild: [permissionChildGuard],
        children: HOME_ROUTES,
      },
    ],
  },

  { path: '404', component: Page404Component, data: { title: 'Page 404' } },
  { path: '500', component: Page500Component, data: { title: 'Page 500' } },

  { path: '**', redirectTo: '404' },
];
