/**
 * Rutas de Ejercicios (biblioteca).
 *
 * El aterrizaje es la biblioteca. Grupo → subgrupo → ejercicio quedan
 * preparados como rutas contextuales.
 */
import { Routes } from '@angular/router';
import {
  loadModulePlaceholder,
  placeholderData,
} from '../../core/navigation/placeholder-loader';
import { APP_PATHS } from '../../core/navigation/routes';

export const EXERCISES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Biblioteca de ejercicios',
      'Consulta y organiza la biblioteca de ejercicios de la institución.',
    ),
  },
  {
    path: `${APP_PATHS.grupos}/:grupoId`,
    data: { breadcrumb: 'Grupo', breadcrumbParam: 'grupoId' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: loadModulePlaceholder,
        data: placeholderData(
          'Grupo de ejercicios',
          'Subgrupos e indicadores asociados a este grupo.',
        ),
      },
      {
        path: `${APP_PATHS.subgrupos}/:subgrupoId`,
        data: { breadcrumb: 'Subgrupo', breadcrumbParam: 'subgrupoId' },
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: loadModulePlaceholder,
            data: placeholderData(
              'Subgrupo de ejercicios',
              'Ejercicios e indicadores del subgrupo seleccionado.',
            ),
          },
        ],
      },
    ],
  },
  {
    path: ':ejercicioId',
    loadComponent: loadModulePlaceholder,
    data: {
      ...placeholderData(
        'Ejercicio',
        'Ficha del ejercicio, indicadores y niveles de calificación.',
        'Ejercicio',
      ),
      breadcrumbParam: 'ejercicioId',
    },
  },
];
