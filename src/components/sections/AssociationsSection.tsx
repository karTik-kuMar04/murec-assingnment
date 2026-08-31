"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { associations } from "@/data/murec";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { useReducedMotion } from "@/hooks/useReducedMotion";

registerGsap();

export function AssociationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  const rowA = [...associations.logos, ...associations.logos];
  const rowB = [...associations.logos.slice().reverse(), ...associations.logos.slice().reverse()];

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.from(sectionRef.current.querySelectorAll("[data-assoc-reveal]"), {
      y: 40,
      opacity: 0,
      duration: 1.1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !rowARef.current || !rowBRef.current) return;

    const tweenA = gsap.to(rowARef.current, {
      xPercent: -50,
      ease: "none",
      duration: 45,
      repeat: -1,
    });

    const tweenB = gsap.to(rowBRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 55,
      repeat: -1,
    });

    const container = sectionRef.current;
    const slow = () => {
      gsap.to([tweenA, tweenB], { timeScale: 0.2, duration: 0.8 });
    };
    const normal = () => {
      gsap.to([tweenA, tweenB], { timeScale: 1, duration: 0.8 });
    };

    container?.addEventListener("mouseenter", slow);
    container?.addEventListener("mouseleave", normal);

    return () => {
      tweenA.kill();
      tweenB.kill();
      container?.removeEventListener("mouseenter", slow);
      container?.removeEventListener("mouseleave", normal);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="associations"
      className="relative overflow-hidden bg-[#0d0d0c] py-32 text-cream md:py-40"
    >
      {/* Background grain */}
      <div className="grain absolute inset-0 opacity-20 pointer-events-none" />

      {/* Header Info */}
      <div className="mb-24 px-[var(--grid-margin)]">
        <SectionMeta index="05" label="Associations" className="mb-10" />
        <h2
          ref={titleRef}
          data-assoc-reveal
          className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] text-cream"
        >
          {associations.title[0]}
          <br />
          <span className="text-cream/25">{associations.title[1]}</span>
        </h2>
      </div>

      {/* Marquee Tracks with Cinematic Gradient Edges */}
      <div className="space-y-12" aria-label="Association partners">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0d0d0c] via-[#0d0d0c]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0d0d0c] via-[#0d0d0c]/80 to-transparent" />

          <div ref={rowARef} className="flex w-max gap-24 md:gap-36">
            {rowA.map((logo, i) => (
              <LogoItem key={`a-${logo.src}-${i}`} logo={logo} index={i} />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden opacity-50">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0d0d0c] via-[#0d0d0c]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0d0d0c] via-[#0d0d0c]/80 to-transparent" />

          <div ref={rowBRef} className="flex w-max gap-24 md:gap-36">
            {rowB.map((logo, i) => (
              <LogoItem key={`b-${logo.src}-${i}`} logo={logo} index={i} small />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoItem({
  logo,
  index,
  small = false,
}: {
  logo: { src: string; alt: string };
  index: number;
  small?: boolean;
}) {
  return (
    <div
      className={`group flex shrink-0 flex-col items-center gap-3 transition-opacity ${
        small ? "w-36 md:w-44" : "w-44 md:w-56"
      }`}
    >
      <span className="font-mono text-[9px] tracking-[0.3em] text-accent/60">
        {String((index % 6) + 1).padStart(2, "0")}
      </span>
      <div
        className={`flex w-full items-center justify-center rounded-sm border border-cream/[0.06] bg-charcoal/40 p-4 transition-all duration-500 group-hover:scale-105 group-hover:border-cream/20 ${
          small ? "h-16 md:h-20" : "h-24 md:h-28"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.src}
          alt={logo.alt}
          className="max-h-full max-w-full object-contain brightness-0 invert opacity-60 transition-all duration-300 group-hover:opacity-100"
          loading="lazy"
        />
      </div>
    </div>
  );
}
