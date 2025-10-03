import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trainer, viewModalTrainer } from '../../Models/trainerModel';

import { Imgs } from '../../../../core/services/imgs';
import { DateValidators, Validators } from '../../../../utils/Validators';
import { ImageLoader } from '../../../../utils/readerBlodImg';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-view-trainer',
  templateUrl: './view-trainer.component.html',
  styleUrls: ['./view-trainer.component.scss'],
  imports: [MatCard, MatIcon, MatCardContent],
  standalone: true,
})
export class ViewTrainerComponent {
  @Input('viewActive') set setView(value: viewModalTrainer) {
    const { data, isVisible } = value;
    this.imageUrl = '';
    this.showViewTrainer = isVisible;

    if (!Validators.isNullOrUndefined(data)) {
      this.dataTrainer = data;

      const { birtDate, stateordepartmen, city, nationality, image } = data;
      this.dataSingle = {
        ...data,
        birtDate: DateValidators.parseDate(birtDate),
        nationality: `${nationality}, ${city} (${stateordepartmen})`,
      };
      this.viewImage(image);
    }
  }

  @Output() editTrainerView = new EventEmitter<Trainer>();
  public showViewTrainer: Boolean | undefined = false;
  public dataSingle: Trainer | undefined;
  private dataTrainer: Trainer | undefined;
  public imageUrl: string = '';
  constructor(private imagenFuntionsService$: Imgs) {}

  closeCard(): void {
    this.imageUrl = '';
    this.showViewTrainer = false;
  }

  editTrainer(): void {
    this.editTrainerView.emit(this.dataTrainer);
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
