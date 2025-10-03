import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SportsmanService } from './services/sportsman.service';
import { Sportsman } from '../models/DataSportsman';
import { columnsValue } from '../models/columnDataSportman';
import { jsonData, SportsmanData } from '../models/dataFilterSportsman';
import { HistorialCategory, visible } from '../models/HistorialCategoryModel';
import { listInfo } from '../../models/interface';
import { Imgs } from '../../core/services/imgs';
import { gender } from '../../features/trainer/Models/constantesTrainer';
import { categoryModel } from '../models/categoryModel';
import {
  DateValidators,
  NormaliceUpperUnicosValidators,
} from '../../utils/Validators';
import { ImageLoader } from '../../utils/readerBlodImg';
import { ActionResponse } from '../../shared/model/Response/DefaultResponse';
import { filterResult } from '../../shared/model/filterModel';
import { DinamicFilterComponent } from '../../shared/components/dinamic-filter/dinamic-filter.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MATERIAL_IMPORTS } from '../../shared/modules/material-imports';
import { DinamicTableComponent } from '../../shared/components/dinamic-table/dinamic-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSportsmanComponent } from './Components/create-sportsman/create-sportsman.component';

@Component({
  selector: 'app-sportsman',
  templateUrl: './sportsman.component.html',
  styleUrls: ['./sportsman.component.scss'],
  standalone: true,
  imports: [
    DinamicFilterComponent,
    MatCard,
    ...MATERIAL_IMPORTS,
    MatCardContent,
    DinamicTableComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateSportsmanComponent,
  ],
})
export class SportsmanComponent implements OnInit {
  public dataSportman: Sportsman[] = [];
  public data = columnsValue;
  public jsonFilter = jsonData;
  public showSportsman: Boolean = false;
  public dataSingle: Sportsman | undefined;
  public dataSingleAux: Sportsman | undefined;
  public isCheck = true;
  public selectItemCount: number = 0;
  public historyCategory: HistorialCategory[] | undefined;
  public dataCreateSportsman: SportsmanData[] = [{}] as SportsmanData[];
  public showViewCreateSportsman: visible | undefined;
  public fechaFormateada: string = '';
  public birdData: string = '';
  public generos: listInfo[] | undefined;
  public selectedImageURL: string = '';
  public isDownload: boolean = false;
  public nameAdd: string = 'deportista';

  constructor(
    private sporsmanService$: SportsmanService,
    private router: Router,
    private imagenFuntionsService$: Imgs
  ) {}

  ngOnInit(): void {
    this.generos = gender;
    this.getSportsman();
    this.getCategory();
    this.actionShowSportmanByIndicator();
  }

  calculateCirclePosition(index: number): number {
    const circleSpacing = 100; // Ajusta el espaciado entre círculos
    return index * circleSpacing;
  }

  getCategory(): void {
    this.sporsmanService$.getAllCategory().subscribe((res: categoryModel[]) => {
      const categoriaIndex = jsonData.findIndex(
        (section) => section.title === 'Categoria'
      );
      // Si se encuentra la sección "Categoria"
      if (categoriaIndex !== -1) {
        jsonData[categoriaIndex].control = res.map((item) => ({
          name: item.name,
          value: item.name,
          code: item.ID,
        }));
      }
    });

    this.dataCreateSportsman = this.jsonFilter;
  }

