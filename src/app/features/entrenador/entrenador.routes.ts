/**
 * Rutas del dominio Entrenadores.
 *
 * Listado, alta y edición. Paths en español alineados a `APP_PATHS`.
 * Legacy `/Entrenador` redirige desde `home.routes.ts`.
 */
import { Routes } from '@angular/router';
import { APP_PATHS } from '../../core/navigation/routes';

export const ENTRENADOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/entrenador/entrenador.component').then(
        (m) => m.EntrenadorComponent,
      ),
  },
  {
    path: APP_PATHS.entrenadoresCrear,
    loadComponent: () =>
      import('./Components/create-coach/create-coach.component').then(
        (m) => m.CreateCoachComponent,
      ),
  },
  {
    path: 'create',
    redirectTo: APP_PATHS.entrenadoresCrear,
  },
  {
    path: `:id/${APP_PATHS.entrenadorEditar}`,
    loadComponent: () =>
      import('./Components/create-coach/create-coach.component').then(
        (m) => m.CreateCoachComponent,
      ),
  },
  {
    path: 'edit/:id',
    redirectTo: `:id/${APP_PATHS.entrenadorEditar}`,
  },
];
