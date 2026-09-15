# README — Skills de diseño en Micovi

Guía para saber **cuándo** aplicar cada skill y **cómo** pedirlo en Cursor.
Stack del producto: **Angular + Material + SCSS**. Idioma UI: **español**.

Documento hermano (instalación/rutas): [`ui-ux-pro-max-skill.md`](./ui-ux-pro-max-skill.md)

**Brief + prompts listos de Micovi (planificado vs ejecutado):**
[`micovi-design-brief.md`](./micovi-design-brief.md)

**Stitch MCP (Cursor):** [`stitch-mcp-setup.md`](./stitch-mcp-setup.md)

---

## 1. Árbol de decisión (empieza aquí)

```
¿Qué quieres hacer?
│
├─ Mejorar una pantalla que YA existe
│     → redesign-existing-projects
│     → + frontend-design
│     → + ui-ux-pro-max
│     → + UNA *-ui-skills (opcional, ver §3)
│
├─ Pantalla NUEVA (producto: form, lista, wizard)
│     → frontend-design
│     → + ui-ux-pro-max
│     → + UNA *-ui-skills
│     → (NO design-taste-frontend si es tabla/dashboard/wizard)
│
├─ Landing / marketing / portfolio
│     → design-taste-frontend
│     → + frontend-design
│     → + stripe-ui-skills o vercel-ui-skills
│
├─ Login / registro / onboarding auth
│     → clerk-ui-skills + redesign + frontend-design
│
├─ Dashboard denso / listados / tablas
│     → linear-ui-skills o retool-ui-skills
│     → + redesign + ui-ux-pro-max
│
├─ El brief está vago (“hazlo bonito”)
│     → enhance-prompt  (PRIMERO)
│     → luego el flujo de arriba
│
├─ Quiero un DESIGN.md / tokens documentados
│     → taste-design  o  ui-ux-pro-max (--persist)
│     → o stitch-extract-design-md (desde código)
│
└─ Mockups en Google Stitch
      → requiere Stitch MCP
      → stitch-generate-design / stitch-code-to-design / …
```

**Reglas de oro**

1. **Una** skill `*-ui-skills` por pantalla (no mezclar Linear + Stripe).
2. Siempre decir: `Angular Material + SCSS` (no Tailwind/React/shadcn).
3. Una pantalla por chat da mejores resultados.
4. Sin Stitch MCP, ignora las skills `stitch::*` de generación/upload.

---

## 2. Skills de dirección (úsalas casi siempre)

### `frontend-design` (Anthropic)

| | |
|---|---|
| **Cuándo** | Nueva UI o rediseño: tipografía, layout, copy, anti-cliché “AI” |
| **Cuándo NO** | Solo arreglar un bug de CSS puntual |
| **Micovi** | Login, formularios, cualquier rediseño visual |

**Ejemplo**

```
Aplica frontend-design al login.
Plan corto (color, type, layout, principles) ANTES del código.
Evita cream+#D97757, card-kit SaaS y eyebrows ALL-CAPS.
Angular Material. Español.
```

---

### `redesign-existing-projects` (taste-skill)

| | |
|---|---|
| **Cuándo** | La pantalla **ya existe** y hay que subir calidad sin romper lógica |
| **Cuándo NO** | Greenfield total sin código previo |
| **Micovi** | create-sportsman, listados, auth, settings |

**Ejemplo**

```
Audita create-sportsman con redesign-existing-projects.
Lista 5 problemas (jerarquía, spacing, estados, mobile).
Luego aplica fixes en HTML/SCSS; no cambies APIs ni FormGroup.
```

---

### `ui-ux-pro-max`

| | |
|---|---|
| **Cuándo** | Checklist UX, paletas/estilos por dominio, design system generator |
| **Cuándo NO** | Solo necesitas copy o un color puntual |
| **Micovi** | Forms, dashboards, accesibilidad, responsive |

**Ejemplo (chat)**

```
Usa ui-ux-pro-max: checklist UX del formulario crear deportista
(errores, empty states, focus, 375/768/1024).
Stack Angular Material.
```

