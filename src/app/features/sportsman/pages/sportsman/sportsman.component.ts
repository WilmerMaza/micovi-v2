import { Component, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { SportsmanService } from '../../services/sportsman.service';
import { listInfo } from '../../../../models/interface';
import { Imgs } from '../../../../core/services/imgs';
import {
  DateValidators,
  NormaliceUpperUnicosValidators,
} from '../../../../utils/Validators';
import { ImageLoader } from '../../../../utils/readerBlodImg';
import { ActionResponse } from '../../../../shared/model/Response/DefaultResponse';
import {
  DynamicObject,
  filterResult,
} from '../../../../shared/model/filterModel';
import { DinamicFilterComponent } from '../../../../shared/components/dinamic-filter/dinamic-filter.component';
import { DinamicToolbarComponent } from '../../../../shared/components/dinamic-toolbar/dinamic-toolbar.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MATERIAL_IMPORTS } from '../../../../shared/modules/material-imports';
import { DinamicTableComponent } from '../../../../shared/components/dinamic-table/dinamic-table.component';
import { TableSkeletonComponent } from '../../../../shared/components/table-skeleton/table-skeleton';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Sportsman } from '../../../../view/models/DataSportsman';
import { columnsValue } from '../../../../view/models/columnDataSportman';
import { HistorialCategory } from '../../../../view/models/HistorialCategoryModel';
import { jsonData } from '../../../../view/models/dataFilterSportsman';
import { gender } from '../../../../view/entrenador/Model/constantesEntrenador';
import { categoryModel } from '../../../../view/models/categoryModel';
import { MOCK_SPORTSMEN } from '../../mocks/sportsman.mock';

/**
 * true  → lista con MOCK_SPORTSMEN (UI / paginación sin back).
 * false → vuelve a SportsmanService.getSportsman() / getSFilterSportsman().
 */
const USE_MOCK_SPORTSMAN = false;

/**
 * Listado de deportistas: alta de página, búsqueda, filtros y tabla.
 *
 * El CTA de alta vive en esta feature (no en el shell ni en la barra de
 * consulta). La búsqueda (Name) y los filtros laterales se aplican por
 * separado; POST `/sportMan/get` solo cuando hay criterios activos.
 */
