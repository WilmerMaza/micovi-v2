/**
 * Tabla dinámica compartida Micovi (listados reutilizables).
 *
 * Renderiza columnas tipadas (text, date, button*, check, acción+menú)
 * sobre un MatTable; emite actionEvent { action, data } hacia las vistas.
 *
 * No conoce dominio: enable/disable sale del schema (`enableWhen` en la fila).
 * Menús anidados legado (action === 'Menu') se aplanan en render.
 *
 * Guía: `src/app/shared/components/dinamic-table/README.md`
 * Contrato: `dinamic-table.model.ts`
 */
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { ActionResponse } from '../../model/Response/DefaultResponse';
import { dataToPass, DinamicService } from '../../services/dinamic.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import {
  DinamicCellButton,
  DinamicColumn,
  DinamicMenuItem,
  FlatMenuItem,
} from './dinamic-table.model';

export type { DinamicCellButton, DinamicColumn, DinamicMenuItem, FlatMenuItem };

/** Nombres de columna que se tratan como métrica (tabular-nums). */
const METRIC_COLUMN_KEYS = [
  'weight',
  'peso',
  'kg',
  'rpe',
  'series',
  'reps',
  'percentage',
  'porcentaje',
  '%',
];

const BUTTON_COLUMN_TYPES = new Set([
  'button',
  'buttons',
  'button Ver',
  'button indicador',
  'buttonX',
]);

@Component({
  selector: 'app-dinamic-table',
  templateUrl: './dinamic-table.component.html',
  styleUrls: ['./dinamic-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'dinamic-table-host' },
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIcon,
    MatPaginatorModule,
    MatMenuModule,
    MatSortModule,
  ],
  standalone: true,
})
export class DinamicTableComponent implements AfterViewInit {
  public length = 50;
  public pageSize = 10;
  public pageIndex = 0;
  public pageSizeOptions = [5, 10, 25];
  public minWidth = '950px';
  public hidePageSize = false;
  public showPageSizeOptions = true;
  public showFirstLastButtons = true;
  public disabled = false;
  public noneData = 'No hay registros para mostrar.';
  /** Mensaje de vacío (filtros / error); si falta, usa `noneData`. */
  @Input() emptyMessage = '';
  public displayedColumns: DinamicColumn[] = [];
  public columnsToDisplay: string[] = [];
  public dataSource = new MatTableDataSource<any>([]);
  public selection = new SelectionModel<any>(true, []);

  @Input('isCheckBox') isCheckBox = false;
  @Input('isPaginador') isPaginador = true;
  @Input('editComplement') editComplement = false;
  m: any;
  @Input('columns') set setColumns(value: DinamicColumn[] | any[]) {
    this.displayedColumns = (value ?? []) as DinamicColumn[];
    this.setColumn();
  }

  @Input('dataSource') set setDataSource(value: any[]) {
    this.dataSource.data = value;
  }

  @Output() actionEvent = new EventEmitter<ActionResponse>();
  pageEvent: PageEvent | undefined;

