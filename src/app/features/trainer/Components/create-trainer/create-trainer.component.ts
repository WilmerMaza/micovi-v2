import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import {
  trainerNivelEducativo,
  gender,
  typeIdentification,
} from '../../Models/constantesTrainer';
import {
  eventsPaises,
  listInfo,
  resposeCreate,
  viewModalTrainer,
} from '../../Models/trainerModel';
import { TrainerService } from '../../services/trainer.service';
import { CryptoService } from '../../../../utils/crypto.service';
import {
  CityName,
  CIUDADESCONST,
  Estado,
  ESTADOSCONST,
  Iciudades,
  Iestados,
  Ipaises,
  PAISESCONST,
} from '../../../../models/PaisesConst';
import { responseUploadMode } from '../../../../models/interface';
import { Toast } from '../../../../utils/alert_Toast';
import { ImageLoader } from '../../../../utils/readerBlodImg';
import {
  NormaliceLowerValidators,
  regExps,
  Validators as Validar,
} from '../../../../utils/Validators';
import { trainerFormModel } from '../../Models/trainerFormModel';
import { Imgs } from '../../../../core/services/imgs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../../../shared/modules/material-imports';
import { MatFormField } from '@angular/material/form-field';
@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatIcon,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatOptionModule,
    ...MATERIAL_IMPORTS,
  ],
})
export class CreateTrainerComponent implements OnInit, OnDestroy {

  public readonly showViewTrainer: boolean = true;
  private readonly destroy$ = new Subject<void>();

  public currentPage: number = 0;
  public readonly trainerForm: FormGroup = new trainerFormModel().formTrainer();

  // Datos de configuración
  public readonly listPaises: Ipaises[] = PAISESCONST;
  public listCiudades: CityName[] = [];
  public listEstados: Estado[] = [];
  public readonly genderList: listInfo[] = gender;
  public readonly trainerNivel: listInfo[] = trainerNivelEducativo;
  public readonly typeIdentificationList: listInfo[] = typeIdentification;

  // Estados del componente
  public isEdit: boolean = false;
  public activeDepto: boolean = false;
  public activeCity: boolean = false;
  public imageSelected: boolean = false;

  // Datos de archivo e imagen
  public selectedFiles: File | undefined;
  public selectedImageURL: string = '';

  // Configuración de teléfono
  public prefijoPhone: string = '+57';
  public maskPhone: string = '00 0000 0000';
  public placeHolderPhone: string = '+57 Colombia';

  // Validación
  private verifyPassword: boolean = false;
  private validateRegex: RegExp | undefined;

  // Servicios
  private readonly cryptoService$ = new CryptoService();

