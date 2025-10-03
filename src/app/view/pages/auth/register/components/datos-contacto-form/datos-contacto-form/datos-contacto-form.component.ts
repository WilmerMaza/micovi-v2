import { Component, OnInit } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatStep } from "@angular/material/stepper";
import { RegisterService } from '../../../services/register.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-contacto-form',
  templateUrl: './datos-contacto-form.component.html',
  styleUrls: ['./datos-contacto-form.component.css'],
  imports: [MatInputModule, MatStep, ReactiveFormsModule]
})
export class DatosContactoFormComponent {

  constructor(private service$: RegisterService) { }

  get form() { return this.service$.formContactInfo; }

}
