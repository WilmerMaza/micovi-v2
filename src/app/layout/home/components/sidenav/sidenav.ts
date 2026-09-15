/**
 * Rail lateral del shell de producto Micovi.
 *
 * Renderiza marca, ítems de NavigationService e identidad de usuario.
 * Solo presentación: tooltips/aria en collapsed; no altera rutas, badges
 * ni la lógica collapsed/mobile del layout.
 *
 * Usado por layout/home; navega vía Router y cierra drawer móvil al clic.
 */
import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { AuthService } from '../../../../core/services/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Router } from '@angular/router';
import {
  INavData,
  NavigationService,
} from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  standalone: true,
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  private readonly authService = inject(AuthService);
  private readonly navigationService = inject(NavigationService);
  private readonly router = inject(Router);

  readonly collapsed = input.required<boolean>();
  readonly showText: WritableSignal<boolean> = signal(true);
  readonly closeSidebar = output<void>();

  readonly navPending = computed(() => !this.authService.isInitialized());
  readonly navPlaceholderSlots = [0, 1, 2];

  private textTimeout?: number;
  avatar: string = '/img/avatars/1.jpg';
  username: string = 'Real';

  constructor() {
    effect(() => {
      const isCollapsed = this.collapsed();

      if (isCollapsed) {
        this.showText.set(false);
        if (this.textTimeout) clearTimeout(this.textTimeout);
      } else {
        if (this.textTimeout) clearTimeout(this.textTimeout);
        this.textTimeout = window.setTimeout(() => {
          this.showText.set(true);
        }, 120);
      }
    });
  }

  get Menu(): INavData[] {
    return this.navigationService.navigationItems();
  }

  isActive(url: string): boolean {
    return this.navigationService.isRouteActive(url, this.router.url);
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
    this.closeSidebar.emit();
  }
}
