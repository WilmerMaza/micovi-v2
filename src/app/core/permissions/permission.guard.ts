/**
 * Guard de autorización por permisos declarados en `route.data.permissions`.
 *
 * Recorre el snapshot hacia el padre para heredar permisos de rutas
 * component-less (dominios). Si no hay clave, deja pasar (solo JwtGuard).
 * Sin permiso: redirige a Inicio, sin duplicar componentes.
 */
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
} from '@angular/router';
import { APP_ROUTES } from '../navigation/routes';
import { PermissionService } from './permission.service';

function requiredPermissions(
  route: ActivatedRouteSnapshot,
): string[] | undefined {
  let current: ActivatedRouteSnapshot | null = route;
  while (current) {
    const perms = current.data['permissions'] as string[] | undefined;
    if (perms?.length) {
      return perms;
    }
    current = current.parent;
  }
  return undefined;
}

export const permissionGuard: CanActivateFn = (route) => {
  const permissions = inject(PermissionService);
  const router = inject(Router);
  const required = requiredPermissions(route);

  if (permissions.hasAny(required)) {
    return true;
  }

  return router.createUrlTree([APP_ROUTES.inicio]);
};

export const permissionChildGuard: CanActivateChildFn = (childRoute, state) =>
  permissionGuard(childRoute, state);
