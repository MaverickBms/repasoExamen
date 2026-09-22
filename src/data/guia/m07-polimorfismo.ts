import type { Module } from "../types";
import {
  cb,
  ex,
  items,
  makeSectionBuilder,
  p,
  q,
  quote,
  table,
} from "./helpers";

const ref = makeSectionBuilder("m07-polimorfismo", 7);

const CALCULADORA = `public class Calculadora {
    public int sumar(int a, int b) { return a + b; }
    public int sumar(int a, int b, int c) { return a + b + c; }
    public double sumar(double a, double b) { return a + b; }
}`;

const OVERRIDING_EJ = `public class Animal {
    public String sonido() { return "..."; }
}

public class Perro extends Animal {
    @Override
    public String sonido() { return "Guau"; }
}`;

const DESPACHO = `Animal a = new Perro();
a.sonido(); // "Guau" — despacho dinámico`;

const DESPACHO_SEQUENCE = `sequenceDiagram
    participant Cliente
    participant Animal
    participant Perro
    Cliente->>Animal: sonido()
    Note over Animal: referencia apunta a Perro
    Animal->>Perro: invoca implementación real
    Perro-->>Cliente: "Guau"`;

const FUNCIONAL_POLI = `public class Animal {
    public String sonido() { return "..."; }
    public void presentarse() {
        System.out.println("Soy un animal y hago " + sonido());
    }
}

public class Perro extends Animal {
    @Override
    public String sonido() { return "Guau"; }
}

public class Gato extends Animal {
    @Override
    public String sonido() { return "Miau"; }
}

public class Main {
    public static void main(String[] args) {
        Animal[] animales = { new Perro(), new Gato(), new Animal() };
        for (Animal a : animales) {
            a.presentarse(); // polimorfismo
        }
    }
}`;

const ERROR_TIPICO = `Animal a = new Perro();
a.moverCola(); // ERROR de compilación`;

const ERROR_CORREGIDO = `if (a instanceof Perro p) { // pattern matching (Java 16+)
    p.moverCola();
}`;

