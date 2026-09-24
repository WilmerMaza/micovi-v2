/**
 * Destinos del hub de Configuración (y del sub-hub de catálogos).
 *
 * Filtrados por PermissionService en la página. No se pintan en el rail:
 * Categorías / Etapas / Actividades no son ítems del menú principal.
 *
 * Unidades: no están aquí. El modelo vive en Ejercicios (`UnitsofmeasurementID`);
 * la ruta `/configuracion/unidades` se conserva como parking hasta validar.
 */
import { Permission } from '../../../../core/permissions/permissions';
import { APP_ROUTES } from '../../../../core/navigation/routes';

export interface SettingsHubEntry {
  id: string;
  label: string;
  hint: string;
  route: string;
  icon: string;
  permissions: readonly string[];
}

export interface SettingsHubDefinition {
  title: string;
  description: string;
  entries: readonly SettingsHubEntry[];
}

export type SettingsHubKey = 'root' | 'catalogos';

export const SETTINGS_HUBS: Record<SettingsHubKey, SettingsHubDefinition> = {
  root: {
    title: 'Configuración',
    description: 'Administra y configura los elementos de tu escuela.',
    entries: [
      {
        id: 'institucion',
        label: 'Institución',
        hint: 'Información y configuración general de la escuela.',
        route: APP_ROUTES.institucion,
        icon: 'apartment',
        permissions: [Permission.ConfigInstitucion],
      },
      {
        id: 'catalogos',
        label: 'Catálogos deportivos',
        hint: 'Categorías, etapas y actividades de la operación deportiva.',
        route: APP_ROUTES.catalogos,
        icon: 'category',
        permissions: [
          Permission.ConfigCategorias,
          Permission.ConfigEtapas,
          Permission.ConfigActividades,
        ],
      },
      {
        id: 'usuarios',
        label: 'Usuarios y permisos',
        hint: 'Gestiona usuarios, roles y acceso a Micovi.',
        route: APP_ROUTES.usuarios,
        icon: 'manage_accounts',
        permissions: [Permission.ConfigUsuarios],
      },
    ],
  },
  catalogos: {
    title: 'Catálogos deportivos',
    description:
      'Maestros que la escuela define y el entrenador usa en la operación.',
    entries: [
      {
        id: 'categorias',
        label: 'Categorías',
        hint: 'Maestro de categorías. El historial por deportista vive en Deportistas.',
        route: APP_ROUTES.categorias,
        icon: 'category',
        permissions: [Permission.ConfigCategorias],
      },
      {
        id: 'etapas',
        label: 'Etapas',
        hint: 'Etapas formativas usadas en la planificación.',
        route: APP_ROUTES.etapas,
        icon: 'timeline',
        permissions: [Permission.ConfigEtapas],
      },
      {
        id: 'actividades',
        label: 'Actividades',
        hint: 'Actividades institucionales disponibles para el plan.',
        route: APP_ROUTES.actividades,
        icon: 'local_activity',
        permissions: [Permission.ConfigActividades],
      },
    ],
  },
};
