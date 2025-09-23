import { Component } from '@angular/core';
import { Home } from '../../features/settings/pages/home/home';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Home],
  template: `<app-home></app-home>`,
  styleUrl: './layout.scss',
})
export class Layout {}
