import { Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RegisterService } from '../services/register.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PersonalInfoFormComponent } from "../components/personal-info-form/personal-info-form/personal-info-form.component";
import { DatosContactoFormComponent } from "../components/datos-contacto-form/datos-contacto-form/datos-contacto-form.component";
import { PasswordFormComponent } from "../components/password-form/password-form/password-form.component";


@Component({
  selector: 'app-register',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    PersonalInfoFormComponent,
    DatosContactoFormComponent,
    PasswordFormComponent
],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private _formBuilder = inject(FormBuilder);
  email = this._formBuilder.control('', { nonNullable: true, validators: [] });
  errorMessage = signal('');

  constructor(public service: RegisterService) { }


}
