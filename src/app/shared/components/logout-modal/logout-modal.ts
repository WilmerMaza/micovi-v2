/**
 * Diálogo de confirmación para cerrar sesión.
 *
 * Emite confirmLogout / cancelLogout al padre (ProfileMenu).
 * No llama a AuthService: el logout lo orquesta el contenedor.
 *
 * Solo presentación y accesibilidad del modal.
 */
import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './logout-modal.html',
  styleUrl: './logout-modal.scss',
})
export class LogoutModal {
  readonly confirmLogout = output<void>();
  readonly cancelLogout = output<void>();

  onConfirm(): void {
    this.confirmLogout.emit();
  }

  onCancel(): void {
    this.cancelLogout.emit();
  }
}
