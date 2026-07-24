import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterService } from "../../../services/register.service";

@Component({
  selector: "app-representante-info-form",
  templateUrl: "./representante-info-form.component.html",
  styleUrl: "./representante-info-form.component.css",
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule],
})
export class RepresentanteInfoFormComponent {
  constructor(private representanteService$: RegisterService) {}

  get form() {
    return this.representanteService$.formRepresentativeInfo;
  }
}