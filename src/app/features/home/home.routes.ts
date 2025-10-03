// features/home/home.routes.ts
import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../dashboard/dashboard').then((m) => m.Dashboard),
  },

  // Entrenador
  {
    path: 'entrenador',
    loadChildren: () =>
      import('../trainer/trainer.routes').then(
        (m) => m.TRAINER_ROUTES
      ),
  },

  // // Deportistas
  {
    path: 'sportsman',
    loadChildren: () =>
      import('../sportsman/sportsman.routes').then((m) => m.SPORTSMAN_ROUTES),
  },

  // // Ejercicios (ejemplo)
  // {
  //   path: 'ejercicios',
  //   loadChildren: () =>
  //     import('../ejercicios/ejercicios.routes').then(
  //       (m) => m.EJERCICIOS_ROUTES
  //     ),
  // },
];