@Component({
  selector: 'app-sportsman',
  templateUrl: './sportsman.component.html',
  styleUrls: ['./sportsman.component.scss'],
  standalone: true,
  imports: [
    DinamicToolbarComponent,
    DinamicFilterComponent,
    MatCard,
    MatButtonModule,
    ...MATERIAL_IMPORTS,
    MatCardContent,
    DinamicTableComponent,
    TableSkeletonComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SportsmanComponent implements OnInit {
  public dataSportman: Sportsman[] = [];
  public data = columnsValue;
  public jsonFilter = structuredClone(jsonData);
  public showSportsman: Boolean = false;
  public dataSingle: Sportsman | undefined;
  public dataSingleAux: Sportsman | undefined;
  public isCheck = true;
  public historyCategory: HistorialCategory[] | undefined;
  public birdData: string = '';
  public generos: listInfo[] | undefined;
  public selectedImageURL: string = '';
  public isDownload: boolean = false;
  readonly isListLoading = signal(false);
  readonly listError = signal(false);
  /** Búsqueda de la toolbar; no vive en el panel lateral. */
  private appliedName = '';
  /** Último payload de panel aplicado (sin Name). */
  private appliedPanel: DynamicObject<any> = {};

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
      const categoriaIndex = this.jsonFilter.findIndex(
        (section) => section.title === 'Categoria'
      );
      if (categoriaIndex !== -1) {
        this.jsonFilter[categoriaIndex].control = res.map((item) => ({
          name: item.name,
          value: item.name,
          code: item.ID,
          checked: false,
        }));
      }
    });
  }

  getSportsman(): void {
    if (USE_MOCK_SPORTSMAN) {
      this.applySportsmanList(structuredClone(MOCK_SPORTSMEN));
      return;
    }

    this.isListLoading.set(true);
    this.listError.set(false);
    this.sporsmanService$
      .getSportsman()
      .pipe(finalize(() => this.isListLoading.set(false)))
      .subscribe({
        next: (res: Sportsman[]) => {
          this.applySportsmanList(res);
        },
        error: () => {
          this.listError.set(true);
          this.dataSportman = [];
        },
      });
  }

  /** Normaliza y asigna filas a la tabla (mock o back). */
  private applySportsmanList(res: Sportsman[]): void {
    res.forEach((item: Sportsman) => {
      item.name = NormaliceUpperUnicosValidators.normaliceData(item.name);
      item.gender = NormaliceUpperUnicosValidators.normaliceData(item.gender);
      item.typeIdentification = item.typeIdentification.toLocaleUpperCase();
    });
    this.transformGenre(res);
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
    const action =
      typeof event.action === 'string' ? event.action : event.action?.action;
    const data = event.data;

    if (action === 'add' || action === 'add deportista') {
      this.openCreateSportsman();
      return;
    }

    if (action === 'verDeportista') {
      this.birdData = DateValidators.parseDate(data?.birtDate);
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

    if (action === 'Editar') {
      this.openSportsmanEdit(data);
      return;
    }

    if (action === 'verEjercicios') {
      this.router.navigate(['sportsman/view'], {
        queryParams: { id: data.ID },
      });
    }
  }

  /** Alta de deportista: navega al formulario de create de esta feature. */
  openCreateSportsman(): void {
    this.router.navigate(['/sportsman/create']);
  }

  /** Navega a la ruta hija de edición (misma pantalla que create). */
  private openSportsmanEdit(data: Sportsman): void {
    const row = { ...data };
    this.transformGenreInversa(row);
    if (this.dataSingleAux) {
      this.sporsmanService$.setSportmanInfoRedirect(this.dataSingleAux);
    }
    this.showSportsman = false;
    this.router.navigate(['/sportsman', 'edit', data.ID]);
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

  /** Aplica el panel lateral (sin Name) y recarga el listado. */
  getDataFilter(event: filterResult): void {
    this.appliedPanel = { ...event.filterData };
    this.loadFilteredList();
  }

  onSearch(name: string): void {
    this.appliedName = name.trim();
    this.loadFilteredList();
  }

  onSearchClear(): void {
    this.appliedName = '';
    this.loadFilteredList();
  }

  emptyTableMessage(): string {
    if (this.listError()) {
      return 'No se pudo cargar el listado. Inténtalo de nuevo.';
    }
    if (this.hasActiveQuery()) {
      return 'Ningún deportista coincide con los filtros.';
    }
    return 'No hay registros para mostrar.';
  }

  private hasActiveQuery(): boolean {
    if (this.appliedName.trim()) {
      return true;
    }
    return Object.values(this.appliedPanel).some((value) =>
      Array.isArray(value)
        ? value.length > 0
        : String(value ?? '').trim().length > 0
    );
  }

  private loadFilteredList(): void {
    if (!this.hasActiveQuery()) {
      this.getSportsman();
      return;
    }

    const filterData: DynamicObject<any> = {
      ...this.appliedPanel,
      Name: this.appliedName,
    };

    if (USE_MOCK_SPORTSMAN) {
      this.applyMockFilter(filterData);
      return;
    }

    this.isListLoading.set(true);
    this.listError.set(false);
    this.sporsmanService$
      .getSFilterSportsman(filterData)
      .pipe(finalize(() => this.isListLoading.set(false)))
      .subscribe({
        next: (res: Sportsman[]) => {
          this.transformGenre(res);
        },
        error: () => {
          this.listError.set(true);
          this.dataSportman = [];
        },
      });
  }

  private applyMockFilter(filterData: DynamicObject<any>): void {
    const nameQ = String(filterData['Name'] ?? '').trim().toLowerCase();
    const categories = (filterData['category'] as string[]) ?? [];
    const genders = (filterData['gender'] as string[]) ?? [];
    const types = (filterData['typeIdentification'] as string[]) ?? [];
    const idQ = String(filterData['identificacion'] ?? '')
      .trim()
      .toLowerCase();

    const filtered = MOCK_SPORTSMEN.filter((row) => {
      const matchName = !nameQ || row.name.toLowerCase().includes(nameQ);
      const matchCat =
        !categories.length ||
        categories.some((c) => c.toLowerCase() === row.category.toLowerCase());
      const matchGender = !genders.length || genders.includes(row.gender);
      const matchType =
        !types.length ||
        types.some(
          (t) => t.toLowerCase() === row.typeIdentification.toLowerCase()
        );
      const matchId = !idQ || row.identification.toLowerCase().includes(idQ);
      return matchName && matchCat && matchGender && matchType && matchId;
    });
    this.listError.set(false);
    this.applySportsmanList(structuredClone(filtered));
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
