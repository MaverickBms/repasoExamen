import type { Module } from "../types";
import { M01_FUNDAMENTOS } from "./m01-fundamentos";
import { M02_PARADIGMAS } from "./m02-paradigmas";
import { M03_OBJETOS_CLASES } from "./m03-objetos-clases";
import { M04_ABSTRACCION } from "./m04-abstraccion";
import { M05_ENCAPSULAMIENTO } from "./m05-encapsulamiento";
import { M06_HERENCIA } from "./m06-herencia";
import { M07_POLIMORFISMO } from "./m07-polimorfismo";
import { M08_UML_RELACIONES } from "./m08-uml-relaciones";
import { M09_PRINCIPIOS_DISENO } from "./m09-principios-diseno";
import { M10_SISTEMA_ACADEMICO } from "./m10-sistema-academico";

/**
 * Registro de módulos cargados.
 * FASE 3 — etapas 1–5: capítulos 1–10 disponibles (106/106 secciones).
 */
export const MODULES: Module[] = [
  M01_FUNDAMENTOS,
  M02_PARADIGMAS,
  M03_OBJETOS_CLASES,
  M04_ABSTRACCION,
  M05_ENCAPSULAMIENTO,
  M06_HERENCIA,
  M07_POLIMORFISMO,
  M08_UML_RELACIONES,
  M09_PRINCIPIOS_DISENO,
  M10_SISTEMA_ACADEMICO,
];

export function getModule(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getModuleByChapter(chapter: number): Module | undefined {
  return MODULES.find((m) => m.chapter === chapter);
}

/** Total de secciones cargadas (para revisor de cobertura). */
export const MODULE_SECTION_COUNT: Record<string, number> = Object.fromEntries(
  MODULES.map((m) => [m.id, m.sections.length]),
);