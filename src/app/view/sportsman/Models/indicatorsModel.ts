import { Ejercicio } from "../../Ejercicios/Model/ejercicioModel";


export interface Level {
  ID: string;
  LevelNumber: string;
  LevelName: string;
  Description: string;
  createdAt: string;
  updatedAt: string;
  IndicadoreID: string;
}

export interface EjercicioIndicadores {
  ID: string;
  Name: string;
  Abbreviation: string;
  Relationship: string;
  SubGrupoID: string;
  SubGrupo: SubGrupo;
  SubGrupoAbbreviation: string;
  GrupoAbbreviation: string;
  Indicadores: Item[];
  HasIndicators: boolean;
}
export interface SubGrupo {
  abreviatura: string;
  GrupoID: string;
  Grupo: Grupo;
}

export interface Grupo {
  Abbreviation: string;
}
export interface SportsMan {
  ID: string;
  name: string;
  identification: string;
  typeIdentification: string;
  weight: string;
  category: string;
  gender: string;
  nationality: string;
  birtDate: string;
  city: string;
  department: string;
  height: string;
  studyLevelMax: string;
  institutionNameStudy: string;
  sportInstition: string;
  athleticDiscipline: string;
  email: string;
  phone: string;
  image: string;
  HasIndicators: boolean;
  createdAt: string;
  updatedAt: string;
  SportsInstitutionID: string;
  Ejercicios?: Ejercicio[];
  DiciplinaID?: string;
  age?: string;
}

export interface Item {
  ID: string;
  IndicatorsName: string;
  Abbreviation: string;
  Description: string;
  AbsolutePercentage: string;
  CalificationLevel: number;
  createdAt: string;
  updatedAt: string;
  EjercicioID: string;
  SportsManID: string;
  Ejercicio: Ejercicio;
  Levels: Level[];
  SportsMan: SportsMan;
}

export interface DataIndicators {
  item: Item[];
}

export const columnsIndValue = [
  {
    displayname: 'Nombre',
    name: 'Name',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Abreviatura',
    name: 'Abbreviation',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Grupo',
    name: 'GrupoAbbreviation',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Subgrupo',
    name: 'SubGrupoAbbreviation',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Tipo relación',
    name: 'Relationship',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'acción',
    estado: true,
    type: 'action',
    menu: [{
      action: 'Menu',
      text: 'Ver',
      menu: [
        { action: 'ver indicador', text: 'Indicadores' },
        { action: 'ver rubrica', text: 'Rubrica' },
      ]
    }]
  },
];

export interface responseAssing {
  item: ItemAssing;
}

export interface ItemAssing {
  ID: string;
  name: string;
  identification: string;
  typeIdentification: string;
  weight: string;
  category: string;
  gender: string;
  nationality: string;
  birtDate: string;
  city: string;
  department: string;
  height: string;
  studyLevelMax: string;
  institutionNameStudy: string;
  email: string;
  phone: string;
  image: string;
  age: string;
  HasIndicators: boolean;
  createdAt: string;
  updatedAt: string;
  SportsInstitutionID: string;
  DiciplinaID: string;
  Ejercicios: EjercicioIndicadores[];
}
