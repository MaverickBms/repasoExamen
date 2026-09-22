import type { TransversalResource } from "../types";
import { mermaid, p } from "../guia/helpers";

const MAPA_GENERAL = `flowchart TD
    POO[Programación Orientada a Objetos]
    POO --> P1[Abstracción]
    POO --> P2[Encapsulamiento]
    POO --> P3[Herencia]
    POO --> P4[Polimorfismo]

    P1 --> AC[Clases Abstractas]
    P1 --> IF[Interfaces]

    P2 --> MOD[Modificadores de Acceso]
    P2 --> INV[Invariantes]
    P2 --> CONS[Constructores]

    P3 --> EXT[extends / super]
    P3 --> COMP[Composición sobre Herencia]
    P3 --> LSP[Principio de Liskov]

    P4 --> OVL[Overloading]
    P4 --> OVR[Overriding]
    P4 --> DIN[Despacho Dinámico]

    POO --> UML[UML]
    UML --> EST[Diagramas Estructurales]
    UML --> COMP2[Diagramas de Comportamiento]
    EST --> DC[Clases]
    EST --> DO[Objetos]

    UML --> REL[Relaciones]
    REL --> ASOC[Asociación]
    REL --> AGR[Agregación]
    REL --> COMPO[Composición]
    REL --> HER[Herencia]
    REL --> DEP[Dependencia]
    REL --> REAL[Realización]

    POO --> PRIN[Principios de Diseño]
    PRIN --> SOLID[SOLID]
    PRIN --> COH[Cohesión y Acoplamiento]`;

const MAPA_RELACIONES = `flowchart LR
    C[Clase] -->|define| O[Objeto]
    O -->|posee| E[Estado]
    O -->|posee| Com[Comportamiento]
    O -->|posee| I[Identidad]

    Enc[Encapsulamiento] -->|protege| E
    Abs[Abstracción] -->|define| Contrato[Contrato público]
    Abs -->|implementa con| CA[Clases Abstractas]
    Abs -->|implementa con| IF[Interfaces]

    Her[Herencia] -->|especializa| C
    Pol[Polimorfismo] -->|opera sobre| Abs
    Pol -->|usa| OVR[Overriding]
    Pol -->|usa| OVL[Overloading]

    UML[UML] -->|modela| C
    UML -->|modela| Rel[Relaciones]
    Rel --> ASOC[Asociación]
    Rel --> AGR[Agregación]
    Rel --> COMP[Composición]
    Rel --> HER[Herencia]

    Cod[Código Java] -->|implementa| UML
    UML -->|guía| Cod`;

/**
 * Recurso transversal «Mapa conceptual de POO».
 * No es un módulo M11: agrupa el Mapa Conceptual General (l.55–97) y el
 * capítulo 11 — ¿Cómo se relacionan todos los conceptos? (l.2340–2370).
 */
export const MAPA_CONCEPTUAL_POO: TransversalResource = {
  id: "mapa-conceptual-poo",
  kind: "mapa-conceptual",
  title: "Mapa conceptual de POO",
  subtitle:
    "Cómo se relacionan todos los conceptos — Mapa Conceptual General (l.55–97) y capítulo 11 de la guía",
  chapter: 11,
  source: { chapter: 11, section: "11", lines: "2340–2370" },
  mermaid: [
    mermaid(MAPA_GENERAL),
    mermaid(MAPA_RELACIONES),
  ],
  lectura: [
    p(
      "**Lectura (guía, cap. 11)**: Una **clase** define **objetos**; los objetos tienen **estado, comportamiento e identidad**. El **encapsulamiento** protege el estado; la **abstracción** define qué ve el consumidor; la **herencia** permite especializar; el **polimorfismo** explota la abstracción. **UML** modela todo esto; el **código** lo implementa.",
    ),
  ],
  terms: [],
};