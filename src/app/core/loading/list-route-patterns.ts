/**
 * Rutas de listado tabular que usan placeholder tipo «table» en el shell.
 *
 * Al convertir un dominio en listado denso, añadir el segmento aquí y
 * reutilizar TableSkeletonComponent + isListLoading en el componente listado.
 */
export const TABLE_OUTLET_ROUTE_SEGMENTS = [
  '/deportistas',
  '/sportsman',
] as const;

/** true si la URL destino es un listado denso (dinamic-table). */
export function isTableOutletRoute(url: string): boolean {
  const path = url.split('?')[0].toLowerCase();
  return TABLE_OUTLET_ROUTE_SEGMENTS.some((segment) =>
    path.includes(segment),
  );
}
