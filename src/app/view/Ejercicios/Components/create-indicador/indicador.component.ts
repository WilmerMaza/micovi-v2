import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Ejercicio } from '../../Model/ejercicioModel';
import {
  IndicatorModel,
  indicatorsFormModel,
  levelList,
  templateList,
} from '../../Model/modelIndicators';
import { responseModel } from '../../Model/reponseModel';
import { EjercicioServices } from '../../services/ejercicioServices.service';
import { Validators } from '../../../../utils/Validators';
import { Toast } from '../../../../utils/alert_Toast';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../../../shared/modules/material-imports';
@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
  ],
})
export class IndicadorComponent implements OnInit {
  public formIndicador: FormGroup = new indicatorsFormModel().formIndicators();

  public levelsList: levelList[] = [{ level: 2 }, { level: 3 }, { level: 5 }];
  public countTemplates: templateList[] = [] as templateList[];
  public countLeves: Array<number> = [];
  public active: number = 0;
  public siguiente: boolean = false;
  public level: number = 0;
  public isRequeridoNivel: boolean = false;

  public numberIndicador: number | undefined = 1;

  constructor(
    private ejercicioServices$: EjercicioServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNumberIndicador();
  }

  getNumberIndicador = (): void => {
    if (
      Validators.isNullOrUndefined(
        this.ejercicioServices$.getExercisesList()[0].Indicadores
      )
    ) {
      this.numberIndicador = 1;
    } else if (
      this.ejercicioServices$.getExercisesList()[0].Indicadores === 0
    ) {
      this.numberIndicador = 1;
    } else {
      this.numberIndicador =
        this.ejercicioServices$.getExercisesList()[0]?.Indicadores + 1;
    }
  };

  createTemplate(level: number): void {
    this.countTemplates = new Array(level);
    this.countLeves = new Array(level);
    this.level = level;
    this.siguiente = true;
    this.formIndicador.get('descriptionLevel')?.enable();
    this.formIndicador.get('nameLevel')?.enable();
  }

  isFormValid(): boolean {
    if (this.isRequeridoNivel) {
      if (
        Validators.isNullOrUndefined(this.countTemplates[this.level]) ||
        this.countTemplates[this.level].name === ''
      ) {
        return true;
      }
    }

    return false;
  }

  changeTab(tab: any): void {
    let plus = 1;

    if (this.level === 2) {
      plus = 4;
    }
    if (this.level === 3) {
      plus = 2;
    }

    if (
      tab !== this.active &&
      this.formIndicador.get('nameLevel')?.value !== ''
    ) {
      if (tab > this.active) {
        this.countTemplates[this.active] = {
          number: this.formIndicador.get('level')?.value,
          name: this.formIndicador.get('nameLevel')?.value,
          description: this.formIndicador.get('descriptionLevel')?.value,
        };

        if (
          Validators.isNullOrUndefined(
            this.countTemplates[this.active + 1]?.name
          ) ||
          this.countTemplates[this.active + 1]?.name === ''
        ) {
          this.formIndicador.patchValue({
            level: this.formIndicador.get('level')?.value + plus,
            nameLevel: '',
            descriptionLevel: '',
          });
        } else {
          const { name, description, number } = this.countTemplates[tab];
          this.formIndicador.patchValue({
            level: number,
            nameLevel: name,
            descriptionLevel: description,
          });
        }

        this.active++;
      } else {
        if (
          Validators.isNullOrUndefined(this.countTemplates[this.active]?.name)
        ) {
          this.countTemplates[this.active] = {
            number: this.formIndicador.get('level')?.value,
            name: this.formIndicador.get('nameLevel')?.value,
            description: this.formIndicador.get('descriptionLevel')?.value,
          };
        }

        const { name, description, number } = this.countTemplates[tab];
        this.formIndicador.patchValue({
          level: number,
          nameLevel: name,
          descriptionLevel: description,
        });
        this.active = tab;
      }
    } else {
      this.formIndicador.markAllAsTouched();
      return;
    }
  }

  isTheSame = (tab: number): string => {
    let color = '';

    if ((this.countTemplates[tab]?.name ?? '') === '') {
      color = 'blue';
    } else {
      color = 'green';
    }

    if (this.isRequeridoNivel) {
      if (
        Validators.isNullOrUndefined(this.countTemplates[tab]) ||
        this.countTemplates[tab].name === ''
      ) {
        color = 'red';
      }
    }
    return color;
  };

  createIndicator(): void {
    if (this.formIndicador.invalid) {
      return;
    }

    this.countTemplates[this.active] = {
      number: this.formIndicador.get('level')?.value,
      name: this.formIndicador.get('nameLevel')?.value,
      description: this.formIndicador.get('descriptionLevel')?.value,
    };

    if (
      (this.countTemplates[this.level - 1]?.name ?? '') === '' ||
      this.formIndicador.get('nameLevel')?.invalid
    ) {
      this.isRequeridoNivel = true;
      return;
    }

    let indicatoRequest: IndicatorModel = {
      name: this.formIndicador.get('name')?.value,
      description: this.formIndicador.get('description')?.value,
      levelCal: this.formIndicador.get('levelCal')?.value,
      absolute: this.formIndicador.get('absolute')?.value,

      levelList: this.countTemplates,
      exercisesList: this.ejercicioServices$
        .getExercisesList()
        .map((data: Ejercicio) => data.ID),
      abrev: this.formIndicador.get('abrevt')?.value,
    };

    this.ejercicioServices$.CreateIndicators(indicatoRequest).subscribe(
      (data: responseModel) => {
        if (data.success) {
          this.ejercicioServices$.setExercisesList([]);
          Toast.fire({
            icon: 'success',
            title: data.msg,
          });
          this.goBackSuccess();
        }
      },
      (error) => {
        Toast.fire({
          icon: 'error',
          title: error,
        });
      }
    );
  }

  goBackSuccess(): void {
    this.router.navigate(['/Ejercicios']);
  }

  goBack(): void {
    window.history.back();
  }
}
