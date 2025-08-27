// import { Component, Inject, OnInit } from '@angular/core';
// import {
//   FormControl,
//   FormGroup,
//   FormsModule,
//   ReactiveFormsModule,
//   Validators as validForm,
// } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// import { CommonModule } from '@angular/common';
// import { MATERIAL_IMPORTS } from '../../../../shared/modules/material-imports';
// import { editComplement } from '../../model/interfaceComplementos';
// import { ComplementosService } from '../../services/complementos.service';
// import { resposeCreate } from '../../../entrenador/Model/entrenadorModel';
// import { Toast } from '../../../../utils/alert_Toast';
// import { DynamicError } from '../../../../shared/model/filterModel';

// @Component({
//   selector: 'app-add-categoria',
//   templateUrl: './add-categoria.component.html',
//   styleUrls: ['./add-categoria.component.scss'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     ...MATERIAL_IMPORTS,
//   ],
// })
// export class AddCategoriaComponent implements OnInit {
//   public addCategoriaForm: FormGroup;
//   public titleInit: string = 'Crear categoria';
//   public isEdit: boolean = false;

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: editComplement,
//     public dialogRef: MatDialogRef<AddTareaComponent>,
//     private complementos$: ComplementosService
//   ) {
//     this.addCategoriaForm = new FormGroup({
//       name: new FormControl('', [validForm.required]),
//       descripcion: new FormControl('', [validForm.required]),
//     });
//   }

//   ngOnInit(): void {
//     if (this.data !== null) {
//       this.editTask();
//     }
//   }

//   editTask(): void {
//     const { ID, name, descripcion } = this.data;
//     this.isEdit = true;
//     this.titleInit = 'Editar categoria';
//     if (ID !== '') {
//       this.addCategoriaForm.patchValue({ name });
//       this.addCategoriaForm.patchValue({ descripcion });
//     }
//   }

//   createTask(): void {
//     if (this.addCategoriaForm.invalid) {
//       this.alertTrigger();
//       return;
//     }
//     const request = {
//       ...this.addCategoriaForm.value,
//     };

//     this.complementos$.crearCategoria(request).subscribe(
//       (data: resposeCreate) => {
//         Toast.fire({
//           icon: 'success',
//           title: data.Menssage,
//         });
//         this.onNoClick();
//       },
//       (dataError: DynamicError<any>) => {
//         const {
//           error: { mjs },
//         } = dataError;

//         Toast.fire({
//           icon: 'error',
//           title: mjs,
//         });
//       }
//     );
//   }

//   editCategory(): void {
//     if (this.addCategoriaForm.invalid) {
//       this.alertTrigger();
//       return;
//     }

//     var request: editComplement = {
//       ...this.addCategoriaForm.value,
//       ID: this.data.ID,
//     };

//     this.complementos$.editarCategoria(request).subscribe(
//       (data: resposeCreate) => {
//         Toast.fire({
//           icon: 'success',
//           title: data.Menssage,
//         });
//         this.onNoClick();
//       },
//       (dataError: DynamicError<any>) => {
//         const {
//           error: { msg },
//         } = dataError;

//         Toast.fire({
//           icon: 'error',
//           title: msg,
//         });
//       }
//     );
//   }

//   alertTrigger(): void {
//     this.addCategoriaForm.markAllAsTouched();
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
