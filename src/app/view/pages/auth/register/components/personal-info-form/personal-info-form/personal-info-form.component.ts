import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStep } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.css'],
  imports: [MatInputModule, MatSelectModule, MatStep, ReactiveFormsModule],
})
export class PersonalInfoFormComponent {
  private _formBuilder = inject(FormBuilder);
  email = this._formBuilder.control('', { nonNullable: true, validators: [] });
  errorMessage = signal('');

  constructor(private service$: RegisterService) {}

  get form(){return this.service$.formPersonalInfo;}

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}
