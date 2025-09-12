import { Component, output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Menu } from '../menu/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, Menu],
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss'],
})
export class Nav {
  public readonly menuToggle = output<void>();
  public readonly username = 'Sebuncho';

  constructor(private router: Router) { }

  public toggleMenu(): void {
    this.menuToggle.emit();
  }



  public goToHome(): void {
    this.router.navigate(['/home']); // 👈 aquí redirige al Home
  }


}
