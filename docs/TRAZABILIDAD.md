# Trazabilidad — POO Racing Academy

Documento de referencia de cómo el contenido académico de la plataforma se
mapea contra su fuente: `Documentation/guiaPOO.md` (de aquí en adelante, la **Guía**).

Propósito: garantizar que **todo** contenido mostrado en la app provenga de la
Guía y que cada pieza educativa sea trazable a una ubicación concreta de la fuente.

## Convención SourceRef

Cada contenido académico (sección de módulo, ejercicio, pregunta, ejemplo, cita)
queda identificado con:

```ts
interface SourceRef {
  chapter: number;        // capítulo principal de la Guía (obligatorio)
  section: string;        // sección principal dentro del capítulo (obligatorio)
  lines?: string;         // rango de líneas en guiaPOO.md (opcional, auxiliar)
  note?: string;          // aclaración (opcional)
}
```

Reglas:

- `chapter` y `section` son la información canónica de trazabilidad.
- `lines` es auxiliar y se usa cuando aporta precisión; no bloquea un contenidos.
- La trazabilidad documental vive en este documento.
- En la UI solo existe un control discreto y opcional ("Ver fuente académica")
  por pieza; **no** se muestran chips/etiquetas permanentes de referencia.

## Tabla módulo ↔ capítulo ↔ página

| Módulo (Ruta) | Capítulo de la Guía | Página/app de destino |
|---|---|---|
| 1 · Fundamentos de POO | 1 | `/modulo/fundamentos` |
| 2 · Paradigmas | 2 | `/modulo/paradigmas` |
| 3 · Clases y objetos | 3 | `/modulo/clases-objetos` |
| 4 · Abstracción | 4 | `/modulo/abstraccion` |
| 5 · Encapsulamiento | 5 | `/modulo/encapsulamiento` |
| 6 · Herencia | 6 | `/modulo/herencia` |
| 7 · Polimorfismo | 7 | `/modulo/polimorfismo` |
| 8 · UML | 8 | `/uml` |
| 9 · Diseño / SOLID | 9 | `/modulo/solid` |
| 10 · Sistema integrador | 10 | `/modulo/integrador` |

## Recursos transversales (no son módulos)

| Recurso | Capítulo de la Guía | Página/app |
|---|---|---|
| Mapa conceptual de POO | 11 | accesible desde Conceptos y Ruta (recurso transversal, no parte de UML) |
| Banco de preguntas (90) | 12 | `/banco` |
| Simulacro (30 preguntas / 90 min) | 13 | `/simulacro` |
| Glosario (30 términos) | 14 | `/glosario` |
| Repaso de alto rendimiento | 15 | `/repaso` |
| Checklist final (30 ítems) | 16 | `/repaso` |

## Laboratorio de código

- Lenguaje principal: **Java**.
- Dart se usa únicamente de forma **comparativa y explícita** en los módulos 3,
  4 y 6, y en dos muestras del Laboratorio.
- Ejecución **simulada/pedagógica** (salida esperada predefinida), sin compilar.
- Cada muestra lleva su `SourceRef` al capítulo y sección de la Guía de la que se extrae.

## Notas de fase

- FASE 2 no importa contenido; las páginas son placeholders que validan
  navegación, layout, tema y componentes.
- Desde FASE 3 en adelante, todo contenido emitido debe registrarse aquí o en la
  pieza correspondiente mediante `SourceRef`.

## Registro FASE 3 — Etapa 1 (módulos 1–2)

Cada sección del módulo corresponde 1:1 a la sección `X.y` de la guía.
`source.lines` corresponde al rango real en `guiaPOO.md`.

### Módulo 1 · Fundamentos de POO (capítulo 1) — `m01-fundamentos`

| Sección | Título | Líneas guía |
|---|---|---|
| 1.1 | Definición formal | 105–114 |
| 1.2 | ¿Qué problema intenta resolver? | 115–126 |
| 1.3 | Modelar un sistema mediante objetos | 127–138 |
| 1.4 | Componentes fundamentales de un objeto | 139–191 |
| 1.5 | Clases y objetos como elementos fundamentales | 192–206 |
| 1.6 | Los cuatro pilares | 207–224 |
| 1.7 | Ventajas | 225–233 |
| 1.8 | Desventajas y limitaciones | 234–241 |
| 1.9 | ¿Cuándo es apropiado? | 242–248 |
| 1.10 | ¿Cuándo puede ser innecesariamente compleja? | 249–255 |
| 1.11 | Ejemplo conceptual | 256–267 |
| 1.12 | Ejemplo en Java | 268–332 |
| 1.13 | Análisis del ejemplo | 333–344 |
| 1.14 | Errores comunes | 345–354 |
| 1.15 | Preguntas de evaluación | 355–367 |
| 1.16 | Respuestas razonadas | 368–380 |
| 1.17 | Puntos clave para memorizar | 381–397 |

