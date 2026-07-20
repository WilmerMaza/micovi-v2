import { Injectable, inject } from "@angular/core";
import { RegisterRepository} from "../repository/register.repository";
import { FormGroup } from "@angular/forms";
import { MicoviApi } from "../../../../../core/services/micovi.api";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RegisterService {

  public readonly formPersonalInfo: FormGroup;
  public readonly formContactInfo: FormGroup;
  public readonly formRepresentanteInfo: FormGroup;
  public readonly formSecurityInfo: FormGroup;

  constructor(private repository: RegisterRepository) {
      this.formPersonalInfo = repository.PersonalInfo();
      this.formContactInfo = repository.contactInfo();
      this.formRepresentanteInfo = repository.representanteInfo();
      this.formSecurityInfo = repository.securityInfo();
  }

  private api = inject(MicoviApi);

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