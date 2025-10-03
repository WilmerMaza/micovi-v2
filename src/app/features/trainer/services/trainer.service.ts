import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MicoviApi } from '../../../core/services/micovi.api';
import {
  requestTrainerFilter,
  requestTrainer,
  resposeCreate,
} from '../Models/trainerModel';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor(private micovid$: MicoviApi) {}

  getAllTrainers(bodyRequest: requestTrainerFilter): Observable<any> {
    const endpoint = '/Entrenador/getAll';
    return this.micovid$.post(endpoint, bodyRequest);
  }

  createTrainer(bodyRequest: requestTrainer): Observable<resposeCreate> {
    const endpoint = '/Entrenador/create';
    return this.micovid$.post(endpoint, bodyRequest);
  }

  updateTrainer(bodyRequest: requestTrainer): Observable<resposeCreate> {
    const endpoint = '/Entrenador/update';
    return this.micovid$.put(endpoint, bodyRequest);
  }
}
