import { JsonDataItem } from '../../shared/model/filterModel';

/**
 * Schema de filtros del listado de deportistas.
 *
 * `checked` arranca en false: el valor (`code`/`value`) no implica selección.
 * Categoría se rellena en runtime desde `/Categoria/getAll`.
 */
export const jsonData: JsonDataItem[] = [
  {
    title: 'No. identificación',
    property: 'identificacion',
    disable: false,
    isOpen: false,
    typeFilter: 'input',
    control: [{ name: 'identificacion', value: '', code: '', checked: false }],
  },
  {
    title: 'Categoria',
    property: 'category',
    disable: false,
    isOpen: false,
    typeFilter: 'check',
    control: [
      { name: 'Pony', value: 'Pony', code: '', checked: false },
      { name: 'Amateur', value: 'Amateur', code: '', checked: false },
      { name: 'Juvenil', value: 'juvenil', code: '', checked: false },
      { name: 'Profesional', value: 'Profesional', code: '', checked: false },
    ],
  },
  {
    title: 'Genero',
    property: 'gender',
    disable: false,
    isOpen: false,
    typeFilter: 'check',
    control: [
      { name: 'Dama', value: 'F', code: 'F', checked: false },
      { name: 'Varón', value: 'M', code: 'M', checked: false },
    ],
  },
  {
    title: 'Tipo de identificación',
    property: 'typeIdentification',
    disable: false,
    isOpen: false,
    typeFilter: 'check',
    control: [
      {
        name: 'Tarjetas de identidad',
        value: 'TI',
        code: 'TI',
        checked: false,
      },
      {
        name: 'Cédula de ciudadanía',
        value: 'CC',
        code: 'CC',
        checked: false,
      },
      {
        name: 'Cédula de extranjería',
        value: 'CE',
        code: 'CE',
        checked: false,
      },
      { name: 'Pasaporte', value: 'PB', code: 'PB', checked: false },
    ],
  },
];

export interface SportsmanData {
  title: string;
  property: string;
  disable: boolean;
  isOpen: boolean;
  typeFilter: string;
  control: ControlItem[];
}

export interface ControlItem {
  name: string;
  value: string;
  code: string;
  checked?: boolean;
}
