import { useMemo } from "react";
import { useSegments } from "../utils/router";
import { getModule } from "../data/guia";
import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { ContentView } from "../components/content/ContentView";
import { SectionView } from "../components/content/SectionView";

export function ModuleView() {
  const segments = useSegments();
  const id = segments[1] ?? "";

  const module = useMemo(() => getModule(id), [id]);

  if (!module) {
    return (
      <>
        <PageHeader eyebrow="Módulo" eyebrowIcon="book" title="Módulo no disponible" />
        <Card padding="md">
          <p>
            El módulo <code>{id || "(sin id)"}</code> aún no está disponible en esta versión de la
            plataforma.
          </p>
          <div className="row mt-4">
            <Button to="/conceptos" variant="primary">
              Ver módulos disponibles
            </Button>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`Módulo ${module.chapter} de 10`}
        eyebrowIcon="book"
        title={module.title}
        subtitle={module.subtitle}
        actions={
          <div className="row">
            <Badge tone="accent" size="xs">
              Cap. {module.chapter}
            </Badge>
            <Badge tone="neutral" size="xs">
              {module.sections.length} secciones
            </Badge>
          </div>
        }
      />

      <Card padding="md" variant="flat" className="anim-rise">
        <ContentView blocks={module.summary} />
      </Card>

      <div className="sec-index no-print" aria-label="Índice de secciones">
        {module.sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="sec-index-link">
            {s.number} · {s.title}
          </a>
        ))}
      </div>

      <div className="stack stack-lg">
        {module.sections.map((section) => (
          <Card key={section.id} id={section.id} padding="md" variant="flat">
            <SectionView section={section} />
          </Card>
        ))}
      </div>
    </>
  );
}