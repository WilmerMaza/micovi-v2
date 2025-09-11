import { Injectable } from '@angular/core';
import { registerRepository } from '../repository/register.repository';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends registerRepository {

  public formPersonalInfo: FormGroup = this.PersonalInfo();
  public formContactInfo: FormGroup = this.contactInfo();
  public formSecurityInfo: FormGroup = this.securityInfo();

  constructor() {
    super();
  }
  
}
