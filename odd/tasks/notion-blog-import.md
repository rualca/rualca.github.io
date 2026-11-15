# Notion blog import

Migrate the 72 articles that actually have a body in the Notion "Blog Editorial Calendar" data source into `src/content/blog/`, with normalized frontmatter, article typography, and local images.

Specs below are the contract; a task is done only when its specs are verified.

## Specs

**S1 — Alcance.** Se migran los 72 artículos de la base "Blog Editorial Calendar" que tienen cuerpo real (>500 caracteres de texto en Notion): 10 de *Streams*, 19 de *NPM*, 7 de *SPACE*, 5 de *DORA*, 14 de *MongoDB*, 9 de *Threads*, 5 de *Leadership*, 3 de *GoF*. Las 47 páginas en estado Reviewing sin bloques y los 2 stubs de Drafting **no** se migran.

**S2 — Fechas.** "Escalonar hacia atrás por tema". Los 10 artículos de *Streams* conservan su `Publish date` real de Notion (2023-12-25 → 2024-01-23). El resto recibe una fecha escalonada y creciente dentro de su tema, en este orden de series: NPM (feb–abr 2024), SPACE y DORA (may–jun 2024), MongoDB, Threads y Leadership (jul–sep 2024), GoF (oct–nov 2024). Ningún importado queda fechado después del post propio del sitio (2026-11-15), que sigue primero en `/blog`.

**S3 — Tags.** "Mapear a tags del sitio": cada artículo lleva como máximo 4 tags — el schema los limita en `src/content.config.ts:16` — normalizados a un vocabulario corto del sitio (p. ej. `nodejs`, `streams`, `npm`, `mongodb`, `patrones`, `arquitectura`, `javascript`, `backend`), nunca los 5 tags en bruto de Notion (`programming`, `coding`, `Technology`, `Web Development`, `JavaScript`).

**S4 — Cuerpo.** El markdown replica el contenido de Notion: párrafos, `heading_1/2/3`, listas numeradas y con viñetas (incluidas las anidadas), bloques de código con su lenguaje, imágenes con su caption, y divisores. El `heading_1` que repite el título del artículo en el cuerpo se omite (el título ya lo pone la página), y la jerarquía resultante no salta niveles: un heading de nivel 3 sin ningún nivel 2 previo en esa página se emite como `##`. El texto de cada artículo se conserva íntegro: ninguna oración de Notion se pierde ni se reescribe.

**S5 — Presentación.** Se instala `@tailwindcss/typography` con versión exacta (sin `^`) y se activa en `src/App.css`, para que el `class="prose"` de `src/pages/blog/[slug].astro:23` tenga reglas reales. Las 10 imágenes (hoy URLs externas de Unsplash) se descargan a `public/images/blog/<slug>/` y el markdown las referencia por ruta local.

**S6 — Contrato del sitio intacto.** `src/content.config.ts` no cambia: `title`, `description` y `pubDate` siguen siendo obligatorios, `tags` sigue limitado a 4. `npm run build` termina en verde, `npm test` sigue pasando, y las rutas `/blog` y `/blog/<slug>` renderizan cada artículo importado con su contenido.

## Tasks

| ID | Tarea | Specs | Ruta | Commit |
| --- | --- | --- | --- | --- |
| T1 | Conversor puro Notion blocks → markdown, con tests | S4 | inline | `fa2c20e` |
| T2 | CLI de importación: descarga bloques, escribe posts, baja imágenes | S1 S2 S3 S5 | inline | `fd2ee14` |
| T3 | `@tailwindcss/typography` exacto + `@plugin` en App.css | S5 | inline | `963a58f` |
| T4 | Importar la serie *Streams* (10) | S1 S2 S3 S4 S6 | inline | `963a58f` |
| T5 | Importar la serie *NPM* (19) | S1 S2 S3 S4 S6 | inline | `a406055` |
| T6 | Importar la serie *SPACE* (7) | S1 S2 S3 S4 S6 | inline | `96202df` |
| T7 | Importar la serie *DORA* (5) | S1 S2 S3 S4 S6 | inline | `ba91805` |
| T8 | Importar la serie *MongoDB* (14) | S1 S2 S3 S4 S6 | inline | `4f14fd3` |
| T9 | Importar la serie *Threads* (9) | S1 S2 S3 S4 S6 | inline | `128e1fd` |
| T10 | Importar la serie *Leadership* (5) | S1 S2 S3 S4 S6 | inline | `e5fe507` |
| T11 | Importar la serie *GoF* (3) y cerrar la verificación completa | S1 S2 S3 S4 S5 S6 | inline | `175db5b` |

