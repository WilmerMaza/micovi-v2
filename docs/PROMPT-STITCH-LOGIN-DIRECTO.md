# Prompt Stitch — Login Micovi (pegar directo en Stitch)

Úsalo en el proyecto **Micovi Login** (`7549046314908867932`):
**Generate** o **Edit** la pantalla de login (mejor editar la variante Split si ya existe).

Device: **Desktop** (luego pide Mobile aparte con el mismo prompt + “mobile 390px”).

---

## PROMPT (copiar todo el bloque)

```
Design a DESKTOP web LOGIN screen for Micovi — a sports coaching SaaS for school/club coaches (Spanish UI).

PRODUCT CONTEXT
Micovi helps coaches plan athlete training, set exercise load, execute sessions, and compare planned vs actual. This is a product auth screen, NOT a marketing landing page.

LAYOUT (must follow exactly)
- Horizontal SPLIT, full viewport height:
  - LEFT ~42%: dark brand panel (#0F172A). Centered Micovi logo mark (colorful sports figure — yellow, blue, red). Soft subtle vignette. NO photos of people, NO stock gym photos, NO purple gradients.
  - RIGHT ~58%: light cold canvas (#F9FAFB) with a single white form card (#FFFFFF), max-width ~420px, centered vertically, 1px border #E2E8F0, soft shadow, corner radius 24px.
- On mobile stack: brand panel on top (compact), form card below.

BRAND / LOGO (critical)
- Use a CLEAR, COLORFUL logo icon (blue/yellow/red figure), NOT a white silhouette.
- Do NOT place a white logo on a white card.
- Prefer logo on the dark left panel; optional small logo above the form headline is OK only if multicolor/visible.
- Wordmark “Micovi” only once (on dark panel or as text next to logo). Avoid duplicate giant wordmarks.

COPY (Spanish, exact)
- Headline: Hola de nuevo
- Subtext: Entra para seguir con tu plan de entrenamiento.
- Labels: Email, Contraseña
- Placeholders: tu@email.com , ••••••••
- Checkbox: Recordarme
- Link: ¿Olvidaste tu contraseña?
- Primary button: Entrar
- Footer: ¿No tienes cuenta? Regístrate

FORM (right card)
- Email field with mail icon, filled style background #E8ECF1, radius 8px
- Password field with lock icon + show/hide eye toggle
- Row: Recordarme (left) + forgot link (right, color #0C4CC8)
- Full-width primary button #0C4CC8, white text, bold, height ~44px, radius 8px
- Footer register line under the button
- ONE primary CTA only

COLORS (strict)
- Accent / CTA / links: #0C4CC8
- Pressed accent: #0A3FA8
- Soft accent wash: #E8F0FC
- Canvas: #F9FAFB
- Card: #FFFFFF
- Text primary: #0F172A
- Text muted: #64748B
- Borders: #E2E8F0
- Dark brand panel: #0F172A
- Error: #DC2626

TYPOGRAPHY
- Sans: Inria Sans (or closest humanist sans). NO Inter. NO serif. NO ALL-CAPS eyebrows. NO “AI purple” chrome.

DO NOT
- 3 feature cards, testimonials, pricing, stats row
- Purple/neon gradients, glassmorphism, glow
- Cream + terracotta AI cliché palette
- Centered lonely white card on blank white page with invisible logo
- English copy
- Decorative illustrations that compete with the form

GOAL
Clean Clerk-like auth clarity + Micovi sports identity: dark brand left, crisp form right, high contrast, professional coach software feel.
```

---

## Variante MOBILE (segundo generate)

Mismo prompt + al inicio:

```
MOBILE 390×844. Stack vertically: compact dark brand header (logo + Micovi) then the white form card filling the rest. Same colors, copy, and DO NOT list.
```

---

## Si editas una pantalla existente

Prefijo:

```
Edit the existing Micovi login screen. Keep the SPLIT structure. Fix logo visibility (colorful logo on dark panel). Tighten spacing. Keep Spanish copy. Apply the constraints below:
```

Luego pega el bloque PROMPT desde LAYOUT.

---

## Checklist visual antes de aceptar en Stitch

- [ ] Logo se lee a 2 metros (no blanco-sobre-blanco)
- [ ] Split oscuro | form claro (desktop)
- [ ] CTA único “Entrar” en `#0C4CC8`
- [ ] Sin purple / sin 3 cards / sin landing
- [ ] Text `#0F172A` / muted `#64748B` legibles

Cuando elijas la variante, pásala al Agent Angular con:  
`Aplica este mockup Stitch al login Angular Material; MASTER + pages/login.md; no tocar Session.`
