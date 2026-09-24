/**
 * Rutas de Reportes.
 *
 * Lectura de regulación, desempeño y análisis. Separado de Configuración
 * y de la operación diaria de entrenamiento.
 */
import { Routes } from '@angular/router';
import {
  loadModulePlaceholder,
  placeholderData,
} from '../../core/navigation/placeholder-loader';
import { APP_PATHS } from '../../core/navigation/routes';

export const REPORTS_ROUTES: Routes = [
  { path: '', redirectTo: APP_PATHS.desempeno, pathMatch: 'full' },
  {
    path: APP_PATHS.regulacion,
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Reporte de regulación',
      'Analiza la regulación de la carga planificada versus ejecutada.',
      'Regulación',
    ),
  },
  {
    path: APP_PATHS.desempeno,
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Reporte de desempeño',
      'Visualiza el desempeño de deportistas y grupos.',
      'Desempeño',
    ),
  },
  {
    path: APP_PATHS.analisis,
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Análisis',
      'Cruza planificación, ejecución y evaluación para decidir.',
      'Análisis',
    ),
  },
];
