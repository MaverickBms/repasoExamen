import type { Module } from "../types";
import {
  cb,
  items,
  makeSectionBuilder,
  p,
  q,
} from "./helpers";

const ref = makeSectionBuilder("m09-principios-diseno", 9);

const COMPOSICION_STACK = `// ❌ Herencia por reutilización
class Stack<T> extends ArrayList<T> { ... }

// ✅ Composición
class Stack<T> {
    private final List<T> elementos = new ArrayList<>();
    public void push(T e) { elementos.add(e); }
    public T pop() { return elementos.remove(elementos.size() - 1); }
}`;

const PUNTO_INMUTABLE = `public final class Punto {
    private final int x, y;
    public Punto(int x, int y) { this.x = x; this.y = y; }
    public int getX() { return x; }
    public int getY() { return y; }
}`;

export const M09_PRINCIPIOS_DISENO: Module = {
  id: "m09-principios-diseno",
  chapter: 9,
  title: "Principios de Diseño",
  subtitle: "Cohesión, acoplamiento, SOLID, composición e inmutabilidad — guiaPOO.md · capítulo 9",
  xp: 50,
  dart: { available: false },
  summary: [
    p(
      "Este capítulo reúne los criterios de diseño que guían decisiones en POO: **cohesión y acoplamiento**, los **principios SOLID**, **composición sobre herencia**, **inmutabilidad** y el **diseño orientado a comportamiento**.",
    ),
  ],
  sections: [
    ref("9.1", "Cohesión y acoplamiento", "2058–2063", {
      concept: [
        items([
          "**Cohesión**: grado en que los elementos de un módulo/clase están relacionados entre sí. **Alta cohesión** es deseable.",
          "**Acoplamiento**: grado de dependencia entre módulos/clases. **Bajo acoplamiento** es deseable.",
        ]),
        p(
          "Una clase con **alta cohesión y bajo acoplamiento** es fácil de entender, probar y modificar.",
        ),
      ],
    }),

    ref("9.2", "Principios SOLID", "2065–2071", {
      concept: [
        items([
          "**S — Single Responsibility Principle (SRP)**: una clase debe tener una sola razón para cambiar.",
          "**O — Open/Closed Principle (OCP)**: abierta a extensión, cerrada a modificación. Se materializa con polimorfismo e interfaces.",
          "**L — Liskov Substitution Principle (LSP)**: los subtipos deben poder sustituir a sus supertipos sin romper el programa.",
          "**I — Interface Segregation Principle (ISP)**: es mejor varias interfaces específicas que una interfaz general. Los clientes no deben depender de métodos que no usan.",
          "**D — Dependency Inversion Principle (DIP)**: depende de abstracciones, no de implementaciones concretas.",
        ]),
      ],
    }),

    ref("9.3", "Composición sobre herencia", "2073–2087", {
      concept: [
        p(
          "Cuando la relación no es claramente «es un», o cuando sólo se busca reutilizar comportamiento, la **composición** ofrece más flexibilidad y menor acoplamiento.",
        ),
      ],
      codeBlocks: [
        cb("m09-s93-c1", { chapter: 9, section: "9.3", lines: "2077–2087" }, COMPOSICION_STACK, "java", {
          title: "Herencia por reutilización vs composición",
        }),
      ],
    }),

    ref("9.4", "Inmutabilidad", "2089–2100", {
      concept: [
        p(
          "Un objeto **inmutable** no cambia su estado después de la construcción. Ventajas: seguridad en concurrencia, razonamiento más simple, uso seguro como claves en mapas.",
        ),
      ],
      codeBlocks: [
        cb("m09-s94-c1", { chapter: 9, section: "9.4", lines: "2093–2100" }, PUNTO_INMUTABLE, "java", {
          title: "Clase inmutable Punto",
        }),
      ],
    }),

    ref("9.5", "Diseño orientado a comportamiento", "2102–2104", {
      concept: [
        p(
          "Prefiere métodos con **sentido de negocio** sobre getters/setters genéricos. El objeto debe **saber hacer**, no sólo **exponer**.",
        ),
      ],
    }),

    ref("9.6", "Preguntas de evaluación", "2106–2117", {
      questions: [
        q("m09-principios-diseno-s96", 1, { chapter: 9, section: "9.6", lines: "2106–2117" }, "¿Qué es cohesión? ¿Qué es acoplamiento?"),
        q("m09-principios-diseno-s96", 2, { chapter: 9, section: "9.6", lines: "2106–2117" }, "¿Por qué conviene alta cohesión y bajo acoplamiento?"),
        q("m09-principios-diseno-s96", 3, { chapter: 9, section: "9.6", lines: "2106–2117" }, "Explica los cinco principios SOLID con ejemplos."),
        q("m09-principios-diseno-s96", 4, { chapter: 9, section: "9.6", lines: "2106–2117" }, "¿Cuándo conviene composición sobre herencia?"),
        q("m09-principios-diseno-s96", 5, { chapter: 9, section: "9.6", lines: "2106–2117" }, "¿Qué ventajas tiene la inmutabilidad?"),
        q("m09-principios-diseno-s96", 6, { chapter: 9, section: "9.6", lines: "2106–2117" }, "¿Qué significa «Tell, Don't Ask»?"),
        q("m09-principios-diseno-s96", 7, { chapter: 9, section: "9.6", lines: "2106–2117" }, "¿Cómo se relaciona OCP con polimorfismo?"),
        q("m09-principios-diseno-s96", 8, { chapter: 9, section: "9.6", lines: "2106–2117" }, "¿Cómo afecta DIP al testing?"),
        q("m09-principios-diseno-s96", 9, { chapter: 9, section: "9.6", lines: "2106–2117" }, "¿Qué problema resuelve ISP?"),
        q("m09-principios-diseno-s96", 10, { chapter: 9, section: "9.6", lines: "2106–2117" }, "¿Cómo se relaciona LSP con herencia?"),
      ],
    }),
  ],
};