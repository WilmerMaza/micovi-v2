// features/settings/settings.routes.ts
import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'complements',
    loadComponent: () =>
      import('./pages/complements/complements').then((m) => m.Complements),
  },
];
