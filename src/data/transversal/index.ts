import { GLOSARIO } from "./glosario";
import { MAPA_CONCEPTUAL_POO } from "./mapa-conceptual";
import type { TransversalResource } from "../types";

/**
 * Registro de recursos transversales (FASE 3, etapa 6).
 * No son módulos M01–M10; se consultan por ID desde páginas propias.
 * Las etapas 7–8 agregan banco, simulacro, repaso y checklist.
 */
export const TRANSVERSAL_RESOURCES: TransversalResource[] = [
  MAPA_CONCEPTUAL_POO,
  GLOSARIO,
];

export function getTransversalResource(id: string): TransversalResource | undefined {
  return TRANSVERSAL_RESOURCES.find((r) => r.id === id);
}

export const TRANSVERSAL_SECTION_COUNT: Record<string, number> = {
  ...Object.fromEntries(
    TRANSVERSAL_RESOURCES.map((r) => [r.id, r.kind === "glosario" ? r.terms.length : r.mermaid.length]),
  ),
};