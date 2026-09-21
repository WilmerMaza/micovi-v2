import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MATERIAL_IMPORTS } from '../../../../shared/modules/material-imports';
import { DinamicTableComponent } from '../../../../shared/components/dinamic-table/dinamic-table.component';
import { DinamicFilterComponent } from '../../../../shared/components/dinamic-filter/dinamic-filter.component';
import { DinamicToolbarComponent } from '../../../../shared/components/dinamic-toolbar/dinamic-toolbar.component';
import { TableSkeletonComponent } from '../../../../shared/components/table-skeleton/table-skeleton';
import { ActionResponse } from '../../../../shared/model/Response/DefaultResponse';
import { filterResult } from '../../../../shared/model/filterModel';
import { columnsEntrenadorValue } from '../../../../view/entrenador/Model/columnDataEntrenador';

@Component({
  selector: 'app-entrenador',
  standalone: true,
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.scss'],
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatButtonModule,
    MatIconModule,
    ...MATERIAL_IMPORTS,
    DinamicTableComponent,
    DinamicFilterComponent,
    DinamicToolbarComponent,
    TableSkeletonComponent,
  ],
})
export class EntrenadorComponent implements OnInit {
  public data = columnsEntrenadorValue;
  public dataEntrenador: any[] = [];
  public isCheck = true;
  readonly isListLoading = signal(false);
  readonly listError = signal(false);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadEntrenadores();
  }

  loadEntrenadores(): void {
    this.isListLoading.set(true);
    // Mock vacío reutilizando layout de deportista — luego conectar a EntrenadorServices
    setTimeout(() => {
      this.dataEntrenador = [];
      this.isListLoading.set(false);
    }, 300);
  }

  getActionEvent(event: ActionResponse): void {
    const action = typeof event.action === 'string' ? event.action : (event.action as any)?.action;
    if (action === 'add' || action === 'Añadir entrenador') {
      // TODO: abrir modal/formulario entrenador (campos te los pido luego)
      console.log('Añadir entrenador');
      return;
    }
    if (action === 'ver') {
      console.log('Ver', event.data);
    }
    if (action === 'Editar') {
      console.log('Editar', event.data);
    }
  }

  getDataFilter(event: filterResult): void {
    this.loadEntrenadores();
  }

  onSearch(name: string): void {
    this.loadEntrenadores();
  }

  onSearchClear(): void {
    this.loadEntrenadores();
  }

  emptyTableMessage(): string {
    if (this.listError()) return 'No se pudo cargar el listado. Inténtalo de nuevo.';
    return 'No hay entrenadores para mostrar.';
  }
}
