type Falsy = false | null | undefined | 0 | "";

export function cn(
  ...parts: Array<string | Falsy | { [cls: string]: boolean | undefined } | undefined>
): string {
  const out: string[] = [];
  for (const part of parts) {
    if (!part) continue;
    if (typeof part === "string") {
      out.push(part);
    } else {
      for (const [cls, on] of Object.entries(part)) {
        if (on) out.push(cls);
      }
    }
  }
  return out.join(" ");
}