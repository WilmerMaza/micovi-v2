/**
 * Barra de listado (búsqueda, selección, descarga y alta).
 *
 * Agrupa acciones de la tabla que no son filtros laterales, para que
 * `dinamic-filter` solo abra y aplique criterios.
 *
 * El conteo de filas marcadas llega por `DinamicService.selectNumber$`.
 * Descarga/combinar se delegan a la tabla vía `DinamicService.setData`.
 */
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActionResponse } from '../../model/Response/DefaultResponse';
import { dataToPass, DinamicService } from '../../services/dinamic.service';
import { regExps } from '../../../utils/Validators';
import { MATERIAL_IMPORTS } from '../../modules/material-imports';

@Component({
  selector: 'app-dinamic-toolbar',
  templateUrl: './dinamic-toolbar.component.html',
  styleUrls: ['./dinamic-toolbar.component.scss'],
  standalone: true,
  imports: [
    ...MATERIAL_IMPORTS,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
  ],
})
export class DinamicToolbarComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly service$ = inject(DinamicService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly textForm: FormGroup = this.formBuilder.group({
    textInput: ['', Validators.pattern(regExps['special'])],
  });

  selectItemCount = 0;
  viewSearch = true;
  nameAdd = '';

  @Input() isDownload = false;
  @Input('nameAdd') set nameAddDinamic(value: string) {
    this.nameAdd = value;
  }
  @Input() isButtonEjercicio = false;
  @Input() showDownload = true;
  @Input() showCombinate = false;
  @Input() showSelection = true;
  @Input() showButtonAdd = true;
  @Input() searchPlaceholder = 'Buscar...';
  @Input() searchAriaLabel = 'Buscar en el listado';

  @Output() actionToolbar = new EventEmitter<ActionResponse>();
  @Output() searchSubmit = new EventEmitter<string>();
  @Output() searchClear = new EventEmitter<void>();

  ngOnInit(): void {
    this.service$.selectNumber$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((count) => {
        this.selectItemCount = count;
        if (this.selectItemCount > 0 && this.isButtonEjercicio) {
          this.viewSearch = false;
          this.nameAdd = 'indicador';
        } else {
          this.viewSearch = true;
          this.nameAdd = this.isButtonEjercicio ? 'ejercicio' : this.nameAdd;
        }
        this.cdr.markForCheck();
      });
  }

  get searchValue(): string {
    return String(this.textForm.controls['textInput'].value ?? '');
  }

  onSubmit(): void {
    if (this.textForm.invalid) {
      return;
    }
    this.searchSubmit.emit(this.searchValue.trim());
  }

  clearSearch(): void {
    this.textForm.reset({ textInput: '' });
    this.searchClear.emit();
  }

  actionClick(data: string): void {
    if (
      data !== 'download' &&
      data !== 'combinate' &&
      this.nameAdd !== 'indicador'
    ) {
      this.actionToolbar.emit({ action: data, data });
      return;
    }

    if (data === 'add') {
      data = `${data} ${this.nameAdd}`;
    }
    this.sendDataToTable({ eventName: data, isEspecial: true });
  }

  private sendDataToTable(data: dataToPass): void {
    this.service$.setData(data);
  }
}
