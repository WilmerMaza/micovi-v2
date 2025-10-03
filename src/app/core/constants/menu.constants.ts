import { INavData } from '../../layout/interfaces/nav-data.interface';

export const MENU: Record<string, INavData[]> = {
  entrenador: [
    {
      name: 'Deportista',
      url: '/sportsman',
      iconComponent: { name: 'directions_run' },
    },
    {
      name: 'Entrenador',
      url: '/entrenador',
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