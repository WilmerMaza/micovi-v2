/**
 * Datos de prueba para listado de deportistas (UI / paginación).
 *
 * Activar/desactivar con USE_MOCK_SPORTSMAN en sportsman.component.ts.
 * Cuando USE_MOCK_SPORTSMAN = false, se vuelve a usar SportsmanService (back).
 */
import { Sportsman } from '../../../view/models/DataSportsman';

/** Copiar filas base para generar volumen suficiente para paginar (5/10/25). */
const BASE_MOCK: Omit<Sportsman, 'ID' | 'identification' | 'name'>[] = [
  {
    typeIdentification: 'cc',
    nationality: 'Colombiana',
    city: 'Bogotá',
    department: 'Cundinamarca',
    birtDate: '2005-03-12',
    studyLevelMax: 'bachiller',
    institutionNameStudy: 'Colegio Andino',
    sportInstition: 'Micovi Club',
    email: 'ana.rojas@ejemplo.com',
    phone: '3001112233',
    image: 'Default.png',
    category: 'Juvenil',
    gender: 'F',
    weight: '58.5',
    height: '165',
    HasIndicators: true,
  },
  {
    typeIdentification: 'ti',
    nationality: 'Colombiana',
    city: 'Medellín',
    department: 'Antioquia',
    birtDate: '2008-07-21',
    studyLevelMax: 'bachiller',
    institutionNameStudy: 'INEM José Félix',
    sportInstition: 'Micovi Club',
    email: 'carlos.mejia@ejemplo.com',
    phone: '3012223344',
    image: 'Default.png',
    category: 'Infantil',
    gender: 'M',
    weight: '52.0',
    height: '158',
    HasIndicators: false,
  },
  {
    typeIdentification: 'cc',
    nationality: 'Colombiana',
    city: 'Cali',
    department: 'Valle',
    birtDate: '2003-11-05',
    studyLevelMax: 'tecnico',
    institutionNameStudy: 'SENA',
    sportInstition: 'Micovi Club',
    email: 'laura.gomez@ejemplo.com',
    phone: '3023334455',
    image: 'Default.png',
    category: 'Mayores',
    gender: 'F',
    weight: '62.3',
    height: '170',
    HasIndicators: true,
  },
  {
    typeIdentification: 'cc',
    nationality: 'Colombiana',
    city: 'Barranquilla',
    department: 'Atlántico',
    birtDate: '2004-01-18',
    studyLevelMax: 'bachiller',
    institutionNameStudy: 'Colegio del Norte',
    sportInstition: 'Micovi Club',
    email: 'diego.perez@ejemplo.com',
    phone: '3034445566',
    image: 'Default.png',
    category: 'Juvenil',
    gender: 'M',
    weight: '71.2',
    height: '178',
    HasIndicators: true,
  },
];

const FIRST_NAMES = [
  'Ana Rojas',
  'Carlos Mejía',
  'Laura Gómez',
  'Diego Pérez',
  'Sofía Vargas',
  'Andrés Castillo',
  'Valentina Ruiz',
  'Julián Torres',
  'Camila Herrera',
  'Mateo Sánchez',
  'Isabella López',
  'Santiago Díaz',
  'Mariana Cruz',
  'Nicolás Romero',
  'Daniela Ortiz',
  'Sebastián Mora',
  'Paula Jiménez',
  'Felipe Navarro',
  'Lucía Ramírez',
  'Tomás Aguilar',
  'Elena Castro',
  'Gabriel Suárez',
  'Martina Peña',
  'Emilio Vargas',
  'Renata Silva',
  'Iván Cordero',
  'Alejandra Núñez',
  'Pablo Méndez',
];

/**
 * Genera ~28 deportistas de prueba alineados al schema de columnas
 * (identification, typeIdentification, name, gender, weight, category).
 */
export function buildMockSportsmen(): Sportsman[] {
  return FIRST_NAMES.map((name, index) => {
    const base = BASE_MOCK[index % BASE_MOCK.length];
    const idNum = 1000000000 + index * 137;
    return {
      ...base,
      ID: `mock-sportsman-${index + 1}`,
      identification: String(idNum),
      name,
      email: `deportista${index + 1}@ejemplo.com`,
      HasIndicators: index % 3 !== 0,
      weight: (48 + (index % 30) + (index % 10) * 0.1).toFixed(1),
      category: ['Pony', 'Amateur', 'Juvenil', 'Profesional'][index % 4],
      gender: index % 2 === 0 ? 'F' : 'M',
      typeIdentification: index % 5 === 0 ? 'ti' : 'cc',
    };
  });
}

/** Snapshot estático para reutilizar en filtros mock sin regenerar IDs. */
export const MOCK_SPORTSMEN: Sportsman[] = buildMockSportsmen();
