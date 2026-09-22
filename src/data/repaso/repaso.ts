/**
 * Capítulo 15 — Repaso de Alto Rendimiento (Documentation/guiaPOO.md, l.2719–2763).
 * Solo lo que la fuente provee: 1 tabla (16 filas) + las 20 cosas que
 * definitivamente debes saber (verbatim). Nada inventado (regla I).
 * NOTA: la guía NO contiene subsecciones numeradas 15.1–15.12.
 */
import type { ContentTable, RepasoResource } from "../types";

const rows: string[][] = [
  ["POO", "Paradigma basado en objetos", "Objetos + mensajes", 'Enunciados con "modelar", "entidades"'],
  ["Clase", "Plantilla", "Molde", "Declaración `class`"],
  ["Objeto", "Instancia", "Real", "`new`, `heap`"],
  ["Encapsulamiento", "Ocultar estado", "`private`, getters", "Atributos `private` + métodos"],
  ["Abstracción", "Modelar lo esencial", "Contrato", "`abstract`, `interface`"],
  ["Herencia", "Es un", "`extends`", "Flecha triangular UML"],
  ["Polimorfismo", "Misma interfaz, distintos comportamientos", "Despacho", "Referencia padre, objeto hijo"],
  ["Overloading", "Misma clase, distinta firma", "Compilación", "Varios métodos iguales en nombre"],
  ["Overriding", "Subclase redefine", "Runtime", "`@Override`"],
  ["Asociación", "Vínculo", '"conoce a"', "Línea simple"],
  ["Agregación", "Todo-parte débil", "◇—", "Rombo vacío"],
  ["Composición", "Todo-parte fuerte", "◆—", "Rombo relleno"],
  ["Dependencia", "Usa", "⇢", "Línea discontinua"],
  ["Realización", "Implementa", "◁⇢", "Línea discontinua + triángulo"],
  ["`static`", "De la clase", "Compartido", "`static`, acceso por clase"],
  ["`final`", "Constante/no heredable", "Inmutable", "`final`"],
];

const table: ContentTable = {
  headers: ["Concepto", "Definición", "Palabra clave", "Cómo reconocerlo"],
  rows,
};

const pivotItems: string[] = [
  "POO = objetos + mensajes + estado + comportamiento + identidad.",
  "Cuatro pilares: **A**bstracción, **E**ncapsulamiento, **H**erencia, **P**olimorfismo.",
  "Clase = plantilla; objeto = instancia.",
  "`private` para atributos; `public` para API.",
  "Getter ≠ encapsulamiento completo.",
  "`static` = pertenece a la clase, no a la instancia.",
  "Java no tiene destructores; usa `try-with-resources`.",
  "Clase abstracta = puede tener estado + contrato parcial.",
  "Interfaz = contrato puro, sin estado.",
  'Herencia = "es un"; composición = "tiene un".',
  "Favorece composición sobre herencia.",
  "LSP: subclase sustituye a superclase sin romper.",
  "Polimorfismo = despacho dinámico.",
  "Overloading = compile-time; overriding = runtime.",
  "`@Override` valida sobrescritura.",
  "Asociación = conoce a; agregación = todo débil; composición = todo fuerte.",
  "UML ≠ lenguaje de programación.",
  "Diagrama de clases es el más importante para POO.",
  "Cardinalidades: `1`, `0..1`, `*`, `1..*`.",
  "Diseño > sintaxis. La POO es una **forma de pensar**.",
];

export const REPASO: RepasoResource = {
  id: "repaso",
  title: "Repaso de alto rendimiento",
  subtitle: "Tabla de conceptos y las 20 cosas que definitivamente debes saber (cap. 15).",
  chapter: 15,
  source: { chapter: 15, section: "15", lines: "2719–2763" },
  table,
  pivotItems,
};