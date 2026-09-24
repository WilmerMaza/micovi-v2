export const columnsValue = [
  {
    displayname: 'No. identificación',
    name: 'identification',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Tipo',
    name: 'typeIdentification',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Nombre completo',
    name: 'name',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Genero',
    name: 'gender',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Peso',
    name: 'weight',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Categoria',
    name: 'category',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'acción',
    estado: true,
    type: 'action',
    menu: [
      { action: 'verDeportista', text: 'Ver detalle' },
      {
        action: 'verEjercicios',
        text: 'Ejercicios asociados',
        enableWhen: 'HasIndicators',
      },
      { action: 'Editar', text: 'Editar', dividerBefore: true },
    ],
  },
];

/**
 * Nota de navegación (deportistas):
 * - Menú plano (schema): Ver detalle / Ejercicios asociados · Editar.
 * - enableWhen en el schema; la tabla no conoce HasIndicators por nombre de action.
 * - «Editar» → `/deportistas/:id/editar`. Alta → `/deportistas/crear`.
 */