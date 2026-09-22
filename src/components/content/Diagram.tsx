/**
 * Renderizador Mermaid propio (SVG) — FASE 4.
 *
 * Cubre EXACTAMENTE la gramática presente en la guía (22 diagramas):
 *   - flowchart (TD/LR): nodos `ID[label]` y aristas `-->`, `A -->|texto| B`
 *   - classDiagram: `class X { ... }`, estereotipos `<<>>`, membrecías
 *     `+/-/# método` y relaciones `<|--`, `<|..`, `o--`, `*--`, `..>`, `-->`,
 *     `--` con cardinalidades `"1"`/`"*"` y etiquetas `: texto`
 *   - sequenceDiagram: `participant`, `A->>B: msg`, `A-->>B: msg`, `Note over X`
 *
 * No es un intérprete general de Mermaid: está acotado a lo que la guía usa.
 * El texto fuente verbatim SIEMPRE se conserva accesible (toggle).
 */
import { useState, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Badge } from "../common/Badge";

export type DiagramKind = "flowchart" | "classDiagram" | "sequenceDiagram";

const MONO = 7.2;
const CH = 15;
const PAD = 14;
const GAPX = 46;
const GAPY = 54;

/* ---------------------------------- detección ----------------------------- */

export function detectDiagramKind(src: string): DiagramKind | null {
  const first = src.trim().split("\n")[0].trim();
  if (first.startsWith("flowchart") || first.startsWith("graph")) return "flowchart";
  if (first.startsWith("classDiagram")) return "classDiagram";
  if (first.startsWith("sequenceDiagram")) return "sequenceDiagram";
  return null;
}

/* -------------------------------- flowchart ------------------------------ */

interface FlowNode {
  id: string;
  label: string;
}
interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}
interface FlowGraph {
  dir: "TD" | "LR";
  nodes: FlowNode[];
  edges: FlowEdge[];
}

function parseFlow(src: string): FlowGraph | null {
  const g: FlowGraph = {
    dir: /flowchart\s+LR\b/.test(src) || /graph\s+LR\b/.test(src) ? "LR" : "TD",
    nodes: [],
    edges: [],
  };
  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("flowchart") || line.startsWith("graph")) continue;
    const nodeDef = /^([A-Za-z0-9_]+)\s*\[([^\]]*)\]$/.exec(line);
    if (nodeDef) {
      if (!g.nodes.some((n) => n.id === nodeDef![1])) g.nodes.push({ id: nodeDef![1], label: nodeDef![2] });
      continue;
    }
    const edgeDef = /^([A-Za-z0-9_]+)\s+(-->|---|==>|-.->)\s*(?:\|([^|]*)\|)?\s*([A-Za-z0-9_]+)\s*$/.exec(line);
    if (edgeDef) {
      for (const id of [edgeDef[1], edgeDef[4]]) {
        if (!g.nodes.some((n) => n.id === id)) g.nodes.push({ id, label: id });
      }
      g.edges.push({ from: edgeDef[1], to: edgeDef[4], label: edgeDef[3] });
    }
  }
  if (!g.nodes.length) return null;
  return g;
}

/* ------------------------------ classDiagram ----------------------------- */

interface ClassBox {
  name: string;
  stereotype?: string;
  members: string[];
}
interface ClassRel {
  a: string;
  b: string;
  kind:
    | "inherit"
    | "realize"
    | "compose"
    | "aggregate"
    | "depend"
    | "assoc"
    | "link";
  cardA?: string;
  cardB?: string;
  label?: string;
}
interface ClassDiag {
  classes: ClassBox[];
  rels: ClassRel[];
}

