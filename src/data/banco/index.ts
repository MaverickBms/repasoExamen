import { QUESTION_BANK } from "./banco-preguntas";
import { SIMULACRO } from "./simulacro";

/** Capítulos 12–13 modelados para el sistema de evaluación (FASE 4–5). */
export const EXAM_RESOURCES = [QUESTION_BANK, SIMULACRO] as const;

export function getExamResource(id: string) {
  return EXAM_RESOURCES.find((r) => r.id === id);
}