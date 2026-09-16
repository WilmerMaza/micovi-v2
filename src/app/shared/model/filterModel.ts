/**
 * Criterios de un control de filtro (opción de checkbox o valor de input).
 *
 * `code` identifica la opción (p. ej. ID de categoría). `checked` es el estado
 * de selección en el panel; no reutilizar `code` como ngModel del checkbox.
 */
export interface ControlItem {
  name: string;
  value: string;
  code: string;
  checked?: boolean;
}

/**
 * Definición de un filtro del panel lateral.
 *
 * `disable` se conserva por compatibilidad de datos; el panel ya no lo usa
 * como interruptor: un filtro aplica solo si tiene valor y el usuario pulsa Aplicar.
 */
export interface JsonDataItem {
  title: string;
  property: string;
  disable: boolean;
  isOpen: boolean;
  typeFilter: string;
  control: ControlItem[];
}

export interface filterResult {
  jsonData: JsonDataItem[];
  filterData: DynamicObject<any>;
}

export interface DynamicObject<T> {
  [key: string]: T;
}

export interface DynamicError<T> {
  [key: string]: T;
}

/** Chip compacto de un valor ya aplicado (fuera del panel). */
export interface FilterChip {
  property: string;
  value: string;
  label: string;
}
