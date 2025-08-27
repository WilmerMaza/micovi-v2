import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Ejercicio, viewEjercicio } from '../../Model/ejercicioModel';
import { Imgs } from '../../../../core/services/imgs';
import { ImageLoader } from '../../../../utils/readerBlodImg';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-view-ejercicio',
  templateUrl: './view-ejercicio.component.html',
  styleUrls: ['./view-ejercicio.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewEjericioComponent implements OnInit {
  public showFullDescription: boolean = false;
  public maxLength: number = 150;
  public initCarousel: number = 0;
  public data: viewEjercicio = { data: {} as Ejercicio, dataEjercicio: [] };
  public zoomImage: boolean = false;
  public index: number = 0;
  public imageUrl: string[] = [];
  public dataEjercicios: Ejercicio[] = [];
  public imageDefault: string = 'imagen.jpg';
  constructor(private imagenFuntionsService$: Imgs) {}

  @Input('dataSource') set setDataSource(data: viewEjercicio) {
    this.data = data;
    this.initCarousel = data.dataEjercicio.findIndex(
      (obj) => obj.ID === data.data.ID
    );
  }

  ngOnInit(): void {
    this.initData();
    this.viewImage();
  }

  initData(): void {
    const { dataEjercicio, data } = this.data;
    this.initCarousel = dataEjercicio.findIndex((obj) => obj.ID === data.ID);
    this.dataEjercicios = dataEjercicio;
  }

  @Output() actionClose = new EventEmitter<boolean>();

  async viewImage(): Promise<void> {
    const imagePromises: Promise<void>[] = [];

    this.data.dataEjercicio.forEach((ejercicio: Ejercicio, index: number) => {
      const { VisualIllustration } = ejercicio;
      if (VisualIllustration !== this.imageDefault && VisualIllustration) {
        const imageLoader = new ImageLoader(this.imagenFuntionsService$);
        const imagePromise = new Promise<void>((resolve) => {
          imageLoader.loadImage(VisualIllustration, false, (imageUrl) => {
            this.imageUrl[index] = imageUrl;
            resolve();
          });
        });
        imagePromises.push(imagePromise);
      } else {
        this.imageUrl[index] = this.imageDefault; // Usar el índice directamente
      }
    });

    // Esperar a que se completen todas las promesas de carga de imágenes
    await Promise.all(imagePromises);
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  cerrar(): void {
    this.actionClose.emit(true);
  }

  abrirImagen(index: number): void {
    this.zoomImage = !this.zoomImage;
    this.index = index;
  }
}
