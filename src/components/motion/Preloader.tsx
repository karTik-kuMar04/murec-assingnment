"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

type PreloaderProps = {
  onComplete: () => void;
};

const LETTERS = ["M", "U", "R", "E", "C"];

export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    const progressLine = progressLineRef.current;
    const percentEl = percentRef.current;
    const statusEl = statusRef.current;

    if (!root || !progressLine || !percentEl) {
      onComplete();
      return;
    }

    const countObj = { val: 0 };
    const statuses = [
      "INITIALIZING ARCHITECTURAL ARCHIVES",
      "CURATING LIVING SPACES",
      "PREPARING RESIDENTIAL EXPERIENCE",
      "PORTFOLIO READY",
    ];

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(progressLine, { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-loader-meta]", { opacity: 0, y: -8 });
      gsap.set("[data-loader-letter]", { opacity: 0, y: 32, filter: "blur(6px)" });
      gsap.set("[data-loader-sub]", { opacity: 0, y: 12 });
      gsap.set("[data-loader-bar]", { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          onComplete();
        },
      });

      // Intro sequence
      tl.to("[data-loader-meta]", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      }, 0.1)
        .to("[data-loader-letter]", {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
        }, 0.2)
        .to("[data-loader-sub]", {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        }, 0.5)
        .to("[data-loader-bar]", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }, 0.4);

      // Loading progress animation
      tl.to(
        progressLine,
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power2.inOut",
        },
        0.3,
      );

      // Counter animation
      tl.to(
        countObj,
        {
          val: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            const current = Math.round(countObj.val);
            if (percentEl) {
              percentEl.textContent = `${String(current).padStart(2, "0")}%`;
            }
            if (statusEl) {
              const statusIndex = Math.min(
                statuses.length - 1,
                Math.floor((current / 100) * statuses.length),
              );
              statusEl.textContent = statuses[statusIndex];
            }
          },
        },
        0.3,
      );

      // Hold briefly at 100%
      tl.to({}, { duration: 0.2 });

      // Outro transition
      tl.to(
        "[data-loader-content]",
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power3.in",
        },
      )
        .to(
          "[data-loader-meta]",
          {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          "<",
        )
        .to(
          root,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.85,
            ease: "power4.inOut",
          },
          "-=0.1",
        );
    }, root);

    return () => ctx.revert();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-charcoal text-cream select-none overflow-hidden"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden="true"
    >
      {/* Background ambient lighting and noise */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(154,123,90,0.15),transparent_75%)]" />
      <div className="grain absolute inset-0 opacity-20 pointer-events-none" />

      {/* Top framing bar */}
      <div className="relative z-10 flex items-center justify-between px-[var(--grid-margin)] pt-8 md:pt-10">
        <div data-loader-meta className="flex items-center gap-3 text-meta text-cream/40">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span>MUREC ARCHIVES</span>
        </div>
        <span data-loader-meta className="text-meta text-cream/40 hidden sm:inline">
          EST. 1954 • NOIDA / INDIA
        </span>
      </div>

      {/* Centerpiece */}
      <div data-loader-content className="relative z-10 flex flex-col items-center justify-center px-6 text-center my-auto">
        <div className="flex items-center justify-center gap-2 sm:gap-4 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.25em] text-cream">
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              data-loader-letter
              className="inline-block transform-gpu"
            >
              {letter}
            </span>
          ))}
        </div>

        <div data-loader-sub className="mt-4 flex flex-col items-center gap-2">
          <div className="h-px w-16 bg-accent/50 my-1" />
          <p className="text-meta tracking-[0.22em] text-cream/60 max-w-md">
            Madhusudan Urban Real Estate Collection
          </p>
        </div>

        {/* Progress & Counter */}
        <div data-loader-bar className="mt-12 flex flex-col items-center gap-3 w-full max-w-xs sm:max-w-sm">
          <div className="flex w-full items-center justify-between text-meta text-cream/50">
            <p ref={statusRef} className="text-[9px] tracking-[0.2em] text-accent truncate">
              INITIALIZING ARCHIVES
            </p>
            <span ref={percentRef} className="font-mono text-xs text-cream/80 tabular-nums">
              00%
            </span>
          </div>

          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-cream/10">
            <div
              ref={progressLineRef}
              className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-accent/60 via-accent to-cream/90 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom framing bar */}
      <div className="relative z-10 flex items-center justify-between px-[var(--grid-margin)] pb-8 md:pb-10">
        <span data-loader-meta className="text-meta text-cream/35">
          IGBC GREEN CERTIFIED
        </span>
        <span data-loader-meta className="text-meta text-cream/35">
          SEVEN DECADES OF LEGACY
        </span>
      </div>
    </div>
  );
}
