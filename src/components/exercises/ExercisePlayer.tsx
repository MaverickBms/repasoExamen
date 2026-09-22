/**
 * Motor de ejercicios interactivos (FASE 4).
 *
 * Respeta el tipo declarado por la arquitectura y es HONESTO con la fuente:
 * solo se «comprueba» cuando la guía provee `answer`. Si no hay respuesta,
 * la actividad queda como reflexión y nunca se ofrece una respuesta inventada.
 */
import { useState } from "react";
import type { Exercise } from "../../data/types";
import { useProgress } from "../../state/progress";
import { useToast } from "../common/Toast";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { ContentView } from "../content/ContentView";

export function optionLetter(index: number): string {
  return String.fromCharCode(97 + index);
}

export function answerLetter(answer: string): number | null {
  const m = /^([a-d])\)/.exec(answer.trim());
  if (m) return m[1].charCodeAt(0) - 97;
  return null;
}

const EXERCISE_LABELS: Record<string, string> = {
  mc: "Opción múltiple",
  tf: "Verdadero / Falso",
  dragdrop: "Arrastrar y soltar",
  fillblank: "Completar",
  finderror: "Encontrar el error",
  predict: "Predecir salida",
  order: "Ordenar código",
  classify: "Clasificar",
  uml: "UML",
  open: "Reflexivo",
};

export function ExercisePlayer({ exercise }: { exercise: Exercise }) {
  const { markActivity } = useProgress();
  const { showToast } = useToast();
  const [selected, setSelected] = useState<number | null>(null);
  const [tfValue, setTfValue] = useState<boolean | null>(null);
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);

  const hasAnswer = !!exercise.answer;

  const reward = () => {
    const { awarded } = markActivity(`ex:${exercise.id}`, 15);
    showToast({
      tone: "gold",
      title: "+15 XP",
      message: hasAnswer ? "Ejercicio resuelto (respuesta de la guía)." : "Reflexión guardada.",
    });
    awarded.forEach((b) =>
      showToast({ tone: "gold", title: `Insignia desbloqueada: ${b.title}`, message: b.description }),
    );
  };

  const checkMc = () => {
    setChecked(true);
    if (selected === null) return;
    const expected = answerLetter(exercise.answer ?? "");
    const isCorrect = expected !== null && selected === expected;
    reward();
    showToast({
      tone: isCorrect ? "success" : "warning",
      title: isCorrect ? "Correcto (según la guía)" : "No coincide con la respuesta de la guía",
      message: exercise.answer,
    });
  };

  const checkTf = () => {
    setChecked(true);
    if (tfValue === null) return;
    const ans = (exercise.answer ?? "").toLowerCase();
    const isCorrect = (tfValue && ans.startsWith("v")) || (!tfValue && ans.startsWith("f"));
    reward();
    showToast({
      tone: isCorrect ? "success" : "warning",
      title: isCorrect ? "Correcto (según la guía)" : "No coincide con la respuesta de la guía",
      message: exercise.answer,
    });
  };

  const saveReflection = () => {
    reward();
  };

  const isOpenType =
    exercise.type === "open" || exercise.type === "dragdrop" || exercise.type === "fillblank" ||
    exercise.type === "finderror" || exercise.type === "predict" || exercise.type === "order" ||
    exercise.type === "classify" || exercise.type === "uml";

  return (
    <div className="exercise">
      <div className="row" style={{ marginBottom: "var(--sp-2)" }}>
        <Badge tone="accent" size="xs">
          {EXERCISE_LABELS[exercise.type] ?? exercise.type}
        </Badge>
      </div>
      <ContentView blocks={exercise.prompt} />

      {exercise.type === "mc" && exercise.options && (
        <div className="exercise" style={{ marginTop: "var(--sp-2)" }}>
          <div className="mc-options" role="group" aria-label="Opciones">
            {exercise.options.map((o, i) => (
              <button
                type="button"
                key={i}
                className={`opt-btn${selected === i ? " is-selected" : ""}`}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
              >
                <span className="opt-letter">{optionLetter(i)})</span>
                <span>{o}</span>
              </button>
            ))}
          </div>
          <div className="row mt-2" style={{ gap: "var(--sp-2)" }}>
            <Button size="sm" variant="secondary" onClick={checkMc} disabled={selected === null || (checked && hasAnswer)}>
              Comprobar (respuesta de la guía)
            </Button>
          </div>
          {!hasAnswer && checked && (
            <Badge tone="warning" size="xs">
              Sin respuesta en la fuente: la selección queda para tu reflexión.
            </Badge>
          )}
        </div>
      )}

      {exercise.type === "tf" && (
        <div className="exercise" style={{ marginTop: "var(--sp-2)" }}>
          <div className="mc-options" role="group" aria-label="Verdadero o Falso">
            {[true, false].map((v) => (
              <button
                type="button"
                key={String(v)}
                className={`opt-btn${tfValue === v ? " is-selected" : ""}`}
                onClick={() => setTfValue(v)}
                aria-pressed={tfValue === v}
              >
                <span className="opt-letter">{v ? "V" : "F"}</span>
                <span>{v ? "Verdadero" : "Falso"}</span>
              </button>
            ))}
          </div>
          <div className="row mt-2" style={{ gap: "var(--sp-2)" }}>
            <Button size="sm" variant="secondary" onClick={checkTf} disabled={tfValue === null}>
              Comprobar (respuesta de la guía)
            </Button>
          </div>
        </div>
      )}

      {isOpenType && (
        <div className="exercise" style={{ marginTop: "var(--sp-3)" }}>
          <label className="field-label" htmlFor={`resp-${exercise.id}`}>
            {hasAnswer ? "Escribe tu respuesta y luego compárala con la de la guía" : "Escribe tu reflexión (este ejercicio no tiene respuesta en la guía)"}
          </label>
          <textarea
            id={`resp-${exercise.id}`}
            className="ta-input"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe aquí tu razonamiento…"
          />
          <div className="row mt-2" style={{ gap: "var(--sp-2)" }}>
            <Button size="sm" variant="secondary" onClick={saveReflection} disabled={text.trim().length === 0}>
              {hasAnswer ? "Guardar y comparar · +15 XP" : "Guardar reflexión · +15 XP"}
            </Button>
            {hasAnswer && (
              <details className="details-box">
                <summary>Ver respuesta de la guía</summary>
                <p>{exercise.answer}</p>
              </details>
            )}
          </div>
        </div>
      )}

      {!hasAnswer && !isOpenType && exercise.type !== "mc" && exercise.type !== "tf" && (
        <Badge tone="warning" size="xs">
          Actividad sin respuesta en la fuente (reflexión libre).
        </Badge>
      )}
    </div>
  );
}