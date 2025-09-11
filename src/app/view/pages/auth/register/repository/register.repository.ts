import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export class registerRepository {
  PersonalInfo(): FormGroup {
    const form = new FormBuilder().group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl(),
      representanteLegal: new FormControl(),
      caracterId: new FormControl(),
      caracterNombre: new FormControl(),
      paisId: new FormControl(),
      paisNombre: new FormControl(),
    });
    return form;
  }

  contactInfo(): FormGroup {
    const form = new FormBuilder().group({
      sede: new FormControl(),
      telefono: new FormControl(),
      paginaWeb: new FormControl(),
    });

    return form;
  }

  securityInfo(): FormGroup {
    const form = new FormBuilder().group({
      contraseña: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmarContraseña: new FormControl('', [Validators.required]),
    });
    return form;
  }
}