Notas m01: `expectedOutput` de 1.12 es inferencia de la salida literal que el
código de la guía produciría (`Simba: Rugido …`); la guía no muestra la salida
en texto, se dedujo del propio código. Todos los demás bloques son verbatim.

### Módulo 2 · POO vs otros paradigmas (capítulo 2) — `m02-paradigmas`

| Sección | Título | Líneas guía |
|---|---|---|
| 2.1 | Programación estructurada | 401–446 |
| 2.2 | POO | 447–469 |
| 2.3 | Otros paradigmas | 470–526 |
| 2.4 | Tabla comparativa general | 527–538 |
| 2.5 | Errores comunes | 539–545 |
| 2.6 | Preguntas de evaluación | 546–563 |

Notas m02: los bloques de código de 2.3 (Java lambda, SQL, Prolog) se conservan
verbatim con `language="text"` (no Java) salvo la lambda, que es Java. Los
bloques C de 2.1 usan `language="text"`.

## Registro FASE 3 — Etapa 2 (módulos 3–4)

### Módulo 3 · Objetos y Clases (capítulo 3) — `m03-objetos-clases`

| Sección | Título | Líneas guía |
|---|---|---|
| 3.1 | Objeto | 567–598 |
| 3.2 | Clase | 600–643 |
| 3.3 | Diferencia entre clase y objeto | 645–657 |
| 3.4 | Instanciación, referencias y estado | 659–675 |
| 3.5 | Diagrama de objetos (instancias) | 677–689 |
| 3.6 | Código Java completo | 691–729 |
| 3.7 | Análisis línea por línea | 731–743 |
| 3.8 | `==` vs `equals()` | 745–773 |
| 3.9 | Errores frecuentes | 775–783 |
| 3.10 | Preguntas típicas de examen | 785–796 |
| 3.11 | Ejercicio práctico (resuelto) | 798–853 |

Notas m03:
- 3.4 y 3.5 son diagramas Mermaid originales conservados verbatim (render en FASE 4).
- 3.7: la guía presenta el análisis como tabla markdown; se conservó como bloque de
  texto literal (celdas con código Java) — ver decisión D-E2-1.
- El `expectedOutput` de 3.6 está dentro de los comentarios del propio código de la guía.
- 3.11: el ejercicio es `open` (la solución es un codeblock de la guía, no un distractor).

### Módulo 4 · Abstracción (capítulo 4) — `m04-abstraccion`

| Sección | Título | Líneas guía |
|---|---|---|
| 4.1 | ¿Qué es abstracción? | 859–883 |
| 4.2 | Clases abstractas | 885–919 |
| 4.3 | Interfaces | 921–973 |
| 4.4 | Clases abstractas vs interfaces | 975–987 |
| 4.5 | Código comparativo | 989–1028 |
| 4.6 | Diagrama Mermaid | 1030–1052 |
| 4.7 | Errores frecuentes | 1054–1061 |
| 4.8 | Preguntas de evaluación | 1063–1078 |

Notas m04:
- 4.4: tabla comparativa (9 filas) conservada como `TableBlock` semántico; las celdas
  con backticks se mantienen textuales.
- 4.6: Mermaid verbatim.
- 4.8: 10 preguntas sin respuestas en la guía → quedan `open`/reflexivas (regla C).

## Decisiones registradas (etapa 2)

- **D-E2-1**: la tabla de 3.7 se emitió como bloque de código literal (no como
  `TableBlock`) porque sus celdas contienen código Java con `"` que romperían la
  renderización de celdas; la estructura pipe no se comprueba. Es la única tabla
  del capítulo tratada así.

## Registro FASE 3 — Etapa 3 (módulos 5–6)

### Módulo 5 · Encapsulamiento (capítulo 5) — `m05-encapsulamiento`

