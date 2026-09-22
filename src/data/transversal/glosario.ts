import type { TransversalResource } from "../types";

/**
 * Recurso transversal «Glosario» (capítulo 14 de la guía).
 * 29 términos reales contados en la fuente (l.2685–2716); la guía los lista
 * como viñetas — no 30. Definiciones verbatim, sin ampliaciones externas.
 */
export const GLOSARIO: TransversalResource = {
  id: "glosario",
  kind: "glosario",
  title: "Glosario",
  subtitle: "Los términos fundamentales de POO — capítulo 14 de la guía",
  chapter: 14,
  source: { chapter: 14, section: "14", lines: "2685–2716" },
  mermaid: [],
  lectura: [],
  terms: [
    { term: "Abstracción", definition: "modelar lo esencial, ignorar lo accesorio." },
    { term: "Acoplamiento", definition: "grado de dependencia entre módulos." },
    { term: "Agregación", definition: "relación todo-parte débil (rombo vacío)." },
    { term: "Asociación", definition: "vínculo estructural entre clases." },
    { term: "Atributo", definition: "variable que forma parte del estado de un objeto." },
    { term: "Clase", definition: "plantilla que describe atributos y métodos." },
    { term: "Clase abstracta", definition: "clase no instanciable; puede tener métodos abstractos y concretos." },
    { term: "Cohesión", definition: "grado en que los elementos de un módulo están relacionados." },
    { term: "Composición", definition: "relación todo-parte fuerte (rombo relleno); ciclo de vida ligado." },
    { term: "Constructor", definition: "método especial que inicializa una instancia." },
    { term: "Despacho dinámico", definition: "selección del método a ejecutar basada en el tipo real del objeto." },
    { term: "Encapsulamiento", definition: "ocultar el estado interno y exponer interfaz controlada." },
    { term: "Herencia", definition: "mecanismo por el cual una subclase reutiliza y especializa." },
    { term: "Identidad", definition: "propiedad única e irrepetible de un objeto." },
    { term: "Instancia", definition: "objeto creado a partir de una clase." },
    { term: "Interfaz", definition: "contrato que define métodos sin implementación (o con `default`)." },
    { term: "Invariante", definition: "condición que siempre debe cumplirse en un objeto válido." },
    { term: "LSP (Liskov Substitution Principle)", definition: "los subtipos deben poder sustituir a sus supertipos." },
    { term: "Mensaje", definition: "invocación de un método sobre un objeto." },
    { term: "Método", definition: "operación que define el comportamiento." },
    { term: "Objeto", definition: "instancia con estado, comportamiento e identidad." },
    { term: "OCP (Open/Closed Principle)", definition: "abierta a extensión, cerrada a modificación." },
    { term: "Overloading (sobrecarga)", definition: "varios métodos con mismo nombre y distinta firma." },
    { term: "Overriding (sobrescritura)", definition: "redefinición de un método heredado." },
    { term: "Polimorfismo", definition: "misma interfaz, distintos comportamientos." },
    { term: "Referencia", definition: "variable que apunta a un objeto en memoria." },
    { term: "SRP (Single Responsibility Principle)", definition: "una clase, una razón para cambiar." },
    { term: "UML", definition: "Unified Modeling Language, lenguaje de modelado." },
    { term: "Visibilidad", definition: "modificadores de acceso (`public`, `private`, `protected`, paquete)." },
  ],
};