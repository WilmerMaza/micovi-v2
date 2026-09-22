/**
 * Barra superior del shell Micovi (toggle + contexto de página + perfil).
 *
 * Título y chip de ciclo vienen de BreadcrumbService y TrainingContextService.
 * Sin acciones de negocio: el alta y el resto de CTAs viven en cada feature.
 *
 * No altera auth, Session ni el comportamiento collapsed/mobile del layout.
 */
import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbService } from '../../core/breadcrumbs/breadcrumb.service';
import { TrainingContextService } from '../../core/context/training-context.service';
import { ProfileMenu } from '../widgets/profile-menu/profile-menu';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ProfileMenu,
    CommonModule,
  ],
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss'],
})
export class Nav {
  public readonly mostrarToggleMenu = input<boolean>(true);
  readonly collapsed = input<boolean>(false);
  readonly menuToggle = output<void>();

  private readonly breadcrumbs = inject(BreadcrumbService);
  private readonly trainingContext = inject(TrainingContextService);

  readonly pageTitle = this.breadcrumbs.pageTitle;
  readonly cycleChip = this.trainingContext.chipLabel;

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}
