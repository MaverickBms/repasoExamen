import { useMemo } from "react";
import { useSegments } from "../utils/router";
import { getTransversalResource } from "../data/transversal";
import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { TransversalResourceView } from "../components/content/TransversalResourceView";

export function TransversalResource() {
  const segments = useSegments();
  const id = segments[1] ?? "";

  const resource = useMemo(() => getTransversalResource(id), [id]);

  if (!resource) {
    return (
      <>
        <PageHeader eyebrow="Recurso transversal" eyebrowIcon="diagram" title="Recurso no disponible" />
        <Card padding="md">
          <p>
            El recurso <code>{id || "(sin id)"}</code> aún no está cargado en esta etapa de la
            FASE 3.
          </p>
          <div className="row mt-4">
            <Button to="/conceptos" variant="primary">
              Ver recursos transversales
            </Button>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`Recurso transversal · capítulo ${resource.chapter}`}
        eyebrowIcon="diagram"
        title={resource.title}
        subtitle={resource.subtitle}
        actions={
          <Badge tone="neutral" size="xs">
            {resource.kind === "glosario" ? "Glosario" : "Mapa conceptual"}
          </Badge>
        }
      />
      <Card padding="md" variant="flat" className="anim-rise">
        <TransversalResourceView resource={resource} />
      </Card>
    </>
  );
}