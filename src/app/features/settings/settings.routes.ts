/**
 * Rutas de Configuración dentro del AppShell.
 *
 * `/configuracion` es un hub (no un segundo layout). Catálogos agrupa
 * categorías, etapas y actividades. Unidades queda como ruta oculta:
 * el modelo pertenece a Ejercicios y requiere validación posterior.
 */
import { Routes } from '@angular/router';
import { Permission } from '../../core/permissions/permissions';
import {
  loadModulePlaceholder,
  placeholderData,
} from '../../core/navigation/placeholder-loader';
import { APP_PATHS } from '../../core/navigation/routes';

const loadSettingsHub = () =>
  import('./pages/settings-hub/settings-hub').then((m) => m.SettingsHub);

const CATALOG_PERMISSIONS = [
  Permission.ConfigCategorias,
  Permission.ConfigEtapas,
  Permission.ConfigActividades,
];

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: loadSettingsHub,
    data: {
      hub: 'root',
      title: 'Configuración',
    },
  },
  {
    path: APP_PATHS.institucion,
    loadComponent: loadModulePlaceholder,
    data: {
      ...placeholderData(
        'Institución',
        'Información y configuración general de la escuela.',
        'Institución',
      ),
      permissions: [Permission.ConfigInstitucion],
    },
  },
  {
    path: APP_PATHS.catalogos,
    data: {
      breadcrumb: 'Catálogos deportivos',
      permissions: CATALOG_PERMISSIONS,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: loadSettingsHub,
        data: { hub: 'catalogos' },
      },
      {
        path: APP_PATHS.categorias,
        loadComponent: loadModulePlaceholder,
        data: {
          ...placeholderData(
            'Categorías',
            'Maestro de la escuela. El historial por deportista vive en Deportistas.',
            'Categorías',
          ),
          permissions: [Permission.ConfigCategorias],
        },
      },
      {
        path: APP_PATHS.etapas,
        loadComponent: loadModulePlaceholder,
        data: {
          ...placeholderData(
            'Etapas',
            'Etapas formativas utilizadas en la planificación.',
            'Etapas',
          ),
          permissions: [Permission.ConfigEtapas],
        },
      },
      {
        path: APP_PATHS.actividades,
        loadComponent: loadModulePlaceholder,
        data: {
          ...placeholderData(
            'Actividades',
            'Actividades institucionales disponibles para el plan.',
            'Actividades',
          ),
          permissions: [Permission.ConfigActividades],
        },
      },
    ],
  },
  {
    path: APP_PATHS.usuarios,
    loadComponent: loadModulePlaceholder,
    data: {
      ...placeholderData(
        'Usuarios y permisos',
        'Gestiona usuarios, roles y acceso a Micovi.',
        'Usuarios y permisos',
      ),
      permissions: [Permission.ConfigUsuarios],
    },
  },
  {
    path: APP_PATHS.unidades,
    loadComponent: loadModulePlaceholder,
    data: {
      ...placeholderData(
        'Unidades',
        'Unidades de medida ligadas a ejercicios. Ubicación definitiva pendiente de validar con la biblioteca.',
        'Unidades',
      ),
      permissions: [Permission.ConfigUnidades],
    },
  },
  { path: APP_PATHS.categorias, redirectTo: `${APP_PATHS.catalogos}/${APP_PATHS.categorias}` },
  { path: APP_PATHS.etapas, redirectTo: `${APP_PATHS.catalogos}/${APP_PATHS.etapas}` },
  { path: APP_PATHS.actividades, redirectTo: `${APP_PATHS.catalogos}/${APP_PATHS.actividades}` },
  { path: 'complements', redirectTo: '/configuracion' },
];
