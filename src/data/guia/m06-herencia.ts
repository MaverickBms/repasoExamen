import type { Module } from "../types";
import {
  cb,
  items,
  makeSectionBuilder,
  p,
  q,
  quote,
} from "./helpers";

const ref = makeSectionBuilder("m06-herencia", 6);

const EXTENDS_SUPER = `public class Perro extends Animal {
    public Perro(String nombre) {
        super(nombre); // llamada al constructor de Animal
    }
}`;

const VEHIUREJA_MERMAID = `classDiagram
    class Animal {
        <<abstract>>
        #String nombre
        +emitirSonido() String
    }
    class Perro {
        +emitirSonido() String
        +moverCola()
    }
    class Gato {
        +emitirSonido() String
        +ronronear()
    }
    Animal <|-- Perro
    Animal <|-- Gato`;

const VEHIUREJA = `public abstract class Vehiculo {
    protected final String marca;
    protected int velocidad;

    public Vehiculo(String marca) {
        this.marca = marca;
        this.velocidad = 0;
    }

    public void acelerar(int delta) {
        velocidad += delta;
    }

    public abstract int numeroRuedas();

    public String descripcion() {
        return marca + " (" + numeroRuedas() + " ruedas)";
    }
}

public class Automovil extends Vehiculo {
    public Automovil(String marca) { super(marca); }

    @Override
    public int numeroRuedas() { return 4; }

    public void abrirMaletero() {
        System.out.println("Maletero abierto");
    }
}

public class Motocicleta extends Vehiculo {
    public Motocicleta(String marca) { super(marca); }

    @Override
    public int numeroRuedas() { return 2; }
}

public class Camion extends Vehiculo {
    private final int cargaMaxima;

    public Camion(String marca, int cargaMaxima) {
        super(marca);
        this.cargaMaxima = cargaMaxima;
    }

    @Override
    public int numeroRuedas() { return 6; }

    public int getCargaMaxima() { return cargaMaxima; }
}`;

const LSP_VIOLACION = `class Rectangulo {
    protected int ancho, alto;
    public void setAncho(int a) { ancho = a; }
    public void setAlto(int a)  { alto = a; }
    public int area() { return ancho * alto; }
}

class Cuadrado extends Rectangulo {
    // Si el cliente hace r.setAncho(5); r.setAlto(10); espera area=50
    // Pero Cuadrado fuerza ancho == alto → violación de LSP
}`;

