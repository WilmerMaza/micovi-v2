import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Sidenav } from './components/sidenav/sidenav';
import { Nav } from './components/nav/nav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterOutlet,
    Nav,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    Sidenav,
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {
  readonly collapsed = signal(false);
  toggle = () => this.collapsed.update((v) => !v);
}
