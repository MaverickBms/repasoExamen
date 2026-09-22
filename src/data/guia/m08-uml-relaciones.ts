import type { Module } from "../types";
import {
  cb,
  items,
  makeSectionBuilder,
  p,
  quote,
  table,
} from "./helpers";

const ref = makeSectionBuilder("m08-uml-relaciones", 8);

const M_ASESORIA = `classDiagram
    Cliente "1" --> "*" Pedido : realiza`;

const ASO_JAVA = `public class Cliente {
    private List<Pedido> pedidos = new ArrayList<>();
}`;

const M_AGREGACION = `classDiagram
    Universidad o-- Profesor : tiene`;

const AGR_JAVA = `public class Universidad {
    private List<Profesor> profesores;
}`;

const M_COMPOSICION = `classDiagram
    Casa *-- Habitacion : contiene`;

const COM_JAVA = `public class Casa {
    private final List<Habitacion> habitaciones;
    public Casa() {
        this.habitaciones = List.of(new Habitacion("Sala"), new Habitacion("Cocina"));
    }
}`;

const M_HERENCIA = `classDiagram
    Animal <|-- Perro`;

const M_DEPENDENCIA = `classDiagram
    Servicio ..> Repositorio : usa`;

const DEP_JAVA = `public class Servicio {
    public void procesar(Repositorio repo) { repo.guardar(); }
}`;

const M_REALIZACION = `classDiagram
    class Volador {
        <<interface>>
        +volar() void
    }
    class Avion {
        +volar() void
    }
    Volador <|.. Avion`;

const M_CUENTA = `classDiagram
    class Cuenta {
        -String titular
        -double saldo
        +Cuenta(titular, saldo)
        +depositar(monto) void
        +retirar(monto) void
        +getSaldo() double
    }`;

// 8.6 — UML → Código
const UML_HERENCIA_ASCII = `      Vehiculo (abstract)
          ▲
          |
      Automovil`;

const UML_HERENCIA_JAVA = `public abstract class Vehiculo { }
public class Automovil extends Vehiculo { }`;

const UML_IFACE_ASCII = `    <<interface>>
      Volador
         ▲
         |
       Avion`;

const UML_IFACE_JAVA = `public interface Volador { void volar(); }
public class Avion implements Volador {
    @Override public void volar() { }
}`;

const UML_ASOC_ASCII = `    Cliente 1 ──── * Pedido`;

const UML_ASOC_JAVA = `public class Cliente {
    private List<Pedido> pedidos = new ArrayList<>();
}
public class Pedido { }`;

const UML_COMP_ASCII = `    Casa 1 ◆── * Habitacion`;

const UML_COMP_JAVA = `public class Casa {
    private final List<Habitacion> habitaciones = new ArrayList<>();
    public Casa() { habitaciones.add(new Habitacion()); }
}`;

const UML_DEP_ASCII = `    Servicio ⇢ Repositorio`;

const UML_DEP_JAVA = `public class Servicio {
    public void ejecutar(Repositorio r) { r.guardar(); }
}`;

// 8.7 — Código → UML
const CODIGO_UNIVERSIDAD = `public class Universidad {
    private String nombre;
    private List<Departamento> departamentos;
}

public class Departamento {
    private String nombre;
    private List<Profesor> profesores;
}

public abstract class Persona { }
public class Profesor extends Persona { }`;

const M_UNIVERSIDAD = `classDiagram
    class Universidad {
        -String nombre
        -List~Departamento~ departamentos
    }
    class Departamento {
        -String nombre
        -List~Profesor~ profesores
    }
    class Persona {
        <<abstract>>
    }
    class Profesor
    Universidad *-- Departamento
    Departamento o-- Profesor
    Persona <|-- Profesor`;

