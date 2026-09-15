/**
 * Barra superior del shell Micovi (toggle + contexto de página + perfil).
 *
 * Expone título corto según la URL actual para anclar la jerarquía mental.
 * No altera auth, Session ni el comportamiento collapsed/mobile del layout.
 *
 * pageTitle es solo presentación (markup/aria); las rutas siguen en Router.
 */
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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
export class Nav implements OnInit {
  public readonly mostrarToggleMenu = input<boolean>(true);
  readonly collapsed = input<boolean>(false);
  readonly menuToggle = output<void>();

  readonly pageTitle = signal('Inicio');

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.updateTitle(this.router.url);
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((e) => this.updateTitle(e.urlAfterRedirects));
  }

  toggleMenu(): void {
    this.menuToggle.emit();
  }

  private updateTitle(url: string): void {
    const path = url.split('?')[0];
    if (path.includes('/sportsman')) {
      this.pageTitle.set('Deportistas');
      return;
    }
    if (path.includes('/plan-anual')) {
      this.pageTitle.set('Plan anual');
      return;
    }
    if (path.includes('/Ejercicios') || path.includes('/ejercicios')) {
      this.pageTitle.set('Ejercicios');
      return;
    }
    if (path.includes('/Entrenador') || path.includes('/entrenador')) {
      this.pageTitle.set('Entrenador');
      return;
    }
    if (path.includes('/Complementos') || path.includes('/complementos')) {
      this.pageTitle.set('Complementos');
      return;
    }
    if (path.includes('/configuration') || path.includes('/configuración')) {
      this.pageTitle.set('Configuración');
      return;
    }
    this.pageTitle.set('Inicio');
  }
}
