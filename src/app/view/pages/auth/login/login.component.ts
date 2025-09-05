import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CryptoService } from '../../../../utils/crypto.service';
import { Router } from '@angular/router';
import { NormaliceLowerValidators } from '../../../../utils/Validators';
import { Toast } from '../../../../utils/alert_Toast';
import { Session } from '../services/session';
import { LoginFormModel } from '../models/login-form';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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
    const savedUser = localStorage.getItem('username');
    const savedPass = localStorage.getItem('password');

    if (savedUser && savedPass) {
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
        if (this.loginForm.get('check')?.value) {
          localStorage.setItem(
            'username',
            this.loginForm.get('username')?.value
          );
          localStorage.setItem('password', encryptedPassword);
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }

        this.router$.navigate(['/home']);
      },
      () =>
        Toast.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrecta',
        })
    );
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
