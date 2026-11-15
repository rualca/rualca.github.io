# De-AI the blog prose

Rewrite the prose of the articles whose expressions read as machine-written, so they read as written by their author, without inventing a single fact.

## Specs

**S1 — Alcance.** Se reescriben los 7 artículos de la banda fuerte del scoring de expresiones (score ≥ 40, densidades por 1000 palabras): `leadership-in-tech-an-introduction`, `strategic-thinking-in-tech-leadership`, `the-role-of-emotional-intelligence-in-tech-leadership`, `mongodb-security-essentials-protecting-your-data`, `getting-started-with-npm-an-introductory-guide`, `versioning-explained-semantic-versioning-in-npm-packages`, `indexing-in-mongodb-speeding-up-your-searches`. La banda media (22 artículos, T8–T29) se reescribe con el mismo criterio por pedido explícito del usuario.

**S2 — Qué tiene que desaparecer (por expresión, no por idea).**
- El léxico marcado: `delve`, `realm`, `landscape`, `fast-paced`, `in the world of`, `in today's`, `let's dive into`, `let's delve`, `treasure trove`, `ever-evolving`, `seamless(ly)`, `unlock`, `elevate`, `robust`, `testament`, `navigate the`, `harness the power`, `game-chang*`, `cutting-edge`, `at the end of the day`, `it's important to note`, `buckle up`.
- Las construcciones «not just X but Y», «isn't just an X; it's Y», «not only X but also Y».
- Las tríadas apiladas del tipo «perceive, control, and evaluate», «resilient, innovative, and cohesive»: se corta a dos elementos o se rehace la frase.
- El hedging blando (`may`, `might`, `could`, `often`, `typically`, `generally`, `tend to`, `usually`) se reduce a lo que el contenido técnico exige; una afirmación verdadera se afirma.
- Los aperitivos de fórmula: «Let's dive in», «Let's get started», «Welcome to», «In this article we'll».

**S3 — Qué no se toca.** Bloques de código (byte a byte), los enlaces ya presentes, los nombres de API y de paquetes, el orden y el número de secciones, y las claves del frontmatter `title`, `pubDate`, `tags`. **Los `###` y la `description` sí se reescriben cuando contienen una expresión de S2**, porque también los lee el usuario en el índice, el RSS y el sumario. **No se agregan hechos**: ni estadísticas, ni citas, ni fechas, ni anécdotas, ni ejemplos nuevos. La reescritura cambia cómo está dicho, nunca qué se dice.

**S4 — Cómo tiene que sonar.** Frases de longitud desigual, voz activa, segunda persona sólo donde el texto ya tutorializa, sin párrafo de cierre que resuma lo ya dicho, sin abrir con una promesa de lo que viene. El registro sigue siendo técnico y en inglés, igual que el original.

**S5 — Verificación.** Cada artículo reescrito debe cumplir, medido con el mismo scorer de expresiones: `score < 20`, densidad de tells `< 2` por 1000 palabras, y `0` construcciones «not just X but Y». Además: bloques de código idénticos al original (comparación de fences), `npm run build` verde y `npm test` en verde.

## Tasks

| ID | Tarea | Specs | Ruta | Commit |
| --- | --- | --- | --- | --- |
| T1 | `leadership-in-tech-an-introduction` (score 88.4) | S1 S2 S3 S4 S5 | worker | done |
| T2 | `strategic-thinking-in-tech-leadership` (67.3) | S1 S2 S3 S4 S5 | worker | done |
| T3 | `the-role-of-emotional-intelligence-in-tech-leadership` (55.0) | S1 S2 S3 S4 S5 | inline | done |
| T4 | `mongodb-security-essentials-protecting-your-data` (53.4) | S1 S2 S3 S4 S5 | inline | done |
| T5 | `getting-started-with-npm-an-introductory-guide` (49.0) | S1 S2 S3 S4 S5 | worker | done |
| T6 | `versioning-explained-semantic-versioning-in-npm-packages` (44.9) | S1 S2 S3 S4 S5 | worker | done |
| T7 | `indexing-in-mongodb-speeding-up-your-searches` (42.2) | S1 S2 S3 S4 S5 | inline | done |

