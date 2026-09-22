import type {
  CodeBlockData,
  ContentBlock,
  Exercise,
  Question,
  QuestionLevel,
  Section,
  SourceRef,
} from "../types";

export const p = (text: string): ContentBlock => ({ kind: "paragraph", text });

export const items = (list: string[], ordered = false): ContentBlock => ({
  kind: "list",
  items: list,
  ordered,
});

export const quote = (text: string): ContentBlock => ({ kind: "quote", text });

export const table = (
  headers: string[],
  rows: string[][],
  caption?: string,
): ContentBlock => ({ kind: "table", table: { headers, rows, caption } });

export const mermaid = (src: string): ContentBlock => ({
  kind: "mermaid",
  mermaid: src,
});

export const code = (src: string): ContentBlock => ({ kind: "code", code: src });

export function cb(
  id: string,
  source: SourceRef,
  code: string,
  language: "java" | "text" | "dart" = "java",
  extra?: Partial<Pick<CodeBlockData, "title" | "explanation" | "expectedOutput">>,
): CodeBlockData {
  return { id, source, code, language, ...extra };
}

export function ex(
  sectionId: string,
  index: number,
  source: SourceRef,
  data: Omit<Exercise, "id" | "source">,
): Exercise {
  return { id: `${sectionId}-ex${index}`, source, ...data };
}

export function q(
  sectionId: string,
  index: number,
  source: SourceRef,
  prompt: string,
  answer?: string,
  level?: QuestionLevel,
): Question {
  return {
    id: `${sectionId}-q${index}`,
    source,
    prompt,
    answer,
    level,
    origin: "guia",
  };
}

type SectionFields = Partial<
  Pick<
    Section,
    | "concept"
    | "analogy"
    | "codeBlocks"
    | "commonMistakes"
    | "exercises"
    | "questions"
    | "keyPoints"
  >
>;

/**
 * Crea un builder de secciones para un módulo/capítulo.
 * Mantiene IDs estables (mXX-sNN) y el SourceRef de cada sección.
 */
export function makeSectionBuilder(moduleId: string, chapter: number) {
  return (
    number: string,
    title: string,
    sourceRange: string | undefined,
    fields: SectionFields = {},
  ): Section => ({
    id: `${moduleId}-s${number.replace(/\./g, "")}`,
    number,
    title,
    source: {
      chapter,
      section: number,
      ...(sourceRange ? { lines: sourceRange } : {}),
    },
    concept: fields.concept ?? [],
    analogy: fields.analogy ?? [],
    codeBlocks: fields.codeBlocks ?? [],
    commonMistakes: fields.commonMistakes ?? [],
    exercises: fields.exercises ?? [],
    questions: fields.questions ?? [],
    keyPoints: fields.keyPoints ?? [],
  });
}