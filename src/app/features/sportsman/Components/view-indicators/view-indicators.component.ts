import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import {
  EjercicioIndicadores,
  Item,
  ItemAssing,
  Level,
  columnsIndValue,
  responseAssing,
} from '../../Models/indicatorsModel';
import { SportsmanService } from '../../services/sportsman.service';
import { Imgs } from '../../../../core/services/imgs';
import { ImageLoader } from '../../../../utils/readerBlodImg';
import { ActionResponse } from '../../../../shared/model/Response/DefaultResponse';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DinamicTableComponent } from '../../../../shared/components/dinamic-table/dinamic-table.component';
import { MATERIAL_IMPORTS } from '../../../../shared/modules/material-imports';
import { Sportsman } from '../../../../view/models/DataSportsman';

// SwiperCore.use([Navigation, Pagination, EffectCoverflow]);
@Component({
  selector: 'app-view-indicators',
  templateUrl: './view-indicators.component.html',
  styleUrls: ['./view-indicators.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DinamicTableComponent,
    ...MATERIAL_IMPORTS,
  ],
})
export class ViewIndicatorsComponent implements OnInit {
  public showModule: boolean = false;
  private routeId: string = '';
  public columns = columnsIndValue;
  public initCarousel: number = 1;
  public dataEjerc: EjercicioIndicadores[] = [{}] as EjercicioIndicadores[];
  public dataSportman: ItemAssing = {} as ItemAssing;
  public imageUrl: string = '';
  public level: Level[] = [];
  public niveles: Level[] | undefined;
  public indicadores: Item[] = [];
  public showIndicators: Item[] = [];
  public showLevels: boolean = false;
  public nameEjerc: string | undefined;
  public viewTableIndicador: boolean = true;

  constructor(
    private service$: SportsmanService,
    private route$: ActivatedRoute,
    private imagenFuntionsService$: Imgs,
    private redirect$: Router
  ) {}

  ngOnInit(): void {
    const {
      snapshot: { queryParams },
    } = this.route$;
    this.routeId = queryParams['id'];

    this.getDataIndicators(this.routeId);
  }

  getDataIndicators(id: string): void {
    this.service$
      .getAlldataIndicators(id)
      .subscribe(({ item, item: { Ejercicios } }: responseAssing) => {
        this.dataSportman = item;
        Ejercicios.forEach((itemEjercicio: EjercicioIndicadores) => {
          const {
            Indicadores,
            SubGrupo,
            SubGrupo: { Grupo },
          } = itemEjercicio;
          itemEjercicio.SubGrupoAbbreviation = SubGrupo.abreviatura;
          itemEjercicio.GrupoAbbreviation = Grupo.Abbreviation;
          this.indicadores = this.indicadores.concat(Indicadores);
          itemEjercicio.HasIndicators = itemEjercicio.Indicadores.length > 0;
          this.showModule = true;
        });
        this.viewImage(this.dataSportman.image);
        this.dataEjerc = Ejercicios;
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

  getActionEvent(event: ActionResponse): void {
    const {
      action: { action },
      data,
    } = event;

    switch (action) {
      case 'ver indicador':
        this.showIndicators = this.indicadores.filter(
          (item: Item) => item.EjercicioID === data.ID
        );

        this.viewTableIndicador =
          this.showIndicators.length === 0 ? true : false;
        this.nameEjerc = data.Name;
        break;
      case 'ver rubrica':
        this.redirect$.navigate(['sportsman/rubrica'], {
          queryParams: { id: this.routeId, ejercicio: data.ID },
        });
        break;
    }
  }

  goBack(): void {
    if (!this.viewTableIndicador && !this.showLevels) {
      this.viewTableIndicador = true;
      return;
    } else if (!this.viewTableIndicador && this.showLevels) {
      this.showLevels = false;
    } else {
      window.history.back();
    }
  }

  relativo(items: string): number {
    const totalAbsolute = this.showIndicators.reduce(
      (total: number, valor: Item) => {
        const absolutePercentage = Number.parseInt(valor.AbsolutePercentage);

        if (!isNaN(absolutePercentage)) {
          return total + absolutePercentage;
        }

        return total;
      },
      0
    );

    const valorRelativo: number = Number(
      ((Number.parseInt(items) / totalAbsolute) * 100).toFixed(1)
    );

    return valorRelativo;
  }

  showLevelsFunction(name: string, levels: Level[]): void {
    this.niveles = levels;
    this.nameEjerc = name;
    this.showLevels = true;
  }

  actionFunction(redirect: string): void {
    const sportmanData: Sportsman = {
      ...this.dataSportman,
      sportInstition: '',
    };
    this.service$.setSportmanInfoRedirect(sportmanData);

    this.redirect$.navigate([redirect]);
  }
}
