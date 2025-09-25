import { Component, input, output, signal, WritableSignal } from '@angular/core';
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
  styleUrls: ['./nav.scss'],
})
export class Nav {
  readonly collapsed = input<boolean>(false);
  readonly menuToggle = output<void>();
  readonly showLogoutModal: WritableSignal<boolean> = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu(): void {
    this.menuToggle.emit();
  }

  showLogoutConfirmation(): void {
    this.showLogoutModal.set(true);
  }

  confirmLogout(): void {
    this.showLogoutModal.set(false);
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.showLogoutModal.set(false);
  }
}
 