# Design System: Micovi

**Fuente de verdad visual** para UI de producto (Angular Material + SCSS).  
**Idioma de interfaz y documentación:** español.  
**Stack:** Angular Material · SCSS · sin Tailwind · sin React · sin shadcn.

| Dial | Nivel | Lectura |
|------|-------|---------|
| **Densidad** | `7/10` | Cabina de trabajo: tablas, kg, series y % visibles; no landing airy |
| **Motion** | `3/10` | Solo feedback de acción; sin scroll-theater ni loops perpetuos |
| **Variance** | `4/10` | Layout predecible de producto; asimetría leve solo en auth/landing |

**Continuidad tipográfica:** Inria Sans (ya en auth y `styles.scss`).  
**Acento único de marca:** Azul Micovi `#0C4CC8` (energía / foco / CTA).  
**Semántica de carga:** colores aparte para planificado / ejecutado / desviación (no cuentan como segundo acento de marca).

---

## 1. Atmósfera y principios

Micovi se siente como la mesa de un entrenador en club o colegio: **profesional deportivo**, sobrio, orientado a decisión. La UI prioriza **planificado vs ejecutado** sobre decoración. Densidad de trabajo diario en escritorio y tablet; móvil para consulta y registro rápido.

### Principios

1. **Jerarquía de dominio primero.** Toda pantalla declara en qué nivel está el usuario (Institución → … → Resultados). Sin contexto de ciclo, la UI está incompleta.
2. **Números primero.** Carga, kg, %, series, RPE y cumplimiento se leen antes que la prosa. Tipografía tabular/mono para métricas.
3. **Una decisión por zona.** Cada sección tiene un propósito: planificar, dosificar, ejecutar o evaluar — no mezclar marketing con cockpit.
4. **Tablas y formularios densos > grids de cards iguales.** Cards solo cuando envuelven una interacción (diálogo, picker, KPI tocable).
5. **Un acento, neutros fríos consistentes.** El azul Micovi empuja acciones; el resto es slate/zinc frío. Sin “startup purple”.
6. **Semántica explícita de cumplimiento.** OK / bajo / sobre se distinguen por color **y** etiqueta/patrón (nunca solo color).
7. **Motion al servicio de la acción.** 150–250 ms en hover/press/guardar; nada de revelados al scroll.
8. **Predecible en producto.** Auth/landing pueden tener split asimétrico leve; el app shell es simétrico y estable.

### Audiencia y uso

- **Quién:** entrenadores y coordinadores en instituciones (colegios/clubes).
- **Cuándo:** uso diario, sesiones reales, revisión de microciclo.
- **Dónde:** escritorio y tablet como primario; móvil para consulta/registro rápido.

---

## 2. Paleta (hex + roles)

Neutros **fríos** (slate). No mezclar grises cálidos cream/terracotta en producto.

### Superficies y texto

| Nombre | Hex | Rol |
|--------|-----|-----|
| **Lienzo Frío** | `#F9FAFB` | Fondo app / shell (ya en `body`) |
| **Superficie Pura** | `#FFFFFF` | Paneles, tablas, diálogos, inputs filled |
| **Tinta Pizarra** | `#0F172A` | Texto primario, títulos, valores críticos |
| **Acero Secundario** | `#64748B` | Metadatos, labels, breadcrumbs inactivos |
| **Niebla Muted** | `#E8ECF1` | Filas zebra suaves, chips inactivos, fill de input auth |
| **Borde Estructural** | `#E2E8F0` | Divisores, bordes de tabla, outlines |
| **Borde Fuerte** | `#CBD5E1` | Controles outline, focus-adjacent |
| **Scrim** | `rgba(15, 23, 42, 0.45)` | Overlay de modales |

Prohibido: `#000000` puro → usar Tinta Pizarra.

### Acento de marca (único)

| Nombre | Hex | Rol |
|--------|-----|-----|
| **Azul Micovi** | `#0C4CC8` | CTA primario, nav activa, focus ring, links de acción, serie “ejecutado” en gráficas |
| **Sobre Azul** | `#FFFFFF` | Texto/icono sobre Azul Micovi |
| **Azul Presionado** | `#0A3FA8` | `:active` / pressed del primario |
| **Azul Suave** | `#E8F0FC` | Hover de filas seleccionadas, chip de ciclo activo (fondo) |
| **Anillo Foco** | `#0C4CC8` | Outline 2–3px offset 2px (Material focus) |

