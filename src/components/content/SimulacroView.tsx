import type { Simulacro, SimulacroQuestion } from "../../data/types";
import { Badge } from "../common/Badge";
import { ContentView } from "./ContentView";
import { SourceRefView } from "./SourceRef";

function Solution({ q }: { q: SimulacroQuestion }) {
  const hasAttachment = !!q.answerAttachment;
  const hasText = (q.answer && q.answer.length > 0) || !!q.answerExplanation;
  if (!hasAttachment && !hasText) return null;
  return (
    <details className="details-box sim-solution">
      <summary>
        Solución del solucionario
        {q.answerSource && (
          <SourceRefView ref={q.answerSource} label="Solucionario" className="sr-inline match-sr" />
        )}
      </summary>
      <div className="stack" style={{ gap: "var(--sp-2)" }}>
        {q.answer && <p className="sim-answer">{q.answer}</p>}
        {q.answerExplanation && <p className="sim-expl">{q.answerExplanation}</p>}
        {hasAttachment && <ContentView blocks={[q.answerAttachment!]} />}
      </div>
    </details>
  );
}

/** Lectura/revisión del simulacro (cap. 13) + su solucionario. Sin lógica de evaluación. */
export function SimulacroView({ simulacro }: { simulacro: Simulacro }) {
  return (
    <div className="stack stack-lg">
      <div className="notice">
        Instrucciones de la guía: <strong>{simulacro.instructions}</strong>
      </div>
      {simulacro.parts.map((p) => (
        <section key={p.id} className="sec-group">
          <h4 className="sec-group-title">
            {p.title} <Badge tone="accent" size="xs">{p.questions.length} reales</Badge>
          </h4>
          <ol className="q-list">
            {p.questions.map((q) => (
              <li key={q.id} className="q-item sim-item">
                {q.attachment && <ContentView blocks={[q.attachment!]} />}
                <p className="sim-prompt">{q.prompt}</p>
                {q.options && (
                  <ol className="mc-options">
                    {q.options.map((o, i) => (
                      <li key={i} style={{ display: "flex", gap: "var(--sp-2)" }}>
                        <span className="opt-letter">{String.fromCharCode(97 + i)})</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ol>
                )}
                <div className="row" style={{ gap: "var(--sp-2)", flexWrap: "wrap" }}>
                  <Badge tone="gold" size="xs">Parte {q.part}</Badge>
                  <Badge tone="neutral" size="xs">{q.id}</Badge>
                  <SourceRefView ref={q.source} label="Fuente" className="sr-inline" />
                </div>
                <Solution q={q} />
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}