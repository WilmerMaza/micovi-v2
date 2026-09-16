/**
 * Spinner en navegación — desactivado.
 *
 * El lazy loading de rutas en Micovi suele resolverse en <300 ms; un overlay
 * global bloqueaba la cabina sin aportar contexto. La carga de datos usa
 * skeleton local o button loading según el escenario.
 *
 * @deprecated No registrar en `app.config.ts`. Conservado por referencia histórica.
 */
import { Provider } from '@angular/core';

export function provideRouterSpinner(): Provider {
  return {
    provide: 'ROUTER_SPINNER_INIT',
    useValue: true,
  };
}
