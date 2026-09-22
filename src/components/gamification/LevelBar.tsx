import { cn } from "../../utils/cn";

interface LevelBarProps {
  level: number;
  name: string;
  xp: number;
  xpToNext: number;
  className?: string;
}

export function LevelBar({ level, name, xp, xpToNext, className }: LevelBarProps) {
  const pct = Math.min(100, Math.round((xp / Math.max(1, xpToNext)) * 100));
  return (
    <div className={cn("levelbar", className)}>
      <div className="levelbar-badge">{level}</div>
      <div className="levelbar-info">
        <div className="row-between">
          <span className="levelbar-name">{name}</span>
          <span className="levelbar-xp">
            {xp} / {xpToNext} XP
          </span>
        </div>
        <div className="progress progress-thin" style={{ marginTop: "var(--sp-2)" }}>
          <div className="progress-fill progress-tone-gold" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}