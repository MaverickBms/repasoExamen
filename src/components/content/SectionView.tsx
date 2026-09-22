import type { ReactNode } from "react";
import type { Section } from "../../data/types";
import { Badge } from "../common/Badge";
import { CodeBlock } from "../common/CodeBlock";
import { SourceRefView } from "./SourceRef";
import { ContentView } from "./ContentView";
import { Diagram, detectDiagramKind } from "./Diagram";
import { ExercisePlayer } from "../exercises/ExercisePlayer";

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="sec-group">
      <h4 className="sec-group-title">{label}</h4>
      {children}
    </section>
  );
}

/** Unidad de lectura/revisión de una sección X.y de la guía. */
export function SectionView({ section }: { section: Section }) {
  const hasConcept = section.concept.length > 0;
  const hasAnalogy = section.analogy.length > 0;
  const hasCode = section.codeBlocks.length > 0;
  const hasMistakes = section.commonMistakes.length > 0;
  const hasExercises = section.exercises.length > 0;
  const hasQuestions = section.questions.length > 0;
  const hasKeyPoints = section.keyPoints.length > 0;

  return (
    <article className="section-view">
      <header className="section-head">
        <div>
          <h3 className="section-title">
            <span className="section-number">{section.number}</span>
            {section.title}
          </h3>
        </div>
        <SourceRefView ref={section.source} />
      </header>

      {hasConcept && (
        <Group label="Concepto">
          <ContentView blocks={section.concept} />
        </Group>
      )}

      {hasAnalogy && (
        <Group label="Analogía">
          <ContentView blocks={section.analogy} />
        </Group>
      )}

      {hasCode && (
        <Group label="Código">
          {section.codeBlocks.map((b) => (
            <div key={b.id} className="code-block-wrap">
              {detectDiagramKind(b.code) ? (
                <Diagram source={b.code} />
              ) : (
                <CodeBlock
                  code={b.code}
                  language={b.language}
                  title={b.title}
                  showLineNumbers={true}
                />
              )}
              {b.explanation && <ContentView blocks={b.explanation} className="code-expl" />}
              {b.expectedOutput && (
                <div className="output-box">
                  <Badge tone="success" size="xs">
                    Salida esperada (guía)
                  </Badge>
                  <pre className="output-pre">{b.expectedOutput}</pre>
                </div>
              )}
              <SourceRefView ref={b.source} label="Código · fuente" className="sr-inline" />
            </div>
          ))}
        </Group>
      )}

      {hasMistakes && (
        <Group label="Errores comunes">
          <ContentView blocks={section.commonMistakes} />
        </Group>
      )}

      {hasExercises && (
        <Group label="Ejercicios">
          {section.exercises.map((e) => (
            <div key={e.id} className="exercise">
              <ExercisePlayer exercise={e} />
              <SourceRefView ref={e.source} label="Ejercicio · fuente" className="sr-inline" />
            </div>
          ))}
        </Group>
      )}

      {hasQuestions && (
        <Group label="Preguntas de evaluación">
          <ol className="q-list">
            {section.questions.map((qq) => (
              <li key={qq.id} className="q-item">
                <p>{qq.prompt}</p>
                {qq.level && <Badge tone="gold" size="xs">Nivel {qq.level}</Badge>}
                {qq.origin === "complementario" && (
                  <Badge tone="warning" size="xs">Contenido complementario</Badge>
                )}
                {qq.answer && (
                  <details className="details-box">
                    <summary>Respuesta razonada de la guía</summary>
                    <p>{qq.answer}</p>
                  </details>
                )}
              </li>
            ))}
          </ol>
        </Group>
      )}

      {hasKeyPoints && (
        <Group label="Puntos clave">
          <ContentView blocks={section.keyPoints} />
        </Group>
      )}
    </article>
  );
}