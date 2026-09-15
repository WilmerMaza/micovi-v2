# Prompt Cursor — Rediseño alto impacto: Shell + Dashboard

**Sin Stitch.** Skills locales + MASTER.  
Alcance: **sidebar + navbar + home/dashboard** (primer viewport del producto autenticado).

Impacto esperado: abandonar el gradiente cian genérico y el “¡Bienvenido!” vacío;
pasar a **cabina Micovi** (densidad 7, planificado vs ejecutado).

---

## PROMPT (copiar desde aquí)

```
Rediseña con ALTO IMPACTO el SHELL del producto Micovi + la HOME/DASHBOARD.
NO uses Stitch ni MCP de Stitch.
Stack: Angular Material + SCSS. Idioma UI: español.
NO cambies lógica de negocio, NavigationService (items/rutas), Session, APIs,
ni el comportamiento collapsed/mobile del layout — solo presentación y markup de UI.

════════════════════════════════════
1) SKILLS (orden; ante conflicto gana MASTER)
════════════════════════════════════
1. Lee y aplica `design-system/micovi/MASTER.md` (fuente de verdad)
2. Lee `design-system/micovi/DESIGN.md`
3. Lee `docs/micovi-design-brief.md` (producto + jerarquía)
4. `.cursor/skills/redesign-existing-projects/SKILL.md` — audita y sube craft
5. `.cursor/skills/frontend-design/SKILL.md` — plan anti-genérico ANTES de código
   (una pieza memorable por zona; subject = coaching institucional)
6. `.cursor/skills/ui-ux-pro-max/SKILL.md` — corre searches:
   python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "saas dashboard shell sidenav" --domain ux
   python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "sports coaching density cockpit" --design-system
7. UNA sola *-ui-skills de producto denso:
   `.cursor/skills/linear-ui-skills/SKILL.md`  (preferida: nav densa, item activo claro)
   — SOLO estructura/densidad/jerarquía. IGNORA colores Linear.
   Alternativa si Linear no encaja: `.cursor/skills/retool-ui-skills/SKILL.md` (mismo límite).
8. NO design-taste-frontend (es cockpit, no landing).
9. NO clerk / stripe / vercel como identidad de color.

════════════════════════════════════
2) PRODUCTO (por qué existe cada zona)
════════════════════════════════════
Micovi = SaaS para que el entrenador planifique, dosifique, ejecute, registre
e vea indicadores PLANIFICADO vs EJECUTADO.

Jerarquía mental:
Institución → Entrenador → Deportista → Plan anual → Macrociclo → Microciclo
→ Sesión → Ejercicios → Dosificación → Ejecución → Evaluación → Resultados.

El shell debe sentirse “mesa del entrenador”: estable, densa, predecible.
El dashboard home debe orientar al trabajo del día — NO ser un póster de bienvenida.

════════════════════════════════════
3) ESTADO ACTUAL (problemas a matar)
════════════════════════════════════
SIDENAV (`layout/home/components/sidenav/`):
- Gradiente cian `#3886F6 → #03BCFE` (no es Azul Micovi `#0C4CC8`)
- Look “app deportiva genérica 2019”, no cabina MASTER
- Logo: mezcla `dashboard.png` / `micovi.ico`; preferir mark color oficial
  `/images/dashboard.webp` (Y/B/R intactos) en zona de marca

TOPBAR (`layout/nav/`):
- Toolbar mínima (hamburguesa + profile) sin contexto de dominio
- Grises `#333/#000` y borde `#E5E7EB` fuera de tokens slate MASTER
- No comunica “dónde estoy” en la jerarquía

DASHBOARD (`features/dashboard/dashboard.ts` — el ruteado):
- Solo “¡Bienvenido!” + imagen grande → vacío de producto
- Color título `#3886F6` (legacy)
- No hay KPI, atajos, ni planificado vs ejecutado
- Confeti en newpay: NO rediseñar ese flujo de pago ahora; no expandir confeti

