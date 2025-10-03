import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NormaliceLowerValidators } from '../../../../utils/Validators';
import { Toast } from '../../../../utils/alert_Toast';
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

    const data = {
      Name: this.loginForm.get('username')?.value,
      Password: '',
    };

    NormaliceLowerValidators.normaliceData(data);

    const plainPassword = this.loginForm.get('password')?.value;
    const encryptedPassword = this.cryptoService$.Encript(plainPassword);
    data.Password = encryptedPassword;

    this.loginSession$.sessionLogin(data).subscribe(
      () => {
        this.handleRememberCredentials(encryptedPassword);
        this.router$.navigate(['/dashboard']);
      },
      () =>
        Toast.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrecta',
        })
    );
  }

  private handleRememberCredentials(encryptedPassword: string): void {
    const rememberMe = this.loginForm.get('check')?.value;
    
    if (rememberMe) {
      localStorage.setItem('username', this.loginForm.get('username')?.value);
      localStorage.setItem('password', encryptedPassword);
      localStorage.setItem('rememberMe', 'true');
    } else {
      this.clearSavedCredentials();
    }
  }

  private clearSavedCredentials(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
