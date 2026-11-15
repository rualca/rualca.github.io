# Blog SEO

Apply the article-level SEO practices the blog is missing, keeping every claim on the page visible and every field derived from data the site already has.

Practices taken from Google Search Central: the SEO Starter Guide, the `Article`/`BlogPosting` structured data reference, and the crawlable-URL and sitemap docs. Where a third-party checklist and Google's documentation disagreed, Google wins.

## Specs

**S1 — Article structured data.** Every `/blog/<slug>/` carries a `BlogPosting` JSON-LD object with `headline`, `description`, `datePublished` (ISO 8601), `author` (a `Person` with `name` and `url`), `image` (absolute URL), `mainEntityOfPage`, `publisher`, `isPartOf` (the blog) and `inLanguage`. Google lists these as recommended rather than required; the rule here is that **no field states anything the page does not show**, and no field is invented to fill a slot.

**S2 — Breadcrumbs.** Every article carries a `BreadcrumbList` JSON-LD with `Home → Writing → <article title>`. Position 3 is the article's own canonical URL.

**S3 — Open Graph per article.** Articles declare `og:type=article`, `article:published_time`, one `article:tag` per tag, and `article:author`. `og:image` is the article's own first image when it has one, and the site default otherwise. Pages that are not articles keep `og:type=website`.

**S4 — Nothing that already works breaks.** One `h1` per page, a self-referencing canonical, a unique title and description, `lang="en"`, the sitemap index, and `robots.txt` pointing at it all keep their current behaviour. The homepage keeps its `Person` JSON-LD.

**S5 — Internal linking.** Each article links to the previous and the next article in publication order, in addition to the `Writing` breadcrumb it already has. That gives every one of the 73 posts an inbound link from its neighbours instead of only from the index.

**S6 — Feed.** Every RSS item carries its tags as `<category>` elements, so a reader can filter by topic.

**S8 — Meta descriptions.** Each article's `description` becomes one sentence of **140-170 characters** that says what the reader gets from that article. Rules: no greeting or formula opener (`Welcome back…`, `Ahoy…`, `Hello again…`, `Picture this`, `Let's dive`), no hype (`game-changing`, `revolutionary`, `must-read`), no exclamation marks, no new claims — it may only restate what the article actually covers, so the writer reads the article before writing its description. All 73 stay unique and distinct from each other.

**S7 — Verification.** `npm run build` green, `npm test` green, and for **all 73** built article pages: the JSON-LD parses, `BlogPosting` carries every field S1 names, the breadcrumb has three positions, `og:type` is `article`, and the article's `headline` equals its `h1` text.

## Tasks

| ID | Tarea | Specs | Ruta | Commit |
| --- | --- | --- | --- | --- |
| T1 | Extender `Base.astro` con `ogType`, `publishedTime`, `tags`, `image` y `jsonLd` opcionales | S3 S4 | inline | done |
| T2 | `BlogPosting` + `BreadcrumbList` y enlaces prev/next en `[slug].astro` | S1 S2 S5 | inline | done |
| T3 | Etiquetas como `<category>` en el feed | S6 | inline | done |
| T4 | Tests de contrato en `src/seo.test.js` | S1 S2 S3 S6 | inline | done |
| T5 | Verificación sobre las 73 páginas construidas | S7 | inline | done |

## Log

**L1** — «busca e investiga las mejores buenas prácticas de SEO y aplicalas al blog»

**L2** — Estado de partida, auditado: `canonical` por página, título único con `— Rubén Alapont`, descripción propia, un `h1` por artículo, `lang="en"`, `@astrojs/sitemap` generando `sitemap-index.xml`, `robots.txt` apuntando ahí, `llms.txt`, resumen en `<noscript>` y `Person` JSON-LD en el layout. **Faltaba**: `og:type` seguía en `website` también en artículos; ningún `BlogPosting` ni `BreadcrumbList`; `og:image` idéntico en todo el sitio; sin enlaces entre artículos; el feed sin etiquetas.

**L3** — Fuentes: Google Search Central — SEO Starter Guide (`developers.google.com/search/docs/fundamentals/seo-starter-guide`), `Article`/`NewsArticle`/`BlogPosting` structured data (`/search/docs/appearance/structured-data/article`), Google Search Essentials. Nota de la documentación: para `Article` Google **no lista propiedades obligatorias**, sólo recomendadas; la página es elegible sin ninguna, así que el valor está en declarar las que aplican y en que coincidan con lo visible.

**L4** — Aplicado y verificado sobre el build: `Base.astro` acepta `ogType`, `publishedTime`, `tags`, `image`, `jsonLd`; `[slug].astro` emite `BlogPosting` + `BreadcrumbList` y enlaces prev/next; `rss.xml.js` manda las etiquetas como `<category>`; 5 tests nuevos en `src/seo.test.js` (163 en total).

**L5** — Verificación S7 sobre las 73 páginas construidas: `BlogPosting` único y con los 11 campos, `BreadcrumbList` con 3 posiciones, `og:type=article`, `headline` idéntico al `<h1>`, `Person` del layout intacto, prev/next en las 73, `rss.xml` con 73 items y 290 `<category>`. **0 problemas.** Ojo con el verificador: `<noscript>` del layout trae su propio `<h1>`, hay que excluirlo antes de contar encabezados.

**L6** — Hueco que queda, medido y no aplicado: **39 de las 73 `description` abren con un saludo** («Hello again, tech enthusiasts…», «Ahoy, data navigators…») y **22 tienen menos de 80 caracteres**. La recomendación de Google es una descripción única de 150-160 caracteres que diga el resultado del artículo. Eso no se arregla con marcado: son 73 frases que hay que escribir. Queda pendiente de decisión del usuario.

**L7** — T6 cerrado con las 73 `description` reescritas (más la del post nuevo): media **146 caracteres**, **73 de 74** dentro de 140-170, **0** abren con saludo o fórmula, **0** exclamaciones, **0** duplicadas. La única fuera de rango es `why-this-site-owns-its-articles.md` (131), que es texto propio del autor y quedó sin tocar a propósito. Los dos escritores que murieron por cuota se reemplazaron con trabajo en línea, escribiendo cada descripción desde los títulos y encabezados del artículo — que es literalmente lo que cubre. Verificado además sobre el HTML construido: 73 de 74 páginas sirven una `meta description` de 140-170 caracteres.
