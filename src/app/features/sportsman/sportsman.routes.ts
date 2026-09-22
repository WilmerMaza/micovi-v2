/**
 * Rutas de Deportistas.
 *
 * El listado y el alta/edición existentes se reutilizan. La ficha y el
 * historial de categorías quedan como placeholders contextuales.
 */
import { Routes } from '@angular/router';
import { Permission } from '../../core/permissions/permissions';
import {
  loadModulePlaceholder,
  placeholderData,
} from '../../core/navigation/placeholder-loader';
import { APP_PATHS } from '../../core/navigation/routes';

export const SPORTSMAN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/sportsman/sportsman.component').then(
        (m) => m.SportsmanComponent,
      ),
  },
  {
    path: APP_PATHS.deportistasCrear,
    data: { breadcrumb: 'Nuevo deportista' },
    loadComponent: () =>
      import('./Components/create-sportsman/create-sportsman.component').then(
        (m) => m.CreateSportsmanComponent,
      ),
  },
  {
    path: 'create',
    redirectTo: APP_PATHS.deportistasCrear,
    pathMatch: 'full',
  },
  {
    path: `:id/${APP_PATHS.deportistaEditar}`,
    data: { breadcrumb: 'Editar' },
    loadComponent: () =>
      import('./Components/create-sportsman/create-sportsman.component').then(
        (m) => m.CreateSportsmanComponent,
      ),
  },
  {
    path: 'edit/:id',
    redirectTo: `:id/${APP_PATHS.deportistaEditar}`,
  },
  {
    path: `:id/${APP_PATHS.historialCategorias}`,
    loadComponent: loadModulePlaceholder,
    data: {
      ...placeholderData(
        'Historial de categorías',
        'Categoría actual e historial del deportista a lo largo del tiempo.',
        'Historial de categorías',
      ),
      permissions: [Permission.NavDeportistas],
    },
  },
  {
    path: ':id',
    loadComponent: loadModulePlaceholder,
    data: {
      ...placeholderData(
        'Deportista',
        'Ficha del deportista: información, categoría actual e historial.',
        'Deportista',
      ),
      breadcrumbParam: 'id',
      permissions: [Permission.NavDeportistas],
    },
  },
];
