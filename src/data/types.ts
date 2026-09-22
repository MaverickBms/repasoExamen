/**
 * Modelo de datos académicos de POO Racing Academy.
 * Todo el contenido educativo vive en src/data/** y se muestra en la UI
 * reutilizando los componentes de FASE 2. FASE 3 es SOLO datos + lectura.
 *
 * Regla de oro: la Fuente es Documentation/guiaPOO.md. Ningún contenido
 * aquí inventa conocimiento; cada pieza conserva su SourceRef.
 */

/** Lenguajes soportados por el resaltador propio. */
export type Lang = "java" | "dart" | "text";

/**
 * Trazabilidad: chapter y section son obligatorios (canónicos).
 * lines es auxiliar y opcional; note aclara (p. ej. solución externa).
 */
export interface SourceRef {
  chapter: number;
  section: string;
  lines?: string;
  note?: string;
}

/** Origen del contenido: solo "guia" durante FASE 3. */
export type Provenance = "guia" | "complementario";

export type ContentKind = "paragraph" | "list" | "table" | "quote" | "mermaid" | "code";

export interface ContentTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface ContentBlock {
  kind: ContentKind;
  /** paragraph | quote */
  text?: string;
  /** list */
  items?: string[];
  ordered?: boolean;
  /** table */
  table?: ContentTable;
  /** mermaid: fuente verbatim de la guía (renderizada en FASE 4) */
  mermaid?: string;
  /** code: bloque de texto plano (pseudocódigo) sin resaltado */
  code?: string;
  source?: SourceRef;
}

export interface CodeBlockData {
  id: string;
  title?: string;
  language: Lang;
  code: string;
  /** Explicación asociada SOLO si la guía la provee. */
  explanation?: ContentBlock[];
  /** Salida mostrada SOLO si la guía la muestra. */
  expectedOutput?: string;
  source: SourceRef;
}

/**
 * Los 9 tipos de ejercicio definidos en FASE 1 + "open" (reflexivo).
 * FASE 3 solo almacena el dato; la lógica/interacción llega en FASE 4.
 * El tipo refleja CÓMO presenta la guía el enunciado.
 */
export type ExerciseType =
  | "mc"
  | "tf"
  | "dragdrop"
  | "fillblank"
  | "finderror"
  | "predict"
  | "order"
  | "classify"
  | "uml"
  | "open";

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: ContentBlock[];
  /** Solo para mc (opciones verbatim de la guía). */
  options?: string[];
  /** Respuesta SOLO si la guía la provee (decisión 2). */
  answer?: string;
  /** Dónde la guía ubica la solución, si existe. */
  solutionSource?: SourceRef;
  source: SourceRef;
}

export type QuestionLevel = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: string;
  level?: QuestionLevel;
  prompt: string;
  /** Respuesta razonada SOLO si la guía la provee. */
  answer?: string;
  origin: Provenance;
  source: SourceRef;
}

/** Una sección X.y de la guía, delimitada como unidad de contenido. */
export interface Section {
  id: string;
  number: string;
  title: string;
  source: SourceRef;
  concept: ContentBlock[];
  analogy: ContentBlock[];
  codeBlocks: CodeBlockData[];
  commonMistakes: ContentBlock[];
  exercises: Exercise[];
  questions: Question[];
  keyPoints: ContentBlock[];
}

/** Un módulo = un capítulo de la guía (traza directa). */
export interface Module {
  /** ID estable, ej. "m01-fundamentos". */
  id: string;
  /** Capítulo de la guía que representa. */
  chapter: number;
  title: string;
  subtitle: string;
  summary: ContentBlock[];
  /** Recompensa numérica SIN lógica (FASE 5). */
  xp?: number;
  /** Preparado para Java ↔ Dart (FASE 4). Vacío en FASE 3 (decisión 1). */
  dart?: { available: false };
  sections: Section[];
}