| Sección | Título | Líneas guía |
|---|---|---|
| 5.1 | ¿Qué es? | 1084–1089 |
| 5.2 | ¿Qué problema resuelve? | 1091–1093 |
| 5.3 | Control del acceso al estado interno | 1095–1097 |
| 5.4 | Invariantes | 1099–1103 |
| 5.5 | Modificadores de acceso (Java) | 1105–1121 |
| 5.6 | Getters y setters | 1123–1177 |
| 5.7 | Constructores | 1179–1212 |
| 5.8 | Destructores | 1214–1236 |
| 5.9 | Miembros estáticos (`static`) | 1238–1292 |
| 5.10 | Ejemplo incorrecto y corregido | 1294–1323 |
| 5.11 | Errores comunes | 1325–1331 |
| 5.12 | Preguntas de evaluación | 1334–1349 |

Notas m05:
- 5.5: tabla de modificadores (4 filas) + precisión sobre `protected` verbatim.
- 5.6: fragmentos `setSalario`, Tell-Don't-Ask y retorno de referencias mutables
  conservados; el par `List` mutable/copia (l.1167–1177) va en `keyPoints` como
  texto (no bloque) porque es prosa embebida en backticks.
- 5.8: `try-with-resources` verbatim.
- 5.9: tabla instancia vs `static` semántica; `static` vs `final` y riesgos como
  listas.
- 5.12: 10 preguntas sin respuestas en la guía → refexivas/open.

### Módulo 6 · Herencia (capítulo 6) — `m06-herencia`

| Sección | Título | Líneas guía |
|---|---|---|
| 6.1 | Definición | 1355–1357 |
| 6.2 | Superclase y subclase | 1359–1362 |
| 6.3 | Generalización y especialización | 1364–1367 |
| 6.4 | Relación «es un» | 1369–1371 |
| 6.5 | Reutilización | 1373–1375 |
| 6.6 | `extends` y `super` | 1377–1385 |
| 6.7 | Constructores y herencia | 1387–1389 |
| 6.8 | Visibilidad | 1391–1395 |
| 6.9 | Sobrescritura relacionada con herencia | 1397–1399 |
| 6.10 | Tipos de herencia | 1401–1425 |
| 6.11 | Ejemplo funcional | 1427–1481 |
| 6.12 | Explicación paso a paso | 1483–1489 |
| 6.13 | ¿Cuándo usar herencia? | 1491–1495 |
| 6.14 | ¿Cuándo preferir composición? | 1497–1503 |
| 6.15 | Problema de herencia profunda | 1505–1510 |
| 6.16 | Principio de Sustitución de Liskov (LSP) | 1512–1532 |
| 6.17 | Errores comunes | 1534–1542 |
| 6.18 | Preguntas de evaluación | 1544–1559 |

