/**
 * Orquestador del flujo de login desde la UI.
 *
 * Envía credenciales a POST /api/auth/login. El backend responde con el perfil
 * y establece cookies HttpOnly (access/refresh). Este servicio actualiza
 * AuthService en memoria y redirige a Inicio.
 *
 * Separado del componente para reutilizar el mismo flujo si se agrega otro
 * punto de entrada (ej. modal, SSO).
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../../core/services/auth';
import { APP_ROUTES } from '../../../../core/navigation/routes';
import { MeResponse } from '../../../../core/models/login-response.model';
import { MicoviApi } from '../../../../core/services/micovi.api';
import { fireErrorToast } from '../../../../utils/alert_Toast';

@Injectable({
  providedIn: 'root',
})
export class Session {
  constructor(
    private api: MicoviApi,
    private auth: AuthService,
    private router: Router,
  ) {}

  sessionLogin(data: {
    email: string;
    password: string;
  }): Observable<MeResponse> {
    return this.api.post<MeResponse>('/auth/login', data).pipe(
      tap((user) => {
        this.auth.setUser({
          id: user.id,
          email: user.email,
          role: user.role,
          schoolId: user.schoolId,
        });
        void this.router.navigate([APP_ROUTES.inicio]);
      }),
      tap({
        error: () => {
          void fireErrorToast('Usuario o contraseña incorrecta');
        },
      }),
    );
  }
}
