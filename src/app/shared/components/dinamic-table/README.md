# `app-dinamic-table` — Documentación de uso

Tabla dinámica compartida de Micovi. Es el listado reutilizable para deportistas, entrenadores, ejercicios, complementos, indicadores, rúbricas, etc.

**Selector:** `app-dinamic-table`  
**Archivo:** `src/app/shared/components/dinamic-table/`  
**Standalone:** sí (importar `DinamicTableComponent` en el componente padre)  
**Diseño visual:** [`design-system/micovi/pages/dinamic-table.md`](../../../../../design-system/micovi/pages/dinamic-table.md)

---

## 1. Qué hace (resumen)

| Capacidad | Descripción |
|-----------|-------------|
| Columnas por config | El padre pasa un array de columnas; la tabla no conoce el dominio |
| Celdas tipadas | `text`, `date`, `button` (+ legado `button Ver` / `buttons` / …), `check`, `acción` |
| Menú de fila | `⋯` panel plano; `enableWhen` / `dividerBefore` desde el schema |
| Edición simple | Con `editComplement=true` muestra icono `edit` en lugar del menú |
| Selección múltiple | Checkbox por fila + “seleccionar todas” (`isCheckBox`) |
| Paginación | `mat-paginator` opcional (`isPaginador`, default `true`) |
| Empty state | Cuerpo flexible (viewport / fill del módulo) + mensaje centrado |
| Eventos | Todo sale por `actionEvent` → `{ action, data }` |
| Puente con filtro | Via `DinamicService` (acciones bulk del filter → filas seleccionadas) |

**No hace:** filtrar datos, llamar APIs, ni decidir navegación. Eso lo resuelve el padre en `getActionEvent(...)`.

---

## 2. API del componente

### Inputs

| Input | Tipo | Default | Rol |
|-------|------|---------|-----|
| `columns` | `DinamicColumn[]` | — | Schema de columnas (ver §3 y `dinamic-table.model.ts`) |
| `dataSource` | `any[]` | `[]` | Filas. Cada objeto debe tener las keys que referencian `column.name` |
| `isCheckBox` | `boolean` | `false` | Columna `select` al inicio (checkbox masivo + por fila) |
| `isPaginador` | `boolean` | `true` | Muestra `mat-paginator` (5 / 10 / 25) |
| `editComplement` | `boolean` | `false` | Si `true` y hay columna `acción`, muestra botón editar en vez del menú `⋯` |

### Output

| Output | Payload | Cuándo |
|--------|---------|--------|
| `actionEvent` | `ActionResponse` `{ action: any; data: any }` | Clic en menú, botón de celda, checkbox, o acción especial del filter |

`ActionResponse` vive en `src/app/shared/model/Response/DefaultResponse.ts`.

### Forma típica de `action` en el payload

Depende del origen:

| Origen | `action` | `data` |
|--------|----------|--------|
| Ítem de menú | Objeto `{ action, text, enableWhen? }` | Fila completa |
| `editComplement` | String `'edit'` | Fila |
| Botón en celda | String `column.action` (schema) | Fila |
| Botón X (`buttonX`) | String `column.action` o `'eliminar'` | Fila |
| Checkbox | `{ action: 'Select' }` | Array de filas seleccionadas |
| Acción especial vía filter (`DinamicService`) | String del evento (ej. `'combinate'`, `'add ejercicio'`) | Array de filas seleccionadas |

> **Quirk importante:** en menús, `action` llega como **objeto**. En botones de celda, suele llegar como **string**. Los padres suelen hacer:
> ```ts
> const { action: { action }, data } = event; // menú
> // o
> const action2 = event.action; // string directo
> switch (action || action2) { ... }
> ```

---

## 3. Schema de columnas

Tipos en `dinamic-table.model.ts`. La tabla **no** interpreta nombres de action de dominio.

```ts
{
  displayname: string;  // Título del header Y matColumnDef (único)
  name?: string;        // Key en la fila: element[name]
  estado: boolean;      // false = no se muestra
  type: string;         // text | date | button | buttonX | check | action | …
  attr?: string;        // date pipe si type === 'date'
  module?: string;      // 'complements' → oculta el texto del header
  menu?: DinamicMenuItem[];
  // Columnas botón:
  action?: string;
  label?: string;
  variant?: 'outline' | 'link' | 'icon-close';
  enableWhen?: string;  // key en la fila; disabled si !row[key]
}
```

### Menú (`menu`)

```ts
type DinamicMenuItem = {
  action: string;
  text: string;
  enableWhen?: string;   // ej. 'HasIndicators'
  dividerBefore?: boolean;
  menu?: DinamicMenuItem[]; // legado: se aplana
};
```

Reglas:

1. Preferir menú **plano** con copy clara (`Ver detalle`, `Ejercicios asociados`, `Editar`).
2. `enableWhen` en el **schema del módulo** — la tabla solo mira `!row[enableWhen]`.
3. `dividerBefore: true` en el ítem que abre un bloque nuevo (ej. Editar).
4. Legado `action === 'Menu'` + `menu[]` se aplana; hereda `enableWhen` de cada subítem.