════════════════════════════════════
4) DIRECCIÓN VISUAL — SHELL
════════════════════════════════════

### Sidenav (impacto alto)
Elegir UNA dirección y ejecutarla con disciplina (preferida A):

A) RECOMENDADA — “Rail frío + acento”
- Fondo sidenav: `#0F172A` (Tinta Pizarra) O superficie `#FFFFFF` con borde `#E2E8F0`
  (elige una; documenta por qué). Preferencia: oscuro marca + logo color arriba/abajo.
- Item activo: indicador Azul Micovi `#0C4CC8` (barra 3px o fondo `#E8F0FC` + texto ink)
  — si rail oscuro: activo = `#0C4CC8` fill o left-bar + texto blanco
- Items inactivos: muted / blanco 70%
- Tipografía Inria Sans; labels 14–15px; iconos Material (no emoji)
- Ancho open ~240–250px; collapsed ~72–80px (respetar tokens actuales de layout)
- Usuario: avatar más compacto (40–44px); nombre secondary; menos padding hero
- Logo: `/images/dashboard.webp` color; collapsed = favicon/micovi compacto legible
- Motion: hover/active 150–200ms; prefers-reduced-motion
- PROHIBIDO: gradiente cian multi-stop, purple glow, pills decorativas en cluster

B) Alternativa — “Superficie clara institucional”
- Sidenav blanco / `#F9FAFB`, borde derecho `#E2E8F0`
- Activo: fondo `#E8F0FC` + texto `#0C4CC8` + icono azul
- Más “Linear/Retool”; menos “gaming blue”

### Navbar / topbar
- Altura ~56px; fondo `#FFFFFF`; borde inferior `#E2E8F0`
- Izquierda: toggle + **contexto de página** (título corto o breadcrumb stub)
  Ej. “Inicio” / chip de ciclo placeholder si no hay datos reales aún
- Derecha: profile-menu (solo estilos; no reescribir auth del menú)
- Iconos `#64748B` → hover `#0F172A`; focus ring `#0C4CC8`
- Alinear `left`/`width` con sidebar collapsed (mantener lógica existente)

### Layout shell
- Contenido: canvas `#F9FAFB`; padding denso 16–24px
- No centrar el app como landing
- Mobile: drawer + backdrop — solo estilos; lógica collapse intacta

════════════════════════════════════
5) DIRECCIÓN VISUAL — DASHBOARD HOME
════════════════════════════════════
Reemplazar el póster de bienvenida por una **cabina de entrada** (density 7).

Composición (una sola pantalla, no marketing):
┌─────────────────────────────────────────────────────────┐
│ Saludo corto + nombre (si hay)     [fecha / microciclo?] │
│ Una línea: “Retoma el trabajo de entrenamiento”          │
├──────────────┬──────────────┬────────────────────────────┤
│ KPI Cumple % │ KPI Bajo     │ KPI Sobre   (placeholders) │
│ mono/tabular │ label ES     │ color+texto (nunca solo 🎨)│
├──────────────┴──────────────┴────────────────────────────┤
│ Atajos densos (lista/tabla o filas, NO 3 feature cards): │
│ → Deportistas | Sesión de hoy | Resultados               │
│ (links a rutas REALES del NavigationService / app)       │
└─────────────────────────────────────────────────────────┘

Reglas dashboard:
- Números primero; `font-variant-numeric: tabular-nums` o JetBrains Mono
- Semántica: Cumple `#059669` / Bajo `#B45309` / Sobre `#DC2626` + etiqueta ES
- Placeholders OK: `[%]`, “—”, copy “Sin datos aún” + CTA a ruta existente
- NO inventar “99% uptime” ni stats de marketing
- NO 3 cards iguales con iconos decorativos (anti-patrón MASTER)
- NO hero image enorme del logo; el logo vive en el sidenav
- Cards SOLO si envuelven interacción (KPI tocable / atajo); si no, filas densas
- Inria Sans; acento `#0C4CC8` para links/primarios
- Mantener `ngOnInit` newpay + Swal tal cual (no tocar confeti/pago en este PR visual)

