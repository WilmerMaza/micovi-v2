/**
 * Widget de perfil en la topbar del shell Micovi.
 *
 * Chip de identidad + menú de cuenta (Configuración / Cerrar sesión).
 * Datos solo lectura desde AuthService. Configuración se oculta sin permiso.
 * El © legal no vive aquí — va en la pantalla de configuración.
 *
 * Usado por layout/nav; confirma logout vía LogoutModal.
 */
import { Component, computed, inject, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { displayNameFromEmail, roleLabel } from '../../../core/auth/user-role';
import { APP_ROUTES } from '../../../core/navigation/routes';
import { NavigationService } from '../../../core/services/navigation.service';
import { AuthService } from '../../../core/services/auth';
import { LogoutModal } from '../../../shared/components/logout-modal/logout-modal';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [MatMenuModule, LogoutModal, MatDividerModule, MatIconModule],
  templateUrl: './profile-menu.html',
  styleUrl: './profile-menu.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileMenu {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly navigation = inject(NavigationService);

  readonly showLogoutModal: WritableSignal<boolean> = signal(false);
  readonly isLoggingOut: WritableSignal<boolean> = signal(false);
  readonly canAccessSettings = this.navigation.canAccessSettings;

  private readonly authUser = this.authService.userSignal();

  /** Parte local del email o fallback neutro (sin nombres inventados). */
  readonly displayName = computed(() =>
    displayNameFromEmail(this.authUser()?.email),
  );

  /** Email completo para meta del menú. */
  readonly emailLabel = computed(() => this.authUser()?.email?.trim() || '');

  /** Rol real de Auth; si falta, meta de dominio “Entrenador”. */
  readonly roleName = computed(() => roleLabel(this.authUser()?.role));

  /** Iniciales derivadas del displayName para el squircle. */
  readonly initials = computed(() => {
    const raw = this.displayName().replace(/[._-]+/g, ' ').trim();
    const parts = raw.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return raw.slice(0, 2).toUpperCase() || 'U';
  });

  public showLogoutConfirmation(): void {
    this.showLogoutModal.set(true);
  }

  public async confirmLogout(): Promise<void> {
    if (this.isLoggingOut()) {
      return;
    }

    this.isLoggingOut.set(true);
    try {
      await firstValueFrom(this.authService.logout());
      this.showLogoutModal.set(false);
    } finally {
      this.isLoggingOut.set(false);
    }
  }

  public cancelLogout(): void {
    this.showLogoutModal.set(false);
  }

  public configuracion(): void {
    void this.router.navigateByUrl(APP_ROUTES.configuracion);
  }
}
