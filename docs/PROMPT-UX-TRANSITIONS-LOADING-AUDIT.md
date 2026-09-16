# Auditoría y optimización — Arranque, loading y bundle (Micovi Angular 20)

**Estado: cerrado (Fases A–C loading + Fases 1–5 arranque/performance).**  
Stack: Angular 20 · Signals · RxJS · Angular Material · SCSS · Inria Sans self-hosted · MASTER Micovi.

---

## Resumen ejecutivo

| Objetivo | Resultado |
|----------|-----------|
| Eliminar pantalla en blanco en arranque | ✅ Boot-shell HTML + shell Angular + placeholders |
| No spinner global por defecto | ✅ Router spinner off; HTTP con delay 300 ms |
| App shell progresivo | ✅ HomeLayout / ConfigLayout antes del guard |
| Skeleton contextual | ✅ Tabla deportistas + outlet dashboard/tabla |
| Bundle inicial producción | ✅ **843 KB** raw / **~197 KB** gzip (antes **1.04 MB** / ~232 KB) |
| Budget `angular.json` 1 MB | ✅ Pasa (warning 500 KB warning persiste) |

---

## Arquitectura final de loading

| Mecanismo | Archivo | Comportamiento |
|-----------|---------|----------------|
| Boot-shell pre-JS | `src/index.html` | `boot-app` / `boot-auth` / `boot-config` según URL |
| Auth bootstrap | `auth.ts` + `app.config.ts` | `startBootstrap()` **no bloqueante**; guards esperan |
| Shell home | `layout/home/*` | Nav + sidenav + outlet; guard solo en hijos |
| Placeholder outlet | `outlet-placeholder/*` | Delay **300 ms**; variantes `dashboard` \| `table` |
| Listados tabulares | `list-route-patterns.ts` | `/sportsman`, `/entrenador`, `/ejercicios` → skeleton tabla |
| Shell configuración | `layout/config/*` | Cabecera + outlet + placeholder drawer |
| Spinner global | `spinner.service.ts` | Delay show 300 ms, min visible 350 ms |
| HTTP interceptor | `loading.interceptor.ts` | Skip auth, mutaciones, `SKIP_LOADING` |
| Router spinner | `provide-router-spinner.ts` | **Desactivado** (no registrar) |
| Skeleton tabla | `table-skeleton/*` | Piloto sportsman; filtros fijos + skeleton filas |
| Prefetch idle | `route-prefetch.ts` | sportsman + complements tras dashboard paint |
| Fuentes | `styles/_fonts.scss` + `public/fonts/` | Self-hosted; sin Google Fonts en runtime |
| SweetAlert2 | `alert_Toast.ts` | **Import dinámico** — chunk lazy `sweetalert2-all` |

---

## Timeline de arranque (estado final)

```text
0 ms       index.html boot-shell (app | auth | config)
           │
100–400ms  JS initial (~844 KB prod / ~197 KB transfer)
           │
           ├─ Angular bootstrap (auth /auth/me en paralelo)
           │
           ├─ /login        → Login eager
           ├─ /registers    → boot-auth → lazy Register (~78 KB)
           ├─ /             → HomeLayout → placeholder (≥300 ms) → dashboard eager
           └─ /configuration → ConfigLayout → placeholder → settings eager
```

---

## Rutas (post-refactor)

```text
/login, /registers          → auth pública (login eager; register lazy + boot-auth)
/                           → HomeLayout (sin guard)
  └─ '' + JwtGuard
       ├─ /dashboard        → eager
       └─ /sportsman        → lazy → listado + skeleton
/configuration              → ConfigLayout (sin guard en padre)
  └─ '' + JwtGuard → SETTINGS_ROUTES (eager)
```

---

## Mapa de experiencia (objetivo alcanzado)

### Primera carga autenticada (`/dashboard`)

```text
Boot-shell → Shell Angular → [≥300 ms] placeholder dashboard → contenido
```

### Navegación dashboard → sportsman

```text
Shell estable → [≥300 ms] placeholder tabla → chunk (prefetch idle) → skeleton HTTP → datos
```

### Sin sesión

```text
Boot-shell → auth/me → redirect /login (boot-auth si F5 en /registers)
```

---

## Regla de oro Micovi (vigente)

1. **Overlay global** → solo GET lentos sin feedback local (>300 ms).
2. **Skeleton** → listados/tablas (`TableSkeletonComponent`).
3. **Button loading** → mutaciones (POST/PUT/DELETE).
4. **Nada** → navegación <300 ms, dashboard estático, auth bootstrap.
5. **Motion 3/10** — sin View Transitions API.

---

## Fase 5a — Análisis de bundle y quick wins

### Medición producción (`ng build --configuration=production`)

| Métrica | Antes quick wins | Después quick wins | Δ |
|---------|------------------|-------------------|---|
| Initial raw | **1.04 MB** ❌ (error budget 1 MB) | **843.75 KB** ✅ | **−~196 KB** |
| Initial transfer (est.) | ~232 KB | **~197 KB** | **−~35 KB** |
| Lazy register | (en main) | **78 KB** / ~16 KB transfer | Fuera del initial |
| Lazy sweetalert2 | (en main) | **78 KB** / ~18 KB transfer | Fuera del initial |

### Desglose initial (aprox.)

