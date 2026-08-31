"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 h-[1.5px] w-full bg-cream/[0.04]"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-accent/90 transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(197,168,128,0.4)]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
