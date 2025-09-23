// features/sportsman/sportsman.routes.ts
import { Routes } from '@angular/router';

export const SPORTSMAN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/sportsman/sportsman.component').then(
        (m) => m.SportsmanComponent
      ),
  },
  // {
  //   path: ':id',
  //   loadComponent: () =>
  //     import('../../view/sportsman/pages/detail/detail.component').then(
  //       (m) => m.SportsmanDetailComponent
  //     ),
  // },
];
