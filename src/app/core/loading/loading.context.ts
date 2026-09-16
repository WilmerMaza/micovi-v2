/**
 * Contexto HTTP para opt-out del overlay global de carga.
 *
 * Las peticiones con `SKIP_LOADING = true` no activan `SpinnerService`.
 * Usado por listados con skeleton, mutaciones con button loading y polling.
 */
import { HttpContextToken } from '@angular/common/http';

/** Omite el overlay global cuando el componente gestiona su propio feedback. */
export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);

/** Rutas de auth/bootstrap que nunca deben bloquear la cabina. */
export const SKIP_LOADING_URL_PATTERNS = [
  '/auth/me',
  '/auth/refresh',
  '/auth/login',
  '/auth/logout',
  '/auth/register',
] as const;

/** Header alternativo para clientes que no usen HttpContext. */
export const SKIP_LOADING_HEADER = 'X-Skip-Loading';

export function shouldSkipLoadingUrl(url: string): boolean {
  return SKIP_LOADING_URL_PATTERNS.some((pattern) => url.includes(pattern));
}
