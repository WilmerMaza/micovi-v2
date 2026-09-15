# Shell — Micovi (página)

Overrides de `MASTER.md` para el app shell (sidenav + topbar + canvas).

## Dirección elegida

**A — Rail frío + acento**

| Zona | Token | Hex | Por qué |
|------|-------|-----|---------|
| Sidenav fondo | Tinta Pizarra | `#0F172A` | Contraste fuerte con mark color (Y/B/R); mesa del entrenador, no “app deportiva 2019” cian |
| Ítem activo | Azul Micovi suave + barra | `rgba(12,76,200,0.26)` + barra 3px blanca | Activo inequívoco sin pastilla full-bleed agresiva |
| Ítem hover | Mesa fría | `rgba(255,255,255,0.07)` → texto blanco | Feedback quieto; solo background/color |
| Ítem inactivo | Blanco 70% | `rgba(255,255,255,0.7)` | Jerarquía secundaria sobre oscuro |
| Label de zona | Meta muted | 12px · `rgba(255,255,255,0.45)` · «Menú» | Solo abierto; no en collapsed |
| Topbar | Superficie | `#FFFFFF` + borde `#E2E8F0` | Canvas claro; contexto de página a la izquierda |
| Contenido | Lienzo | `#F9FAFB` | Continuidad MASTER |

## Piezas memorables (una por zona)

1. **Sidenav (P1):** activo refinado (fill suave + barra izquierda) + hover mesa fría; resto quieto. Mark `/images/logo_micovi_mark.png`; collapsed 32px.
2. **Topbar:** título de página + chip stub “Sin ciclo activo”.
3. **Canvas:** padding denso 16–24px; no centrado landing.
4. **Profile menu (P1):** ver `pages/profile-menu.md` — header de identidad (squircle + email Auth + rol) y logout institucional.

## Sidenav P1 aplicado

- Activo: fill `0.26` + `::before` 3px blanca (opacity fade ≤180ms); weight 700; no fill `#0C4CC8` sólido.
- Hover inactivo: `rgba(255,255,255,0.07)` + texto blanco.
- Press: `scale(0.98)` ≤150ms (`transform` only).
- Label «Menú» encima del menú cuando `!collapsed && showText`.
- Tooltips `MatTooltip` (posición right) + `aria-label` en modo collapsed.
- Texto al expandir: clase `.nav-fade` opacity ~120ms (alineado a `showText`); no anima width/height.
- User footer: squircle 8px; nombre 13px/700; rol 12px muted; sin avatar 60px.
- `prefers-reduced-motion: reduce` → sin transition/animation/press transform.
- Tipografía: Inria Sans. Acento único `#0C4CC8` (focus ring).

## Anchos (sin cambiar lógica)

- Open: `250px`
- Collapsed: `80px`
- Topbar height: `56px`
- Motion: 150–200 ms · `cubic-bezier(0.2, 0, 0, 1)`; `prefers-reduced-motion` sin transición

## Anti-patrones evitados

- Gradiente cian `#3886F6 → #03BCFE`
- Purple glow / Inter Linear colors / glass
- Avatar hero 60px + padding 4rem
- Pastilla activa full-bleed agresiva
- Topbar sin contexto de dominio
- Negro puro `#000` en iconos
- Animar width/height del rail

## Widget perfil (resumen)

- Trigger: **chip** de identidad (avatar + nombre + rol), no solo icono.
- Menú: Configuración + Cerrar sesión con hints; **sin ©** (legal en Configuración).
- Detalle: [`profile-menu.md`](./profile-menu.md).

## Archivos

- `src/app/layout/home/components/sidenav/*`
- `src/app/layout/nav/*`
- `src/app/layout/home/layout.scss`
- `src/app/layout/widgets/profile-menu/*`
- `src/app/shared/components/logout-modal/*`
