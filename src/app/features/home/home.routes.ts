/**
 * Rutas hijas del AppShell (inicio, operación, biblioteca, configuración).
 *
 * Cada dominio se carga lazy. Deportistas conserva su feature real.
 * Al activar listados tabulares, registrar el segmento en
 * `core/loading/list-route-patterns.ts`.
 */
import { Routes } from '@angular/router';
import { Permission } from '../../core/permissions/permissions';
import { APP_PATHS } from '../../core/navigation/routes';
import { Dashboard } from '../dashboard/dashboard';

export const HOME_ROUTES: Routes = [
  { path: '', redirectTo: APP_PATHS.inicio, pathMatch: 'full' },
  { path: 'dashboard', redirectTo: APP_PATHS.inicio, pathMatch: 'full' },

  {
    path: APP_PATHS.inicio,
    component: Dashboard,
    data: {
      breadcrumb: 'Inicio',
      breadcrumbSkip: true,
      permissions: [Permission.NavInicio],
    },
  },

  {
    path: APP_PATHS.deportistas,
    data: {
      breadcrumb: 'Deportistas',
      permissions: [Permission.NavDeportistas],
    },
    loadChildren: () =>
      import('../sportsman/sportsman.routes').then((m) => m.SPORTSMAN_ROUTES),
  },
  { path: 'sportsman/create', redirectTo: `${APP_PATHS.deportistas}/${APP_PATHS.deportistasCrear}` },
  { path: 'sportsman/edit/:id', redirectTo: `${APP_PATHS.deportistas}/:id/${APP_PATHS.deportistaEditar}` },
  { path: 'sportsman', redirectTo: APP_PATHS.deportistas },

  {
    path: APP_PATHS.planificacion,
    data: {
      breadcrumb: 'Planificación',
      permissions: [Permission.NavPlanificacion],
    },
    loadChildren: () =>
      import('../planning/planning.routes').then((m) => m.PLANNING_ROUTES),
  },

  {
    path: APP_PATHS.ejercicios,
    data: {
      breadcrumb: 'Ejercicios',
      permissions: [Permission.NavEjercicios],
    },
    loadChildren: () =>
      import('../exercises/exercises.routes').then((m) => m.EXERCISES_ROUTES),
  },

  {
    path: APP_PATHS.entrenamiento,
    data: {
      breadcrumb: 'Entrenamiento',
      permissions: [Permission.NavEntrenamiento],
    },
    loadChildren: () =>
      import('../training/training.routes').then((m) => m.TRAINING_ROUTES),
  },

  {
    path: APP_PATHS.evaluacion,
    data: {
      breadcrumb: 'Evaluación',
      permissions: [Permission.NavEvaluacion],
    },
    loadChildren: () =>
      import('../evaluation/evaluation.routes').then((m) => m.EVALUATION_ROUTES),
  },

  {
    path: APP_PATHS.reportes,
    data: {
      breadcrumb: 'Reportes',
      permissions: [Permission.NavReportes],
    },
    loadChildren: () =>
      import('../reports/reports.routes').then((m) => m.REPORTS_ROUTES),
  },

  {
    path: APP_PATHS.configuracion,
    data: {
      breadcrumb: 'Configuración',
      permissions: [Permission.NavConfiguracion],
    },
    loadChildren: () =>
      import('../settings/settings.routes').then((m) => m.SETTINGS_ROUTES),
  },
  { path: 'configuration/complements', redirectTo: APP_PATHS.configuracion },
  { path: 'configuration', redirectTo: APP_PATHS.configuracion },
];
