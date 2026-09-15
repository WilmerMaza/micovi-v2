# Micovi — Brief y prompts de diseño

Fuente de verdad para pedir DESIGN.md y pantallas a las Agent Skills.
Producto: planificación y control de carga de entrenamiento.

> **Prompt listo para copiar:** [`PROMPT-DESIGN-MD.txt`](./PROMPT-DESIGN-MD.txt)

---

## 1. Design read (una línea)

> Lectura: **SaaS operativo para entrenadores deportivos** (no landing creativa ni fintech).
> Audiencia: entrenadores y staff de institución; trabajo diario con planes, sesiones y números.
> Lenguaje: **claro, denso-útil, deportivo-profesional** (cancha + laboratorio: planificado vs ejecutado).
> Sistema: Angular Material + SCSS; tipografía existente Inria Sans en auth (respetar o evolucionar con criterio).
> Dials sugeridos: VARIANCE **4** · MOTION **3** · DENSITY **7** (cockpit de entrenamiento, no galería).

---

## 2. Qué es Micovi (para el agente)

**Micovi** permite al entrenador:

1. Planificar el entrenamiento de un deportista  
2. Definir la **carga/dosificación** de cada ejercicio  
3. **Ejecutar** la sesión  
4. **Registrar** resultados  
5. Obtener **indicadores automáticos** de qué tan cerca estuvo lo realizado de lo planificado  

### Cadena de dominio (navegación mental de la UI)

```
Institución
  → Entrenador
    → Deportista
      → Plan anual
        → Macrociclo
          → Microciclo
            → Sesión
              → Ejercicios
                → Dosificación
                  → Ejecución
                    → Evaluación
                      → Resultados / Gráficas
```

Cada pantalla debe dejar claro **en qué eslabón** está el usuario (breadcrumbs / contexto sticky).

### Concepto visual central

El producto gira alrededor del contraste:

| Planificado | Ejecutado | Indicador |
| --- | --- | --- |
| Meta / prescrito | Lo hecho | Gap / cumplimiento |

La UI debe hacer obvio ese trío (color semántico, tipografía numérica, gráficas), no esconderlo en cards decorativas.

---

## 3. Prompt maestro → generar DESIGN.md

Copia esto en un chat nuevo:

```
Skills: taste-design, frontend-design, ui-ux-pro-max
Stack: Angular Material + SCSS (sin Tailwind, sin React, sin shadcn)
Idioma UI y doc: español

Genera DESIGN.md para Micovi y guárdalo en:
design-system/micovi/MASTER.md

Producto:
Micovi es un SaaS para que el entrenador planifique el entrenamiento de un
deportista, defina la carga de cada ejercicio, ejecute la sesión, registre
resultados y obtenga indicadores automáticos de cumplimiento
(planificado vs ejecutado).

Jerarquía de dominio (la UI debe respetar esta profundidad):
Institución → Entrenador → Deportista → Plan anual → Macrociclo → Microciclo
→ Sesión → Ejercicios → Dosificación → Ejecución → Evaluación → Resultados/Gráficas

Audiencia: entrenadores y coordinadores deportivos en instituciones (colegios/clubes).
Uso: diario, en escritorio y tablet; móvil para consulta/registro rápido.

Atmósfera:
- Profesional deportivo, no “startup purple”
- Densidad 7/10 (datos y números visibles; no airy landing)
- Motion 3/10 (solo feedback de acción; sin scroll-theater)
- Variance 4/10 (layout predecible de producto; asimetría leve en auth/landing)

Dirección visual:
- Un acento (energía / cumplimiento), neutros fríos o cálidos consistentes
- Números de carga/kg/%/series en monoespaciada o tabular-nums
- Semántica clara: planificado / ejecutado / desviación (ok / bajo / sobre)
- Breadcrumbs o chip de contexto del ciclo (deportista + microciclo + sesión)
- Tablas y formularios densos > grids de cards iguales

Tipografía:
- Preferir continuidad con Inria Sans si ya está en auth; si propones otra,
  justificar y limitar a 1–2 familias (sans + mono para métricas)
- Prohibido: Inter como default genérico, serif en dashboard, ALL-CAPS eyebrows

Anti-patrones (NUNCA):
- Gradientes púrpura/neon “AI”
- Hero genérico con 3 feature cards
- Decoración que no ayude a leer planificado vs ejecutado
- Emojis como iconos

El DESIGN.md debe incluir:
1) Atmósfera y principios
2) Paleta con hex + roles (incl. planificado/ejecutado/desviación)
3) Tipografía y escala
4) Spacing / radius / elevación
5) Componentes: botón, input, tabla, chip de ciclo, KPI de cumplimiento, gráfica
6) Patrones de navegación en la jerarquía de dominio
7) Motion y accesibilidad
8) Lista explícita de anti-patrones
9) Mapa de pantallas prioritarias (auth, deportista, sesión, dosificación, resultados)

Antes del archivo: Design read en UNA línea.
```