**Ejemplo (CLI)**

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py \
  "sports management SaaS dashboard" \
  --design-system --persist -p "Micovi"
```

---

### `design-taste-frontend` (taste-skill v2)

| | |
|---|---|
| **Cuándo** | Landing, portfolio, marketing, “wow” anti-slop |
| **Cuándo NO** | Dashboards, tablas, wizards multi-paso (lo dice la skill) |
| **Dials** | VARIANCE / MOTION / DENSITY (1–10) |

**Ejemplo**

```
Landing Micovi con design-taste-frontend.
VARIANCE=5 MOTION=3 DENSITY=4.
Audiencia: directores de colegio. Español.
```

---

### `enhance-prompt` (Stitch utilities)

| | |
|---|---|
| **Cuándo** | Tu pedido es vago; quieres un brief listo para diseñar |
| **Cuándo NO** | Ya tienes un brief claro y concreto |
| **MCP** | No obligatorio |

**Ejemplo**

```
enhance-prompt: quiero mejorar el registro de colegios,
3 pasos, Angular Material, tono serio deportivo.
Devuélveme solo el prompt mejorado.
```

---

### `taste-design` (Stitch utilities)

| | |
|---|---|
| **Cuándo** | Generar/actualizar un DESIGN.md premium anti-genérico |
| **Cuándo NO** | Implementar ya una pantalla concreta (usa redesign) |
| **MCP** | Ideal con Stitch; útil igual como guía local |

**Ejemplo**

```
Genera DESIGN.md Micovi con taste-design:
SaaS gestión deportiva, Angular Material, light mode,
audiencia admins de colegio. Guárdalo en design-system/micovi/MASTER.md
```

---

## 3. Sistemas de marca `*-ui-skills` (ihlamury) — elige UNO

Inspiración de tokens (color, type, spacing). **Adaptar** a Material; no clonar el producto.

| Skill | Momento ideal en Micovi | Ejemplo de prompt |
| --- | --- | --- |
| **clerk-ui-skills** | Login, registro, “olvidé contraseña” | `Auth login con clerk-ui-skills + redesign. Angular Material.` |
| **stripe-ui-skills** | Forms claros, pricing, onboarding light | `Formulario contacto estilo stripe-ui-skills (light, limpio).` |
| **linear-ui-skills** | Dashboard denso, listas, densidad | `Listado deportistas estilo linear (densidad, tipografía). Tema Material del proyecto.` |
| **notion-ui-skills** | UI calmada, contenido, settings | `Página settings estilo notion-ui-skills, mucho whitespace útil.` |
| **vercel-ui-skills** | Landing minimal B/N, chrome simple | `Hero landing Micovi estilo vercel-ui-skills.` |
| **retool-ui-skills** | Admin CRUD, herramientas internas | `CRUD de sedes estilo retool-ui-skills (denso, útil).` |

Otras 80+ están en `.agents/skills/` (Spotify, Airbnb, Mercury…). Úsalas solo si el brief pide ese look explícito.

**Ejemplo combinado (auth)**

```
Pantalla: login
Skills: clerk-ui-skills, redesign-existing-projects, frontend-design
Stack: Angular Material + SCSS
No romper Session / cookies HttpOnly
1) plan 5 líneas 2) cambios UI
```

---

## 4. Suite ui-ux-pro-max (menos frecuentes)

| Skill | Cuándo | Ejemplo |
| --- | --- | --- |
| **design-system** | Tokens CSS, escalas, specs de componentes | `Define tokens spacing/type para Micovi con design-system; mapear a Material.` |
| **brand** | Voz de marca, mensajes, guía | `Define tono de errores y CTAs Micovi con brand.` |
| **ui-styling** | Ideas Tailwind/shadcn | Solo como **inspiración**; reimplementar en Material. |
| **design** / **banner-design** / **slides** | Logo, CIP, banners, decks | `Banner LinkedIn Micovi con banner-design.` |

---

## 5. Stitch (Google Labs) — con y sin MCP

### Sin MCP (útiles ya)

| Skill | Cuándo | Ejemplo |
| --- | --- | --- |
| **enhance-prompt** | Brief vago | Ver §2 |
| **taste-design** | DESIGN.md | Ver §2 |
| **stitch-extract-design-md** | Extraer sistema desde código Angular | `Extrae DESIGN.md del módulo auth con stitch-extract-design-md.` |

### Con [Stitch MCP](https://stitch.withgoogle.com/docs/mcp/setup/)

| Skill | Cuándo | Ejemplo |
| --- | --- | --- |
| **stitch-generate-design** | Crear/editar pantallas en Stitch | `Genera 2 variantes del login en Stitch.` |
| **stitch-code-to-design** | Subir UI actual a Stitch | `Sube src/app/.../login a un proyecto Stitch.` |
| **stitch-loop** | Sitio multi-página desde un prompt | Landing marketing (no el core Angular) |
| **design-md** | DESIGN.md desde proyecto Stitch | `Analiza project X y genera DESIGN.md.` |

### Baja prioridad en Micovi (React/RN)

`stitch-react-components`, `stitch-react-native`, `react-vite-dashboard`, `shadcn-ui`, `remotion` — instaladas, pero el producto es **Angular**.

---

## 6. Matriz rápida “pantalla Micovi → skills”

| Pantalla / tarea | Skills recomendadas |
| --- | --- |
| Login | `clerk-ui-skills` + `redesign` + `frontend-design` |
| Registro (stepper) | `stripe-ui-skills` o `notion` + `redesign` + `frontend-design` + `ui-ux-pro-max` |
| Crear deportista | `redesign` + `frontend-design` + `ui-ux-pro-max` (+ `stripe` si quieres look form SaaS) |
| Listado / tabla | `linear` o `retool` + `redesign` + `ui-ux-pro-max` |
| Dashboard | `linear-ui-skills` + `ui-ux-pro-max` + `frontend-design` |
| Settings | `notion-ui-skills` + `redesign` |
| Landing pública | `design-taste-frontend` + `vercel`/`stripe` + `frontend-design` |
| DESIGN.md global | `taste-design` y/o `ui-ux-pro-max --persist` |
| Brief vago | `enhance-prompt` → luego la fila de arriba |

---

## 7. Plantilla de prompt (cópiala)

```
Pantalla: [login | create-sportsman | …]
Objetivo: [mejorar UX | rediseño visual | tokens]
Skills: [lista corta, máx 3–4]
Sistema UI (opcional, UNO): [clerk|stripe|linear|notion|vercel|retool]-ui-skills
Stack: Angular Material + SCSS (sin Tailwind/React/shadcn)
Idioma: español
Restricciones: no cambiar lógica de negocio ni APIs; preservar FormGroups
Entrega:
  1) Design read / plan (≤ 8 líneas)
  2) Diff en HTML/SCSS/TS
  3) Checklist UX (contraste, focus, mobile)
