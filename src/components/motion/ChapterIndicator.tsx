"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "hero", index: "00", label: "Intro" },
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

  return (
    <div
      className="pointer-events-none fixed right-[var(--grid-margin)] bottom-8 z-40 hidden flex-col items-end gap-0.5 rounded-sm bg-ivory/80 px-3 py-2 backdrop-blur-sm md:flex"
      aria-hidden="true"
    >
      <span className="text-meta text-muted">{current.index}</span>
      <span className="font-display text-sm text-charcoal/70">{current.label}</span>
    </div>
  );
}
