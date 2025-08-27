import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ejerciciosFormModel } from '../../Model/ejerciciosFormModel';
import { EjercicioServices } from '../../services/ejercicioServices.service';
import {
  Ejercicio,
  SubGrupo,
  SubGrupoResponse,
  combinateDialogModel,
} from '../../Model/ejercicioModel';
import {
  UnitsofmeasurementsModel,
  UnitsofmeasurementsResponse,
} from '../../Model/UnitsofmeasurementsModel';
import { CreateEjercicioModel } from '../../Model/createEjercicioModel';
import { TypeRelationModel, TypeRelation } from '../../Model/typeRelation';
import { responseModel, responseUploadMode } from '../../Model/reponseModel';

import { Router } from '@angular/router';
import { Imgs } from '../../../../core/services/imgs';
import { Validators } from '../../../../utils/Validators';
import { Toast } from '../../../../utils/alert_Toast';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../../../shared/modules/material-imports';

@Component({
  selector: 'app-create-ejercicio',
  templateUrl: './create-ejercicio.component.html',
  styleUrls: ['./create-ejercicio.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
  ],
})
export class CreateEjercicioComponent implements OnInit {
  public ejercicioForm: FormGroup = new ejerciciosFormModel().formEjercicios();
  public dataSubgrupo: SubGrupo[] = [] as SubGrupo[];
  public dataUnitsofmeasurements: UnitsofmeasurementsModel[] | undefined;
  public dataCreateEjercicio: CreateEjercicioModel | undefined;
  public dataTypeRelation: TypeRelationModel[] = TypeRelation;
  public submitted: boolean = false;
  public tittleName: string | undefined;
  public selectedImageURL: string = '';
  public selectedFiles: File | undefined;
  public selectFile: File | undefined;
  public imageSelected: boolean = false;
  public data: combinateDialogModel = {} as combinateDialogModel;
  public combinate: boolean | undefined;

  constructor(
    private ejerciciosService$: EjercicioServices,
    private imagenFuntionsService$: Imgs,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSubGrupos();
    this.unitsofmeasurements();
    this.tittle();
  }

  tittle(): void {
    this.ejerciciosService$.datosActualesEjercicios.subscribe(
      (datos: combinateDialogModel) => {
        this.data = datos;
      }
    );
    const { combinate } = this.data;
    this.tittleName = combinate
      ? 'Crear ejercicio combinado'
      : 'Crear ejercicio';
    this.combinate = combinate;
  }

  onSubmit(): void {
    const { cantidad, calidadPromedio } = this.ejercicioForm.value;

    if (
      this.submitted &&
      this.ejercicioForm.valid &&
      cantidad != calidadPromedio
    ) {
      const {
        name,
        description,
        abbreviation,
        subgrupo,
        relationship,
        cantidad,
        calidadPromedio,
        image,
        linkEjercicios,
      } = this.ejercicioForm.value;

      this.dataCreateEjercicio = {
        ...this.dataCreateEjercicio,
        Name: name,
        Description: description,
        Abbreviation: abbreviation,
        VisualIllustration: Validators.isNullOrUndefined(this.selectedFiles)
          ? 'imagen.jpg'
          : this.selectedFiles.name,
        Relationship: relationship,
        SubGrupoID: subgrupo,
        LinkEjercicios: linkEjercicios,
        UnidTypes: [
          {
            UnitsofmeasurementID: cantidad,
            Type: 'cantidad',
          },
          {
            UnitsofmeasurementID: calidadPromedio,
            Type: 'calidad',
          },
        ],
      };
      const formData = new FormData();
      if (!Validators.isNullOrUndefined(this.selectedFiles)) {
        formData.append('file', this.selectedFiles);
      }
      const { combinate, dataEjercicios } = this.data;
      if (combinate) {
        this.dataCreateEjercicio.ListIDExercises = dataEjercicios.map(
          (item: Ejercicio) => item.ID
        );
      }

      this.ejerciciosService$[
        combinate ? 'CreateEjercicioCombinate' : 'CreateEjercicio'
      ](this.dataCreateEjercicio).subscribe(async (res: responseModel) => {
        if (res.success) {
          this.router.navigate(['Ejercicios']);
          if (!Validators.isNullOrUndefined(this.selectedFiles)) {
            this.uploadImg(formData);
          }
          await Toast.fire({
            icon: 'success',
            title: res.msg,
          });
        } else {
          await Toast.fire({
            icon: 'error',
            title: res.msg,
          });
        }
      });
    }
  }

  removeImage(): void {
    this.selectedFiles = this.selectFile;
    this.selectedImageURL = '';
  }

  uploadImg(formData: FormData): void {
    this.imagenFuntionsService$.subirImg(formData).subscribe(
      (respuesta: responseUploadMode) => {
        Toast.fire({
          icon: 'success',
          title: respuesta.msg,
        });
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

  onCreateEjercicio(): void {
    this.submitted = true;
    this.onSubmit();
  }

  unitsofmeasurements(): void {
    this.ejerciciosService$
      .GetAllUnitsofmeasurements()
      .subscribe((res: UnitsofmeasurementsResponse) => {
        this.dataUnitsofmeasurements = res.item;
      });
  }

  getSubGrupos(): void {
    this.ejerciciosService$
      .GetSubGrupos()
      .subscribe((res: SubGrupoResponse) => {
        this.dataSubgrupo = res.item;
      });
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

  volver(): void {
    this.router.navigate(['Ejercicios']);
  }
}
