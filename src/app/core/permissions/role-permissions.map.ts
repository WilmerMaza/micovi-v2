/**
 * Mapa inicial rol → permisos.
 *
 * COACH: operación y biblioteca, sin configuración institucional.
 * SCHOOL / ADMIN: operación + configuración.
 * ATHLETE: solo inicio (fuera del alcance operativo de esta etapa).
 */
import { UserRole } from '../auth/user-role';
import {
  CONFIG_PERMISSIONS,
  OPERATION_PERMISSIONS,
  Permission,
} from './permissions';

export const ROLE_PERMISSIONS: Record<string, readonly Permission[]> = {
  [UserRole.COACH]: OPERATION_PERMISSIONS,
  [UserRole.SCHOOL]: [...OPERATION_PERMISSIONS, ...CONFIG_PERMISSIONS],
  [UserRole.ADMIN]: [...OPERATION_PERMISSIONS, ...CONFIG_PERMISSIONS],
  [UserRole.ATHLETE]: [Permission.NavInicio],
};
