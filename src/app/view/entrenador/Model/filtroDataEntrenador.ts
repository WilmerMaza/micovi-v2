import { JsonDataItem } from '../../../shared/model/filterModel';
import { gender, typeIdentification } from './constantesEntrenador';

export const filterEntrenadorValue: JsonDataItem[] = [
  {
    title: 'No. identificación',
    property: 'identificacion',
    disable: false,
    isOpen: false,
    typeFilter: 'input',
    control: [{ name: 'identificacion', value: '', code: '', checked: false }],
  },
  {
    title: 'Genero',
    property: 'gender',
    disable: false,
    isOpen: false,
    typeFilter: 'check',
    control: gender.map((g) => ({ name: g.value, value: g.code, code: g.code, checked: false })),
  },
  {
    title: 'Tipo de identificación',
    property: 'typeIdentification',
    disable: false,
    isOpen: false,
    typeFilter: 'check',
    control: typeIdentification.map((t) => ({ name: t.value.trim(), value: t.code, code: t.code, checked: false })),
  },
];
