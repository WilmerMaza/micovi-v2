import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entrandor, viewModalEntrenador } from '../../Model/entrenadorModel';

import { Imgs } from '../../../../core/services/imgs';
import { DateValidators, Validators } from '../../../../utils/Validators';
import { ImageLoader } from '../../../../utils/readerBlodImg';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-viewEntrenador',
  templateUrl: './viewEntrenador.component.html',
  styleUrls: ['./viewEntrenador.component.scss'],
  imports: [MatCard, MatIcon, MatCardContent],
  standalone: true,
})
export class ViewEntrenadorComponent {
  @Input('viewActive') set setView(value: viewModalEntrenador) {
    const { data, isVisible } = value;
    this.imageUrl = '';
    this.showViewEntrenador = isVisible;

    if (!Validators.isNullOrUndefined(data)) {
      this.dataEntrenador = data;

      const { birtDate, stateordepartmen, city, nationality, image } = data;
      this.dataSingle = {
        ...data,
        birtDate: DateValidators.parseDate(birtDate),
        nationality: `${nationality}, ${city} (${stateordepartmen})`,
      };
      this.viewImage(image);
    }
  }

  @Output() editarEntrenadorView = new EventEmitter<Entrandor>();
  public showViewEntrenador: Boolean | undefined = false;
  public dataSingle: Entrandor | undefined;
  private dataEntrenador: Entrandor | undefined;
  public imageUrl: string = '';
  constructor(private imagenFuntionsService$: Imgs) {}

  closeCard(): void {
    this.imageUrl = '';
    this.showViewEntrenador = false;
  }

  editarEntrenador(): void {
    this.editarEntrenadorView.emit(this.dataEntrenador);
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg) {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, false, (imageUrl) => {
        this.imageUrl = imageUrl;
      });
    }
  }
}
