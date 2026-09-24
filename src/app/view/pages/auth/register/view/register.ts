/**
 * Pantalla de registro de instituciones (wizard de 4 pasos).
 *
 * Orquesta el stepper de Material: institución → contacto → representante → acceso.
 * El estado de los formularios vive en RegisterService; cada paso es un
 * componente hijo que solo enlaza su FormGroup correspondiente.
 *
 * Los estados loading/success/error son solo UI de feedback del submit.
 */
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Router, RouterLink } from '@angular/router';
import { DatosContactoFormComponent } from '../components/datos-contacto-form/datos-contacto-form/datos-contacto-form.component';
import { PasswordFormComponent } from '../components/password-form/password-form/password-form.component';
import { PersonalInfoFormComponent } from '../components/personal-info-form/personal-info-form/personal-info-form.component';
import { RepresentanteInfoFormComponent } from '../components/representante-info-form/representante-info-form/representante-info-form.component';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterLink,
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
    PasswordFormComponent,
  ],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnDestroy {
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

  private ballInterval: ReturnType<typeof setInterval> | null = null;

  constructor(public service: RegisterService) {
    this.startBallRotation();
  }

  ngOnDestroy(): void {
    this.stopBallRotation();
  }

  /** Rota el icono deportivo solo en loading; ritmo calmado (Motion 3). */
  private startBallRotation(): void {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.ballInterval = setInterval(() => {
      if (this.submitState === 'loading') {
        this.currentBallIndex = (this.currentBallIndex + 1) % this.sportBalls.length;
      }
    }, 1200);
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
