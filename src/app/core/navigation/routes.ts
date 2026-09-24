/**
 * Rutas canónicas de Micovi (español).
 *
 * Evita strings sueltos en menú, redirects y navegación programática.
 * Los paths legacy (`/dashboard`, `/sportsman`, `/configuration`) redirigen aquí.
 */
export const APP_PATHS = {
  inicio: 'inicio',
  deportistas: 'deportistas',
  deportistasCrear: 'crear',
  deportistaEditar: 'editar',
  historialCategorias: 'historial-categorias',
  entrenadores: 'entrenadores',
  entrenadoresCrear: 'crear',
  entrenadorEditar: 'editar',
  planificacion: 'planificacion',
  planesAnuales: 'planes-anuales',
  eventos: 'eventos',
  macrociclos: 'macrociclos',
  microciclos: 'microciclos',
  ejercicios: 'ejercicios',
  grupos: 'grupos',
  subgrupos: 'subgrupos',
  entrenamiento: 'entrenamiento',
  sesiones: 'sesiones',
  programacion: 'programacion',
  dosificacion: 'dosificacion',
  regulacion: 'regulacion',
  evaluacion: 'evaluacion',
  rubricas: 'rubricas',
  evaluaciones: 'evaluaciones',
  desempeno: 'desempeno',
  reportes: 'reportes',
  analisis: 'analisis',
  configuracion: 'configuracion',
  institucion: 'institucion',
  catalogos: 'catalogos',
  categorias: 'categorias',
  etapas: 'etapas',
  actividades: 'actividades',
  unidades: 'unidades',
  usuarios: 'usuarios',
} as const;

export const APP_ROUTES = {
  inicio: `/${APP_PATHS.inicio}`,
  deportistas: `/${APP_PATHS.deportistas}`,
  deportistasCrear: `/${APP_PATHS.deportistas}/${APP_PATHS.deportistasCrear}`,
  deportista: (id: string | number) => `/${APP_PATHS.deportistas}/${id}`,
  deportistaEditar: (id: string | number) =>
    `/${APP_PATHS.deportistas}/${id}/${APP_PATHS.deportistaEditar}`,
  deportistaHistorialCategorias: (id: string | number) =>
    `/${APP_PATHS.deportistas}/${id}/${APP_PATHS.historialCategorias}`,
  entrenadores: `/${APP_PATHS.entrenadores}`,
  entrenadoresCrear: `/${APP_PATHS.entrenadores}/${APP_PATHS.entrenadoresCrear}`,
  entrenadorEditar: (id: string | number) =>
    `/${APP_PATHS.entrenadores}/${id}/${APP_PATHS.entrenadorEditar}`,
  planificacion: `/${APP_PATHS.planificacion}`,
  planesAnuales: `/${APP_PATHS.planificacion}/${APP_PATHS.planesAnuales}`,
  planAnual: (id: string | number) =>
    `/${APP_PATHS.planificacion}/${APP_PATHS.planesAnuales}/${id}`,
  ejercicios: `/${APP_PATHS.ejercicios}`,
  entrenamiento: `/${APP_PATHS.entrenamiento}`,
  sesiones: `/${APP_PATHS.entrenamiento}/${APP_PATHS.sesiones}`,
  programacion: `/${APP_PATHS.entrenamiento}/${APP_PATHS.programacion}`,
  dosificacion: `/${APP_PATHS.entrenamiento}/${APP_PATHS.dosificacion}`,
  regulacionEntrenamiento: `/${APP_PATHS.entrenamiento}/${APP_PATHS.regulacion}`,
  evaluacion: `/${APP_PATHS.evaluacion}`,
  rubricas: `/${APP_PATHS.evaluacion}/${APP_PATHS.rubricas}`,
  evaluaciones: `/${APP_PATHS.evaluacion}/${APP_PATHS.evaluaciones}`,
  desempenoEvaluacion: `/${APP_PATHS.evaluacion}/${APP_PATHS.desempeno}`,
  reportes: `/${APP_PATHS.reportes}`,
  regulacionReportes: `/${APP_PATHS.reportes}/${APP_PATHS.regulacion}`,
  desempenoReportes: `/${APP_PATHS.reportes}/${APP_PATHS.desempeno}`,
  analisis: `/${APP_PATHS.reportes}/${APP_PATHS.analisis}`,
  configuracion: `/${APP_PATHS.configuracion}`,
  institucion: `/${APP_PATHS.configuracion}/${APP_PATHS.institucion}`,
  catalogos: `/${APP_PATHS.configuracion}/${APP_PATHS.catalogos}`,
  categorias: `/${APP_PATHS.configuracion}/${APP_PATHS.catalogos}/${APP_PATHS.categorias}`,
  etapas: `/${APP_PATHS.configuracion}/${APP_PATHS.catalogos}/${APP_PATHS.etapas}`,
  actividades: `/${APP_PATHS.configuracion}/${APP_PATHS.catalogos}/${APP_PATHS.actividades}`,
  /**
   * Parking: unidades se usan en Ejercicios (`UnitsofmeasurementID`).
   * No van en el hub ni en el rail hasta validar si pertenecen a la biblioteca.
   */
  unidades: `/${APP_PATHS.configuracion}/${APP_PATHS.unidades}`,
  usuarios: `/${APP_PATHS.configuracion}/${APP_PATHS.usuarios}`,
} as const;