---

## 4. Prompt corto (si ya existe MASTER.md)

```
Lee design-system/micovi/MASTER.md.
Pantalla: [NOMBRE]
Skills: redesign-existing-projects, frontend-design, ui-ux-pro-max
Stack: Angular Material + SCSS
Respeta la jerarquía:
Institución → … → Sesión → Dosificación → Ejecución → Resultados
Prioriza el trío planificado / ejecutado / indicador.
No cambies lógica ni APIs. Español.
1) plan ≤8 líneas 2) cambios UI
```

---

## 5. Prompts por eslabón (implementación)

### Auth (Institución / Entrenador)

```
Skills: clerk-ui-skills, redesign-existing-projects, frontend-design
Pantalla: login / registro
Micovi: acceso de entrenadores institucionales.
Confianza y claridad > marketing. Angular Material.
Mantén flujo cookies HttpOnly. Español.
```

### Deportista

```
Skills: notion-ui-skills o stripe-ui-skills, redesign, frontend-design, ui-ux-pro-max
Pantalla: crear / ficha deportista
Contexto: primer nodo operativo bajo el entrenador.
Formulario denso, errores accionables, mobile 375.
Angular Material. No romper FormGroups.
```

### Plan anual → Macro → Micro

```
Skills: linear-ui-skills, redesign, ui-ux-pro-max, frontend-design
Pantallas: timeline / lista de ciclos
Debe sentirse “planificación deportiva”: periodos, fechas, estado del ciclo.
Navegación clara al siguiente nivel (drill-down a sesión).
Densidad alta, sin card-kit genérico.
```

### Sesión → Ejercicios → Dosificación

```
Skills: retool-ui-skills o linear-ui-skills, redesign, ui-ux-pro-max
Pantalla: dosificación de ejercicios en sesión
El entrenador prescribe series/reps/carga/intensidad.
UI tipo “hoja de sesión”: tabla editable, columnas planificadas evidentes.
tabular-nums. Sticky: deportista + nombre de sesión.
Angular Material (table / form fields).
```

### Ejecución → Evaluación

```
Skills: redesign, frontend-design, ui-ux-pro-max
Pantalla: registro de ejecución
Entrada rápida de lo realizado vs lo prescrito.
Feedback inmediato si se desvía (sin alarmismo innecesario).
Priorizar teclado/tablet. Español, voz activa (“Guardar serie”, no “Submit”).
```

### Resultados / Gráficas

```
Skills: linear-ui-skills, ui-ux-pro-max (charts), frontend-design
Pantalla: indicadores planificado vs ejecutado
KPI de cumplimiento + gráfica de desviación por ejercicio/sesión/microciclo.
Un acento semántico; no arcoíris. Vacío: invitar a registrar ejecución.
Densidad 7–8. Angular Material + charts existentes del proyecto.
```

### Landing (solo marketing)

```
Skills: design-taste-frontend, frontend-design, vercel-ui-skills o stripe-ui-skills
VARIANCE=5 MOTION=3 DENSITY=4
Hero: el valor = “planificado vs ejecutado”, no stats genéricos.
Audiencia: instituciones deportivas. Español.
No uses este prompt para el dashboard interno.
```

---

## 6. enhance-prompt (si el pedido viene flojo)

```
enhance-prompt para Micovi:

Quiero [pantalla].
Contexto: entrenador planifica → dosifica → ejecuta → mide gap planificado/ejecutado.
Jerarquía: Institución→…→Sesión→Ejercicios→Dosificación→Ejecución→Resultados.
Stack: Angular Material. Densidad alta. Español.

Devuelve SOLO el prompt mejorado listo para Cursor.
```

---

## 7. Checklist al validar cualquier UI Micovi

- [ ] ¿Se ve en qué eslabón de la cadena está el usuario?  
- [ ] ¿Planificado / ejecutado / indicador son legibles en &lt;3 segundos?  
- [ ] ¿Los números de carga usan tipografía tabular?  
- [ ] ¿Evita look AI genérico (purple, 3 cards, eyebrows)?  
- [ ] ¿Funciona en 375 / 768 / 1024?  
- [ ] ¿Cumple MASTER.md si ya existe?  

---

## Historial

| Fecha | Nota |
| --- | --- |
| 2026-09-07 | Brief + prompts anclados al dominio planificado vs ejecutado y a la jerarquía de ciclos |
