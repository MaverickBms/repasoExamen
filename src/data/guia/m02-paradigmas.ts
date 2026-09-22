import type { Module } from "../types";
import {
  cb,
  items,
  makeSectionBuilder,
  p,
  q,
  quote,
  table,
} from "./helpers";

const ref = makeSectionBuilder("m02-paradigmas", 2);

export const M02_PARADIGMAS: Module = {
  id: "m02-paradigmas",
  chapter: 2,
  title: "POO vs otros paradigmas",
  subtitle: "¿Cómo se compara la POO con la programación estructurada, funcional, declarativa y otras? — guiaPOO.md · capítulo 2",
  xp: 40,
  dart: { available: false },
  summary: [
    quote(
      "No hay paradigma «mejor». Hay **paradigmas adecuados** a cada problema. La POO brilla en dominios ricos y sistemas extensibles; la estructurada en algoritmos puros; la funcional en transformaciones sin estado; la declarativa en consultas.",
    ),
  ],
  sections: [
    ref("2.1", "Programación estructurada", "401–446", {
      concept: [
        p(
          "Paradigma popularizado por Edsger Dijkstra y otros, que organiza el código mediante **secuencia, selección e iteración**, evitando el uso indiscriminado de `goto`. El programa se descompone en **funciones/procedimientos**.",
        ),
        p("¿Cómo organiza el código?"),
        items([
          "**Datos**: variables globales o locales, agrupadas en estructuras (structs, records).",
          "**Lógica**: funciones/procedimientos independientes que operan sobre esos datos.",
        ]),
        p("**Ventajas**"),
        items([
          "Sencillez conceptual.",
          "Adecuada para algoritmos de cálculo.",
          "Eficiencia.",
          "Amplio soporte en todos los lenguajes.",
        ]),
        p("**Limitaciones**"),
        items([
          "Datos y funciones separados → fácil corrupción del estado.",
          "Difícil de extender sin modificar lo existente.",
          "Escasa modelación del dominio.",
        ]),
        p(
          "Los datos (`struct Cuenta`) y las funciones (`depositar`, `retirar`) están **separados**. Nada impide que otro código modifique `c->saldo` directamente.",
        ),
      ],
      codeBlocks: [
        cb(
          "m02-s01-c1",
          { chapter: 2, section: "2.1", lines: "425–443" },
          `// Programación estructurada (pseudocódigo tipo C)
struct Cuenta {
    char id[10];
    double saldo;
};

void depositar(struct Cuenta* c, double monto) {
    if (monto <= 0) return;
    c->saldo += monto;
}

void retirar(struct Cuenta* c, double monto) {
    if (monto <= 0 || monto > c->saldo) return;
    c->saldo -= monto;
}`,
          "text",
          { title: "Datos y funciones separados" },
        ),
      ],
    }),

    ref("2.2", "POO", "447–469", {
      concept: [
        p("¿Cómo organiza el software?"),
        items([
          "**Clases**: encapsulan datos + comportamiento.",
          "**Objetos**: instancias con estado propio.",
          "**Responsabilidades**: cada objeto sabe lo que le compete.",
          "**Relaciones**: asociación, herencia, composición.",
        ]),
        table(
          [
            "Aspecto",
            "Programación Estructurada",
            "Programación Orientada a Objetos",
          ],
          [
            ["Unidad básica", "Función / procedimiento", "Clase / objeto"],
            ["Organización", "Por operaciones", "Por entidades del dominio"],
            ["Datos", "Separados de la lógica", "Encapsulados en objetos"],
            ["Reutilización", "Bibliotecas de funciones", "Herencia, composición, interfaces"],
            ["Extensibilidad", "Modificar código existente", "Añadir clases (Abierto/Cerrado)"],
            ["Relación con el dominio", "Débil", "Fuerte (modelado)"],
            ["Complejidad inicial", "Baja", "Media-alta"],
            ["Adecuada para", "Algoritmos, scripts", "Sistemas complejos con dominio rico"],
            ["Ejemplo lenguaje", "C, Pascal, Fortran", "Java, C++, C#, Python"],
          ],
          "Tabla comparativa: estructurada vs POO",
        ),
      ],
    }),

    ref("2.3", "Otros paradigmas", "470–526", {
      concept: [
        p("**Programación procedural / procedimental**"),
        items([
          "**Definición**: subconjunto de la estructurada; enfatiza procedimientos que operan sobre datos.",
          "**Idea central**: «el programa es una secuencia de procedimientos».",
          "**Estructura**: procedimientos + datos globales.",
          "**Ejemplo**: la función `depositar` anterior.",
          "**Casos de uso**: utilidades CLI, parsers, scripts de sistema.",
          "**Relación con POO**: subyacente a ella (los métodos son procedimientos encapsulados).",
        ]),
        p("**Programación funcional**"),
        items([
          "**Definición**: paradigma donde las funciones son **ciudadanos de primera clase** y se evitan **efectos secundarios**.",
          "**Idea central**: composición de funciones puras.",
          "**Estructura**: funciones que reciben y devuelven valores, sin estado mutable.",
          "**Lenguajes**: Haskell, Lisp, Clojure, F#; también soportado en Java (lambdas, streams).",
          "**Casos de uso**: procesamiento de datos, concurrencia, transformaciones.",
          "**Relación con POO**: coexisten (Java moderno es multiparadigma).",
        ]),
        p("**Programación declarativa**"),
        items([
          "**Definición**: describe **qué** se quiere, no **cómo** obtenerlo.",
          "**Idea central**: el programador describe el resultado; el motor decide el procedimiento.",
          "**Ejemplo**: SQL, HTML, Prolog (declarativo lógico).",
          "**Casos de uso**: consultas, configuraciones, UI.",
        ]),
        p("**Programación lógica**"),
        items([
          "**Definición**: se basa en **hechos y reglas**; el motor infiere conclusiones.",
          "**Casos de uso**: sistemas expertos, IA simbólica, procesamiento de lenguaje natural.",
        ]),
        p("**Programación orientada a eventos**"),
        items([
          "**Definición**: el flujo se determina por **eventos** externos (clicks, mensajes, sensores).",
          "**Estructura**: bucles de eventos + manejadores (handlers).",
          "**Ejemplo**: aplicaciones GUI, servidores reactivos, Node.js.",
          "**Relación con POO**: los manejadores suelen ser objetos/observadores.",
        ]),
        p("**Programación multiparadigma**"),
        items([
          "Lenguajes como **Java, C++, Python, JavaScript, Kotlin, Scala** soportan **varios paradigmas** simultáneamente.",
        ]),
      ],
      codeBlocks: [
        cb(
          "m02-s03-c1",
          { chapter: 2, section: "2.3", lines: "487–492" },
          `List<Integer> dobles = List.of(1, 2, 3).stream()
    .map(x -> x * 2)
    .toList();`,
          "java",
          { title: "Funcional en Java (lambdas, streams)" },
        ),
        cb(
          "m02-s03-c2",
          { chapter: 2, section: "2.3", lines: "501–503" },
          `SELECT nombre FROM estudiantes WHERE promedio > 4.0;`,
          "text",
          { title: "Declarativa (SQL)" },
        ),
        cb(
          "m02-s03-c3",
          { chapter: 2, section: "2.3", lines: "509–513" },
          `padre(juan, maria).
abuelo(X, Z) :- padre(X, Y), padre(Y, Z).`,
          "text",
          { title: "Lógica (Prolog)" },
        ),
      ],
    }),

    ref("2.4", "Tabla comparativa general", "527–538", {
      concept: [
        table(
          ["Paradigma", "Unidad básica", "Estado", "Enfoque", "Ejemplo"],
          [
            ["Estructurada", "Función", "Global/local", "Secuencia + control", "C"],
            ["Procedural", "Procedimiento", "Global/local", "Operaciones sobre datos", "Pascal"],
            ["Orientada a Objetos", "Objeto", "Encapsulado", "Entidades del dominio", "Java"],
            ["Funcional", "Función pura", "Inmutable", "Composición", "Haskell"],
            ["Declarativa", "Expresión", "Variable", "Qué, no cómo", "SQL"],
            ["Lógica", "Hecho + Regla", "Base de conocimiento", "Inferencia", "Prolog"],
            ["Orientada a Eventos", "Manejador", "Estado del evento", "Reacción", "JS (DOM)"],
          ],
          "Paradigmas en una tabla",
        ),
      ],
    }),

    ref("2.5", "Errores comunes", "539–545", {
      commonMistakes: [
        items([
          "Creer que **POO sustituye completamente** a otros paradigmas.",
          "Pensar que «usar clases» garantiza estar haciendo POO.",
          "Asumir que la programación estructurada es «anticuada» — sigue siendo apropiada para muchos problemas.",
          "Confundir **funcional** con «usar funciones».",
        ]),
      ],
    }),

    ref("2.6", "Preguntas de evaluación", "546–563", {
      questions: [
        q("m02-paradigmas-s26", 1, { chapter: 2, section: "2.6", lines: "546–558" }, "¿Qué diferencia sustancial hay entre programación estructurada y POO?"),
        q("m02-paradigmas-s26", 2, { chapter: 2, section: "2.6", lines: "546–558" }, "Da un ejemplo donde la programación estructurada sea preferible."),
        q("m02-paradigmas-s26", 3, { chapter: 2, section: "2.6", lines: "546–558" }, "¿Por qué Java se considera multiparadigma?"),
        q("m02-paradigmas-s26", 4, { chapter: 2, section: "2.6", lines: "546–558" }, "Explica con un ejemplo qué es una función pura."),
        q("m02-paradigmas-s26", 5, { chapter: 2, section: "2.6", lines: "546–558" }, "¿En qué se diferencia programación declarativa de imperativa?"),
        q("m02-paradigmas-s26", 6, { chapter: 2, section: "2.6", lines: "546–558" }, "¿Cuándo es apropiada la programación orientada a eventos?"),
        q("m02-paradigmas-s26", 7, { chapter: 2, section: "2.6", lines: "546–558" }, "¿Cómo se relacionan POO y programación funcional en Java moderno?"),
        q("m02-paradigmas-s26", 8, { chapter: 2, section: "2.6", lines: "546–558" }, "¿Qué ventaja ofrece POO sobre estructurada en sistemas que cambian?"),
        q("m02-paradigmas-s26", 9, { chapter: 2, section: "2.6", lines: "546–558" }, "Enumera tres limitaciones de la programación estructurada."),
        q("m02-paradigmas-s26", 10, { chapter: 2, section: "2.6", lines: "546–558" }, "¿Se puede hacer POO sin herencia? Justifica."),
      ],
      keyPoints: [
        quote(
          "No hay paradigma «mejor». Hay **paradigmas adecuados** a cada problema. La POO brilla en dominios ricos y sistemas extensibles; la estructurada en algoritmos puros; la funcional en transformaciones sin estado; la declarativa en consultas.",
        ),
      ],
    }),
  ],
};