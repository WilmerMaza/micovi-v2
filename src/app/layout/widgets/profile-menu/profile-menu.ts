/**
 * Widget de perfil en la topbar del shell Micovi.
 *
 * Chip de identidad + menú de cuenta (Configuración / Cerrar sesión).
 * Datos solo lectura desde AuthService; no altera logout ni ruta configuration.
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
import { AuthService } from '../../../core/services/auth';
import { LogoutModal } from '../../../shared/components/logout-modal/logout-modal';

/** Etiquetas de rol conocidas; el resto se muestra tal cual desde Auth. */
const ROLE_LABELS: Record<string, string> = {
  coach: 'Entrenador',
  trainer: 'Entrenador',
  entrenador: 'Entrenador',
  admin: 'Administrador',
  coordinator: 'Coordinador',
  coordinador: 'Coordinador',
};

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

  readonly showLogoutModal: WritableSignal<boolean> = signal(false);

  private readonly authUser = this.authService.userSignal();

  /** Parte local del email o fallback neutro (sin nombres inventados). */
  readonly displayName = computed(() => {
    const email = this.authUser()?.email?.trim();
    if (!email) {
      return 'Usuario';
    }
    const local = email.split('@')[0]?.trim();
    return local || email;
  });

  /** Email completo para meta del menú. */
  readonly emailLabel = computed(() => this.authUser()?.email?.trim() || '');

  /** Rol real de Auth; si falta, meta de dominio “Entrenador”. */
  readonly roleLabel = computed(() => {
    const role = this.authUser()?.role?.trim();
    if (!role) {
      return 'Entrenador';
    }
    return ROLE_LABELS[role.toLowerCase()] ?? role;
  });

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
    this.showLogoutModal.set(false);
    await firstValueFrom(this.authService.logout());
  }

  public cancelLogout(): void {
    this.showLogoutModal.set(false);
  }

  public configuracion(): void {
    this.router.navigate(['configuration']);
  }
}
