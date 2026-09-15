/**
 * Control del overlay global de carga (`app-spinner`).
 *
 * Contador de peticiones concurrentes con delay de show (~300 ms) para evitar
 * parpadeo en operaciones rápidas, y mínimo visible corto (~350 ms) cuando
 * el overlay sí aparece.
 *
 * Solo timing; la presentación vive en `Spinner`.
 */
import { computed, Injectable, signal } from '@angular/core';

const SHOW_DELAY_MS = 300;
const MIN_VISIBLE_MS = 350;

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private readonly _loading = signal(false);
  readonly isLoading = computed(() => this._loading());

  private activeRefs = 0;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private visibleSince = 0;

  public show(): void {
    this.activeRefs++;

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }

    if (this.activeRefs === 1 && !this._loading()) {
      this.scheduleShow();
    }
  }

  public hide(): void {
    if (this.activeRefs <= 0) {
      return;
    }

    this.activeRefs--;

    if (this.activeRefs > 0) {
      return;
    }

    this.cancelPendingShow();

    if (!this._loading()) {
      return;
    }

    const elapsed = Date.now() - this.visibleSince;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

    this.hideTimer = setTimeout(() => {
      this.hideTimer = null;
      if (this.activeRefs === 0) {
        this._loading.set(false);
      }
    }, wait);
  }

  private scheduleShow(): void {
    this.cancelPendingShow();
    this.showTimer = setTimeout(() => {
      this.showTimer = null;
      if (this.activeRefs > 0) {
        this.visibleSince = Date.now();
        this._loading.set(true);
      }
    }, SHOW_DELAY_MS);
  }

  private cancelPendingShow(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
  }
}
