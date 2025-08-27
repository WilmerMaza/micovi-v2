// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Observable, forkJoin } from 'rxjs';
// import { Diciplinas, Etapas, Grupo } from '../../model/interfaceComplementos';
// import { ComplementosService } from '../../services/complementos.service';
// import { AddCategoriaComponent } from '../addCategoria/add-categoria.component';
// import { CrearDisciplinaComponent } from '../crear-disciplina/crear-disciplina.component';
// import { ViewTableComponent } from '../viewTable/viewTable.component';
// import { AuthService } from '../../../../core/services/auth';
// import { DataUser } from '../../../../models/interface';
// import { CreateSubgrupoComponent } from '../../../Ejercicios/Components/create-subgrupo/create-subgrupo.component';
// import { categoryModel } from '../../../models/categoryModel';
// import {
//   SubGrupo,
//   SubGrupoResponse,
// } from '../../../Ejercicios/Model/ejercicioModel';

// @Component({
//   selector: 'app-complementos',
//   templateUrl: './complementos.component.html',
//   styleUrls: ['./complementos.component.scss'],
// })
// export class ComplementosComponent implements OnInit {
//   public isEscuela: boolean = false;
//   constructor(
//     public dialog: MatDialog,
//     private service$: AuthService,
//     private complementos$: ComplementosService
//   ) {}
//   ngOnInit(): void {
//     this.isAcount();
//   }

//   isAcount(): void {
//     this.service$.getDataUser$.subscribe((data: DataUser | null) => {
//       this.isEscuela = data?.account === 'Admin' ? true : false;
//     });
//   }

//   openSubgrupo(): void {
//     this.dialog.open(CreateSubgrupoComponent, {
//       width: '384px',
//       height: '470px',
//     });
//   }

//   createtask(): void {
//     this.dialog.open(AddTareaComponent, {
//       width: '384px',
//     });
//   }

//   createCategoria(): void {
//     this.dialog.open(AddCategoriaComponent, {
//       width: '384px',
//     });
//   }

//   createEtapa(): void {
//     this.dialog.open(AddEtapaComponent, {
//       width: '384px',
//     });
//   }

//   crearDisciplina(): void {
//     this.dialog.open(CrearDisciplinaComponent, {
//       width: '384px',
//     });
//   }

//   async viewTable(nameTable: string): Promise<void> {
//     let data = {
//       name: nameTable,
//       data: {},
//     };
//     switch (nameTable) {
//       case 'Categorías':
//         this.complementos$
//           .getAllCategory()
//           .subscribe((res: categoryModel[]) => {
//             data.data = res;
//             this.modal(data);
//           });
//         break;
//       case 'Etapas':
//         this.complementos$.getEtapas().subscribe((res: Etapas[]) => {
//           data.data = res;
//           this.modal(data);
//         });

//         break;
//       case 'Actividades':
//         this.complementos$.getTaskEntrenador().subscribe((res: task) => {
//           data.data = res;
//           this.modal(data);
//         });
//         break;
//       case 'Subgrupos':
//         this.complementos$.GetSubGrupos().subscribe((res: SubGrupoResponse) => {
//           if (res.item.length > 0) {
//             const { item } = res;

//             const observables: Observable<Grupo>[] = item.map(
//               (subgrupo: SubGrupo) => {
//                 return this.complementos$.getGrupo(subgrupo.GrupoID);
//               }
//             );

//             forkJoin(observables).subscribe((results: Grupo[]) => {
//               results.forEach((grupo: Grupo, index: number) => {
//                 const {
//                   item: { Abbreviation },
//                 } = grupo;
//                 item[index].grupoName = Abbreviation.toUpperCase();
//                 item[index].abreviatura =
//                   item[index].abreviatura?.toUpperCase();
//               });

//               data.data = item;
//               this.modal(data, '556px');
//             });
//           } else {
//             data.data = res;
//             this.modal(data, '556px');
//           }
//         });
//         break;
//       case 'Disciplinas':
//         this.complementos$.getDiciplina().subscribe((res: Diciplinas[]) => {
//           data.data = res;
//           this.modal(data);
//         });
//         break;
//       default:
//         break;
//     }
//   }

//   modal(data: dinamicTableComplements, width?: string): void {
//     this.dialog.open(ViewTableComponent, {
//       width: width ?? '384px',
//       data: data,
//     });
//   }
// }
