"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap, registerGsap } from "@/lib/gsap";
import { hero } from "@/data/murec";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AudioControl } from "@/components/ui/AudioControl";
import { useReducedMotion } from "@/hooks/useReducedMotion";

registerGsap();

const LETTERS = ["M", "U", "R", "E", "C"] as const;
const TAGLINE_LINES = [
  { text: "MADHUSUDAN", spaced: true },
  { text: "URBAN", spaced: true },
  { text: "REAL ESTATE", spaced: false },
  { text: "COLLECTION", spaced: true },
] as const;

type HeroProps = {
  ready: boolean;
};

export function Hero({ ready }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const audioControlRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ready || !sectionRef.current) return;

    if (reducedMotion) {
      gsap.set([mediaRef.current, overlayRef.current, titleRef.current, taglineRef.current, bottomRef.current], {
        opacity: 1,
        clearProps: "transform,clipPath",
      });
      return;
    }

    if (!mediaRef.current || !overlayRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(mediaRef.current, { scale: 1.1 });
      gsap.set(overlayRef.current, { opacity: 0.85 });
      gsap.set(titleRef.current!.querySelectorAll("[data-letter]"), { opacity: 0, x: (i) => (i - 2) * 60 });
      gsap.set(taglineRef.current!.querySelectorAll("[data-line]"), { opacity: 0, x: -36 });
      gsap.set(bottomRef.current, { opacity: 0, y: 24 });
      if (audioControlRef.current) gsap.set(audioControlRef.current, { opacity: 0, scale: 0.9 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(mediaRef.current, { scale: 1, duration: 2.4, ease: "power3.out" })
        .to(overlayRef.current, { opacity: 0.65, duration: 1.8 }, 0)
        .to(
          titleRef.current!.querySelectorAll("[data-letter]"),
          { x: 0, opacity: 1, duration: 1.3, stagger: 0.05 },
          0.3,
        )
        .to(
          taglineRef.current!.querySelectorAll("[data-line]"),
          { x: 0, opacity: 1, duration: 1.0, stagger: 0.06 },
          0.6,
        )
        .to(bottomRef.current, { y: 0, opacity: 1, duration: 0.9 }, 0.9)
        .to(audioControlRef.current, { opacity: 1, scale: 1, duration: 0.6 }, 1.1);

      // Scroll-driven camera parallax
      gsap.to(mediaRef.current, {
        scale: 1.08,
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(titleRef.current, {
        x: -90,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(taglineRef.current, {
        x: 60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#080808]"
      aria-label="MUREC Hero"
    >
      {/* Full-bleed Video Canvas */}
      <div ref={mediaRef} className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          src={hero.video}
          poster={hero.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div ref={overlayRef} className="cinematic-vignette absolute inset-0 pointer-events-none" />
        <div className="grain absolute inset-0 opacity-25 pointer-events-none" aria-hidden />
      </div>

      {/* Floating Audio Control (Top Right below navbar) */}
      <div
        ref={audioControlRef}
        className="absolute top-24 right-[var(--grid-margin)] z-30 md:top-28"
      >
        <AudioControl videoRef={videoRef} />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between px-[var(--grid-margin)] pb-10 pt-28 md:pb-12 md:pt-36">
        {/* Top Meta info */}
        <div className="flex items-center justify-between text-meta text-cream/40">
          <span>NOIDA / DELHI NCR</span>
          <span className="hidden sm:inline">EST. 1954</span>
        </div>

        {/* Center/Lower Dramatic Typography */}
        <div className="my-auto flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h1
            ref={titleRef}
            className="font-display text-[clamp(4.5rem,15vw,13rem)] leading-[0.88] text-cream tracking-tight"
            aria-label="MUREC"
          >
            {LETTERS.map((letter) => (
              <span key={letter} data-letter className="inline-block transform-gpu">
                {letter}
              </span>
            ))}
          </h1>

          <div ref={taglineRef} className="max-w-[18rem] shrink-0 space-y-1 lg:text-right lg:pb-3">
            {TAGLINE_LINES.map(({ text, spaced }) => (
              <p
                key={text}
                data-line
                className={`font-sans text-[11px] text-cream/60 uppercase ${
                  spaced ? "tracking-[0.24em]" : "tracking-[0.14em]"
                }`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div ref={bottomRef} className="flex items-end justify-between gap-8 pt-4">
          <MagneticButton href={hero.cta.href} label={hero.cta.label} />

          <a
            href="#legacy"
            className="group hidden flex-col items-center gap-2 text-cream/40 transition-colors hover:text-cream md:flex"
            aria-label="Scroll to legacy section"
          >
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce-slow text-accent" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
