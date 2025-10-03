import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
export class CreateTrainerComponent implements OnInit {
  @Input('viewActive') set setView(value: viewModalTrainer) {
    this.showViewTrainer = value.isVisible;
    this.dataIni(value);
  }
  @Output() CreateTrainer = new EventEmitter<boolean>();

  public showViewTrainer: Boolean | undefined = true;
  public currentPage: number = 0;
  public trainerForm: FormGroup = new trainerFormModel().formTrainer();
  private cryptoService$ = new CryptoService();
  public listPaises: Ipaises[] = PAISESCONST;
  public listCiudades: CityName[] | undefined = [];
  public listEstados: Estado[] | undefined = [];
  public genderlist: Array<listInfo> = gender;
  public trainerNivel: Array<listInfo> = trainerNivelEducativo;
  public typeIdentificationlist: Array<listInfo> = typeIdentification;
  public isActiveCrear: boolean = true;
  public isEdit: boolean = false;
  public activeDepto: boolean = false;
  public activeCity: boolean = false;
  public selectedFiles: File | undefined;
  public imageSelected: boolean = false;
  public selectedImageURL: string = '';
  public imageUrl: string = '';
  private veryficatePass: boolean = false;
  tooltipText: string = 'Esta es una imagen de muestra';
  public prefijoPhone: string = '+57';
  public maskPhone: string = '00 0000 0000';
  public placeHolderPhone: string = '+57 Colombia';
  private validateRegex: RegExp | undefined;

  constructor(
    private trainerService$: TrainerService,
    private imagenFuntionsService$: Imgs
  ) {}

  ngOnInit(): void {
    this.generarExpresionRegular(this.maskPhone);
  }

  closeCard(): void {
    this.showViewTrainer = false;
    this.defaulCarrusel();
  }

