"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { associations } from "@/data/murec";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { useReducedMotion } from "@/hooks/useReducedMotion";

registerGsap();

registerGsap();

export function AssociationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const rowA = [...associations.logos, ...associations.logos];
  const rowB = [...associations.logos.slice().reverse(), ...associations.logos.slice().reverse()];

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current.querySelectorAll("[data-assoc-reveal]"), {
      y: 50,
      opacity: 0,
      duration: 1.1,
      stagger: 0.08,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  useEffect(() => {
    if (reducedMotion || !rowARef.current || !rowBRef.current) return;

    const tweenA = gsap.to(rowARef.current, {
      xPercent: -50,
      ease: "none",
      duration: 50,
      repeat: -1,
    });

    const tweenB = gsap.to(rowBRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 65,
      repeat: -1,
    });

    const container = sectionRef.current;
    const slow = () => {
      gsap.to([tweenA, tweenB], { timeScale: 0.25, duration: 0.6 });
    };
    const normal = () => {
      gsap.to([tweenA, tweenB], { timeScale: 1, duration: 0.6 });
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
      className="overflow-hidden bg-charcoal py-28 text-cream md:py-36"
    >
      <div className="mb-20 px-[var(--grid-margin)]">
        <SectionMeta index="05" label="Associations" light className="mb-10" />
        <h2 data-assoc-reveal className="font-display text-display-sm text-cream">
          {associations.title[0]}
          <br />
          <span className="text-cream/30">{associations.title[1]}</span>
        </h2>
      </div>

      <div className="space-y-10" aria-label="Association logos">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-charcoal to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-charcoal to-transparent" />
          <div ref={rowARef} className="flex w-max gap-20 md:gap-28">
            {rowA.map((logo, i) => (
              <LogoItem key={`a-${logo.src}-${i}`} logo={logo} index={i} />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden opacity-60">
          <div ref={rowBRef} className="flex w-max gap-20 md:gap-28">
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
      className={`group flex shrink-0 flex-col items-center gap-3 ${small ? "w-32 md:w-36" : "w-40 md:w-48"}`}
    >
      <span className="font-sans text-[9px] tracking-[0.35em] text-cream/25">
        {String((index % 6) + 1).padStart(2, "0")}
      </span>
      <div
        className={`flex w-full items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
          small ? "h-14 md:h-16" : "h-20 md:h-24"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.src}
          alt={logo.alt}
          className="max-h-full max-w-full object-contain brightness-0 invert opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          loading="lazy"
        />
      </div>
    </div>
  );
}
