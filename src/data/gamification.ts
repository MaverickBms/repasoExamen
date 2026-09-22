/**
 * Gamificación — datos de la APLICACIÓN (no son contenido académico de la guía).
 * Niveles, umbrales de XP y badges vinculados a acciones educativas reales.
 * Documentado en docs/TRAZABILIDAD.md (decisión D-E9-app).
 */
import type { IconName } from "../components/common/icons";

export interface LevelDef {
  id: "rookie" | "driver" | "engineer" | "developer" | "architect";
  name: string;
  /** XP mínimo para alcanzar este nivel. */
  minXp: number;
  icon: IconName;
}

export const LEVELS: LevelDef[] = [
  { id: "rookie", name: "Rookie", minXp: 0, icon: "flag" },
  { id: "driver", name: "Driver", minXp: 150, icon: "road" },
  { id: "engineer", name: "Engineer", minXp: 400, icon: "code" },
  { id: "developer", name: "Developer", minXp: 800, icon: "star" },
  { id: "architect", name: "Architect", minXp: 1400, icon: "trophy" },
];

export function levelForXp(xp: number): LevelDef {
  let cur = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.minXp) cur = l;
    else break;
  }
  return cur;
}

export function nextLevelForXp(xp: number): LevelDef | null {
  return LEVELS.find((l) => l.minXp > xp) ?? null;
}

export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export const BADGES: BadgeDef[] = [
  {
    id: "primer-paso",
    title: "Primer paso",
    description: "Complete su primera actividad interactiva.",
    icon: "check",
  },
  {
    id: "ejercicio-hecho",
    title: "Ejercicio resuelto",
    description: "Responda o reflexione sobre un ejercicio de la guía.",
    icon: "code",
  },
  {
    id: "simulacro-hecho",
    title: "Simulacro entregado",
    description: "Complete el simulacro del capítulo 13.",
    icon: "timer",
  },
  {
    id: "simulacro-fuerte",
    title: "Base sólida",
    description: "Acierte al 70 % o más de las partes evaluables del simulacro.",
    icon: "trophy",
  },
  {
    id: "banco-practica",
    title: "Entrenador",
    description: "Reflexione sobre cinco preguntas del banco (capítulo 12) en una sesión.",
    icon: "bank",
  },
  {
    id: "desafio-dia",
    title: "Desafío del día",
    description: "Complete el desafío diario de reflexión.",
    icon: "flag",
  },
  {
    id: "racha-3",
    title: "Racha viva",
    description: "Consiga una racha de tres días seguidos.",
    icon: "star",
  },
  {
    id: "checklist-10",
    title: "Ya casi",
    description: "Marque 10 elementos del checklist final.",
    icon: "check",
  },
  {
    id: "checklist-completo",
    title: "Listo para el examen",
    description: "Complete los 30 elementos del checklist del capítulo 16.",
    icon: "trophy",
  },
  {
    id: "ruta-completa",
    title: "Ruta recorrida",
    description: "Marque los 10 módulos como revisados.",
    icon: "road",
  },
  {
    id: "arquitecto",
    title: "Arquitecto",
    description: "Alcance el nivel Architect.",
    icon: "diagram",
  },
];