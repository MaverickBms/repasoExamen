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

const ref = makeSectionBuilder("m05-encapsulamiento", 5);

const SET_SALARIO = `public void setSalario(double nuevoSalario) {
    if (nuevoSalario < 0)
        throw new IllegalArgumentException("El salario no puede ser negativo");
    this.salario = nuevoSalario;
}`;

const TELL_NOT_ASK = `// En lugar de:
cuenta.setSaldo(cuenta.getSaldo() + monto);

// Preferir:
cuenta.depositar(monto);`;

const CONSTRUCTOR_OVERLOAD = `public Cuenta(String titular) {
    this(titular, 0.0);
}

public Cuenta(String titular, double saldoInicial) { ... }`;

const TRY_WITH_RESOURCES = `try (FileReader fr = new FileReader("archivo.txt")) {
    // usar el recurso
} // se cierra automáticamente`;

const CONTADOR_STATIC = `public class Contador {
    private static int total = 0; // compartido
    private final int id;

    public Contador() {
        total++;
        this.id = total;
    }
}`;

const METODO_STATIC = `public static int getTotal() { return total; }`;

const ACCESO_STATIC = `Contador c1 = new Contador();
Contador c2 = new Contador();
System.out.println(Contador.getTotal()); // 2`;

const INCORRECTO = `public class Cuenta {
    public double saldo; // cualquiera modifica
}
// Uso: cuenta.saldo = -1000; // invariante rota`;

const CORREGIDO = `public class Cuenta {
    private double saldo;

    public double getSaldo() { return saldo; }

    public void depositar(double monto) {
        if (monto <= 0) throw new IllegalArgumentException();
        saldo += monto;
    }

    public void retirar(double monto) {
        if (monto <= 0 || monto > saldo) throw new IllegalArgumentException();
        saldo -= monto;
    }
}`;

