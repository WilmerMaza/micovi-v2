import { Routes } from '@angular/router';

export const ENTRENADOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/entrenador/entrenador.component').then((m) => m.EntrenadorComponent),
  },
];
