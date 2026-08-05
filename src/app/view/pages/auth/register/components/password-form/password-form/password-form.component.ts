/**
 * Paso 3 del registro: contraseña y confirmación.
 *
 * Enlaza formSecurityInfo de RegisterService. La coincidencia de contraseñas
 * se valida en RegisterRepository (passwordsMatchValidator).
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css'],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class PasswordFormComponent {
  hidePassword = true;
  hideConfirm = true;

  constructor(private passwordService$: RegisterService) {}

  get form() {
    return this.passwordService$.formSecurityInfo;
  }

  get passwordValue(): string {
    return this.form.get('contraseña')?.value || '';
  }

  get hasMinLength(): boolean {
    return this.passwordValue.length >= 8;
  }

  get hasUpperCase(): boolean {
    return /[A-Z]/.test(this.passwordValue);
  }

  get hasNumber(): boolean {
    return /[0-9]/.test(this.passwordValue);
  }

  get hasSpecialChar(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.passwordValue);
  }

  get passwordsMatch(): boolean {
    const p = this.form.get('contraseña')?.value;
    const c = this.form.get('confirmarContraseña')?.value;
    return p && c && p === c && p.length > 0;
  }
}