/* ========================= Recursos transversales =========================
 * No son módulos M01–M10: el cap. 11 (mapa conceptual) y el cap. 14
 * (glosario) se modelan como recursos independientes reutilizables.
 * FASE 3: solo datos + lectura. Lógica de búsqueda/filtros → etapas posteriores.
 */

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export type TransversalResourceKind = "mapa-conceptual" | "glosario";

export interface TransversalResource {
  /** ID estable, ej. "mapa-conceptual-poo". */
  id: string;
  kind: TransversalResourceKind;
  title: string;
  subtitle: string;
  /** Capítulo de la guía al que traza (nunca un módulo M01–M10). */
  chapter: number;
  source: SourceRef;
  /** Diagramas Mermaid verbatim (render en FASE 4). */
  mermaid: ContentBlock[];
  /** Párrafos de lectura que la propia guía provee. */
  lectura: ContentBlock[];
  /** Términos del glosario (kind "glosario"). */
  terms: GlossaryTerm[];
}

/* ========================= Banco de preguntas (cap. 12) =========================
 * 90 preguntas reales, agrupadas por nivel (20/20/20/15/15). La guía NO da
 * opciones ni respuestas en el capítulo 12: todo queda reflexivo/open.
 */

export interface BankGroup {
  /** Nivel 1..5 según la fuente. */
  level: QuestionLevel;
  /** Título verbatim, ej. "Nivel 1 — Conceptual (20)". */
  title: string;
  /** Conteo declarado por la fuente. */
  count: number;
  questions: Question[];
}

export interface QuestionBank {
  id: "banco-preguntas";
  title: string;
  subtitle: string;
  chapter: 12;
  source: SourceRef;
  /** Conteo real verificado (90). */
  total: number;
  groups: BankGroup[];
}

/* ========================= Simulacro (cap. 13) =========================
 * 30 preguntas con solucionario completo (Partes I–V). Respuestas y
 * explicaciones SOLO cuando el solucionario las provee.
 */

export type SimPart = "I" | "II" | "III" | "IV" | "V";

export interface SimulacroQuestion {
  id: string;
  part: SimPart;
  prompt: string;
  /** Parte I: 4 opciones verbatim. */
  options?: string[];
  /** Código/Mermaid de entrada (Partes III–IV). */
  attachment?: ContentBlock;
  /** Respuesta del solucionario (texto). */
  answer?: string;
  /** Justificación del solucionario, si existe. */
  answerExplanation?: string;
  /** Solución Mermaid/Java (Parte IV). */
  answerAttachment?: ContentBlock;
  /** Dónde está la pregunta en la guía. */
  source: SourceRef;
  /** Dónde está la respuesta en el solucionario. */
  answerSource?: SourceRef;
}

export interface SimulacroPart {
  id: string;
  /** Título verbatim, ej. "Parte I — Selección Múltiple (10)". */
  title: string;
  count: number;
  questions: SimulacroQuestion[];
}

export interface Simulacro {
  id: "simulacro";
  title: string;
  subtitle: string;
  chapter: 13;
  source: SourceRef;
  /** Instrucciones verbatim de la guía. */
  instructions: string;
  parts: SimulacroPart[];
  solucionarioSource: SourceRef;
}

/* ========================= Repaso (cap. 15) y Checklist (cap. 16) =========================
 * No son módulos: recursos de cierre de la guía (lectura/revisión).
 */

export interface RepasoResource {
  id: "repaso";
  title: string;
  subtitle: string;
  chapter: 15;
  source: SourceRef;
  /** Tabla Concepto | Definición | Palabra clave | Cómo reconocerlo (16 filas). */
  table: ContentTable;
  /** Las 20 cosas que definitivamente debes saber (verbatim). */
  pivotItems: string[];
}

export interface ChecklistResource {
  id: "checklist";
  title: string;
  subtitle: string;
  chapter: 16;
  source: SourceRef;
  /** 30 elementos verbatim en orden original (sin casillas funcionales). */
  items: string[];
  /** Cita de cierre de la guía (anexa al checklist, l.2800). */
  closingQuote?: { text: string; source: SourceRef };
}