  getSportsman(): void {
    this.sporsmanService$.getSportsman().subscribe((res: Sportsman[]) => {
      res.forEach((item: Sportsman) => {
        item.name = NormaliceUpperUnicosValidators.normaliceData(item.name);
        item.gender = NormaliceUpperUnicosValidators.normaliceData(item.gender);
        item.typeIdentification = item.typeIdentification.toLocaleUpperCase();
      });
      this.transformGenre(res);
    });
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg && nameImg !== 'Default.png') {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, false, (imageUrl) => {
        this.selectedImageURL = imageUrl;
      });
    }
  }

  getActionEvent(event: ActionResponse): void {
    const {
      action: { action },
      data: { birtDate },
      data,
    } = event;

    if (action === 'verDeportista') {
      this.birdData = DateValidators.parseDate(birtDate);
      const generoItem = this.generos?.find(
        (generoSet: listInfo) => generoSet.code === data.gender
      );
      if (generoItem) {
        data.gender = generoItem.value;
      }

      this.viewImage(data.image);
      this.showSportsman = true;
      this.dataSingle = data;
      this.historyCategorico(data);
    }
    if (event.action === 'add') {
      this.showViewCreateSportsman = { isVisible: true };
    }
    if (action === 'Editar') {
      this.transformGenreInversa(data);
      this.showSportsman = false;
      this.showViewCreateSportsman = {
        isVisible: true,
        data: this.dataSingleAux,
      };
    }

    if (action === 'verEjercicios') {
      this.router.navigate(['sportsman/view'], {
        queryParams: { id: data.ID },
      });
    }
  }

  transformGenre(data: Sportsman[]): void {
    this.dataSportman = data.map((item: Sportsman) => {
      const generoItem = this.generos?.find(
        (generoSet: listInfo) => generoSet.code === item.gender
      );
      if (generoItem) {
        item.gender = generoItem.value;
      }
      return item;
    });
  }

  transformGenreInversa(data: Sportsman): void {
    const generoItem = this.generos?.find(
      (generoSet: listInfo) => generoSet.value === data.gender
    );

    if (generoItem) {
      data.gender = generoItem.code;
    }
    this.dataSingleAux = data;
  }

  reloadData(): void {
    this.getSportsman();
  }

  editSportman(): void {
    const event = {
      action: {
        action: 'Editar',
      },
      data: this.dataSingle, // Aquí debes proporcionar los datos adecuados
    };

    this.getActionEvent(event);
  }

  historyCategorico(data: Sportsman): void {
    const idObject = {
      id: data.ID, // Aquí asigna el valor de tu variable "id"
    };
    this.sporsmanService$.getHistoryCategory(idObject).subscribe(
      (res: HistorialCategory[]) => {
        this.historyCategory = res;
        this.historyCategory.forEach((item) => {
          // Transforma FechaInicio
          const fechaInicio = new Date(item.FechaInicio);
          item.FechaInicio = fechaInicio.toISOString().split('T')[0]; // Obtén el formato YYYY-MM-DD

          // Transforma FechaFin
          const fechaFin = new Date(item.FechaFin);
          item.FechaFin = fechaFin.toISOString().split('T')[0]; // Obtén el formato YYYY-MM-DD
        });
      },
      (error) => {
        if (error.status === 404) {
          this.historyCategory = []; // Asignar un vector vacío si no se encontraron deportistas
        }
      }
    );
  }

  closeCard(): void {
    this.showSportsman = false;
  }
  getselectItemCount($event: number): void {
    this.selectItemCount = $event;
  }

  getDataFilter(event: filterResult): void {
    event.jsonData.forEach((item) => {
      if (!item.disable) {
        event.filterData[item.property] = [];
      }
    });
    this.sporsmanService$.getSFilterSportsman(event.filterData).subscribe(
      (res: Sportsman[]) => {
        this.transformGenre(res); // Asignar el resultado a dataSportman
      },
      (error: Error) => {
        this.dataSportman = []; // Asignar un vector vacío si no se encontraron deportistas
      }
    );
  }

  actionShowSportmanByIndicator(): void {
    const dataSportman = [...this.sporsmanService$.getSportmanInfoRedirect()];
    if (dataSportman.length > 0) {
      const data = dataSportman[0];
      const { birtDate } = data;
      this.birdData = DateValidators.parseDate(birtDate);
      const generoItem = this.generos?.find(
        (generoSet: listInfo) => generoSet.code === data.gender
      );
      if (generoItem) {
        data.gender = generoItem.value;
      }

      this.viewImage(data.image);
      this.showSportsman = true;
      this.dataSingle = data;
      this.historyCategorico(data);
    }
  }
}
