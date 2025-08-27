import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-nav',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  standalone: true,
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  // 1️⃣  Output como Signal-Emitter
  readonly menuToggle = output<void>();

  // 2️⃣  Emitimos correctamente:
  toggleMenu() {
    this.menuToggle.emit(); // ← ya no da el error TS
  }
}
