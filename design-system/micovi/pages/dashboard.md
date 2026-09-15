# Dashboard home — Micovi (página)

Overrides de `MASTER.md` para la cabina de entrada (`features/dashboard`).

## Objetivo

Orientar al **trabajo del día** (planificado vs ejecutado), no un póster de bienvenida.

## Layout

- Ancho: **100% del content pane** (full-bleed). No `max-width` que deje hueco a la derecha.

## Composición

1. **Saludo** + fecha ES (el chip de ciclo vive en el topbar — no duplicar)
2. **Empty banner** cuando no hay microciclo: copy + CTA “Ir a deportistas”
3. **KPI densos** Cumple / Bajo / Sobre en **una sola franja** (no 3 cards sueltas) — valor `—` + etiqueta semántica (color **y** texto)
4. **Atajos en filas** (lista), no 3 feature cards:
   - Deportistas → `/sportsman`
   - Sesión de hoy → `/sportsman` (entrada real al árbol)
   - Resultados → `/sportsman` (sin ruta de resultados aún; copy honesto)

## Tokens semánticos

| Estado | Hex | Label |
|--------|-----|-------|
| Cumple | `#059669` + fondo `#D1FAE5` | Cumple |
| Bajo | `#B45309` + fondo `#FEF3C7` | Bajo |
| Sobre | `#DC2626` + fondo `#FEE2E2` | Sobre |

Métricas: `font-variant-numeric: tabular-nums` / JetBrains Mono si está cargada.

## Conservado

- `ngOnInit` query `newpay` → Swal + confeti **sin cambios**

## Anti-patrones evitados

- Título `#3886F6` + hero logo enorme
- “¡Bienvenido!” vacío
- Stats de marketing inventados
- Grid de 3 cards KPI huecas (empty state roto)
- Chip “Sin ciclo” duplicado (topbar + body)

## Archivos

- `src/app/features/dashboard/dashboard.ts`
- `src/app/features/dashboard/dashboard.html`
- `src/app/features/dashboard/dashboard.scss`
