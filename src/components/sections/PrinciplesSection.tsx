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
      createHorizontalScroll(section, track, {
        scrub: 1,
        onUpdate: (self) => {
          const index = Math.min(
            PANELS,
            Math.max(1, Math.ceil(self.progress * PANELS) || 1),
          );
          setPanel(index);
        },
      });

      gsap.to(track.querySelector("[data-principle-media]"), {
        x: 60,
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
      id="principles"
      className="section-pinned relative bg-charcoal text-cream"
    >
      {isDesktop && !reducedMotion && (
        <HorizontalProgress current={panel} total={PANELS} label="Principles" variant="light" />
      )}

      <div
        ref={trackRef}
        className="hidden h-[100svh] min-h-[600px] w-max items-stretch md:flex"
      >
        <div className="flex h-full w-screen shrink-0 flex-col justify-center px-[var(--grid-margin)]">
          <SectionMeta index="02" label="Principles" light className="mb-10" />
          <h2 className="font-display text-display text-cream">{principles.title[0]}</h2>
        </div>

        <div className="flex h-full w-[80vw] shrink-0 items-center px-[var(--grid-margin)] md:w-screen">
          <h2 className="font-display text-display text-cream/15">{principles.title[1]}</h2>
        </div>

        <div className="relative flex h-full w-screen shrink-0 items-center overflow-hidden px-[var(--grid-margin)]">
          <h2 className="relative z-10 font-display text-display text-accent">{principles.title[2]}</h2>
          <div
            data-principle-media
            className="absolute right-[var(--grid-margin)] aspect-[3/4] w-[min(34vw,380px)] overflow-hidden opacity-35"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={principles.video}
              poster={principles.image}
              muted
              loop
              playsInline
              preload="none"
            />
          </div>
        </div>

        <div className="flex h-full w-[90vw] shrink-0 items-center px-[var(--grid-margin)] md:w-screen">
          <p className="max-w-md text-body text-cream/65">{principles.copy}</p>
        </div>

        <div className="flex h-full w-screen shrink-0 flex-col justify-center px-[var(--grid-margin)]">
          <ArrowLink href={principles.cta.href} label={principles.cta.label} />
        </div>
      </div>

      <div className="flex flex-col gap-10 px-[var(--grid-margin)] py-20 md:hidden">
        <SectionMeta index="02" label="Principles" light />
        <h2 className="font-display text-heading text-cream">{principles.title.join(" ")}</h2>
        <div className="aspect-[16/10] overflow-hidden">
          <video
            className="h-full w-full object-cover"
            src={principles.video}
            poster={principles.image}
            muted
            loop
            playsInline
            preload="none"
          />
        </div>
        <p className="text-body text-cream/65">{principles.copy}</p>
        <ArrowLink href={principles.cta.href} label={principles.cta.label} />
      </div>
    </section>
  );
}
