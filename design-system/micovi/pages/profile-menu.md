# Profile menu — Micovi (página)

Overrides de `MASTER.md` para el widget de perfil en la topbar y el modal de logout.

## Dirección

**Chip de identidad + panel de cuenta**

| Zona | Token / medida | Hex / valor | Por qué |
|------|----------------|-------------|---------|
| Trigger | Chip borde + avatar 36px + nombre/rol | borde `#E2E8F0` · acento `#0C4CC8` | Presencia real en topbar 56px; no icon-button aislado |
| Panel | Superficie + elev-2 · radius 12px | min-width ~320px | Overlay de cuenta, no tipografía de juguete |
| Header | Bloque lienzo + avatar 52px + email + chip rol | canvas `#F9FAFB` | Pieza memorable |
| Ítems | Altura ~56px · título 15/700 + hint 12 muted | hover `#E8F0FC` | Acciones legibles (Configuración / Logout) |
| Legal © | **No en el menú** | — | Va al pie de Configuración |
| Modal | Scrim + destructivo sólido | ver logout | Sin gradiente |

## Pieza memorable

Chip de perfil en topbar + header de identidad en el panel (avatar sólido azul + email + rol).

## Decisiones UX

- **© Micovi 2026 no pertenece al menú de cuenta.** Un menú de perfil es para identidad y acciones (configurar / salir). El pie legal vive en la pantalla de Configuración (`sidenavconf` footer).
- Sin Tema/Fuente muertos en el menú.
- Hint bajo cada acción (“Preferencias de la cuenta”, “Salir de Micovi”) para que no se lea como lista diminuta.

## P1 aplicado

- Trigger chip: avatar + nombre + rol + caret; móvil colapsa a solo avatar.
- Panel: header canvas, acciones densas pero altas (56px), sin footer ©.
- Nombre/email/rol desde Auth (solo lectura).
- Modal logout institucional (Inria, `#DC2626` sólido, motion 180–200ms, `prefers-reduced-motion`).
- Configuración: título de página h1 22px, empty state honesto, © en pie de página.

## Anti-patrones evitados

- Copyright en dropdown de cuenta
- Gradiente rojo / glass / purple / Inter
- Icon-button genérico `account_circle` sin identidad
- “works!” en empty states

## Archivos

- `src/app/layout/widgets/profile-menu/*`
- `src/app/shared/components/logout-modal/*`
- `src/app/features/settings/pages/home/*`
- `src/app/features/settings/components/sidenavconf/*`
- `src/app/features/settings/pages/complements/*` (empty state)
