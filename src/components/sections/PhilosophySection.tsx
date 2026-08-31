"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { philosophy } from "@/data/murec";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { HorizontalProgress } from "@/components/motion/HorizontalProgress";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { createHorizontalScroll } from "@/lib/animations/horizontalScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useVideoInView } from "@/hooks/useVideoInView";

registerGsap();

const PANELS = 4;

export function PhilosophySection() {
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
      // Horizontal scroll pinning
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

      const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth);

      // Vertical IGBC badge rise
      gsap.fromTo(
        track.querySelector("[data-philo-badge]"),
        { y: 60, opacity: 0 },
        {
          y: -20,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDist() * 0.4}`,
            scrub: true,
          },
        },
      );

      // Rotating architectural metadata tag
      gsap.to(track.querySelector("[data-philo-meta]"), {
        x: 80,
        rotation: 4,
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
      id="philosophy"
      className="section-pinned relative bg-[#0a0a09] text-cream"
    >
      {/* Full-bleed Video Background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <video
          ref={videoRef}
          className="h-[100svh] w-full object-cover object-center sticky top-0"
          src={philosophy.video}
          poster={philosophy.image}
          muted
          loop
          playsInline
          preload="none"
        />
      </div>

      {/* Background grain */}
      <div className="grain absolute inset-0 opacity-20 pointer-events-none z-0" />

      {/* Scoped Horizontal Progress Bar */}
      {isDesktop && !reducedMotion && (
        <HorizontalProgress current={panel} total={PANELS} label="Philosophy" />
      )}

      {/* Desktop Horizontal Track */}
      <div
        ref={trackRef}
        className="relative z-10 hidden h-[100svh] min-h-[640px] w-max items-stretch md:flex"
      >
        {/* Panel 1: IGBC Badge & Title 1 */}
        <div className="relative flex h-full w-screen shrink-0 flex-col justify-center px-[var(--grid-margin)]">
          {/* Section meta pinned to top so it never overlaps the heading */}
          <div className="absolute top-10 left-[var(--grid-margin)]">
            <SectionMeta index="04" label="Philosophy" location="IGBC Green" />
          </div>
          <div data-philo-badge className="mb-4 inline-flex items-center gap-2 drop-shadow-md">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-sans text-xs tracking-[0.3em] text-accent uppercase font-medium">
              {philosophy.badge}
            </span>
          </div>
          <h2 className="font-display text-[clamp(4.5rem,12vw,10.5rem)] leading-none text-cream drop-shadow-2xl">
            {philosophy.title[0]}
          </h2>
        </div>

        {/* Panel 2: Title 2 Large Ghost Typography */}
        <div className="flex h-full w-screen shrink-0 items-end px-[var(--grid-margin)] pb-28">
          <h2 className="font-display text-[clamp(4.5rem,12vw,10.5rem)] leading-none text-cream/40 drop-shadow-lg">
            {philosophy.title[1]}
          </h2>
        </div>

        {/* Panel 3: Narrative Philosophy */}
        <div className="flex h-full w-screen shrink-0 items-center px-[var(--grid-margin)]">
          <div className="max-w-xl border-l border-accent/40 pl-8 bg-charcoal/20 backdrop-blur-sm py-6 drop-shadow-xl">
            <p className="font-sans text-base leading-relaxed text-cream/90 md:text-lg">
              {philosophy.copy}
            </p>
          </div>
        </div>

        {/* Panel 4: Metadata Tag & CTA */}
        <div className="relative flex h-full w-screen shrink-0 flex-col justify-center px-[var(--grid-margin)]">
          <span
            data-philo-meta
            className="absolute top-28 right-[var(--grid-margin)] font-sans text-[10px] tracking-[0.4em] text-accent uppercase font-medium drop-shadow-md"
          >
            Long-term Environmental Impact
          </span>
          <div className="max-w-md bg-charcoal/20 backdrop-blur-sm p-8 rounded-xl border border-cream/10 drop-shadow-xl">
            <h3 className="font-display text-4xl text-cream mb-6">
              Sustainable Living Environments
            </h3>
            <ArrowLink href={philosophy.cta.href} label={philosophy.cta.label} />
          </div>
        </div>
      </div>

      {/* Mobile Vertical Layout */}
      <div className="relative z-10 flex flex-col gap-12 px-[var(--grid-margin)] py-24 md:hidden">
        <SectionMeta index="04" label="Philosophy" location="IGBC Green" />
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-sans text-xs tracking-[0.25em] text-accent uppercase">
            {philosophy.badge}
          </span>
        </div>
        <h2 className="font-display text-5xl leading-tight text-cream drop-shadow-lg">
          {philosophy.title.join(" ")}
        </h2>
        <div className="bg-charcoal/30 backdrop-blur-md p-6 rounded-xl border border-cream/10">
          <p className="font-sans text-base leading-relaxed text-cream/90 mb-8">
            {philosophy.copy}
          </p>
          <ArrowLink href={philosophy.cta.href} label={philosophy.cta.label} />
        </div>
      </div>
    </section>
  );
}
