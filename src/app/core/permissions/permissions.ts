/**
 * Catálogo de permisos de navegación de Micovi.
 *
 * Las claves son estables: el menú, los guards y el hub de configuración
 * consultan este catálogo. Cuando el backend envíe claims, el mapa rol→permisos
 * se sustituye sin cambiar `NAVIGATION_CONFIG`.
 */
export const Permission = {
  NavInicio: 'nav.inicio',
  NavDeportistas: 'nav.deportistas',
  NavEntrenadores: 'nav.entrenadores',
  NavPlanificacion: 'nav.planificacion',
  NavEjercicios: 'nav.ejercicios',
  NavEntrenamiento: 'nav.entrenamiento',
  NavEvaluacion: 'nav.evaluacion',
  NavReportes: 'nav.reportes',
  NavConfiguracion: 'nav.configuracion',
  ConfigInstitucion: 'config.institucion',
  ConfigCategorias: 'config.categorias',
  ConfigEtapas: 'config.etapas',
  ConfigActividades: 'config.actividades',
  ConfigUnidades: 'config.unidades',
  ConfigUsuarios: 'config.usuarios',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

export const OPERATION_PERMISSIONS: readonly Permission[] = [
  Permission.NavInicio,
  Permission.NavDeportistas,
  Permission.NavEntrenadores,
  Permission.NavPlanificacion,
  Permission.NavEjercicios,
  Permission.NavEntrenamiento,
  Permission.NavEvaluacion,
  Permission.NavReportes,
];

export const CONFIG_PERMISSIONS: readonly Permission[] = [
  Permission.NavConfiguracion,
  Permission.ConfigInstitucion,
  Permission.ConfigCategorias,
  Permission.ConfigEtapas,
  Permission.ConfigActividades,
  Permission.ConfigUnidades,
  Permission.ConfigUsuarios,
];
