/**
 * Contrato de columnas / menú para `app-dinamic-table`.
 *
 * La tabla no conoce dominio (deportista, indicador, etc.): solo renderiza
 * y emite `actionEvent`. Las reglas de enable viven en el schema del módulo.
 */

/** Ítem de menú declarado en el schema de columnas. */
export interface DinamicMenuItem {
  action: string;
  text: string;
  /**
   * Key en la fila que debe ser truthy para habilitar el ítem.
   * Ej. enableWhen: 'HasIndicators' → disabled si !row.HasIndicators.
   */
  enableWhen?: string;
  /** Separador visual antes de este ítem (menú plano). */
  dividerBefore?: boolean;
  /** Legado: submenú anidado; se aplana en render. */
  menu?: DinamicMenuItem[];
}

/** Ítem ya aplanado para el panel ⋯. */
export type FlatMenuItem =
  | { kind: 'label'; text: string }
  | {
      kind: 'item';
      action: string;
      text: string;
      enableWhen?: string;
      dividerBefore?: boolean;
    };

/** Variante visual de botón en celda. */
export type DinamicCellButtonVariant = 'outline' | 'link' | 'icon-close';

/** Config normalizada de botón en celda (desde type button* del schema). */
export interface DinamicCellButton {
  action: string;
  label: string;
  variant: DinamicCellButtonVariant;
  enableWhen?: string;
  ariaLabel?: string;
}

/** Columna dinámica (schema por módulo). */
export interface DinamicColumn {
  displayname: string;
  name?: string;
  estado?: boolean;
  type?: string;
  attr?: string;
  module?: string;
  menu?: DinamicMenuItem[];
  /** Acción emitida por columnas tipo botón. */
  action?: string;
  /** Texto del botón en celda. */
  label?: string;
  variant?: DinamicCellButtonVariant;
  enableWhen?: string;
}
