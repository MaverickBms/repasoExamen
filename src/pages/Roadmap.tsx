import { PageHeader } from "../components/layout/PageHeader";
import { ModuleList } from "../components/content/ModuleList";
import { Card } from "../components/common/Card";
import { TagChip } from "../components/common/TagChip";

export function Roadmap() {
  return (
    <>
      <PageHeader
        eyebrow="Ruta de aprendizaje"
        eyebrowIcon="road"
        title="Ruta de aprendizaje"
        subtitle="Circuito de los 10 módulos de Programación Orientada a Objetos. El contenido sigue el orden de la guía; cada módulo se apoya en el anterior."
      />
      <div className="stack stack-lg">
        <div className="row wrap">
          <TagChip active>Orden de la guía</TagChip>
          <TagChip>Capítulo → Módulo → Sección</TagChip>
        </div>
        <ModuleList />
        <Card padding="md" variant="flat">
          <p className="text-3">
            Los 10 módulos siguen el orden de los capítulos 1 a 10 de la guía; su contenido
            se organiza en secciones de lectura y práctica.
          </p>
        </Card>
      </div>
    </>
  );
}