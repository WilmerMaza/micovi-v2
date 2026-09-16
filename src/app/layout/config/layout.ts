/**
 * Shell de la zona de configuración Micovi.
 *
 * Cabecera y outlet visibles de inmediato; JwtGuard protege solo las rutas hijas.
 * Placeholder contextual (drawer + contenido) con delay 300 ms, alineado al shell home.
 */
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../core/services/auth';

const PLACEHOLDER_SHOW_DELAY_MS = 300;

@Component({
  selector: 'app-config-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnDestroy {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly routeNavigating = signal(false);
  private placeholderShowTimer: ReturnType<typeof setTimeout> | null = null;

  readonly outletPendingRaw = computed(
    () => this.auth.bootstrapping() || this.routeNavigating(),
  );

  readonly showOutletPlaceholder = signal(false);

  constructor() {
    effect(() => {
      if (this.outletPendingRaw()) {
        this.schedulePlaceholderShow();
      } else {
        this.cancelPlaceholderShow();
        this.showOutletPlaceholder.set(false);
      }
    });

    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ev) => {
        if (ev instanceof NavigationStart) {
          this.routeNavigating.set(true);
        }
        if (
          ev instanceof NavigationEnd ||
          ev instanceof NavigationCancel ||
          ev instanceof NavigationError
        ) {
          this.routeNavigating.set(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.cancelPlaceholderShow();
  }

  private schedulePlaceholderShow(): void {
    if (this.placeholderShowTimer || this.showOutletPlaceholder()) {
      return;
    }
    this.placeholderShowTimer = setTimeout(() => {
      this.placeholderShowTimer = null;
      if (this.outletPendingRaw()) {
        this.showOutletPlaceholder.set(true);
      }
    }, PLACEHOLDER_SHOW_DELAY_MS);
  }

  private cancelPlaceholderShow(): void {
    if (this.placeholderShowTimer) {
      clearTimeout(this.placeholderShowTimer);
      this.placeholderShowTimer = null;
    }
  }
}
