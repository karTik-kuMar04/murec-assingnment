"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { principles } from "@/data/murec";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { HorizontalProgress } from "@/components/motion/HorizontalProgress";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { createHorizontalScroll } from "@/lib/animations/horizontalScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useVideoInView } from "@/hooks/useVideoInView";

registerGsap();

const PANELS = 5;

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useVideoInView<HTMLVideoElement>();
  const [panel, setPanel] = useState(1);
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    if (reducedMotion || !isDesktop) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      // Main horizontal pin & track
      createHorizontalScroll(section, track, {
        scrub: 1.2,
        onUpdate: (self) => {
          const index = Math.min(
            PANELS,
            Math.max(1, Math.ceil(self.progress * PANELS) || 1),
          );
          setPanel(index);
        },
      });

      // Layered horizontal velocity parallax for text & media
      const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track.querySelector("[data-principle-word-1]"), {
        x: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDist()}`,
          scrub: true,
        },
      });

      gsap.to(track.querySelector("[data-principle-word-2]"), {
        x: 60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDist()}`,
          scrub: true,
        },
      });

      gsap.to(track.querySelector("[data-principle-copy]"), {
        x: -60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDist()}`,
          scrub: true,
        },
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [reducedMotion, isDesktop]);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className="section-pinned relative bg-[#080808] text-cream"
    >
      {/* Full-bleed Video Background */}
      <div className="absolute inset-0 z-0 h-full w-full opacity-35 mix-blend-luminosity">
        <video
          ref={videoRef}
          className="h-[100svh] w-full object-cover object-center sticky top-0"
          src={principles.video}
          poster={principles.image}
          muted
          loop
          playsInline
          preload="none"
        />
        <div className="cinematic-vignette absolute inset-0 pointer-events-none sticky top-0 h-[100svh]" />
      </div>

      {/* Background grain */}
      <div className="grain absolute inset-0 opacity-30 pointer-events-none z-0" />

      {/* Scoped Horizontal Progress Bar */}
      {isDesktop && !reducedMotion && (
        <HorizontalProgress current={panel} total={PANELS} label="Principles" />
      )}

      {/* Desktop Horizontal Track */}
      <div
        ref={trackRef}
        className="relative z-10 hidden h-[100svh] min-h-[640px] w-max items-stretch md:flex"
      >
        {/* Panel 1: Intro & LIVING */}
        <div className="flex h-full w-screen shrink-0 flex-col justify-center px-[var(--grid-margin)]">
          <SectionMeta index="02" label="Principles" className="mb-10" />
          <h2
            data-principle-word-1
            className="font-display text-[clamp(4.5rem,13vw,11rem)] leading-none text-cream drop-shadow-2xl"
          >
            {principles.title[0]}
          </h2>
        </div>

        {/* Panel 2: BY */}
        <div className="flex h-full w-[70vw] shrink-0 items-center px-[var(--grid-margin)]">
          <h2
            data-principle-word-2
            className="font-display text-[clamp(4.5rem,13vw,11rem)] leading-none text-cream/40 drop-shadow-lg"
          >
            {principles.title[1]}
          </h2>
        </div>

        {/* Panel 3: PRINCIPLES */}
        <div className="flex h-full w-screen shrink-0 items-center px-[var(--grid-margin)]">
          <h2 className="font-display text-[clamp(4.5rem,13vw,11rem)] leading-none text-accent drop-shadow-2xl">
            {principles.title[2]}
          </h2>
        </div>

        {/* Panel 4: Narrative Copy */}
        <div
          data-principle-copy
          className="flex h-full w-[85vw] shrink-0 items-center px-[var(--grid-margin)]"
        >
          <div className="max-w-lg border-l border-cream/40 pl-8 drop-shadow-xl bg-charcoal/20 backdrop-blur-sm py-4">
            <p className="font-sans text-lg leading-relaxed text-cream/90 md:text-xl">
              {principles.copy}
            </p>
          </div>
        </div>

        {/* Panel 5: Call to Action */}
        <div className="flex h-full w-screen shrink-0 flex-col justify-center px-[var(--grid-margin)]">
          <div className="max-w-md drop-shadow-xl bg-charcoal/20 backdrop-blur-sm p-8 rounded-xl border border-cream/10">
            <p className="text-meta text-accent mb-4">OUR COMMITMENT</p>
            <h3 className="font-display text-4xl text-cream mb-8">
              Explore Our Core Principles
            </h3>
            <ArrowLink href={principles.cta.href} label={principles.cta.label} />
          </div>
        </div>
      </div>

      {/* Mobile Vertical Layout */}
      <div className="relative z-10 flex flex-col gap-12 px-[var(--grid-margin)] py-24 md:hidden">
        <SectionMeta index="02" label="Principles" />
        <h2 className="font-display text-5xl leading-tight text-cream drop-shadow-lg">
          {principles.title.join(" ")}
        </h2>
        <div className="bg-charcoal/30 backdrop-blur-md p-6 rounded-xl border border-cream/10">
          <p className="font-sans text-base leading-relaxed text-cream/90 mb-8">
            {principles.copy}
          </p>
          <ArrowLink href={principles.cta.href} label={principles.cta.label} />
        </div>
      </div>
    </section>
  );
}
