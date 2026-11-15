# Mes de QA 2027

Fuente de la web del [Mes de QA](https://mesdeqa.github.io) 2027.

> **Repo de pruebas.** Aquí se desarrolla y ensaya la automatización; cuando funcione entera se
> monta en `MesdeQA/2027`.

## Cómo funciona

- La web se genera con [Lume](https://lume.land) usando la plantilla
  [TOP](https://github.com/tarugoconf/top), que se **importa** como dependencia (no se copia).
  La versión de TOP se fija en la entrada `top/` de `deno.json`, siempre con un tag o un SHA,
  nunca una rama.
- El repo guarda la **fuente**; el HTML (`_site/`) no se commitea.

## Estructura

| Ruta | Qué es |
|---|---|
| `_config.ts` | Configuración de Lume: carga TOP |
| `_data.yml` | Datos globales: metas, estado del evento, footer |
| `block_pages/index.yml` | Contenido de la portada (bloques de TOP) |
| `styles/theme.css` | Colores y fuentes propios (sobrescribe el de TOP) |
| `files/` | Imágenes |
| `humans.vto` | Genera `/humans.txt` |
| `tests/fixtures/` | Datos de ediciones anteriores para los tests |
| `.github/labels.yml` | Labels del flujo de PR (alta, revisión, validado…) |
| `tools/` | Scripts de mantenimiento (no forman parte de la web) |

## Desarrollo local

Requiere [Deno](https://deno.com) 2.

```sh
deno task serve   # servidor local con recarga en http://localhost:3000
deno task build   # genera _site/
deno task cms     # Lume CMS en local
deno task labels alvarosaugar/mesdeqa-2027   # crea/actualiza las labels de .github/labels.yml (requiere gh)
```
