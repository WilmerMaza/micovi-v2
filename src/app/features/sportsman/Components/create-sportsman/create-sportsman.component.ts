/**
 * Pantalla de alta / edición de deportista.
 *
 * Orquesta el reactive form (`sportsmanFormModel`), foto y cascada
 * país → departamento → ciudad. La UI es secciones densas Micovi;
 * create/update e upload de imagen no cambian de contrato.
 *
 * Usado por ruta `/sportsman/create|edit/:id` y overlay en listado.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SportsmanService } from '../../services/sportsman.service';

import { listInfo, responseUploadMode } from '../../../../models/interface';
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
import { Imgs } from '../../../../core/services/imgs';
import { typeIdentification } from '../../../../models/constan';

import {
  NormaliceLowerValidators,
  regExps,
  Validators as Validar,
} from '../../../../utils/Validators';

import { ImageLoader } from '../../../../utils/readerBlodImg';
import { calcularEdad } from '../../../../utils/UtilFunctions';

import { Toast } from '../../../../utils/alert_Toast';

import { MATERIAL_IMPORTS } from '../../../../shared/modules/material-imports';
import { CommonModule } from '@angular/common';
import { visible } from '../../../../view/models/HistorialCategoryModel';
import {
  ControlItem,
  SportsmanData,
} from '../../../../view/models/dataFilterSportsman';
import { sportsmanFormModel } from '../../../../view/models/sportsmanFormModel';
import { Diciplinas } from '../../../../view/complementos/model/interfaceComplementos';
import { ComplementosService } from '../../../../view/complementos/services/complementos.service';
import { gender } from '../../../../view/entrenador/Model/constantesEntrenador';
import { categoryModel } from '../../../../view/models/categoryModel';
import { eventsPaises } from '../../../../view/entrenador/Model/entrenadorModel';
import { SuccessResponse } from '../../../../view/models/SuccessResponse';
import { Sportsman } from '../../../../view/models/DataSportsman';
import { MOCK_SPORTSMEN } from '../../mocks/sportsman.mock';

@Component({
  selector: 'app-create-sportsman',
  templateUrl: './create-sportsman.component.html',
  styleUrls: ['./create-sportsman.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CreateSportsmanComponent implements OnInit {
  @Input('viewActive') set setView(value: visible) {
    this.bootstrappedFromInput = true;
    this.showViewSportsman = value.isVisible;
    this.getcategorys(value);
  }
  @Input('dataCategory') set dataCategory(value: SportsmanData[]) {
    this.dataCreateSportsman = value;
  }
  @Output() CreateSportsman = new EventEmitter<boolean>();
  public dataCreateSportsman: any;
  public showViewSportsman: Boolean = true;
  public currentPage: number = 0;
  public sportsmansForm: FormGroup = new sportsmanFormModel().formsportsman();
  public categorias: ControlItem[] | undefined;
  public generos: listInfo[] | undefined;
  public typeIdentification: listInfo[] | undefined;
  public isEdit: boolean = false;
  /** true cuando la pantalla se abrió por ruta (/create o /edit/:id). */
  public isRoutePage = false;
  public listEstados: Estado[] | undefined = [];
  public dataID: string = '';
  public activeDepto: boolean = false;
  public activeCity: boolean = false;
  public listPaises: Ipaises[] = PAISESCONST;
  public listCiudades: CityName[] | undefined = [];
  public selectedImageURL: string = '';
  public imageSelected: boolean = false;
  public selectedFiles: File | undefined;
  public diciplinasList: Diciplinas[] = [];
  public prefijoPhone: string = '+57';
  public maskPhone: string = '00 0000 0000';
  public placeHolderPhone: string = '+57 Colombia';
  private validateRegex: RegExp | undefined;
  private bootstrappedFromInput = false;

  constructor(
    private sporsmanService$: SportsmanService,
    private imagenFuntionsService$: Imgs,
    private complementos$: ComplementosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.categorias =
      this.dataCreateSportsman?.find(
        (item: SportsmanData) => item.property === 'category'
      )?.control || [];
    this.generos = gender;
    this.typeIdentification = typeIdentification;
    this.getDiciplinas();
    this.generarExpresionRegular(this.maskPhone);

    if (!this.bootstrappedFromInput) {
      this.bootstrapFromRoute();
    }
  }

  /** Carga create/edit cuando el componente es página de ruta (no overlay). */
  private bootstrapFromRoute(): void {
    const editId = this.route.snapshot.paramMap.get('id');
    const path = this.route.snapshot.routeConfig?.path ?? '';
    this.isRoutePage = path === 'create' || path.startsWith('edit');

    if (!this.isRoutePage) {
      return;
    }

    this.showViewSportsman = true;
    const [fromService] = this.sporsmanService$.getSportmanInfoRedirect();
    let data = fromService as Sportsman | undefined;

    if (editId && !data) {
      data = MOCK_SPORTSMEN.find((row) => row.ID === editId);
    }

    this.getcategorys({
      isVisible: true,
      data: editId ? data : undefined,
    });
  }

  closeCard(): void {
    if (this.isRoutePage) {
      this.router.navigate(['/sportsman']);
      return;
    }
    this.showViewSportsman = false;
    this.defaulCarrusel();
  }

  getcategorys(value: visible): void {
    this.sporsmanService$.getAllCategory().subscribe({
      next: (res: categoryModel[]) => {
        this.categorias = res.map((categorias: categoryModel) => {
          const { ID, name } = categorias;
          return {
            name: name,
            value: name,
            code: ID,
          };
        });
        this.dataIni(value);
      },
      error: () => {
        // Sin back (p. ej. mock): igual hidrata el formulario de edición.
        this.dataIni(value);
      },
    });
  }

  defaulCarrusel(): void {
    this.sportsmansForm.reset();
    this.currentPage = 0;
    this.selectedFiles = new File([], 'empty.txt');
    this.imageSelected = false;
    this.selectedImageURL = '';
    this.listEstados = [];
    this.listCiudades = [];
    this.sportsmansForm.get('city')?.disable();
    this.sportsmansForm.get('department')?.disable();
    this.activeDepto = false;
    this.activeCity = false;
    if (this.isRoutePage) {
      this.router.navigate(['/sportsman']);
      return;
    }
    this.CreateSportsman.emit(true);
  }

  getDiciplinas(): void {
    this.complementos$.getDiciplina().subscribe((res: Diciplinas[]) => {
      this.diciplinasList = res;
    });
  }

  dataIni(value: visible): void {
    if (!Validar.isNullOrUndefined(value.data)) {
      const {
        birtDate,
        city,
        department,
        category,
        email,
        gender,
        identification,
        institutionNameStudy,
        name,
        nationality,
        phone,
        studyLevelMax,
        typeIdentification,
        weight,
        height,
        image,
        DiciplinaID,
      } = value.data;

      const Categorium = this.categorias?.find(
        (categoria: ControlItem) => categoria.name === category
      );

      const data = {
        birtDate,
        city,
        email,
        gender,
        identification,
        institutionNameStudy,
        name,
        nationality,
        phone,
        department,
        DiciplinaID,
        studyLevelMax,
        typeIdentification,
        weight,
        height,
        category: Categorium,
        image,
      };
      const state = {
        value: nationality,
      };
      const citys = {
        value: department,
      };
      this.viewImage(image);
      this.universalCiudadesApis(citys);
      this.universalEstadoApis(state);
      this.sportsmansForm.setValue(data);
      this.isEdit = true;
      this.dataID = value.data.ID;
    } else {
      this.isEdit = false;
    }
  }

  universalCiudadesApis(event: eventsPaises): void {
    this.activeCity = true;
    this.sportsmansForm.get('city')?.enable();
    const { value } = event;
    this.listCiudades = CIUDADESCONST.find(
      (item: Iciudades) => item.state_name === value
    )?.city_name;
  }

  universalEstadoApis(event: eventsPaises): void {
    this.activeDepto = true;
    this.sportsmansForm.get('department')?.enable();
    const { value } = event;
    this.getMaskPhonecountry(value);
    this.listEstados = ESTADOSCONST.find(
      (item: Iestados) => item.country_name === value
    )?.estados;
  }

  hasErrorRegexp(controlName: string): boolean {
    return !this.validateRegex?.test(
      this.sportsmansForm.get(controlName)?.value
    );
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
    const escapedMask = mask.replace(
      regExps['escapeCaracteresEspeciales'],
      '\\$&'
    );

    // Reemplazar '0' con '\d'
    const regexString = escapedMask.replace(/0/g, '\\d');

    const withoutSpace = regexString.replace(/\s/g, '');
    // Construir la expresión regular completa
    const regex = new RegExp('^' + withoutSpace + '$');

    this.validateRegex = regex;
    this.sportsmansForm.get('phone')?.clearValidators();
    this.sportsmansForm
      .get('phone')
      ?.addValidators([Validators.required, Validators.pattern(regex)]);
    this.sportsmansForm.get('phone')?.updateValueAndValidity();
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg && nameImg !== 'Default.png') {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, false, (imageUrl) => {
        this.selectedImageURL = imageUrl;
        this.imageSelected = true;
      });
    }
  }
  setCurrentPageL(): void {
    this.currentPage = this.currentPage - 1;
  }

  setCurrentPageR(): void {
    this.currentPage = this.currentPage + 1;
  }

  async createSportsman(): Promise<void> {
    if (this.sportsmansForm.valid) {
      const {
        value: { image, department, city, nationality, category, birtDate },
        value,
      } = this.sportsmansForm;

      NormaliceLowerValidators.normaliceData(value);

      let edad = calcularEdad(birtDate);

      const formSportsman = this.isEdit
        ? {
            ...value,
            image: Validar.isNullOrUndefined(this.selectedFiles)
              ? image
              : this.selectedFiles.name,
            department,
            city,
            nationality,
            age: edad,
            category: category.value,
            CategoriumID: category.code,
            ID: this.dataID,
            deleteImg: Validar.isNullOrUndefined(this.selectedFiles)
              ? ''
              : image,
          }
        : {
            ...value,
            image: Validar.isNullOrUndefined(this.selectedFiles)
              ? 'default.png'
              : this.selectedFiles.name,
            category: category.value,
            CategoriumID: category.code,
            department,
            city,
            nationality,
            age: edad,
          };

      const formData = new FormData();

      if (!Validar.isNullOrUndefined(this.selectedFiles)) {
        formData.append('file', this.selectedFiles);
      }
      this.sporsmanService$[
        this.isEdit ? 'updateSportsman' : 'createSportsman'
      ](formSportsman).subscribe(
        async (res: SuccessResponse) => {
          if (!Validar.isNullOrUndefined(this.selectedFiles)) {
            this.uploadImg(formData);
          } else {
            await Toast.fire({
              icon: 'success',
              title: `${res.Message}`,
            });
          }

          this.defaulCarrusel();
        },
        (respError): void => {
          const { error } = respError;
          Toast.fire({
            icon: 'error',
            title: error,
          });
        }
      );
    } else {
      this.sportsmansForm.markAllAsTouched();
    }
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
  removeImage(event: MouseEvent): void {
    event.stopPropagation();
    this.selectedImageURL = '';
    this.imageSelected = false;
    this.selectedFiles = undefined;
  }
}