```

---

## 8. Anti-patrones (no hagas esto)

| Mal | Bien |
| --- | --- |
| “Aplica todas las skills” | 2–4 skills del árbol |
| Linear + Stripe + Spotify juntos | Una sola `*-ui-skills` |
| Taste-frontend en una tabla CRUD | `redesign` + `linear`/`retool` |
| Pedir shadcn porque Stitch lo trae | Angular Material |
| `stitch-generate-design` sin MCP | `enhance-prompt` / `taste-design` local |

---

## 9. Orden sugerido de trabajo en el producto

1. **Login** — clerk + redesign + frontend-design  
2. **Registro** — stripe/notion + redesign + ui-ux-pro-max  
3. **Crear deportista** — redesign + frontend-design + ui-ux-pro-max  
4. **Listados** — linear/retool + ui-ux-pro-max  
5. **DESIGN.md** — taste-design / ui-ux-pro-max persist  
6. **Landing** (si aplica) — design-taste-frontend  

---

## 10. Dónde están los archivos

| Qué | Dónde |
| --- | --- |
| Skills curadas Cursor | `.cursor/skills/` |
| Instalación completa npx | `.agents/skills/` |
| Esta guía | `docs/README-skills-diseno.md` |
| Instalación / update | `docs/ui-ux-pro-max-skill.md` |
