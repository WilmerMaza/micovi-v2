import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Sidenav } from './components/sidenav/sidenav';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    Sidenav,
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav-content class="main-content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
      <mat-sidenav
        class="app-sidenav"
        fixedInViewport="true"
        [fixedTopGap]="56"
        mode="side"
        [opened]="!collapsed()"
        [class.collapsed]="collapsed()"
      >
        <app-sidenav [collapsed]="collapsed()"></app-sidenav>
      </mat-sidenav>
    </mat-sidenav-container>
  `,
  styleUrls: ['./layout.scss'],
})
export class Layout {
  readonly collapsed = signal(false);
}
