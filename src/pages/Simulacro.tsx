import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/common/Card";
import { Tabs } from "../components/common/Tabs";
import { SimulacroView } from "../components/content/SimulacroView";
import { SimulacroRunner } from "../components/exercises/SimulacroRunner";
import { SourceRefView } from "../components/content/SourceRef";
import { SIMULACRO } from "../data/banco/simulacro";

export function Simulacro() {
  const [mode, setMode] = useState<"lectura" | "examen">("lectura");
  return (
    <>
      <PageHeader
        eyebrow="Simulacro"
        eyebrowIcon="timer"
        title="Simulacro de evaluación"
        subtitle="Examen de 30 preguntas en 5 partes con tiempo sugerido de 90 minutos y su solucionario (cap. 13 de la guía). La parte I–II se evalúa con clave del solucionario; III–V muestran la solución modelo."
      />
      <div className="stack" style={{ gap: "var(--sp-3)" }}>
        <SourceRefView ref={SIMULACRO.source} label="Capítulo 13 · fuente" />
        <Tabs
          ariaLabel="Modo del simulacro"
          items={[
            { id: "lectura", label: "Lectura" },
            { id: "examen", label: "Examen interactivo" },
          ]}
          value={mode}
          onChange={(v) => setMode(v as "lectura" | "examen")}
        />
        <Card padding="md" variant="flat" className="anim-rise">
          {mode === "lectura" ? (
            <SimulacroView simulacro={SIMULACRO} />
          ) : (
            <SimulacroRunner simulacro={SIMULACRO} />
          )}
        </Card>
      </div>
    </>
  );
}