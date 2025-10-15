import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../../../core/services/auth';
import { MicoviApi } from '../../../../core/services/micovi.api';
import { Toast } from '../../../../utils/alert_Toast';
import { DataUser } from '../../../models/dataUser';

@Injectable({
  providedIn: 'root',
})
export class Session {
  constructor(
    private api: MicoviApi,
    private auth: AuthService,
    private router: Router
  ) {}

  /** Login: backend setea cookie HttpOnly */
  sessionLogin(data: { Name: string; Password: string }): void {
    this.api
      .post<{ user: DataUser }>(`/login`, data)
      .pipe(
        tap((res) => {
          this.auth.setUser(res.user); // guarda usuario en señal
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          Toast.fire({
            icon: 'error',
            title: 'Usuario o contraseña incorrecta',
          });
        },
      });
  }
}
