import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  input,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,

    RouterLink,
    RouterLinkActive,
  ],
  standalone: true,
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  /** Señal de entrada – collapsed viene del padre */
  readonly collapsed = input.required<boolean>();

  constructor() {
    effect(() => {
      console.log('changed: ', this.collapsed());
    });
  }

  avatar = 'assets/avatar.jpg'; // demo
  username = 'Zoab Khan'; // demo

  Menu = [
    {
      icon: 'home',
      label: 'Inicio',
      route: '/home',
      subItem: [
        {
          icon: 'home',
          label: 'home',
          route: 'home',
        },
      ],
    },
  ];
}
