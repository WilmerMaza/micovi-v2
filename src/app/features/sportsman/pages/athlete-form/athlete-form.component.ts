/**
 * Componente de formulario de deportista con 3 fases.
 *
 * Fase 1: Identificación y datos personales (nombres, apellidos, tipo/número documento, fecha nacimiento, género, fotografía)
 * Fase 2: Ubicación, datos físicos y educación (país, departamento, ciudad, peso, altura, nivel educativo, institución)
 * Fase 3: Información deportiva y contacto (categoría, disciplina, email, teléfono)
 *
 * Soporta creación y edición según si se proporciona un ID en los parámetros de ruta.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../../shared/modules/material-imports';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SportsmanService } from '../../services/sportsman.service';
import { Athlete, CatalogItem } from '../../../../view/models/athlete.model';
import { Toast } from '../../../../utils/alert_Toast';

@Component({
  selector: 'app-athlete-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule, MatButtonModule, ...MATERIAL_IMPORTS],
  templateUrl: './athlete-form.component.html',
  styleUrls: ['./athlete-form.component.scss'],
})
export class AthleteFormComponent implements OnInit {
  form!: FormGroup;
  currentStep = 1;
  totalSteps = 3;
  isEditMode = false;
  athleteId: string | null = null;
  isLoading = false;
  isSaving = false;

  documentTypes: CatalogItem[] = [];
  genders: CatalogItem[] = [];
  countries: CatalogItem[] = [];
  departments: CatalogItem[] = [];
  cities: CatalogItem[] = [];
  educationLevels: CatalogItem[] = [];
  categories: CatalogItem[] = [];
  disciplines: CatalogItem[] = [];

  selectedFile: File | null = null;
  imagePreview: string | null = null;
  currentPhotoUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private athleteService: SportsmanService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCatalogs();
    this.checkEditMode();
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      documentTypeId: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.maxLength(30)]],
      birthDate: ['', Validators.required],
      genderId: ['', Validators.required],
      birthCountryId: ['', Validators.required],
      birthDepartmentId: ['', Validators.required],
      birthCityId: ['', Validators.required],
      residenceCountryId: ['', Validators.required],
      residenceDepartmentId: ['', Validators.required],
      residenceCityId: ['', Validators.required],
      educationLevelId: ['', Validators.required],
      educationInstitution: [''],
      weight: [null, [Validators.required, Validators.min(1), Validators.max(300)]],
      height: [null, [Validators.required, Validators.min(0.5), Validators.max(2.5)]],
      categoryId: ['', Validators.required],
      disciplineId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });
  }

  private loadCatalogs(): void {
    this.athleteService.getDocumentTypes().subscribe((res) => (this.documentTypes = res));
    this.athleteService.getGenders().subscribe((res) => (this.genders = res));
    this.athleteService.getCountries().subscribe((res) => (this.countries = res));
    this.athleteService.getEducationLevels().subscribe((res) => (this.educationLevels = res));

    this.form.get('birthCountryId')?.valueChanges.subscribe((countryId) => {
      this.departments = [];
      this.cities = [];
      this.form.patchValue({ birthDepartmentId: '', birthCityId: '' });
      if (countryId) {
        this.athleteService.getDepartmentsByCountry(countryId).subscribe((res) => {
          this.departments = res;
        });
      }
    });

    this.form.get('birthDepartmentId')?.valueChanges.subscribe((deptId) => {
      this.cities = [];
      this.form.patchValue({ birthCityId: '' });
      if (deptId) {
        this.athleteService.getCitiesByDepartment(deptId).subscribe((res) => {
          this.cities = res;
        });
      }
    });

    this.form.get('residenceCountryId')?.valueChanges.subscribe((countryId) => {
      if (countryId) {
        this.athleteService.getDepartmentsByCountry(countryId).subscribe();
      }
    });

    this.form.get('residenceDepartmentId')?.valueChanges.subscribe((deptId) => {
      if (deptId) {
        this.athleteService.getCitiesByDepartment(deptId).subscribe();
      }
    });
  }

  private checkEditMode(): void {
    this.athleteId = this.route.snapshot.paramMap.get('id');
    if (this.athleteId) {
      this.isEditMode = true;
      this.loadAthleteData(this.athleteId);
    }
  }

  private loadAthleteData(id: string): void {
    this.isLoading = true;
    this.athleteService.getAthleteById(id).subscribe({
      next: (athlete) => {
        this.form.patchValue({
          firstName: athlete.firstName,
          lastName: athlete.lastName,
          documentTypeId: athlete.documentTypeId,
          documentNumber: athlete.documentNumber,
          birthDate: athlete.birthDate,
          genderId: athlete.genderId,
          birthCountryId: athlete.birthCountryId,
          birthDepartmentId: athlete.birthDepartmentId,
          birthCityId: athlete.birthCityId,
          residenceCountryId: athlete.residenceCountryId,
          residenceDepartmentId: athlete.residenceDepartmentId,
          residenceCityId: athlete.residenceCityId,
          educationLevelId: athlete.educationLevelId,
          educationInstitution: athlete.educationInstitution,
          weight: athlete.weight,
          height: athlete.height,
          categoryId: athlete.categoryId,
          disciplineId: athlete.disciplineId,
          email: athlete.email,
          phone: athlete.phone,
        });
        this.currentPhotoUrl = athlete.photoUrl;
        this.loadDepartmentsForEdit(athlete);
        this.isLoading = false;
      },
      error: () => {
        Toast.fire({ icon: 'error', title: 'Error al cargar deportista' });
        this.router.navigate(['/sportsman']);
      },
    });
  }

  private loadDepartmentsForEdit(athlete: Athlete): void {
    if (athlete.birthCountryId) {
      this.athleteService.getDepartmentsByCountry(athlete.birthCountryId).subscribe((res) => {
        this.departments = res;
        if (athlete.birthDepartmentId) {
          this.athleteService.getCitiesByDepartment(athlete.birthDepartmentId).subscribe((res2) => {
            this.cities = res2;
          });
        }
      });
    }
  }

  getStepFields(step: number): string[] {
    switch (step) {
      case 1:
        return ['firstName', 'lastName', 'documentTypeId', 'documentNumber', 'birthDate', 'genderId'];
      case 2:
        return [
          'birthCountryId', 'birthDepartmentId', 'birthCityId',
          'residenceCountryId', 'residenceDepartmentId', 'residenceCityId',
          'educationLevelId', 'weight', 'height',
        ];
      case 3:
        return ['categoryId', 'disciplineId', 'email'];
      default:
        return [];
    }
  }

  isStepValid(step: number): boolean {
    const fields = this.getStepFields(step);
    return fields.every((field) => {
      const control = this.form.get(field);
      return control ? control.valid : true;
    });
  }

  nextStep(): void {
    if (this.isStepValid(this.currentStep) && this.currentStep < this.totalSteps) {
      this.currentStep++;
    } else {
      this.markStepTouched(this.currentStep);
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  private markStepTouched(step: number): void {
    const fields = this.getStepFields(step);
    fields.forEach((field) => {
      this.form.get(field)?.markAsTouched();
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const allowed = /\.(jpg|jpeg|png)$/i;
      if (!allowed.test(file.name)) {
        Toast.fire({ icon: 'error', title: 'Solo se permiten archivos JPG, JPEG o PNG' });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        Toast.fire({ icon: 'error', title: 'El archivo no debe superar 2MB' });
        return;
      }
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.currentPhotoUrl = null;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formData = this.form.value;

    const athleteData: Partial<Athlete> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      documentTypeId: formData.documentTypeId,
      documentNumber: formData.documentNumber,
      birthDate: formData.birthDate,
      genderId: formData.genderId,
      birthCountryId: formData.birthCountryId,
      birthDepartmentId: formData.birthDepartmentId,
      birthCityId: formData.birthCityId,
      residenceCountryId: formData.residenceCountryId,
      residenceDepartmentId: formData.residenceDepartmentId,
      residenceCityId: formData.residenceCityId,
      educationLevelId: formData.educationLevelId,
      educationInstitution: formData.educationInstitution,
      weight: formData.weight,
      height: formData.height,
      categoryId: formData.categoryId,
      disciplineId: formData.disciplineId,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      let athlete: Athlete;
      if (this.isEditMode && this.athleteId) {
        const result = await this.athleteService.updateAthlete(this.athleteId, athleteData).toPromise();
        athlete = result!;
      } else {
        const result = await this.athleteService.createAthlete(athleteData).toPromise();
        athlete = result!;
      }

      if (this.selectedFile && athlete?.id) {
        await this.athleteService.uploadPhoto(athlete.id, this.selectedFile).toPromise();
      }

      Toast.fire({
        icon: 'success',
        title: this.isEditMode ? 'Deportista actualizado' : 'Deportista registrado',
      });
      this.router.navigate(['/sportsman']);
    } catch (error: any) {
      const msg = error?.error?.message || error?.message || 'Error al guardar';
      Toast.fire({ icon: 'error', title: msg });
    } finally {
      this.isSaving = false;
    }
  }

  cancel(): void {
    this.router.navigate(['/sportsman']);
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (!control) return '';
    if (control.hasError('required')) return 'Este campo es requerido';
    if (control.hasError('email')) return 'Email inválido';
    if (control.hasError('minlength')) return 'Muy corto';
    if (control.hasError('maxlength')) return 'Muy largo';
    if (control.hasError('min')) return `Valor mínimo: ${control.errors?.['min'].min}`;
    if (control.hasError('max')) return `Valor máximo: ${control.errors?.['max'].max}`;
    return '';
  }
}
