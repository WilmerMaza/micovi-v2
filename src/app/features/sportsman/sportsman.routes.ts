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
      import('./pages/athlete-form/athlete-form.component').then(
        (m) => m.AthleteFormComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/athlete-form/athlete-form.component').then(
        (m) => m.AthleteFormComponent
      ),
  },
];
