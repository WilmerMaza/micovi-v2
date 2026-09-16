/**
 * Overlay global de carga de Micovi (`app-spinner`).
 *
 * Scrim + panel centrado con mark Micovi a color, barra indeterminada
 * (gradiente de marca) y label “Cargando…”, alineado al loading del register.
 *
 * Solo presentación: no gestiona show/hide ni el conteo de peticiones.
 * Visible vía `SpinnerService.isLoading`; lo activa el interceptor HTTP en GET
 * lentos sin feedback local (delay 300 ms antes de mostrar).
 */
import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    @if (loading()) {
      <div class="overlay">
        <div class="panel" role="status" aria-live="polite" aria-busy="true" aria-atomic="true">
          <img
            class="mark"
            src="/images/dashboard.webp"
            width="64"
            height="64"
            alt=""
            aria-hidden="true"
            decoding="async"
          />
          <div class="track" aria-hidden="true">
            <div class="fill"></div>
          </div>
          <span class="label">Cargando…</span>
        </div>
      </div>
    }
  `,
  styleUrl: './spinner.scss',
})
export class Spinner {
  private spinner = inject(SpinnerService);
  loading = this.spinner.isLoading;
}
