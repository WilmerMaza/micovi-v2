import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-nav',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  standalone: true,
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  // 1️⃣  Input para recibir el estado collapsed
  readonly collapsed = input<boolean>(false);
  
  // 2️⃣  Output como Signal-Emitter
  readonly menuToggle = output<void>();

  constructor(private authService: AuthService, private router: Router) {}

  // 2️⃣  Emitimos correctamente:
  toggleMenu() {
    this.menuToggle.emit(); // ← ya no da el error TS
  }

  // 3️⃣  Función de logout
  logout() {
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }
}
