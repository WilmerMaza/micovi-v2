/**
 * Paso 1 del registro: datos personales del colegio.
 *
 * Enlaza formPersonalInfo de RegisterService. Muestra mensajes de error
 * reactivos para el campo email (required / formato inválido).
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
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.css'],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class PersonalInfoFormComponent {
  constructor(private personalService$: RegisterService) {}

  get form() {
    return this.personalService$.formPersonalInfo;
  }
}