Saturación del acento acotada; sin glow neón.

### Semántica planificado / ejecutado / desviación

| Nombre | Hex | Rol |
|--------|-----|-----|
| **Planificado** | `#64748B` | Serie/columna “plan”; borde dashed; texto de target |
| **Planificado Fill** | `#E2E8F0` | Barras planificadas, zonas objetivo |
| **Ejecutado** | `#0C4CC8` | Serie/columna “real”; valores registrados |
| **Cumplimiento OK** | `#059669` | Desviación dentro de umbral; badge “Cumple” |
| **OK Suave** | `#D1FAE5` | Fondo de celda/KPI ok |
| **Desviación Bajo** | `#B45309` | Ejecutado &lt; plan (carga insuficiente) |
| **Bajo Suave** | `#FEF3C7` | Fondo celda/KPI bajo |
| **Desviación Sobre** | `#DC2626` | Ejecutado &gt; plan (sobrecarga) / error destructivo |
| **Sobre Suave** | `#FEE2E2` | Fondo celda/KPI sobre |
| **Advertencia Neutra** | `#D97706` | Validación no bloqueante, avisos |

**Regla:** en tablas y gráficas, planificado = tono slate + estilo de trazo (dashed / hatch); ejecutado = Azul Micovi sólido; desviación = OK/Bajo/Sobre **con etiqueta en español** (“Cumple”, “Bajo”, “Sobre”).

### Tokens SCSS sugeridos

```scss
$micovi-canvas: #F9FAFB;
$micovi-surface: #FFFFFF;
$micovi-ink: #0F172A;
$micovi-muted: #64748B;
$micovi-border: #E2E8F0;
$micovi-accent: #0C4CC8;
$micovi-planned: #64748B;
$micovi-executed: #0C4CC8;
$micovi-ok: #059669;
$micovi-under: #B45309;
$micovi-over: #DC2626;
```

Mapeo Angular Material: `primary` → Azul Micovi; superficies → Lienzo/Superficie; `error` → Desviación Sobre. Preferir theming M3 por tokens (`mat.theme`) frente a `::ng-deep` ad-hoc.

---

## 3. Tipografía y escala

### Familias (máximo 2)

| Rol | Familia | Por qué |
|-----|---------|---------|
| **UI / Display / Body** | **Inria Sans** (300, 400, 700) | Continuidad con auth y tema global; carácter humanista sin Inter genérico |
| **Métricas** | **JetBrains Mono** (400, 500) *o* `font-variant-numeric: tabular-nums` en Inria si mono no está cargada | kg, %, series, RPE, deltas de cumplimiento — alineación en columnas |

No introducir serif en dashboard. No Inter como default. No ALL-CAPS eyebrows.

### Escala (producto denso)

| Token | Tamaño | Peso | Uso |
|-------|--------|------|-----|
| `display` | `1.75rem` / 28px | 700 | Título de página (raro; auth/landing) |
| `h1` | `1.375rem` / 22px | 700 | Nombre de deportista / sesión |
| `h2` | `1.125rem` / 18px | 700 | Bloques (Dosificación, Evaluación) |
| `h3` | `1rem` / 16px | 700 | Subsecciones de formulario |
| `body` | `0.9375rem` / 15px | 400 | Texto UI, celdas |
| `label` | `0.8125rem` / 13px | 400–700 | Labels de campo, headers de tabla |
| `meta` | `0.75rem` / 12px | 400 | Timestamps, ayuda |
| `metric` | `0.875–1.25rem` | 500 mono/tabular | kg, %, series, KPI |
| `metric-lg` | `1.5rem` / 24px | 700 mono/tabular | KPI de cumplimiento destacado |

- Tracking títulos: `-0.01em` a `0`; body: `0`.
- Leading body: `1.45` (denso); métricas: `1.2`.
- Prosa larga (ayuda): máx. ~65ch; en tablas no aplica.
- Sentence case en UI (“Guardar sesión”, no “GUARDAR SESIÓN”).

### Iconografía

SVG lineales consistentes (Material Symbols / set único del proyecto). **Nunca emojis como iconos.**

---

## 4. Spacing / radius / elevación

### Spacing (ritmo 4/8 — densidad 7)

