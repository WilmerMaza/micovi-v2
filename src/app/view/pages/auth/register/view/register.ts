import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { Toast } from "../../../../../utils/alert_Toast";
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RegisterService } from '../services/register.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { PersonalInfoFormComponent } from "../components/personal-info-form/personal-info-form/personal-info-form.component";
import { DatosContactoFormComponent } from "../components/datos-contacto-form/datos-contacto-form/datos-contacto-form.component";
import { RepresentanteInfoFormComponent } from "../components/representante-info-form/representante-info-form/representante-info-form.component";
import { PasswordFormComponent } from "../components/password-form/password-form/password-form.component";

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    PersonalInfoFormComponent,
    DatosContactoFormComponent,
    RepresentanteInfoFormComponent,
    PasswordFormComponent
],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);
  isSubmitting = false;
  submitState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errorMessage = '';
  currentBallIndex = 0;
  selectedStep = 0;

  sportBalls: string[] = [
    'sports_soccer',
    'sports_basketball',
    'sports_volleyball',
    'sports_football',
    'sports_tennis',
    'sports_baseball',
    'sports_golf',
    'sports_handball',
    'sports_rugby',
    'sports_esports',
  ];

  constructor(public service: RegisterService) {
    this.startBallRotation();
  }

  private ballInterval: number | null = null;

  private startBallRotation(): void {
    this.ballInterval = setInterval(() => {
      if (this.submitState === 'loading') {
        this.currentBallIndex = (this.currentBallIndex + 1) % this.sportBalls.length;
      }
    }, 700);
  }

  private stopBallRotation(): void {
    if (this.ballInterval) {
      clearInterval(this.ballInterval);
      this.ballInterval = null;
    }
  }

  get currentBall(): string {
    return this.sportBalls[this.currentBallIndex];
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.submitState = 'loading';

    this.service.submit().subscribe({
      next: () => {
        this.submitState = 'success';
        this.isSubmitting = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.submitState = 'error';
        if (err.status === 409) {
          this.errorMessage = 'El correo electrónico ya está registrado';
        } else if (err.status === 400) {
          this.errorMessage = 'Verifica los datos ingresados';
        } else {
          this.errorMessage = 'Error al registrar. Intenta de nuevo.';
        }
      },
    });
  }

  retrySubmit(): void {
    this.submitState = 'idle';
    this.errorMessage = '';
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}