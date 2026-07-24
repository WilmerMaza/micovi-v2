/**
 * Estado compartido del wizard de registro de colegios.
 *
 * Expone los tres FormGroup del stepper (datos personales, contacto, seguridad)
 * para que cada paso del formulario lea y escriba el mismo estado sin
 * duplicar instancias.
 *
 * Los formularios se construyen en RegisterRepository (validadores y estructura).
 */
import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MicoviApi } from '../../../../core/services/micovi.api';
import { RegisterRepository } from '../repository/register.repository';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  public readonly formPersonalInfo: FormGroup;
  public readonly formContactInfo: FormGroup;
  public readonly formRepresentanteInfo: FormGroup;
  public readonly formSecurityInfo: FormGroup;

  private api = inject(MicoviApi);

  constructor(private repository: RegisterRepository) {
    this.formPersonalInfo = repository.PersonalInfo();
    this.formContactInfo = repository.contactInfo();
    this.formRepresentanteInfo = repository.representanteInfo();
    this.formSecurityInfo = repository.securityInfo();
  }

  submit(): Observable<any> {
    const payload = this.repository.toPayload(
      this.formPersonalInfo,
      this.formContactInfo,
      this.formRepresentanteInfo,
      this.formSecurityInfo
    );
    return this.api.post('/schools/register', payload);
  }
}
