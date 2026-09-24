/**
 * Roles de usuario alineados al backend (`UserRole`).
 *
 * Fuente única en frontend para mapas de permisos y etiquetas de UI.
 * No duplicar literales de rol en menús ni guards.
 */
export const UserRole = {
  ADMIN: 'ADMIN',
  SCHOOL: 'SCHOOL',
  COACH: 'COACH',
  ATHLETE: 'ATHLETE',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

/** Etiquetas de rol para chip de perfil y pie del rail. */
export const ROLE_LABELS: Record<string, string> = {
  admin: 'Administrador',
  school: 'Escuela deportiva',
  coach: 'Entrenador',
  athlete: 'Deportista',
  trainer: 'Entrenador',
  entrenador: 'Entrenador',
  coordinator: 'Coordinador',
  coordinador: 'Coordinador',
};

export function roleLabel(role: string | null | undefined): string {
  const key = role?.trim().toLowerCase();
  if (!key) {
    return 'Entrenador';
  }
  return ROLE_LABELS[key] ?? role!.trim();
}

export function displayNameFromEmail(email: string | null | undefined): string {
  const trimmed = email?.trim();
  if (!trimmed) {
    return 'Usuario';
  }
  const local = trimmed.split('@')[0]?.trim();
  return local || trimmed;
}
