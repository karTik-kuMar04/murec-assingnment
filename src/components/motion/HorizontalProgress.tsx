"use client";

type HorizontalProgressProps = {
  current: number;
  total: number;
  label?: string;
  variant?: "dark" | "light";
};

export function HorizontalProgress({
  current,
  total,
  label,
  variant = "dark",
}: HorizontalProgressProps) {
  const progress = total <= 1 ? 100 : ((current - 1) / (total - 1)) * 100;
  const isLight = variant === "light";

  return (
    <div
      className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-4 md:flex"
      aria-hidden="true"
    >
      {label && (
        <span
          className={`text-meta uppercase ${isLight ? "text-cream/50" : "text-muted"}`}
        >
          {label}
        </span>
      )}
      <span className={`text-meta font-medium ${isLight ? "text-cream/80" : "text-charcoal/80"}`}>
        {String(current).padStart(2, "0")}
      </span>
      <div
        className={`relative h-[2px] w-36 overflow-hidden rounded-full ${isLight ? "bg-cream/20" : "bg-charcoal/15"}`}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className={`text-meta ${isLight ? "text-cream/40" : "text-muted"}`}>
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
