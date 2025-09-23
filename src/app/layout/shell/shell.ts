import { Component, Signal, signal, WritableSignal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Nav } from '../nav/nav';
import { Spinner } from '../../shared/components/spinner/spinner';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { filter } from 'rxjs';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [Nav, Spinner, CommonModule, RouterOutlet, MatSidenavModule],
  template: `
    <!-- App bar (siempre la misma) -->
    <app-nav
      [mostrarToggleMenu]="showMenuToggle()"
      (menuToggle)="toggle()"
    ></app-nav>

    <router-outlet></router-outlet>
    <!-- Spinner global (una sola vez) -->
    <app-spinner></app-spinner>
  `,
  styleUrl: './shell.scss',
})
export class Shell {
  public readonly collapsed: WritableSignal<boolean> = signal(false);
  public readonly showMenuToggle: WritableSignal<boolean> = signal(true);

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe(() => {
        const leaf = this.getLeaf(this.activeRoute);
        const data = leaf.snapshot.data;
        this.showMenuToggle.set(data['showMenuToggle'] ?? true);
      });
  }

  private getLeaf(r: ActivatedRoute): ActivatedRoute {
    let current = r;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }

  public toggle = (): void => this.collapsed.update((v) => !v);
}
