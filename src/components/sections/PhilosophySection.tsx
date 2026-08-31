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

const PANELS = 6;

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

      gsap.to(track.querySelector("[data-philo-img-a]"), {
        x: -100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(0, track.scrollWidth - window.innerWidth)}`,
          scrub: true,
        },
      });

      gsap.to(track.querySelector("[data-philo-meta]"), {
        x: 40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(0, track.scrollWidth - window.innerWidth)}`,
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
      className="section-pinned relative bg-ivory"
    >
      {isDesktop && !reducedMotion && (
        <HorizontalProgress current={panel} total={PANELS} label="Philosophy" />
      )}

      <div
        ref={trackRef}
        className="hidden h-[100svh] min-h-[640px] w-max items-stretch md:flex"
      >
        <div className="flex h-full w-screen shrink-0 flex-col justify-center px-[var(--grid-margin)]">
          <SectionMeta index="04" label="Philosophy" location="IGBC" className="mb-8" />
          <p className="text-meta mb-4 text-accent">{philosophy.badge}</p>
          <h2 className="font-display text-display-sm text-charcoal">
            {philosophy.title[0]}
          </h2>
        </div>

        <div className="flex h-full w-screen shrink-0 items-end px-[var(--grid-margin)] pb-24 md:w-[65vw]">
          <h2 className="font-display text-display-sm text-charcoal/15">
            {philosophy.title[1]}
          </h2>
        </div>

        <div
          data-philo-img-a
          className="flex h-full w-screen shrink-0 items-center justify-end px-[var(--grid-margin)] md:w-[70vw]"
        >
          <div className="aspect-[4/5] w-[min(42vw,480px)] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={philosophy.image}
              alt="Architectural sustainability visual"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex h-full w-screen shrink-0 items-center px-[var(--grid-margin)] md:w-[80vw]">
          <p className="max-w-lg font-sans text-base leading-relaxed text-muted md:ml-[10vw] md:text-lg">
            {philosophy.copy}
          </p>
        </div>

        <div className="relative flex h-full w-screen shrink-0 flex-col justify-center px-[var(--grid-margin)] md:w-[65vw]">
          <span
            data-philo-meta
            className="absolute top-24 right-[var(--grid-margin)] font-sans text-[9px] tracking-[0.4em] text-muted uppercase"
          >
            Long-term Impact
          </span>
          <ArrowLink href={philosophy.cta.href} label={philosophy.cta.label} dark />
        </div>

        <div
          className="flex h-full w-screen shrink-0 items-center px-[var(--grid-margin)] md:w-[75vw]"
        >
          <div className="aspect-[16/10] w-full max-w-3xl overflow-hidden">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={philosophy.video}
              poster={philosophy.image}
              muted
              loop
              playsInline
              preload="none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-14 px-[var(--grid-margin)] py-24 md:hidden">
        <span className="font-sans text-[10px] tracking-[0.4em] text-muted">{philosophy.index}</span>
        <p className="font-sans text-[10px] tracking-[0.35em] text-accent uppercase">
          {philosophy.badge}
        </p>
        <h2 className="font-display text-5xl leading-tight">{philosophy.title.join(" ")}</h2>
        <div className="aspect-[16/10] overflow-hidden">
          <video
            className="h-full w-full object-cover"
            src={philosophy.video}
            poster={philosophy.image}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        </div>
        <p className="font-sans text-base leading-relaxed text-muted">{philosophy.copy}</p>
        <ArrowLink href={philosophy.cta.href} label={philosophy.cta.label} dark />
      </div>
    </section>
  );
}
