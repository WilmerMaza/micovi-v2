export const columnsEjerciciosValue = [
    {
      displayname: 'Nombre',
      name:'Name',
      estado: true,
      type: "text"
    },
    {
      displayname: 'Abreviatura',
      name:'Abbreviation',
      estado: true,
      type: "text"
    },
    {
        displayname: 'Grupo',
        name:'GrupoAbbreviation',
        estado: true,
        type: "text"
    },
    {
      displayname: 'Subgrupo',
      name:'SubGrupoAbbreviation',
      estado: true,
      type: "text"
    },
    {
        displayname: 'Tipo relación',
        name:'Relationship',
        estado: true,
        type: "text"
    },
    {
      displayname: 'noName',
      estado: true,
      type: 'button',
      action: 'ver ejercicio',
      label: 'Ver',
      variant: 'outline' as const,
    },
];
