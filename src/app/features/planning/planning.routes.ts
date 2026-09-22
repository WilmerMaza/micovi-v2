/**
 * Rutas de Planificación.
 *
 * El rail entra por Planes anuales. Eventos, macrociclos y microciclos son
 * rutas contextuales anidadas al plan (component-less + placeholder).
 */
import { Routes } from '@angular/router';
import {
  loadModulePlaceholder,
  placeholderData,
} from '../../core/navigation/placeholder-loader';
import { APP_PATHS } from '../../core/navigation/routes';

export const PLANNING_ROUTES: Routes = [
  { path: '', redirectTo: APP_PATHS.planesAnuales, pathMatch: 'full' },
  {
    path: APP_PATHS.planesAnuales,
    data: { breadcrumb: 'Planes anuales' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: loadModulePlaceholder,
        data: placeholderData(
          'Planes anuales',
          'Gestiona la planificación anual del entrenamiento deportivo.',
        ),
      },
      {
        path: ':id',
        data: { breadcrumb: 'Plan', breadcrumbParam: 'id' },
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: loadModulePlaceholder,
            data: placeholderData(
              'Plan anual',
              'Detalle del plan y acceso contextual a eventos, macrociclos y microciclos.',
            ),
          },
          {
            path: APP_PATHS.eventos,
            loadComponent: loadModulePlaceholder,
            data: placeholderData(
              'Eventos',
              'Eventos competitivos y de control asociados al plan anual.',
              'Eventos',
            ),
          },
          {
            path: APP_PATHS.macrociclos,
            data: { breadcrumb: 'Macrociclos' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                loadComponent: loadModulePlaceholder,
                data: placeholderData(
                  'Macrociclos',
                  'Estructura los macrociclos del plan anual seleccionado.',
                ),
              },
              {
                path: ':macrocicloId',
                data: {
                  breadcrumb: 'Macrociclo',
                  breadcrumbParam: 'macrocicloId',
                },
                children: [
                  {
                    path: '',
                    pathMatch: 'full',
                    loadComponent: loadModulePlaceholder,
                    data: placeholderData(
                      'Macrociclo',
                      'Detalle del macrociclo y sus microciclos.',
                    ),
                  },
                  {
                    path: APP_PATHS.microciclos,
                    data: { breadcrumb: 'Microciclos' },
                    children: [
                      {
                        path: '',
                        pathMatch: 'full',
                        loadComponent: loadModulePlaceholder,
                        data: placeholderData(
                          'Microciclos',
                          'Microciclos contenidos en el macrociclo activo.',
                        ),
                      },
                      {
                        path: ':microcicloId',
                        loadComponent: loadModulePlaceholder,
                        data: {
                          ...placeholderData(
                            'Microciclo',
                            'Detalle del microciclo como puente hacia la sesión de entrenamiento.',
                            'Microciclo',
                          ),
                          breadcrumbParam: 'microcicloId',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: APP_PATHS.microciclos,
    loadComponent: loadModulePlaceholder,
    data: placeholderData(
      'Microciclos',
      'Entrada de dominio a microciclos sin un plan seleccionado.',
      'Microciclos',
    ),
  },
];
