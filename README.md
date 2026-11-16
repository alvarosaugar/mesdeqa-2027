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

## Cómo entran los cambios

`main` está protegida: no admite push directo, ni force push, ni borrado. **Todo cambio entra por
PR**, incluidos los datos de las sesiones, y el historial del repo es el registro de cambios.

### Labels del flujo de PR

`.github/labels.yml` define el **catálogo** de labels: nombre, color y descripción.
`deno task labels <owner/repo>` las crea o actualiza en GitHub. Este comando **no pone labels a
ningún PR**; solo hace que existan con su nombre exacto. Así ningún workflow ni ninguna persona
crea por error variantes sin descripción (`validada` en vez de `validado`), y en otro repo salen
idénticas.

Quién pone cada label en un PR, y cuándo:

| Momento | Quién | Label |
|---|---|---|
| Llega un alta o una modificación | Workflow conversor, al abrir el PR | `pendiente-revision` + `alta` o `modificacion` |
| Falta o hay que corregir información | Álvaro, a mano | `pendiente-info` (el workflow avisa a quien dio el alta) |
| El PR está bien | Álvaro, a mano | `validado` (un workflow comprueba quién la puso y hace el merge con los checks en verde) |
| Falla la validación, el merge o el build | Workflow | `error` (con un comentario que explica el motivo) |

- `alta` y `modificacion` son solo para PR de datos. Los PR de configuración o de código van sin
  label de tipo.
- Los workflows que ponen y leen estas labels aún no existen. La tabla describe el flujo previsto.

## Desarrollo local

Requiere [Deno](https://deno.com) 2.

```sh
deno task serve   # servidor local con recarga en http://localhost:3000
deno task build   # genera _site/
deno task cms     # Lume CMS en local
deno task labels alvarosaugar/mesdeqa-2027   # crea/actualiza las labels de .github/labels.yml (requiere gh)
```
