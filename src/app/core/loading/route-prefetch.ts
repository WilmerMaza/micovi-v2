/**
 * Prefetch de chunks lazy en idle para acortar navegación percibida.
 *
 * No altera rutas ni guards; solo dispara import() dinámico cuando el hilo
 * está libre (post-paint del dashboard).
 */

let sportsmanPrefetched = false;
let configurationPrefetched = false;

function scheduleIdle(task: () => void): void {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(task);
    return;
  }
  setTimeout(task, 400);
}

/** Precarga rutas de deportistas una sola vez por sesión de pestaña. */
export function prefetchSportsmanRoutes(): void {
  if (sportsmanPrefetched) {
    return;
  }
  sportsmanPrefetched = true;
  void import('../../features/sportsman/sportsman.routes');
}

/** Precarga módulo de configuración. */
export function prefetchConfigurationRoutes(): void {
  if (configurationPrefetched) {
    return;
  }
  configurationPrefetched = true;
  void import('../../features/settings/settings.routes');
}

/** Prefetch de rutas secundarias frecuentes tras el dashboard. */
export function prefetchSecondaryRoutes(): void {
  scheduleIdle(() => {
    prefetchSportsmanRoutes();
    prefetchConfigurationRoutes();
  });
}
