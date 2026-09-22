/**
 * Breadcrumbs derivados del árbol de rutas activas.
 *
 * Lee `data.breadcrumb` y, si existe, `data.breadcrumbParam` para el label
 * de entidades (`:id`). Las páginas no hardcodean la miga de pan.
 */
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { APP_ROUTES } from '../navigation/routes';
import { Breadcrumb } from './breadcrumb.types';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly crumbs = signal<Breadcrumb[]>([]);
  readonly pageTitle = computed(
    () => this.crumbs().at(-1)?.label ?? 'Inicio',
  );
  readonly visible = computed(() => this.crumbs().length > 1);

  constructor() {
    this.refresh();
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.refresh());
  }

  private refresh(): void {
    const crumbs: Breadcrumb[] = [];
    let url = '';
    let current: ActivatedRouteSnapshot | null =
      this.router.routerState.snapshot.root;

    while (current) {
      const segment = current.url.map((part) => part.path).join('/');
      if (segment) {
        url += `/${segment}`;
      }

      const label = this.resolveLabel(current);
      const skip = current.routeConfig?.data?.['breadcrumbSkip'] === true;
      if (label && !skip) {
        const href = url || APP_ROUTES.inicio;
        const last = crumbs.at(-1);
        if (!last || last.url !== href || last.label !== label) {
          crumbs.push({ label, url: href });
        }
      }

      current = current.firstChild;
    }

    const path = this.router.url.split('?')[0];
    if (path === '/' || path === APP_ROUTES.inicio) {
      this.crumbs.set([{ label: 'Inicio', url: APP_ROUTES.inicio }]);
      return;
    }

    if (!crumbs.length || crumbs[0].url !== APP_ROUTES.inicio) {
      crumbs.unshift({ label: 'Inicio', url: APP_ROUTES.inicio });
    }

    this.crumbs.set(crumbs);
  }

  private resolveLabel(snapshot: ActivatedRouteSnapshot): string | null {
    const own = snapshot.routeConfig?.data ?? {};
    const breadcrumb = (own['breadcrumb'] ?? snapshot.data['breadcrumb']) as
      | string
      | undefined;
    if (!breadcrumb) {
      return null;
    }
    const paramKey = own['breadcrumbParam'] as string | undefined;
    if (paramKey) {
      const value = snapshot.paramMap.get(paramKey);
      if (value) {
        return `${breadcrumb} ${value}`;
      }
    }
    return breadcrumb;
  }
}
