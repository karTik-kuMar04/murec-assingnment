"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { legacy } from "@/data/murec";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useVideoInView } from "@/hooks/useVideoInView";

registerGsap();

export function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const word4Ref = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const videoRef = useVideoInView<HTMLVideoElement>();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Play video slow and ensure it does not loop
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, [videoRef]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Counter animation for 78+
      if (statRef.current) {
        const statEl = statRef.current;
        const targetValue = parseInt(legacy.stat, 10) || 78;
        const counter = { value: 0 };

        gsap.to(counter, {
          value: targetValue,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: { trigger: statEl, start: "top 85%" },
          onUpdate: () => {
            if (!statEl.isConnected) return;
            statEl.textContent = `${Math.round(counter.value)}+`;
          },
          onComplete: () => {
            if (statEl.isConnected) statEl.textContent = legacy.stat;
          },
        });

        // Parallax depth for background 78+ number
        gsap.to(statEl, {
          y: -120,
          x: 40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Layered distinct typography entrance
      if (word1Ref.current) {
        gsap.from(word1Ref.current, {
          x: -120,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: word1Ref.current, start: "top 85%" },
        });
      }

      if (word2Ref.current) {
        gsap.from(word2Ref.current, {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: word2Ref.current, start: "top 85%" },
        });
      }

      if (word3Ref.current) {
        gsap.fromTo(
          word3Ref.current,
          { clipPath: "inset(100% 0% 0% 0%)", y: 40, opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: "power4.out",
            scrollTrigger: { trigger: word3Ref.current, start: "top 85%" },
          },
        );
      }

      if (word4Ref.current) {
        gsap.from(word4Ref.current, {
          y: 60,
          opacity: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: word4Ref.current, start: "top 85%" },
        });
      }

      // Copy text reveal
      if (copyRef.current) {
        gsap.from(copyRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: copyRef.current, start: "top 88%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="relative min-h-[100svh] overflow-hidden bg-[#0b0b0a] py-28 text-cream md:py-36"
    >
      {/* Full-bleed Archive Video Background */}
      <div className="absolute inset-0 z-0 h-full w-full opacity-35 mix-blend-luminosity">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          src={legacy.video}
          poster={legacy.image}
          muted
          playsInline
          preload="none"
        />
        <div className="cinematic-vignette absolute inset-0 pointer-events-none" />
      </div>

      {/* Background ambient lighting and noise */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_40%,rgba(197,168,128,0.06),transparent_60%)]" />
      <div className="grain absolute inset-0 z-0 opacity-30 pointer-events-none" />

      {/* Floating 78+ Year Legacy Stat in Depth */}
      <div
        ref={statRef}
        className="pointer-events-none absolute top-12 -left-6 z-10 select-none font-display text-[clamp(9rem,26vw,24rem)] font-light leading-none text-cream/[0.15] md:-left-12 lg:-left-16"
        aria-hidden="true"
      >
        {legacy.stat}
      </div>

      <div className="relative z-20 px-[var(--grid-margin)]">
        <SectionMeta index="01" label="Legacy" location="Noida / India" className="mb-16 md:mb-24" />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Asymmetrical Display Typography */}
          <div className="lg:col-span-6 lg:pt-10">
            <h2 className="font-display text-[clamp(2.75rem,7.5vw,5.75rem)] leading-[0.92] text-cream drop-shadow-2xl">
              <span ref={word1Ref} className="block transform-gpu">
                THE
              </span>
              <span ref={word2Ref} className="block transform-gpu text-cream/80">
                LEGACY
              </span>
              <span ref={word3Ref} className="block transform-gpu">
                BEYOND
              </span>
              <span ref={word4Ref} className="block transform-gpu text-accent">
                COMPARE
              </span>
            </h2>

            <div className="mt-12 hidden lg:block max-w-xs border-l border-accent/40 pl-6 drop-shadow-lg">
              <p className="font-sans text-[11px] tracking-[0.2em] text-cream/60 uppercase">
                {legacy.statLabel}
              </p>
              <p className="font-display text-2xl text-cream/90 mt-1">
                Preserving Heritage Across Generations
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-end lg:pb-12">
            <div className="mb-12 text-meta text-accent drop-shadow-sm font-medium lg:ml-auto w-full max-w-md">
              ARCHIVE · MADHUSUDAN
            </div>

            <div ref={copyRef} className="max-w-md lg:ml-auto drop-shadow-xl">
              <p className="mb-8 font-sans text-base leading-relaxed text-cream/90 md:text-lg">
                {legacy.copy}
              </p>
              <ArrowLink href={legacy.cta.href} label={legacy.cta.label} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