function parseClass(src: string): ClassDiag | null {
  const d: ClassDiag = { classes: [], rels: [] };
  let current: ClassBox | null = null;
  const opRe =
    /^([A-Za-z0-9_]+)(?:\s+"([^"]*)")?\s+(<\|--|<\|\.\.|\*--|o--|<\.\.|\.\.>|-->|---)\s+("?[\w.*]+"?)\s*([A-Za-z0-9_]+)(?:\s*:\s*(.*))?$/;
  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const open = /^class\s+([A-Za-z0-9_]+)\s*\{?$/.exec(line);
    if (open) {
      if (line.endsWith("{")) {
        current = { name: open[1], members: [] };
        d.classes.push(current);
      } else {
        d.classes.push({ name: open[1], members: [] });
      }
      continue;
    }
    if (current && line === "}") {
      current = null;
      continue;
    }
    if (current) {
      const stereo = /^<<(.+)>>$/.exec(line);
      if (stereo) {
        current.stereotype = stereo[1];
        continue;
      }
      current.members.push(line);
      continue;
    }
    const rel = opRe.exec(line);
    if (rel) {
      const kindMap: Record<string, ClassRel["kind"]> = {
        "<|--": "inherit",
        "<|..": "realize",
        "*--": "compose",
        "o--": "aggregate",
        "..>": "depend",
        "-->": "assoc",
        "---": "link",
      };
      for (const n of [rel[1], rel[6]]) {
        if (!d.classes.some((c) => c.name === n)) d.classes.push({ name: n, members: [] });
      }
      d.rels.push({
        a: rel[1],
        b: rel[6],
        kind: kindMap[rel[4]] ?? "assoc",
        cardA: rel[2],
        cardB: rel[5],
        label: rel[7],
      });
      continue;
    }
  }
  if (!d.classes.length) return null;
  return d;
}

/* ---------------------------- sequenceDiagram ---------------------------- */

interface SeqDiag {
  participants: string[];
  notes: { over: string; text: string }[];
  msgs: { from: string; to: string; label: string; dashed: boolean }[];
}

function parseSeq(src: string): SeqDiag | null {
  const d: SeqDiag = { participants: [], notes: [], msgs: [] };
  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("sequenceDiagram")) continue;
    const part = /^participant\s+([A-Za-z0-9_]+)/.exec(line);
    if (part) {
      d.participants.push(part[1]);
      continue;
    }
    const note = /^Note\s+over\s+([A-Za-z0-9_]+)\s*:\s*(.*)$/.exec(line);
    if (note) {
      d.notes.push({ over: note[1], text: note[2] });
      continue;
    }
    const msg = /^([A-Za-z0-9_<>]+)\s*(--?)>?<?(--?)>?\s*([A-Za-z0-9_<>:]+)\s*:\s*(.*)$/.exec(line);
    if (msg) {
      const op = msg[2].replace(/\s/g, "");
      for (const p of [msg[1], msg[3]]) {
        if (!d.participants.includes(p)) d.participants.push(p);
      }
      d.msgs.push({ from: msg[1], to: msg[3], label: msg[4], dashed: op.includes("--") || op.indexOf("-") === 0 });
      continue;
    }
  }
  if (!d.participants.length) return null;
  return d;
}

/* --------------------------------- layout -------------------------------- */

function textWidth(s: string): number {
  let w = 0;
  for (const ch of s) {
    w += ch.charCodeAt(0) > 0xff ? MONO * 1.55 : ch === " " ? MONO * 0.55 : MONO;
  }
  return w;
}

function nodeSize(lines: string[]): { w: number; h: number } {
  const w = Math.max(64, textWidth(lines[0] ?? "") + PAD * 2);
  const h = lines.length ? lines.length * CH + PAD * 2 + 6 : 40;
  return { w, h };
}

function computeRanks(ids: string[], edges: { from: string; to: string }[]): Map<string, number> {
  const rank = new Map<string, number>();
  const indeg = new Map<string, number>();
  ids.forEach((id) => indeg.set(id, 0));
  edges.forEach((e) => indeg.set(e.to, (indeg.get(e.to) ?? 0) + 1));
  const compute = (id: string, r: number): void => {
    if ((rank.get(id) ?? -1) >= r) return;
    rank.set(id, r);
    edges.filter((e) => e.from === id).forEach((e) => compute(e.to, r + 1));
  };
  ids.filter((id) => indeg.get(id) === 0).forEach((id) => compute(id, 0));
  ids.forEach((id) => {
    if (!rank.has(id)) compute(id, 0);
  });
  return rank;
}

/* ------------------------------ FlowSVG ---------------------------------- */