| Token | Valor | Uso |
|-------|-------|-----|
| `space-1` | `4px` | Gap icono-texto, padding interno chip |
| `space-2` | `8px` | Entre campos compactos, celdas |
| `space-3` | `12px` | Padding de fila de tabla |
| `space-4` | `16px` | Padding de panel, gap de form groups |
| `space-5` | `20–24px` | Entre bloques de sección |
| `space-6` | `32px` | Separación mayor en página (máximo habitual en app) |

App shell: padding contenido `16–24px`. Evitar huecos de landing (`48–96px`) dentro del producto.

### Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `radius-sm` | `4px` | Inputs densos, celdas editables |
| `radius-md` | `6–8px` | Botones, chips, dropdowns |
| `radius-lg` | `12px` | Paneles / diálogos compactos |
| `radius-auth` | `1.5–3rem` | Solo card de auth (legado visual del login) |
| `radius-pill` | evitar | No pills decorativas; chips de ciclo = `radius-md` |

### Elevación

Producto **casi plano**: borde 1px + superficie. Sombras solo en overlays.

| Nivel | Valor | Uso |
|-------|-------|-----|
| `elev-0` | ninguno + borde | Tablas, formularios, KPI en línea |
| `elev-1` | `0 1px 2px rgba(15,23,42,0.06)` | Barra sticky opcional |
| `elev-2` | `0 8px 24px rgba(15,23,42,0.12)` | Menús, popovers |
| `elev-3` | `0 16px 40px rgba(15,23,42,0.18)` | Modales |

Sin glow exterior neón. Sombras tintadas al slate, no negro puro agresivo.

---

## 5. Componentes

### Botón

- **Primario:** fondo Azul Micovi, texto blanco, `radius-md`, padding `8px 16px` (altura ~36–40px en desktop; ≥44px touch en móvil).
- **Secundario:** outline Borde Fuerte / Azul Micovi, fondo transparente; hover Azul Suave.
- **Tercario / texto:** link-button sin caja; solo para acciones auxiliares.
- **Destructivo:** Desviación Sobre, uso excepcional (borrar plan, abortar).
- **Estados:** hover oscurece 4–6%; active `translateY(1px)` o `scale(0.98)` ≤150ms; disabled opacity ~0.4 + `aria-disabled`.
- **No:** gradientes, glow, iconos emoji, CTAs dobles competidores en la misma zona.

### Input / formularios densos

- Label **arriba** (o `mat-label` Material sin flotante agresivo en dosificación).
- Fill Niebla Muted o Superficie + borde inferior/contorno Borde Estructural.
- Focus: anillo Azul Micovi 2px; error: borde Desviación Sobre + mensaje debajo en español.
- Validación preferente **on blur** / al guardar fila; no gritar en cada tecla.
- Campos numéricos de carga: `inputmode="decimal"`, alineación derecha, mono/tabular.
- Densidad Material: preferir `density: -1` o `-2` en tablas/forms de sesión (alineado a dial 7).
- Reactive forms tipados (stack Angular); `FormArray` para listas de ejercicios/series.

### Tabla

- Cabecera sticky, `label` 13px, peso 700, fondo Lienzo o Superficie.
- Filas `space-3` vertical; zebra opcional Niebla muy sutil.
- Columnas de métricas alineadas a la derecha, mono/tabular.
- Comparación plan vs real: columnas adyacentes o subceldas `plan / real / Δ`.
- Acciones de fila en menú `⋯` o icon-buttons con nombre accesible; bulk edit cuando haya selección múltiple.
- Móvil: `overflow-x: auto` en wrapper; no romper el layout. Alternativa: filas apiladas solo si la tabla deja de ser usable.
- Preferir `mat-table` / CDK table frente a grid de cards.

### Chip de ciclo (contexto)

Siempre visible en vistas de sesión/dosificación/resultados:

```
[ Deportista ] › [ Microciclo ] › [ Sesión ]
```

- Fondo Azul Suave o Niebla; texto Tinta; separadores `›` o chevron SVG.
- Chip activo: borde Azul Micovi 1px.
- Clic abre selector del nivel correspondiente (no navegar a ciegas).
- Complementa breadcrumbs del shell; no sustituye la jerarquía completa Institución→… si el rol es coordinador.

### KPI de cumplimiento