Ejemplo deportistas:

```ts
menu: [
  { action: 'verDeportista', text: 'Ver detalle' },
  { action: 'verEjercicios', text: 'Ejercicios asociados', enableWhen: 'HasIndicators' },
  { action: 'Editar', text: 'Editar', dividerBefore: true },
]
```

### Headers especiales

| Condición | Efecto visual |
|-----------|---------------|
| `displayname === 'noName'` | Header vacío (sin label) |
| `module === 'complements'` | Header vacío |
| `displayname === 'acción'` | Columna de acciones (menú o edit) |

### Schemas existentes en el repo

| Archivo | Uso |
|---------|-----|
| `src/app/view/models/columnDataSportman.ts` | Deportistas (`columnsValue`) |
| `src/app/view/entrenador/Model/columnDataEntrenador.ts` | Entrenadores |
| `src/app/view/Ejercicios/Model/columnDataEjercicios.ts` | Ejercicios (`button Ver`) |
| `src/app/view/Ejercicios/Model/columnTableAsing.ts` | Asignar deportista (`check`) |
| `src/app/view/complementos/model/columnDataTable.ts` | Complementos (`editComplement`) |
| `src/app/view/models/columnValueRubrica.ts` | Rúbrica (solo texto/números) |
| `src/app/view/sportsman/Models/indicatorsModel.ts` | Indicadores (menú + `HasIndicators`) |

---

## 4. Tipos de celda (`type`)

| `type` | Render | Evento |
|--------|--------|--------|
| `'text'` / `'number'` / … | `{{ element[name] }}` (+ tabular si métrica) | — |
| `'date'` | `date` pipe + `attr` | — |
| `'button'` | Botón; usa `action`, `label`, `variant`, `enableWhen` del schema | `action` del schema |
| `'button Ver'` / `'buttons'` / `'button indicador'` | Legado → mismos campos (`getCellButton`) | schema o fallback de type |
| `'buttonX'` | Icon close | `action` o `'eliminar'` |
| `'check'` | Checkbox en celda | `{ action: 'Select' }` + selected[] |
| `'action'` + `displayname: 'acción'` | Menú ⋯ / editComplement | Según menú |

Preferir `type: 'button'` + `action` / `label` / `enableWhen` explícitos en el schema del módulo.

### Métricas (`tabular-nums`)

Solo presentación. Si `name` o `displayname` contienen: `weight`, `peso`, `kg`, `rpe`, `series`, `reps`, `percentage`, `porcentaje`, `%` → la celda se alinea a la derecha con cifras tabulares.

---

## 5. Selección y `DinamicService`

```
┌─────────────────────┐     selectNumber$      ┌─────────────────────┐
│  app-dinamic-table  │ ─────────────────────► │  app-dinamic-filter │
│  (SelectionModel)   │                        │  (cambia CTA/bulk)  │
└──────────┬──────────┘                        └──────────┬──────────┘
           │                                              │
           │ actionEvent { Select, rows[] }               │ setData({ eventName, isEspecial: true })
           ▼                                              ▼
┌─────────────────────┐                        DinamicService.dataToPass$
│  Padre (vista)      │ ◄── dataAction(eventName, selection.selected)
└─────────────────────┘
```

### Flujo checkbox

1. Usuario marca filas → `selection` interna + emite `actionEvent` con `action: { action: 'Select' }` y `data = selected[]`.
2. En cada evaluación de “¿todas seleccionadas?”, actualiza `DinamicService.setDataSelectNumber(count)`.
3. El filter escucha `selectNumber$` y puede cambiar UI (ej. pasar de «ejercicio» a «indicador», mostrar botones bulk).

### Flujo acción especial (filter → tabla → padre)

1. En el filter, acciones como `download` / `combinate` / `add …` llaman `DinamicService.setData({ eventName, isEspecial: true })`.
2. La tabla está suscrita: si `isEspecial`, emite `actionEvent` con `action = eventName` y `data = selection.selected`.
3. El padre recibe el bulk sobre las filas ya marcadas.

Servicio: `src/app/shared/services/dinamic.service.ts` (`providedIn: 'root'`).

---

## 6. Cómo implementarlo (paso a paso)

### 6.1 Definir columnas

```ts
// mi-modulo/Model/columnDataX.ts
export const columnsX = [
  {
    displayname: 'Nombre',
    name: 'name',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'acción',
    estado: true,
    type: 'action',
    menu: [
      { action: 'Editar', text: 'Editar' },
      {
        action: 'Menu',
        text: 'Ver',
        menu: [
          { action: 'verDetalle', text: 'Detalle' },
        ],
      },
    ],
  },
];
```

### 6.2 Importar en el componente padre (standalone)