Notas m06:
- 6.10: Mermaid de herencia jerárquica verbatim (render en FASE 4).
- 6.11: bloque completo Vehiculo/Automovil/Motocicleta/Camion verbatim.
- 6.6 y 6.14: el texto de la guía usa comillas inglesas (^"es un^", "Favorece
  composición…"); se conservaron con «» para visualización, sin alterar la cita GoF.
- 6.18: 10 preguntas sin respuestas en la guía → reflexivas/open.

## Decisiones registradas (etapa 3)

- **D-E3-1**: secciones 6.2–6.5 son declarativas de una línea/lista cortas; se
  conservan como conceptos en su propia sección (mismas IDs/`number`), sin
  fusionar, para mantener la granularidad 1:1 de las 106 secciones.
- **D-E3-2**: 6.9 es una referencia cruzada de la guía a Polimorfismo; se conservó
  el texto tal cual (referencia a capítulo 7 aún no cargado).

## Registro FASE 3 — Etapa 4 (módulos 7–8)

### Módulo 7 · Polimorfismo (capítulo 7) — `m07-polimorfismo`

| Sección | Título | Líneas guía |
|---|---|---|
| 7.1 | Definición | 1565–1569 |
| 7.2 | Tipos de polimorfismo | 1571–1583 |
| 7.3 | Overloading | 1585–1609 |
| 7.4 | Overriding | 1611–1636 |
| 7.5 | Overloading vs overriding | 1638–1648 |
| 7.6 | Despacho dinámico | 1650–1657 |
| 7.7 | Ejemplo gráfico | 1659–1670 |
| 7.8 | Ejemplo funcional | 1672–1700 |
| 7.9 | Explicación línea por línea | 1702–1708 |
| 7.10 | Error típico | 1710–1727 |
| 7.11 | Ejercicio | 1729–1731 |
| 7.12 | Preguntas de examen | 1733–1748 |

Notas m07:
- 7.11: único ejercicio del capítulo; la guía sólo enuncia el problema, **no**
  incluye solución → queda `open` con `answer: undefined` y sin codeblock.
- 7.7: sequenceDiagram Mermaid verbatim (render FASE 4).
- 7.12: 10 preguntas sin respuestas en la guía → reflexivas/open.

### Módulo 8 · UML y Relaciones (capítulo 8) — `m08-uml-relaciones`

| Sección | Título | Líneas guía |
|---|---|---|
| 8.1 | ¿Qué es UML? | 1754–1770 |
| 8.2 | Diagramas UML | 1772–1787 |
| 8.3 | Diagrama de clases (profundidad) | 1789–1808 |
| 8.4 | Relaciones entre clases | 1810–1912 |
| 8.5 | Tabla resumen de relaciones | 1914–1923 |
| 8.6 | UML → Código | 1925–1994 |
| 8.7 | Código → UML | 1996–2039 |
| 8.8 | Errores comunes | 2041–2052 |

Notas m08:
- 8.4: seis relaciones, cada una con su bloque Mermaid y su fragmento Java
  (Asociación, Agregación, Composición, Dependencia, Realización). Herencia no
  tiene bloque Java propio en la guía.
- 8.6: cinco pares (diagrama ASCII + Java) conservados verbatim; las ascii usan
  `language="text"`.
- 8.7: Java de entrada + Mermaid de salida verbatim.
- 8.8: el capítulo 8 **no tiene preguntas de evaluación** en la guía (ausencia
  real) → `questions: []`.
- Mermaids en 8.3, 8.4, 8.7 (8 bloques) → render FASE 4.

## Decisiones registradas (etapa 4)

- **D-E4-1**: los diagramas ASCII de 8.6 se conservaron como bloques de código
  `language="text"` (son representaciones textuales de la guía, no diagramas
  reales renderizables).
- **D-E4-2**: 8.4 agrupa las seis relaciones en `concept` + 10 bloques de apoyo
  (Mermaid y Java) en orden de aparición, para no alterar la secuencia de la guía.
- **D-E4-3**: en 8.5 los símbolos con comillas inglesas („conoce a“, „tiene“…)
  se muestran con «», sin cambiar la semántica de la tabla.

## Registro FASE 3 — Etapa 5 (módulos 9–10)

### Módulo 9 · Principios de Diseño (capítulo 9) — `m09-principios-diseno`

| Sección | Título | Líneas guía |
|---|---|---|
| 9.1 | Cohesión y acoplamiento | 2058–2063 |
| 9.2 | Principios SOLID | 2065–2071 |
| 9.3 | Composición sobre herencia | 2073–2087 |
| 9.4 | Inmutabilidad | 2089–2100 |
| 9.5 | Diseño orientado a comportamiento | 2102–2104 |
| 9.6 | Preguntas de evaluación | 2106–2117 |

Notas m09:
- SOLID (9.2) conservado **exactamente** como lo define la guía, sin ampliaciones
  externas (regla D del encargo).
- 9.3 y 9.4: bloques `Stack<T>` (herencia vs composición) y `Punto` inmutable verbatim.
- 9.6: 10 preguntas sin respuestas en la guía → reflexivas/open.
- El capítulo 9 **no tiene** tablas, Mermaid ni ejercicios (ausencia real).
- El capítulo 9 **no incluye** bloque «En pocas palabras» → `keyPoints` vacío.

### Módulo 10 · Sistema Integrador: Sistema Académico (capítulo 10) — `m10-sistema-academico`

| Sección | Título | Líneas guía |
|---|---|---|
| 10.1 | Requerimiento conceptual | 2123–2129 |
| 10.2 | Identificación de clases | 2132–2139 |
| 10.3 | Diagrama UML | 2141–2184 |
| 10.4 | Relaciones | 2186–2191 |
| 10.5 | Código Java | 2193–2299 |
| 10.6 | Ejecución conceptual | 2301–2322 |
| 10.7 | Los cuatro pilares en acción | 2324–2329 |
| 10.8 | Análisis de decisiones de diseño | 2331–2336 |

Notas m10:
- 10.3: Mermaid completo del sistema verbatim (render FASE 4).
- 10.5: bloque Java completo (≈104 líneas) conservado íntegro en un solo
  `CodeBlockData`.
- 10.6: demo de ejecución verbatim (no hay `expectedOutput` en la guía).
- 10.4 y 10.8: listas/numeración respetadas (la 10.8 es numerada).
- El capítulo 10 **no tiene** preguntas, ejercicios ni tablas (ausencia real).

## Decisiones registradas (etapa 5)

- **D-E5-1**: no se agrega `expectedOutput` a 10.6: la guía muestra el código de
  ejecución pero no su salida literal; añadirla sería inventar contenido (regla I).
- **D-E5-2**: 10.8 se modela como lista **numerada** para reflejar que la guía lo
  presenta como 1–4.

## Registro FASE 3 — Etapa 6 (recursos transversales)

Los recursos transversales NO son módulos M11–M16; no cuentan en las 106
secciones. Se almacenan en `src/data/transversal/*` con tipo
`TransversalResource` y se muestran mediante `TransversalResourceView`.

### 6.1 — Mapa conceptual de POO — `mapa-conceptual-poo`

| Elemento | Ubicación en la guía | Contenido |
|---|---|---|
| Mapa Conceptual General (flowchart TD) | l.55–97 | Mapa que enlaza los 4 pilares, UML, relaciones y principios SOLID |
| Cap. 11 ¿Cómo se relacionan todos los conceptos? | l.2340–2368 | flowchart LR «Clase → Objeto … UML → Código» |
| Lectura del cap. 11 | l.2370 | Párrafo «Lectura» (verbatim) |

- `SourceRef` canónico: `{ chapter: 11, section: "11", lines: "2340–2370" }`;
  el mapa general (l.55–97) se conserva como primer bloque Mermaid del recurso.
- 2 bloques Mermaid verbatim (render FASE 4). No tiene términos, tablas ni código.

### 6.2 — Glosario — `glosario`

- `SourceRef` canónico: `{ chapter: 14, section: "14", lines: "2685–2716" }`.
- Términos incorporados: **29** (reales, contados en la fuente). Definiciones
  verbatim; las referencias entre conceptos se conservan tal cual en cada
  definición (p. ej. «LSP (Liskov Substitution Principle)»).

## Decisiones registradas (etapa 6)

- **D-E6-1**: la guía contiene **29 términos**, no 30 (conteo real de viñetas en
  la fuente); se incorporan los 29 reales y no se inventa el 30º.
- **D-E6-2**: el cap. 11 y el mapa general se agrupan en UN recurso transversal
  «Mapa conceptual de POO» (decisión 5 aprobada); no existe `m11-*`.
- **D-E6-3**: búsqueda/filtros del glosario y renderizado interactivo de los
  mapas quedan para fases posteriores (FASE 3 = solo lectura).
## Registro FASE 3 — Etapa 7 (examen y evaluación, caps. 12–13)

Contenido académico SOLO (datos + lectura). La lógica de evaluación
(selección, calificación, feedback, temporizadores, XP) queda para FASE 4–5.
Los datos viven en `src/data/banco/*` y se consumen desde las páginas
`/banco` y `/simulacro`.

### 7.1 — Banco de preguntas (cap. 12) — l.2374–2482

| Nivel | Preguntas reales | Líneas | Respuestas en fuente |
|---|---|---|---|
| 1 — Conceptual | 20 | 2378–2397 | No |
| 2 — Comprensión | 20 | 2401–2420 | No |
| 3 — Análisis | 20 | 2424–2443 | No |
| 4 — Código | 15 | 2447–2461 | No |
| 5 — UML | 15 | 2465–2479 | No |
| **Total** | **90** | 2374–2482 | **0** |

- La guía NO provee opciones ni respuestas en el cap. 12: las 90 preguntas se
  registran reflexivas (open) con `answer` ausente y badge «Sin respuesta en
  la fuente». IDs estables `banco-c12-q01…q90`, cada una con su línea exacta.
- `SourceRef` canónico `{ ch: 12, section: "12", lines: "2374–2482" }`.

### 7.2 — Simulacro (cap. 13) — l.2483–2681

| Parte | Nombre | Preguntas | Líneas |
|---|---|---|---|
| I | Selección Múltiple | 10 | 2489–2519 |
| II | Verdadero/Falso justificado | 5 | 2523–2527 |
| III | Análisis de Código | 5 | 2540–2572 |
| IV | UML | 5 | 2576–2589 |
| V | Preguntas Abiertas | 5 | 2593–2597 |
| **Total** | | **30** | 2483–2681 |

- Instrucciones verbatim: «responda todas las preguntas. Tiempo sugerido:
  90 minutos.» (l.2485).
- **Solucionario** (l.2599–2681): 30 respuestas; Parte I solo letra+texto,
  Parte II conclusión (V/F) más justificación, Parte III análisis razonado,
  Parte IV diagramas Mermaid (21–24) y código Java (25) verbatim, Parte V
  respuestas razonadas.

## Decisiones registradas (etapa 7)

- **D-E7-1**: cap. 12 y cap. 13 se modelan como recursos de EXAMEN separados
  (`QUESTION_BANK` vs `SIMULACRO`) con IDs propios; no se mezclan numeraciones.
- **D-E7-2**: ninguna pregunta del banco (c12) obtiene respuesta: la fuente no
  las provee y no se deducen con conocimiento general de POO (regla I).
- **D-E7-3**: en el solucionario Parte I se registra la respuesta literal
  (p. ej. «c) Compilación») sin añadir explicación que la fuente no da; las
  explicaciones solo se incorporan donde existen (Partes II, III, V y
  soluciones IV).
