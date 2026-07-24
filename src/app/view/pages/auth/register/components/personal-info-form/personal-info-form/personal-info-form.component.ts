import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterService } from "../../../services/register.service";

@Component({
  selector: "app-personal-info-form",
  templateUrl: "./personal-info-form.component.html",
  styleUrl: "./personal-info-form.component.css",
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule, ReactiveFormsModule],
})
export class PersonalInfoFormComponent {
  constructor(private personalService$: RegisterService) {}

  get form() {
    return this.personalService$.formPersonalInfo;
  }
}