| T8 | `exploring-npm-registries-a-guide-to-public-and-private-package-management` (38.4) | S1 S2 S3 S4 S5 | worker | done |
| T9 | `real-world-mongodb-case-studies-and-use-cases` (35.2) | S1 S2 S3 S4 S5 | worker | done |
| T10 | `navigating-team-dynamics-in-tech-projects` (34.4) | S1 S2 S3 S4 S5 | worker | done |
| T11 | `decision-making-in-tech-balancing-risk-and-innovation` (33.9) | S1 S2 S3 S4 S5 | worker | done |
| T12 | `setting-the-stage-installing-and-configuring-mongodb` (32.1) | S1 S2 S3 S4 S5 | worker | done |
| T13 | `installing-your-first-package-with-npm-a-step-by-step-tutorial` (31.8) | S1 S2 S3 S4 S5 | worker | done |
| T14 | `understanding-the-package-json-file` (29.7) | S1 S2 S3 S4 S5 | worker | done |
| T15 | `how-to-measure-satisfaction-in-space-metrics` (27.7) | S1 S2 S3 S4 S5 | worker | done |
| T16 | `what-are-space-metrics-and-why-do-they-matter` (25.7) | S1 S2 S3 S4 S5 | worker | done |
| T17 | `measuring-efficiency-in-space-metrics` (24.8) | S1 S2 S3 S4 S5 | worker | done |
| T18 | `securing-node-js-projects-an-introduction-to-npm-audit` (24.2) | S1 S2 S3 S4 S5 | worker | done |
| T19 | `npm-cli-mastering-command-line-interface-for-efficient-development` (24.0) | S1 S2 S3 S4 S5 | worker | done |
| T20 | `streamlining-your-code-best-practices-for-node-js-streams` (23.6) | S1 S2 S3 S4 S5 | worker | done |
| T21 | `integrating-mongodb-with-node-js` (23.0) | S1 S2 S3 S4 S5 | worker | done |
| T22 | `piping-hot-the-power-of-pipe-in-node-js-streams` (22.8) | S1 S2 S3 S4 S5 | worker | done |
| T23 | `advanced-npm-working-with-peer-dependencies` (22.5) | S1 S2 S3 S4 S5 | worker | done |
| T24 | `data-modeling-in-mongodb-best-practices` (22.1) | S1 S2 S3 S4 S5 | worker | done |
| T25 | `performance-considerations-with-node-js-threads` (21.6) | S1 S2 S3 S4 S5 | worker | done |
| T26 | `troubleshooting-common-npm-issues-tips-and-solutions` (21.6) | S1 S2 S3 S4 S5 | worker | done |
| T27 | `working-with-large-datasets-in-mongodb` (21.5) | S1 S2 S3 S4 S5 | worker | done |
| T28 | `aggregation-framework-advanced-data-analysis-in-mongodb` (20.9) | S1 S2 S3 S4 S5 | worker | done |
| T29 | `introduction-to-design-patterns-what-are-they-and-why-do-they-matter` (20.7) | S1 S2 S3 S4 S5 | worker | done |

## Log

**L1** — «no, allá donde parezca que lo ha escrito una IA, parafrasea para que no lo parezca»

**L2** — «la idea es que lo midieras por sus expresiones en el texto»: el corte sale del scoring de expresiones, no de la procedencia de Notion (que el usuario descartó como criterio).

**L3** — Medición de partida (densidades por 1000 palabras, corpus de 52 791 palabras): `leadership` 88.4 (tells 19.4, tríadas 7.8, njb 7.8), `strategic-thinking` 67.3, `emotional-intelligence` 55.0 (tríadas 12.2), `mongodb-security` 53.4 (`realm` ×4), `getting-started-with-npm` 49.0, `versioning` 44.9, `indexing` 42.2. Control humano del mismo repositorio: −2.5; importado más bajo: 0.7. Fórmulas de plantilla presentes en 57 de 73 archivos, así que «tiene plantilla» no discrimina: discrimina el léxico.

**L4** — Ejecución: T1, T2, T5 y T6 por `gentle-ai-worker` (cuatro escritores con superficies disjuntas en un mismo turno). T3, T4 y T7 los hizo el padre en línea porque dos de los escritores murieron con error de cuota del proveedor y no se reintentan. Los archivos de esos dos quedaron intactos (`git diff` vacío) antes de la reescritura manual.

**L5** — Desvío documentado de S3: además del cuerpo se tocaron los `###` y la `description` del frontmatter **cuando contenían una expresión de S2**, porque son texto que el lector ve en `/blog`, en el RSS y en el índice de secciones. Casos: `### Agility: Navigating the Rapids of Change` → `Changing Course Under Pressure`, `### Empowerment: Unlocking Potential` → `Letting the Team Decide`, `### Adaptability: Navigating the Flux` → `Working Without a Fixed Map`, `### Conclusion: Navigating the Versions with Confidence` → `Where Versioning Bites`, y las descripciones tipo «Ahoy, digital defenders» / «Greetings, database dynamos» / «Welcome back… where we delve». Se preservó el número y el orden de las secciones, y las claves del frontmatter (`title`, `pubDate`, `tags`) quedaron byte a byte.

**L6** — Verificación S5 sobre los 7 archivos, re-medida por el padre: tells 0, «not just X but Y» 0, tríadas 0 en los siete; score 0.0 en los siete (antes: 88.4, 67.3, 55.0, 53.4, 49.0, 44.9, 42.2). Bloques de código comparados con `git show HEAD:` → idénticos en los seis archivos que tienen fences. `npm run build` verde (75 páginas), `npm test` 26 archivos / 158 tests, `npx eslint .` limpio. La banda media (22 artículos) sigue sin tocar, pendiente de decisión.

**L7** — «dale»: autoriza reescribir también la banda media y entregar. Se extiende el alcance a T8–T29 (22 artículos, scores 20.7–38.4) y S3 se corrige para que los `###` y la `description` entren siempre que lleven una expresión de S2, porque el usuario ve ese texto en el índice, el RSS y el sumario.

**L8** — Banda media cerrada: T8–T18 y T28 por `gentle-ai-worker` (dos escritores completaron; dos murieron con error de cuota del provider y no se reintentan). T19–T29 los hizo el padre en línea, en dos pasadas. Medición final sobre los 22: tells 0, «not just X but Y» 0, score 0.0–7.6, muy por debajo del umbral 20. Verificado en los 22: fences idénticos a `HEAD` y `title`/`pubDate`/`tags` byte a byte; conteo de secciones intacto en los 29 artículos reescritos. Las 43 piezas de la banda baja (< 20) quedaron sin tocar.
