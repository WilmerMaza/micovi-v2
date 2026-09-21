import { Routes } from '@angular/router';

export const ENTRENADOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/entrenador/entrenador.component').then((m) => m.EntrenadorComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./Components/create-coach/create-coach.component').then((m) => m.CreateCoachComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./Components/create-coach/create-coach.component').then((m) => m.CreateCoachComponent),
  },
];
