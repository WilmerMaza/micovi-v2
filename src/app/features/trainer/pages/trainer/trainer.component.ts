import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Trainer,
  listTrainer,
  viewModalTrainer,
  requestTrainerFilter,
} from '../../Models/trainerModel';
import { columnsTrainerValue } from '../../Models/columnDataTrainer';
import { filterTrainerValue } from '../../Models/filtroDataTrainer';
import { TrainerService } from '../../services/trainer.service';
import {
  NormaliceUpperUnicosValidators,
  NormaliceUpperValidators,
} from '../../../../utils/Validators';
import { filterResult } from '../../../../shared/model/filterModel';
import { ActionResponse } from '../../../../shared/model/Response/DefaultResponse';
import { CreateTrainerComponent } from '../../Components/create-trainer/create-trainer.component';
import { DinamicTableComponent } from '../../../../shared/components/dinamic-table/dinamic-table.component';
import { DinamicFilterComponent } from '../../../../shared/components/dinamic-filter/dinamic-filter.component';
import { ViewTrainerComponent } from '../../Components/view-trainer/view-trainer.component';

@Component({
  selector: 'app-trainer',
  standalone: true,
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss'],
  imports: [
    CreateTrainerComponent,
    DinamicTableComponent,
    DinamicFilterComponent,
    ViewTrainerComponent,
  ],
})
export class TrainerComponent implements OnInit {
  public column = columnsTrainerValue;
  public data: listTrainer = [];
  public isCheck: boolean = true;
  public selectItemCount: number = 0;
  public isDownload: boolean = false;
  public nameAdd: string = 'entrenador';
  public filtros = filterTrainerValue;
  public showViewTrainer: viewModalTrainer = { isVisible: false };
  public showViewCreateTrainer: viewModalTrainer = { isVisible: false };
  public dataSingle: Trainer | undefined;
  constructor(
    private trainerService$: TrainerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findTrainer();
  }

  findTrainer(Name?: string, identification?: string): void {
    const filterTrainer: requestTrainerFilter = {
      name: Name,
      identification: identification,
    };

    this.trainerService$
      .getAllTrainers(filterTrainer)
      .subscribe((response: listTrainer) => {
        response.forEach((item: Trainer) => {
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

    this.findTrainer(Name, identificacion);
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

        this.showViewTrainer = {
          isVisible: true,
          data: dataResponse,
        };
        break;
      case 'Editar':
        this.showViewCreateTrainer = {
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

  editTrainerView($event: Trainer): void {
    this.showViewCreateTrainer = {
      isVisible: true,
      data: $event,
    };
    this.showViewTrainer = { isVisible: false };
  }

  getActionEventFilter($event: ActionResponse): void {
    const { action } = $event;

    switch (action) {
      case 'add':
        this.showViewCreateTrainer = { isVisible: true };
        break;
      default:
        break;
    }
  }
}