export const M08_UML_RELACIONES: Module = {
  id: "m08-uml-relaciones",
  chapter: 8,
  title: "UML y Relaciones",
  subtitle: "El lenguaje del diseño y cómo se relacionan las clases — guiaPOO.md · capítulo 8",
  xp: 50,
  dart: { available: false },
  summary: [
    p(
      "**Unified Modeling Language (UML)** es un lenguaje de modelado estandarizado (OMG) para **visualizar, especificar, construir y documentar** sistemas. Este capítulo cubre los diagramas UML, el diagrama de clases y las seis relaciones entre clases: **asociación, agregación, composición, herencia, dependencia y realización**.",
    ),
  ],
  sections: [
    ref("8.1", "¿Qué es UML?", "1754–1770", {
      concept: [
        p(
          "**Unified Modeling Language (UML)** es un **lenguaje de modelado** estandarizado (OMG) que permite **visualizar, especificar, construir y documentar** sistemas de software.",
        ),
        p("**Objetivo**:"),
        items([
          "Comunicar diseño entre stakeholders.",
          "Documentar arquitectura.",
          "Facilitar análisis antes de codificar.",
        ]),
        p("**Importancia.** Es el **estándar de facto** en ingeniería de software; usado en análisis, diseño y documentación."),
        p("**UML NO es un lenguaje de programación.** Es un **lenguaje de modelado**: describe, no ejecuta."),
      ],
    }),

    ref("8.2", "Diagramas UML", "1772–1787", {
      concept: [
        p("**Estructurales** (guía, §8.2):"),
        items([
          "**Clases**: clases, atributos, métodos, relaciones.",
          "**Objetos**: instancias en un momento dado.",
          "**Componentes**: módulos físicos.",
          "**Despliegue**: hardware + software.",
          "**Paquetes**: agrupaciones lógicas.",
        ]),
        p("**De comportamiento**:"),
        items([
          "**Casos de uso**: interacción actor-sistema.",
          "**Secuencia**: mensajes en el tiempo.",
          "**Actividades**: flujos de trabajo.",
          "**Estados**: ciclos de vida.",
        ]),
      ],
    }),

    ref("8.3", "Diagrama de clases (profundidad)", "1789–1808", {
      concept: [
        p("**Símbolos básicos**:"),
        items([
          "**Clase**: rectángulo con 3 compartimentos (nombre, atributos, métodos).",
          "**Visibilidad**: `+` público, `-` privado, `#` protegido, `~` paquete.",
          "**Abstracto**: nombre en cursiva o `{abstract}`.",
          "**Estático**: subrayado.",
        ]),
      ],
      codeBlocks: [
        cb("m08-s83-c1", { chapter: 8, section: "8.3", lines: "1798–1808" }, M_CUENTA, "text", {
          title: "Diagrama de clases — Cuenta (fuente: guía)",
        }),
      ],
    }),

    ref("8.4", "Relaciones entre clases", "1810–1912", {
      concept: [
        p("**Asociación.** Vínculo estructural entre clases. Representación: línea sólida. Cardinalidad: `1`, `0..1`, `*`, `1..*`. Ejemplo: `Cliente` — `Pedido`. En Java: atributo de referencia."),
        p("**Agregación.** Relación **todo-parte** débil. La parte **puede existir** sin el todo. Representación: línea con **rombo vacío**. Ejemplo: `Universidad` ◇— `Profesor`. En Java: referencia a otras instancias, sin ciclo de vida ligado."),
        p("**Composición.** Todo-parte **fuerte**. La parte **no existe** sin el todo. Representación: línea con **rombo relleno**. Ejemplo: `Casa` ◆— `Habitacion`. **Ciclo de vida**: la parte muere con el todo. En Java: la parte se **crea dentro** del todo."),
        p("**Herencia / Generalización.** Relación «es un». Representación: línea con **triángulo vacío**."),
        p("**Dependencia.** Una clase **usa** a otra (parámetro, variable local). Representación: línea **discontinua** con flecha abierta."),
        p("**Realización.** Una clase **implementa** una interfaz. Representación: línea **discontinua** con **triángulo vacío**."),
      ],
      codeBlocks: [
        cb("m08-s84-c1", { chapter: 8, section: "8.4", lines: "1820–1829" }, M_ASESORIA, "text", { title: "Mermaid — Asociación (guía)" }),
        cb("m08-s84-c2", { chapter: 8, section: "8.4", lines: "1825–1829" }, ASO_JAVA, "java", { title: "Asociación en Java" }),
        cb("m08-s84-c3", { chapter: 8, section: "8.4", lines: "1838–1847" }, M_AGREGACION, "text", { title: "Mermaid — Agregación (guía)" }),
        cb("m08-s84-c4", { chapter: 8, section: "8.4", lines: "1843–1847" }, AGR_JAVA, "java", { title: "Agregación en Java" }),
        cb("m08-s84-c5", { chapter: 8, section: "8.4", lines: "1857–1869" }, M_COMPOSICION, "text", { title: "Mermaid — Composición (guía)" }),
        cb("m08-s84-c6", { chapter: 8, section: "8.4", lines: "1862–1869" }, COM_JAVA, "java", { title: "Composición en Java" }),
        cb("m08-s84-c7", { chapter: 8, section: "8.4", lines: "1876–1879" }, M_HERENCIA, "text", { title: "Mermaid — Herencia (guía)" }),
        cb("m08-s84-c8", { chapter: 8, section: "8.4", lines: "1886–1895" }, M_DEPENDENCIA, "text", { title: "Mermaid — Dependencia (guía)" }),
        cb("m08-s84-c9", { chapter: 8, section: "8.4", lines: "1891–1895" }, DEP_JAVA, "java", { title: "Dependencia en Java" }),
        cb("m08-s84-c10", { chapter: 8, section: "8.4", lines: "1902–1912" }, M_REALIZACION, "text", { title: "Mermaid — Realización (guía)" }),
      ],
    }),

    ref("8.5", "Tabla resumen de relaciones", "1914–1923", {
      concept: [
        table(
          ["Relación", "Símbolo", "Semántica", "Fuerza", "Ciclo de vida"],
          [
            ["Asociación", "línea", "«conoce a»", "débil", "independiente"],
            ["Agregación", "◇—", "«tiene»", "media", "independiente"],
            ["Composición", "◆—", "«contiene»", "fuerte", "ligado"],
            ["Herencia", "◁—", "«es un»", "fuerte", "N/A"],
            ["Dependencia", "⇢", "«usa»", "muy débil", "N/A"],
            ["Realización", "◁⇢", "«implementa»", "media", "N/A"],
          ],
          "Resumen de relaciones — tabla de la guía (§8.5, l.1916–1923)",
        ),
      ],
    }),

    ref("8.6", "UML → Código", "1925–1994", {
      concept: [
        p("Ejemplos de traducción de UML a código Java (guía, §8.6):"),
      ],
      codeBlocks: [
        cb("m08-s86-c1", { chapter: 8, section: "8.6", lines: "1929–1939" }, UML_HERENCIA_ASCII, "text", { title: "UML — Herencia (textual)" }),
        cb("m08-s86-c2", { chapter: 8, section: "8.6", lines: "1936–1939" }, UML_HERENCIA_JAVA, "java", { title: "Herencia en Java" }),
        cb("m08-s86-c3", { chapter: 8, section: "8.6", lines: "1943–1956" }, UML_IFACE_ASCII, "text", { title: "UML — Interfaz (textual)" }),
        cb("m08-s86-c4", { chapter: 8, section: "8.6", lines: "1951–1956" }, UML_IFACE_JAVA, "java", { title: "Interfaz en Java" }),
        cb("m08-s86-c5", { chapter: 8, section: "8.6", lines: "1958–1969" }, UML_ASOC_ASCII, "text", { title: "UML — Asociación con cardinalidad (textual)" }),
        cb("m08-s86-c6", { chapter: 8, section: "8.6", lines: "1964–1969" }, UML_ASOC_JAVA, "java", { title: "Asociación en Java" }),
        cb("m08-s86-c7", { chapter: 8, section: "8.6", lines: "1971–1982" }, UML_COMP_ASCII, "text", { title: "UML — Composición (textual)" }),
        cb("m08-s86-c8", { chapter: 8, section: "8.6", lines: "1977–1982" }, UML_COMP_JAVA, "java", { title: "Composición en Java" }),
        cb("m08-s86-c9", { chapter: 8, section: "8.6", lines: "1984–1994" }, UML_DEP_ASCII, "text", { title: "UML — Dependencia (textual)" }),
        cb("m08-s86-c10", { chapter: 8, section: "8.6", lines: "1990–1994" }, UML_DEP_JAVA, "java", { title: "Dependencia en Java" }),
      ],
    }),

    ref("8.7", "Código → UML", "1996–2039", {
      concept: [
        p("Dado el siguiente código, se identifica (guía, §8.7):"),
        items([
          "Clases: `Universidad`, `Departamento`, `Profesor`, `Persona`.",
          "Herencia: `Profesor` hereda de `Persona`.",
          "Composición: `Universidad ◆— Departamento`.",
          "Agregación: `Departamento ◇— Profesor`.",
        ]),
      ],
      codeBlocks: [
        cb("m08-s87-c1", { chapter: 8, section: "8.7", lines: "2000–2013" }, CODIGO_UNIVERSIDAD, "java", {
          title: "Código fuente de ejemplo",
        }),
        cb("m08-s87-c2", { chapter: 8, section: "8.7", lines: "2022–2039" }, M_UNIVERSIDAD, "text", {
          title: "Mermaid — Resultado (fuente: guía)",
        }),
      ],
    }),

    ref("8.8", "Errores comunes", "2041–2052", {
      commonMistakes: [
        items([
          "Confundir **agregación** con **composición**.",
          "Marcar **asociación** cuando es **dependencia**.",
          "Usar **flechas de herencia** para relaciones todo-parte.",
          "Olvidar **cardinalidades**.",
          "Mezclar **niveles de abstracción** en un mismo diagrama.",
          "Asumir que agregación/composición se distingue sólo por código; también depende del **ciclo de vida** semántico.",
        ]),
      ],
      keyPoints: [
        quote(
          "UML es el **lenguaje del diseño**. Sus relaciones clave: **asociación, agregación, composición, herencia, dependencia, realización**. Saber diferenciarlas es saber leer cualquier diagrama.",
        ),
      ],
    }),
  ],
};