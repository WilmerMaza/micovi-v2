import { Component, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { LogoutModal } from '../../../shared/components/logout-modal/logout-modal';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [MatMenuModule, LogoutModal, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './profile-menu.html',
  styleUrl: './profile-menu.scss',
})
export class ProfileMenu {
  user = {
    name: 'Wilmer Maza',
    avatar: 'images/default.png', // pon tu imagen
  };
  readonly showLogoutModal: WritableSignal<boolean> = signal(false);
  constructor(private router: Router, private authService: AuthService) { }

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

  public configuracion(): void {
    this.router.navigate(['configuration']);
  }
}
