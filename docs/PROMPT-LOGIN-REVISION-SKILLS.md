# Prompt Cursor — Revisar / rediseñar Login (sin Stitch)

Pega esto en el chat de Cursor cuando quieras **auditar y aplicar** el login
usando las skills locales (no Stitch MCP).

Referencia visual que te gusta: **Register**  
(`src/app/view/pages/auth/register/view/`).

---

## PROMPT (copiar desde aquí)

```
Revisa y rediseña el LOGIN de Micovi. NO uses Stitch ni MCP de Stitch.

### Skills (obligatorio, en este orden; ante conflicto gana MASTER)
1. Lee y aplica `design-system/micovi/MASTER.md`
2. Lee y aplica `design-system/micovi/DESIGN.md` (auth = patrón Register)
3. Sigue `.cursor/skills/redesign-existing-projects/SKILL.md`
4. Sigue `.cursor/skills/frontend-design/SKILL.md`
5. Sigue `.cursor/skills/ui-ux-pro-max/SKILL.md`
6. Usa `.cursor/skills/clerk-ui-skills/SKILL.md` SOLO para claridad de auth
   (jerarquía del formulario, estados, densidad del form).
   IGNORA colores/tipografía de Clerk (nada de accent púrpura, nada de Inter
   como identidad). Colores y type = MASTER + Register.

### Referencia visual canónica (la que me gusta)
Copia la atmósfera y estructura del REGISTER, no del split oscuro actual:
- Archivos: `src/app/view/pages/auth/register/view/register.html`
- Estilos: `src/app/view/pages/auth/register/view/register.scss`
Patrón:
- Canvas `#EEF2FB` + círculos decorativos suaves
- Una sola card blanca centrada (max ~420–480px), radius 16px, sombra slate
- Cabecera azul con gradiente `#0C4CC8 → #1A6AFF`
- Título + subtítulo en blanco + logo color a la derecha
- Cuerpo blanco con form denso
- CTA pill (radius 24px) con gradiente horizontal azul
- Footer muted bajo la card
- Mobile: padding más corto, botones full-width

### Archivos a tocar (solo UI)
- `src/app/view/pages/auth/login/login.component.html`
- `src/app/view/pages/auth/login/login.component.scss`
- Si hace falta markup mínimo en `login.component.ts` (clases/aria) — OK
- Actualiza `design-system/micovi/pages/login.md` con el nuevo patrón

### NO tocar (lógica)
- `Session`, cookies HttpOnly, CSRF
- FormGroup: `username`, `password`, `check`
- Flujo `sessionLogin()` / validaciones de negocio
- Servicios, repositorios, contratos API

### Logo
- Usar `/images/dashboard.webp` (amarillo/azul/rojo intactos)
- NO `iconomicovi-angular.svg` (es blanco)
- NO badge azul + invert
- En cabecera azul: logo color legible (~48–56px)

### Copy (español, exacto)
- Título: Hola de nuevo
- Subtítulo: Plataforma deportiva institucional
- Email / Contraseña / Recordarme / ¿Olvidaste tu contraseña?
- CTA: Entrar
- Pie: ¿No tienes cuenta? Regístrate
- Footer página: © 2026 — Plataforma Deportiva

### Tipografía
- Inria Sans (MASTER). No Inter como identidad.

### Entregable
1) Diagnóstico breve (5–8 bullets): qué tiene el login actual vs Register/MASTER
2) Aplicar el rediseño en HTML/SCSS
3) Checklist final: contraste logo, CTA pill, canvas, sin purple AI, sin split oscuro,
   FormGroup intacto, responsive

Empieza leyendo MASTER + register + login actuales; luego diagnostica; luego edita.
```

---

## Variante corta (si el contexto ya está cargado)

```
Rediseña login al estilo register (card + header azul + CTA pill).
Skills: redesign-existing-projects + frontend-design + ui-ux-pro-max.
Fuente de verdad: design-system/micovi/MASTER.md y DESIGN.md.
Referencia: register.scss/html. Solo HTML/SCSS login. No tocar Session/FormGroup.
Logo: /images/dashboard.webp color. Sin Stitch.
```

---

## Qué skills NO usar aquí

| Skill | Por qué no |
|-------|------------|
| Stitch / stitch-* | Pediste revisión sin Stitch |
| design-taste-frontend | Es auth denso, no landing “taste” |
| *-ui-skills genéricas en bloque | Una sola referencia de claridad (Clerk estructura); el resto confunde |
| shadcn / React / Tailwind | Stack del producto es Angular Material + SCSS |
