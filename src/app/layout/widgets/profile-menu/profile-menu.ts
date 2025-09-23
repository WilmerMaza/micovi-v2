import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [MatMenuModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './profile-menu.html',
  styleUrl: './profile-menu.scss',
})
export class ProfileMenu {
  user = {
    name: 'Wilmer Maza',
    avatar: 'images/default.png', // pon tu imagen
  };

  constructor(private router: Router, private authService: AuthService) {}

  public logout(): void {
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }

  public configuracion(): void {
    this.router.navigate(['configuration']);
  }
}
