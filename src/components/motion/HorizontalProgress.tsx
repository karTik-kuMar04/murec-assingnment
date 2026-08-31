"use client";

type HorizontalProgressProps = {
  current: number;
  total: number;
  label?: string;
};

export function HorizontalProgress({
  current,
  total,
  label,
}: HorizontalProgressProps) {
  const progress = total <= 1 ? 100 : ((current - 1) / (total - 1)) * 100;

  return (
    <div
      className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-4 rounded-full border border-cream/10 bg-charcoal/70 px-5 py-2 backdrop-blur-md md:flex"
      aria-hidden="true"
    >
      {label && (
        <span className="text-meta uppercase text-cream/50">
          {label}
        </span>
      )}
      <span className="font-mono text-xs text-accent">
        {String(current).padStart(2, "0")}
      </span>
      <div className="relative h-[2px] w-32 overflow-hidden rounded-full bg-cream/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all duration-300 ease-out shadow-[0_0_6px_rgba(197,168,128,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="font-mono text-xs text-cream/40">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
