/**
 * SimulacroRunner — examen interactivo (cap. 13, FASE 4/5).
 *
 * Evaluable automáticamente SOLO cuando el solucionario da una clave:
 * Parte I (selección) y Parte II (V/F). Partes III–V muestran la solución
 * modelo de la guía tras entregar, sin calificar para no inventar criterios.
 */
import { useEffect, useRef, useState } from "react";
import type { Simulacro, SimulacroQuestion } from "../../data/types";
import { useProgress } from "../../state/progress";
import { useToast } from "../common/Toast";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { ContentView } from "../content/ContentView";
import { Diagram } from "../content/Diagram";
import { optionLetter } from "../exercises/ExercisePlayer";

type Answer =
  | { kind: "opt"; idx: number }
  | { kind: "tf"; val: boolean }
  | { kind: "open"; text: string };

function isAuto(q: SimulacroQuestion): boolean {
  return q.part === "I" || q.part === "II";
}

function isCorrect(q: SimulacroQuestion, a?: Answer): boolean | null {
  if (!a) return null;
  if (q.part === "I" && a.kind === "opt") {
    const m = /^([a-d])\)/.exec(q.answer ?? "");
    return m ? m[1].charCodeAt(0) - 97 === a.idx : null;
  }
  if (q.part === "II" && a.kind === "tf") {
    const ans = (q.answer ?? "").toLowerCase();
    return (a.val && ans.startsWith("v")) || (!a.val && ans.startsWith("f")) ? true : false;
  }
  return null;
}

function PartTag({ part }: { part: string }) {
  return <Badge tone="gold" size="xs">Parte {part}</Badge>;
}

