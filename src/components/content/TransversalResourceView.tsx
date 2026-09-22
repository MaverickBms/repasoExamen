import type { TransversalResource } from "../../data/types";
import { SourceRefView } from "./SourceRef";
import { ContentView } from "./ContentView";
import { Diagram } from "./Diagram";

/** Render de lectura/revisión de un recurso transversal (mapa, glosario). */
export function TransversalResourceView({ resource }: { resource: TransversalResource }) {
  return (
    <div className="stack stack-lg">
      {resource.mermaid.map((b, i) => (
        <div key={i} className="section-view">
          <Diagram source={b.mermaid ?? ""} />
        </div>
      ))}

      {resource.lectura.length > 0 && (
        <section className="sec-group">
          <h4 className="sec-group-title">Lectura</h4>
          <ContentView blocks={resource.lectura} />
        </section>
      )}

      {resource.terms.length > 0 && (
        <section className="sec-group">
          <h4 className="sec-group-title">
            {resource.terms.length} términos
          </h4>
          <dl className="glossary-grid">
            {resource.terms.map((t) => (
              <div key={t.term} className="glossary-item">
                <dt className="glossary-term">{t.term}</dt>
                <dd className="glossary-def">{t.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <SourceRefView ref={resource.source} label="Fuente de este recurso" />
    </div>
  );
}