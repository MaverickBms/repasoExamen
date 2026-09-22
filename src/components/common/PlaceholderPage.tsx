import type { ReactNode } from "react";
import { PageHeader } from "../layout/PageHeader";
import { Card } from "./Card";
import { Badge } from "./Badge";
import type { IconName } from "./icons";

interface PlaceholderPageProps {
  eyebrow?: string;
  eyebrowIcon?: IconName;
  title: string;
  subtitle?: string;
  note?: string;
  children?: ReactNode;
}

/**
 * Plantilla de página para secciones aún en preparación.
 * Muestra un estado claro y estático (sin esqueletos animados) para que
 * el usuario sepa que la sección cargó correctamente y está en construcción.
 */
export function PlaceholderPage({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  note,
  children,
}: PlaceholderPageProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} eyebrowIcon={eyebrowIcon} title={title} subtitle={subtitle} />
      <div className="stack stack-lg">
        {children}
        <Card padding="lg" variant="flat">
          <div className="ph-box">
            <Badge tone="neutral" size="sm">
              En preparación
            </Badge>
            <p className="mt-3">
              <strong>Esta sección aún no tiene contenido.</strong>
            </p>
            <p className="mt-2 text-3" style={{ maxWidth: "58ch", marginInline: "auto" }}>
              {note ??
                "El contenido académico de esta sección está en preparación y estará disponible en una próxima versión de la plataforma, conservando la guía guiaPOO.md como fuente principal."}
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}