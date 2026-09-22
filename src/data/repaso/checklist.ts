/**
 * Capítulo 16 — Checklist Final de Preparación
 * (Documentation/guiaPOO.md, l.2765–2797 y cita de cierre l.2800).
 * 30 elementos verbatim en su orden original. Casillas NO funcionales
 * (FASE 3 = lectura); interactividad/progreso en fases posteriores.
 */
import type { ChecklistResource, SourceRef } from "../types";

const ref = (lines: string): SourceRef => ({ chapter: 16, section: "16", lines });

const items: string[] = [
  "Puedo explicar qué es POO.",
  "Puedo diferenciar una clase de un objeto.",
  "Puedo explicar los cuatro pilares.",
  "Puedo diferenciar abstracción y encapsulamiento.",
  "Puedo explicar una clase abstracta.",
  "Puedo explicar una interfaz.",
  "Puedo diferenciar clase abstracta e interfaz.",
  "Puedo explicar encapsulamiento.",
  "Puedo utilizar modificadores de acceso.",
  "Puedo explicar constructores.",
  "Puedo explicar `static`.",
  "Puedo explicar `final`.",
  "Puedo explicar herencia.",
  "Puedo interpretar una relación de herencia en UML.",
  "Puedo explicar polimorfismo.",
  "Puedo diferenciar overloading y overriding.",
  "Puedo interpretar un diagrama de clases.",
  "Puedo identificar asociación.",
  "Puedo identificar agregación.",
  "Puedo identificar composición.",
  "Puedo transformar UML a código.",
  "Puedo deducir UML a partir de código.",
  "Puedo aplicar el Principio de Liskov.",
  "Puedo justificar composición sobre herencia.",
  "Puedo implementar una jerarquía polimórfica en Java.",
  "Puedo escribir código encapsulado con validaciones.",
  "Puedo diseñar un sistema pequeño de 4–6 clases con UML.",
  "Puedo explicar SRP, OCP, LSP, ISP y DIP.",
  "Puedo diferenciar `==` y `equals()`.",
  "Puedo explicar inmutabilidad y sus ventajas.",
];

export const CHECKLIST: ChecklistResource = {
  id: "checklist",
  title: "Checklist final de preparación",
  subtitle: "Los 30 elementos de autoevaluación previos al examen (cap. 16).",
  chapter: 16,
  source: ref("2765–2797"),
  items,
  closingQuote: {
    text: "El diseño orientado a objetos no se trata de clases; se trata de responsabilidades, colaboraciones y evolución.",
    source: { chapter: 16, section: "16", lines: "2800", note: "Cita de cierre de la guía" },
  },
};