- Bloque compacto (no card ornamental): etiqueta + valor grande mono + estado.
- Valor: `% cumplimiento` o `Δ kg / Δ %`.
- Estado con badge: **Cumple** (OK), **Bajo**, **Sobre** — color + texto.
- Opcional: bullet bar mini (plan = track slate, real = barra azul, marcador de target).
- En dashboards, 3–6 KPIs en fila densa; no “hero stats” inventados.

### Gráfica

| Necesidad | Tipo preferido |
|-----------|----------------|
| Plan vs ejecutado por ejercicio/sesión | Barras agrupadas (plan slate / ejecutado azul) |
| Cumplimiento vs umbral (1 KPI) | Bullet chart o barra con marcador |
| Tendencia en micro/macro | Línea (ejecutado) + banda o línea dashed (plan) |
| Perfil multi-indicador (pocos ejes) | Radar solo si ≤6 ejes y hay tabla alternativa |

Reglas:

- Etiquetas directas; leyenda en español (“Planificado”, “Ejecutado”).
- Color no es el único canal: dashed vs sólido, o patrones.
- Tooltip con valores exactos; fallback tabla bajo la gráfica.
- Librería existente del proyecto / Chart.js / similar; sin pie/donut para cumplimiento preciso.
- Datos reales o placeholders `[métrica]`; nunca inventar “99.9% uptime” de marketing.

---

## 6. Patrones de navegación (jerarquía de dominio)

```
Institución
  └─ Entrenador
       └─ Deportista
            └─ Plan anual
                 └─ Macrociclo
                      └─ Microciclo
                           └─ Sesión
                                └─ Ejercicios
                                     └─ Dosificación
                                          └─ Ejecución
                                               └─ Evaluación
                                                    └─ Resultados / Gráficas
```

### Reglas de navegación

1. **Drill-down explícito.** Cada nivel superior deja rastro en breadcrumb + chip de ciclo.
2. **Contexto pegajoso.** Al entrar a Sesión, el shell recuerda Deportista + Microciclo + Sesión hasta cambio consciente.
3. **Atajos de trabajo diario.** Desde Deportista: “Sesión de hoy” / microciclo activo — sin obligar a bajar todo el árbol cada vez.
4. **Roles:** coordinador ve Institución/Entrenadores; entrenador entra tipicamente en Deportista→Microciclo.
5. **Profundidad en móvil:** ocultar niveles altos en menú “Más”; priorizar Sesión, Ejecución, Resultados.
6. **Back:** vuelve un nivel de dominio, no a home genérico.
7. **Estados vacíos** con CTA al siguiente paso del árbol (“Crear microciclo”, “Añadir ejercicio”), no copy de marketing.

### Shell de producto

- Sidenav o top-nav estable; item activo en Azul Micovi.
- Área de contenido max ~1400px; tablas full-bleed del content pane.
- Auth/landing: split o card centrada (variance 4); producto: grid simétrico predecible.

---

## 7. Motion y accesibilidad

### Motion (3/10)

| Permitido | Prohibido |
|-----------|-----------|
| Hover/press 150–200ms (`opacity` / `transform`) | Scroll-triggered reveals, parallax |
| Fade de snackbar/toast al guardar | Stagger cinematográfico de listas largas |
| Skeleton shimmer en carga de tabla | Spinners genéricos como único feedback |
| Transición de valor KPI ≤250ms | Loops perpetuos (pulse/float) en dashboard |
| `prefers-reduced-motion: reduce` → sin movimiento | Animar `width`/`height`/`top`/`left` |

Easing: `cubic-bezier(0.2, 0, 0, 1)` o equivalente Material; no linear chamuscado.

### Accesibilidad

- Contraste texto normal ≥ **4.5:1** (Tinta/Acero sobre Lienzo/Superficie).
- Foco visible siempre (Anillo Foco); orden de foco = orden visual.
- Icon-only buttons: `aria-label` en español.
- Semántica de desviación: color + texto (+ icono si aplica).
- Tablas: headers asociados; sort con `aria-sort`.
- Touch ≥44×44px en tablet/móvil; densidad visual no reduce hit area.
- Formularios: errores inline + resumen al submit si hay múltiples.
- Respetar `prefers-reduced-motion`.
- No depender de scrollbars ocultos como única señal de más contenido (el app hoy oculta scrollbars — asegurar affordance alternativa: cortes, “ver más”, paddings).

