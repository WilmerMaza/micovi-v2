import { Routes } from '@angular/router';
import { IgnoreLoginGuard } from './core/guard/ignoreLoginGuard';
import { Page404Component } from './view/pages/page404/page404.component';
import { Page500Component } from './view/pages/page500/page500.component';
import { Layout } from './layout/layout';
import { JwtGuard } from './core/guard/JwtGuard';
import { ConfiguracionComponent } from './layout/components/configuracion/configuracion.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   canActivate: [IgnoreLoginGuard],
  //   children: [
  //     // {
  //     //   path: '',
  //     //   loadComponent: () =>
  //     //     import('./pages/portal/portal.component').then(
  //     //       (m) => m.PortalComponent
  //     //     ),
  //     // },
  //     // {
  //     //   path: 'register',
  //     //   loadComponent: () =>
  //     //     import('./pages/auth/register.component').then(
  //     //       (m) => m.RegisterComponent
  //     //     ),
  //     // },
  //     {
  //       path: 'login',
  //       loadComponent: () =>
  //         import('./view/pages/auth/login/login.component').then(
  //           (m) => m.LoginComponent
  //         ),
  //     },
  //     {
  //       path: 'registers',
  //       loadComponent: () =>
  //         import('./view/pages/auth/register/register').then((m) => m.Register),
  //     },
  //   ],
//   // },
{ path: 'configuracion', component: ConfiguracionComponent, canActivate: [JwtGuard] } ,
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
      import('./view/pages/auth/register/register').then((m) => m.Register),
  },
  {
    path: '',
    canActivate: [JwtGuard],
    data: {
      title: 'Home',
    },
    loadComponent: () => import('./layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./view/dashboard/dashboard').then((m) => m.Dashboard),
      },
      // {
      //   path: 'sportsman',
      //   loadChildren: () =>
      //     import('src/app/views/sportsman/sporstman.module').then(
      //       (m) => m.SportManModule
      //     ),
      // },
      {
        path: 'Entrenador',
        loadComponent: () =>
          import(
            './view/entrenador/Components/entrenador/entrenador.component'
          ).then((m) => m.EntrenadorComponent),
      },
      // {
      //   path: 'plan-anual',
      //   loadChildren: () =>
      //     import('src/app/views/annual-plan/annual-plan.module').then(
      //       (m) => m.AnnualPlanModule
      //     ),
      // },
      // {
      //   path: 'Ejercicios',
      //   loadChildren: () =>
      //     import('src/app/views/Ejercicios/Ejercicios.module').then(
      //       (m) => m.EjerciciosModule
      //     ),
      // },
      // {
      //   path: 'Complementos',
      //   loadChildren: () =>
      //     import('src/app/views/Complementos/complementos.module').then(
      //       (m) => m.ComplementosModule
      //     ),
      // },
    ],
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },
  // {
  //   path: 'plans',
  //   component: PlansComponent,
  //   canActivate: [UserAndJwtGuard],
  //   data: {
  //     title: 'Plans Page',
  //   },
  // },
  { path: '**', redirectTo: '/404' },
];
