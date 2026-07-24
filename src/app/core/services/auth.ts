/**
 * Estado de autenticación del frontend (Angular Signals).
 *
 * ¿Por qué no guardamos tokens?
 * Los access/refresh tokens viven solo en cookies HttpOnly.
 * Este servicio mantiene en memoria el perfil del usuario para la UI y guards.
 *
 * Bootstrap: al arrancar la app, GET /api/auth/me restaura la sesión si las
 * cookies siguen válidas (ver app.config.ts → provideAppInitializer).
 *
 * Nunca usar localStorage/sessionStorage para tokens.
 */
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { MeResponse } from '../models/login-response.model';
import { MicoviApi } from './micovi.api';

export interface AuthUserState {
  id: string;
  email: string;
  role: string;
  schoolId: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly user = signal<AuthUserState | null>(null);
  private readonly initialized = signal(false);

  constructor(
    private readonly micoviapi: MicoviApi,
    private readonly router: Router,
  ) {}

  getUser(): AuthUserState | null {
    return this.user();
  }

  userSignal() {
    return this.user.asReadonly();
  }

  isInitialized(): boolean {
    return this.initialized();
  }

  setUser(user: AuthUserState): void {
    this.user.set(user);
    this.initialized.set(true);
  }

  clear(): void {
    this.user.set(null);
    this.initialized.set(true);
  }

  isAuthenticated(): boolean {
    return !!this.user();
  }

  /** Consulta el backend para restaurar sesión desde cookies HttpOnly. */
  loadSession(): Observable<AuthUserState | null> {
    return this.micoviapi.get<MeResponse>('/auth/me').pipe(
      tap((res) => this.setUser(this.mapUser(res))),
      catchError(() => {
        this.clear();
        return of(null);
      }),
    );
  }

  /** Ejecutado una vez al iniciar la app; evita llamadas duplicadas a /auth/me. */
  bootstrapSession(): Observable<AuthUserState | null> {
    if (this.initialized()) {
      return of(this.user());
    }
    return this.loadSession();
  }

  logout(): Observable<{ ok: true }> {
    return this.micoviapi.post<{ ok: true }>('/auth/logout', {}).pipe(
      tap(() => {
        this.clear();
        void this.router.navigate(['/login']);
      }),
    );
  }

  private mapUser(res: MeResponse): AuthUserState {
    return {
      id: res.id,
      email: res.email,
      role: res.role,
      schoolId: res.schoolId,
    };
  }
}
