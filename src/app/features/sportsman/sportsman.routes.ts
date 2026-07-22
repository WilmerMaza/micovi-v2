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
{
    path: 'create',
    loadComponent: () =>
      import('./Components/create-sportsman/create-sportsman.component').then(
        (m) => m.CreateSportsmanComponent
      ),
  }

  // {
  //   path: ':id',
  //   loadComponent: () =>
  //     import('../../view/sportsman/pages/detail/detail.component').then(
  //       (m) => m.SportsmanDetailComponent
  //     ),
  // },
];
