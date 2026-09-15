/**
 * Guard de rutas públicas de auth (login/register).
 *
 * Si la sesión ya está restaurada, redirige al dashboard. Espera el bootstrap
 * de auth antes de decidir para evitar flash de login en usuarios con cookie válida.
 */
import { inject, Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root',
})
export class IgnoreLoginGuard {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async canActivate(): Promise<boolean | UrlTree> {
    if (!this.authService.isInitialized()) {
      await firstValueFrom(this.authService.bootstrapSession());
    }

    if (this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/dashboard']);
    }

    return true;
  }
}
