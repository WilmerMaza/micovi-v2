import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class RegisterRepository {
  constructor(private fb: FormBuilder /* o NonNullableFormBuilder */) {}

  PersonalInfo() {
    return this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: [''],
      representanteLegal: [''],
      caracterId: [''],
      caracterNombre: [''],
      paisId: [''],
      paisNombre: [''],
    });
  }

  contactInfo() {
    return this.fb.group({
      sede: [''],
      telefono: [''],
      paginaWeb: [''],
    });
  }

  securityInfo() {
    return this.fb.group(
      {
        contraseña: ['', [Validators.required, Validators.minLength(6)]],
        confirmarContraseña: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator }
    );
  }
}

function passwordsMatchValidator(
  group: AbstractControl
): ValidationErrors | null {
  const p = group.get('contraseña')?.value;
  const c = group.get('confirmarContraseña')?.value;
  return p && c && p !== c ? { passwordMismatch: true } : null;
}
