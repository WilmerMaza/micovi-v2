# Prompt Cursor — Auditoría y optimización de transiciones / loading (Micovi Angular 20)

**Fase 1 completada.** Este documento incluye el informe de auditoría del repo y el prompt
para la **Fase 2–4** (propuesta + implementación tras tu aprobación).

Stack real: Angular 20 · Signals · RxJS · Angular Material · SCSS · Inria Sans · MASTER Micovi.

---

## INFORME DE AUDITORÍA (baseline del repo)

### Arquitectura actual de loading

| Mecanismo | Archivo | Qué hace |
|-----------|---------|----------|
| Contador global | `src/app/shared/services/spinner.service.ts` | `_count` signal; `show()`/`hide()` con **1500 ms mínimo visible** |
| HTTP (todas las peticiones) | `src/app/core/interceptors/loading.interceptor.ts` | `show()` al enviar, `hide()` en `finalize()` — **sin opt-out** |
| Router (toda navegación) | `src/app/core/loading/provide-router-spinner.ts` | `show()` en `NavigationStart`, `hide()` en End/Cancel/Error |
| Overlay visual | `src/app/shared/components/spinner/spinner.ts` | Solo montado en `layout/home/layout.html` |
| Loading local auth | `register.html` + `register.scss` | Patrón correcto: UI en card + botón disabled |
| Login | `login.component.html` | **Sin** feedback visual de submit |
| Skeletons | — | **No existen** |
| `@angular/animations` | — | **No usado** en app |
| Resolvers | — | **Ninguno** |

### Problema UX principal (confirmado en código)

> **Cada cambio de ruta Y cada HTTP activan el mismo overlay global.**

Efectos colaterales:

1. Navegar `dashboard → sportsman` dispara spinner de router **+** posible HTTP del componente.
2. Peticiones rápidas (<300 ms) igual pasan por overlay; el **mínimo 1500 ms** las hace sentir lentas.
3. No hay **delay antes de mostrar** — aparece al instante; solo hay delay al ocultar.
4. Auth (login/register) ejecuta interceptor pero **no hay `<app-spinner>`** en esas rutas.
5. Texto legacy `loading..` en 3 templates — no funcional.

### Rutas lazy activas

```
/login, /registers          → loadComponent (auth)
/                           → JwtGuard → HomeLayout + app-spinner
  /dashboard                → loadComponent
  /sportsman                → loadChildren
    /                       → listado (SportsmanComponent)
    /create, /edit/:id      → formulario
/configuration              → ConfigLayout (sin app-spinner)
```

### Animaciones existentes (conservar)

- Shell: sidebar 180 ms, backdrop fade — **🟢 Mantener**
- Spinner: pulse + barra 1.4 s — **🟢 Mantener** (solo cuando overlay sea necesario)
- Register loading — **🟢 Referencia de patrón local**
- Logout modal enter — **🟢 Mantener**
- 404 confetti / rain — decorativo; **no tocar en esta pasada**

---

## TABLA DE RECOMENDACIONES (propuesta — pendiente implementación)

| Escenario | Estado actual | Problema | Patrón recomendado | Clasificación | Riesgo |
|-----------|---------------|----------|---------------------|---------------|--------|
| Navegación entre módulos (dashboard ↔ sportsman) | Spinner global vía router | Espera innecesaria en lazy rápido | **Sin overlay**; vista anterior visible hasta swap | 🔴 Eliminar router spinner | Bajo |
| Lazy chunk lento (>500 ms) | Spinner global | Bloquea toda la UI | Delay 300 ms → overlay **solo si sigue cargando** | 🔵 Mejorar | Medio |
| HTTP listado/tabla | Spinner global | No representa estructura | **Skeleton** acorde a `dinamic-table` + filtros | 🟡 Reemplazar | Medio |
| HTTP <300 ms | Spinner + min 1500 ms | Flicker / lentitud artificial | **No mostrar**; delay show 300 ms | 🔴 Eliminar feedback | Bajo |
| HTTP >500 ms (lectura) | Spinner global | Bloqueo total | Skeleton o spinner **localizado** en zona de datos | 🟡 Reemplazar | Medio |
| Guardar / crear / eliminar | Spinner global (HTTP) | Bloquea pantalla entera | **Loading en botón** + disabled form | 🟡 Reemplazar | Bajo |
| Register submit | Local ✅ + HTTP interceptor | Doble señal (interceptor invisible aquí) | Mantener local; **excluir** POST register del interceptor global | 🔵 Mejorar | Bajo |
| Login submit | Sin feedback | Usuario no sabe si envió | Mismo patrón que register (inline en card) | 🔵 Mejorar | Bajo |
| Filtros / paginación | Spinner global | Parpadeo en cada filtro | **Inline** en tabla o fila skeleton; sin overlay | 🟡 Reemplazar | Medio |
| Logout | Spinner global | Aceptable pero pesado | Loading en botón modal "Cerrando sesión…" | 🔵 Mejorar | Bajo |
| Bootstrap `/auth/me` | Interceptor sin UI | Contador fantasma | Excluir URL o no contar pre-layout | 🔵 Mejorar | Bajo |
| Dashboard | Sin HTTP en init | — | **Sin feedback** (contenido inmediato) | 🟢 Mantener | — |