export function SimulacroRunner({ simulacro }: { simulacro: Simulacro }) {
  const { recordSimulacro } = useProgress();
  const { showToast } = useToast();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number>(Date.now());
  const answeredRef = useRef<{ autoCorrect: number }>({ autoCorrect: 0 });

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, [submitted]);

  const setAnswer = (id: string, a: Answer) => setAnswers((prev) => ({ ...prev, [id]: a }));

  const all = simulacro.parts.flatMap((p) => p.questions);
  const autoQuestions = all.filter((q) => isAuto(q));
  const autoAnswered = autoQuestions.filter((q) => answers[q.id]);
  const responded = all.filter((q) => answers[q.id]).length;

  const submit = () => {
    let autoCorrect = 0;
    for (const q of autoQuestions) {
      if (isCorrect(q, answers[q.id]) === true) autoCorrect += 1;
    }
    answeredRef.current.autoCorrect = autoCorrect;
    setSubmitted(true);
    const { awarded } = recordSimulacro(responded, all.length, autoCorrect, autoQuestions.length);
    showToast({
      tone: "gold",
      title: "Simulacro entregado",
      message: `+${40 + autoCorrect * 5} XP · ${autoCorrect}/${autoQuestions.length} en las partes evaluables (I–II).`,
    });
    awarded.forEach((b) =>
      showToast({ tone: "gold", title: `Insignia desbloqueada: ${b.title}`, message: b.description }),
    );
  };

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="stack stack-lg">
      <div className="notice">
        {simulacro.instructions}
        <div className="row" style={{ gap: "var(--sp-3)", marginTop: "var(--sp-2)", flexWrap: "wrap" }}>
          <Badge tone="accent" size="xs">Tiempo: {mm}:{ss}</Badge>
          <Badge tone="neutral" size="xs">Respondidas: {responded}/{all.length}</Badge>
          <Badge tone="gold" size="xs">Duración sugerida: 90 min</Badge>
        </div>
      </div>

      {simulacro.parts.map((p) => (
        <section key={p.id} className="sec-group">
          <h4 className="sec-group-title">{p.title}</h4>
          <ol className="q-list">
            {p.questions.map((q, i) => {
              const a = answers[q.id];
              const correct = submitted ? isCorrect(q, a) : null;
              return (
                <li key={q.id} className="q-item sim-item">
                  <div className="row" style={{ gap: "var(--sp-2)", flexWrap: "wrap", marginBottom: "var(--sp-2)" }}>
                    <Badge tone="neutral" size="xs">{p.id}-{i + 1}</Badge>
                    <PartTag part={q.part} />
                    {isAuto(q) && (
                      (correct === null || correct === undefined) ? (
                        <Badge tone="warning" size="xs">Pendiente</Badge>
                      ) : correct ? (
                        <Badge tone="success" size="xs">Correcto</Badge>
                      ) : (
                        <Badge tone="danger" size="xs">Revisar (A)</Badge>
                      )
                    )}
                  </div>
                  {q.attachment && <ContentView blocks={[q.attachment!]} />}
                  <p className="sim-prompt">{q.prompt}</p>

                  {q.part === "I" && q.options && (
                    <div className="mc-options align-none" role="group" aria-label={`Opciones de la pregunta ${i + 1}`}>
                      {q.options.map((o, idx) => {
                        const isSel = a?.kind === "opt" && a.idx === idx;
                        const showCorrect = submitted && correct === true && isSel;
                        const showWrong = submitted && correct === false && isSel;
                        return (
                          <button
                            type="button"
                            key={idx}
                            className={`opt-btn${isSel ? " is-selected" : ""}${showCorrect ? " is-correct" : ""}${showWrong ? " is-wrong" : ""}`}
                            onClick={() => !submitted && setAnswer(q.id, { kind: "opt", idx })}
                            disabled={submitted}
                            aria-pressed={isSel}
                          >
                            <span className="opt-letter">{optionLetter(idx)})</span>
                            <span>{o}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.part === "II" && (
                    <div className="mc-options align-none" role="group" aria-label={`Verdadero o Falso de la pregunta ${i + 1}`}>
                      {[true, false].map((v) => {
                        const isSel = a?.kind === "tf" && a.val === v;
                        const ok = submitted && correct === true && isSel;
                        const bad = submitted && correct === false && isSel;
                        return (
                          <button
                            type="button"
                            key={String(v)}
                            className={`opt-btn${isSel ? " is-selected" : ""}${ok ? " is-correct" : ""}${bad ? " is-wrong" : ""}`}
                            onClick={() => !submitted && setAnswer(q.id, { kind: "tf", val: v })}
                            disabled={submitted}
                            aria-pressed={isSel}
                          >
                            <span className="opt-letter">{v ? "V" : "F"}</span>
                            <span>{v ? "Verdadero" : "Falso"}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {(q.part === "III" || q.part === "IV" || q.part === "V") && (
                    <div style={{ marginTop: "var(--sp-2)" }}>
                      <label className="field-label" htmlFor={`sim-${q.id}`}>
                        {q.part === "IV" ? "Su solución (código o diagrama)" : "Su respuesta"}
                      </label>
                      <textarea
                        id={`sim-${q.id}`}
                        className="ta-input"
                        rows={4}
                        value={a?.kind === "open" ? a.text : ""}
                        onChange={(e) => !submitted && setAnswer(q.id, { kind: "open", text: e.target.value })}
                        disabled={submitted}
                        placeholder="Escriba aquí su respuesta…"
                      />
                    </div>
                  )}

                  {submitted && (q.answer || q.answerExplanation || q.answerAttachment) && (
                    <details className="details-box sim-solution" open={correct === false}>
                      <summary>Solución del solucionario</summary>
                      <div className="stack" style={{ gap: "var(--sp-2)" }}>
                        {q.answer && <p className="sim-answer">{q.answer}</p>}
                        {q.answerExplanation && <p className="sim-expl">{q.answerExplanation}</p>}
                        {q.answerAttachment && <ContentView blocks={[q.answerAttachment!]} />}
                      </div>
                    </details>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      {!submitted ? (
        <div className="row" style={{ gap: "var(--sp-3)" }}>
          <Button variant="primary" onClick={submit} disabled={responded === 0}>
            Entregar simulacro
          </Button>
          <Button variant="ghost" onClick={() => { setAnswers({}); setElapsed(0); startRef.current = Date.now(); }}>
            Reiniciar respuestas
          </Button>
        </div>
      ) : (
        <div className="notice">
          <strong>Resultado:</strong> {answeredRef.current.autoCorrect}/{autoQuestions.length} correctas en las partes
          evaluables (I–II) · {responded}/{all.length} respondidas de 30. Las partes III a V no tienen clave de
          corrección automática en la guía: revise cada solución modelo arriba.
        </div>
      )}
    </div>
  );
}