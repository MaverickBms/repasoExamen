import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/common/Card";
import { Tabs } from "../components/common/Tabs";
import { QuestionBankView } from "../components/content/QuestionBankView";
import { BankPractice } from "../components/exercises/BankPractice";
import { SourceRefView } from "../components/content/SourceRef";
import { QUESTION_BANK } from "../data/banco/banco-preguntas";

export function QuestionBank({ initialMode = "revisar" }: { initialMode?: "revisar" | "practicar" }) {
  const [mode, setMode] = useState<"revisar" | "practicar">(initialMode);
  return (
    <>
      <PageHeader
        eyebrow="Banco de preguntas"
        eyebrowIcon="bank"
        title="Banco de preguntas"
        subtitle="Las 90 preguntas reales de la guía en cinco niveles: conceptual, comprensión, análisis, código y UML (capítulo 12). El capítulo no incluye respuestas: en el modo práctica, sus reflexiones se registran y otorgan XP."
      />
      <div className="stack" style={{ gap: "var(--sp-3)" }}>
        <SourceRefView ref={QUESTION_BANK.source} label="Capítulo 12 · fuente" />
        <Tabs
          ariaLabel="Modo del banco de preguntas"
          items={[
            { id: "revisar", label: "Revisar las 90" },
            { id: "practicar", label: "Practicar (5 al azar)" },
          ]}
          value={mode}
          onChange={(v) => setMode(v as "revisar" | "practicar")}
        />
        <Card padding="md" variant="flat" className="anim-rise">
          {mode === "revisar" ? (
            <QuestionBankView bank={QUESTION_BANK} />
          ) : (
            <BankPractice bank={QUESTION_BANK} />
          )}
        </Card>
      </div>
    </>
  );
}