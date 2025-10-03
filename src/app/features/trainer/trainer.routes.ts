// features/trainer/trainer.routes.ts
import { Routes } from '@angular/router';

export const TRAINER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/trainer/trainer.component').then(
        (m) => m.TrainerComponent
      ),
  },
  // {
  //   path: ':id',
  //   loadComponent: () =>
  //     import('./Components/view-trainer/view-trainer.component').then(
  //       (m) => m.ViewTrainerComponent
  //     ),
  // },
];