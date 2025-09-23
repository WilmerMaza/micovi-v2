import { Injectable, computed } from '@angular/core';
import { AuthService } from './auth';

export interface INavData {
  name: string;
  url: string;
  iconComponent: { name: string };
  badge?: {
    color: string;
    text: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  
  // Items para usuarios tipo "Admin" (Institución)
  private readonly ItemsInstitution: INavData[] = [
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
  ];

  // Items para usuarios tipo "Coach" (Deportista/Entrenador)
  private readonly ItemsCoach: INavData[] = [
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
  ];

  constructor(private authService: AuthService) {}

  // Computed que retorna los items de navegación según el rol del usuario
  readonly navigationItems = computed<INavData[]>(() => {
    const user = this.authService.dataUser();
    
    if (!user) {
      return [];
    }

    // Si el usuario es "Admin" (Institución), mostrar items de institución
    if (user.account === 'Admin') {
      return this.ItemsInstitution;
    }
    
    // Para cualquier otro tipo (Coach, deportista, etc.), mostrar items de coach
    return this.ItemsCoach;
  });

  // Método para verificar si una ruta está activa
  isRouteActive(url: string, currentUrl: string): boolean {
    return currentUrl.includes(url);
  }
}