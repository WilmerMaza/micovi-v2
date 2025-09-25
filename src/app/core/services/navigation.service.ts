import { Injectable, computed } from '@angular/core';
import { AuthService } from './auth';
import { INavData } from '../../layout/interfaces/nav-data.interface';

export const MENU = {
  entrenador: [
    {
      name: 'Deportista',
      url: '/sportsman',
      iconComponent: { name: 'directions_run' },
    },
    {
      name: 'Entrenador',
      url: '/Entrenador',
      iconComponent: { name: 'how_to_reg' },
    },
    {
      name: 'Complementos',
      url: '/Complementos',
      iconComponent: { name: 'widgets' },
    },
  ],

  instucion: [
    {
      name: 'Deportista',
      url: '/sportsman',
      iconComponent: { name: 'directions_run' },
    },
    {
      name: 'Plan Anual',
      url: '/plan-anual',
      iconComponent: { name: 'calendar_month' },
    },
    {
      name: 'Ejercicios',
      url: '/Ejercicios',
      iconComponent: { name: 'fitness_center' },
    },
    {
      name: 'Complementos',
      url: '/Complementos',
      iconComponent: { name: 'widgets' },
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly ItemsInstitution: INavData[] = MENU['instucion'];
  private readonly ItemsCoach: INavData[] = MENU['entrenador'];

  constructor(private authService: AuthService) {}

  readonly navigationItems = computed<INavData[]>(() => {
    const user = this.authService.dataUser();

    if (!user) {
      return [];
    }

    if (user.account === 'Admin') {
      return this.ItemsInstitution;
    }

    return this.ItemsCoach;
  });

  isRouteActive(url: string, currentUrl: string): boolean {
    return currentUrl.includes(url);
  }
}

export type { INavData };
 