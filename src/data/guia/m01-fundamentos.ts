import type { Module } from "../types";
import {
  cb,
  code,
  items,
  mermaid,
  makeSectionBuilder,
  p,
  q,
  quote,
  table,
} from "./helpers";

const ref = makeSectionBuilder("m01-fundamentos", 1);

export const M01_FUNDAMENTOS: Module = {
  id: "m01-fundamentos",
  chapter: 1,
  title: "Fundamentos de POO",
  subtitle: "¿Qué es la Programación Orientada a Objetos? — guiaPOO.md · capítulo 1",
  xp: 50,
  dart: { available: false },
  summary: [
    p(
      "La Programación Orientada a Objetos (POO) es un paradigma de programación que organiza el diseño y la implementación de software alrededor de objetos: entidades que encapsulan estado (datos) y comportamiento (operaciones), y que interactúan entre sí mediante el envío de mensajes.",
    ),
  ],
  sections: [
    ref("1.1", "Definición formal", "105–114", {
      concept: [
        p(
          "La **Programación Orientada a Objetos (POO)** es un **paradigma de programación** que organiza el diseño y la implementación de software alrededor de **objetos**: entidades que encapsulan **estado** (datos) y **comportamiento** (operaciones), y que **interactúan entre sí** mediante el envío de **mensajes**.",
        ),
        quote(
          "«La orientación a objetos es un estilo de programación en el que el diseño se organiza alrededor de objetos y sus interacciones, más que alrededor de funciones y datos separados.»",
        ),
        p(
          "Conviene precisar que esta cita se atribuye a Kay en distintas formulaciones. La idea central —que los objetos son **unidades de responsabilidad** que colaboran— se mantiene independientemente de la formulación exacta.",
        ),
      ],
    }),

    ref("1.2", "¿Qué problema intenta resolver?", "115–126", {
      concept: [
        p(
          "Los paradigmas anteriores (estructurada, procedural) **separan datos y funciones**. En sistemas pequeños esto es manejable; cuando el sistema crece, aparecen problemas estructurales:",
        ),
        items([
          "**Estado global vulnerable**: cualquier función puede modificar los datos.",
          "**Baja reutilización**: las funciones dependen de estructuras de datos concretas.",
          "**Rastreo difícil**: determinar quién modifica qué se vuelve una tarea de auditoría.",
          "**Extensión costosa**: añadir variantes obliga a modificar código existente (violando el principio Abierto/Cerrado).",
          "**Modelado débil del dominio**: el código refleja la estructura del programa, no la del negocio.",
        ]),
        p(
          "La POO responde agrupando **datos y operaciones relacionadas** en una unidad cohesiva (el objeto), y permitiendo que las variaciones se manejen mediante **especialización** y **sustitución polimórfica**.",
        ),
      ],
    }),

    ref("1.3", "Modelar un sistema mediante objetos", "127–138", {
      concept: [
        p(
          "Modelar es construir una **representación abstracta** del dominio del problema. Al modelar con objetos:",
        ),
        items(
          [
            "**Identificamos entidades** relevantes del dominio (Cliente, Pedido, Producto).",
            "**Determinamos su estado** (qué información guardan).",
            "**Determinamos su comportamiento** (qué operaciones ofrecen).",
            "**Definimos sus responsabilidades** (qué les corresponde hacer y qué delegan).",
            "**Establecemos sus relaciones** (quién conoce a quién y con qué fuerza).",
          ],
          true,
        ),
        p(
          "Un buen modelo **no replica la base de datos** ni la estructura del programa: refleja el **lenguaje del dominio**.",
        ),
      ],
    }),

    ref("1.4", "Componentes fundamentales de un objeto", "139–191", {
      concept: [
        p(
          "**Estado** — Conjunto de **atributos** (datos) que el objeto mantiene. Representa «cómo está» el objeto en un momento dado.",
        ),
        p(
          "**Comportamiento** — Conjunto de **métodos** (operaciones) que definen «qué sabe hacer» el objeto y cómo modifica su estado.",
        ),
        p(
          "**Identidad** — Cada objeto es **único e irrepetible**, incluso si tiene el mismo estado que otro. La identidad se materializa en su **referencia en memoria**. Dos objetos con idéntico estado siguen siendo dos objetos distintos.",
        ),
        p(
          "**Profundización:** `==` compara **referencias** (identidad); `equals()` compara **contenido lógico**, siempre que se sobrescriba correctamente. Por defecto, `Object.equals()` es equivalente a `==`. Si se sobrescribe `equals()`, es **obligatorio** sobrescribir `hashCode()` para mantener el contrato: si `a.equals(b)`, entonces `a.hashCode() == b.hashCode()`.",
        ),
        p(
          "**Responsabilidad** — Cada objeto debe saber hacer **lo que le corresponde** y delegar lo demás. Este principio (Grady Booch) conduce a sistemas con **bajo acoplamiento y alta cohesión**.",
        ),
        p(
          "**Interacción y mensajes** — Los objetos **no son islas**. Se comunican enviándose **mensajes** (en lenguajes como Java, esto se materializa como **invocaciones a métodos**).",
        ),
      ],
      codeBlocks: [
        cb(
          "m01-s14-c1",
          { chapter: 1, section: "1.4", lines: "141–143" },
          "private double saldo; // estado de una CuentaBancaria",
          "java",
          { title: "Estado" },
        ),
        cb(
          "m01-s14-c2",
          { chapter: 1, section: "1.4", lines: "149–155" },
          `public void depositar(double monto) {
    if (monto <= 0) throw new IllegalArgumentException("Monto inválido");
    this.saldo += monto;
}`,
          "java",
          { title: "Comportamiento" },
        ),
        cb(
          "m01-s14-c3",
          { chapter: 1, section: "1.4", lines: "160–169" },
          `CuentaBancaria c1 = new CuentaBancaria("001", 1000);
CuentaBancaria c2 = new CuentaBancaria("001", 1000);
System.out.println(c1 == c2);        // false → identidades distintas
System.out.println(c1.equals(c2));   // depende de la implementación de equals()`,
          "java",
          { title: "Identidad" },
        ),
      ],
      keyPoints: [
        mermaid(`sequenceDiagram
    participant Cliente
    participant Pedido
    participant Inventario
    Cliente->>Pedido: agregarProducto(p)
    Pedido->>Inventario: verificarStock(p)
    Inventario-->>Pedido: stockDisponible
    Pedido-->>Cliente: confirmación`),
      ],
    }),

    ref("1.5", "Clases y objetos como elementos fundamentales", "192–206", {
      concept: [
        items([
          "Una **clase** es la **plantilla** o **molde** que describe estructura (atributos) y comportamiento (métodos).",
          "Un **objeto** es una **instancia concreta** de esa clase, con estado propio en memoria.",
        ]),
        table(
          ["Aspecto", "Clase", "Objeto"],
          [
            ["Naturaleza", "Tipo (compilación)", "Valor (ejecución)"],
            ["Existencia", "Definición en código", "Instancia en memoria (heap)"],
            ["Estado", "Declaración de atributos", "Valores concretos"],
            ["Analogía", "Plano, receta, molde", "Casa, platillo, pieza"],
            ["Cantidad", "Una por definición", "Muchas por clase"],
          ],
          "Clase vs Objeto",
        ),
      ],
      analogy: [
        p("**Clase : Objeto :: Plano : Edificio :: Receta : Platillo**"),
      ],
    }),

    ref("1.6", "Los cuatro pilares", "207–224", {
      concept: [
        p(
          "**Abstracción** — Capacidad de **modelar sólo los aspectos esenciales** de un concepto, ignorando los detalles irrelevantes para el contexto. Se materializa mediante **clases abstractas** e **interfaces**.",
        ),
        p(
          "**Encapsulamiento** — Mecanismo que **oculta el estado interno** de un objeto y sólo expone una **interfaz pública controlada**. Protege la **invariante** del objeto.",
        ),
        p(
          "**Herencia** — Mecanismo por el cual una **subclase** reutiliza, extiende o especializa el comportamiento de una **superclase**. Establece relación **«es un»**.",
        ),
        p(
          "**Polimorfismo** — Capacidad de que una **misma referencia** pueda invocar comportamientos **diferentes** según el **tipo real** del objeto en tiempo de ejecución.",
        ),
      ],
    }),

    ref("1.7", "Ventajas", "225–233", {
      concept: [
        items([
          "**Reutilización** mediante herencia y composición.",
          "**Mantenibilidad** gracias al encapsulamiento y bajo acoplamiento.",
          "**Extensibilidad** gracias al polimorfismo (principio Abierto/Cerrado).",
          "**Modelado natural** de dominios complejos.",
          "**Modularidad** que facilita trabajo en equipo.",
          "**Trazabilidad** entre modelo conceptual y código.",
        ]),
      ],
    }),

    ref("1.8", "Desventajas y limitaciones", "234–241", {
      concept: [
        items([
          "**Curva de aprendizaje** más pronunciada.",
          "**Overhead** de memoria/tiempo comparado con soluciones procedurales simples.",
          "**Riesgo de sobrediseño**: crear jerarquías innecesarias.",
          "**Mal uso de herencia** genera acoplamiento rígido.",
          "En programas muy pequeños, la POO puede ser **excesiva**.",
        ]),
      ],
    }),

    ref("1.9", "¿Cuándo es apropiado?", "242–248", {
      concept: [
        items([
          "Sistemas con **dominios ricos** y reglas de negocio complejas.",
          "Aplicaciones que **evolucionarán** (requisitos cambiantes).",
          "Sistemas **grandes** desarrollados por **equipos**.",
          "Software con múltiples **variantes de comportamiento**.",
        ]),
      ],
    }),

    ref("1.10", "¿Cuándo puede ser innecesariamente compleja?", "249–255", {
      concept: [
        items([
          "**Scripts pequeños** (10–50 líneas) con lógica secuencial.",
          "**Prototipos desechables**.",
          "**Algoritmos matemáticos puros** con poca modelación de dominio.",
          "**Procesamiento batch** sin entidades persistentes.",
        ]),
      ],
    }),

    ref("1.11", "Ejemplo conceptual", "256–267", {
      analogy: [
        p(
          "Imagina un **sistema de zoo**. En lugar de tener:",
        ),
        code(`funcion alimentar_leon(nombre, edad, peso)
funcion alimentar_tigre(nombre, edad, peso)
funcion alimentar_elefante(nombre, edad, peso)`),
        p(
          "Con POO tenemos una clase `Animal` con subclases `Leon`, `Tigre`, `Elefante`, cada una responsable de su propia alimentación.",
        ),
      ],
    }),

    ref("1.12", "Ejemplo en Java", "268–332", {
      codeBlocks: [
        cb(
          "m01-s12-c1",
          { chapter: 1, section: "1.12", lines: "268–331" },
          `// Abstracción: definimos QUÉ hace un animal, no CÓMO
public abstract class Animal {
    private final String nombre;   // encapsulamiento + inmutabilidad
    private final int edad;

    public Animal(String nombre, int edad) {
        if (nombre == null || nombre.isBlank())
            throw new IllegalArgumentException("Nombre requerido");
        if (edad < 0)
            throw new IllegalArgumentException("Edad inválida");
        this.nombre = nombre;
        this.edad = edad;
    }

    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }

    // Comportamiento abstracto: cada subclase lo define
    public abstract String emitirSonido();
    public abstract void alimentar();
}

public class Leon extends Animal {
    public Leon(String nombre, int edad) { super(nombre, edad); }

    @Override
    public String emitirSonido() { return "Rugido"; }

    @Override
    public void alimentar() {
        System.out.println(getNombre() + " come carne");
    }
}

public class Elefante extends Animal {
    public Elefante(String nombre, int edad) { super(nombre, edad); }

    @Override
    public String emitirSonido() { return "Barrito"; }

    @Override
    public void alimentar() {
        System.out.println(getNombre() + " come vegetales");
    }
}

// Uso polimórfico
public class Zoo {
    public static void main(String[] args) {
        List<Animal> animales = List.of(
            new Leon("Simba", 5),
            new Elefante("Dumbo", 12)
        );

        for (Animal a : animales) {
            System.out.println(a.getNombre() + ": " + a.emitirSonido());
            a.alimentar(); // polimorfismo: se ejecuta el método real
        }
    }
}`,
          "java",
          {
            title: "Zoo.java — ejemplo integrador de los cuatro pilares",
            expectedOutput: `Simba: Rugido
Simba come carne
Dumbo: Barrito
Dumbo come vegetales`,
          },
        ),
      ],
    }),

    ref("1.13", "Análisis del ejemplo", "333–344", {
      concept: [
        table(
          ["Elemento", "Concepto POO", "Explicación"],
          [
            ["`Animal`", "Abstracción + Encapsulamiento", "Define el contrato común; oculta `nombre` y `edad` con `private`."],
            ["`Leon extends Animal`", "Herencia", "Especializa el comportamiento general."],
            ["`emitirSonido()`", "Polimorfismo", "Cada subclase da su propia implementación."],
            ["`List<Animal>`", "Polimorfismo + Abstracción", "Trabajamos con la abstracción, no con tipos concretos."],
            ["`private final String nombre`", "Encapsulamiento + inmutabilidad", "Sólo accesible mediante getters; no se reasigna."],
          ],
          "Análisis del ejemplo 1.12",
        ),
        p(
          "**Observación de diseño:** el uso de `final` en los atributos hace que `Animal` sea (casi) inmutable. Esto simplifica el razonamiento, evita condiciones de carrera y previene mutaciones accidentales. La inmutabilidad es un criterio de diseño que conviene aplicar por defecto, y sólo abandonar cuando la mutación sea estrictamente necesaria.",
        ),
      ],
    }),

    ref("1.14", "Errores comunes", "345–354", {
      commonMistakes: [
        items([
          "**Confundir POO con «usar clases»**: se puede escribir código procedural dentro de clases y no es POO real.",
          "**Creer que encapsulamiento = crear getters/setters para todo**: eso es sólo un aspecto.",
          "**Pensar que herencia es sinónimo de reutilización óptima**: muchas veces composición es mejor.",
          "**Definir clases anémicas**: sólo datos, sin comportamiento; la lógica queda en clases de servicio.",
          "**Malinterpretar «objeto» como sinónimo de «instancia de una clase cualquiera»**: no todo lo instanciable es un buen objeto de dominio.",
          "**Ignorar la identidad**: comparar objetos con `==` cuando se quiere comparar contenido.",
          "**No sobrescribir `hashCode()` al sobrescribir `equals()`**: rompe el contrato y produce errores en `HashMap`/`HashSet`.",
        ]),
      ],
    }),

    ref("1.15", "Preguntas de evaluación", "355–367", {
      questions: [
        q("m01-fundamentos-s115", 1, { chapter: 1, section: "1.15", lines: "355–367" }, "Define POO con tus propias palabras sin usar la palabra «objeto»."),
        q("m01-fundamentos-s115", 2, { chapter: 1, section: "1.15", lines: "355–367" }, "¿Qué diferencia hay entre «estado» e «identidad» de un objeto?"),
        q("m01-fundamentos-s115", 3, { chapter: 1, section: "1.15", lines: "355–367" }, "Explica por qué un objeto con el mismo estado que otro sigue siendo distinto."),
        q("m01-fundamentos-s115", 4, { chapter: 1, section: "1.15", lines: "355–367" }, "¿Qué significa «responsabilidad» en el contexto de POO?"),
        q("m01-fundamentos-s115", 5, { chapter: 1, section: "1.15", lines: "355–367" }, "¿Cuál es la relación entre «mensaje» y «método»?"),
        q("m01-fundamentos-s115", 6, { chapter: 1, section: "1.15", lines: "355–367" }, "Enumera y explica los cuatro pilares."),
        q("m01-fundamentos-s115", 7, { chapter: 1, section: "1.15", lines: "355–367" }, "¿Por qué la POO puede no ser apropiada para scripts pequeños?"),
        q("m01-fundamentos-s115", 8, { chapter: 1, section: "1.15", lines: "355–367" }, "Da un ejemplo de sobrediseño con POO."),
        q("m01-fundamentos-s115", 9, { chapter: 1, section: "1.15", lines: "355–367" }, "¿Cómo se relacionan abstracción y polimorfismo?"),
        q("m01-fundamentos-s115", 10, { chapter: 1, section: "1.15", lines: "355–367" }, "¿Cuándo la encapsulación se vuelve un obstáculo?"),
      ],
    }),

    ref("1.16", "Respuestas razonadas", "368–380", {
      questions: [
        q("m01-fundamentos-s116", 1, { chapter: 1, section: "1.16", lines: "368–380" }, "Define POO con tus propias palabras sin usar la palabra «objeto».", "Paradigma que organiza el software en unidades autónomas que combinan datos y comportamiento, y que colaboran enviándose mensajes."),
        q("m01-fundamentos-s116", 2, { chapter: 1, section: "1.16", lines: "368–380" }, "¿Qué diferencia hay entre «estado» e «identidad» de un objeto?", "El **estado** son los valores actuales de los atributos; la **identidad** es la referencia única e irrepetible que distingue a un objeto de otro."),
        q("m01-fundamentos-s116", 3, { chapter: 1, section: "1.16", lines: "368–380" }, "Explica por qué un objeto con el mismo estado que otro sigue siendo distinto.", "Porque la identidad no depende del estado. Dos cuentas con el mismo saldo siguen siendo dos cuentas diferentes."),
        q("m01-fundamentos-s116", 4, { chapter: 1, section: "1.16", lines: "368–380" }, "¿Qué significa «responsabilidad» en el contexto de POO?", "Es la obligación de un objeto de saber resolver aquello que le compete, delegando lo demás a otros objetos."),
        q("m01-fundamentos-s116", 5, { chapter: 1, section: "1.16", lines: "368–380" }, "¿Cuál es la relación entre «mensaje» y «método»?", "El mensaje es la **intención** (conceptual); el método es la **implementación** concreta que se ejecuta al recibirlo."),
        q("m01-fundamentos-s116", 6, { chapter: 1, section: "1.16", lines: "368–380" }, "Enumera y explica los cuatro pilares.", "Abstracción, encapsulamiento, herencia, polimorfismo. (Explicar cada uno con ejemplo breve.)"),
        q("m01-fundamentos-s116", 7, { chapter: 1, section: "1.16", lines: "368–380" }, "¿Por qué la POO puede no ser apropiada para scripts pequeños?", "Porque introduce estructura adicional (clases, jerarquías) que no aporta valor cuando no hay dominio que modelar ni evolución prevista."),
        q("m01-fundamentos-s116", 8, { chapter: 1, section: "1.16", lines: "368–380" }, "Da un ejemplo de sobrediseño con POO.", "Crear una jerarquía `GestorDeArchivo → GestorDeArchivoTexto → GestorDeArchivoTextoUTF8` cuando un simple método bastaba."),
        q("m01-fundamentos-s116", 9, { chapter: 1, section: "1.16", lines: "368–380" }, "¿Cómo se relacionan abstracción y polimorfismo?", "La abstracción define **qué** se ofrece; el polimorfismo permite **sustituir** implementaciones concretas sin que el cliente lo sepa."),
        q("m01-fundamentos-s116", 10, { chapter: 1, section: "1.16", lines: "368–380" }, "¿Cuándo la encapsulación se vuelve un obstáculo?", "Cuando se usa para **bloquear el acceso al estado que sí debería exponerse**, generando decenas de getters/setters que en realidad sólo reproducen acceso directo."),
      ],
    }),

    ref("1.17", "Puntos clave para memorizar", "381–397", {
      keyPoints: [
        items([
          "**POO = objetos + mensajes + estado + comportamiento + identidad.**",
          "Los cuatro pilares: **A-E-H-P** (Abstracción, Encapsulamiento, Herencia, Polimorfismo).",
          "**Objeto** = instancia única de una clase, con estado y comportamiento.",
          "**Mensaje** = invocación; **método** = implementación.",
          "La POO modela el **dominio**, no la estructura del programa.",
          "No es la única opción ni la mejor en todos los casos.",
        ]),
        quote(
          "La POO es un paradigma donde el software se construye con **objetos autónomos** que combinan datos y comportamiento, colaboran por **mensajes**, y se organizan en **clases** que capturan la estructura y el comportamiento común.",
        ),
        quote(
          "**¿Cómo reconocer este concepto en un examen?** Cuando la pregunta mencione «paradigma», «modelado del dominio», «unidades autónomas», «colaboración por mensajes» o pida «explicar por qué POO y no código procedural», estás en este bloque.",
        ),
      ],
    }),
  ],
};