---

## 8. Anti-patrones (NUNCA)

- Gradientes púrpura / neon “AI”, glows, glassmorphism decorativo.
- Hero genérico con **3 feature cards** iguales.
- Decoración que no ayude a leer **planificado vs ejecutado**.
- Emojis como iconos o bullets.
- **Inter** como fuente default genérica.
- Serif en dashboard / software UI.
- ALL-CAPS eyebrows / labels “METRIC // 2026”.
- Negro puro `#000000`.
- Cards en hero o grids ornamentales de cards donde baste una tabla.
- Inventar métricas, uptime, o stats de marketing.
- Copy AI: “Elevate”, “Seamless”, “Unleash”, “Next-Gen” (ni equivalentes en español vacío).
- “Scroll to explore”, chevrons rebotando, scroll-theater.
- Mezclar grises cálidos cream + acento terracotta (cliché AI) con el sistema frío Micovi.
- Segundo acento de marca compitiendo con Azul Micovi (la semántica OK/Bajo/Sobre no es “marca”).
- Pills `rounded-full` decorativas en cluster.
- Centrar todo el app shell como landing.
- Sobreescribir Material con `::ng-deep` masivo en lugar de tokens de tema.

---

## 9. Mapa de pantallas prioritarias

| Pantalla | Objetivo | Layout | Notas UI |
|----------|----------|--------|----------|
| **Auth (login/registro)** | Entrar con fricción baja | Card o split leve (variance 4); Inria Sans; Azul Micovi en links/CTA | Continuidad con login actual; sin feature cards; un CTA primario |
| **Deportista** | Identidad + acceso al plan/microciclo activo | Cabecera con nombre + chip de ciclo; lista/tabla de planes/microciclos | KPI resumen de cumplimiento del microciclo activo; no collage de cards |
| **Sesión** | Orquestar ejercicios del día | Chip de ciclo sticky; tabla/lista ordenada de ejercicios; acciones Ejecutar / Dosificar | Densidad alta; estados vacío → “Añadir ejercicio” |
| **Dosificación** | Definir series, kg, %, descanso por ejercicio | Formulario denso / tabla editable; inputs numéricos mono | Validación blur; comparar con dosificación previa del microciclo si existe |
| **Ejecución** *(flujo ligado)* | Registrar lo realizado | Misma estructura que dosificación; columnas plan (slate) vs real (azul) | Feedback inmediato al guardar set; móvil-friendly |
| **Resultados / Gráficas** | Cumplimiento planificado vs ejecutado | KPIs + barras agrupadas / bullet + tabla detalle | Semántica Cumple/Bajo/Sobre; tabla siempre como fallback a11y |

### Prioridad de implementación visual

1. Shell + chip de ciclo + tabla de sesión  
2. Dosificación / ejecución (números)  
3. Resultados (KPI + gráfica plan vs real)  
4. Deportista (hub)  
5. Auth (alineación al sistema sin romper flujos)

---

## Implementación (Angular Material + SCSS)

- Tema global en `styles.scss` vía `mat.theme`: primary alineado a `#0C4CC8`, typography Inria Sans, density negativa en módulos de sesión.
- Variables SCSS / CSS custom properties por roles de esta MASTER; páginas pueden sobreescribir en `design-system/micovi/pages/<pantalla>.md` sin romper el Master.
- Componentes: preferir API Material (button, form-field, table, chips, dialog, snackbar) estilizados con tokens, no HTML “card kit” genérico.
- Gráficas: accesibles (tabla + color/patrón); textos de UI en español.

---

## Checklist pre-entrega

- [ ] Sin emojis como iconos  
- [ ] Inria Sans + métricas mono/tabular  
- [ ] Un acento de marca (`#0C4CC8`); semántica OK/Bajo/Sobre etiquetada  
- [ ] Chip/breadcrumb de ciclo en sesión/dosificación/resultados  
- [ ] Tablas densas > grids de cards  
- [ ] Contraste ≥4.5:1; foco visible; `prefers-reduced-motion`  
- [ ] Viewports 375 / 768 / 1024 / 1440  
- [ ] Ningún anti-patrón de la §8  

---

*Master Micovi — usar como fuente global. Overrides por pantalla en `design-system/micovi/pages/`.*