- **D-E7-4**: los marcadores `**negrita**` de la fuente se normalizan a texto
  plano en los campos `answer`/`answerExplanation` (no es corrección de
  contenido, solo de presentación).
- **D-E7-5**: los bloques de código y Mermaid de enunciados (Partes III–IV) y
  del solucionario (Parte IV) se conservan verbatim como `attachment` /
  `answerAttachment`; el render interactivo sigue en FASE 4.
- **Discrepancia**: el cap. 13 no indica cuál es la respuesta correcta de la
  Parte I dentro del enunciado (solo en el solucionario); se respetó esa
  estructura sin agregar marcado a las opciones.

## Registro FASE 3 — Etapa 8 (repaso y checklist, caps. 15–16)

Contenido de cierre de la guía, SOLO datos + lectura. Datos en
`src/data/repaso/*`, página única `/repaso`.

### 8.1 — Repaso de alto rendimiento (cap. 15) — l.2719–2763

- **1 tabla** «Concepto | Definición | Palabra clave | Cómo reconocerlo»
  con **16 filas reales** (POO, Clase, Objeto, Encapsulamiento, Abstracción,
  Herencia, Polimorfismo, Overloading, Overriding, Asociación, Agregación,
  Composición, Dependencia, Realización, `static`, `final`).
