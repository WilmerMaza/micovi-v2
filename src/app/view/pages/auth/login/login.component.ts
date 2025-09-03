import { Component } from '@angular/core';
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
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  submitted = false;

  public loginForm: FormGroup = new LoginFormModel().formLogin();
  public isChecked: boolean = false;
  private cryptoService$ = new CryptoService();

  constructor(private loginSession$: Session, private router$: Router) {}

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

    data.Password = this.cryptoService$
      .Encript(this.loginForm.get('password')?.value)
      .toString();

    this.loginSession$.sessionLogin(data).subscribe(
      () => this.router$.navigate(['/home']),
      () =>
        Toast.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrecta',
        })
    );
  }
}

