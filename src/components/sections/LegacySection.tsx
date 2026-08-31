"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { legacy } from "@/data/murec";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useVideoInView } from "@/hooks/useVideoInView";

registerGsap();

const TITLE_LINES = ["THE", "LEGACY", "BEYOND", "COMPARE"] as const;

export function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const videoRef = useVideoInView<HTMLVideoElement>();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (statRef.current) {
        const statEl = statRef.current;
        const targetValue = parseInt(legacy.stat, 10) || 78;
        const counter = { value: 0 };

        gsap.to(counter, {
          value: targetValue,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: statEl, start: "top 85%" },
          onUpdate: () => {
            if (!statEl.isConnected) return;
            statEl.textContent = `${Math.round(counter.value)}+`;
          },
          onComplete: () => {
            if (statEl.isConnected) statEl.textContent = legacy.stat;
          },
        });

        gsap.to(statRef.current, {
          x: 80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.from(titleRef.current!.querySelectorAll("[data-line]"), {
        x: -80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
      });

      gsap.from(mediaRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: { trigger: mediaRef.current, start: "top 82%" },
      });

      gsap.to(mediaRef.current!.querySelector("video"), {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(titleRef.current, {
        x: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(copyRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: copyRef.current, start: "top 88%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="relative min-h-[100svh] bg-ivory py-24 md:py-32"
    >
      <div className="px-[var(--grid-margin)]">
        <SectionMeta index="01" label="Legacy" location="Noida / India" className="mb-16 md:mb-24" />

        <div className="relative grid min-h-[70vh] gap-12 lg:grid-cols-12 lg:gap-0">
          <div
            ref={statRef}
            className="pointer-events-none absolute -left-4 top-0 z-0 font-display text-[clamp(8rem,22vw,20rem)] leading-none text-charcoal/6 md:-left-12 lg:-left-20"
            aria-hidden="true"
          >
            {legacy.stat}
          </div>

          <div ref={titleRef} className="relative z-10 lg:col-span-6 lg:pt-20">
            <h2 className="font-display text-display-sm text-charcoal">
              {TITLE_LINES.map((line) => (
                <span key={line} data-line className="block">
                  {line === "COMPARE" ? (
                    <span className="text-accent">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>
          </div>

          <div className="relative z-10 lg:col-span-5 lg:col-start-8">
            <div
              ref={mediaRef}
              className="mb-10 aspect-[3/4] overflow-hidden md:aspect-[4/5]"
            >
              <video
                ref={videoRef}
                className="h-[115%] w-full object-cover object-center"
                src={legacy.video}
                poster={legacy.image}
                muted
                loop
                playsInline
                preload="none"
              />
            </div>

            <div ref={copyRef} className="max-w-sm lg:ml-auto">
              <p className="mb-8 text-body text-muted">{legacy.copy}</p>
              <ArrowLink href={legacy.cta.href} label={legacy.cta.label} dark />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