- **Las 20 cosas que definitivamente debes saber**: **20 elementos reales**
  (verbatim, incluidos los énfasis `**A**…` y «forma de pensar»).
- Sin bloques de código, sin Mermaid, sin preguntas.
- `SourceRef` canónico `{ ch: 15, section: "15", lines: "2719–2763" }`.

### 8.2 — Checklist final de preparación (cap. 16) — l.2765–2797

- **30 elementos reales** (`- [ ]`) en su orden original, verbatim.
- Cita de cierre de la guía (l.2800) anexada como cierre del recurso.
- Casillas NO funcionales (lectura); interactividad/progreso en fases
  posteriores.
- `SourceRef` canónico `{ ch: 16, section: "16", lines: "2765–2797" }` y cita
  con `lines: "2800"`.

## Decisiones registradas (etapa 8)

- **D-E8-1**: la guía NO contiene subsecciones 15.1–15.12: el cap. 15 consta de
  tabla + las 20 cosas. Se respeta esa estructura real en lugar de inventar
  subsecciones numeradas.
- **D-E8-2**: los capítulos 15–16 no se incorporan como módulo M15/M16; usan
  `src/data/repaso/*` con tipos `RepasoResource`/`ChecklistResource` y no
  alteran los 10 módulos (106/106 intactos).
- **D-E8-3**: los elementos del checklist se guardan como lista de texto
  verbatim (sin casillas funcionales ni persistencia); los IDs estables para
  progreso quedan definidos por índice y se consolidarán en FASE 5.
- **D-E8-4**: la cita de Rebecca Wirfs-Brock (l.2800, tras el cierre de c16) se
  incorpora como cierre del recurso checklist y no como capítulo aparte.
- **Ausencia**: el cap. 15 no tiene preguntas/ejercicios evaluativos, por lo que
  no hay preguntas sin respuesta que registrar; el cap. 16 no tiene bloques de
  código ni diagramas que conservar.
