import { Component, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { LogoutModal } from '../../../shared/components/logout-modal/logout-modal';

@Component({
  selector: 'app-nav',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, LogoutModal],
  standalone: true,
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  // 1️⃣  Input para recibir el estado collapsed
  readonly collapsed = input<boolean>(false);
  
  // 2️⃣  Output como Signal-Emitter
  readonly menuToggle = output<void>();
  
  // Signal para controlar la visibilidad del modal
  readonly showLogoutModal = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  // 2️⃣  Emitimos correctamente:
  toggleMenu() {
    this.menuToggle.emit(); // ← ya no da el error TS
  }

  // 3️⃣  Mostrar modal de confirmación
  showLogoutConfirmation() {
    this.showLogoutModal.set(true);
  }

  // Confirmar logout
  confirmLogout() {
    this.showLogoutModal.set(false);
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }

  // Cancelar logout
  cancelLogout() {
    this.showLogoutModal.set(false);
  }
}
