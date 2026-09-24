/**
 * Rutas de Entrenamiento (operación diaria).
 *
 * Sesiones, programación, dosificación y regulación como secciones de dominio.
 * La navegación contextual desde un microciclo se añadirá sobre estas URLs.
 */
import { Routes } from '@angular/router';
import {
  loadModulePlaceholder,
  placeholderData,
} from '../../core/navigation/placeholder-loader';
import { APP_PATHS } from '../../core/navigation/routes';

export const TRAINING_ROUTES: Routes = [
  { path: '', redirectTo: APP_PATHS.sesiones, pathMatch: 'full' },
  {
    path: APP_PATHS.sesiones,
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Sesiones',
      'Prepara y consulta las sesiones de entrenamiento.',
      'Sesiones',
    ),
  },
  {
    path: APP_PATHS.programacion,
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Programación',
      'Programa el trabajo de la sesión a partir del microciclo.',
      'Programación',
    ),
  },
  {
    path: APP_PATHS.dosificacion,
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Dosificación',
      'Dosifica cargas, series y volúmenes de la sesión.',
      'Dosificación',
    ),
  },
  {
    path: APP_PATHS.regulacion,
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Regulación',
      'Registra y ajusta la ejecución respecto a lo planificado.',
      'Regulación',
    ),
  },
];
