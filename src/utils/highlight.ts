export type HighlightLanguage = "java" | "dart" | "text";

const KEYWORDS =
  /\b(public|private|protected|static|final|abstract|class|interface|enum|extends|implements|super|this|new|return|void|int|double|long|float|char|boolean|String|List|Map|Set|null|true|false|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|throws|package|import|override|assert|var|const|record|sealed|non-sealed)\b/;

interface Token {
  type: "kw" | "str" | "num" | "com" | "ann" | "type" | "text";
  value: string;
}

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const push = (type: Token["type"], value: string) => {
    tokens.push({ type, value });
  };

  while (i < line.length) {
    const rest = line.slice(i);

    const str = rest.match(/^"(\\.|[^"\\])*"?/);
    if (str) {
      push("str", str[0]);
      i += str[0].length;
      continue;
    }

    const com = rest.match(/^\/\*[\s\S]*?\*\//) || rest.match(/^\/\/[^\n]*/);
    if (com) {
      push("com", com[0]);
      i += com[0].length;
      continue;
    }

    const ann = rest.match(/^@[A-Za-z_][\w.]*/);
    if (ann) {
      push("ann", ann[0]);
      i += ann[0].length;
      continue;
    }

    const num = rest.match(/^\b\d+(\.\d+)?\b/);
    if (num) {
      push("num", num[0]);
      i += num[0].length;
      continue;
    }

    const kw = rest.match(/^[A-Za-z_$][\w$]*/);
    if (kw) {
      const word = kw[0];
      if (KEYWORDS.test(word)) {
        push("kw", word);
      } else if (/^[A-Z]/.test(word)) {
        push("type", word);
      } else {
        push("text", word);
      }
      i += word.length;
      continue;
    }

    const single = rest[0] ? 1 : 0;
    push("text", line.slice(i, i + (single || 0)));
    if (!single) break;
    i += single || 0;
  }

  return tokens;
}

export function highlightLine(line: string): string {
  const tokens = tokenize(line);
  let html = "";
  for (const t of tokens) {
    if (t.type === "text") {
      html += escapeHtml(t.value);
    } else {
      html += `<span class="tok-${t.type}">${escapeHtml(t.value)}</span>`;
    }
  }
  return html;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Clases CSS que el resaltador puede emitir (las define components.css). */
export const TOKEN_CLASSES = [".tok-kw", ".tok-str", ".tok-num", ".tok-com", ".tok-ann", ".tok-type"];