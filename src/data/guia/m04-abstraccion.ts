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

const ref = makeSectionBuilder("m04-abstraccion", 4);

const FIGURA_ABSTRACT = `public abstract class Figura {
    protected final String color; // estado compartido

    public Figura(String color) { this.color = color; } // constructor

    public abstract double area();      // abstracto: subclases implementan
    public abstract double perimetro();

    public String getColor() { return color; } // concreto: reutilizable
}`;

const VOLADOR_INTERFACE = `public interface Volador {
    void volar();                    // abstracto por defecto
    default void planear() {         // método default (Java 8+)
        System.out.println("Planeando...");
    }
    static Volador noVuela() {       // método estático (Java 8+)
        return () -> System.out.println("No vuela");
    }
}`;

const DEFAULT_CONFLICT = `interface A { default void hola() { System.out.println("A"); } }
interface B { default void hola() { System.out.println("B"); } }

class C implements A, B {
    @Override public void hola() {
        A.super.hola();  // desambiguación explícita
    }
}`;

const COMPARATIVO = `// Clase abstracta: comparte estado y comportamiento
public abstract class Empleado {
    protected final String nombre;
    protected final double salarioBase;

    public Empleado(String nombre, double salarioBase) {
        this.nombre = nombre;
        this.salarioBase = salarioBase;
    }

    public abstract double calcularSalario();
    public String getNombre() { return nombre; }
}

// Interfaz: define capacidad adicional
public interface Bonificable {
    double calcularBonificacion();
}

// Una subclase concreta puede combinar ambos
public class Gerente extends Empleado implements Bonificable {
    private final double bonoAnual;

    public Gerente(String nombre, double salarioBase, double bonoAnual) {
        super(nombre, salarioBase);
        this.bonoAnual = bonoAnual;
    }

    @Override
    public double calcularSalario() {
        return salarioBase + calcularBonificacion() / 12;
    }

    @Override
    public double calcularBonificacion() { return bonoAnual; }
}`;

const MERMAID_C4 = `classDiagram
    class Empleado {
        <<abstract>>
        #String nombre
        #double salarioBase
        +calcularSalario() double
        +getNombre() String
    }
    class Bonificable {
        <<interface>>
        +calcularBonificacion() double
    }
    class Gerente {
        -double bonoAnual
        +calcularSalario() double
        +calcularBonificacion() double
    }
    Empleado <|-- Gerente
    Bonificable <|.. Gerente`;

