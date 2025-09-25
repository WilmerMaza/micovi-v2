import { Injectable, computed } from '@angular/core';
import { AuthService } from './auth';
import { INavData } from '../../layout/interfaces/nav-data.interface';
import { MENU } from '../constants/menu.constants';

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
 