export const M07_POLIMORFISMO: Module = {
  id: "m07-polimorfismo",
  chapter: 7,
  title: "Polimorfismo",
  subtitle: "Mismo mensaje, distintas respuestas — guiaPOO.md · capítulo 7",
  xp: 50,
  dart: { available: false },
  summary: [
    p(
      "**Polimorfismo** (del griego: *poly* = muchos, *morphē* = forma) es la capacidad de que **una misma interfaz** presente **múltiples comportamientos**. En POO, una **referencia a un tipo general** puede apuntar a objetos de **subtipos concretos** y ejecutar **su comportamiento específico**.",
    ),
  ],
  sections: [
    ref("7.1", "Definición", "1565–1569", {
      concept: [
        p(
          "**Polimorfismo** (del griego: *poly* = muchos, *morphē* = forma) es la capacidad de que **una misma interfaz** presente **múltiples comportamientos**.",
        ),
        p(
          "En POO, se refiere a que **una referencia a un tipo general** puede apuntar a objetos de **subtipos concretos** y ejecutar **su comportamiento específico**.",
        ),
      ],
    }),

    ref("7.2", "Tipos de polimorfismo", "1571–1583", {
      concept: [
        p("**En tiempo de compilación: Overloading.** Múltiples métodos con **mismo nombre** pero **distinta firma** en la **misma clase**."),
        p(
          "**En tiempo de ejecución: Overriding.** La subclase redefine un método de la superclase. El método invocado depende del **tipo real** del objeto.",
        ),
        p(
          "**Polimorfismo paramétrico.** Los **genéricos** (`List<T>`, `Map<K,V>`) permiten escribir código que opera uniformemente sobre distintos tipos sin perder seguridad de tipos. Es otra forma de polimorfismo.",
        ),
      ],
    }),

    ref("7.3", "Overloading", "1585–1609", {
      concept: [
        p(
          "**¿Qué es?** Definir **varios métodos** con el mismo nombre pero diferente **lista de parámetros**.",
        ),
        p("**Reglas**:"),
        items([
          "Deben diferir en **número, tipo o orden** de parámetros.",
          "**No** basta cambiar el **tipo de retorno**.",
          "Pueden diferir en **modificadores de acceso**.",
        ]),
        p("**Cuándo ocurre.** En **tiempo de compilación**: el compilador decide cuál invocar según los argumentos."),
      ],
      codeBlocks: [
        cb("m07-s73-c1", { chapter: 7, section: "7.3", lines: "1599–1605" }, CALCULADORA, "java", {
          title: "Ejemplo de sobrecarga",
        }),
      ],
    }),

    ref("7.4", "Overriding", "1611–1636", {
      concept: [
        p(
          "**¿Qué es?** Redefinir un método **heredado** con **la misma firma** en la subclase.",
        ),
        p("**Reglas**:"),
        items([
          "**Misma firma** (nombre + parámetros).",
          "**Tipo de retorno covariante** (puede ser subtipo).",
          "**No reducir visibilidad** (no puedes cambiar `public` a `private`).",
          "**No lanzar excepciones más amplias** (checked).",
          "Usar `@Override` para que el compilador valide.",
        ]),
      ],
      codeBlocks: [
        cb("m07-s74-c1", { chapter: 7, section: "7.4", lines: "1627–1636" }, OVERRIDING_EJ, "java", {
          title: "Ejemplo de sobrescritura",
        }),
      ],
    }),

    ref("7.5", "Overloading vs overriding", "1638–1648", {
      concept: [
        table(
          ["Aspecto", "Overloading (Sobrecarga)", "Overriding (Sobrescritura)"],
          [
            ["Relación", "Misma clase", "Herencia (subclase reescribe)"],
            ["Firma", "Diferente", "Idéntica"],
            ["Momento de resolución", "Compilación", "Ejecución"],
            ["Tipo de retorno", "Puede variar libremente", "Covariante"],
            ["Visibilidad", "Libre", "No puede reducirse"],
            ["Palabra clave", "—", "`@Override` recomendado"],
            ["Propósito", "Ofrecer variantes", "Especializar comportamiento"],
          ],
          "Overloading vs overriding — tabla de la guía (§7.5, l.1640–1648)",
        ),
      ],
    }),

    ref("7.6", "Despacho dinámico", "1650–1657", {
      concept: [
        p(
          "El método ejecutado se decide por el **tipo real del objeto**, no por el tipo de la referencia.",
        ),
      ],
      codeBlocks: [
        cb("m07-s76-c1", { chapter: 7, section: "7.6", lines: "1654–1657" }, DESPACHO, "java", {
          title: "Despacho dinámico",
        }),
      ],
    }),

    ref("7.7", "Ejemplo gráfico", "1659–1670", {
      concept: [
        p("Secuencia del despacho dinámico (guía, Mermaid):"),
      ],
      codeBlocks: [
        cb("m07-s77-c1", { chapter: 7, section: "7.7", lines: "1661–1670" }, DESPACHO_SEQUENCE, "text", {
          title: "sequenceDiagram — Despacho dinámico (fuente: guía)",
        }),
      ],
    }),

    ref("7.8", "Ejemplo funcional", "1672–1700", {
      concept: [
        p("Jerarquía `Animal` con comportamiento polimórfico y bucle de despacho:"),
      ],
      codeBlocks: [
        cb("m07-s78-c1", { chapter: 7, section: "7.8", lines: "1674–1700" }, FUNCIONAL_POLI, "java", {
          title: "Polimorfismo en acción",
        }),
      ],
    }),

    ref("7.9", "Explicación línea por línea", "1702–1708", {
      concept: [
        p("Lectura del ejemplo funcional (guía, §7.9):"),
        items([
          "`Animal` define `sonido()` y `presentarse()`.",
          "`Perro` y `Gato` **sobrescriben** `sonido()`.",
          "En el bucle, `a` es de tipo `Animal`, pero el objeto real es `Perro` o `Gato`.",
          "`a.presentarse()` invoca el método de `Animal`, que a su vez llama a `sonido()`.",
          "`sonido()` **despacha dinámicamente** a la implementación real.",
        ], true),
      ],
    }),

    ref("7.10", "Error típico", "1710–1727", {
      concept: [
        p(
          "Creer que `Animal a = new Perro(); a.moverCola();` funcionará. **No**: la referencia es `Animal`, y `moverCola()` no existe en `Animal`. Requiere **cast**.",
        ),
      ],
      codeBlocks: [
        cb("m07-s710-c1", { chapter: 7, section: "7.10", lines: "1716–1719" }, ERROR_TIPICO, "java", {
          title: "Ejemplo incorrecto",
        }),
        cb("m07-s710-c2", { chapter: 7, section: "7.10", lines: "1723–1727" }, ERROR_CORREGIDO, "java", {
          title: "Ejemplo correcto",
        }),
      ],
    }),

    ref("7.11", "Ejercicio", "1729–1731", {
      exercises: [
        ex("m07-polimorfismo-s711", 1, { chapter: 7, section: "7.11", lines: "1729–1731" }, {
          type: "open",
          prompt: [
            p(
              "Diseña una jerarquía `Figura → Circulo, Rectangulo, Triangulo` con un método `area()` polimórfico. Calcula el área total de una lista.",
            ),
          ],
          answer: undefined,
        }),
      ],
    }),

    ref("7.12", "Preguntas de examen", "1733–1748", {
      questions: [
        q("m07-polimorfismo-s712", 1, { chapter: 7, section: "7.12", lines: "1733–1748" }, "Define polimorfismo."),
        q("m07-polimorfismo-s712", 2, { chapter: 7, section: "7.12", lines: "1733–1748" }, "¿Qué diferencia hay entre overloading y overriding?"),
        q("m07-polimorfismo-s712", 3, { chapter: 7, section: "7.12", lines: "1733–1748" }, "¿Qué es despacho dinámico?"),
        q("m07-polimorfismo-s712", 4, { chapter: 7, section: "7.12", lines: "1733–1748" }, "¿Puede existir overriding sin herencia?"),
        q("m07-polimorfismo-s712", 5, { chapter: 7, section: "7.12", lines: "1733–1748" }, "¿Puede existir overloading sin herencia?"),
        q("m07-polimorfismo-s712", 6, { chapter: 7, section: "7.12", lines: "1733–1748" }, "¿Por qué el tipo de retorno no basta para sobrecargar?"),
        q("m07-polimorfismo-s712", 7, { chapter: 7, section: "7.12", lines: "1733–1748" }, "¿Qué hace `@Override`?"),
        q("m07-polimorfismo-s712", 8, { chapter: 7, section: "7.12", lines: "1733–1748" }, "¿Cómo se decide qué método ejecutar en despacho dinámico?"),
        q("m07-polimorfismo-s712", 9, { chapter: 7, section: "7.12", lines: "1733–1748" }, "¿Qué pasa si intento llamar un método específico de la subclase usando una referencia padre?"),
        q("m07-polimorfismo-s712", 10, { chapter: 7, section: "7.12", lines: "1733–1748" }, "¿Qué es polimorfismo paramétrico? (mencionar genéricos)"),
      ],
      keyPoints: [
        quote(
          "**Polimorfismo** = mismo mensaje, distintas respuestas. **Overloading** = compile-time, misma clase. **Overriding** = runtime, herencia. El **despacho dinámico** materializa el polimorfismo.",
        ),
      ],
    }),
  ],
};