import type { Module } from "../../data/types";
import { MODULES } from "../../data/guia";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

/** Lista de módulos cargados (auto-adaptativa a las etapas de FASE 3). */
export function ModuleList() {
  return (
    <div className="stack stack-md">
      {MODULES.map((m) => (
        <ModuleCard key={m.id} module={m} />
      ))}
    </div>
  );
}

function ModuleCard({ module: m }: { module: Module }) {
  return (
    <Card padding="md" variant="hover">
      <div className="row" style={{ justifyContent: "space-between", gap: "var(--sp-4)" }}>
        <div className="row" style={{ gap: "var(--sp-4)", alignItems: "flex-start" }}>
          <div
            className="levelbar-badge"
            style={{ minWidth: 40, height: 40, fontSize: "var(--text-xs)" }}
          >
            {m.chapter}
          </div>
          <div>
            <div className="card-title">{m.title}</div>
            <div className="text-2 text-sm">{m.subtitle}</div>
            <div className="row mt-2" style={{ gap: "var(--sp-2)" }}>
              <Badge tone="neutral" size="xs">
                Cap. {m.chapter}
              </Badge>
              <Badge tone="neutral" size="xs">
                {m.sections.length} secciones
              </Badge>
              {m.dart?.available === false && (
                <Badge tone="neutral" size="xs">
                  Java
                </Badge>
              )}
            </div>
          </div>
        </div>
        <Button to={`/modulo/${m.id}`} variant="secondary" size="sm">
          Leer
        </Button>
      </div>
    </Card>
  );
}