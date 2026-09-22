import { GLOSARIO } from "../data/transversal/glosario";
import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/common/Card";
import { TransversalResourceView } from "../components/content/TransversalResourceView";

export function Glossary() {
  return (
    <>
      <PageHeader
        eyebrow="Glosario"
        eyebrowIcon="glossary"
        title="Glosario"
        subtitle="Los términos fundamentales de POO según el capítulo 14 de la guía (lectura y revisión)."
      />
      <Card padding="md" variant="flat" className="anim-rise">
        <TransversalResourceView resource={GLOSARIO} />
      </Card>
    </>
  );
}