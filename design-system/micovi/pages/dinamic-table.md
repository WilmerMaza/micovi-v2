# Dinamic-table — Micovi (componente compartido)

Overrides de `MASTER.md` para `app-dinamic-table` (listado reutilizable).

**Uso / API / funcionalidades:** ver la guía completa en  
[`src/app/shared/components/dinamic-table/README.md`](../../../src/app/shared/components/dinamic-table/README.md)  
(inputs, tipos de celda, menús, `HasIndicators`, `DinamicService`, ejemplos de implementación).

**Acoplamiento P2:** suele ir junto a `dinamic-filter`; este archivo **no** rediseña el filtro.

## Dirección elegida

**Mesa de trabajo densa** — filas y números primero; sin kit de cards.

| Zona | Token | Hex / valor | Por qué |
|------|-------|-------------|---------|
| Superficie tabla | Superficie Pura | `#FFFFFF` | Panel de datos, no whitesmoke |
| Cabecera sticky | Lienzo Frío | `#F9FAFB` | Separación quieta del body |
| Borde | Borde Estructural | `#E2E8F0` | Elevación casi plana (1px) |
| Texto | Tinta Pizarra | `#0F172A` | Headers 700 + celdas body |
| Meta / empty | Acero Secundario | `#64748B` | Empty y paginator |
| Hover / selected | Azul Suave | `#E8F0FC` | Feedback sin lightblue |
| Acento | Azul Micovi | `#0C4CC8` | Focus, outline buttons, links |
| Radius | `radius-md` | `8px` | Panel/tabla (no 15px card) |

## Pieza memorable

1. **Cabecera densa:** label `13px` / peso `700`, sentence case (sin UPPERCASE).
2. **Fila de acción:** `⋯` menú **plano** (sin submenús/flyout); aria «Abrir acciones de fila».
3. **Celdas métrica:** `tabular-nums` cuando `name`/`displayname` sugieren peso, kg, %, series, RPE.

## Densidad y motion

- Padding de fila: `space-3` (12px).
- Motion: hover/press `150–200ms` solo `opacity` / `background` / `transform`.
- `prefers-reduced-motion: reduce` → sin transitions ni scale.
- **Prohibido:** keyframes bounce, stagger de filas, animar width/height.

## Estados

| Estado | Tratamiento |
|--------|-------------|
| Empty | Cuerpo flexible (`clamp` / flex fill del módulo); copy centrada «No hay registros para mostrar.» (meta 12px) |
| Disabled (botón Ver / ítem menú) | Opacity ~0.4 + `aria-disabled` / `[disabled]`; cursor default |
| Selected (checkbox) | Fondo Azul Suave |
| Focus | Anillo Azul Micovi 2px offset 2px |

## Botones en celda

- Outline / texto-link Azul Micovi (terciario).
- **No** verde neón `#73f237`.
- Hit area icon-only ≥44px.

## Paginator

- Label: «Resultados por página».
- Tipografía/colores vía tokens host + variables Material; minimizar overrides ad-hoc.

## Contratos (no tocar)

- Inputs: `columns`, `dataSource`, `isCheckBox`, `isPaginador`, `editComplement`
- Output: `actionEvent` `{ action, data }`
- `DinamicService` / selección / menú plano + `enableWhen` en schema / sin actions de dominio hardcodeadas en la tabla
- Schemas en `view/models` y features (p. ej. `columnDataSportman`)

## Archivos

- `src/app/shared/components/dinamic-table/dinamic-table.component.html`
- `src/app/shared/components/dinamic-table/dinamic-table.component.scss`
- `src/app/shared/components/dinamic-table/dinamic-table.component.ts` (labels/aria/copy UI)

## Anti-patrones evitados

- UPPERCASE en headers
- Bounce infinito en ⋯
- Botón verde neón
- Fondo whitesmoke / selected lightblue
- Padding empty 100px
- Grid de cards en lugar de tabla
- Purple AI / Inter / glow / glass
