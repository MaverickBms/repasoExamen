/**
 * Capítulo 13 — Simulacro de Evaluación + Solucionario
 * (Documentation/guiaPOO.md, l.2483–2681).
 * 30 preguntas reales (Partes I–V) con su solucionario completo.
 * Respuestas y explicaciones ÚNICAMENTE cuando el solucionario las provee;
 * el resto se registra como ausencia (regla I).
 */
import type { ContentBlock, Simulacro, SimulacroPart, SimulacroQuestion, SimPart, SourceRef } from "../types";

const ref = (lines: string, note?: string): SourceRef => ({ chapter: 13, section: "13", lines, note });

const asrc = ref;

const code = (code: string, source?: SourceRef): ContentBlock => ({ kind: "code", code, source });
const mermaid = (m: string, source?: SourceRef): ContentBlock => ({ kind: "mermaid", mermaid: m, source });

let seq = 0;
const qn = (part: SimPart, prompt: string, line: number): SimulacroQuestion => {
  seq += 1;
  return {
    id: "sim-q" + String(seq).padStart(2, "0"),
    part,
    prompt,
    source: ref(String(line)),
  };
};

const part = (id: string, title: string, count: number, questions: SimulacroQuestion[]): SimulacroPart => ({
  id,
  title,
  count,
  questions,
});

