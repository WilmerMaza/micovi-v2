/**
 * Paso 2 del registro: datos de contacto del colegio.
 *
 * Enlaza formContactInfo de RegisterService (sede, teléfono, página web).
 * Componente presentacional: la validación vive en RegisterRepository.
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-datos-contacto-form',
  templateUrl: './datos-contacto-form.component.html',
  styleUrls: ['./datos-contacto-form.component.css'],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class DatosContactoFormComponent {
  constructor(private contactService$: RegisterService) {}

  get form() {
    return this.contactService$.formContactInfo;
  }
}
