/**
 * Árbol único de navegación visible del rail.
 *
 * Configuración es un ítem (sin hijos): abre el hub. Categorías, etapas y
 * actividades viven dentro de Catálogos deportivos, no en el menú principal.
 * Eventos / macrociclos / microciclos son rutas contextuales.
 */
import { Permission } from '../permissions/permissions';
import { APP_ROUTES } from './routes';
import { NavigationItem } from './navigation.types';

export const NAVIGATION_CONFIG: NavigationItem[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    route: APP_ROUTES.inicio,
    icon: 'home',
    section: 'operacion',
    permissions: [Permission.NavInicio],
  },
  {
    id: 'deportistas',
    label: 'Deportistas',
    route: APP_ROUTES.deportistas,
    icon: 'directions_run',
    section: 'operacion',
    permissions: [Permission.NavDeportistas],
  },
  {
    id: 'planificacion',
    label: 'Planificación',
    route: APP_ROUTES.planificacion,
    icon: 'calendar_month',
    section: 'operacion',
    permissions: [Permission.NavPlanificacion],
    children: [
      {
        id: 'planes-anuales',
        label: 'Planes anuales',
        route: APP_ROUTES.planesAnuales,
        icon: 'event_note',
        section: 'operacion',
        permissions: [Permission.NavPlanificacion],
      },
    ],
  },
  {
    id: 'entrenamiento',
    label: 'Entrenamiento',
    route: APP_ROUTES.entrenamiento,
    icon: 'sports',
    section: 'operacion',
    permissions: [Permission.NavEntrenamiento],
    children: [
      {
        id: 'sesiones',
        label: 'Sesiones',
        route: APP_ROUTES.sesiones,
        icon: 'today',
        section: 'operacion',
        permissions: [Permission.NavEntrenamiento],
      },
      {
        id: 'programacion',
        label: 'Programación',
        route: APP_ROUTES.programacion,
        icon: 'event_repeat',
        section: 'operacion',
        permissions: [Permission.NavEntrenamiento],
      },
      {
        id: 'dosificacion',
        label: 'Dosificación',
        route: APP_ROUTES.dosificacion,
        icon: 'straighten',
        section: 'operacion',
        permissions: [Permission.NavEntrenamiento],
      },
      {
        id: 'regulacion-entrenamiento',
        label: 'Regulación',
        route: APP_ROUTES.regulacionEntrenamiento,
        icon: 'tune',
        section: 'operacion',
        permissions: [Permission.NavEntrenamiento],
      },
    ],
  },
  {
    id: 'evaluacion',
    label: 'Evaluación',
    route: APP_ROUTES.evaluacion,
    icon: 'fact_check',
    section: 'operacion',
    permissions: [Permission.NavEvaluacion],
    children: [
      {
        id: 'rubricas',
        label: 'Rúbricas',
        route: APP_ROUTES.rubricas,
        icon: 'rule',
        section: 'operacion',
        permissions: [Permission.NavEvaluacion],
      },
      {
        id: 'evaluaciones',
        label: 'Evaluaciones',
        route: APP_ROUTES.evaluaciones,
        icon: 'assignment',
        section: 'operacion',
        permissions: [Permission.NavEvaluacion],
      },
      {
        id: 'desempeno-evaluacion',
        label: 'Desempeño',
        route: APP_ROUTES.desempenoEvaluacion,
        icon: 'insights',
        section: 'operacion',
        permissions: [Permission.NavEvaluacion],
      },
    ],
  },
  {
    id: 'reportes',
    label: 'Reportes',
    route: APP_ROUTES.reportes,
    icon: 'assessment',
    section: 'operacion',
    permissions: [Permission.NavReportes],
    children: [
      {
        id: 'regulacion-reportes',
        label: 'Regulación',
        route: APP_ROUTES.regulacionReportes,
        icon: 'monitoring',
        section: 'operacion',
        permissions: [Permission.NavReportes],
      },
      {
        id: 'desempeno-reportes',
        label: 'Desempeño',
        route: APP_ROUTES.desempenoReportes,
        icon: 'stacked_line_chart',
        section: 'operacion',
        permissions: [Permission.NavReportes],
      },
      {
        id: 'analisis',
        label: 'Análisis',
        route: APP_ROUTES.analisis,
        icon: 'analytics',
        section: 'operacion',
        permissions: [Permission.NavReportes],
      },
    ],
  },
  {
    id: 'ejercicios',
    label: 'Ejercicios',
    route: APP_ROUTES.ejercicios,
    icon: 'fitness_center',
    section: 'biblioteca',
    permissions: [Permission.NavEjercicios],
  },
  {
    id: 'configuracion',
    label: 'Configuración',
    route: APP_ROUTES.configuracion,
    icon: 'settings',
    section: 'configuracion',
    permissions: [Permission.NavConfiguracion],
  },
];