  dataIni(value: viewModalTrainer): void {
    if (!Validar.isNullOrUndefined(value.data)) {
      const {
        data: { nationality, stateordepartmen, studyLevelMax },
      } = value;

      const {
        ID,
        createdAt,
        updatedAt,
        SportsInstitutionID,

        ...dataTrainer
      } = value.data;
      dataTrainer.password = '';
      dataTrainer.passwordVerificate = '';
      dataTrainer.studyLevelMax = studyLevelMax.toLowerCase();
      const state = {
        value: nationality,
      };
      const citys = {
        value: stateordepartmen,
      };
      this.viewImage(dataTrainer.image);
      this.universalCiudadesApis(citys);
      this.universalEstadoApis(state);
      this.trainerForm.setValue(dataTrainer);
      this.isEdit = true;
      this.quitarValidacion();
    } else {
      this.isEdit = false;
      this.restablecerValidacion();
    }
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg) {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, false, (imageUrl) => {
        this.selectedImageURL = imageUrl;
      });
    }
  }

  hasErrorRegexp(controlName: string): boolean {
    return !this.validateRegex?.test(
      this.trainerForm.get(controlName)?.value
    );
  }

  validatePassword(): void {
    const password = this.trainerForm.get('password')?.value;
    const confirmPassword =
      this.trainerForm.get('passwordVerificate')?.value;

    if (password !== confirmPassword) {
      this.trainerForm
        .get('passwordVerificate')
        ?.setErrors({ passwordMismatch: true });
      this.veryficatePass = true;
    } else {
      this.trainerForm.get('passwordVerificate')?.setErrors(null);
      this.veryficatePass = false;
    }
  }

  universalCiudadesApis(event: eventsPaises): void {
    this.activeCity = true;
    this.trainerForm.get('city')?.enable();
    const { value } = event;
    this.listCiudades = CIUDADESCONST.find(
      (item: Iciudades) => item.state_name.toLowerCase() === value.toLowerCase()
    )?.city_name;
  }

  universalEstadoApis(event: eventsPaises): void {
    this.activeDepto = true;
    this.trainerForm.get('stateordepartmen')?.enable();
    const { value } = event;
    this.getMaskPhonecountry(value);
    this.listEstados = ESTADOSCONST.find(
      (item: Iestados) =>
        item.country_name.toLowerCase() === value.toLowerCase()
    )?.estados;
  }

  getMaskPhonecountry(country: string): void {
    PAISESCONST.forEach((value: Ipaises) => {
      const { country_name, country_phone_code, mask_phone_code } = value;
      if (country_name === country) {
        this.generarExpresionRegular(mask_phone_code);
        this.placeHolderPhone = `${country_phone_code} ${country_name}`;
        this.prefijoPhone = country_phone_code;
        this.maskPhone = mask_phone_code;
      }
    });
  }

  generarExpresionRegular(mask: string): void {
    // Escapar caracteres especiales en la máscara
    const escapedMask = mask.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // Reemplazar '0' con '\d'
    const regexString = escapedMask.replace(/0/g, '\\d');

    const withoutSpace = regexString.replace(/\s/g, '');
    // Construir la expresión regular completa
    const regex = new RegExp('^' + withoutSpace + '$');

    this.validateRegex = regex;
    this.trainerForm.get('phone')?.clearValidators();
    this.trainerForm
      .get('phone')
      ?.addValidators([Validators.required, Validators.pattern(regex)]);
    this.trainerForm.get('phone')?.updateValueAndValidity();
  }

  setCurrentPageR(): void {
    this.currentPage = this.currentPage + 1;
  }

  setCurrentPageL(): void {
    this.currentPage = this.currentPage - 1;
  }

  defaulCarrusel(): void {
    this.trainerForm.reset();
    this.currentPage = 0;
    this.selectedFiles = new File([], 'empty.txt');
    this.imageSelected = false;
    this.selectedImageURL = '';
    this.trainerForm.get('city')?.disable();
    this.trainerForm.get('stateordepartmen')?.disable();
    this.activeDepto = false;
    this.activeCity = false;
    this.CreateTrainer.emit(true);
  }

  quitarValidacion(): void {
    this.trainerForm.get('password')?.clearValidators();
    this.trainerForm.get('passwordVerificate')?.clearValidators();
    this.trainerForm.get('password')?.disable();
    this.trainerForm.get('passwordVerificate')?.disable();
    this.trainerForm.get('password')?.updateValueAndValidity();
    this.trainerForm.get('passwordVerificate')?.updateValueAndValidity();
  }

  // Función para restablecer la validación
  restablecerValidacion(): void {
    this.trainerForm
      .get('password')
      ?.setValidators([Validators.pattern(regExps['regexPassword'])]);
    this.trainerForm.get('password')?.updateValueAndValidity();
    this.trainerForm.get('password')?.enable();
    this.trainerForm.get('passwordVerificate')?.enable();
  }

  createTrainer(): void {
    this.trainerForm.markAllAsTouched();
    if (this.trainerForm.invalid) {
      return;
    }

    if (this.veryficatePass) {
      return;
    }

    const { value } = this.trainerForm;
    const encryptedData = this.cryptoService$
      .Encript(this.trainerForm.get('password')?.value)
      .toString();

    const { stateordepartmen, city, nationality, image, phone } = value;
    NormaliceLowerValidators.normaliceData(value);

    let telef = `${this.prefijoPhone} ${phone}`;
    const formTrainer = this.isEdit
      ? {
          ...value,
          stateordepartmen,
          city,
          nationality,
          image: Validar.isNullOrUndefined(this.selectedFiles)
            ? image
            : this.selectedFiles.name,
          deleteImg: Validar.isNullOrUndefined(this.selectedFiles) ? '' : image,
          phone: telef,
        }
      : {
          ...value,
          password: encryptedData,
          image: Validar.isNullOrUndefined(this.selectedFiles)
            ? ''
            : this.selectedFiles.name,
          stateordepartmen,
          city,
          nationality,
          phone: telef,
        };

    const formData = new FormData();

    if (!Validar.isNullOrUndefined(this.selectedFiles)) {
      formData.append('file', this.selectedFiles);
    }

    this.trainerService$[
      this.isEdit ? 'updateTrainer' : 'createTrainer'
    ](formTrainer).subscribe(
      async (res: resposeCreate) => {
        if (!Validar.isNullOrUndefined(this.selectedFiles)) {
          this.uploadImg(formData);
        } else {
          Toast.fire({
            icon: 'success',
            title: res.Menssage,
          });
          this.defaulCarrusel();
        }
      },
      (respError): void => {
        const {
          error: { error },
        } = respError;
        Toast.fire({
          icon: 'error',
          title: error,
        });
      }
    );
  }

  uploadImg(formData: FormData): void {
    this.imagenFuntionsService$.subirImg(formData).subscribe(
      (respuesta: responseUploadMode) => {
        Toast.fire({
          icon: 'success',
          title: respuesta.msg,
        });
        this.defaulCarrusel();
      },
      (respError): void => {
        const {
          error: { error },
        } = respError;
        Toast.fire({
          icon: 'error',
          title: error,
        });
      }
    );
  }

  onFilesSelected(event: any): void {
    const {
      target: { files },
    } = event;

    this.selectedFiles = files[0];

    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageURL = e.target.result;
        this.imageSelected = true; // Establecer imageSelected en true
      };
      reader.readAsDataURL(file);
    }
  }
}
