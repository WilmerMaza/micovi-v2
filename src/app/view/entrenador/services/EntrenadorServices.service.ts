import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApi } from '../../../core/services/micovi.api';
import {
  requestEntrenador,
  requetEntrenador,
  resposeCreate,
} from '../Model/entrenadorModel';

@Injectable({
  providedIn: 'root',
})
export class EntrenadorServices {
  constructor(private micovid$: MicoviApi) {}

  getAllEntrenadores(bodyRequest: requestEntrenador): Observable<any> {
    const endpoint = '/Entrenador/getAll';
    return this.micovid$.post(endpoint, bodyRequest);
  }

  createEntrenador(bodyRequest: requetEntrenador): Observable<resposeCreate> {
    const endpoint = '/Entrenador/create';
    return this.micovid$.post(endpoint, bodyRequest);
  }

  updateEntrenador(bodyRequest: requetEntrenador): Observable<resposeCreate> {
    const endpoint = '/Entrenador/update';
    return this.micovid$.put(endpoint, bodyRequest);
  }
}