════════════════════════════════════
6) ARCHIVOS PERMITIDOS (UI)
════════════════════════════════════
Shell:
- `src/app/layout/home/layout.html` / `layout.scss` (si hace falta spacing)
- `src/app/layout/home/components/sidenav/sidenav.html`
- `src/app/layout/home/components/sidenav/sidenav.scss`
- `src/app/layout/nav/nav.html` / `nav.scss` / `nav.ts` (solo markup/aria de título)
- `src/app/layout/widgets/profile-menu/*` (solo SCSS/HTML visual ligero)

Dashboard:
- `src/app/features/dashboard/dashboard.ts` (template/styles; lógica newpay intacta)
- Si prefieres separar: crear `dashboard.html` + `dashboard.scss` junto al feature
  (sin cambiar selector ni ruta)

Docs:
- Crear/actualizar `design-system/micovi/pages/shell.md`
- Crear/actualizar `design-system/micovi/pages/dashboard.md`

════════════════════════════════════
7) NO TOCAR
════════════════════════════════════
- `NavigationService` (lista de ítems / URLs / badges data)
- `SpinnerService`, interceptores, Session/cookies
- Rutas feature, repositorios, formularios de dominio
- `view/dashboard/*` legacy salvo que confirmes que es el ruteado
  (el home ruteado es `features/dashboard`)
- Lógica collapsed storage / isMobile / backdrop (solo CSS)

════════════════════════════════════
8) PROCESO DE ENTREGA (obligatorio)
════════════════════════════════════
FASE 0 — Plan (antes de código)
- 8–12 líneas: dirección sidenav A u B + topbar + estructura dashboard
- ASCII wire del shell + home
- Lista de anti-patrones que vas a evitar
- Autocrítica: “¿parece Linear clon / AI purple / bienvenida vacía?”

FASE 1 — Shell (sidenav + navbar + layout spacing)
FASE 2 — Dashboard home
FASE 3 — Checklist MASTER + responsive + reduced-motion + contraste logo

Entrega:
1) Diagnóstico breve del before
2) Diff visual aplicado
3) Notas en pages/shell.md + pages/dashboard.md

Empieza leyendo MASTER + sidenav/nav/dashboard actuales + NavigationService (solo para
conocer rutas reales de atajos). Luego FASE 0 plan; espera OK implícito del brief
y ejecuta FASE 1+2 en el mismo pass salvo que el plan revele bloqueo.
```

---

## Variante corta (si el contexto ya está caliente)

```
Alto impacto: rediseña sidenav + topbar + features/dashboard.
Skills: MASTER + redesign + frontend-design + ui-ux-pro-max + linear-ui-skills (solo densidad).
Mata el gradiente cian y el “¡Bienvenido!” vacío.
Shell: rail Micovi (#0F172A o claro) + activo #0C4CC8 + logo dashboard.webp.
Home: cabina con KPIs Cumple/Bajo/Sobre (placeholders) + atajos a rutas reales — sin 3 feature cards.
Solo HTML/SCSS. No tocar NavigationService/Session/APIs/newpay.
Sin Stitch. Plan ASCII → shell → dashboard → docs pages/*.md
```

---

## Cómo usarlo

1. Chat nuevo en Cursor (más contexto limpio).  
2. Pega el prompt largo.  
3. Revisa FASE 0 (plan); si el sidenav oscuro vs claro no te convence, di “opción B” y re-aplica.  
4. Si quieres mockup Stitch **después**, usa un segundo chat con `DESIGN.md` + screens shell/dashboard.

## Skills que NO mezclar aquí

| Evitar | Motivo |
|--------|--------|
| Stitch en el mismo pass | Este brief es implementación Angular |
| design-taste-frontend | Landing bias; dashboard es cockpit |
| clerk + linear juntas | Una sola `*-ui-skills` |
| shadcn / Tailwind / React | Fuera de stack |
