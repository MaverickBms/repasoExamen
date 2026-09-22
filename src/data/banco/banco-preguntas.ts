/**
 * Capítulo 12 — Banco de Preguntas (Documentation/guiaPOO.md, l.2374–2482).
 * 90 preguntas REALES repartidas en 5 niveles (20/20/20/15/15).
 *
 * La guía NO provee opciones ni respuestas para este capítulo: cada pregunta
 * queda reflexiva (open). Ningún contenido inventado (regla I).
 */
import type { BankGroup, Question, QuestionBank, QuestionLevel } from "../types";

let seq = 0;
const q = (level: QuestionLevel, line: number, prompt: string): Question => {
  seq += 1;
  const id = "banco-c12-q" + String(seq).padStart(2, "0");
  return {
    id,
    level,
    prompt,
    origin: "guia",
    source: { chapter: 12, section: "12", lines: String(line) },
  };
};

const group = (level: QuestionLevel, title: string, count: number, questions: Question[]): BankGroup => ({
  level,
  title,
  count,
  questions,
});

export const QUESTION_BANK: QuestionBank = {
  id: "banco-preguntas",
  title: "Banco de preguntas",
  subtitle: "90 preguntas reales del capítulo 12, agrupadas por nivel de dominio.",
  chapter: 12,
  source: { chapter: 12, section: "12", lines: "2374–2482" },
  total: 90,
  groups: [
    group(
      1,
      "Nivel 1 — Conceptual (20)",
      20,
      [
        q(1, 2378, "¿Qué es la POO?"),
        q(1, 2379, "¿Qué es un objeto?"),
        q(1, 2380, "¿Qué es una clase?"),
        q(1, 2381, "¿Qué es un atributo?"),
        q(1, 2382, "¿Qué es un método?"),
        q(1, 2383, "¿Qué es la herencia?"),
        q(1, 2384, "¿Qué es el polimorfismo?"),
        q(1, 2385, "¿Qué es el encapsulamiento?"),
        q(1, 2386, "¿Qué es la abstracción?"),
        q(1, 2387, "¿Qué es una interfaz?"),
        q(1, 2388, "¿Qué es una clase abstracta?"),
        q(1, 2389, "¿Qué es un constructor?"),
        q(1, 2390, "¿Qué es `static`?"),
        q(1, 2391, "¿Qué es UML?"),
        q(1, 2392, "¿Qué es una asociación en UML?"),
        q(1, 2393, "¿Qué es una agregación?"),
        q(1, 2394, "¿Qué es una composición?"),
        q(1, 2395, "¿Qué es la sobrecarga (overloading)?"),
        q(1, 2396, "¿Qué es la sobrescritura (overriding)?"),
        q(1, 2397, "¿Qué es la identidad de un objeto?"),
      ],
    ),
    group(
      2,
      "Nivel 2 — Comprensión (20)",
      20,
      [
        q(2, 2401, "Explica con tus palabras por qué existen las interfaces."),
        q(2, 2402, "¿Por qué los atributos deben ser `private`?"),
        q(2, 2403, "¿Por qué Java no tiene destructores?"),
        q(2, 2404, "¿Por qué conviene favorecer composición sobre herencia?"),
        q(2, 2405, "Explica la diferencia entre overloading y overriding con un ejemplo."),
        q(2, 2406, "¿Por qué una clase abstracta puede tener constructor?"),
        q(2, 2407, "¿Por qué existen los métodos `default` en interfaces (Java 8+)?"),
        q(2, 2408, "Explica el principio de Liskov con un ejemplo."),
        q(2, 2409, "¿Por qué el despacho dinámico es clave en polimorfismo?"),
        q(2, 2410, "¿Por qué UML es importante antes de codificar?"),
        q(2, 2411, "Explica el “Fragile Base Class Problem”."),
        q(2, 2412, "¿Cuándo conviene una interfaz sobre una clase abstracta?"),
        q(2, 2413, "¿Cuándo conviene una clase abstracta sobre una interfaz?"),
        q(2, 2414, "Explica la diferencia entre agregación y composición."),
        q(2, 2415, "¿Cómo afecta el uso excesivo de `static` al testing?"),
        q(2, 2416, "¿Por qué se dice que la POO modela el dominio?"),
        q(2, 2417, "¿Cómo interactúan abstracción y polimorfismo?"),
        q(2, 2418, "Explica la diferencia entre asociación y dependencia."),
        q(2, 2419, "¿Qué significa que un objeto encapsula su estado?"),
        q(2, 2420, "¿Cómo se relaciona UML con el código?"),
      ],
    ),
    group(
      3,
      "Nivel 3 — Análisis (20)",
      20,
      [
        q(3, 2424, "Analiza un sistema real (biblioteca) y propón 5 clases con responsabilidades."),
        q(3, 2425, "Dado un problema de modelado, decide si usar herencia o composición. Justifica."),
        q(3, 2426, "Analiza cuándo la POO puede ser contraproducente."),
        q(3, 2427, "Dado un diagrama UML, identifica violaciones a LSP."),
        q(3, 2428, "Analiza por qué un getter puede romper el encapsulamiento."),
        q(3, 2429, "Analiza cuándo conviene una jerarquía profunda vs plana."),
        q(3, 2430, "Propón un caso donde el polimorfismo se resuelve mejor con una interfaz."),
        q(3, 2431, "Justifica por qué una clase anémica es un anti-patrón."),
        q(3, 2432, "Analiza la cohesión y acoplamiento de dos diseños alternativos."),
        q(3, 2433, "Dado un sistema de pagos, propón las abstracciones clave."),
        q(3, 2434, "Evalúa: ¿es correcto usar `extends` solo para reutilizar código?"),
        q(3, 2435, "Analiza el impacto del uso excesivo de herencia múltiple."),
        q(3, 2436, "¿Cómo afecta la inmutabilidad al diseño?"),
        q(3, 2437, "¿Qué problemas surgen al exponer referencias mutables?"),
        q(3, 2438, "Compara dos formas de implementar polimorfismo (herencia vs delegación)."),
        q(3, 2439, "Analiza cómo el uso de interfaces reduce acoplamiento."),
        q(3, 2440, "Dado un diagrama, identifica relaciones mal marcadas."),
        q(3, 2441, "Justifica por qué un método `static` no puede ser polimórfico."),
        q(3, 2442, "¿Cuándo un constructor privado es apropiado?"),
        q(3, 2443, "Analiza por qué los métodos `default` en interfaces pueden ser peligrosos."),
      ],
    ),
    group(
      4,
      "Nivel 4 — Código (15)",
      15,
      [
        q(4, 2447, "Escribe una clase `Círculo` con encapsulamiento completo."),
        q(4, 2448, "Implementa una jerarquía `Animal → Perro, Gato` con polimorfismo."),
        q(4, 2449, "Corrige un código que usa `public` en atributos y accesos directos."),
        q(4, 2450, "Implementa una interfaz `Comparable` para una clase `Estudiante`."),
        q(4, 2451, "Escribe dos constructores sobrecargados y explica."),
        q(4, 2452, "Implementa una composición `Motor` dentro de `Automovil`."),
        q(4, 2453, "Escribe un ejemplo de overriding con `@Override`."),
        q(4, 2454, "Escribe un ejemplo de overloading con tipos distintos."),
        q(4, 2455, "Implementa un método `static` de utilidad."),
        q(4, 2456, "Corrige un código que viola LSP."),
        q(4, 2457, "Implementa un patrón de delegación (composición) para reutilizar comportamiento."),
        q(4, 2458, "Diseña una clase inmutable `Persona`."),
        q(4, 2459, "Escribe código que use `try-with-resources`."),
        q(4, 2460, "Implementa una clase que herede e implemente una interfaz."),
        q(4, 2461, "Dado un problema, decide entre clase abstracta e interfaz y escribe el código."),
      ],
    ),
    group(
      5,
      "Nivel 5 — UML (15)",
      15,
      [
        q(5, 2465, "Dibuja el diagrama de clases de `Cuenta` y `Cliente`."),
        q(5, 2466, "Modela la relación `Universidad — Departamento — Profesor`."),
        q(5, 2467, "Modela una composición `Casa — Habitación`."),
        q(5, 2468, "Modela una agregación `Equipo — Jugador`."),
        q(5, 2469, "Representa una herencia `Forma — Círculo, Cuadrado`."),
        q(5, 2470, "Modela una interfaz `Pago` con implementaciones `Tarjeta`, `Efectivo`."),
        q(5, 2471, "Representa la relación de dependencia `Servicio → Repositorio`."),
        q(5, 2472, "Modela un diagrama de secuencia para una compra."),
        q(5, 2473, "Modela un diagrama de estados para un `Pedido`."),
        q(5, 2474, "Modela un diagrama de casos de uso para un cajero."),
        q(5, 2475, "Convierte un diagrama dado a código Java."),
        q(5, 2476, "Convierte código Java a un diagrama."),
        q(5, 2477, "Identifica cardinalidades en un diagrama dado."),
        q(5, 2478, "Distingue relaciones mal marcadas."),
        q(5, 2479, "Modela un sistema académico completo."),
      ],
    ),
  ],
};