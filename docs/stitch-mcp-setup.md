# Stitch MCP en Micovi (Cursor)

Configuración del servidor MCP de [Google Stitch](https://stitch.withgoogle.com/docs/mcp/setup/)
para usar las skills `stitch::*` con el agente.

## Dónde está la config

**Usuario (recomendado — no va al git):**

`~/.cursor/mcp.json`

Entrada:

```json
"stitch": {
  "url": "https://stitch.googleapis.com/mcp",
  "headers": {
    "X-Goog-Api-Key": "TU_API_KEY"
  }
}
```

La key **no** debe committearse en el repo. Si necesitas plantilla de proyecto,
usa `.cursor/mcp.json.example` sin secretos.

## Activar

1. Cursor → **Settings → MCP**
2. Debe aparecer **stitch** (punto verde / Connected)
3. Reinicia Cursor o “Refresh” MCP si no carga
4. Verifica que liste tools (> 0). Si dice **0 tools**, usa el fallback abajo

## Fallback si “Connected” pero 0 tools

Bug conocido de Cursor con el payload grande de Stitch (`outputSchema`).

Opción A — proxy npm:

```json
"stitch": {
  "command": "npx",
  "args": ["-y", "@_davideast/stitch-mcp", "proxy"],
  "env": {
    "STITCH_API_KEY": "TU_API_KEY"
  }
}
```

Opción B — proxy local en `~/.cursor/stitch-mcp-proxy.mjs` (stdio + strip schemas).

## Cómo usarlo con tus skills

Con MCP activo:

```
Lee design-system/micovi/MASTER.md.
Con stitch-generate-design, crea una variante del login
alineada al MASTER (Angular Material, Azul Micovi #0C4CC8).
```

Sin MCP siguen útiles: `enhance-prompt`, `taste-design` (local), `redesign`, etc.

## Seguridad

- No pegues la API key en chats públicos ni en commits.
- Si la key se filtró, **rótala** en Google AI Studio / consola Stitch y actualiza `mcp.json`.
- Preferible variable de entorno `STITCH_API_KEY` en el bloque `env` del proxy.

## Docs oficiales

- Setup MCP: https://stitch.withgoogle.com/docs/mcp/setup/
- Skills: https://github.com/google-labs-code/stitch-skills