export const SIMULACRO: Simulacro = {
  id: "simulacro",
  title: "Simulacro de evaluación",
  subtitle: "30 preguntas del capítulo 13 con su solucionario completo (1:1 con la guía).",
  chapter: 13,
  source: ref("2483–2681"),
  instructions: "responda todas las preguntas. Tiempo sugerido: 90 minutos.",
  solucionarioSource: ref("2599–2681"),
  parts: [
    part(
      "sim-part-I",
      "Parte I — Selección Múltiple (10)",
      10,
      [
        {
          ...qn("I", "¿Cuál NO es un pilar de la POO?", 2489),
          options: ["Abstracción", "Encapsulamiento", "Compilación", "Polimorfismo"],
          answer: "c) Compilación",
          answerSource: asrc("2604"),
        },
        {
          ...qn("I", "La sobrecarga (overloading) se resuelve en:", 2492),
          options: ["Runtime", "Compilación", "Ejecución diferida", "Ninguna"],
          answer: "b) Compilación",
          answerSource: asrc("2605"),
        },
        {
          ...qn("I", "¿Qué modificador expone un atributo solo a la jerarquía y al paquete?", 2495),
          options: ["public", "private", "protected", "default"],
          answer: "c) protected",
          answerSource: asrc("2606"),
        },
        {
          ...qn("I", "¿Cuál relación UML implica ciclo de vida ligado?", 2498),
          options: ["Asociación", "Agregación", "Composición", "Dependencia"],
          answer: "c) Composición",
          answerSource: asrc("2607"),
        },
        {
          ...qn("I", "¿Qué palabra reservada invoca al constructor del padre?", 2501),
          options: ["this", "parent", "super", "base"],
          answer: "c) super",
          answerSource: asrc("2608"),
        },
        {
          ...qn("I", "Un método `static`:", 2504),
          options: ["Puede sobrescribirse", "No puede acceder a `this`", "Es polimórfico", "Requiere instancia"],
          answer: "b) No puede acceder a `this`",
          answerSource: asrc("2609"),
        },
        {
          ...qn("I", "¿Qué principio establece que las subclases deben poder sustituir a la superclase?", 2508),
          options: ["DRY", "LSP", "SRP", "KISS"],
          answer: "b) LSP",
          answerSource: asrc("2610"),
        },
        {
          ...qn("I", "Un método `default` en una interfaz:", 2511),
          options: ["Es abstracto", "Tiene implementación", "Es privado", "No existe en Java"],
          answer: "b) Tiene implementación",
          answerSource: asrc("2611"),
        },
        {
          ...qn("I", "¿Cuál es la unidad básica de la POO?", 2515),
          options: ["Función", "Procedimiento", "Objeto", "Variable"],
          answer: "c) Objeto",
          answerSource: asrc("2612"),
        },
        {
          ...qn("I", "¿Qué representa un rombo relleno en UML?", 2518),
          options: ["Agregación", "Composición", "Herencia", "Dependencia"],
          answer: "b) Composición",
          answerSource: asrc("2613"),
        },
      ],
    ),
    part(
      "sim-part-II",
      "Parte II — Verdadero/Falso justificado (5)",
      5,
      [
        {
          ...qn("II", "En Java, dos objetos con el mismo estado son idénticos.", 2523),
          answer: "Falso",
          answerExplanation: "La identidad es distinta aunque el estado coincida.",
          answerSource: asrc("2616"),
        },
        {
          ...qn("II", "Las interfaces pueden tener atributos mutables.", 2524),
          answer: "Falso",
          answerExplanation: "Sólo constantes (`public static final`).",
          answerSource: asrc("2617"),
        },
        {
          ...qn("II", "Una clase abstracta puede no tener métodos abstractos.", 2525),
          answer: "Verdadero",
          answerExplanation: "Puede existir sólo para bloquear instanciación o compartir código.",
          answerSource: asrc("2618"),
        },
        {
          ...qn("II", "`@Override` es obligatorio para sobrescribir.", 2526),
          answer: "Falso",
          answerExplanation: "Es recomendable pero no obligatorio.",
          answerSource: asrc("2619"),
        },
        {
          ...qn("II", "Un constructor privado impide instanciar la clase directamente.", 2527),
          answer: "Verdadero",
          answerExplanation: "Es el patrón Singleton, entre otros.",
          answerSource: asrc("2620"),
        },
      ],
    ),
    part(
      "sim-part-III",
      "Parte III — Análisis de Código (5)",
      5,
      [
        {
          ...qn("III", "¿Qué problema de diseño identificas?", 2540),
          attachment: code("public class A {\n    public int x;\n}\npublic class B extends A {\n    public void setX(int v) { x = v; }\n}", ref("2531–2538")),
          answer: "Violación de encapsulamiento",
          answerExplanation: "`x` es público y modificable desde cualquier parte; `B` no controla la mutación.",
          answerSource: asrc("2623"),
        },
        {
          ...qn("III", "¿Se está usando polimorfismo? Justifica.", 2550),
          attachment: code(
            "public class Figura { public double area() { return 0; } }\npublic class Circulo extends Figura {\n    private double r;\n    @Override public double area() { return Math.PI * r * r; }\n}",
            ref("2542–2548"),
          ),
          answer: "Sí",
          answerExplanation: "`Circulo` sobrescribe `area()`; si se usa `Figura f = new Circulo()` y `f.area()`, hay despacho dinámico.",
          answerSource: asrc("2624"),
        },
        {
          ...qn("III", "¿Por qué el siguiente código viola encapsulamiento?", 2552),
          attachment: code(
            "public class Cuenta {\n    private List<String> movimientos = new ArrayList<>();\n    public List<String> getMovimientos() { return movimientos; }\n}",
            ref("2553–2558"),
          ),

          answerExplanation: "El getter retorna la referencia mutable, permitiendo modificaciones externas que evaden la clase. Debe devolverse copia o vista inmutable.",
          answerSource: asrc("2625"),
        },
        {
          ...qn("III", "¿Qué error tiene este código?", 2560),
          attachment: code(
            "public class Cuenta {\n    private double saldo;\n    public void setSaldo(double s) { saldo = s; }\n}",
            ref("2561–2566"),
          ),

          answerExplanation: "No hay validación ni reglas de negocio. Además, la existencia de `setSaldo` permite cualquier mutación sin control.",
          answerSource: asrc("2626"),
        },
        {
          ...qn("III", "¿Qué hace el despacho dinámico aquí?", 2568),
          attachment: code("A a = new B();\na.metodo();", ref("2569–2572")),

          answerExplanation: "Se invoca la implementación de `metodo()` de `B`, no de `A`, porque el objeto real es `B`.",
          answerSource: asrc("2627"),
        },
      ],
    ),
    part(
      "sim-part-IV",
      "Parte IV — UML (5)",
      5,
      [
        {
          ...qn("IV", "Dibuja un diagrama con `Autor 1 — * Libro` (asociación).", 2576),

          answerAttachment: mermaid("classDiagram\n    Autor \"1\" --> \"*\" Libro : escribe", ref("2631–2634")),
          answerSource: asrc("2630"),
        },
        {
          ...qn("IV", "Modela `Motor` como composición de `Automovil`.", 2577),

          answerAttachment: mermaid("classDiagram\n    Automovil *-- Motor", ref("2636–2639")),
          answerSource: asrc("2635"),
        },
        {
          ...qn("IV", "Modela una interfaz `Notificable` implementada por `Email` y `SMS`.", 2578),

          answerAttachment: mermaid(
            "classDiagram\n    class Notificable {\n        <<interface>>\n        +enviar(String) void\n    }\n    class Email\n    class SMS\n    Notificable <|.. Email\n    Notificable <|.. SMS",
            ref("2641–2651"),
          ),
          answerSource: asrc("2640"),
        },
        {
          ...qn("IV", "Representa la herencia `Empleado ← Gerente, Vendedor`.", 2579),

          answerAttachment: mermaid("classDiagram\n    Empleado <|-- Gerente\n    Empleado <|-- Vendedor", ref("2653–2657")),
          answerSource: asrc("2652"),
        },
        {
          ...qn("IV", "Convierte el siguiente diagrama a código:", 2580),
          attachment: mermaid(
            "classDiagram\n    class Cuenta {\n        -String titular\n        -double saldo\n        +depositar(double) void\n    }",
            ref("2582–2589"),
          ),

          answerAttachment: code(
            `public class Cuenta {
    private final String titular;
    private double saldo;

    public Cuenta(String titular) { this.titular = titular; }

    public void depositar(double monto) {
        if (monto <= 0) throw new IllegalArgumentException();
        saldo += monto;
    }

    public String getTitular() { return titular; }
    public double getSaldo() { return saldo; }
}`,
            ref("2659–2674"),
          ),
          answerSource: asrc("2658"),
        },
      ],
    ),
    part(
      "sim-part-V",
      "Parte V — Preguntas Abiertas (5)",
      5,
      [
        {
          ...qn("V", "Explica con detalle la diferencia entre clase abstracta e interfaz. Da un ejemplo donde cada una sea la elección correcta.", 2593),
          answer: "Clase abstracta → estado compartido + contrato parcial (ej. `Empleado`); interfaz → capacidad pura (ej. `Comparable`). Se elige clase abstracta cuando hay estado común que reutilizar; interfaz cuando se define una capacidad que múltiples clases no relacionadas pueden ofrecer.",
          answerSource: asrc("2677"),
        },
        {
          ...qn("V", "Analiza: ¿por qué favorecer composición sobre herencia? Ilustra con un ejemplo.", 2594),
          answer: "Composición evita acoplamiento, favorece LSP y desacopla jerarquías (ej. `Automovil` tiene `Motor`). Ejemplo concreto: `Stack<T>` que **tiene** un `List<T>` en lugar de **extender** `ArrayList`.",
          answerSource: asrc("2678"),
        },
        {
          ...qn("V", "Explica el polimorfismo con un ejemplo de código que muestre despacho dinámico.", 2595),
          answer: "Ejemplo: `Animal a = new Perro(); a.sonido();` → se ejecuta `Perro.sonido()` porque el objeto real es `Perro`, aunque la referencia sea `Animal`.",
          answerSource: asrc("2679"),
        },
        {
          ...qn("V", "Describe un sistema real y modela 4 clases con sus relaciones UML.", 2596),
          answer: "Depende del sistema; debe incluir clases, atributos, métodos y relaciones correctas.",
          answerSource: asrc("2680"),
        },
        {
          ...qn("V", "¿Cómo se relacionan los cuatro pilares de la POO? Explica sus interacciones.", 2597),
          answer: "Abstracción define el contrato, encapsulamiento lo protege, herencia lo especializa, polimorfismo lo explota.",
          answerSource: asrc("2681"),
        },
      ],
    ),
  ],
};