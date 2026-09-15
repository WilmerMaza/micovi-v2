import { Routes } from '@angular/router';
import { IgnoreLoginGuard } from './core/guard/ignoreLoginGuard';
import { JwtGuard } from './core/guard/JwtGuard';
import { HOME_ROUTES } from './features/home/home.routes';
import { SETTINGS_ROUTES } from './features/settings/settings.routes';
import { Layout as ConfigLayout } from './layout/config/layout';
import { Layout as HomeLayout } from './layout/home/layout';
import { LoginComponent } from './view/pages/auth/login/login.component';
import { Page404Component } from './view/pages/page404/page404.component';
import { Page500Component } from './view/pages/page500/page500.component';

export const routes: Routes = [
  // Landing pública (cuando no esté logueado)
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   loadComponent: () =>
  //     import('./view/pages/landing/landing-page.component').then(
  //       (m) => m.LandingPageComponent
  //     ),
  // },

  // Auth pública
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

  // Shell home: layout visible de inmediato; guard solo en contenido hijo
  {
    path: '',
    component: HomeLayout,
    data: { title: 'Home', showMenuToggle: true },
    children: [
      {
        path: '',
        canActivate: [JwtGuard],
        children: HOME_ROUTES,
      },
    ],
  },

  {
    path: 'configuration',
    component: ConfigLayout,
    data: { title: 'Configuración', showMenuToggle: false },
    children: [
      {
        path: '',
        canActivate: [JwtGuard],
        children: SETTINGS_ROUTES,
      },
    ],
  },

  // Status
  { path: '404', component: Page404Component, data: { title: 'Page 404' } },
  { path: '500', component: Page500Component, data: { title: 'Page 500' } },

  // Catch-all: llevar a 404
  { path: '**', redirectTo: '404' },
];