---

## MAPA DE EXPERIENCIA (actual vs objetivo)

### Actual — dashboard → sportsman

```text
Click sidebar
  → NavigationStart → spinner.show()
  → Lazy chunk (50–200 ms típico)
  → NavigationEnd → spinner.hide() [espera min 1500 ms]
  → Component ngOnInit → HTTP → spinner.show() otra vez
  → Respuesta → hide() [otros 1500 ms]
  → Usuario percibe ~1.5–3 s de overlay aunque la red fue rápida
```

### Objetivo

```text
Click sidebar
  → Vista anterior permanece (sin overlay)
  → Chunk + datos en paralelo
  → Si >300 ms sin contenido → skeleton en zona tabla (no overlay)
  → Contenido reemplaza skeleton
```

---

## REGLA DE ORO MICOVI

1. **Overlay global** → solo operaciones que **realmente bloquean** toda la app (ej. sesión crítica).
2. **Skeleton** → listados/tablas donde el layout ya es conocido.
3. **Button loading** → mutaciones (POST/PUT/DELETE).
4. **Nada** → navegación rápida, dashboard estático, respuestas <300 ms.
5. **Motion MASTER 3/10** — sin animaciones de ruta decorativas; sin View Transitions API salvo beneficio medido.

---

# PROMPT DE IMPLEMENTACIÓN (copiar desde aquí)

