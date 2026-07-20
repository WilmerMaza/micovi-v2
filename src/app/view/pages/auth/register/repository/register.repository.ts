import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

export interface RegisterPayload {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  character: string;
  country: string;
  state: string;
  city: string;
  headquarters: string;
  website: string;
  representativename: string;
}

@Injectable({ providedIn: "root" })
export class RegisterRepository {
  constructor(private fb: FormBuilder) {}

  PersonalInfo() {
    return this.fb.group({
      name: ["", [Validators.required]],
      email: new FormControl("", [Validators.required, Validators.email]),
      caracterId: [""],
      caracterNombre: ["", [Validators.required]],
      paisId: [""],
      paisNombre: ["", [Validators.required]],
    });
  }

  contactInfo() {
    return this.fb.group({
      telefono: ["", [Validators.required]],
      sede: [""],
      paginaWeb: [""],
      logo: [""],
    });
  }

  representanteInfo() {
    return this.fb.group({
      identificacion: ["", [Validators.required]],
      nombreCompleto: ["", [Validators.required]],
    });
  }

  securityInfo() {
    return this.fb.group(
      {
        contraseña: ["", [Validators.required, Validators.minLength(8)]],
        confirmarContraseña: ["", [Validators.required]],
      },
      { validators: passwordsMatchValidator }
    );
  }

  toPayload(
    personal: FormGroup,
    contact: FormGroup,
    representante: FormGroup,
    security: FormGroup
  ): RegisterPayload {
    const characterRaw = personal.get('caracterNombre')?.value || '';
    return {
      name: personal.get('name')?.value,
      address: contact.get('sede')?.value || '—',
      phone: contact.get('telefono')?.value,
      email: personal.get('email')?.value,
      password: security.get('contraseña')?.value,
      character: characterRaw.toUpperCase() === 'PÚBLICO' ? 'PUBLIC' : 'PRIVATE',
      country: personal.get('paisNombre')?.value,
      state: contact.get('sede')?.value || '—',
      city: '—',
      headquarters: contact.get('sede')?.value || '—',
      website: contact.get('paginaWeb')?.value || '',
      representativename: representante.get('nombreCompleto')?.value,
    };
  }
}

function passwordsMatchValidator(
  group: AbstractControl
): ValidationErrors | null {
  const p = group.get("contraseña")?.value;
  const c = group.get("confirmarContraseña")?.value;
  return p && c && p !== c ? { passwordMismatch: true } : null;
}