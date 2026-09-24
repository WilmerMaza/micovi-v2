/**
 * Rail lateral del shell de producto Micovi.
 *
 * Renderiza grupos de NavigationService (operación / biblioteca / configuración).
 * Solo presentación: acordeón de un nivel, tooltips en collapsed.
 * Sin lógica de permisos ni de negocio; cierra el drawer móvil al navegar.
 *
 * Usado por layout/home.
 */
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../core/services/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  displayNameFromEmail,
  roleLabel,
} from '../../../../core/auth/user-role';
import { NavigationItem } from '../../../../core/navigation/navigation.types';
import { NavigationService } from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  standalone: true,
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  private readonly authService = inject(AuthService);
  private readonly navigationService = inject(NavigationService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly collapsed = input.required<boolean>();
  readonly showText: WritableSignal<boolean> = signal(true);
  readonly closeSidebar = output<void>();

  readonly navPending = computed(() => !this.authService.isInitialized());
  readonly navPlaceholderSlots = [0, 1, 2, 3, 4];
  readonly groups = this.navigationService.navigationGroups;
  readonly currentUrl = signal(this.router.url);
  readonly expandedIds = signal<ReadonlySet<string>>(new Set());

  private textTimeout?: number;
  avatar: string = '/img/avatars/1.jpg';

  private readonly authUser = this.authService.userSignal();
  readonly displayName = computed(() =>
    displayNameFromEmail(this.authUser()?.email),
  );
  readonly roleName = computed(() => roleLabel(this.authUser()?.role));

  constructor() {
    this.syncExpanded(this.router.url);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => this.syncExpanded(event.urlAfterRedirects));

    effect(() => {
      const isCollapsed = this.collapsed();

      if (isCollapsed) {
        this.showText.set(false);
        if (this.textTimeout) clearTimeout(this.textTimeout);
      } else {
        if (this.textTimeout) clearTimeout(this.textTimeout);
        this.textTimeout = window.setTimeout(() => {
          this.showText.set(true);
        }, 120);
      }
    });
  }

  isActive(item: NavigationItem): boolean {
    return this.navigationService.isItemActive(item, this.currentUrl());
  }

  isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  toggleExpand(event: Event, id: string): void {
    event.stopPropagation();
    this.expandedIds.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  navigateTo(url: string): void {
    void this.router.navigateByUrl(url);
    this.closeSidebar.emit();
  }

  private syncExpanded(url: string): void {
    this.currentUrl.set(url);
    const ids = new Set<string>();
    for (const group of this.navigationService.navigationGroups()) {
      for (const item of group.items) {
        if (
          item.children?.length &&
          this.navigationService.isItemActive(item, url)
        ) {
          ids.add(item.id);
        }
      }
    }
    this.expandedIds.set(ids);
    this.scrollActiveIntoView();
  }

  private scrollActiveIntoView(): void {
    requestAnimationFrame(() => {
      const active = document.querySelector(
        '.navigation-section .nav-button.active',
      ) as HTMLElement | null;
      active?.scrollIntoView({
        block: 'nearest',
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      });
    });
  }
}
