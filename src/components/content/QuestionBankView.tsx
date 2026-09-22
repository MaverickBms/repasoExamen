import type { QuestionBank } from "../../data/types";
import { Badge } from "../common/Badge";
import { SourceRefView } from "./SourceRef";

const LEVEL_NAMES: Record<number, string> = {
  1: "Conceptual",
  2: "Comprensión",
  3: "Análisis",
  4: "Código",
  5: "UML",
};

/** Lectura/revisión del banco de 90 preguntas (cap. 12). Sin lógica de evaluación. */
export function QuestionBankView({ bank }: { bank: QuestionBank }) {
  return (
    <div className="stack stack-lg">
      <div className="notice">
        La guía (capítulo 12) presenta estas 90 preguntas sin opciones ni respuestas.
        Todas se registran como preguntas reflexivas sin respuesta disponible en la fuente.
      </div>
      {bank.groups.map((g) => (
        <section key={g.level} className="sec-group">
          <h4 className="sec-group-title">
            {g.title} <Badge tone="accent" size="xs">{g.questions.length} reales</Badge>
          </h4>
          <ol className="q-list">
            {g.questions.map((qq) => (
              <li key={qq.id} className="q-item bank-item">
                <p>{qq.prompt}</p>
                <div className="row" style={{ gap: "var(--sp-2)", flexWrap: "wrap" }}>
                  <Badge tone="gold" size="xs">Nivel {qq.level} · {qq.level ? LEVEL_NAMES[qq.level] : ""}</Badge>
                  <Badge tone="neutral" size="xs">{qq.id}</Badge>
                  <Badge tone="warning" size="xs">Sin respuesta en la fuente</Badge>
                  <SourceRefView ref={qq.source} label="Fuente" className="sr-inline" />
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}