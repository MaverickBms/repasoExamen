import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/common/Card";
import { SourceRefView } from "../components/content/SourceRef";
import { Badge } from "../components/common/Badge";
import type { ContentTable } from "../data/types";
import { REPASO } from "../data/repaso/repaso";
import { CHECKLIST } from "../data/repaso/checklist";

function RepasoTable({ table }: { table: ContentTable }) {
  return (
    <figure className="content-table-wrap">
      {table.caption && <figcaption>{table.caption}</figcaption>}
      <table className="content-table">
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export function Review() {
  return (
    <>
      <PageHeader
        eyebrow="Repaso"
        eyebrowIcon="refresh"
        title="Repaso de alto rendimiento"
        subtitle="El capítulo 15 (tabla de conceptos + las 20 cosas que definitivamente debes saber) y el checklist final del capítulo 16. Lectura y revisión."
      />
      <div className="stack stack-lg">
        <div className="stack" style={{ gap: "var(--sp-3)" }}>
          <SourceRefView ref={REPASO.source} label="Capítulo 15 · fuente" />
          <Card padding="md" variant="flat" className="anim-rise">
            <div className="stack stack-lg">
              <section className="sec-group">
                <h4 className="sec-group-title">
                  Tabla de repaso <Badge tone="accent" size="xs">{REPASO.table.rows.length} conceptos</Badge>
                </h4>
                <RepasoTable table={REPASO.table} />
              </section>
              <section className="sec-group">
                <h4 className="sec-group-title">
                  Las 20 cosas que definitivamente debes saber{" "}
                  <Badge tone="accent" size="xs">{REPASO.pivotItems.length} reales</Badge>
                </h4>
                <ol className="q-list">
                  {REPASO.pivotItems.map((item, i) => (
                    <li key={i} className="q-item">
                      {item}
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </Card>
        </div>

        <div className="stack" style={{ gap: "var(--sp-3)" }}>
          <SourceRefView ref={CHECKLIST.source} label="Capítulo 16 · fuente" />
          <Card padding="md" variant="flat" className="anim-rise">
            <section className="sec-group">
              <h4 className="sec-group-title">
                Checklist final de preparación{" "}
                <Badge tone="accent" size="xs">{CHECKLIST.items.length} elementos</Badge>
              </h4>
              <div className="notice">
                Lista de lectura/revisión: las casillas funcionales, el progreso y la
                persistencia llegarán en fases posteriores (FASE 3 = solo lectura).
              </div>
              <ol className="q-list">
                {CHECKLIST.items.map((item, i) => (
                  <li key={i} className="q-item checklist-item">
                    <span className="check-badge" aria-hidden="true">[ ]</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              {CHECKLIST.closingQuote && (
                <blockquote className="quote-outro">
                  <p>“{CHECKLIST.closingQuote.text}”</p>
                  <footer>— Rebecca Wirfs-Brock</footer>
                  <SourceRefView ref={CHECKLIST.closingQuote.source} label="Cita · fuente" className="sr-inline" />
                </blockquote>
              )}
            </section>
          </Card>
        </div>
      </div>
    </>
  );
}