import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterService } from "../../../services/register.service";

@Component({
  selector: "app-password-form",
  templateUrl: "./password-form.component.html",
  styleUrl: "./password-form.component.css",
  standalone: true,
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

  constructor(private service$: RegisterService) {}

  get form() {
    return this.service$.formSecurityInfo;
  }

  get passwordValue(): string {
    return this.form.get("contraseña")?.value || "";
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