export const M06_HERENCIA: Module = {
  id: "m06-herencia",
  chapter: 6,
  title: "Herencia",
  subtitle: "La relación «es un»: reutilizar, especializar, sustituir — guiaPOO.md · capítulo 6",
  xp: 50,
  dart: { available: false },
  summary: [
    p(
      "**Herencia** es el mecanismo por el cual una **subclase** adquiere atributos y métodos de una **superclase**, pudiendo **especializarlos** o **extenderlos**. Este capítulo cubre `extends`/`super`, tipos de herencia, un ejemplo funcional completo, cuándo preferir composición, el problema de herencia profunda y el principio de Liskov (LSP).",
    ),
  ],
  sections: [
    ref("6.1", "Definición", "1355–1357", {
      concept: [
        p(
          "**Herencia** es el mecanismo por el cual una **subclase** adquiere atributos y métodos de una **superclase**, pudiendo **especializarlos** o **extenderlos**.",
        ),
      ],
    }),

    ref("6.2", "Superclase y subclase", "1359–1362", {
      concept: [
        items([
          "**Superclase** (padre, base): clase general.",
          "**Subclase** (hija, derivada): clase especializada.",
        ]),
      ],
    }),

    ref("6.3", "Generalización y especialización", "1364–1367", {
      concept: [
        items([
          "**Generalización**: proceso ascendente (abstracto).",
          "**Especialización**: proceso descendente (concreto).",
        ]),
      ],
    }),

    ref("6.4", "Relación «es un»", "1369–1371", {
      concept: [
        p(
          "Herencia representa una relación **«es un»** (ISA). Ej: `Perro es un Animal`. Si no se cumple esta relación, **no usar herencia**.",
        ),
      ],
    }),

    ref("6.5", "Reutilización", "1373–1375", {
      concept: [
        p(
          "Herencia **reutiliza** estructura y comportamiento. Pero **no es la única forma** (composición también).",
        ),
      ],
    }),

    ref("6.6", "`extends` y `super`", "1377–1385", {
      concept: [
        p("`extends` declara la herencia; `super` accede a la superclase (y a su constructor):"),
      ],
      codeBlocks: [
        cb("m06-s66-c1", { chapter: 6, section: "6.6", lines: "1379–1385" }, EXTENDS_SUPER, "java", {
          title: "Perro extends Animal",
        }),
      ],
    }),

    ref("6.7", "Constructores y herencia", "1387–1389", {
      concept: [
        p(
          "Los constructores **no se heredan**. La subclase debe invocar explícitamente `super(...)` o Java llamará a `super()` (sin argumentos) implícitamente. Si la superclase no tiene constructor sin argumentos, la compilación **falla**.",
        ),
      ],
    }),

    ref("6.8", "Visibilidad", "1391–1395", {
      concept: [
        items([
          "`private`: **no accesible** desde la subclase.",
          "`protected`: **accesible** desde el mismo paquete o desde subclases (incluso en otro paquete).",
          "`public`: accesible desde cualquier lugar.",
        ]),
      ],
    }),

    ref("6.9", "Sobrescritura relacionada con herencia", "1397–1399", {
      concept: [
        p("Ver sección de **Polimorfismo** (`@Override`). — Referencia cruzada de la guía."),
      ],
    }),

    ref("6.10", "Tipos de herencia", "1401–1425", {
      concept: [
        items([
          "**Simple**: una clase hereda de una sola.",
          "**Multinivel**: A → B → C.",
          "**Jerárquica**: A → B, A → C.",
          "**Múltiple**: A → B, A → C. **No soportada en Java para clases** (sí para interfaces).",
        ]),
      ],
      codeBlocks: [
        cb("m06-s610-c1", { chapter: 6, section: "6.10", lines: "1408–1425" }, VEHIUREJA_MERMAID, "text", {
          title: "Diagrama Mermaid — herencia jerárquica (guía, renderizado en FASE 4)",
        }),
      ],
    }),

    ref("6.11", "Ejemplo funcional", "1427–1481", {
      concept: [
        p("Jerarquía completa con clase abstracta y tres subclases concretas:"),
      ],
      codeBlocks: [
        cb("m06-s611-c1", { chapter: 6, section: "6.11", lines: "1429–1481" }, VEHIUREJA, "java", {
          title: "Vehiculo (abstracta) + Automovil, Motocicleta, Camion",
        }),
      ],
    }),

    ref("6.12", "Explicación paso a paso", "1483–1489", {
      concept: [
        p("Leer la jerarquía anterior paso a paso (guía, §6.12):"),
        items([
          "`Vehiculo` define **atributos comunes** (`marca`, `velocidad`) y **comportamiento abstracto** (`numeroRuedas`).",
          "Cada subclase **hereda** `marca`, `velocidad`, `acelerar`, `descripcion`.",
          "Cada subclase **implementa** `numeroRuedas` a su manera (polimorfismo).",
          "La subclase `Camion` añade atributos y métodos propios (`cargaMaxima`).",
          "`super(marca)` invoca el constructor de `Vehiculo` para inicializar el estado heredado.",
        ], true),
      ],
    }),

    ref("6.13", "¿Cuándo usar herencia?", "1491–1495", {
      concept: [
        items([
          "Cuando se cumple **«es un»** claramente.",
          "Cuando la subclase **reutiliza estructura y comportamiento** de la base.",
          "Cuando la evolución **no rompe** el contrato de la superclase.",
        ]),
      ],
    }),

    ref("6.14", "¿Cuándo preferir composición?", "1497–1503", {
      concept: [
        items([
          "Cuando la relación es **«tiene un»**.",
          "Cuando se quiere **evitar acoplamiento fuerte**.",
          "Cuando sólo necesitas **reutilizar comportamiento** de otra clase (no identidad).",
        ]),
        quote(
          "**Regla heurística**: \"Favorece composición sobre herencia\" (Design Patterns, GoF).",
        ),
      ],
    }),

    ref("6.15", "Problema de herencia profunda", "1505–1510", {
      concept: [
        p("Jerarquías muy profundas generan:"),
        items([
          "**Rigidez**: cambios en la base afectan toda la jerarquía.",
          "**Difícil comprensión**.",
          "**Fragile Base Class Problem**: modificar la base puede romper subclases sutilmente.",
        ]),
      ],
    }),

    ref("6.16", "Principio de Sustitución de Liskov (LSP)", "1512–1532", {
      concept: [
        quote(
          "«Los objetos de una subclase deben poder sustituir a los de la superclase **sin alterar la corrección** del programa.»",
        ),
        p(
          "Violación clásica: `Cuadrado extends Rectangulo` cuando la superclase asume `ancho != alto`.",
        ),
      ],
      codeBlocks: [
        cb("m06-s616-c1", { chapter: 6, section: "6.16", lines: "1518–1530" }, LSP_VIOLACION, "java", {
          title: "Violación clásica de LSP",
        }),
      ],
      keyPoints: [
        p(
          "La solución correcta no es \"heredar Cuadrado de Rectángulo\", sino modelarlos como abstracciones separadas bajo una interfaz común (`Figura`), o hacerlos inmutables. — Guía, §6.16 (l.1532).",
        ),
      ],
    }),

    ref("6.17", "Errores comunes", "1534–1542", {
      commonMistakes: [
        items([
          "Usar herencia cuando la relación es «tiene un».",
          "Olvidar `super(...)` cuando la superclase no tiene constructor sin argumentos.",
          "Sobrescribir sin `@Override`.",
          "Violar LSP.",
          "Abusar de jerarquías profundas.",
          "Declarar atributos `protected` en lugar de `private` + getters protegidos.",
          "Heredar sólo para **reutilizar código**, no por semántica.",
        ]),
      ],
    }),

    ref("6.18", "Preguntas de evaluación", "1544–1559", {
      questions: [
        q("m06-herencia-s618", 1, { chapter: 6, section: "6.18", lines: "1544–1559" }, "Define herencia y su relación «es un»."),
        q("m06-herencia-s618", 2, { chapter: 6, section: "6.18", lines: "1544–1559" }, "¿Por qué Java no soporta herencia múltiple de clases?"),
        q("m06-herencia-s618", 3, { chapter: 6, section: "6.18", lines: "1544–1559" }, "¿Qué diferencia hay entre `protected` y `private`?"),
        q("m06-herencia-s618", 4, { chapter: 6, section: "6.18", lines: "1544–1559" }, "¿Qué hace `super(...)`?"),
        q("m06-herencia-s618", 5, { chapter: 6, section: "6.18", lines: "1544–1559" }, "¿Qué es una jerarquía multinivel?"),
        q("m06-herencia-s618", 6, { chapter: 6, section: "6.18", lines: "1544–1559" }, "¿Cuándo NO usar herencia?"),
        q("m06-herencia-s618", 7, { chapter: 6, section: "6.18", lines: "1544–1559" }, "Explica el principio de Liskov con un ejemplo de violación."),
        q("m06-herencia-s618", 8, { chapter: 6, section: "6.18", lines: "1544–1559" }, "¿Por qué se dice «favorece composición sobre herencia»?"),
        q("m06-herencia-s618", 9, { chapter: 6, section: "6.18", lines: "1544–1559" }, "¿Qué es el «Fragile Base Class Problem»?"),
        q("m06-herencia-s618", 10, { chapter: 6, section: "6.18", lines: "1544–1559" }, "¿Cuál es la diferencia entre reutilizar por herencia y por composición?"),
      ],
      keyPoints: [
        quote(
          "**Herencia** modela «es un». Reutiliza y especializa. Pero **composición** suele ser mejor cuando la relación no es taxonómica o cuando se busca desacoplar.",
        ),
      ],
    }),
  ],
};