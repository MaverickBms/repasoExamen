import type { Module } from "../types";
import {
  cb,
  ex,
  items,
  makeSectionBuilder,
  p,
  q,
  quote,
} from "./helpers";

const ref = makeSectionBuilder("m03-objetos-clases", 3);

const PERSONA_MAIN = `public class Persona {
    private final String nombre;
    private int edad;

    public Persona(String nombre, int edad) {
        if (nombre == null || nombre.isBlank())
            throw new IllegalArgumentException("Nombre requerido");
        if (edad < 0)
            throw new IllegalArgumentException("Edad inválida");
        this.nombre = nombre;
        this.edad = edad;
    }

    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }

    public void cumplirAnios() {
        this.edad++;
    }

    public String saludar() {
        return "Hola, soy " + nombre + " y tengo " + edad + " años";
    }
}

public class Main {
    public static void main(String[] args) {
        Persona ana = new Persona("Ana", 30);
        Persona luis = new Persona("Luis", 25);

        ana.cumplirAnios();
        System.out.println(ana.saludar());   // Hola, soy Ana y tengo 31 años
        System.out.println(luis.saludar());  // Hola, soy Luis y tengo 25 años
    }
}`;

const LIBRO_SOLUCION = `public class Libro {
    private final String titulo;
    private final String autor;
    private final String isbn;
    private final int paginas;
    private boolean disponible;

    public Libro(String titulo, String autor, String isbn, int paginas) {
        if (titulo == null || titulo.isBlank()) throw new IllegalArgumentException();
        if (autor == null || autor.isBlank())  throw new IllegalArgumentException();
        if (isbn == null || isbn.isBlank())    throw new IllegalArgumentException();
        if (paginas <= 0)                      throw new IllegalArgumentException();

        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.paginas = paginas;
        this.disponible = true;
    }

    public boolean estaDisponible() { return disponible; }

    public void prestar() {
        if (!disponible)
            throw new IllegalStateException("El libro ya está prestado");
        this.disponible = false;
    }

    public void devolver() {
        if (disponible)
            throw new IllegalStateException("El libro ya está disponible");
        this.disponible = true;
    }

    public String getTitulo() { return titulo; }
    public String getAutor()  { return autor; }
    public String getIsbn()   { return isbn; }
    public int getPaginas()   { return paginas; }
}`;

