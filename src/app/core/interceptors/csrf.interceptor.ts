/**
 * Interceptor CSRF — complemento del CsrfGuard del backend.
 *
 * En mutaciones (POST/PUT/PATCH/DELETE), lee la cookie micovi_csrf y la envía
 * como header X-CSRF-Token. Login está exento (aún no hay cookie CSRF).
 */
import { HttpInterceptorFn } from '@angular/common/http';
import { readBrowserCookie } from '../utils/cookie.util';

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const CSRF_COOKIE = 'micovi_csrf';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  if (!MUTATING_METHODS.has(req.method.toUpperCase())) {
    return next(req);
  }

  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  const csrfToken = readBrowserCookie(CSRF_COOKIE);
  if (!csrfToken) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'X-CSRF-Token': csrfToken,
      },
    }),
  );
};
