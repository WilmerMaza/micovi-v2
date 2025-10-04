import { Component, OnInit } from '@angular/core';
import { MatStep, MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css'],
  imports: [MatStepperModule, MatInputModule,  ReactiveFormsModule],
})
export class PasswordFormComponent {
  constructor(private service$: RegisterService) {}

  get form(){return this.service$.formSecurityInfo;}
}