export const M03_OBJETOS_CLASES: Module = {
  id: "m03-objetos-clases",
  chapter: 3,
  title: "Objetos y Clases",
  subtitle: "La pareja fundamental del modelado orientado a objetos — guiaPOO.md · capítulo 3",
  xp: 50,
  dart: { available: false },
  summary: [
    p(
      "Este capítulo define los dos elementos centrales del paradigma: el **objeto** (entidad con estado, comportamiento e identidad) y la **clase** (plantilla que lo describe). También cubre instanciación, referencias, el diagrama UML de clases/objetos, la comparación `==` vs `equals()` y un ejercicio completo resuelto.",
    ),
  ],
  sections: [
    ref("3.1", "Objeto", "567–598", {
      concept: [
        p("Un **objeto** es una **entidad software** que encapsula:"),
        items([
          "**Estado** (valores actuales de sus atributos).",
          "**Comportamiento** (métodos que modifican o consultan el estado).",
          "**Identidad** (referencia única).",
        ]),
        p("**Estado.** Valores en un instante. Cambia con la ejecución de métodos."),
        p(
          "**Comportamiento.** Operaciones disponibles: **consultas** (no mutan) y **comandos** (mutan).",
        ),
        p("**Identidad.** Referencia única e irrepetible."),
        p("**Atributos.** Variables internas del objeto. Definen su estado."),
        p("**Métodos.** Operaciones que definen su comportamiento."),
        p("**Instancia.** Sinónimo de «objeto creado a partir de una clase»."),
      ],
    }),

    ref("3.2", "Clase", "600–643", {
      concept: [
        p("Una **clase** es una **plantilla** que describe:"),
        items([
          "Atributos (qué tendrá).",
          "Métodos (qué podrá hacer).",
          "Constructores (cómo se inicializa).",
        ]),
      ],
      codeBlocks: [
        cb("m03-s32-c1", { chapter: 3, section: "3.2", lines: "611–617" }, `[modificadores] class NombreClase [extends ...] [implements ...] {
    // atributos
    // constructores
    // métodos
}`, "text", { title: "Estructura de una clase" }),
        cb("m03-s32-c2", { chapter: 3, section: "3.2", lines: "621–624" }, `private String nombre;
private int edad;`, "java", { title: "Atributos" }),
        cb("m03-s32-c3", { chapter: 3, section: "3.2", lines: "628–630" }, `public void saludar() { ... }`, "java", { title: "Método" }),
        cb("m03-s32-c4", { chapter: 3, section: "3.2", lines: "634–639" }, `public Persona(String nombre, int edad) {
    this.nombre = nombre;
    this.edad = edad;
}`, "java", { title: "Constructor" }),
      ],
      keyPoints: [
        p(
          "**Responsabilidad**: la clase debe representar **una sola idea cohesiva** (principio de responsabilidad única). Si la clase necesita más de una razón para cambiar, probablemente debería dividirse. — Guía, §3.2 (l.643).",
        ),
      ],
    }),

    ref("3.3", "Diferencia entre clase y objeto", "645–657", {
      concept: [
        p(
          "Cuando la pregunta mencione «diferencia entre clase y objeto», responde en estos cuatro planos que da la guía:",
        ),
        items([
          "**Conceptual**: la clase es la **forma**; el objeto es la **sustancia**.",
          "**Técnica**: la clase es un **tipo** (existe en tiempo de compilación); el objeto es un **valor en memoria** (existe en tiempo de ejecución).",
          "**Analogía**: la clase es el **plano**; el objeto es la **casa**.",
          "**UML**: la clase se dibuja como un rectángulo con 3 compartimentos; un objeto como un rectángulo con nombre subrayado (`p: Persona`).",
        ]),
      ],
      codeBlocks: [
        cb("m03-s33-c1", { chapter: 3, section: "3.3", lines: "651–656" }, `Persona p = new Persona("Ana", 30);
// Persona → clase
// p       → referencia al objeto
// new ... → creación del objeto`, "java"),
      ],
    }),

    ref("3.4", "Instanciación, referencias y estado", "659–675", {
      concept: [
        items([
          "La instanciación (`new`) reserva memoria en el **heap**.",
          "La referencia (`p`) es una variable en el **stack** que apunta al objeto.",
          "Cada instancia tiene **su propio estado**.",
        ]),
      ],
      codeBlocks: [
        cb("m03-s34-c1", { chapter: 3, section: "3.4", lines: "665–675" }, `classDiagram
    class Persona {
        -String nombre
        -int edad
        +Persona(nombre, edad)
        +getNombre() String
        +getEdad() int
        +saludar() void
    }`, "text", {
          title: "Diagrama de clases — Persona",
          explanation: [p("Diagrama Mermaid original de la guía (renderizado en FASE 4).")],
        }),
      ],
    }),

    ref("3.5", "Diagrama de objetos (instancias)", "677–689", {
      concept: [
        p("El diagrama de objetos muestra instancias concretas con sus valores:"),
      ],
      codeBlocks: [
        cb("m03-s35-c1", { chapter: 3, section: "3.5", lines: "679–689" }, `classDiagram
    class p1 {
        nombre = "Ana"
        edad = 30
    }
    class p2 {
        nombre = "Luis"
        edad = 25
    }`, "text", {
          title: "Diagrama de objetos — p1 y p2",
          explanation: [p("Diagrama Mermaid original de la guía (renderizado en FASE 4).")],
        }),
      ],
    }),

    ref("3.6", "Código Java completo", "691–729", {
      concept: [
        p("Clase `Persona` completa con invariantes y un `Main` de demostración:"),
      ],
      codeBlocks: [
        cb("m03-s36-c1", { chapter: 3, section: "3.6", lines: "693–729" }, PERSONA_MAIN, "java", {
          title: "Persona.java + Main.java",
          expectedOutput: `Hola, soy Ana y tengo 31 años
Hola, soy Luis y tengo 25 años`,
        }),
      ],
    }),

    ref("3.7", "Análisis línea por línea", "731–743", {
      concept: [
        p("El «por qué» de cada línea del ejemplo (la guía lo presenta como tabla):"),
      ],
      codeBlocks: [
        cb("m03-s37-c1", { chapter: 3, section: "3.7", lines: "733–743" }, `| Línea | Qué ocurre |
|-------|------------|
| public class Persona {        | Declaración de la clase. |
| private final String nombre;  | Atributo inmutable. |
| private int edad;             | Atributo mutable. |
| public Persona(...)           | Constructor con validaciones (invariantes). |
| this.nombre = nombre;         | this distingue atributo de parámetro. |
| public void cumplirAnios()    | Comando que muta el estado. |
| Persona ana = new Persona("Ana", 30); | Instanciación: reserva memoria, ejecuta constructor, asigna referencia. |
| ana.cumplirAnios();           | Modifica solo el estado de ana. |
| ana.saludar()                 | Consulta que lee el estado actual. |`, "text", { title: "Tabla literal de la guía (estructura preservada)" }),
      ],
    }),

    ref("3.8", "`==` vs `equals()`", "745–773", {
      concept: [
        p("Esta distinción es **crítica** y suele evaluarse:"),
        items([
          "**`==`** compara **referencias**. Dos variables apuntan al mismo objeto si `a == b`.",
          "**`equals()`** compara **contenido lógico**, si la clase lo sobrescribe correctamente.",
        ]),
        p(
          "**Contrato de `equals()`**: debe ser **reflexivo**, **simétrico**, **transitivo**, **consistente** y `x.equals(null)` debe retornar `false`. Si se sobrescribe, **también se debe sobrescribir `hashCode()`**.",
        ),
      ],
      codeBlocks: [
        cb("m03-s38-c1", { chapter: 3, section: "3.8", lines: "752–757" }, `String s1 = new String("hola");
String s2 = new String("hola");
System.out.println(s1 == s2);        // false → objetos distintos
System.out.println(s1.equals(s2));   // true  → mismo contenido`, "java", { title: "`==` vs `equals()` en la práctica" }),
        cb("m03-s38-c2", { chapter: 3, section: "3.8", lines: "761–773" }, `@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Persona p)) return false;
    return edad == p.edad && Objects.equals(nombre, p.nombre);
}

@Override
public int hashCode() {
    return Objects.hash(nombre, edad);
}`, "java", { title: "equals() + hashCode() correctos" }),
      ],
    }),

    ref("3.9", "Errores frecuentes", "775–783", {
      commonMistakes: [
        items([
          "**Confundir clase con objeto** en la respuesta de examen.",
          "**Crear setters para todo**, anulando el encapsulamiento.",
          "**No validar en el constructor**, permitiendo objetos en estado inválido.",
          "**Olvidar `this`** cuando hay sombra de variables.",
          "**Definir atributos `public`** por comodidad.",
          "**Confundir identidad con igualdad de contenido** (uso incorrecto de `==` vs `equals`).",
          "**Sobrescribir `equals()` sin `hashCode()`**.",
        ]),
      ],
    }),

    ref("3.10", "Preguntas típicas de examen", "785–796", {
      questions: [
        q("m03-objetos-clases-s310", 1, { chapter: 3, section: "3.10", lines: "785–796" }, "¿Cuál es la diferencia entre clase y objeto? Da ejemplo."),
        q("m03-objetos-clases-s310", 2, { chapter: 3, section: "3.10", lines: "785–796" }, "¿Qué es la identidad de un objeto?"),
        q("m03-objetos-clases-s310", 3, { chapter: 3, section: "3.10", lines: "785–796" }, "¿Qué es un constructor y para qué sirve?"),
        q("m03-objetos-clases-s310", 4, { chapter: 3, section: "3.10", lines: "785–796" }, "¿Qué hace la palabra reservada `new`?"),
        q("m03-objetos-clases-s310", 5, { chapter: 3, section: "3.10", lines: "785–796" }, "¿Qué diferencia hay entre `==` y `equals()`?"),
        q("m03-objetos-clases-s310", 6, { chapter: 3, section: "3.10", lines: "785–796" }, "¿Cuándo dos objetos son «iguales»? ¿Cuándo son «idénticos»?"),
        q("m03-objetos-clases-s310", 7, { chapter: 3, section: "3.10", lines: "785–796" }, "¿Por qué se recomienda `private` en atributos?"),
        q("m03-objetos-clases-s310", 8, { chapter: 3, section: "3.10", lines: "785–796" }, "¿Qué significa que un objeto es una instancia?"),
        q("m03-objetos-clases-s310", 9, { chapter: 3, section: "3.10", lines: "785–796" }, "¿Qué es un atributo `final`?"),
        q("m03-objetos-clases-s310", 10, { chapter: 3, section: "3.10", lines: "785–796" }, "¿Cómo se relaciona UML con la definición de clase?"),
      ],
    }),

    ref("3.11", "Ejercicio práctico (resuelto)", "798–853", {
      exercises: [
        ex("m03-objetos-clases-s311", 1, { chapter: 3, section: "3.11", lines: "798–853" }, {
          type: "open",
          prompt: [
            p(
              "Define una clase `Libro` con atributos `titulo`, `autor`, `isbn`, `paginas` y `disponible`. Incluye constructor con validación, métodos `prestar()`, `devolver()`, `estaDisponible()`.",
            ),
          ],
          answer: undefined,
        }),
      ],
      codeBlocks: [
        cb("m03-s311-c1", { chapter: 3, section: "3.11", lines: "804–844" }, LIBRO_SOLUCION, "java", {
          title: "Solución explicada (guía)",
        }),
      ],
      keyPoints: [
        items([
          "Uso de `final` para atributos inmutables tras la construcción.",
          "Validaciones en el constructor (preservan la **invariante**).",
          "Mutación de `disponible` sólo vía métodos con sentido de negocio (`prestar`, `devolver`), **no** mediante `setDisponible(boolean)`.",
        ]),
        quote(
          "Clase = plantilla; objeto = instancia. El objeto combina estado, comportamiento e identidad. La instanciación usa `new`; las referencias apuntan a objetos en el heap.",
        ),
      ],
    }),
  ],
};