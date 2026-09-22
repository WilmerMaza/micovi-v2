/**
 * Orquestador del menú principal.
 *
 * Filtra `NAVIGATION_CONFIG` con `PermissionService`. El sidenav no decide
 * roles: solo renderiza los grupos que este servicio expone.
 */
import { computed, inject, Injectable } from '@angular/core';
import { NAVIGATION_CONFIG } from '../navigation/navigation.config';
import {
  NAV_SECTION_LABELS,
  NavigationItem,
  NavSectionGroup,
} from '../navigation/navigation.types';
import { Permission } from '../permissions/permissions';
import { PermissionService } from '../permissions/permission.service';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly permissions = inject(PermissionService);

  readonly navigationItems = computed(() =>
    this.filterTree(NAVIGATION_CONFIG),
  );

  readonly navigationGroups = computed<NavSectionGroup[]>(() =>
    this.groupBySection(this.navigationItems()),
  );

  readonly canAccessSettings = computed(() =>
    this.permissions.can(Permission.NavConfiguracion),
  );

  isRouteActive(url: string, currentUrl: string): boolean {
    const current = currentUrl.split('?')[0];
    const target = url.split('?')[0];
    return current === target || current.startsWith(`${target}/`);
  }

  isItemActive(item: NavigationItem, currentUrl: string): boolean {
    if (this.isRouteActive(item.route, currentUrl)) {
      return true;
    }
    return (item.children ?? []).some((child) =>
      this.isItemActive(child, currentUrl),
    );
  }

  private filterTree(items: NavigationItem[]): NavigationItem[] {
    return items
      .filter((item) => {
        const visibility = item.visibility ?? 'nav';
        if (visibility !== 'nav') {
          return false;
        }
        return this.permissions.hasAny(item.permissions);
      })
      .map((item) => {
        const children = item.children
          ? this.filterTree(item.children)
          : undefined;
        return {
          ...item,
          children: children?.length ? children : undefined,
        };
      });
  }

  private groupBySection(items: NavigationItem[]): NavSectionGroup[] {
    const groups: NavSectionGroup[] = [];
    for (const item of items) {
      let group = groups.find((entry) => entry.section === item.section);
      if (!group) {
        group = {
          section: item.section,
          label: NAV_SECTION_LABELS[item.section],
          items: [],
        };
        groups.push(group);
      }
      group.items.push(item);
    }
    return groups;
  }
}