export const M04_ABSTRACCION: Module = {
  id: "m04-abstraccion",
  chapter: 4,
  title: "Abstracción",
  subtitle: "Modelar lo esencial e ignorar lo accesorio — guiaPOO.md · capítulo 4",
  xp: 50,
  dart: { available: false },
  summary: [
    p(
      "La abstracción es el proceso de **identificar y modelar los rasgos esenciales** ignorando los detalles irrelevantes. Este capítulo la materializa en **clases abstractas** (abstracción parcial con estado) e **interfaces** (contrato puro), y compara ambos mecanismos.",
    ),
  ],
  sections: [
    ref("4.1", "¿Qué es abstracción?", "859–883", {
      concept: [
        p(
          "La **abstracción** es el proceso de **identificar y modelar los rasgos esenciales** de un concepto, **ignorando los detalles irrelevantes** en el contexto del problema.",
        ),
        quote("Abstraer es decidir qué ignorar."),
        p("**Abstracción vs ocultamiento de información** — estrechamente relacionados, pero **distintos**:"),
        items([
          "**Abstracción**: enfoque de **diseño**; qué representar.",
          "**Ocultamiento de información**: técnica de **implementación**; qué no exponer.",
        ]),
        p(
          "Ejemplo: al modelar `CuentaBancaria`, la **abstracción** decide que el saldo es relevante. El **ocultamiento** decide que el saldo se guarda en un `double` privado (no expuesto).",
        ),
        p("**Abstracción en POO** — se materializa en:"),
        items([
          "**Clases abstractas** (abstracción parcial con estado).",
          "**Interfaces** (abstracción pura de contrato).",
        ]),
        p("**¿Qué exponer? ¿Qué ocultar?** — **Exponer**: contrato (qué se puede hacer). **Ocultar**: implementación (cómo se hace)."),
      ],
    }),

    ref("4.2", "Clases abstractas", "885–919", {
      concept: [
        p(
          "**¿Qué son?** Clase que **no puede instanciarse** y que puede contener **métodos sin implementación** (abstractos) que las subclases deben implementar.",
        ),
        p("**Características**:"),
        items([
          "Se declara con `abstract`.",
          "Puede tener **atributos**.",
          "Puede tener **métodos concretos** y **abstractos**.",
          "**Sí tiene constructor** (invocado por subclases con `super`).",
          "Una subclase **concreta** debe implementar todos los métodos abstractos.",
          "Puede tener **cero** métodos abstractos y seguir siendo no instanciable (útil para bloquear instanciación directa).",
        ]),
      ],
      codeBlocks: [
        cb("m04-s42-c1", { chapter: 4, section: "4.2", lines: "902–913" }, FIGURA_ABSTRACT, "java", {
          title: "Métodos abstractos vs concretos",
        }),
      ],
      keyPoints: [
        p("**Cuándo utilizarlas** (guía, §4.2):"),
        items([
          "Cuando varias clases comparten **estado y comportamiento**.",
          "Cuando quieres **forzar** un contrato parcial reutilizando código.",
          "Cuando necesitas **evolucionar** la clase base sin romper subclases (puedes añadir métodos concretos).",
        ]),
      ],
    }),

    ref("4.3", "Interfaces", "921–973", {
      concept: [
        p(
          "**¿Qué son?** Un **contrato** que define un conjunto de métodos que las clases **implementadoras** deben ofrecer.",
        ),
        p("**Propósito**:"),
        items([
          "Definir **qué** se ofrece, sin imponer **cómo**.",
          "Permitir **polimorfismo** entre clases no relacionadas por herencia.",
        ]),
      ],
      codeBlocks: [
        cb("m04-s43-c1", { chapter: 4, section: "4.3", lines: "934–944" }, VOLADOR_INTERFACE, "java", {
          title: "Interfaz Volador (contrato + default + static)",
        }),
        cb("m04-s43-c2", { chapter: 4, section: "4.3", lines: "950–959" }, DEFAULT_CONFLICT, "java", {
          title: "Métodos default: conflicto y resolución",
          explanation: [
            p(
              "Si dos interfaces declaran el mismo método `default`, la clase implementadora **debe** sobrescribirlo o será un error de compilación.",
            ),
          ],
        }),
      ],
      keyPoints: [
        p("**Herencia múltiple de tipo** — una clase puede implementar **varias interfaces**:"),
        p("`public class Pato extends Animal implements Volador, Nadador { ... }`"),
        p("**Cuándo utilizarlas** (guía, §4.3):"),
        items([
          "Cuando clases **no relacionadas** deben compartir un comportamiento.",
          "Cuando quieres definir **capacidades** («puede volar», «puede pagar»).",
          "Cuando necesitas **bajo acoplamiento** entre cliente y proveedor.",
        ]),
      ],
    }),

    ref("4.4", "Clases abstractas vs interfaces", "975–987", {
      concept: [
        table(
          ["Aspecto", "Clase Abstracta", "Interfaz"],
          [
            ["Propósito", "Reutilización de código + contrato parcial", "Contrato puro (qué, no cómo)"],
            ["Herencia", "Simple (una sola)", "Múltiple"],
            ["Estado", "Puede tener atributos de instancia", "Sólo constantes `public static final`"],
            ["Constructores", "Sí", "No"],
            ["Métodos concretos", "Sí", "Sólo `default`, `static` y `private` (Java 9+)"],
            ["Modificadores de métodos", "Cualquiera", "`public` implícito (o `private` en Java 9+)"],
            ["Acoplamiento", "Mayor (subclase depende de implementación)", "Menor (contrato)"],
            ["Evolución", "Añadir métodos abstractos rompe subclases", "Añadir `default` no rompe"],
            ["Uso típico", "Jerarquías «es un»", "Capacidades «puede ser»"],
          ],
          "Tabla comparativa de la guía — §4.4 (l.977–987)",
        ),
      ],
    }),

    ref("4.5", "Código comparativo", "989–1028", {
      concept: [
        p("Mismo dominio modelado con ambos mecanismos: clase abstracta para reutilizar, interfaz para capacidad:"),
      ],
      codeBlocks: [
        cb("m04-s45-c1", { chapter: 4, section: "4.5", lines: "991–1028" }, COMPARATIVO, "java", {
          title: "Empleado (abstracta) + Bonificable (interfaz) + Gerente (combinación)",
        }),
      ],
    }),

    ref("4.6", "Diagrama Mermaid", "1030–1052", {
      concept: [
        p("Modelo del ejemplo comparativo en UML (guía):"),
      ],
      codeBlocks: [
        cb("m04-s46-c1", { chapter: 4, section: "4.6", lines: "1032–1052" }, MERMAID_C4, "text", {
          title: "Diagrama Mermaid original de la guía (renderizado en FASE 4)",
          explanation: [p("`Empleado <|-- Gerente` = herencia; `Bonificable <|.. Gerente` = implementación.")],
        }),
      ],
    }),

    ref("4.7", "Errores frecuentes", "1054–1061", {
      commonMistakes: [
        items([
          "Creer que **clase abstracta = interfaz con métodos abstractos**.",
          "Intentar **instanciar** una clase abstracta.",
          "Confundir **abstracción** con **encapsulamiento**.",
          "Usar **interfaz con un solo método** cuando convendría una **interfaz funcional**.",
          "Creer que las interfaces **no pueden tener código** (sí: `default`, `static`, `private` desde Java 9).",
          "Abusar de métodos `default` para inyectar lógica no trivial (rompe el principio de contrato puro).",
        ]),
      ],
    }),

    ref("4.8", "Preguntas de evaluación", "1063–1078", {
      questions: [
        q("m04-abstraccion-s48", 1, { chapter: 4, section: "4.8", lines: "1063–1078" }, "Define abstracción en tus propias palabras."),
        q("m04-abstraccion-s48", 2, { chapter: 4, section: "4.8", lines: "1063–1078" }, "¿En qué se diferencia abstracción de encapsulamiento?"),
        q("m04-abstraccion-s48", 3, { chapter: 4, section: "4.8", lines: "1063–1078" }, "¿Por qué una clase abstracta puede tener constructor?"),
        q("m04-abstraccion-s48", 4, { chapter: 4, section: "4.8", lines: "1063–1078" }, "¿Cuándo elegir una interfaz sobre una clase abstracta?"),
        q("m04-abstraccion-s48", 5, { chapter: 4, section: "4.8", lines: "1063–1078" }, "¿Qué es un método `default` en una interfaz?"),
        q("m04-abstraccion-s48", 6, { chapter: 4, section: "4.8", lines: "1063–1078" }, "¿Por qué Java no permite herencia múltiple de clases, pero sí de interfaces?"),
        q("m04-abstraccion-s48", 7, { chapter: 4, section: "4.8", lines: "1063–1078" }, "¿Puede una clase abstracta implementar una interfaz sin implementar sus métodos? Justifica."),
        q("m04-abstraccion-s48", 8, { chapter: 4, section: "4.8", lines: "1063–1078" }, "Da un ejemplo donde clase abstracta es claramente superior a interfaz."),
        q("m04-abstraccion-s48", 9, { chapter: 4, section: "4.8", lines: "1063–1078" }, "Da un ejemplo donde interfaz es claramente superior a clase abstracta."),
        q("m04-abstraccion-s48", 10, { chapter: 4, section: "4.8", lines: "1063–1078" }, "¿Qué problema resuelve la abstracción en un sistema grande?"),
      ],
      keyPoints: [
        quote(
          "**Abstracción** = modelar lo esencial, ignorar lo accesorio. **Clases abstractas** = abstracción parcial con estado. **Interfaces** = contrato puro.",
        ),
      ],
    }),
  ],
};