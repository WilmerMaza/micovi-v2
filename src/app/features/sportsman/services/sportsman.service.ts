import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { responseAssing } from '../Models/indicatorsModel';
import { MicoviApi } from '../../../core/services/micovi.api';
import { DynamicObject } from '../../../shared/model/filterModel';
import { ICalificacion, Sportsman } from '../../../view/models/DataSportsman';
import { categoryModel } from '../../../view/models/categoryModel';
import { HistorialCategory } from '../../../view/models/HistorialCategoryModel';
import { SuccessResponse } from '../../../view/models/SuccessResponse';
@Injectable({
  providedIn: 'root',
})
export class SportsmanService {
  constructor(private micovid$: MicoviApi) {}
  private redirectSportmanInfo: Sportsman[] = [];

  getSportmanInfoRedirect(): Sportsman[] {
    const data = [...this.redirectSportmanInfo];
    this.redirectSportmanInfo = [];
    return data;
  }

  setSportmanInfoRedirect(data: Sportsman): void {
    this.redirectSportmanInfo = [];
    this.redirectSportmanInfo.push(data);
  }

  getSportsman(): Observable<Sportsman[]> {
    const endpoint = '/sportMan/getAll';
    return this.micovid$.get(endpoint);
  }

  getSFilterSportsman(filterData: DynamicObject<any>): Observable<Sportsman[]> {
    const endpoint = '/sportMan/get';
    return this.micovid$.post(endpoint, filterData);
  }

  getAllCategory(): Observable<categoryModel[]> {
    const endpoint = '/Categoria/getAll';
    return this.micovid$.get(endpoint);
  }

  getHistoryCategory(idObject: {
    id: string;
  }): Observable<HistorialCategory[]> {
    const endpoint = '/sportMan/getHistorialCategory';
    return this.micovid$.post(endpoint, idObject);
  }

  createSportsman(data: Sportsman): Observable<SuccessResponse> {
    const endpoint = '/sportMan/create';
    return this.micovid$.post(endpoint, data);
  }

  updateSportsman(data: Sportsman): Observable<SuccessResponse> {
    const endpoint = '/sportMan/update';
    return this.micovid$.post(endpoint, data);
  }

  getAlldataIndicators(ID: string): Observable<responseAssing> {
    const url = `/indicators/get-indicators?id=${ID}`;
    return this.micovid$.get(url);
  }

  enviarDataCalificacionFinal(data: {
    [key: string]: number | string;
  }): Observable<SuccessResponse> {
    const url = `/sportMan/calificacion`;
    return this.micovid$.post(url, data);
  }

  getAllCalifications(
    sportmanid: string,
    ejercicioid: string
  ): Observable<ICalificacion[]> {
    const url = `/sportMan/calificacion?SportsManID=${sportmanid}&EjercicioID=${ejercicioid}`;
    return this.micovid$.get(url);
  }
}
