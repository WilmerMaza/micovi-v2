/**
 * Panel lateral de filtros de listado.
 *
 * Se abre solo con el botón «Filtrar». Distingue borrador (el panel) de
 * filtros aplicados (contador, chips y petición HTTP). No dispara consultas
 * al marcar opciones: una petición al pulsar Aplicar, al restaurar o al
 * quitar un chip.
 *
 * Usado junto a `dinamic-toolbar` (búsqueda y acciones de tabla).
 */
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  ControlItem,
  DynamicObject,
  FilterChip,
  filterResult,
  JsonDataItem,
} from '../../model/filterModel';
import { MATERIAL_IMPORTS } from '../../modules/material-imports';

const MAX_VISIBLE_CHIPS = 3;

@Component({
  selector: 'app-dinamic-filter',
  templateUrl: './dinamic-filter.component.html',
  styleUrls: ['./dinamic-filter.component.scss'],
  standalone: true,
  imports: [
    ...MATERIAL_IMPORTS,
    CommonModule,
    FormsModule,
    A11yModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class DinamicFilterComponent {
  jsonData: JsonDataItem[] = [];
  readonly panelOpen = signal(false);
  readonly appliedCount = signal(0);
  readonly appliedChips = signal<FilterChip[]>([]);
  readonly isDirty = signal(false);

  private appliedFilterData: DynamicObject<any> = {};

  @Input('dataFilter') set setDataFilter(value: JsonDataItem[]) {
    this.jsonData = value ?? [];
    if (!Object.keys(this.appliedFilterData).length) {
      this.appliedFilterData = this.buildFilterData();
    }
    this.syncDirty();
  }

  @Output() filterResult = new EventEmitter<filterResult>();

  get filterTriggerLabel(): string {
    const n = this.appliedCount();
    if (n === 1) {
      return 'Filtrar, 1 aplicado';
    }
    return n > 1 ? `Filtrar, ${n} aplicados` : 'Filtrar';
  }

  get visibleChips(): FilterChip[] {
    return this.appliedChips().slice(0, MAX_VISIBLE_CHIPS);
  }

  get hiddenChipCount(): number {
    return Math.max(0, this.appliedChips().length - MAX_VISIBLE_CHIPS);
  }

  get canRestore(): boolean {
    return (
      this.hasValues(this.buildFilterData()) ||
      this.hasValues(this.appliedFilterData)
    );
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.panelOpen()) {
      this.closePanel();
    }
  }

  openPanel(): void {
    this.syncDirty();
    this.panelOpen.set(true);
  }

  closePanel(): void {
    this.panelOpen.set(false);
  }

  togglePanel(): void {
    if (this.panelOpen()) {
      this.closePanel();
      return;
    }
    this.openPanel();
  }

  onDraftChange(): void {
    this.syncDirty();
  }

  applyFilters(): void {
    if (!this.isDirty()) {
      this.closePanel();
      return;
    }
    this.commitAndEmit(this.buildFilterData());
    this.closePanel();
  }

  restoreAll(): void {
    this.clearDraft();
    this.commitAndEmit(this.buildFilterData());
    this.closePanel();
  }

  clearItemFilter(item: JsonDataItem, event?: Event): void {
    event?.stopPropagation();
    if (item.typeFilter === 'check') {
      item.control.forEach((elem) => {
        elem.checked = false;
      });
    } else if (item.control[0]) {
      item.control[0].value = '';
    }
    this.syncDirty();
  }

  removeChip(chip: FilterChip): void {
    const item = this.jsonData.find((row) => row.property === chip.property);
    if (!item) {
      return;
    }
    if (item.typeFilter === 'check') {
      const control = item.control.find((row) => row.value === chip.value);
      if (control) {
        control.checked = false;
      }
    } else if (item.control[0]) {
      item.control[0].value = '';
    }
    this.commitAndEmit(this.buildFilterData());
  }

  inputPlaceholder(item: JsonDataItem): string {
    return item.title || 'Valor';
  }

  itemHasValue(item: JsonDataItem): boolean {
    if (item.typeFilter === 'check') {
      return item.control.some((row) => this.isChecked(row));
    }
    return String(item.control[0]?.value ?? '').trim().length > 0;
  }

  private isChecked(control: ControlItem): boolean {
    return control.checked === true;
  }

  private buildFilterData(): DynamicObject<any> {
    const data: DynamicObject<any> = {};
    this.jsonData.forEach((item) => {
      if (item.typeFilter === 'check') {
        data[item.property] = item.control
          .filter((row) => this.isChecked(row))
          .map((row) => row.value);
      } else {
        data[item.property] = String(item.control[0]?.value ?? '').trim();
      }
    });
    return data;
  }

  private buildChips(data: DynamicObject<any>): FilterChip[] {
    const chips: FilterChip[] = [];
    this.jsonData.forEach((item) => {
      const raw = data[item.property];
      if (item.typeFilter === 'check' && Array.isArray(raw)) {
        raw.forEach((value: string) => {
          const option = item.control.find((row) => row.value === value);
          chips.push({
            property: item.property,
            value,
            label: option?.name ?? value,
          });
        });
        return;
      }
      const text = String(raw ?? '').trim();
      if (text) {
        chips.push({
          property: item.property,
          value: text,
          label: `${item.title}: ${text}`,
        });
      }
    });
    return chips;
  }

  private countApplied(data: DynamicObject<any>): number {
    return this.jsonData.filter((item) => {
      const raw = data[item.property];
      if (Array.isArray(raw)) {
        return raw.length > 0;
      }
      return String(raw ?? '').trim().length > 0;
    }).length;
  }

  private hasValues(data: DynamicObject<any>): boolean {
    return this.countApplied(data) > 0;
  }

  private serialize(data: DynamicObject<any>): string {
    const keys = Object.keys(data).sort();
    const normalized: DynamicObject<any> = {};
    keys.forEach((key) => {
      const value = data[key];
      normalized[key] = Array.isArray(value) ? [...value].sort() : value;
    });
    return JSON.stringify(normalized);
  }

  private syncDirty(): void {
    this.isDirty.set(
      this.serialize(this.buildFilterData()) !==
        this.serialize(this.appliedFilterData)
    );
  }

  private clearDraft(): void {
    this.jsonData.forEach((item) => this.clearItemFilter(item));
  }

  private commitAndEmit(filterData: DynamicObject<any>): void {
    this.appliedFilterData = filterData;
    this.appliedCount.set(this.countApplied(filterData));
    this.appliedChips.set(this.buildChips(filterData));
    this.syncDirty();
    this.filterResult.emit({
      jsonData: this.jsonData,
      filterData,
    });
  }
}
