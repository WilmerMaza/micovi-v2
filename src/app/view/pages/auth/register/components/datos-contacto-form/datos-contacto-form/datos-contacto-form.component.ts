import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterService } from "../../../services/register.service";

@Component({
  selector: "app-datos-contacto-form",
  templateUrl: "./datos-contacto-form.component.html",
  styleUrl: "./datos-contacto-form.component.css",
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule],
})
export class DatosContactoFormComponent {
  logoPreview: string | null = null;

  constructor(private service$: RegisterService) {}

  get form() {
    return this.service$.formContactInfo;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({ logo: file.name });

      // Leer el archivo para previsualización
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}