function FlowSVG({ g }: { g: FlowGraph }) {
  const rank = computeRanks(
    g.nodes.map((n) => n.id),
    g.edges,
  );
  const maxRank = Math.max(0, ...g.nodes.map((n) => rank.get(n.id) ?? 0));
  const mainAx = g.dir === "LR" ? "x" : "y";
  const crossAx = g.dir === "LR" ? "y" : "x";
  const size = new Map(g.nodes.map((n) => [n.id, nodeSize([n.label])]));
  const pos = new Map<string, Record<string, number>>();

  for (let r = 0; r <= maxRank; r++) {
    const group = g.nodes.filter((n) => rank.get(n.id) === r);
    let cursor = 30;
    group.forEach((n) => {
      const { w, h } = size.get(n.id)!;
      const p: Record<string, number> = { x: 30, y: 30 };
      p[mainAx] = 30;
      p[crossAx] = cursor;
      pos.set(n.id, p);
      cursor += w + GAPX;
      void h;
    });
  }

  let W = 0;
  let H = 0;
  g.nodes.forEach((n) => {
    const p = pos.get(n.id)!;
    const { w, h } = size.get(n.id)!;
    W = Math.max(W, p.x + w);
    H = Math.max(H, p.y + h);
  });
  const viewBox = `0 0 ${W + 40} ${H + 40}`;

  const bezier = (a: Record<string, number>, b: Record<string, number>, sA: { w: number; h: number }, sB: { w: number; h: number }) => {
    if (mainAx === "x") {
      const aX = a.x + sA.w;
      const aY = a.y + sA.h / 2;
      const bX = b.x;
      const bY = b.y + sB.h / 2;
      const mid = (aX + bX) / 2;
      return `M ${aX} ${aY} C ${mid} ${aY}, ${mid} ${bY}, ${bX} ${bY}`;
    }
    const aX = a.x + sA.w / 2;
    const aY = a.y + sA.h;
    const bX = b.x + sB.w / 2;
    const bY = b.y;
    const mid = (aY + bY) / 2;
    return `M ${aX} ${aY} C ${aX} ${mid}, ${bX} ${mid}, ${bX} ${bY}`;
  };

  return (
    <svg className="diagram-svg" viewBox={viewBox} role="img" aria-label={`Diagrama de flujo ${g.dir}`}>
      <defs>
        <marker id="farrow" markerWidth="10" markerHeight="8" refX="8.5" refY="4" orient="auto">
          <path d="M0 0 L10 4 L0 8 z" fill="var(--accent)" />
        </marker>
      </defs>
      {g.edges.map((e, i) => {
        const a = pos.get(e.from)!;
        const b = pos.get(e.to)!;
        const sA = size.get(e.from)!;
        const sB = size.get(e.to)!;
        const path = bezier(a, b, sA, sB);
        return (
          <g key={i}>
            <path d={path} fill="none" stroke="var(--text-3)" strokeWidth={1.5} markerEnd="url(#farrow)" />
            {e.label && (
              <text x={(a.x + b.x + sA.w) / 2} y={(a.y + b.y + sA.h) / 2 - 8} textAnchor="middle" className="diag-label">
                {e.label}
              </text>
            )}
          </g>
        );
      })}
      {g.nodes.map((n, i) => {
        const p = pos.get(n.id)!;
        const { w, h } = size.get(n.id)!;
        return (
          <g key={i}>
            <rect x={p.x} y={p.y} width={w} height={h} rx={8} className="diag-node" />
            <text x={p.x + w / 2} y={p.y + h / 2 + 5} textAnchor="middle" className="diag-node-text">
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------ ClassSVG --------------------------------- */

function ClassSVG({ src }: { src: string }) {
  const d = parseClass(src);
  if (!d) return <pre className="diag-fallback">{src}</pre>;
  const cols = 4;
  const colW = new Map(
    d.classes.map((c) => [c.name, Math.max(130, Math.max(...[c.name, ...c.members].map(textWidth)) + PAD * 2 + 10)]),
  );
  const rowH = new Map(d.classes.map((c) => [c.name, c.members.length * CH + (c.stereotype ? 44 : 44)]));
  const pos = new Map<string, Record<string, number>>();
  let maxW = 0;
  let maxH = 0;
  d.classes.forEach((c, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols) * 6;
    const x = col * (GAPX + 140) + 30;
    const y = row * 1.4 + 30;
    pos.set(c.name, { x, y });
    maxW = Math.max(maxW, x + (colW.get(c.name) ?? 150));
    maxH = Math.max(maxH, y + (rowH.get(c.name) ?? 90));
  });

  const relStyle: Record<ClassRel["kind"], { dash?: string; color: string }> = {
    inherit: { color: "var(--accent)" },
    realize: { dash: "6 4", color: "var(--accent)" },
    compose: { color: "var(--gold)" },
    aggregate: { color: "var(--gold)" },
    depend: { dash: "6 4", color: "var(--text-3)" },
    assoc: { color: "var(--text-3)" },
    link: { color: "var(--text-3)" },
  };

  return (
    <svg className="diagram-svg" viewBox={`0 0 ${maxW + 30} ${Math.max(maxH + 40, 140)}`} role="img" aria-label="Diagrama de clases">
      <defs>
        <marker id="c-tri" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
          <path d="M1 1 L11 5 L1 9 L1 1 z" fill="none" stroke="var(--accent)" strokeWidth={1} />
        </marker>
        <marker id="c-arr" markerWidth="10" markerHeight="8" refX="8.5" refY="4" orient="auto">
          <path d="M0 0 L10 4 L0 8 z" fill="none" stroke="var(--text-3)" />
        </marker>
        <marker id="c-fill" markerWidth="14" markerHeight="12" refX="11" refY="6" orient="auto">
          <path d="M1 6 L7 1 L13 6 L7 11 z" fill="var(--gold)" />
        </marker>
        <marker id="c-hollow" markerWidth="14" markerHeight="12" refX="11" refY="6" orient="auto">
          <path d="M1 6 L7 1 L13 6 L7 11 z" fill="none" stroke="var(--gold)" strokeWidth={1} />
        </marker>
      </defs>

      {d.rels.map((r, i) => {
        const a = pos.get(r.a);
        const b = pos.get(r.b);
        if (!a || !b) return null;
        const st = relStyle[r.kind];
        const aCx = a.x + (colW.get(r.a) ?? 100) / 2;
        const aCy = a.y + (rowH.get(r.a) ?? 80) / 2;
        const bCx = b.x + (colW.get(r.b) ?? 100) / 2;
        const bCy = b.y + (rowH.get(r.b) ?? 80) / 2;
        const dx = Math.max(30, Math.abs(bCx - aCx));
        const dy = Math.max(30, Math.abs(bCy - aCy));
        const path = dy > dx * 0.5
          ? `M ${aCx} ${aCy} C ${aCx} ${(aCy + bCy) / 2}, ${bCx} ${(aCy + bCy) / 2}, ${bCx} ${bCy}`
          : `M ${aCx} ${aCy} C ${(aCx + bCx) / 2} ${aCy}, ${(aCx + bCx) / 2} ${bCy}, ${bCx} ${bCy}`;
        const markerStart =
          r.kind === "inherit" || r.kind === "realize"
            ? "url(#c-tri)"
            : r.kind === "compose"
              ? "url(#c-fill)"
              : r.kind === "aggregate"
                ? "url(#c-hollow)"
                : undefined;
        const markerEnd = r.kind === "assoc" || r.kind === "depend" ? "url(#c-arr)" : undefined;
        return (
          <g key={i}>
            <path d={path} fill="none" stroke={st.color} strokeWidth={1.4} strokeDasharray={st.dash} markerStart={markerStart} markerEnd={markerEnd} />
            {r.label && (
              <text x={(aCx + bCx) / 2} y={(aCy + bCy) / 2 - 6} textAnchor="middle" className="diag-label">
                {r.label}
              </text>
            )}
            {r.cardA && (
              <text x={aCx + dx * 0.18} y={aCy + (bCy > aCy ? -8 : 18)} textAnchor="middle" className="diag-card">
                {r.cardA}
              </text>
            )}
            {r.cardB && (
              <text x={bCx - dx * 0.18} y={bCy + (bCy > aCy ? -8 : 18)} textAnchor="middle" className="diag-card">
                {r.cardB}
              </text>
            )}
          </g>
        );
      })}

      {d.classes.map((c, i) => {
        const p = pos.get(c.name)!;
        const w = colW.get(c.name)!;
        const h = rowH.get(c.name)!;
        const stereo = c.stereotype;
        return (
          <g key={i}>
            <rect x={p.x} y={p.y} width={w} height={h} rx={6} className="diag-class" />
            <rect x={p.x} y={p.y} width={w} height={stereo ? 44 : 30} rx={6} className="diag-class-head" />
            <rect x={p.x} y={p.y + (stereo ? 22 : 15)} width={w} height={1} fill="var(--border)" />
            <text x={p.x + w / 2} y={p.y + (stereo ? 16 : 20)} textAnchor="middle" className="diag-class-name">
              {c.name}
            </text>
            {stereo && (
              <text x={p.x + w / 2} y={p.y + 34} textAnchor="middle" className="diag-stereo">
                &lt;&lt;{stereo}&gt;&gt;
              </text>
            )}
            {c.members.map((m, j) => (
              <text key={j} x={p.x + 9} y={p.y + (stereo ? 58 : 44) + j * CH} className="diag-member">
                {approx(m, w - 12)}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function approx(label: string, maxW: number): string {
  const maxChars = Math.max(6, Math.floor((maxW - PAD) / MONO) - 4);
  return label.length > maxChars ? label.slice(0, maxChars - 1) + "…" : label;
}

/* ------------------------------ SeqSVG ----------------------------------- */

function SeqSVG({ src }: { src: string }) {
  const d = parseSeq(src);
  if (!d) return <pre className="diag-fallback">{src}</pre>;
  const colW = 150;
  const W = Math.max(120, d.participants.length * colW + 40);
  const xFor = (p: string) => Math.max(20, 40 + d.participants.indexOf(p) * colW - colW / 2);
  const step = 28;
  const startY = 72;
  const yNote = new Map<string, number>();
  let y = startY;
  const msgs = d.msgs.map((m) => {
    y += step;
    return { x1: xFor(m.from), x2: xFor(m.to), y, label: m.label, dashed: m.dashed };
  });
  d.notes.forEach((n) => {
    y += step;
    yNote.set(n.over, y);
  });
  const H = y + 70;

  return (
    <svg className="diagram-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Diagrama de secuencia">
      <defs>
        <marker id="s-arr" markerWidth="10" markerHeight="8" refX="8.5" refY="4" orient="auto">
          <path d="M0 0 L10 4 L0 8 z" fill="var(--accent)" />
        </marker>
      </defs>
      {d.participants.map((p, i) => (
        <g key={i}>
          <rect x={xFor(p) - 48} y={16} width={96} height={32} rx={7} className="diag-participant" />
          <text x={xFor(p)} y={37} textAnchor="middle" className="diag-participant-text">
            {p}
          </text>
          <line x1={xFor(p)} y1={48} x2={xFor(p)} y2={H - 24} stroke="var(--text-3)" strokeDasharray="3 5" strokeWidth={1.1} />
        </g>
      ))}
      {d.notes.map((n, i) => {
        const cx = xFor(n.over);
        const ny = yNote.get(n.over) ?? startY;
        const w = Math.max(80, textWidth(n.text) + 24);
        return (
          <g key={i}>
            <rect x={cx - w / 2} y={ny - 12} width={w} height={24} rx={6} className="diag-note" />
            <text x={cx} y={ny + 4} textAnchor="middle" className="diag-note-text">
              {n.text}
            </text>
          </g>
        );
      })}
      {msgs.map((m, i) => (
        <g key={i}>
          <line x1={m.x1} y1={m.y} x2={m.x2} y2={m.y} stroke="var(--accent)" strokeWidth={1.5} strokeDasharray={m.dashed ? "5 3" : undefined} markerEnd="url(#s-arr)" />
          <text x={(m.x1 + m.x2) / 2} y={m.y - 7} textAnchor="middle" className="diag-label">
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------- Diagram -------------------------------- */

export function Diagram({ source, className }: { source: string; className?: string }) {
  const [showSource, setShowSource] = useState(false);
  const kind = detectDiagramKind(source);

  let body: ReactNode = null;
  if (kind === "flowchart") {
    const g = parseFlow(source);
    body = g ? <FlowSVG g={g} /> : <pre className="diag-fallback">{source}</pre>;
  } else if (kind === "classDiagram") {
    body = <ClassSVG src={source} />;
  } else if (kind === "sequenceDiagram") {
    body = <SeqSVG src={source} />;
  } else {
    body = <pre className="diag-fallback">{source}</pre>;
  }

  return (
    <figure className={cn("diagram", className)}>
      <div className="diagram-bar">
        <Badge tone="accent" size="xs">
          Mermaid · {kind ?? "text"}
        </Badge>
        <button
          type="button"
          className="btn-link sm"
          aria-expanded={showSource}
          onClick={() => setShowSource((s) => !s)}
        >
          {showSource ? "Ver diagrama" : "Ver código fuente verbatim"}
        </button>
      </div>
      <div className="diagram-scroll">{showSource ? <pre className="diagram-source">{source}</pre> : body}</div>
    </figure>
  );
}