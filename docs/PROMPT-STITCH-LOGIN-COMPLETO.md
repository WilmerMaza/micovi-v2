# Prompt completo Stitch — Login Micovi

Pégalo en **Stitch → Generate / Edit screen** (Desktop).
Proyecto recomendado: **Micovi Login**.

Antes (si puedes):
1. Sube `design-system/micovi/MASTER.md` como DESIGN.md del proyecto  
2. Sube el logo `public/images/dashboard.webp` (figura amarillo/azul/rojo)

---

## PROMPT PARA STITCH (copiar desde aquí)

```
You are designing UI for MICOVI. Follow EVERY rule below. Do not invent a generic SaaS look.

════════════════════════════════════
1) WHAT MICOVI IS
════════════════════════════════════
Micovi is a Spanish-language sports coaching SaaS for schools and clubs.

It lets a coach:
- Plan an athlete’s training
- Define the LOAD of each exercise (dosage)
- Execute the session
- Register results
- See automatic indicators of how close EXECUTED was to PLANNED

Domain hierarchy (navigation mental model of the whole product):
Institution → Coach → Athlete → Annual plan → Macrocycle → Microcycle → Session → Exercises → Dosage → Execution → Evaluation → Results/Charts

Core visual idea of the product (not just login):
PLANNED vs EXECUTED vs GAP indicator.
Planned = slate/muted. Executed = Micovi blue. Gap = OK green / Under amber / Over red — always with Spanish labels, never color alone.

Audience: coaches and coordinators. Daily desktop/tablet use. Professional sports operations — like a coach’s desk, NOT a startup landing page, NOT fintech neon, NOT “AI purple”.

════════════════════════════════════
2) DESIGN SYSTEM (MUST USE THESE TOKENS)
════════════════════════════════════

DIALS
- Density 7/10 (useful, compact — not airy gallery)
- Motion 3/10 (subtle interaction only)
- Variance 4/10 (predictable product layout; auth may use a mild split)

COLORS — surfaces & text (cold slate only)
- Canvas: #F9FAFB
- Surface/card: #FFFFFF
- Ink/primary text: #0F172A
- Muted/secondary text: #64748B
- Mist input fill: #E8ECF1
- Border: #E2E8F0
- Strong border: #CBD5E1
- Dark brand panel: #0F172A (NOT pure #000000)
- Scrim: rgba(15,23,42,0.45)

COLORS — brand accent (ONLY one brand accent)
- Micovi Blue: #0C4CC8 (primary CTA, links, focus ring)
- On blue: #FFFFFF
- Pressed: #0A3FA8
- Soft blue wash: #E8F0FC

COLORS — semantic (product-wide; login mainly needs error)
- Planned: #64748B
- Executed: #0C4CC8
- OK / Cumple: #059669
- Under / Bajo: #B45309
- Over / error: #DC2626

LOGO / BRAND MARK (critical)
- Official mark: geometric athlete figure in YELLOW + BLUE + RED (CM figure). High contrast.
- Show the colorful logo intact. Do NOT convert it to white monochrome.
- Do NOT put a white logo on a white card.
- Best: place the colorful logo on the dark brand panel (#0F172A).
- Wordmark “Micovi” at most once, Inria Sans Bold, near the logo on the dark panel.

TYPOGRAPHY
- UI font: Inria Sans (weights 400, 700). Humanist sans.
- Metrics font (elsewhere in app): JetBrains Mono — not needed on login except optional.
- FORBIDDEN: Inter as default, Georgia/Times serif, ALL-CAPS eyebrows, “WORD — fragment” chrome, middle-dot meta rows.

TYPE SCALE (auth)
- Brand/wordmark: ~18–22px bold
- Headline: ~24–28px bold, tracking slightly tight, #0F172A on light / white on dark
- Lede: ~15px regular, #64748B
- Labels: ~13px
- Body/controls: ~15px
- Sentence case only (“Entrar”, not “ENTRAR”)

SPACING / RADIUS / ELEVATION
- 4/8 rhythm. Compact: 8–16px gaps in form; 24–32px between brand and form blocks.
- Radius: inputs/buttons 8px; auth card 24px (up to 32px OK).
- Avoid decorative pills (rounded-full clusters).
- Elevation: almost flat + 1px border; soft shadow on auth card only
  (e.g. 0 16px 40px rgba(15,23,42,0.12)). No neon glow.

COMPONENTS (auth)
- Primary button: #0C4CC8, white text, full width, ~44px tall, bold, radius 8px, no gradient
- Inputs: filled #E8ECF1, label above or Material-like, focus ring 2px #0C4CC8
- Links: #0C4CC8
- Checkbox: Recordarme
- Icons: simple line icons (mail, lock, visibility) — NEVER emoji icons
- One primary CTA only

ANTI-PATTERNS (NEVER)
- Purple/pink AI gradients, glassmorphism, neon glow
- Cream background + terracotta accent cliché
- Broadsheet hairline newspaper layout
- Three equal feature cards / testimonials / pricing / fake stats
- Centered white-on-white empty page with invisible logo
- English copy on this screen
- Stock photos of gyms/athletes competing with the form
- Second brand accent fighting #0C4CC8 (logo colors are identity, not button rainbow)

════════════════════════════════════
3) SCREEN TO DESIGN: LOGIN (DESKTOP)
════════════════════════════════════

Device: Desktop web, full viewport (~1440×900 artboard OK).

LAYOUT (exact)
Horizontal SPLIT, 100% height:
- LEFT ~40–45%: dark brand panel #0F172A
  - Centered colorful Micovi logo (yellow/blue/red figure)
  - Optional short Spanish line under logo: “Planifica. Ejecuta. Mide.”
  - Soft vignette only. No stock photography.
- RIGHT ~55–60%: canvas #F9FAFB with soft #E8F0FC wash
  - One white card (#FFFFFF), max-width ~420px, vertically centered
  - Border #E2E8F0, radius 24px, soft shadow

CARD CONTENT (Spanish, exact copy)
1) Headline: Hola de nuevo
2) Lede: Entra para seguir con tu plan de entrenamiento.
3) Email field — label “Email”, placeholder “tu@email.com”, mail icon
4) Password field — label “Contraseña”, placeholder “••••••••”, lock icon + show/hide
5) Row: checkbox “Recordarme” (left) + link “¿Olvidaste tu contraseña?” (right, #0C4CC8)
6) Primary button full width: “Entrar”
7) Footer: “¿No tienes cuenta? Regístrate” (Regístrate is bold link #0C4CC8)

QUALITY BAR
- High contrast; logo readable immediately
- Feels like premium coach software auth (Clerk clarity + Micovi sports identity)
- Ready to implement later in Angular Material (structure simple: split + card + form)

OUTPUT
A single polished login screen matching ALL rules above.
```

---

## MOBILE (segundo generate)

Misma sección 1–2 + esto:

```
MOBILE 390×844 login for Micovi.
Stack: compact dark header (#0F172A) with colorful logo + “Micovi”,
then the same white form card with identical Spanish copy and tokens.
No feature cards. No purple. Logo must stay colorful and visible.
```

---

## Después de Stitch

Cuando te guste el resultado, en Cursor:

```
Aplica el mockup Stitch del login a Angular Material.
Lee design-system/micovi/MASTER.md y pages/login.md.
Usa /images/dashboard.webp para el logo (multicolor).
NO tocar Session, cookies ni FormGroup.
Actualiza pages/login.md con el screen id nuevo.
```
