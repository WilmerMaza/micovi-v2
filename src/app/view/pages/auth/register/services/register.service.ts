/**
 * Estado compartido del wizard de registro de colegios.
 *
 * Expone los tres FormGroup del stepper (datos personales, contacto, seguridad)
 * para que cada paso del formulario lea y escriba el mismo estado sin
 * duplicar instancias.
 *
 * Los formularios se construyen en RegisterRepository (validadores y estructura).
 */
import { Injectable } from '@angular/core';
import { RegisterRepository} from '../repository/register.repository';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  public readonly formPersonalInfo: FormGroup;
  public readonly formContactInfo: FormGroup
  public readonly formSecurityInfo: FormGroup

  constructor(factory: RegisterRepository) {
      this.formPersonalInfo = factory.PersonalInfo();
      this.formContactInfo = factory.contactInfo();
      this.formSecurityInfo = factory.securityInfo();
  }

}
