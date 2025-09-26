import { Component, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { LogoutModal } from '../../../shared/components/logout-modal/logout-modal';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    LogoutModal,
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  user = {
    name: 'Wilmer Maza',
    avatar: 'images/default.png', // pon tu imagen
  };
  readonly showLogoutModal: WritableSignal<boolean> = signal(false);
  constructor(private router: Router, private authService: AuthService) {}

  public logout(): void {
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }

  public showLogoutConfirmation(): void {
    this.showLogoutModal.set(true);
  }

  public confirmLogout(): void {
    this.showLogoutModal.set(false);
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }

  public cancelLogout(): void {
    this.showLogoutModal.set(false);
  }
}
