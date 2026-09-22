import type { CSSProperties } from "react";
import { cn } from "../../utils/cn";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  radius?: string;
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({
  width = "100%",
  height = 14,
  radius,
  className,
  style,
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("skel", className)}
      style={{
        width,
        height,
        ...(radius ? { borderRadius: radius } : {}),
        ...style,
      }}
    />
  );
}

export function SkeletonBlock({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("stack stack-md", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={i === lines - 1 ? "62%" : "100%"} height={13} />
      ))}
    </div>
  );
}