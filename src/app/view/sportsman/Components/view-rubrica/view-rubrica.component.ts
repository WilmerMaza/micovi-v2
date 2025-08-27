import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SportsmanService } from '../../services/sportsman.service';
import {
  EjercicioIndicadores,
  Item,
  ItemAssing,
  responseAssing,
} from '../../Models/indicatorsModel';
import { columnsValueRubrica } from '../../../models/columnValueRubrica';

import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Imgs } from '../../../../core/services/imgs';
import { ICalificacion, Sportsman } from '../../../models/DataSportsman';
import { ImageLoader } from '../../../../utils/readerBlodImg';
import { MATERIAL_IMPORTS } from '../../../../shared/modules/material-imports';
import { DinamicTableComponent } from "../../../../shared/components/dinamic-table/dinamic-table.component";

@Component({
  selector: 'app-view-rubrica',
  templateUrl: './view-rubrica.component.html',
  styleUrls: ['./view-rubrica.component.scss'],
  standalone: true,
  imports: [CommonModule, ...MATERIAL_IMPORTS, DinamicTableComponent],
})
export class ViewRubricaComponent implements OnInit {
  public showModule: boolean = false;
  public dataSportman: ItemAssing = {} as ItemAssing;
  public indicadores: Item[] = [];
  public imageUrl: string = '';
  private routeId: string = '';
  private ejercicioId: string = '';
  public ejercicioName: string = '';
  public calificacionList: ICalificacion[] = [];
  public columns = columnsValueRubrica;

  constructor(
    private service$: SportsmanService,
    private route$: ActivatedRoute,
    private imagenFuntionsService$: Imgs,
    private redirect$: Router
  ) {}

  @ViewChild('panel_clasificacion_rubrica') containerRef!: ElementRef;

  ngOnInit(): void {
    const {
      snapshot: { queryParams },
    } = this.route$;
    this.routeId = queryParams['id'];
    this.ejercicioId = queryParams['ejercicio'];
    this.getDataInit();
  }

  getDataInit(): void {
    this.service$
      .getAllCalifications(this.routeId, this.ejercicioId)
      .subscribe((res: ICalificacion[]) => {
        this.calificacionList = res.map(
          (item: ICalificacion, index: number) => ({
            consecutivo: ++index,
            ...item,
          })
        );
        this.getDataIndicators(this.routeId, this.ejercicioId);
      });
  }

  getDataIndicators(id: string, ejercicioId: string): void {
    this.service$
      .getAlldataIndicators(id)
      .subscribe(({ item, item: { Ejercicios } }: responseAssing) => {
        this.dataSportman = item;
        Ejercicios.forEach((itemEjercicio: EjercicioIndicadores) => {
          const { Indicadores, ID, Name } = itemEjercicio;

          if (ID === ejercicioId) {
            this.ejercicioName = Name;
          }

          this.indicadores = this.indicadores.concat(Indicadores);
          this.showModule = true;
        });
        this.viewImage(this.dataSportman.image);
      });
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg) {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, false, (imageUrl) => {
        this.imageUrl = imageUrl;
      });
    }
  }

  goBack(): void {
    window.history.back();
  }

  actionFunction(redirect: string): void {
    const sportmanData: Sportsman = {
      ...this.dataSportman,
      sportInstition: '',
    };

    this.service$.setSportmanInfoRedirect(sportmanData);

    this.redirect$.navigate([redirect], {
      queryParams: { ejercicio: this.ejercicioId },
    });
  }
}
