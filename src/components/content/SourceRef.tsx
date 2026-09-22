import { useState } from "react";
import { cn } from "../../utils/cn";
import type { SourceRef } from "../../data/types";

interface SourceRefProps {
  ref: SourceRef;
  className?: string;
  label?: string;
}

/** Control discreto y opcional "Ver fuente académica" (no un chip permanente). */
export function SourceRefView({ ref, className, label = "Fuente" }: SourceRefProps) {
  const [open, setOpen] = useState(false);
  if (!ref) return null;

  return (
    <div className={cn("sr-wrapper", className)}>
      <button
        type="button"
        className="sr-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Ver fuente académica"
      >
        {label}
      </button>
      {open && (
        <div className="sr-panel">
          Capítulo {ref.chapter} · Sección {ref.section}
          {ref.lines && <> · Líneas {ref.lines}</>}
          {ref.note && <span className="sr-note"> — {ref.note}</span>}
        </div>
      )}
    </div>
  );
}