import { Component, output } from '@angular/core';
import { Router } from '@angular/router';  // 👈 importa Router
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss'], // 👈 corregido (urls en plural)
})
export class Nav {
  // Output como Signal-Emitter
  readonly menuToggle = output<void>();

  constructor(private router: Router) {} // 👈 inyectamos Router

  toggleMenu() {
    this.menuToggle.emit();
  }

  avatar = 'assets/avatar.jpg'; // demo
  username = 'Sebuncho';        // demo

  logout() {
    // Aquí limpias la sesión/token
    localStorage.removeItem('token');
    sessionStorage.clear();

    // Redirigir al login
    this.router.navigate(['/login']); // 👈 ahora funciona
  }

  goToProfile() {
    this.router.navigate(['/perfil']);
  }
}