  constructor(
    private readonly trainerService$: TrainerService,
    private readonly imagenFuntionsService$: Imgs,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeComponent(): void {
    this.generatePhoneRegex(this.maskPhone);
    this.isEdit = false;
    this.restorePasswordValidation();
  }

  closeCard(): void {
    this.navigateToTrainerList();
  }

  private navigateToTrainerList(): void {
    this.router.navigate(['/entrenador']);
  }


  private loadImage(imageName: string | undefined): void {
    if (!imageName) return;

    const imageLoader = new ImageLoader(this.imagenFuntionsService$);
    imageLoader.loadImage(imageName, false, (imageUrl: string) => {
      this.selectedImageURL = imageUrl;
    });
  }

  hasErrorRegexp(controlName: string): boolean {
    const controlValue = this.trainerForm.get(controlName)?.value;
    return this.validateRegex ? !this.validateRegex.test(controlValue) : false;
  }

  validatePassword(): void {
    const password = this.trainerForm.get('password')?.value;
    const confirmPassword = this.trainerForm.get('passwordVerificate')?.value;

    const passwordsMatch = password === confirmPassword;
    this.verifyPassword = !passwordsMatch;

    const confirmPasswordControl = this.trainerForm.get('passwordVerificate');
    if (passwordsMatch) {
      confirmPasswordControl?.setErrors(null);
    } else {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    }
  }

  universalCiudadesApis(event: eventsPaises): void {
    this.activeCity = true;
    this.trainerForm.get('city')?.enable();
    const { value } = event;
    this.loadCitiesByState(value);
  }

  private loadCitiesByState(stateName: string): void {
    const stateData = CIUDADESCONST.find(
      (item: Iciudades) => item.state_name.toLowerCase() === stateName.toLowerCase()
    );
    this.listCiudades = stateData?.city_name || [];
  }

  universalEstadoApis(event: eventsPaises): void {
    this.activeDepto = true;
    this.trainerForm.get('stateordepartmen')?.enable();
    const { value } = event;
    this.updatePhoneConfigByCountry(value);
    this.loadStatesByCountry(value);
  }

  private loadStatesByCountry(countryName: string): void {
    const countryData = ESTADOSCONST.find(
      (item: Iestados) => item.country_name.toLowerCase() === countryName.toLowerCase()
    );
    this.listEstados = countryData?.estados || [];
  }

  private updatePhoneConfigByCountry(country: string): void {
    const countryData = PAISESCONST.find(
      (paisData: Ipaises) => paisData.country_name === country
    );

    if (countryData) {
      const { country_name, country_phone_code, mask_phone_code } = countryData;
      this.generatePhoneRegex(mask_phone_code);
      this.placeHolderPhone = `${country_phone_code} ${country_name}`;
      this.prefijoPhone = country_phone_code;
      this.maskPhone = mask_phone_code;
    }
  }

  private generatePhoneRegex(mask: string): void {
    const escapedMask = mask.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regexString = escapedMask.replace(/0/g, '\\d').replace(/\s/g, '');
    const regex = new RegExp('^' + regexString + '$');

    this.validateRegex = regex;
    this.updatePhoneValidators(regex);
  }

  private updatePhoneValidators(regex: RegExp): void {
    const phoneControl = this.trainerForm.get('phone');
    phoneControl?.clearValidators();
    phoneControl?.addValidators([Validators.required, Validators.pattern(regex)]);
    phoneControl?.updateValueAndValidity();
  }

  setCurrentPageR(): void {
    this.currentPage++;
  }

  setCurrentPageL(): void {
    this.currentPage--;
  }

  private resetForm(): void {
    this.trainerForm.reset();
    this.currentPage = 0;
    this.resetImageData();
    this.resetLocationControls();
    this.navigateToTrainerList();
  }

  private resetImageData(): void {
    this.selectedFiles = undefined;
    this.imageSelected = false;
    this.selectedImageURL = '';
  }

  private resetLocationControls(): void {
    this.trainerForm.get('city')?.disable();
    this.trainerForm.get('stateordepartmen')?.disable();
    this.activeDepto = false;
    this.activeCity = false;
  }

  private removePasswordValidation(): void {
    const passwordControl = this.trainerForm.get('password');
    const confirmPasswordControl = this.trainerForm.get('passwordVerificate');

    passwordControl?.clearValidators();
    confirmPasswordControl?.clearValidators();
    passwordControl?.disable();
    confirmPasswordControl?.disable();
    passwordControl?.updateValueAndValidity();
    confirmPasswordControl?.updateValueAndValidity();
  }

  private restorePasswordValidation(): void {
    const passwordControl = this.trainerForm.get('password');
    const confirmPasswordControl = this.trainerForm.get('passwordVerificate');

    passwordControl?.setValidators([Validators.pattern(regExps['regexPassword'])]);
    passwordControl?.updateValueAndValidity();
    passwordControl?.enable();
    confirmPasswordControl?.enable();
  }

  createTrainer(): void {
    if (!this.isFormValid()) {
      return;
    }

    const trainerData = this.prepareTrainerData();
    const formData = this.prepareFormData();

    this.submitTrainer(trainerData, formData);
  }

  private isFormValid(): boolean {
    this.trainerForm.markAllAsTouched();
    return this.trainerForm.valid && !this.verifyPassword;
  }

  private prepareTrainerData(): any {
    const { value } = this.trainerForm;
    NormaliceLowerValidators.normaliceData(value);

    const { stateordepartmen, city, nationality, image, phone } = value;
    const formattedPhone = `${this.prefijoPhone} ${phone}`;

    const baseData = {
      ...value,
      stateordepartmen,
      city,
      nationality,
      phone: formattedPhone,
    };

    if (this.isEdit) {
      return {
        ...baseData,
        image: this.selectedFiles?.name || image,
        deleteImg: this.selectedFiles ? image : '',
      };
    } else {
      const encryptedPassword = this.cryptoService$
        .Encript(this.trainerForm.get('password')?.value)
        .toString();

      return {
        ...baseData,
        password: encryptedPassword,
        image: this.selectedFiles?.name || '',
      };
    }
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    if (this.selectedFiles) {
      formData.append('file', this.selectedFiles);
    }
    return formData;
  }

  private submitTrainer(trainerData: any, formData: FormData): void {
    const operation = this.isEdit ? 'updateTrainer' : 'createTrainer';

    this.trainerService$[operation](trainerData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: resposeCreate) => this.handleTrainerSuccess(response, formData),
        error: (error) => this.handleTrainerError(error)
      });
  }

  private handleTrainerSuccess(response: resposeCreate, formData: FormData): void {
    if (this.selectedFiles) {
      this.uploadImg(formData);
    } else {
      this.showSuccessMessage(response.Menssage);
      this.resetForm();
    }
  }

  private handleTrainerError(error: any): void {
    const errorMessage = error?.error?.error || 'Error desconocido';
    this.showErrorMessage(errorMessage);
  }

  uploadImg(formData: FormData): void {
    this.imagenFuntionsService$.subirImg(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: responseUploadMode) => {
          this.showSuccessMessage(response.msg);
          this.resetForm();
        },
        error: (error) => {
          const errorMessage = error?.error?.error || 'Error al subir imagen';
          this.showErrorMessage(errorMessage);
        }
      });
  }

  private showSuccessMessage(message: string): void {
    Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  private showErrorMessage(message: string): void {
    Toast.fire({
      icon: 'error',
      title: message,
    });
  }

  onFilesSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    this.selectedFiles = file;
    this.processSelectedFile(file);
  }

  private processSelectedFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.selectedImageURL = e.target?.result as string;
      this.imageSelected = true;
    };
    reader.readAsDataURL(file);
  }
}
