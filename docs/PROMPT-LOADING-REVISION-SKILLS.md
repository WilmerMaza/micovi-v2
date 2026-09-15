# Prompt Cursor — Revisar / pulir Loading auth (sin Stitch)

Pega esto en Cursor para mejorar el estado **loading** (y, si aplica, success/error)
del flujo Register / auth, usando skills locales — **sin Stitch**.

Referencia actual: `register` → `submitState === 'loading'`.

---

## PROMPT (copiar desde aquí)

```
Revisa y rediseña el estado LOADING de auth en Micovi (Register).
NO uses Stitch ni MCP de Stitch.

### Skills (obligatorio; ante conflicto gana MASTER)
1. Lee `design-system/micovi/MASTER.md` — Dial Motion 3/10 (feedback de acción, no show)
2. Lee `design-system/micovi/DESIGN.md`
3. Sigue `.cursor/skills/redesign-existing-projects/SKILL.md`
4. Sigue `.cursor/skills/frontend-design/SKILL.md`
5. Sigue `.cursor/skills/ui-ux-pro-max/SKILL.md`
6. Opcional claridad de estados vacíos/carga:
   `.cursor/skills/linear-ui-skills/SKILL.md` SOLO para densidad y calma del waiting state.
   IGNORA colores Linear. Tokens = MASTER (#0C4CC8, slate frío, Inria Sans).

### Contexto de producto
Micovi = plataforma deportiva institucional.
El loading debe sentirse “deportivo + profesional”, no spinner genérico SaaS ni purple AI.
Ya existe un patrón con iconos de pelotas (Material sports_*) + barra — me gusta la idea;
púlelo para que cumpla MASTER (motion 3, sin loops agresivos, prefers-reduced-motion).

### Archivos a revisar / tocar (solo UI del estado)
- `src/app/view/pages/auth/register/view/register.html` (bloques loading / success / error)
- `src/app/view/pages/auth/register/view/register.scss` (`.loading-section`, animaciones)
- Markup mínimo en `register.ts` SOLO si hace falta aria/clases — NO cambiar submit()/API

### Qué NO tocar
- RegisterService, repository, FormGroups de los pasos
- Lógica `onSubmit`, HTTP, redirección a login
- Contratos de API

### Objetivo visual del LOADING (dentro de la misma card Register)
Mantener la card + cabecera azul fija si ya está; el cuerpo muestra:

1. Indicador deportivo (pelota Material o mark Micovi) centrado
2. Título: “Registrando institución...”
3. Subtítulo: “Por favor espera un momento”
4. Barra de progreso indeterminada:
   - Track `#E2E8F0`
   - Fill gradiente `#0C4CC8 → #1A6AFF`
   - Animación suave ≤1.4s, ease, sin bounce extremo
5. Tipografía: Inria Sans; título `#1D293D`/`#0F172A` bold; subtítulo `#62748E`

### Motion (MASTER dial 3)
- Bounce de pelota: sutil (no 30px agresivo si se ve infantil); o reemplazar por pulse suave
- Respetar `@media (prefers-reduced-motion: reduce)` → sin bounce; barra estática o opacity pulse
- Duración feedback 150–250ms en hovers; loops de wait calmados
- Sin glow neón, sin confetti, sin skeleton marketing

### A11y
- `role="status"` + `aria-live="polite"` en el bloque loading
- Texto visible (no solo color/animación)
- Icono decorativo con `aria-hidden="true"`

### Success / Error (mismo pass, coherencia)
Si tocas loading, alinea también:
- Success: icono círculo verde + “¡Institución registrada!” + CTA pill azul
- Error: icono rojo + mensaje ES + “Intentar de nuevo” / “Cancelar”
Mantén el look Register (pills 24px, gradiente CTA).

### Entregable
1) Diagnóstico breve (qué está bien / qué choca con Motion 3 o MASTER)
2) Aplicar HTML/SCSS
3) Checklist: tokens Micovi, reduced-motion, aria, sin purple, Form/API intactos

Empieza leyendo MASTER + el bloque loading actual; diagnostica; luego edita.
```

---

## Variante corta

```
Pule el loading del register (pelota + barra) con skills redesign + frontend-design + ui-ux-pro-max.
MASTER Motion 3, tokens #0C4CC8, Inria Sans, prefers-reduced-motion, aria-live.
Solo HTML/SCSS del estado loading (y success/error si hace falta coherencia).
No tocar submit/API. Sin Stitch.
```

---

## Variante: loading también en Login

Si más adelante el login muestra espera al autenticar:

```
Añade estado loading al login con el mismo lenguaje visual del register loading
(indicador + texto ES + barra azul Micovi), dentro de la card auth.
Skills: redesign + frontend-design + ui-ux-pro-max + MASTER.
No tocar Session/FormGroup; solo UI de “Entrando…” mientras isSubmitting/loading.
Sin Stitch.
```
