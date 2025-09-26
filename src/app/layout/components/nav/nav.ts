import {
  Component,
  input,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-nav',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, Menu],
  standalone: true,
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss'],
})
export class Nav {
  readonly collapsed = input<boolean>(false);
  readonly menuToggle = output<void>();

  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}
