/**
 * Contrato del árbol de navegación de Micovi.
 *
 * El sidenav consume esta config. `visibility` evita meter jerarquía
 * contextual (plan → macrociclo) en el rail.
 */
export type NavSection = 'operacion' | 'biblioteca' | 'configuracion';

export type NavVisibility = 'nav' | 'contextual' | 'hidden';

export type NavChildrenPlacement = 'sidebar' | 'inner';

export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  icon: string;
  section: NavSection;
  permissions: readonly string[];
  children?: NavigationItem[];
  visibility?: NavVisibility;
  childrenPlacement?: NavChildrenPlacement;
  hint?: string;
}

export interface NavSectionGroup {
  section: NavSection;
  label: string;
  items: NavigationItem[];
}

export const NAV_SECTION_LABELS: Record<NavSection, string> = {
  operacion: 'Operación',
  biblioteca: 'Biblioteca',
  configuracion: 'Configuración',
};
