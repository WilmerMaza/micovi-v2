import { Component, output } from '@angular/core';
import { Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Menu } from '../menu/menu';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, Menu,CommonModule],
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss'],
})
export class Nav {
  @Input() mostrarToggleMenu: boolean = true; // true por defecto
  public readonly menuToggle = output<void>();
  public readonly username = 'usuario';

  constructor(private router: Router) { }

  public toggleMenu(): void {
    this.menuToggle.emit();
  }
  public goToHome(): void{
    this.router.navigate(['/home']); // 👈 aquí redirige al Home
  }


}