```ts
import { DinamicTableComponent } from '.../shared/components/dinamic-table/dinamic-table.component';
import { ActionResponse } from '.../shared/model/Response/DefaultResponse';
import { columnsX } from '../Model/columnDataX';

@Component({
  // ...
  imports: [/* ..., */ DinamicTableComponent],
})
export class MiVistaComponent {
  column = columnsX;
  data: MiEntidad[] = [];
  isCheck = true; // o false

  getActionEvent(event: ActionResponse): void {
    const actionKey =
      typeof event.action === 'string'
        ? event.action
        : event.action?.action;
    const { data } = event;

    switch (actionKey) {
      case 'Editar':
        // data = fila
        break;
      case 'verDetalle':
        break;
      case 'Select':
        // data = filas seleccionadas
        break;
      case 'combinate':
        // data = selected[] (vía DinamicService)
        break;
      default:
        break;
    }
  }
}
```

### 6.3 Plantilla

```html
<app-dinamic-table
  [columns]="column"
  [dataSource]="data"
  [isCheckBox]="isCheck"
  [isPaginador]="true"
  [editComplement]="false"
  (actionEvent)="getActionEvent($event)"
></app-dinamic-table>
```

### 6.4 Pareja habitual con filtro

```html
<app-dinamic-filter
  [dataFilter]="filtros"
  [nameAdd]="'deportista'"
  (filterResult)="getDataFilter($event)"
  (actionFilter)="getActionEventFilter($event)"
></app-dinamic-filter>

<app-dinamic-table
  [isCheckBox]="true"
  [columns]="column"
  [dataSource]="dataFiltrada"
  (actionEvent)="getActionEvent($event)"
></app-dinamic-table>
```

El filtro **no** redibuja la tabla: el padre filtra `data` y se la vuelve a pasar por `[dataSource]`.

---

## 7. Variantes de uso reales

| Pantalla | Check | Paginador | editComplement | Notas |
|----------|-------|-----------|----------------|-------|
| Deportistas | sí | sí (default) | no | Menú: Ver detalle / Ejercicios asociados · Editar |
| Entrenadores | sí | sí | no | Menú: Ver detalle · Editar / Plan anual |
| Ejercicios | sí | sí | no | Columna `button` + `action: 'ver ejercicio'` |
| Asignar deportista | no | **no** | no | Columna `check` embebida |
| Complementos (`viewTable`) | no | **no** | **sí** | Solo icono editar |
| Indicadores | no | sí | no | Menú con `enableWhen: 'HasIndicators'` |
| Rúbrica | no | sí | no | Solo columnas numéricas/texto |

---

## 8. Presentación (comportamiento UI)

- Altura del cuerpo: por defecto `clamp(360px, calc(100dvh - 220px), 960px)` (`--dt-body-height`); en módulos con layout flex (p. ej. deportistas) la tabla estira al alto restante. Override:
  ```scss
  .dinamic-table-host { --dt-body-height: 520px; }
  ```
- Empty: «No hay registros para mostrar.» (centrado en el área disponible).
- Selected / hover: Azul Suave `#E8F0FC`.
- Focus: anillo Azul Micovi.
- `prefers-reduced-motion`: sin transitions.

Override local de altura (desde un padre, si hace falta):

```scss
:host ::ng-deep .dinamic-table-host {
  --dt-body-height: 520px;
}
```

(El host del componente ya usa encapsulation `None` + clase `.dinamic-table-host`.)

---

## 9. Checklist al añadir una pantalla nueva

1. Crear schema de columnas (`displayname` únicos, `estado: true`).
2. Asegurar keys de fila que use el schema (`name`, y si hay `enableWhen`, esa propiedad en la fila).
3. Importar `DinamicTableComponent`.
4. Cablear `(actionEvent)` y cubrir **string y objeto** en el switch.
5. Si hay bulk desde filter: `isCheckBox=true` + misma instancia de `DinamicService` (ya es root).
6. Decidir `isPaginador` / `editComplement`.
7. No meter lógica de negocio dentro de la tabla.

---

## 10. Limitaciones conocidas / deuda

- Columnas tipadas como `any` (sin interface formal compartida).
- `MatSortModule` está importado pero **sort no está cableado** en la plantilla.
- Preferir menús planos; nesting legado se aplana; reglas de enable en schema (`enableWhen`), no hardcode de actions en la tabla.
- El paginator usa `length` interno inicial `50`; con `MatTableDataSource` + paginator local pagina en cliente sobre el array pasado (no es paginación server-side).
- Condición legacy en template: `item.type.type !== 'buttons'` (si `type` es string, es inocua).
- Documentación visual vs código: mantener `pages/dinamic-table.md` al cambiar tokens.

---

## 11. Archivos clave

```
src/app/shared/components/dinamic-table/
  dinamic-table.component.ts
  dinamic-table.component.html
  dinamic-table.component.scss
  dinamic-table.model.ts          # Contrato columns / menu / enableWhen
  README.md

src/app/shared/services/dinamic.service.ts
src/app/shared/components/dinamic-filter/   # Pareja habitual (P2 visual)
src/app/shared/model/Response/DefaultResponse.ts  # ActionResponse
```
