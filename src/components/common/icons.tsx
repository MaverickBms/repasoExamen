import type { CSSProperties, ReactNode, Ref } from "react";
import { cn } from "../../utils/cn";

export type IconName =
  | "home"
  | "road"
  | "book"
  | "flask"
  | "trophy"
  | "diagram"
  | "bank"
  | "timer"
  | "glossary"
  | "refresh"
  | "chart"
  | "sun"
  | "moon"
  | "menu"
  | "x"
  | "check"
  | "error"
  | "info"
  | "warning"
  | "copy"
  | "check"
  | "chevronDown"
  | "chevronRight"
  | "flag"
  | "spark"
  | "lock"
  | "code"
  | "star";

interface IconDef {
  d: string[];
  fillCurrent?: boolean;
}

const PATHS: Record<IconName, IconDef> = {
  home: { d: ["M3 10.5 12 3l9 7.5", "M5 9.5V21h14V9.5"] },
  road: { d: ["M12 3v4", "M12 17v4", "M4 6l4 1", "M20 18l-4 1", "M4 12h16"] },
  book: { d: ["M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5z", "M8 3v18"] },
  flask: {
    d: [
      "M10 3h4",
      "M9 3v5L4.5 17a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L15 8V3",
    ],
  },
  trophy: {
    d: [
      "M6 4h12v3a6 6 0 0 1-12 0V4z",
      "M6 5H3.5v1.5A3.5 3.5 0 0 0 7 10",
      "M18 5h2.5v1.5a3.5 3.5 0 0 1-3.5 3.5",
      "M12 14v4",
      "M8 21h8",
      "M12 18v3",
    ],
  },
  diagram: {
    d: [
      "M4 5h6v5H4z",
      "M14 4h6v5h-6z",
      "M9 15h6v5H9z",
      "M7 10v5",
      "M14 5.5h3",
      "M12 8l2-2.5",
    ],
  },
  bank: {
    d: [
      "M3 21h18",
      "M5 21V10",
      "M12 21V10",
      "M19 21V10",
      "M3 13h18",
      "M5 7l7-4 7 4",
    ],
  },
  timer: {
    d: [
      "M15.5 2h-7",
      "M12 2v2",
      "M12 13.5 15.5 11",
    ],
  },
  glossary: {
    d: [
      "M12 5C10.5 3.5 8 3 5 3v16c3 0 5.5.5 7 2 1.5-1.5 4-2 7-2V3c-3 0-5.5.5-7 2z",
      "M12 5v16",
    ],
  },
  refresh: {
    d: [
      "M20 12a8 8 0 1 1-2.34-5.66",
      "M20 4v4h-4",
    ],
  },
  chart: { d: ["M4 20V10", "M10 20V4", "M16 20v-7", "M21 20H3"] },
  sun: {
    d: [
      "M12 4V2",
      "M12 22v-2",
      "M4.9 4.9 3.5 3.5",
      "M20.5 20.5l-1.4-1.4",
      "M2 12h2",
      "M20 12h2",
      "M4.9 19.1l-1.4 1.4",
      "M20.5 3.5l-1.4 1.4",
    ],
  },
  moon: {
    d: ["M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"],
  },
  menu: { d: ["M4 6h16", "M4 12h16", "M4 18h16"] },
  x: { d: ["M6 6l12 12", "M18 6L6 18"] },
  check: { d: ["M20 6 9 17l-5-5"] },
  error: { d: ["M9 9l6 6", "M15 9l-6 6"] },
  info: { d: ["M12 8h.01", "M12 11v5"] },
  warning: {
    d: ["M12 3 1.9 20.5h20.2L12 3z", "M12 10v4", "M12 17.5h.01"],
    fillCurrent: true,
  },
  copy: {
    d: [
      "M9 15V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z",
      "M5 19V9a2 2 0 0 1 2-2",
    ],
  },
  chevronDown: { d: ["m6 9 6 6 6-6"] },
  chevronRight: { d: ["m9 6 6 6-6 6"] },
  flag: {
    d: [
      "M5 21V4",
      "M5 4c2-1 4-1 6 0s4 1 6 0l2-1v9l-2 1c-2-1-4-1-6 0s-4 1-6 0",
    ],
  },
  spark: { d: ["M13 2 4 14h6l-1 8 9-12h-6l1-8z"] },
  lock: {
    d: [
      "M8 11V7a4 4 0 0 1 8 0v4",
      "M6 11h12a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a1 1 0 0 1 1-1z",
    ],
  },
  code: { d: ["m8 6-6 6 6 6", "m16 6 6 6-6 6"] },
  star: { d: ["m12 3 2.7 5.5 6 .9-4.35 4.2 1 6L12 17l-5.35 2.6 1-6L3.3 9.4l6-.9L12 3z"] },
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}

export function Icon({ name, size = 20, className, strokeWidth = 2, style }: IconProps) {
  const def = PATHS[name];
  const extra: Record<string, unknown> = {};
  if (def.fillCurrent) {
    extra.fill = "currentColor";
    extra.stroke = "none";
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn("icon", className)}
      style={style}
      {...extra}
    >
      {def.d.map((d) => (
        <path
          key={d}
          d={d}
          fill={def.fillCurrent ? "currentColor" : "none"}
          stroke={def.fillCurrent ? "none" : "currentColor"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

interface IconButtonProps {
  name: IconName;
  label: string;
  onClick?: () => void;
  size?: number;
  className?: string;
  title?: string;
  ref?: Ref<HTMLButtonElement>;
}

export function IconButton({
  name,
  label,
  onClick,
  size = 18,
  className,
  title,
  ref,
}: IconButtonProps) {
  return (
    <button
      type="button"
      ref={ref}
      className={cn("icon-btn", className)}
      onClick={onClick}
      title={title ?? label}
      aria-label={label}
    >
      <Icon name={name} size={size} />
    </button>
  );
}

export function SpinnerIcon({ className }: { className?: string }) {
  return <span role="img" aria-label="cargando" className={cn("spinner", className)} />;
}

export function CheckerStrip({ className }: { className?: string }): ReactNode {
  return <div aria-hidden="true" className={cn("checker-strip", className)} />;
}