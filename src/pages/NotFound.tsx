import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";

export function NotFound() {
  return (
    <>
      <PageHeader eyebrow="Error 404" eyebrowIcon="warning" title="Ruta no encontrada" />
      <Card padding="lg">
        <p className="text-2">
          No existe una página para la ruta actual. Puede volver al inicio para continuar.
        </p>
        <div className="mt-4 row">
          <Button to="/" variant="primary">
            Ir al inicio
          </Button>
        </div>
      </Card>
    </>
  );
}