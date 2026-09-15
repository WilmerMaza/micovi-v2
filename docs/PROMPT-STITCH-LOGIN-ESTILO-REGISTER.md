# Prompt Stitch — Login estilo Register

Pégalo en **Stitch → Generate** (Desktop ~1440×900).

Antes (recomendado):
1. Sube `design-system/micovi/MASTER.md` como DESIGN.md  
2. Sube logo `public/images/dashboard.webp` (figura amarillo/azul/rojo)  
3. Si tienes `logo_register.png`, súbelo también

---

## PROMPT (copiar todo el bloque)

```
You are designing the LOGIN screen for MICOVI.
Match the visual language of Micovi’s existing REGISTER screen (the one the team loves).
Follow EVERY rule. Do not invent a generic SaaS / AI purple look.

════════════════════════════════════
1) PRODUCT
════════════════════════════════════
Micovi = Spanish sports coaching SaaS for schools and clubs.
Coaches plan training, dose exercise load, execute sessions, register results,
and see PLANNED vs EXECUTED indicators.

Hierarchy: Institution → Coach → Athlete → Annual plan → Macrocycle → Microcycle → Session → Exercises → Dosage → Execution → Evaluation → Results.

Audience: coaches / coordinators. Professional sports ops desk — not a landing page, not fintech neon, not “AI startup”.

Language of ALL UI copy: Spanish.

════════════════════════════════════
2) LAYOUT PATTERN = REGISTER (NOT split dark panel)
════════════════════════════════════
Use the SAME composition as Register:

- Full viewport centered layout
- Soft cold blue canvas background: #EEF2FB
- Three large soft blue decorative circles in the background (low opacity), same atmosphere as Register
- ONE white card centered, max-width ~420–480px (login is shorter than register)
- Card radius 16px
- Soft slate shadow: 0 8px 10px -6px rgba(226,232,240,0.8), 0 20px 25px -5px rgba(226,232,240,0.8)
- Small footer under the card: “© 2026 — Plataforma Deportiva” in #62748E, 12px

DO NOT use horizontal split with dark left panel.
DO NOT use three feature cards or testimonials.

════════════════════════════════════
3) CARD STRUCTURE (like Register header + white body)
════════════════════════════════════

A) BLUE HEADER (top of card, full width, no padding gap)
- Background: linear-gradient(135deg, #0C4CC8 0%, #1A6AFF 100%)
- Padding ~32px 32px 28px
- Left: title + subtitle in white
  - Title: “Hola de nuevo” — 24px, bold, white
  - Subtitle: “Plataforma deportiva institucional” — 14px, white 80% opacity
- Right: Micovi logo mark (colorful yellow/blue/red athlete figure OR register logo). Keep colors intact. Do NOT make logo white-on-blue monochrome washout. Size ~48–56px tall.
- Optional tiny brand line under subtitle is OK; keep header clean.

B) WHITE BODY (form)
- Padding ~28–32px
- Fields stacked, compact (density 7)
- Inputs: outline style (white fill, border #E2E8F0 / #CBD5E1), radius 8px, prefix icons (mail, lock)
- Focus: border/outline Micovi Blue #0C4CC8
- Labels muted #62748E / ink #1D293D

Form content (exact Spanish):
1. Email — label “Email”, placeholder “tu@email.com”
2. Password — label “Contraseña”, placeholder “••••••••”, show/hide toggle
3. Row: checkbox “Recordarme” (left) + text link “¿Olvidaste tu contraseña?” (right, #0C4CC8)
4. Primary CTA full width: “Entrar”
5. Footer line: “¿No tienes cuenta? Regístrate” (Regístrate = bold link #0C4CC8)

════════════════════════════════════
4) BUTTONS / CTA (match Register)
════════════════════════════════════
Primary “Entrar”:
- Full width
- Height ~40–44px
- Text WHITE
- Background: linear-gradient(90deg, #0C4CC8 0%, #1A6AFF 100%)
- Border-radius: 24px (pill, like Register success/retry buttons)
- Font weight 600–700, sentence case (NOT “ENTRAR”)
- No neon glow, no second accent color

Secondary links: plain text #0C4CC8, no pills clusters.

════════════════════════════════════
5) COLOR TOKENS (exact)
════════════════════════════════════
Canvas: #EEF2FB (register atmosphere) — soft circles in #C7D8F8 / #BFD0F5 at low opacity
Card: #FFFFFF
Header gradient: #0C4CC8 → #1A6AFF
Ink: #1D293D (or #0F172A)
Muted: #62748E / #64748B
Border: #E2E8F0
Accent: #0C4CC8 only
Error: #DC2626 / #D32F2F
Success green only if showing a success state (not needed on idle login)

FORBIDDEN:
- Purple / pink / indigo AI gradients
- Cream + terracotta
- Pure black #000
- White logo on white OR white logo washed on blue until invisible
- English copy
- Stock gym photos competing with the form
- Inter as the hero identity (prefer Inria Sans / clean humanist sans; Inter OK only if system forces it)

════════════════════════════════════
6) TYPOGRAPHY
════════════════════════════════════
Font: Inria Sans (preferred) or clean humanist sans.
Headline bold, body regular, sentence case.
No ALL-CAPS eyebrows. No “WORD — fragment” chrome.

════════════════════════════════════
7) QUALITY BAR
════════════════════════════════════
Must feel like the sibling of the Register wizard card:
same blue header energy, same soft blue canvas, same pill CTA,
same institutional sports product — just a shorter single-step login form.

Desktop first. High contrast. Logo readable immediately.
Ready to implement later in Angular Material + SCSS.

OUTPUT: one polished login screen following ALL rules above.
```

---

## Mobile (segundo generate)

```
Same Micovi login as register-style card, mobile 390×844.
Canvas #EEF2FB + soft circles.
Centered white card, blue gradient header (#0C4CC8→#1A6AFF) with “Hola de nuevo” + colorful logo.
Form: Email, Contraseña, Recordarme, Entrar (pill gradient CTA), Regístrate link.
Spanish only. No split layout. No purple.
```
