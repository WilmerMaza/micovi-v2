import { Component, effect, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
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
      // console.log('changed: ', this.collapsed());
    });
  }

  avatar = '/img/avatars/1.jpg'; // demo
  username = 'Real'; // demo

  Menu: any[] = [];
}
