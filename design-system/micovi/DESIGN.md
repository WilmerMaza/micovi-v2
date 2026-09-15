---
name: Micovi
colors:
  canvas: '#EEF2FB'
  canvas-app: '#F9FAFB'
  surface: '#FFFFFF'
  surface-mist: '#E8ECF1'
  ink: '#0F172A'
  ink-alt: '#1D293D'
  muted: '#64748B'
  muted-alt: '#62748E'
  border: '#E2E8F0'
  border-strong: '#CBD5E1'
  primary: '#0C4CC8'
  primary-bright: '#1A6AFF'
  primary-pressed: '#0A3FA8'
  primary-soft: '#E8F0FC'
  on-primary: '#FFFFFF'
  brand-panel: '#0F172A'
  planned: '#64748B'
  executed: '#0C4CC8'
  ok: '#059669'
  under: '#B45309'
  over: '#DC2626'
  error: '#D32F2F'
  success: '#2E7D32'
typography:
  display:
    fontFamily: Inria Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline:
    fontFamily: Inria Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  title:
    fontFamily: Inria Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: '0'
  body:
    fontFamily: Inria Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: '0'
  label:
    fontFamily: Inria Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: '0'
  meta:
    fontFamily: Inria Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: '0'
  metric:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: '0'
roundedCorner: 8px
# Auth card: 16px | Auth CTA pill: 24px | App panels: 8–12px
---

# Design System: Micovi

**Product:** Spanish sports coaching SaaS for schools and clubs (Angular Material + SCSS).  
**Audience:** Coaches and coordinators — daily desktop/tablet ops desk, not a marketing landing.  
**Core idea:** PLANNED vs EXECUTED vs GAP (OK / Bajo / Sobre) — color **and** Spanish labels.  
**Hierarchy:** Institution → Coach → Athlete → Annual plan → Macrocycle → Microcycle → Session → Exercises → Dosage → Execution → Evaluation → Results.

| Dial | Level | Meaning |
|------|-------|---------|
| Density | 7/10 | Cabin, useful, compact — not airy gallery |
| Motion | 3/10 | 150–250 ms action feedback only |
| Variance | 4/10 | Predictable product; auth may use a distinctive card pattern |

**Stack constraints for handoff:** Angular Material · SCSS · no Tailwind · no React · no shadcn.  
**UI language:** Spanish only. Sentence case (“Entrar”, not “ENTRAR”).

---

## 1. Visual Theme & Atmosphere

Micovi feels like a **coach’s desk at a school or club**: professional sports operations, cold slate neutrals, one blue accent of energy. Calm institutional trust + athletic focus. Numbers (kg, series, %) come before prose.

**Key characteristics:**
- Cold blue-gray atmosphere (never cream, never purple AI)
- One brand accent: Micovi Blue `#0C4CC8`
- Dense forms and tables; cards only when they wrap interaction
- Auth screens use a soft blue canvas + white card with strong blue header (Register pattern — preferred)
- Logo mark: geometric athlete in **yellow + blue + red** — keep colors intact; never force white monochrome on light surfaces

**Forbidden looks:**
- Purple / pink / indigo “AI” gradients
- Cream background + terracotta accent
- Broadsheet newspaper chrome / ALL-CAPS eyebrows
- Three equal feature cards, fake stats, testimonials
- Neon glow, glassmorphism, pure `#000000`
- Emoji as icons; English copy on Spanish product screens

---

## 2. Color Palette & Roles

### Surfaces & text (cold slate)
| Token | Hex | Role |
|-------|-----|------|
| Canvas Auth | `#EEF2FB` | Register/login page background + soft decorative circles |
| Canvas App | `#F9FAFB` | App shell background |
| Surface | `#FFFFFF` | Cards, panels, dialogs |
| Mist | `#E8ECF1` | Input fills, zebra, inactive chips |
| Ink | `#0F172A` | Primary text (prefer over `#1D293D` when aligning to MASTER) |
| Ink Alt | `#1D293D` | Titles in auth body (Register legacy) |
| Muted | `#64748B` / `#62748E` | Labels, helpers, footer |
| Border | `#E2E8F0` | Dividers, outlines |
| Border Strong | `#CBD5E1` | Controls |
| Brand Panel | `#0F172A` | Optional dark surfaces; **not** pure black |

### Brand accent (single)
| Token | Hex | Role |
|-------|-----|------|
| Micovi Blue | `#0C4CC8` | CTA, links, focus, executed series |
| Blue Bright | `#1A6AFF` | Auth header / CTA gradient end (Register style) |
| Blue Pressed | `#0A3FA8` | `:active` |
| Blue Soft | `#E8F0FC` | Soft wash / selected row |
| On Blue | `#FFFFFF` | Text/icons on blue |

**Auth header & CTA gradient (Register pattern):**  
`linear-gradient(135deg, #0C4CC8 0%, #1A6AFF 100%)` for card header  
`linear-gradient(90deg, #0C4CC8 0%, #1A6AFF 100%)` for primary pill buttons

### Semantic (product)
| Token | Hex | Label (ES) |
|-------|-----|------------|
| Planned | `#64748B` | Planificado |
| Executed | `#0C4CC8` | Ejecutado |
| OK | `#059669` | Cumple |
| Under | `#B45309` | Bajo |
| Over / Error | `#DC2626` | Sobre / error |

