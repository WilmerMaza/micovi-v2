/**
 * Pantalla de registro de colegios (wizard de 3 pasos).
 *
 * Orquesta el stepper de Material: datos personales → contacto → contraseña.
 * El estado de los formularios vive en RegisterService; cada paso es un
 * componente hijo que solo enlaza su FormGroup correspondiente.
 */
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { DatosContactoFormComponent } from '../components/datos-contacto-form/datos-contacto-form/datos-contacto-form.component';
import { PasswordFormComponent } from '../components/password-form/password-form/password-form.component';
import { PersonalInfoFormComponent } from '../components/personal-info-form/personal-info-form/personal-info-form.component';
import { RepresentanteInfoFormComponent } from '../components/representante-info-form/representante-info-form/representante-info-form.component';
import { RegisterService } from '../services/register.service';

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
    PasswordFormComponent,
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
  fieldErrors: Record<string, string> = {};
  registeredName = '';
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    this.errorMessage = '';
    this.fieldErrors = {};

    this.service.submit().subscribe({
      next: (res: unknown) => {
        const body = res as { name?: string } | null;
        this.registeredName = body?.name ?? '';
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
          const backendError = err.error;
          if (backendError?.message && Array.isArray(backendError.message)) {
            this.errorMessage = 'Verifica los datos ingresados';
            this.parseFieldErrors(backendError.message);
          } else if (backendError?.message) {
            this.errorMessage = backendError.message;
          } else {
            this.errorMessage = 'Verifica los datos ingresados';
          }
        } else if (err.status === 429) {
          this.errorMessage = 'Demasiadas solicitudes. Espera un momento e intenta de nuevo.';
        } else if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
        } else {
          this.errorMessage = 'Error al registrar. Intenta de nuevo.';
        }
      },
    });
  }

  private parseFieldErrors(messages: string[]): void {
    const fieldMap: Record<string, string> = {
      name: 'name',
      address: 'direccion',
      phone: 'telefono',
      country: 'paisNombre',
      state: 'departamento',
      city: 'ciudad',
      character: 'caracterNombre',
      headquarters: 'sede',
      website: 'paginaWeb',
      representativename: 'nombreCompleto',
      email: 'email',
      password: 'contraseña',
    };

    for (const msg of messages) {
      for (const [backendField, frontendField] of Object.entries(fieldMap)) {
        if (msg.toLowerCase().includes(backendField.toLowerCase())) {
          this.fieldErrors[frontendField] = msg;
          break;
        }
      }
    }

    if (Object.keys(this.fieldErrors).length > 0) {
      this.applyFieldErrorsToForms();
    }
  }

  private applyFieldErrorsToForms(): void {
    const allForms = [
      this.service.formPersonalInfo,
      this.service.formContactInfo,
      this.service.formRepresentativeInfo,
      this.service.formSecurityInfo,
    ];

    for (const form of allForms) {
      for (const [field, errorMsg] of Object.entries(this.fieldErrors)) {
        const control = form.get(field);
        if (control) {
          control.setErrors({ backend: errorMsg });
        }
      }
    }
  }

  retrySubmit(): void {
    this.submitState = 'idle';
    this.errorMessage = '';
    this.fieldErrors = {};
    this.clearFieldErrors();
  }

  private clearFieldErrors(): void {
    const allForms = [
      this.service.formPersonalInfo,
      this.service.formContactInfo,
      this.service.formRepresentativeInfo,
      this.service.formSecurityInfo,
    ];

    for (const form of allForms) {
      Object.keys(form.controls).forEach(key => {
        const control = form.get(key);
        if (control?.hasError('backend')) {
          const errors = { ...control.errors };
          delete errors['backend'];
          control.setErrors(Object.keys(errors).length ? errors : null);
        }
      });
    }
  }

  getFieldError(fieldName: string): string | null {
    return this.fieldErrors[fieldName] ?? null;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
