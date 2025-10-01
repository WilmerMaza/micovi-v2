import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Toast } from '../../../../utils/alert_Toast';
import { AuthService } from '../../../../core/services/auth';
import { environment } from '../../../../../environments/environment';
import { MicoviApi } from '../../../../core/services/micovi.api';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  submitted = false;
  private API_URL = environment.micovi_api; // ⚡ mejor tomarlo de environment

  constructor(
    private http: MicoviApi,
    private auth: AuthService,
    private router: Router
  ) {}

  /** Login: backend setea cookie HttpOnly */
  sessionLogin(credentials: { email: string; password: string }): void {
    this.submitted = true;

    this.http
      .post<{ user: any }>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((res) => {
          this.auth.setUser(res.user); // guarda usuario en señal
          this.router.navigate(['/dashboard']);
        })
      )
      .subscribe({
        error: () =>
          Toast.fire({
            icon: 'error',
            title: 'Usuario o contraseña incorrecta',
          }),
      });
  }


}