Never use color alone for compliance — always add the Spanish label.

### Decorative auth circles (Register)
Low-opacity blobs on canvas: `#C7D8F866`, `#BFD0F54C`, `#D0E0FB66`.

---

## 3. Typography

**Primary:** Inria Sans (300, 400, 700) — humanist sans, product continuity.  
**Metrics:** JetBrains Mono or `tabular-nums` for kg, %, series, RPE.  
**Avoid:** Inter as default identity, Georgia/Times in product UI.

| Role | Size | Weight | Use |
|------|------|--------|-----|
| Display | 28px | 700 | Rare page titles |
| Auth headline | 24px | 700 | “Hola de nuevo”, “Regístrate” on blue header |
| Title | 18px | 700 | Step titles |
| Body | 15px | 400 | Forms, UI |
| Label | 13px | 400–700 | Field labels, table headers |
| Meta | 12px | 400 | Footers, step counters |
| CTA | 15px | 600–700 | Buttons |

Tracking: titles slightly tight (−0.02em); body 0. Leading body ~1.45.

---

## 4. Spacing / Radius / Elevation

**Rhythm:** 4 / 8. App padding 16–24px. Auth card padding 28–32px.

| Token | Value | Use |
|-------|-------|-----|
| radius-sm | 4px | Dense chips |
| radius-md | 8px | Inputs, app buttons |
| radius-lg | 12–16px | Auth card, dialogs |
| radius-pill | 24px | **Auth primary CTA only** (Register style) |

**Elevation:** mostly flat + 1px border. Auth card shadow:  
`0 8px 10px -6px rgba(226,232,240,0.8), 0 20px 25px -5px rgba(226,232,240,0.8)`.  
No neon outer glow.

---

## 5. Components

### Buttons
- **App primary:** solid `#0C4CC8`, white text, radius 8px, height ~36–44px.
- **Auth primary (Register):** pill radius 24px + horizontal blue gradient `#0C4CC8 → #1A6AFF`, white text, full width on auth forms.
- **Secondary:** stroked `#E2E8F0` / muted text, radius matching context (24px in auth, 8px in app).
- **Links:** `#0C4CC8`, bold for key actions (“Regístrate”).
- One primary CTA per zone. Motion ≤200ms.

### Inputs
- Auth: outline style, white fill, border `#E2E8F0` / `#CBD5E1`, radius 8px, Material prefix icons (mail, lock, business…).
- Focus ring 2px `#0C4CC8`. Error `#DC2626` + Spanish message.
- App: dense Material; numeric load fields right-aligned + tabular.

### Auth card (canonical — Register pattern)
1. Soft canvas `#EEF2FB` + 3 decorative circles  
2. Centered white card, max-width ~420–580px, radius 16px  
3. **Blue gradient header** with white title/subtitle + colorful logo on the right  
4. White body: form / stepper content  
5. Footer under card: muted copyright line  

**Login** = same shell, single-step form (no stepper).  
**Register** = same shell + custom stepper nodes in the blue header (Institución → Contacto → Representante → Acceso).

Do **not** default auth to dark split panels unless explicitly requested. Prefer Register sibling look.

### Logo
- Official mark: colorful athlete (yellow / blue / red). Asset: `dashboard.webp` or register logo PNG.
- On blue header: keep mark colorful and readable (~48–56px).
- Never white logo on white. Never wash out colors to flat white silhouette unless the background is dark and explicitly approved.

### Tables / KPIs (product screens)
- Dense tables over card grids.
- Planned = slate / dashed; Executed = Micovi Blue solid.
- KPI: value first + badge Cumple / Bajo / Sobre.

### Icons
Material Symbols / consistent SVG line set. Never emoji icons.

---

## 6. Layout Principles

- **Product shell:** predictable, dense, desktop-first; max content useful, not gallery whitespace.
- **Auth:** one centered composition (header blue + form). Mobile: same card, tighter padding; stack CTAs full width.
- **No** marketing hero stats on auth.
- **Spanish** everywhere on user-facing strings.

---

## 7. Auth screen recipes (for Stitch)

### Login
- Canvas `#EEF2FB` + soft circles  
- Card header: “Hola de nuevo” / “Plataforma deportiva institucional” + colorful logo  
- Body: Email, Contraseña, Recordarme + ¿Olvidaste…?, CTA **Entrar**, link Regístrate  
- Footer: `© 2026 — Plataforma Deportiva`

### Register
- Same shell; header “Regístrate” + stepper 1–4  
- Steps: Institución → Contacto → Representante → Acceso  
- Loading: sport ball icons + blue progress bar  
- Success / error states inside the same card

---

## 8. Do / Don’t (quick)

| Do | Don’t |
|----|-------|
| One accent `#0C4CC8` | Purple AI themes |
| Cold slate neutrals | Cream / terracotta |
| Colorful logo intact | Invisible white-on-white logo |
| Register-style auth card | Generic centered empty white void |
| Spanish sentence case | English / ALL CAPS CTAs |
| Pill gradient CTA on auth | Neon glow buttons |
| Density 7 forms | Airy 3-card marketing layouts |
