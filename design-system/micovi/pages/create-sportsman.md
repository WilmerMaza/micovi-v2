# Create / edit deportista — Micovi (página)

Overrides de `MASTER.md` para alta y edición de deportista
(`features/sportsman/Components/create-sportsman`).

## Objetivo

Registrar o actualizar un deportista en cabina densa: identidad, física y datos
personales — sin carousel ni póster de bienvenida.

## Layout (uso de espacio)

- Ancho: **100% del content pane** (full-bleed). `max-width: none`; `margin: 0`.
  Sin padding horizontal extra (el shell aporta 16–20px).
- Padding vertical del host: `12–20px` (space-3 / space-5).
- Entre header↔form y entre secciones: **space-5** (`20–24px`) — densos, no pegados.
- Padding interno de panel: **space-4** (`16px`); gap campos: **8×16px** (space-2 / space-4).
- Identificación: CSS Grid `minmax(0,1fr) + foto 220px` (foto fija, no `flex:1`).
  Campos: grid 2 cols; **Nombre** `grid-column: 1 / -1`; tipo + número en fila.
  Foto: `aspect-ratio` acotado, `max-height ~260px`, borde dashed tokens.
- Física: **3 columnas** ≥1024px (6 campos → 2 filas limpias).
- Personales: **3 columnas** ≥1024px; Institución `span 2` para evitar teléfono
  huérfano; Email + Teléfono cierran en pareja.
- Tablet ≤1023: 2 cols. Móvil ≤767: 1 col; foto full-width debajo.
- Densidad Material `-1` scoped al `:host` (no altera tema global).
- Footer: full width del pane; Atrás izq / Guardar der.

## Composición / jerarquía visual

1. **Header (cromo, no card)** — título + lead sobre canvas; riel Azul Micovi 3px;
   divisor inferior; mark en chip con `elev-1`. Evita caja blanca que se funde
   con `#F9FAFB`.
2. **Identificación** — panel superficie + `elev-1` + `radius-lg` 12px;
   grid campos | upload foto fija (pieza memorable).
3. **Información física** — mismo panel; 3 cols desktop.
4. **Datos personales** — mismo panel; Institución span 2.
5. **Footer** — sin card; solo `border-top` + Atrás / Guardar.

Varianza de radio: paneles 12px · controles/inputs 6px (rompe el “todo cuadrado”).

## Tokens

| Rol | Hex |
|-----|-----|
| Superficie / borde | `#FFFFFF` / `#E2E8F0` |
| Tinta / muted | `#0F172A` / `#64748B` |
| Acento | `#0C4CC8` |
| Acento suave | `#E8F0FC` |
| Destructivo (quitar foto) | `#DC2626` + `#FEE2E2` |

Tipografía: Inria Sans. Radius paneles: 12px; controles: 6px. Elevación: `elev-1` en paneles; header sin sombra de card.

## Conservado (lógica)

- `sportsmanFormModel` / validators
- `createSportsman` / `updateSportsman` + upload imagen
- Cascada `universalEstadoApis` / `universalCiudadesApis`
- Rutas `/sportsman/create` y `/edit/:id` + overlay desde listado

## Anti-patrones evitados

- Header como card blanca idéntica al canvas (`#F9FAFB`) — se fundía con el fondo
- Stack SaaS de cajas 8px idénticas (header = sección = footer)
- Franja gris anidada en `card-header` (caja dentro de caja)
- `max-width: 960px` + `margin: 0 auto` (landing centrada)
- Foto `flex: 1` / caja vacía dominante
- Solo 2 cols en desktop ancho
- Sombras soft card kit + lift `translateY(-3px)`
- Azules no-marca (`#2563EB`, `#4d7ce0`)
- Labels duplicados + inputs sin `formControlName`
- Secciones vacías / carousel a medias
- 4+ columnas / animaciones nuevas / glass / purple

## Archivos

- `create-sportsman.component.html`
- `create-sportsman.component.scss`
- `create-sportsman.component.ts`
