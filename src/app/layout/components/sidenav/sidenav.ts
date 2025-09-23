import { Component, effect, input, signal, output, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';
import { NavigationService, INavData } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,

  ],
  standalone: true,
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  /** Señal de entrada – collapsed viene del padre */
  readonly collapsed = input.required<boolean>();

  /** Señal para controlar cuándo mostrar el texto */
  readonly showText = signal(true);

  /** Output para cerrar el sidebar desde el componente padre */
  readonly closeSidebar = output<void>();

  private textTimeout?: number;

  avatar = '/img/avatars/1.jpg'; 
  username = 'Real';

  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {
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

  // Getter que retorna los items de navegación basados en el rol del usuario
  get Menu(): INavData[] {
    return this.navigationService.navigationItems();
  }

  // Método para verificar si una ruta está activa
  isActive(url: string): boolean {
    return this.navigationService.isRouteActive(url, this.router.url);
  }

  // Método para navegar a una ruta
  navigateTo(url: string): void {
    this.router.navigate([url]);
    this.closeSidebar.emit();
  }
}
