/**
 * Rutas hijas del shell home (dashboard, listados, etc.).
 *
 * Listados tabulares: al activar entrenador/ejercicios, registrar el segmento en
 * `core/loading/list-route-patterns.ts` y usar TableSkeletonComponent + isListLoading
 * (patrón sportsman.component).
 */
import { Routes } from '@angular/router';
import { Dashboard } from '../dashboard/dashboard';

export const HOME_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Dashboard — eager: ruta por defecto, sin HTTP en init
  {
    path: 'dashboard',
    component: Dashboard,
  },

  // Entrenador — al activar: añadir '/entrenador' en list-route-patterns.ts
  // {
  //   path: 'entrenador',
  //   loadChildren: () =>
  //     import('../entrenador/entrenador.routes').then(
  //       (m) => m.ENTRENADOR_ROUTES
  //     ),
  // },

  {
    path: 'sportsman',
    loadChildren: () =>
      import('../sportsman/sportsman.routes').then((m) => m.SPORTSMAN_ROUTES),
  },

  // Ejercicios — al activar: añadir '/ejercicios' en list-route-patterns.ts
  // {
  //   path: 'ejercicios',
  //   loadChildren: () =>
  //     import('../ejercicios/ejercicios.routes').then(
  //       (m) => m.EJERCICIOS_ROUTES
  //     ),
  // },
];
