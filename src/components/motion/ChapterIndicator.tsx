"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "hero", index: "00", label: "Overview" },
  { id: "legacy", index: "01", label: "Legacy" },
  { id: "principles", index: "02", label: "Principles" },
  { id: "collection", index: "03", label: "Collection" },
  { id: "philosophy", index: "04", label: "Philosophy" },
  { id: "associations", index: "05", label: "Associations" },
  { id: "partners", index: "06", label: "Partners" },
  { id: "contact", index: "07", label: "Contact" },
] as const;

type Chapter = (typeof CHAPTERS)[number];

export function ChapterIndicator() {
  const [current, setCurrent] = useState<Chapter>(CHAPTERS[0]);

  useEffect(() => {
    const ids = CHAPTERS.map((c) => c.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = CHAPTERS.find((c) => c.id === entry.target.id);
            if (match) setCurrent(match);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Don't show on hero for cleaner initial viewport
  if (current.id === "hero") return null;

  return (
    <div
      className="pointer-events-none fixed right-[var(--grid-margin)] bottom-8 z-40 hidden flex-col items-end gap-0.5 rounded-full bg-charcoal/70 px-4 py-2 border border-cream/10 backdrop-blur-md transition-all duration-500 md:flex"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-accent animate-pulse" />
        <span className="font-mono text-[9px] tracking-widest text-accent">
          {current.index} / 07
        </span>
      </div>
      <span className="font-display text-xs tracking-wider text-cream/90 uppercase">
        {current.label}
      </span>
    </div>
  );
}
