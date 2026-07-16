/**
 * Paso 2 del registro: datos de contacto del colegio.
 *
 * Enlaza formContactInfo de RegisterService (sede, teléfono, página web).
 * Componente presentacional: la validación vive en RegisterRepository.
 */
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { RegisterService } from '../../../services/register.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-contacto-form',
  templateUrl: './datos-contacto-form.component.html',
  styleUrls: ['./datos-contacto-form.component.css'],
  imports: [MatInputModule, ReactiveFormsModule]
})
export class DatosContactoFormComponent {

  constructor(private service$: RegisterService) { }

  get form() { return this.service$.formContactInfo; }

}
