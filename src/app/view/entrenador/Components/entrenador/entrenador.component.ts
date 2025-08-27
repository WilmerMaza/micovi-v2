import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Entrandor,
  listEntrenador,
  viewModalEntrenador,
} from '../../Model/entrenadorModel';
import { columnsEntrenadorValue } from '../../Model/columnDataEntrenador';
import { filterEntrenadorValue } from '../../Model/filtroDataEntrenador';
import { EntrenadorServices } from '../../services/EntrenadorServices.service';
import {
  NormaliceUpperUnicosValidators,
  NormaliceUpperValidators,
} from '../../../../utils/Validators';
import { filterResult } from '../../../../shared/model/filterModel';
import { ActionResponse } from '../../../../shared/model/Response/DefaultResponse';
import { CreateEntrenadorComponent } from '../createEntrenador/createEntrenador.component';
import { DinamicTableComponent } from '../../../../shared/components/dinamic-table/dinamic-table.component';
import { DinamicFilterComponent } from '../../../../shared/components/dinamic-filter/dinamic-filter.component';
import { ViewEntrenadorComponent } from '../viewEntrenador/viewEntrenador.component';

@Component({
  selector: 'app-entrenador',
  standalone: true,
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.scss'],
  imports: [
    CreateEntrenadorComponent,
    DinamicTableComponent,
    DinamicFilterComponent,
    ViewEntrenadorComponent,
  ],
})
export class EntrenadorComponent implements OnInit {
  public column = columnsEntrenadorValue;
  public data: listEntrenador = [];
  public isCheck: boolean = true;
  public selectItemCount: number = 0;
  public isDownload: boolean = false;
  public nameAdd: string = 'entrenador';
  public filtros = filterEntrenadorValue;
  public showViewEntrenador: viewModalEntrenador = { isVisible: false };
  public showViewCreateEntrenador: viewModalEntrenador = { isVisible: false };
  public dataSingle: Entrandor | undefined;
  constructor(
    private entrenadorServices$: EntrenadorServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findEntranador();
  }

  findEntranador(Name?: string, identification?: string): void {
    const filterEntranador = {
      name: Name,
      identification: identification,
    };

    this.entrenadorServices$
      .getAllEntrenadores(filterEntranador)
      .subscribe((response: listEntrenador) => {
        response.forEach((item: Entrandor) => {
          item.name = NormaliceUpperUnicosValidators.normaliceData(item.name);
        });
        NormaliceUpperValidators.normaliceData(response);

        this.data = response;
      });
  }

  getselectItemCount($event: number): void {
    this.selectItemCount = $event;
  }

  getDataFilter(event: filterResult): void {
    const {
      filterData: { Name, identificacion },
    } = event;

    this.findEntranador(Name, identificacion);
  }

  getActionEvent($event: ActionResponse): void {
    const {
      action: { action },
      data,
    } = $event;

    switch (action) {
      case 'ver':
        const dataResponse = {
          ...data,
        };

        this.showViewEntrenador = {
          isVisible: true,
          data: dataResponse,
        };
        break;
      case 'Editar':
        this.showViewCreateEntrenador = {
          isVisible: true,
          data: $event.data,
        };
        break;
      case 'planAnual':
        this.router.navigate(['/plan-anual'], {
          queryParams: { coachId: data.ID },
        });
        break;
      default:
        break;
    }
  }

  editarEntrenadorView($event: Entrandor): void {
    this.showViewCreateEntrenador = {
      isVisible: true,
      data: $event,
    };
    this.showViewEntrenador = { isVisible: false };
  }

  getActionEventFilter($event: ActionResponse): void {
    const { action } = $event;

    switch (action) {
      case 'add':
        this.showViewCreateEntrenador = { isVisible: true };
        break;
      default:
        break;
    }
  }
}
