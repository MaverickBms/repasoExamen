import type { ContentBlock } from "../../data/types";
import { cn } from "../../utils/cn";
import { CodeBlock } from "../common/CodeBlock";
import { SourceRefView } from "./SourceRef";
import { Diagram, detectDiagramKind } from "./Diagram";

interface ContentViewProps {
  blocks: ContentBlock[];
  className?: string;
}

/** Render de lectura de bloques de contenido (data/*.ts → UI). */
export function ContentView({ blocks, className }: ContentViewProps) {
  if (!blocks.length) return null;
  return (
    <div className={cn("content-view stack stack-sm", className)}>
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "list":
      return block.ordered ? (
        <ol className="content-list">
          {block.items?.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      ) : (
        <ul className="content-list">
          {block.items?.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <figure className="content-table-wrap">
          {block.table?.caption && <figcaption>{block.table.caption}</figcaption>}
          <table className="content-table">
            <thead>
              <tr>
                {block.table?.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table?.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    case "quote":
      return <blockquote className="content-quote">{block.text}</blockquote>;
    case "code":
      if (detectDiagramKind(block.code ?? "")) {
        return (
          <div className="stack stack-sm">
            <Diagram source={block.code ?? ""} />
            {block.source && <SourceRefView ref={block.source} label="Fuente" />}
          </div>
        );
      }
      return (
        <pre className="content-pre">
          <code>{block.code}</code>
        </pre>
      );
    case "mermaid":
      return (
        <div className="stack stack-sm">
          <Diagram source={block.mermaid ?? ""} />
          {block.source && <SourceRefView ref={block.source} label="Fuente" />}
        </div>
      );
    default:
      return null;
  }
}