```
Actúa como Senior/Staff Frontend Engineer + Product Designer en Micovi (Angular 20).

## Objetivo
Optimizar estados de carga y transiciones SIN llenar la app de spinners.
Eliminar feedback innecesario; usar el patrón correcto en el momento correcto.
NO modificar identidad visual (MASTER): colores, tipografía, espaciados, layout.

## Contexto auditado (NO re-auditar desde cero; validar y ajustar)
- SpinnerService: contador + min visible 1500 ms (`spinner.service.ts`)
- loadingInterceptor: TODAS las HTTP → spinner (`loading.interceptor.ts`)
- provideRouterSpinner: TODA navegación → spinner (`provide-router-spinner.ts`)
- Overlay: solo en `layout/home/layout.html` → `app-spinner`
- Register: loading local correcto; Login: sin loading
- Sin skeletons; sin @angular/animations; sin resolvers
- Legacy `loading..` en sportsman/entrenador/ejercicios templates

## Skills (orden; conflicto → gana MASTER)
1. `design-system/micovi/MASTER.md` — Motion 3/10, densidad cabina, #0C4CC8
2. `.cursor/skills/redesign-existing-projects/SKILL.md`
3. `.cursor/skills/frontend-design/SKILL.md`
4. `.cursor/skills/ui-ux-pro-max/SKILL.md`
   - Buscar: `python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "loading delay threshold" --domain ux`
   - Buscar: `python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "skeleton table loading" --domain ux`
5. NO stitch-*; NO paletas ajenas (clerk purple, etc.)

## Metodología OBLIGATORIA

### Paso 1 — Propuesta (ANTES de código)
Entrega tabla por escenario con columnas:
| Escenario | Actual | Problema UX | Patrón | Archivos | Riesgo | Impacto visual |
Espera mi ✅ antes de implementar.

### Paso 2 — Implementación por fases (solo tras aprobación)

#### Fase A — Infraestructura loading (prioridad alta)
Archivos candidatos:
- `src/app/shared/services/spinner.service.ts`
- `src/app/core/interceptors/loading.interceptor.ts`
- `src/app/core/loading/provide-router-spinner.ts`

Cambios propuestos (justificar cada uno):
1. **Eliminar o desactivar** spinner en `NavigationStart/End` para navegación normal.
   - Lazy loading rápido no debe mostrar overlay.
2. Añadir **delay antes de show** (~300 ms): si la operación termina antes, nunca mostrar spinner.
3. Reducir **min visible** de 1500 ms → ~300–400 ms (o eliminar si hay delay de show).
4. Header opt-out en interceptor: `X-Skip-Loading: true` para bootstrap, polling, refresh token.
5. Separar concerns: `LoadingService` con modos `global | local | none` si hace falta — mínimo diff.

#### Fase B — Feedback localizado
- Login: estado "Entrando…" en botón/card (mismo lenguaje que register loading).
- Mutaciones: `[disabled]` + texto en botón (`Guardando…`, `Eliminando…`).
- Eliminar texto `loading..` legacy; reemplazar por estado real o quitar.

#### Fase C — Skeletons (solo donde aporte)
- Sportsman listado: skeleton que refleje `dinamic-filter` + `dinamic-table` (título, filtros, filas).
- NO skeleton genérico; NO en dashboard (contenido estático/inmediato).
- Componente reutilizable opcional: `TableSkeletonComponent` — solo si reduce duplicación.

#### Fase D — NO hacer (salvo justificación medida)
- View Transitions API
- Animaciones de ruta (@angular/animations)
- Spinners en cada navegación
- Skeletons en formularios simples
- Cambios visuales MASTER

## Criterios de decisión (responder antes de cada cambio)
1. ¿El usuario realmente espera?
2. ¿Cuánto tiempo (<300 / 300–500 / >500 ms)?
3. ¿Puede ser localizado?
4. ¿Skeleton informa más que spinner?
5. ¿Aumenta percepción de velocidad?
6. ¿prefers-reduced-motion respetado?

## Accesibilidad
- `aria-busy`, `aria-live="polite"` en zonas que cargan
- No depender solo de animación
- Focus no atrapado en overlays breves

## Archivos a revisar
- `app.config.ts`, guards, `home.routes.ts`, `sportsman.routes.ts`
- `layout/home/layout.html`, sidenav navigation
- `features/sportsman/pages/sportsman/*`
- `shared/components/dinamic-table/*`, `dinamic-filter/*`
- `view/pages/auth/login/*`, `register/*`
- `shared/components/spinner/*` (mantener diseño; cambiar CUÁNDO se muestra)

## Entregables
1. Informe propuesta (tabla + mapa estados)
2. Tras mi OK: PR pequeño por fase (A → B → C)
3. Checklist final:
   - [ ] Navegación rápida sin overlay
   - [ ] HTTP rápidas sin flicker
   - [ ] Tablas con skeleton contextual
   - [ ] Acciones con button loading
   - [ ] MASTER intacto
   - [ ] prefers-reduced-motion
   - [ ] Sin regresiones auth

Empieza con Paso 1 (propuesta detallada). NO escribas código hasta mi aprobación.
```

---

## Variante corta

```
Audita y propone (sin código) optimización de loading Micovi:
- Quitar router spinner en nav rápida
- Interceptor: delay show 300 ms + opt-out header + bajar min visible 1500→300 ms
- Tablas → skeleton dinamic-table; acciones → button loading; login → como register
Skills: MASTER + redesign + frontend-design + ui-ux-pro-max
Tabla escenario→patrón→archivos→riesgo. Espera OK antes de implementar.
```

---

## Orden sugerido de implementación (post-aprobación)

1. **Fase A** — Infraestructura (mayor impacto en percepción de velocidad) — ✅ hecho
2. **Fase B** — Login + botones + limpiar `loading..` — ✅ hecho
3. **Fase C** — Skeleton sportsman (piloto reutilizable) — ✅ hecho
4. **Cierre / medición** — extender skeleton a otros listados cuando las rutas estén activas; QA con `USE_MOCK_SPORTSMAN = false`

### Fase D — Sin implementación (por diseño)

View Transitions API, animaciones de ruta, spinners por navegación, skeletons en forms simples y cambios MASTER **no aplican** salvo justificación medida futura.

---

## IMPLEMENTACIÓN (Fases A–C — completadas)

| Fase | Cambios principales |
|------|---------------------|
| **A** | `SpinnerService`: delay show 300 ms, min visible 350 ms. Interceptor: skip auth, mutaciones, `SKIP_LOADING`. Router spinner desregistrado en `app.config.ts`. |
| **B** | Login `Entrando…`, create-sportsman `Guardando…`, logout modal `Cerrando sesión…`, `loading..` quitado en sportsman. |
| **C** | `TableSkeletonComponent` + `isListLoading` en listado deportistas. |

**Archivos nuevos:** `loading.context.ts`, `shared/components/table-skeleton/*`

**QA skeleton:** poner `USE_MOCK_SPORTSMAN = false` en `sportsman.component.ts` o simular latencia de red.

### Checklist final

- [x] Navegación rápida sin overlay
- [x] HTTP rápidas sin flicker
- [x] Tablas con skeleton contextual (piloto sportsman)
- [x] Acciones con button loading
- [x] MASTER intacto
- [x] prefers-reduced-motion (spinner + skeleton)
- [x] Sin regresiones auth (bootstrap/refresh/login excluidos del interceptor)
