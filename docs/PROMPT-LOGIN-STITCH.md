# Flujo: Login + Skills + Stitch

Orden recomendado para **no mezclar** mockup con código.

```
MASTER.md  →  (opcional) Stitch mockup  →  redesign Angular  →  checklist
```

---

## Fase 0 — Antes de empezar

1. Confirma en **Settings → MCP** que `stitch` está Connected y con tools > 0.  
2. Si pide auth: completa `mcp_auth` / reinicia Cursor.  
3. Ten abierto el contexto: `design-system/micovi/MASTER.md`.

---

## Fase 1 — Stitch (mockup visual, opcional)

**Objetivo:** explorar layout / atmósfera **sin tocar Angular**.

**Skills:** `stitch-generate-design` (+ MCP Stitch)  
**No uses aún:** redesign sobre archivos (salvo que quieras ir directo a Fase 2).

### Prompt A — generar en Stitch

```
Skills: stitch-generate-design, taste-design
Lee design-system/micovi/MASTER.md.

Genera en Stitch una pantalla de LOGIN para Micovi (desktop 1440 y mobile 375).

Producto: entrenadores de colegios/clubes entran para planificar y ejecutar entrenamiento.
Copy en español:
- Marca: Micovi
- Headline: Hola de nuevo
- Lede: Entra para seguir con tu plan de entrenamiento.
- Campos: Email, Contraseña, Recordarme, CTA "Entrar", link "Regístrate"

Restricciones MASTER:
- Azul Micovi #0C4CC8 único acento
- Neutros slate fríos (#F9FAFB / #0F172A / #64748B)
- Inria Sans
- Variance 4: split leve o card centrada (NO 3 feature cards, NO purple AI)
- Densidad auth: calmada pero product (no landing marketing)
- Un CTA primario; focus ring azul

Devuélveme: enlace/proyecto Stitch + breve descripción del layout elegido.
```

### Prompt B — (alternativa) subir el login actual a Stitch

```
Skills: stitch-code-to-design / stitch-extract-static-html
Sube el login actual de:
src/app/view/pages/auth/login/
a un proyecto Stitch "Micovi-Login" para usarlo como base y luego iterar variantes.
```

Cuando tengas el mockup que te guste → pasa a Fase 2.

---

## Fase 2 — Angular (implementación real)

**Objetivo:** aplicar MASTER (+ ideas de Stitch si hubo) **sin romper Session/cookies**.

**Skills (orden):**
1. `redesign-existing-projects` — auditar UI actual  
2. `frontend-design` — dirección anti-cliché  
3. `clerk-ui-skills` — ritmo auth limpio (inspiración, no SDK Clerk)  
4. `ui-ux-pro-max` — checklist accesibilidad / mobile  

### Prompt C — implementar (cópialo en un chat de Agent)

```
Lee design-system/micovi/MASTER.md (sección Auth).

Pantalla: login
Archivos:
- src/app/view/pages/auth/login/login.component.html
- src/app/view/pages/auth/login/login.component.scss
- src/app/view/pages/auth/login/login.component.ts (solo si hace falta presentación)

Skills:
- redesign-existing-projects
- frontend-design
- clerk-ui-skills
- ui-ux-pro-max

Stack: Angular Material + SCSS (sin Tailwind/React/shadcn)
Idioma: español

Restricciones:
- NO cambiar Session, cookies HttpOnly, MicoviApi ni lógica de login
- Preservar FormGroup (username, password, check)
- Mantener Inria Sans y Azul Micovi #0C4CC8
- Cards solo para el formulario; sin feature cards ni purple AI
- Mobile 375 / desktop 1024+

Si hay mockup Stitch en este chat, úsalo como referencia visual
pero adáptalo a Material (mat-form-field, mat-checkbox, etc.).

Entrega:
1) Design read (1 línea) + plan ≤8 líneas
2) Diff HTML/SCSS
3) Checklist: contraste, focus, reduced-motion, 375px
```

### Prompt D — sin Stitch (más rápido)

Igual que C, pero añade al final:

```
Sin Stitch: implementa directo desde MASTER.md + clerk-ui-skills.
```

---

## Fase 3 — Validar

| Check | OK |
|-------|-----|
| ¿Se siente MASTER (azul #0C4CC8, slate, Inria)? | |
| ¿CTA único “Entrar”? | |
| ¿Errores en español, accionables? | |
| ¿Recordarme sigue funcionando? | |
| ¿Login real sigue autenticando? | |
| ¿375px sin overflow feo? | |

---

## Qué skill en qué momento (login)

| Momento | Skill / tool |
|---------|----------------|
| Explorar looks | **Stitch MCP** + `stitch-generate-design` |
| Decidir atmósfera | `frontend-design` + MASTER |
| Tokens auth limpios | `clerk-ui-skills` |
| Cambiar HTML/SCSS existente | `redesign-existing-projects` |
| Checklist UX | `ui-ux-pro-max` |
| Landing marketing | `design-taste-frontend` — **NO** en login producto |

---

## Recomendación práctica

Para Micovi hoy:

1. Si quieres velocidad → **Prompt D** (solo Angular + MASTER).  
2. Si quieres explorar 2–3 looks → **Prompt A** (Stitch) → eliges uno → **Prompt C**.

No pidas “Stitch + redesign + todas las skills” en el mismo mensaje: primero mockup, luego código.
