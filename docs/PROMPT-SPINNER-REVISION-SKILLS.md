# Prompt Cursor — `app-spinner` v2 (sin Stitch, anti-genérico)

La v1 quedó en un `mat-spinner` genérico: **rechazada**.  
Este prompt fuerza lo mejor de las skills + identidad deportiva Micovi **sin** caer en emoji ni en spinner Material aburrido.

Componente: `src/app/shared/components/spinner/`  
Service / interceptor / router: **no tocar**.

---

## PROMPT (copiar desde aquí)

```
Rediseña de nuevo el overlay global `app-spinner` de Micovi.
La versión actual (scrim + panel + mat-spinner azul + “Cargando…”) está RECHAZADA:
se siente SaaS genérico, no Micovi. NO uses Stitch.

════════════════════════════════════
SKILLS — cómo usarlas (obligatorio)
════════════════════════════════════
Lee y aplica EN ESTE ORDEN. Ante conflicto de color/type/densidad → gana MASTER.

1) `design-system/micovi/MASTER.md` + `design-system/micovi/DESIGN.md`
   - Acento único #0C4CC8, slate frío, Inria Sans, Motion 3/10
   - NUNCA emojis como iconos
   - Scrim overlays: rgba(15,23,42,0.45)

2) `.cursor/skills/frontend-design/SKILL.md`
   - Sé opinionado: UNA pieza memorable, el resto disciplinado
   - Rechaza defaults AI: purple glow, cream/terracotta, spinner circular genérico como “héroe”
   - Ancla el diseño en el SUBJECT: coaching deportivo institucional (planificar / ejecutar / medir)
   - Primero plan corto (tokens + wire ASCII) → critica si es genérico → luego código

3) `.cursor/skills/redesign-existing-projects/SKILL.md`
   - Mejora lo que hay; no reescribas la arquitectura de loading
   - Quita fingerprints genéricos; sube craft

4) `.cursor/skills/ui-ux-pro-max/SKILL.md`
   - Corre el search del skill si está disponible:
     python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "sports saas loading overlay" --domain ux
     y/o "progress indeterminate overlay" --domain ux
   - Usa hallazgos de a11y/loading; NO copies paletas ajenas al MASTER

5) `.cursor/skills/design-taste-frontend/SKILL.md` (si existe)
   - Solo para anti-slop y micro-motion contenido
   - NO subas Motion por encima del dial 3 de MASTER
   - NO introduzcas tipografías distintas a Inria Sans / JetBrains Mono

6) NO uses clerk-ui-skills para color (su accent púrpura está prohibido).
   NO uses stitch-*.

════════════════════════════════════
REFERENCIA DE PERSONALIDAD (la que sí gusta)
════════════════════════════════════
El loading del REGISTER (`register.html` / `register.scss` → `.loading-section`):
- Iconos Material deportivos (`sports_soccer`, etc.) — NO emoji
- Barra indeterminada con gradiente #0C4CC8 → #1A6AFF
- Copy claro en español
- Sensación “club / institución”, no toy app

Transfiere ESA personalidad al overlay GLOBAL, adaptada a fullscreen:
más contenida (Motion 3), más premium, usable en cualquier ruta del app.

════════════════════════════════════
DIRECCIÓN CREATIVA (elige UNA y ejecútala bien)
════════════════════════════════════
Concepto obligatorio: “mesa del entrenador esperando datos” — deportivo + serio.

OPCIÓN RECOMENDADA — “Marca + pulso de carga”
- Centro: mark Micovi color (`/images/dashboard.webp` o logo compacto) ~56–72px
- Debajo o alrededor: barra indeterminada fina (3–4px), track #E2E8F0,
  fill gradiente #0C4CC8 → #1A6AFF, animación suave ≤1.4s
- Label: “Cargando…” Inria Sans, muted
- Micro-motion: pulse suave del logo (opacity/scale 1→1.03) O shimmer en la barra
  — NO orbitar 4 bolas como carnaval; NO mat-spinner como elemento principal

OPCIÓN B — “Orbit deportivo refinado” (si no usas logo)
- 3 Material Icons deportivos (mat-icon), círculos con fondo #E8F0FC o #0C4CC8
- Órbita lenta (~2s) o fade secuencial; radius y sombra slate, no Material #1976d2
- + barra inferior fina azul Micovi
- Cero emoji. Cero mat-spinner protagonista.

PROHIBIDO en esta pasada:
- `mat-spinner` / circular Material como único/héroe visual
- Emojis ⚽🏀🎾🏐
- Overlay blanco opaco full-bleed
- Purple / neon / glassmorphism / confetti
- Inter / Roboto / system-ui como identidad
- Texto en inglés
- Cambiar SpinnerService, interceptor o provide-router-spinner

════════════════════════════════════
COMPOSICIÓN
════════════════════════════════════
.overlay
  - fixed inset 0; z-index 2000
  - scrim rgba(15,23,42,0.45)
  - opcional: blur ligero backdrop-filter: blur(4px) SOLO si no rompe perf

.panel
  - surface #FFF; border #E2E8F0; radius 16px (auth) o 12px
  - padding ~28–32px; min-width ~220px
  - sombra slate tintada (elev-2/3 MASTER), no negro puro
  - UNA composición centrada: mark/indicator + barra + label
  - No card ornamental extra; el panel ES la interacción de espera

Copy ES:
- Principal: “Cargando…”
- Opcional micro-línea (solo si aporta): “Preparando tu sesión” — una sola, muted 12–13px
  Si duda, omite la segunda línea (Chanel: quita un accesorio).

A11y:
- role="status" aria-live="polite" aria-busy="true"
- Texto visible siempre (no solo animación)
- Decoración aria-hidden="true"
- prefers-reduced-motion: sin órbita/pulse; barra estática o panel solo con texto + mark quieto

════════════════════════════════════
ARCHIVOS
════════════════════════════════════
- `src/app/shared/components/spinner/spinner.ts` (+ JSDoc español)
- `src/app/shared/components/spinner/spinner.scss`
- Spec solo si el template rompe tests

════════════════════════════════════
PROCESO DE ENTREGA
════════════════════════════════════
1) Plan corto (5–8 líneas): concepto elegido + por qué NO es genérico
2) ASCII wire del panel
3) Implementar HTML/SCSS
4) Autocrítica: “¿se confunde con cualquier SaaS?” Si sí, itera UNA vez antes de cerrar
5) Checklist: sin emoji, sin mat-spinner héroe, #0C4CC8, Inria Sans, scrim,
   Motions calmadas, reduced-motion, service intacto

Empieza leyendo MASTER + spinner actual + loading del register; planifica; luego código.
```

---

## Variante corta

```
Rehaz app-spinner: la versión mat-spinner está rechazada (genérica).
Skills: frontend-design (pieza memorable) + redesign + ui-ux-pro-max + MASTER.
Personalidad = loading del register (Material sports icons + barra gradiente Micovi),
adaptada a overlay global Motion 3.
Preferir logo dashboard.webp + barra indeterminada; o orbit de mat-icons (sin emoji).
PROHIBIDO: mat-spinner como héroe, emojis, purple, tocar SpinnerService.
Sin Stitch. Plan → crítica anti-genérico → código.
```
