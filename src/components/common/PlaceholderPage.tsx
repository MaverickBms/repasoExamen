import type { ReactNode } from "react";
import { PageHeader } from "../layout/PageHeader";
import { Card } from "./Card";
import { SkeletonBlock } from "./Skeleton";
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
 * Plantilla de página para FASE 2: demuestra que la navegación,
 * el layout y el tema funcionan, sin contenido académico todavía.
 * El contenido real llega en FASE 3.
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
        <Card padding="md" variant="flat">
          <div className="ph-box">
            <p>
              <strong>Sección en preparación.</strong>
            </p>
            <p className="mt-2 text-3">
              {note ??
                "El contenido académico de esta sección se integrará en la FASE 3 (Contenido educativo), conservando la guía guiaPOO.md como fuente principal."}
            </p>
          </div>
        </Card>
        <SkeletonBlock lines={4} />
      </div>
    </>
  );
}