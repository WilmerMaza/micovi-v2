# Override: Login

Patrón canónico de auth (alineado a Register / `DESIGN.md`).  
Sin Stitch split oscuro. Sin cambios de lógica Session/cookies.

## Layout

| Token / patrón | Valor |
| --- | --- |
| Canvas | `#EEF2FB` + 3 círculos decorativos (`#C7D8F866`, `#BFD0F54C`, `#D0E0FB66`) |
| Card | Blanca centrada, max-width ~440px, radius 16px |
| Sombra | `0 8px 10px -6px / 0 20px 25px -5px` slate (`#E2E8F0`) |
| Cabecera | Gradiente `135deg #0C4CC8 → #1A6AFF` |
| Cuerpo | Form denso outline (Email, Contraseña, Recordarme, olvidé) |
| CTA | Pill radius 24px, gradiente horizontal `#0C4CC8 → #1A6AFF`, label **Entrar** |
| Footer página | `© 2026 — Plataforma Deportiva` (muted) |
| Mobile | Padding corto; CTA full-width; meta en columna |

## Copy (ES, exacto)

- Título cabecera: **Hola de nuevo**
- Subtítulo: **Plataforma deportiva institucional**
- Campos: Email / Contraseña / Recordarme / ¿Olvidaste tu contraseña?
- CTA: **Entrar**
- Pie card: ¿No tienes cuenta? **Regístrate**

## Logo

| Hacer | No hacer |
| --- | --- |
| `/images/logo_register.png` (~48–56px) a color en cabecera azul | `iconomicovi-angular.svg` |
| Amarillo / azul / rojo intactos (mismo asset que Register) | Badge azul + `invert` / monocromo |

## Tipografía

Inria Sans (MASTER). No Inter como identidad.

## Desviaciones respecto al MASTER genérico

| Token | MASTER | Login (auth) |
| --- | --- | --- |
| Layout | Card o split leve | **Card centrada** (hermana de Register); sin panel oscuro |
| Canvas | `#F9FAFB` app | `#EEF2FB` auth |
| CTA | sólido `#0C4CC8`, radius-md | pill 24px + gradiente (excepción auth Register) |
| Radius card | radius-auth legado | 16px (Register) |

## Archivos

- `src/app/view/pages/auth/login/login.component.html`
- `src/app/view/pages/auth/login/login.component.scss`
- Referencia visual: `src/app/view/pages/auth/register/view/register.{html,scss}`
