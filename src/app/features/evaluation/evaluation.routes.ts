/**
 * Rutas de Evaluación.
 *
 * Rúbricas, evaluaciones y desempeño como dominios; sin lógica de calificación.
 */
import { Routes } from '@angular/router';
import {
  loadModulePlaceholder,
  placeholderData,
} from '../../core/navigation/placeholder-loader';
import { APP_PATHS } from '../../core/navigation/routes';

export const EVALUATION_ROUTES: Routes = [
  { path: '', redirectTo: APP_PATHS.evaluaciones, pathMatch: 'full' },
  {
    path: APP_PATHS.rubricas,
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Rúbricas',
      'Define criterios e indicadores de evaluación deportiva.',
      'Rúbricas',
    ),
  },
  {
    path: APP_PATHS.evaluaciones,
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Evaluaciones',
      'Aplica rúbricas y registra evaluaciones de los deportistas.',
      'Evaluaciones',
    ),
  },
  {
    path: APP_PATHS.desempeno,
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Desempeño',
      'Consulta el desempeño derivado de las evaluaciones.',
      'Desempeño',
    ),
  },
];
