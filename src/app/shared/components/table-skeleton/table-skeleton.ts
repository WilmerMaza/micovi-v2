/**
 * Skeleton de listado tabular Micovi.
 *
 * Refleja la estructura de `dinamic-filter` + `dinamic-table` (barra de filtros
 * y filas densas) mientras llegan datos del backend.
 *
 * Tokens neutros MASTER; sin lógica de negocio ni llamadas HTTP.
 */
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  template: `
    <div
      class="table-skeleton"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Cargando listado"
    >
      @if (showFilters()) {
        <div class="table-skeleton__filters" aria-hidden="true">
          <div class="table-skeleton__filter-bar"></div>
          <div class="table-skeleton__filter-actions">
            @for (chip of filterChips(); track $index) {
              <div class="table-skeleton__chip"></div>
            }
          </div>
        </div>
      }

      <div class="table-skeleton__table" aria-hidden="true">
        <div class="table-skeleton__head">
          @if (showCheckbox()) {
            <div class="table-skeleton__cell table-skeleton__cell--checkbox table-skeleton__cell--head"></div>
          }
          @for (col of columnSlots(); track $index) {
            <div class="table-skeleton__cell table-skeleton__cell--head"></div>
          }
        </div>

        <div class="table-skeleton__body">
          @for (row of rowSlots(); track $index) {
            <div class="table-skeleton__row">
              @if (showCheckbox()) {
                <div class="table-skeleton__cell table-skeleton__cell--checkbox"></div>
              }
              @for (col of columnSlots(); track $index) {
                <div
                  class="table-skeleton__cell"
                  [style.width.%]="cellWidth($index)"
                ></div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './table-skeleton.scss',
})
export class TableSkeletonComponent {
  readonly rows = input(8);
  readonly columns = input(6);
  readonly showFilters = input(true);
  readonly showCheckbox = input(true);
  readonly filterChips = input([0, 1, 2]);

  rowSlots(): number[] {
    return Array.from({ length: this.rows() }, (_, index) => index);
  }

  columnSlots(): number[] {
    return Array.from({ length: this.columns() }, (_, index) => index);
  }

  /** Variación leve de ancho para evitar filas idénticas. */
  cellWidth(index: number): number {
    const widths = [100, 88, 72, 92, 64, 80];
    return widths[index % widths.length];
  }
}
