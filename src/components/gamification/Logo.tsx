import { cn } from "../../utils/cn";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const SIZES = { sm: 32, md: 40, lg: 52 };

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="var(--gradient-race)" />
      <path
        d="M12 20h12v6H12zM28 20h12v6H28zM44 20h8v6h-8z"
        fill="rgba(255,255,255,0.95)"
      />
      <path
        d="M12 32h12v6H12zM28 32h12v6H28zM44 32h8v6h-8z"
        fill="rgba(15,18,26,0.85)"
      />
      <path d="M26 46l14-16v7L26 53z" fill="#fff" opacity="0.9" />
    </svg>
  );
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  return (
    <div className={cn("brand", className)}>
      <LogoMark size={SIZES[size]} />
      {showText && (
        <div>
          <div className="brand-name">POO Racing Academy</div>
          <div className="brand-sub" style={{ fontSize: "0.6rem" }}>
            Aprende · Practica · Domina
          </div>
        </div>
      )}
    </div>
  );
}