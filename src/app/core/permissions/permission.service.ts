/**
 * Resolución de permisos a partir del rol autenticado.
 *
 * Un único punto de verdad para sidenav, ProfileMenu y `permissionGuard`.
 * No duplicar menús por rol: se filtra `NAVIGATION_CONFIG`.
 */
import { computed, inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth';
import { Permission } from './permissions';
import { ROLE_PERMISSIONS } from './role-permissions.map';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private readonly auth = inject(AuthService);
  private readonly user = this.auth.userSignal();

  readonly permissions = computed<readonly Permission[]>(() => {
    const role = this.user()?.role;
    if (!role) {
      return [];
    }
    return ROLE_PERMISSIONS[role] ?? [];
  });

  can(permission: string): boolean {
    return this.permissions().includes(permission as Permission);
  }

  hasAny(required: readonly string[] | undefined): boolean {
    if (!required?.length) {
      return true;
    }
    const granted = this.permissions();
    return required.some((permission) =>
      granted.includes(permission as Permission),
    );
  }

  hasRole(...roles: string[]): boolean {
    const current = this.user()?.role;
    return !!current && roles.includes(current);
  }
}