| Chunk / área | Raw | Notas |
|--------------|-----|-------|
| Vendor Angular + Material | ~456 KB + ~169 KB + ~79 KB | Framework; difícil recortar sin cambio mayor |
| `main.js` | ~228 KB → **~120 KB** tras quick wins | App + login + dashboard + layout |
| Polyfills + styles | ~45 KB | Normal |

### Lazy chunks relevantes

| Chunk | Raw | Cuándo carga |
|-------|-----|--------------|
| `create-sportsman-component` | **1.54 MB** | ⚠️ Mayor oportunidad futura (formulario pesado) |
| `sportsman-component` | ~153 KB | Listado deportistas |
| `register` | ~78 KB | Solo `/registers` |
| `sweetalert2-all` | ~78 KB | Error login, toasts lazy, newpay |

### Quick wins aplicados ✅

| # | Cambio | Impacto | UX arranque |
|---|--------|---------|-------------|
| 1 | **Register lazy** de nuevo | −~150 KB del initial | Boot-auth shell ya cubre pre-JS |
| 2 | **SweetAlert2 dynamic import** | −~78 KB del initial | Sin cambio visible |
| 3 | **Eliminar `moment` y `swiper`** | Limpieza deps (no estaban en bundle) | — |

### Quick wins recomendados (no implementados)

| # | Cambio | Impacto estimado | Tradeoff |
|---|--------|------------------|----------|
| 1 | Lazy **Login** (mantener boot-auth) | Medio | Login es ruta frecuente sin sesión |
| 2 | Partir **create-sportsman** (1.5 MB) | Alto | Refactor grande |
| 3 | Material imports granulares / `@angular/material` subpaths | Medio | Revisión por componente |
| 4 | Subir budget warning 500→800 KB en `angular.json` | Cosmético CI | Documentar baseline real |
| 5 | `@defer` en bloques pesados futuros | Caso a caso | Solo con beneficio medido |

### Warnings CI actuales

- `initial` > **500 KB** warning (843 KB) — esperable con Material + shell eager.
- `dinamic-table.component.scss` **11.68 KB** > 10 KB — pre-existente; no bloquea build.

---

## Implementación por fases (histórico)

| Fase | Contenido | Estado |
|------|-----------|--------|
| **A** | Spinner delay 300 ms, interceptor opt-out, router spinner off | ✅ |
| **B** | Login `Entrando…`, button loading, quitar `loading..` | ✅ |
| **C** | `TableSkeletonComponent` + sportsman `isListLoading` | ✅ |
| **1** | Auth no bloqueante, shell routing, CSS crítico, dashboard eager | ✅ |
| **2** | Placeholder outlet delay + variantes, prefetch, register eager* | ✅ |
| **3** | Config shell, boot-config, fuentes async → self-host F4 | ✅ |
| **4** | Fuentes `public/fonts/`, `list-route-patterns`, docs rutas | ✅ |
| **5a** | Análisis bundle + quick wins (register lazy, Swal lazy, deps) | ✅ |
| **5d** | Este documento actualizado | ✅ |

\*Register volvió a **lazy** en 5a; boot-auth mantiene UX en `/registers`.

---

## Archivos clave (referencia)

```
src/index.html                          boot-shell + preload fonts
src/styles/_fonts.scss                  @font-face self-hosted
src/app/app.config.ts                   startBootstrap no bloqueante
src/app/app.routes.ts                   shells + guards en hijos
src/app/core/loading/
  loading.context.ts                    SKIP_LOADING
  list-route-patterns.ts                rutas skeleton tabla
  route-prefetch.ts                     prefetch idle
src/app/layout/home/                    shell + outlet-placeholder
src/app/layout/config/                  shell configuración
src/app/shared/components/table-skeleton/
src/app/utils/alert_Toast.ts            Swal dynamic import
public/fonts/                           woff2 Inria + Material Icons
```

---

## Checklist final QA

- [x] Navegación rápida sin overlay global
- [x] HTTP rápidas sin flicker (<300 ms)
- [x] Tablas con skeleton contextual (sportsman)
- [x] Acciones con button loading
- [x] MASTER intacto (colores, tipografía, layout)
- [x] `prefers-reduced-motion` (boot-shell, skeleton, sidenav)
- [x] Auth: bootstrap no bloqueante, refresh `/auth/me` corregido
- [x] Boot-shell pre-JS (app / auth / config)
- [x] Fuentes self-hosted
- [x] Bundle initial < 1 MB producción
- [ ] Extender skeleton a entrenador/ejercicios **cuando** rutas activas
- [ ] QA manual Slow 3G en `/`, `/login`, `/registers`, `/configuration`, `/sportsman`

---

## Al activar entrenador / ejercicios

1. Descomentar ruta en `features/home/home.routes.ts`
2. Verificar segmento en `TABLE_OUTLET_ROUTE_SEGMENTS` (ya incluidos)
3. Copiar patrón sportsman: `isListLoading` + `TableSkeletonComponent`
4. Añadir `prefetchEntrenadorRoutes()` en `route-prefetch.ts` apuntando al `.routes.ts` real

---

## Explícitamente descartado

- Spinner global en arranque o navegación
- View Transitions API
- Skeleton fullscreen genérico
- Rediseño visual MASTER

---

## Prompt reutilizable (mantenimiento)

```
Validar loading/arranque Micovi contra docs/PROMPT-UX-TRANSITIONS-LOADING-AUDIT.md.
Comprobar: boot-shell, placeholder 300 ms, sin router spinner, skeleton tabular,
bundle prod < 1 MB. Skills: MASTER + colores-scss. No spinner global por defecto.
```
