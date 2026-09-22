/**
 * Práctica interactiva del banco (cap. 12).
 * El capítulo 12 NO da respuestas: cada sesión propone 5 preguntas reflexivas.
 * Correcto pedagógicamente: se registra la reflexión y se suma XP, sin inventar
 * claves de corrección.
 */
import { useState } from "react";
import type { Question, QuestionBank } from "../../data/types";
import { useProgress } from "../../state/progress";
import { useToast } from "../common/Toast";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { SourceRefView } from "../content/SourceRef";

const SESSION_SIZE = 5;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function BankPractice({ bank }: { bank: QuestionBank }) {
  const { recordBankReflections } = useProgress();
  const { showToast } = useToast();
  const [[pool], setPool] = useState<[Question[]]>(() => [
    shuffle(bank.groups.flatMap((g) => g.questions)).slice(0, SESSION_SIZE),
  ]);
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);

  const q = pool[idx];

  const next = () => {
    setReflections((prev) => ({ ...prev, [q.id]: text }));
    setText("");
    if (idx + 1 >= pool.length) {
      setFinished(true);
      const { awarded } = recordBankReflections(pool.length);
      showToast({ tone: "gold", title: "+40 XP", message: "Sesión de práctica del banco completada." });
      awarded.forEach((b) =>
        showToast({ tone: "gold", title: `Insignia desbloqueada: ${b.title}`, message: b.description }),
      );
    } else {
      setIdx(idx + 1);
    }
  };

  const reset = () => {
    setPool([shuffle(bank.groups.flatMap((g) => g.questions)).slice(0, SESSION_SIZE)]);
    setIdx(0);
    setText("");
    setReflections({});
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="stack" style={{ gap: "var(--sp-3)" }}>
        <div className="notice">
          <strong>Sesión completada.</strong> Revisaste {pool.length} preguntas del capítulo 12. Este capítulo no
          provee respuestas: tus reflexiones quedan registradas en memoria (no se envían a ningún servidor).
        </div>
        <div className="row" style={{ gap: "var(--sp-2)" }}>
          <Button size="sm" variant="secondary" onClick={reset}>
            Nueva sesión (5 al azar)
          </Button>
        </div>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="stack" style={{ gap: "var(--sp-3)" }}>
      <div className="row" style={{ gap: "var(--sp-2)", alignItems: "center", flexWrap: "wrap" }}>
        <Badge tone="accent" size="xs">Reflexión {idx + 1} de {pool.length}</Badge>
        {q.level && <Badge tone="gold" size="xs">Nivel {q.level}</Badge>}
        <button type="button" className="btn-link sm" onClick={reset}>
          Reiniciar sesión
        </button>
      </div>
      <Card className="card-flat" key={q.id} padding="md">
        <p className="sim-prompt">{q.prompt}</p>
        <div style={{ marginTop: "var(--sp-3)" }}>
          <label className="field-label" htmlFor={`bank-${q.id}`}>
            Tu reflexión (sin respuesta en la guía para el cap. 12)
          </label>
          <textarea
            id={`bank-${q.id}`}
            className="ta-input"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="¿Qué sabes de este concepto? ¿Cómo lo aplicarías en Java?"
          />
        </div>
        <div className="row" style={{ gap: "var(--sp-2)", marginTop: "var(--sp-3)" }}>
          <Button size="sm" variant="secondary" onClick={next} disabled={text.trim().length === 0}>
            {idx + 1 >= pool.length ? "Terminar sesión" : "Siguiente pregunta"}
          </Button>
        </div>
        <SourceRefView ref={q.source} label="Banco · fuente" className="sr-inline" />
      </Card>
    </div>
  );
}