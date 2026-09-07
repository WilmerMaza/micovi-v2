/**
 * Fábrica de formularios del registro.
 *
 * Define estructura y validadores de cada paso del stepper. Separado del
 * servicio para mantener RegisterService como contenedor de estado y este
 * archivo como única fuente de reglas de validación.
 */
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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
  website?: string;
  representativename: string;
}

@Injectable({ providedIn: 'root' })
export class RegisterRepository {
  constructor(private fb: FormBuilder) {}

  personalInfo() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: new FormControl('', [Validators.required, Validators.email]),
      caracterId: [''],
      caracterNombre: ['', [Validators.required]],
      paisId: [''],
      paisNombre: ['', [Validators.required]],
      departamento: ['', [Validators.required, Validators.minLength(3)]],
      ciudad: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  contactInfo() {
    return this.fb.group({
      prefijo: ['+57', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(7)]],
      sede: ['', [Validators.required, Validators.minLength(3)]],
      paginaWeb: ['', [Validators.minLength(5)]],
    });
  }

  representativeInfo() {
    return this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  securityInfo() {
    return this.fb.group(
      {
        contraseña: ['', [Validators.required, Validators.minLength(8)]],
        confirmarContraseña: ['', [Validators.required]],
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
    const prefijo = contact.get('prefijo')?.value || '';
    const telefono = (contact.get('telefono')?.value || '').trim();
    const website = (contact.get('paginaWeb')?.value || '').trim();
    const payload: RegisterPayload = {
      name: (personal.get('name')?.value || '').trim(),
      address: (personal.get('direccion')?.value || '').trim(),
      phone: `${prefijo} ${telefono}`.trim(),
      email: (personal.get('email')?.value || '').trim(),
      password: security.get('contraseña')?.value,
      character: characterRaw.toUpperCase() === 'PÚBLICO' ? 'PUBLIC' : 'PRIVATE',
      country: personal.get('paisNombre')?.value,
      state: (personal.get('departamento')?.value || '').trim(),
      city: (personal.get('ciudad')?.value || '').trim(),
      headquarters: (contact.get('sede')?.value || '').trim(),
      representativename: (representante.get('nombreCompleto')?.value || '').trim(),
    };
    if (website) {
      payload.website = website;
    }
    return payload;
  }
}

/** Valida que contraseña y confirmación coincidan a nivel de FormGroup. */
function passwordsMatchValidator(
  group: AbstractControl
): ValidationErrors | null {
  const p = group.get('contraseña')?.value;
  const c = group.get('confirmarContraseña')?.value;
  return p && c && p !== c ? { passwordMismatch: true } : null;
}