  constructor(private service$: DinamicService) {
    this.service$.dataToPass$.subscribe((data: dataToPass) => {
      if (data.isEspecial) {
        this.dataAction(data.eventName, this.selection.selected);
      }
    });
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.isPaginador) {
      this.paginator._intl.itemsPerPageLabel = 'Resultados por página';
      this.dataSource.paginator = this.paginator;
    }
  }

  isAllSelected(): boolean {
    var countSelect = this.selection.selected.length;
    this.service$.setDataSelectNumber(countSelect);
    const numSelected = countSelect;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return this.isAllSelected()
        ? 'Deseleccionar todas las filas'
        : 'Seleccionar todas las filas';
    }
    const rowHint = row.position != null ? ` ${row.position + 1}` : '';
    return this.selection.isSelected(row)
      ? `Deseleccionar fila${rowHint}`
      : `Seleccionar fila${rowHint}`;
  }

  isMetricColumn(item: {
    name?: string;
    displayname?: string;
    type?: string;
  }): boolean {
    const name = String(item?.name ?? '').toLowerCase();
    const label = String(item?.displayname ?? '').toLowerCase();
    return METRIC_COLUMN_KEYS.some(
      (key) => name.includes(key) || label.includes(key)
    );
  }

  handlePageEvent(e: PageEvent): void {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string): void {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  setColumn(): void {
    this.columnsToDisplay = this.displayedColumns
      .filter((c) => c.estado)
      .map((c) => c.displayname);
    if (this.isCheckBox) {
      this.columnsToDisplay.unshift('select');
    }
  }

  dataAction(action: any, row: any): void {
    const actionReturn: ActionResponse = {
      action,
      data: row,
    };
    this.actionEvent.emit(actionReturn);
  }

  dataActionCheck(_action: any): void {
    const actionReturn: ActionResponse = {
      action: { action: 'Select' },
      data: this.selection.selected,
    };
    this.actionEvent.emit(actionReturn);
  }

  /**
   * Menú plano. Expande legado `action === 'Menu'` preservando enableWhen / dividerBefore.
   */
  flattenMenu(menu: DinamicMenuItem[] | null | undefined): FlatMenuItem[] {
    const out: FlatMenuItem[] = [];
    for (const item of menu ?? []) {
      if (item.action === 'Menu' && item.menu?.length) {
        item.menu.forEach((sub, index) => {
          out.push({
            kind: 'item',
            action: String(sub.action ?? ''),
            text: String(sub.text ?? '').trim() || String(item.text ?? ''),
            enableWhen: sub.enableWhen,
            dividerBefore: index === 0 ? item.dividerBefore : sub.dividerBefore,
          });
        });
      } else if (item.action && item.action !== 'Menu') {
        out.push({
          kind: 'item',
          action: String(item.action),
          text: String(item.text ?? item.action),
          enableWhen: item.enableWhen,
          dividerBefore: item.dividerBefore,
        });
      }
    }
    return out;
  }

  showMenuDividerBefore(items: FlatMenuItem[], index: number): boolean {
    const curr = items[index];
    return curr?.kind === 'item' && !!curr.dividerBefore;
  }

  /**
   * Deshabilita el ítem si define enableWhen y la fila no cumple (valor falsy).
   * Sin enableWhen → siempre habilitado (la tabla no inventa reglas de dominio).
   */
  isMenuItemDisabled(
    item: { enableWhen?: string },
    row: Record<string, unknown> | null | undefined
  ): boolean {
    const key = item.enableWhen;
    if (!key) return false;
    return !row?.[key];
  }

  isButtonColumn(item: DinamicColumn): boolean {
    return BUTTON_COLUMN_TYPES.has(String(item?.type ?? ''));
  }

  /**
   * Normaliza columnas button* a config genérica.
   * Fallbacks de type legado solo si el schema no declara action/label.
   */
  getCellButton(item: DinamicColumn): DinamicCellButton {
    const type = String(item.type ?? '');
    if (type === 'buttonX') {
      return {
        action: item.action ?? 'eliminar',
        label: '',
        variant: 'icon-close',
        enableWhen: item.enableWhen,
        ariaLabel: item.label ?? 'Eliminar fila',
      };
    }
    if (type === 'button indicador') {
      return {
        action: item.action ?? 'ver indicador',
        label: item.label ?? 'Ver indicador',
        variant: item.variant ?? 'link',
        enableWhen: item.enableWhen,
      };
    }
    if (type === 'buttons') {
      return {
        action: item.action ?? 'ver indicador',
        label: item.label ?? 'Ver',
        variant: item.variant ?? 'outline',
        enableWhen: item.enableWhen,
      };
    }
    if (type === 'button Ver') {
      return {
        action: item.action ?? 'ver ejercicio',
        label: item.label ?? 'Ver',
        variant: item.variant ?? 'outline',
        enableWhen: item.enableWhen,
      };
    }
    return {
      action: item.action ?? 'action',
      label: item.label ?? 'Ver',
      variant: item.variant ?? 'outline',
      enableWhen: item.enableWhen,
    };
  }

  isCellButtonDisabled(
    button: DinamicCellButton,
    row: Record<string, unknown> | null | undefined
  ): boolean {
    return this.isMenuItemDisabled(button, row);
  }

  onCellButtonClick(
    button: DinamicCellButton,
    row: Record<string, unknown>
  ): void {
    if (this.isCellButtonDisabled(button, row)) return;
    this.dataAction(button.action, row);
  }

  /** Texto / date / check: no es botón ni acción. */
  isPlainDataColumn(item: DinamicColumn): boolean {
    const type = item.type;
    if (type === 'date' || type === 'check' || type === 'action') return false;
    if (this.isButtonColumn(item)) return false;
    return true;
  }
}
