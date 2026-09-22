import { PageHeader } from "../components/layout/PageHeader";
import { ModuleList } from "../components/content/ModuleList";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { TRANSVERSAL_RESOURCES } from "../data/transversal";

export function Concepts() {
  return (
    <>
      <PageHeader
        eyebrow="Conceptos"
        eyebrowIcon="book"
        title="Conceptos"
        subtitle="Los 10 módulos de aprendizaje derivados de los capítulos 1–10 de la guía, junto a los recursos transversales de POO."
      />
      <div className="stack stack-lg">
        <ModuleList />

        <div className="sec-group">
          <h4 className="sec-group-title">Recursos transversales</h4>
          <div className="ukit-grid">
            {TRANSVERSAL_RESOURCES.map((r) => (
              <Card key={r.id} padding="md" variant="hover">
                <div className="row" style={{ justifyContent: "space-between", gap: "var(--sp-3)" }}>
                  <div>
                    <div className="card-title">{r.title}</div>
                    <p className="text-2 text-sm">{r.subtitle}</p>
                    <div className="row mt-2" style={{ gap: "var(--sp-2)" }}>
                      <Badge tone="accent" size="xs">
                        Cap. {r.chapter}
                      </Badge>
                      <Badge tone="neutral" size="xs">
                        {r.kind === "glosario" ? `${r.terms.length} términos` : "Diagramas"}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    to={r.kind === "glosario" ? "/glosario" : `/recurso/${r.id}`}
                    variant="secondary"
                    size="sm"
                  >
                    Leer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}