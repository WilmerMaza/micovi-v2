// features/settings/settings.routes.ts
import { Routes } from '@angular/router';
import { Complements } from './pages/complements/complements';
import { Home } from './pages/home/home';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'complements',
    component: Complements,
  },
];
