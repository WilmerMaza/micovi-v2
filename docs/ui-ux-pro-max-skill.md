# Skills UI/UX en Micovi v2

Documentación de **instalación** de las Agent Skills de diseño.

**Guía práctica (cuándo usar cada una + ejemplos de prompt):**
[`README-skills-diseno.md`](./README-skills-diseno.md)

## Por qué existen

Micovi es una app de gestión deportiva (colegios / deportistas) con Angular +
Material. Queremos que, al pedir mejoras visuales o pantallas nuevas, el agente
no improvise estilos genéricos: use reglas de diseño, checklist de UX y
recomendaciones por dominio, y evite el “look” templated típico de UIs
generadas por IA.

Se instaló **solo en este proyecto** (no global).

## Fuentes instaladas

| Paquete | Origen | Instalación |
| --- | --- | --- |
| **ui-ux-pro-max** (+ suite) | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | `uipro init --ai cursor` |
| **frontend-design** | [anthropics/claude-code](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) | Copia en `.cursor/skills/` |
| **taste-skill** | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | `npx skills add … --skill "…"` |
| **design-skills** (87) | [ihlamury/design-skills](https://github.com/ihlamury/design-skills) | `npx skills add ihlamury/design-skills -y` |
| **stitch-skills** (16) | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add google-labs-code/stitch-skills -y` |

## Ubicación (resumen)

```
.cursor/skills/          # Espejos curados + skills “siempre” de diseño
.agents/skills/          # Instalación completa via npx skills (+ Firebase)
```

### Stitch (Google Labs) — qué quedó

**16 skills** en `.agents/skills/`. Espejo curado en `.cursor/skills/`:

| Skill | Plugin | Prioridad Micovi |
| --- | --- | --- |
| **enhance-prompt** | utilities | Alta — pulir briefs de UI antes de diseñar |
| **taste-design** | utilities | Alta — DESIGN.md premium / anti-generic |
| **design-md** | utilities | Media — generar DESIGN.md desde proyecto Stitch |
| **stitch-extract-design-md** | design | Media — extraer DESIGN.md desde el código Angular |
| **stitch-generate-design** | design | Media — generar/editar pantallas en Stitch (**requiere MCP**) |
| **stitch-code-to-design** | design | Media — subir frontend a Stitch (**requiere MCP**) |
| **stitch-loop** | utilities | Baja — sitios multi-página vía Stitch |

Otras instaladas solo en `.agents/skills/` (menos útiles hoy en Micovi Angular):
`stitch-react-components`, `stitch-react-native`, `react-vite-dashboard`,
`remotion`, `shadcn-ui`, `stitch-manage-design-system`, `stitch-upload-to-stitch`,
`stitch-extract-static-html`, `site-md`.

### Prerrequisito Stitch MCP

Las skills `stitch::*` (generate, upload, code-to-design, etc.) necesitan el
servidor **Stitch MCP** configurado:

- Docs: [stitch.withgoogle.com/docs/mcp/setup](https://stitch.withgoogle.com/docs/mcp/setup/)
- Producto: [stitch.withgoogle.com](https://stitch.withgoogle.com)

Sin MCP, sí puedes usar **enhance-prompt**, **taste-design** y partes de
extracción local; las que hablan con la API de Stitch no completarán el flujo.

## Skills de dirección (stack Micovi)

| Skill | Uso | Prioridad |
| --- | --- | --- |
| **redesign-existing-projects** | Mejorar UI existente | **Alta** |
| **frontend-design** | Dirección estética anti-cliché | **Alta** |
| **ui-ux-pro-max** | Catálogo / checklist / generator | **Alta** |
| **enhance-prompt** / **taste-design** | Brief + DESIGN.md anti-slop (Stitch utils) | **Alta** |
| **design-taste-frontend** | Landing (no dashboards/tablas) | Media |
| **linear / stripe / clerk / notion / vercel / retool**-ui-skills | Tokens de un sistema (elegir **uno**) | Según brief |

## Cómo combinarlas (flujo recomendado)

1. **enhance-prompt** → brief claro.
2. **frontend-design** + **taste-design** (o design-taste) → dirección.
3. Opcional: **una** `*-ui-skills` (ej. `clerk-ui-skills` para auth).
4. **redesign-existing-projects** + **ui-ux-pro-max** → implementación Angular Material.
5. Opcional (con MCP): **stitch-extract-design-md** / **stitch-generate-design** para sincronizar con Stitch.

Siempre: **Angular Material + SCSS**; no introducir React/shadcn/Tailwind solo por la skill.

## Ejemplos de prompt

```
Mejora el login: enhance-prompt + clerk-ui-skills + redesign-existing-projects.
Angular Material. Sin MCP Stitch.
```

```
Extrae un DESIGN.md del módulo auth con stitch-extract-design-md
y crúzalo con taste-design.
```

```
(Con Stitch MCP) Genera 2 variantes del dashboard en Stitch
con stitch-generate-design a partir de nuestro DESIGN.md.
```

## Actualizar

```bash
npx skills add google-labs-code/stitch-skills -y
npx skills add ihlamury/design-skills -y
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend" -y
npx skills add https://github.com/Leonxlnx/taste-skill --skill "redesign-existing-projects" -y
uipro update
```

## Historial

| Fecha | Cambio |
| --- | --- |
| 2026-09-06 | ui-ux-pro-max + frontend-design + taste-skill + ihlamury/design-skills |
| 2026-09-06 | **stitch-skills** (16) de [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills); espejo curado; nota MCP |
