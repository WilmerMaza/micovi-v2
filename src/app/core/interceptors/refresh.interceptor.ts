/**
 * Interceptor de renovación automática de sesión.
 *
 * Ante un 401, intenta POST /api/auth/refresh (cookies se actualizan solas).
 * Usa una cola (ReplaySubject) para que peticiones concurrentes no disparen
 * múltiples refresh simultáneos.
 *
 * Si el refresh falla → limpia estado y redirige a /login.
 */
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  filter,
  finalize,
  ReplaySubject,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { MeResponse } from '../models/login-response.model';
import { MicoviApi } from '../services/micovi.api';
import { AuthService } from '../services/auth';

let refreshing = false;
let refreshDone$: ReplaySubject<boolean> | null = null;

const isAuthEndpoint = (url: string): boolean =>
  url.includes('/auth/login') ||
  url.includes('/auth/refresh') ||
  url.includes('/auth/logout');

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  if (isAuthEndpoint(req.url)) {
    return next(req);
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401) {
        return throwError(() => err);
      }

      if (refreshing && refreshDone$) {
        return refreshDone$.pipe(
          filter(Boolean),
          take(1),
          switchMap(() => next(req.clone())),
        );
      }

      refreshing = true;
      refreshDone$ = new ReplaySubject<boolean>(1);

      const api = inject(MicoviApi);
      const auth = inject(AuthService);
      const router = inject(Router);

      return api.post<MeResponse>('/auth/refresh', {}).pipe(
        switchMap((user) => {
          auth.setUser({
            id: user.id,
            email: user.email,
            role: user.role,
            schoolId: user.schoolId,
          });
          refreshDone$?.next(true);
          return next(req.clone());
        }),
        catchError((refreshErr) => {
          refreshDone$?.next(false);
          auth.clear();
          void router.navigate(['/login']);
          return throwError(() => refreshErr);
        }),
        finalize(() => {
          refreshing = false;
          refreshDone$?.complete();
          refreshDone$ = null;
        }),
      );
    }),
  );
};