## Log

**L1** — «llevemos los blogs de Blog Editorial Calendar al blog de mi web, respetando todo»

**L2** — Decisiones del alcance (respuestas al cuestionario del 2026-11-15):
- Alcance: «Los 72 con cuerpo real» (preview: «72 archivos .md / ~430 KB de contenido / 31 sin fecha, 62 sin fecha real / Requiere slices + work-unit commits»).
- Fechas: «Escalonar hacia atrás por tema» — «Streams: 2023-12-25 → 2024-01-23 (las reales) / NPM: feb–abr 2024 / SPACE/DORA: may–jun 2024 / MongoDB/Threads/Leadership: jul–sep 2024 / GoF: oct–nov 2024 / El post propio del sitio (2026-11-15) queda arriba».
- Tags: «Mapear a tags del sitio» — «Notion: programming, coding, Technology, Web Development, JavaScript → nodejs, streams, backend, javascript».
- Cuerpo: «Instalar typography + imágenes locales» — «npm i -D @tailwindcss/typography (versión exacta) / App.css: @plugin "@tailwindcss/typography" / public/images/blog/<slug>.jpg / markdown con ![alt](/images/blog/<slug>.jpg)».

**L3** — Inventario verificado contra la API de Notion (2026-11-15): 121 páginas totales (Published 10, Drafting 33, Backlog 28, Reviewing 50); 72 con más de 500 caracteres de cuerpo, 47 Reviewing sin bloques, 2 Drafting stub. Tipos de bloque presentes: paragraph, heading_1/2/3, bulleted_list_item, numbered_list_item, code, image, divider. Imágenes: 10, todas `external` de Unsplash (sin URLs firmadas que caduquen). Sólo los 10 artículos de *Streams* tienen `Publish date`; el campo `URL` está vacío en las 121 páginas.

**L4** — «recupera la sesion 01a1e0d2-e9a9-7389-a645-bd57433429c8» (2026-11-15, sesión nueva). La sesión anterior murió con `429 tpm_uncached_exceeded` (87 627 tokens de prefill contra un límite de 75 000) mientras corría `node scripts/notion-import.mjs --all` en background. Reconciliación: el import había terminado (72 posts + 10 imágenes en disco, sin commitear), el árbol quedó con 62 posts y 10 imágenes sin trackear y 3 archivos modificados (arreglo de slug reutilizable y descripción compuesta).

**L5** — Verificación S1–S6 sobre el árbol completo (antes de commitear las series restantes):
- S1: 72 importados, títulos idénticos a los `Name` de Notion (0 faltantes, 0 sobrantes); por serie: Streams 10, NPM 19, SPACE 7, DORA 5, MongoDB 14, Threads 9, Leadership 5, GoF 3.
- S2: `pubDate` 2023-12-25 → 2024-10-18, ninguna fecha ≥ 2026-11-15; todas parsean como fecha.
- S3: los 72 con exactamente 4 tags; ninguno con tag crudo de Notion.
- S4/S5: 0 saltos de nivel de heading en los 72; 0 imágenes remotas; las 10 referencias `![](/images/blog/…)` existen en disco; ningún `canonical` inesperado.
- S6: `npm run build` verde (75 páginas), `npm test` 26 archivos / 152 tests, `npx eslint .` sin salida (limpio).

**L6** — Los commits de contenido van por serie (T5–T11), no por el presupuesto de ~400 líneas: el contenido importado es generado y cada serie es la unidad revisable que fijó el plan. El presupuesto de slice aplicó a las tareas de código (T1, T2, y el arreglo `8e0d5af`).
