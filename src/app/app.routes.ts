import { Routes } from '@angular/router';
import { IgnoreLoginGuard } from './core/guard/ignoreLoginGuard';
import { JwtGuard } from './core/guard/JwtGuard';
import { Layout as ConfigLayout } from './layout/config/layout';
import { Layout as HomeLayout } from './layout/home/layout';
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
    loadComponent: () =>
      import('./view/pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'registers',
    canActivate: [IgnoreLoginGuard],
    loadComponent: () =>
      import('./view/pages/auth/register/view/register').then((m) => m.Register),
  },

  // Shell protegido, sólo cuando está logueado
  {
    path: '',
    canActivate: [JwtGuard],
    children: [
      {
        path: '',
        component: HomeLayout,
        data: { title: 'Home', showMenuToggle: true },
        loadChildren: () =>
          import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'configuration',
        component: ConfigLayout,
        data: { title: 'Configuración', showMenuToggle: false },
        loadChildren: () =>
          import('./features/settings/settings.routes').then(
            (m) => m.SETTINGS_ROUTES
          ),
      },
      // podrías agregar otras rutas bajo Shell aquí
    ],
  },

  // Status
  { path: '404', component: Page404Component, data: { title: 'Page 404' } },
  { path: '500', component: Page500Component, data: { title: 'Page 500' } },

  // Catch-all: llevar a 404
  { path: '**', redirectTo: '404' },
];