export const M05_ENCAPSULAMIENTO: Module = {
  id: "m05-encapsulamiento",
  chapter: 5,
  title: "Encapsulamiento",
  subtitle: "Ocultar estado, exponer comportamiento controlado, preservar invariantes — guiaPOO.md · capítulo 5",
  xp: 50,
  dart: { available: false },
  summary: [
    p(
      "El **encapsulamiento** es el mecanismo que oculta el estado interno de un objeto, expone una interfaz controlada y preserva invariantes validando toda mutación. Este capítulo detalla modificadores de acceso, getters/setters, constructores, destructores (Java), miembros estáticos y un ejemplo incorrecto vs corregido.",
    ),
  ],
  sections: [
    ref("5.1", "¿Qué es?", "1084–1089", {
      concept: [
        p("**Encapsulamiento** es el mecanismo que:"),
        items([
          "**Oculta el estado interno** de un objeto.",
          "**Expone una interfaz controlada** para interactuar con él.",
          "**Preserva invariantes** validando toda mutación.",
        ]),
      ],
    }),

    ref("5.2", "¿Qué problema resuelve?", "1091–1093", {
      concept: [
        p(
          "Sin encapsulamiento, cualquier código externo podría modificar el estado, dejándolo **inconsistente**. Ejemplo: modificar el saldo de una cuenta sin registrar la transacción.",
        ),
      ],
    }),

    ref("5.3", "Control del acceso al estado interno", "1095–1097", {
      concept: [
        p(
          "Los **modificadores de acceso** establecen **quién** puede ver **qué**. Es la puerta de entrada al encapsulamiento.",
        ),
      ],
    }),

    ref("5.4", "Invariantes", "1099–1103", {
      concept: [
        p(
          "Un **invariante** es una condición que debe cumplirse **siempre** en un objeto válido.",
        ),
        p(
          "Ejemplo: `saldo >= 0`. Si el estado se expone directamente, la invariante puede violarse.",
        ),
      ],
    }),

    ref("5.5", "Modificadores de acceso (Java)", "1105–1121", {
      concept: [
        table(
          ["Modificador", "Misma clase", "Mismo paquete", "Subclase (otro paquete)", "Otros"],
          [
            ["`public`", "✅", "✅", "✅", "✅"],
            ["`protected`", "✅", "✅", "✅", "❌"],
            ["*(default)*", "✅", "✅", "❌", "❌"],
            ["`private`", "✅", "❌", "❌", "❌"],
          ],
          "Modificadores de acceso — tabla de la guía (§5.5, l.1107–1112)",
        ),
        p(
          "**Precisión importante sobre `protected`:** `protected` permite acceso desde el **mismo paquete** (independientemente de la herencia) y desde **subclases en otros paquetes**. Es decir, no es exclusivo de la relación de herencia.",
        ),
        p("**Recomendación general** (guía, §5.5):"),
        items([
          "**Atributos**: `private`.",
          "**Métodos de negocio**: `public`.",
          "**Métodos internos**: `private` o `protected`.",
          "**API estable**: `public`.",
        ]),
      ],
    }),

    ref("5.6", "Getters y setters", "1123–1177", {
      concept: [
        p("**¿Qué son?**"),
        items([
          "**Getter**: método que retorna el valor de un atributo.",
          "**Setter**: método que modifica el valor de un atributo.",
        ]),
        p("**¿Cuándo utilizarlos?**"),
        items([
          "**Getter**: cuando el cliente necesita **consultar** el estado.",
          "**Setter**: sólo cuando el cliente legítimamente necesita **modificar** el atributo.",
        ]),
        p("**¿Cuándo NO crear setters?**"),
        items([
          "Cuando el atributo es **derivado** de otros.",
          "Cuando el cambio debe pasar por **reglas de negocio**.",
          "Cuando el objeto debería ser **inmutable**.",
        ]),
      ],
      codeBlocks: [
        cb("m05-s56-c1", { chapter: 5, section: "5.6", lines: "1143–1149" }, SET_SALARIO, "java", {
          title: "Setter con validación",
        }),
        cb("m05-s56-c2", { chapter: 5, section: "5.6", lines: "1155–1163" }, TELL_NOT_ASK, "java", {
          title: "Diseño orientado a comportamiento",
          explanation: [
            p(
              "Esto se conoce como **\"Tell, Don't Ask\"**: no preguntes a un objeto por su estado para decidir tú qué hacer; dile qué hacer y deja que él decida.",
            ),
          ],
        }),
      ],
      keyPoints: [
        p("**Retorno de referencias mutables** — un getter que retorna una referencia mutable **rompe el encapsulamiento**:"),
        p("`// ❌ Peligroso: public List<String> getMovimientos() { return movimientos; }`"),
        p("`// ✅ Correcto:   public List<String> getMovimientos() { return List.copyOf(movimientos); }` — Guía, §5.6 (l.1167–1177)."),
      ],
    }),

    ref("5.7", "Constructores", "1179–1212", {
      concept: [
        p("**¿Qué son?** Método especial que **inicializa** un objeto al crearlo."),
        p(
          "**Constructor por defecto.** Si no se declara ninguno, Java crea uno sin argumentos que inicializa a valores por defecto (`0`, `null`, `false`).",
        ),
      ],
      codeBlocks: [
        cb("m05-s57-c1", { chapter: 5, section: "5.7", lines: "1191–1193" }, `public Cuenta(String titular, double saldoInicial) { ... }`, "java", {
          title: "Constructor parametrizado",
        }),
        cb("m05-s57-c2", { chapter: 5, section: "5.7", lines: "1199–1205" }, CONSTRUCTOR_OVERLOAD, "java", {
          title: "Sobrecarga de constructores (diferente firma)",
        }),
      ],
      keyPoints: [
        p("**`this` y `super`**:"),
        items([
          "`this(...)` → invoca otro constructor de **la misma clase**.",
          "`super(...)` → invoca el constructor de **la superclase**.",
        ]),
        p("Deben ser **la primera instrucción** del constructor."),
      ],
    }),

    ref("5.8", "Destructores", "1214–1236", {
      concept: [
        p(
          "**En Java NO existen destructores.** Java cuenta con un **Garbage Collector (GC)** que libera la memoria de objetos **sin referencias**. No se puede forzar la liberación de manera determinista (aunque existe `System.gc()` como **sugerencia**).",
        ),
        p("**Diferencia con C++**:"),
        items([
          "**C++**: destructores deterministas (`~Clase()`), invocados al salir del ámbito o al hacer `delete`.",
          "**Java**: `finalize()` está **deprecado desde Java 9** y **eliminado en Java 21**; no debe usarse.",
        ]),
        p("**Gestión de recursos** — para recursos **no gestionados por GC** (archivos, sockets, conexiones):"),
        items([
          "Interfaz **`AutoCloseable`**.",
          "Sentencia **`try-with-resources`**.",
        ]),
      ],
      codeBlocks: [
        cb("m05-s58-c1", { chapter: 5, section: "5.8", lines: "1232–1236" }, TRY_WITH_RESOURCES, "java", {
          title: "try-with-resources",
        }),
      ],
    }),

    ref("5.9", "Miembros estáticos (`static`)", "1238–1292", {
      concept: [
        p("**Atributos estáticos.** Compartidos por **todas las instancias** de la clase."),
        p("**Métodos estáticos.** Pertenecen a la **clase**, no a una instancia."),
      ],
      codeBlocks: [
        cb("m05-s59-c1", { chapter: 5, section: "5.9", lines: "1244–1254" }, CONTADOR_STATIC, "java", {
          title: "Atributo estático compartido",
        }),
        cb("m05-s59-c2", { chapter: 5, section: "5.9", lines: "1260–1262" }, METODO_STATIC, "java", {
          title: "Método estático",
        }),
        cb("m05-s59-c3", { chapter: 5, section: "5.9", lines: "1266–1270" }, ACCESO_STATIC, "java", {
          title: "Acceso",
        }),
      ],
      keyPoints: [
        p("**Diferencia instancia vs `static`** — tabla de la guía (§5.9):"),
        table(
          ["Aspecto", "Instancia", "Estático"],
          [
            ["Pertenece a", "Objeto", "Clase"],
            ["Memoria", "Una por objeto", "Una por clase"],
            ["Acceso", "`objeto.miembro`", "`Clase.miembro`"],
            ["Uso de `this`", "Sí", "No"],
            ["Casos de uso", "Estado propio", "Constantes, utilidades, contadores"],
          ],
        ),
        p("**`static` vs `final`**:"),
        items([
          "`static`: pertenece a la **clase**, no a la instancia.",
          "`final`: no puede **reasignarse** (atributo), **sobrescribirse** (método) o **heredarse** (clase).",
          "Se combinan: `public static final double PI = 3.14159;` es una **constante de clase**.",
        ]),
        p("**Riesgos del uso excesivo**:"),
        items([
          "Difícil de testear (estado global).",
          "Rompe encapsulamiento.",
          "Problemas de concurrencia.",
        ]),
      ],
    }),

    ref("5.10", "Ejemplo incorrecto y corregido", "1294–1323", {
      concept: [
        p("**Incorrecto** — atributo público que cualquiera modifica; **Corregido** — estado privado con métodos de negocio que validan:"),
      ],
      codeBlocks: [
        cb("m05-s510-c1", { chapter: 5, section: "5.10", lines: "1298–1303" }, INCORRECTO, "java", {
          title: "Incorrecto",
        }),
        cb("m05-s510-c2", { chapter: 5, section: "5.10", lines: "1307–1322" }, CORREGIDO, "java", {
          title: "Corregido",
        }),
      ],
    }),

    ref("5.11", "Errores comunes", "1325–1331", {
      commonMistakes: [
        items([
          "Crear getters/setters para **todo** sin criterio.",
          "Retornar **referencias mutables internas** en getters (rompe encapsulamiento).",
          "Confundir `static` con \"constante\" (`final` es constante; `static` es de clase).",
          "Usar `finalize()` esperando que se ejecute siempre.",
          "Abusar de estado estático global.",
          "Olvidar validar en el constructor.",
        ]),
      ],
    }),

    ref("5.12", "Preguntas de evaluación", "1334–1349", {
      questions: [
        q("m05-encapsulamiento-s512", 1, { chapter: 5, section: "5.12", lines: "1334–1349" }, "¿Qué es encapsulamiento y qué problema resuelve?"),
        q("m05-encapsulamiento-s512", 2, { chapter: 5, section: "5.12", lines: "1334–1349" }, "Explica la diferencia entre `private`, `protected` y `public`."),
        q("m05-encapsulamiento-s512", 3, { chapter: 5, section: "5.12", lines: "1334–1349" }, "¿Por qué conviene declarar atributos como `private`?"),
        q("m05-encapsulamiento-s512", 4, { chapter: 5, section: "5.12", lines: "1334–1349" }, "¿Qué es una invariante? Da un ejemplo."),
        q("m05-encapsulamiento-s512", 5, { chapter: 5, section: "5.12", lines: "1334–1349" }, "¿Cuándo NO conviene crear un setter?"),
        q("m05-encapsulamiento-s512", 6, { chapter: 5, section: "5.12", lines: "1334–1349" }, "¿Qué diferencia hay entre `static` y `final`?"),
        q("m05-encapsulamiento-s512", 7, { chapter: 5, section: "5.12", lines: "1334–1349" }, "¿Cuándo se ejecuta un bloque `static`?"),
        q("m05-encapsulamiento-s512", 8, { chapter: 5, section: "5.12", lines: "1334–1349" }, "¿Por qué Java no tiene destructores?"),
        q("m05-encapsulamiento-s512", 9, { chapter: 5, section: "5.12", lines: "1334–1349" }, "¿Qué es `try-with-resources`?"),
        q("m05-encapsulamiento-s512", 10, { chapter: 5, section: "5.12", lines: "1334–1349" }, "¿Por qué el estado global es problemático?"),
      ],
      keyPoints: [
        quote(
          "**Encapsulamiento** = ocultar estado + exponer comportamiento controlado + preservar invariantes. Los modificadores de acceso son su herramienta; los métodos con sentido de negocio, su vehículo.",
        ),
      ],
    }),
  ],
};