import { useState } from "react";
import { cn } from "../../utils/cn";
import { escapeHtml, highlightLine, type HighlightLanguage } from "../../utils/highlight";
import { IconButton } from "./icons";

interface CodeBlockProps {
  code: string;
  language?: HighlightLanguage;
  title?: string;
  showLineNumbers?: boolean;
  maxHeight?: number;
  className?: string;
}

function plainLines(code: string): string[] {
  return code.replace(/\n$/, "").split("\n");
}

export function CodeBlock({
  code,
  language = "java",
  title,
  showLineNumbers = true,
  maxHeight,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const lines = plainLines(code);
  const tokenized = language === "text";

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* portapapeles no disponible */
    }
  };

  const html = lines
    .map((line, idx) => {
      const content = tokenized ? escapeHtml(line) : highlightLine(line);
      return showLineNumbers
        ? `<span class="ln">${idx + 1}</span>${content}`
        : content;
    })
    .join("\n");

  return (
    <div className={cn("codeblock", className)}>
      <div className="codeblock-head">
        <span className="dot dot-r" />
        <span className="dot dot-y" />
        <span className="dot dot-g" />
        <span className="codeblock-lang">{language}</span>
        {title && <span className="codeblock-title">{title}</span>}
        <div style={{ marginLeft: "auto" }}>
          <IconButton name="copy" label="Copiar código" title="Copiar" onClick={onCopy} />
        </div>
      </div>
      <pre style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      {copied && (
        <span
          style={{
            position: "absolute",
            top: 34,
            right: 12,
            zIndex: 10,
            padding: "4px 10px",
            borderRadius: 6,
            background: "var(--success)",
            color: "#fff",
            fontSize: "var(--text-xs)",
            fontWeight: 700,
          }}
        >
          ✓ Copiado
        </span>
      )}
    </div>
  );
}