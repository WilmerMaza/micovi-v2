/**
 * Pantalla de inicio de sesión.
 *
 * Presenta el formulario de login, valida email/contraseña y delega la
 * autenticación a Session. Gestiona la opción "recordarme" en localStorage
 * (solo username y flag; la contraseña se guarda cifrada con CryptoService).
 *
 * Los tokens de sesión no se manejan aquí — el backend los establece en
 * cookies HttpOnly tras POST /auth/login (ver Session y AuthService).
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CryptoService } from '../../../../utils/crypto.service';
import { LoginFormModel } from '../models/login-form';
import { Session } from '../services/session';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  submitted = false;

  public loginForm: FormGroup = new LoginFormModel().formLogin();

  constructor(
    private loginSession$: Session,
    private router$: Router,
    private cryptoService$: CryptoService
  ) {}

  ngOnInit(): void {
    this.loadSavedCredentials();
  }

  /** Restaura username y contraseña si el usuario activó "recordarme". */
  private loadSavedCredentials(): void {
    const savedUser = localStorage.getItem('username');
    const savedPass = localStorage.getItem('password');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedUser && savedPass && rememberMe) {
      this.loginForm.patchValue({
        username: savedUser,
        password: this.cryptoService$.Decrypt(savedPass),
        check: true,
      });
    }
  }

  sessionLogin(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = String(this.loginForm.get('username')?.value ?? '')
      .trim()
      .toLowerCase();
    const password = String(this.loginForm.get('password')?.value ?? '');

    this.handleRememberCredentials();
    this.loginSession$.sessionLogin({ email, password });
  }

  /** Persiste o borra credenciales locales según el checkbox "recordarme". */
  private handleRememberCredentials(): void {
    const rememberMe = this.loginForm.get('check')?.value;

    if (rememberMe) {
      localStorage.setItem('username', this.loginForm.get('username')?.value);
      localStorage.setItem('rememberMe', 'true');
    } else {
      this.clearSavedCredentials();
    }
  }

  private clearSavedCredentials(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('rememberMe');
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
