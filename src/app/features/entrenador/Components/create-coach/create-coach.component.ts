import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { listInfo } from '../../../../models/interface';
import { PAISESCONST, ESTADOSCONST, CIUDADESCONST, Iestados, Iciudades, Ipaises, Estado, CityName } from '../../../../models/PaisesConst';
import { typeIdentification } from '../../../../models/constan';
import { gender, entradorNivelEducativo } from '../../../../view/entrenador/Model/constantesEntrenador';
import { eventsPaises } from '../../../../view/entrenador/Model/entrenadorModel';

@Component({
  selector: 'app-create-coach',
  standalone: true,
  templateUrl: './create-coach.component.html',
  styleUrls: ['./create-coach.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class CreateCoachComponent implements OnInit {
  public coachForm: FormGroup;
  public generos: listInfo[] = gender;
  public typeIdentification: listInfo[] = typeIdentification;
  public nivelEstudio = entradorNivelEducativo;
  public listPaises: Ipaises[] = PAISESCONST;
  public listEstados: Estado[] | undefined = [];
  public listCiudades: CityName[] | undefined = [];
  public activeDepto = false;
  public activeCity = false;
  public selectedImageURL = '';
  public imageSelected = false;
  public selectedFiles: File | undefined;
  public isEdit = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.coachForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      typeIdentification: new FormControl('', [Validators.required]),
      identification: new FormControl('', [Validators.required]),
      birtDate: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      department: new FormControl({ value: '', disabled: true }, [Validators.required]),
      city: new FormControl({ value: '', disabled: true }, [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      studyLevelMax: new FormControl('', [Validators.required]),
      institutionNameStudy: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      image: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  universalEstadoApis(event: eventsPaises): void {
    this.activeDepto = true;
    this.coachForm.get('department')?.enable();
    const { value } = event;
    this.listEstados = ESTADOSCONST.find((item: Iestados) => item.country_name === value)?.estados;
  }

  universalCiudadesApis(event: eventsPaises): void {
    this.activeCity = true;
    this.coachForm.get('city')?.enable();
    const { value } = event;
    this.listCiudades = CIUDADESCONST.find((item: Iciudades) => item.state_name === value)?.city_name;
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFiles = file;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedImageURL = e.target?.result as string;
        this.imageSelected = true;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(event: MouseEvent): void {
    event.stopPropagation();
    this.selectedImageURL = '';
    this.imageSelected = false;
    this.selectedFiles = undefined;
  }

  closeCard(): void {
    this.router.navigate(['/Entrenador']);
  }

  submit(): void {
    if (this.coachForm.valid) {
      console.log('Coach submit', this.coachForm.value);
      this.router.navigate(['/Entrenador']);
    } else {
      this.coachForm.markAllAsTouched();
    }
  }
}
