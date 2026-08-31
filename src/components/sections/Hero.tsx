"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap, registerGsap } from "@/lib/gsap";
import { hero } from "@/data/murec";
import { MagneticButton } from "@/components/ui/MagneticButton";
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
  const mediaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
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
      gsap.set(mediaRef.current, { scale: 1.12 });
      gsap.set(overlayRef.current, { opacity: 0.72 });
      gsap.set(titleRef.current!.querySelectorAll("[data-letter]"), { opacity: 0, x: (i) => (i - 2) * 72 });
      gsap.set(taglineRef.current!.querySelectorAll("[data-line]"), { opacity: 0, x: -48 });
      gsap.set(bottomRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(mediaRef.current, { scale: 1, duration: 2.2, ease: "power3.out" })
        .to(overlayRef.current, { opacity: 0.4, duration: 1.6 }, 0)
        .to(
          titleRef.current!.querySelectorAll("[data-letter]"),
          { x: 0, opacity: 1, duration: 1.2, stagger: 0.05 },
          0.35,
        )
        .to(
          taglineRef.current!.querySelectorAll("[data-line]"),
          { x: 0, opacity: 1, duration: 0.9, stagger: 0.07 },
          0.65,
        )
        .to(bottomRef.current, { y: 0, opacity: 1, duration: 0.8 }, 1.05);

      gsap.to(mediaRef.current, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(titleRef.current, {
        x: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(taglineRef.current, {
        x: 48,
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
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-charcoal"
      aria-label="Hero"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <video
          className="h-full w-full object-cover object-center"
          src={hero.video}
          poster={hero.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/30 to-charcoal/75"
        />
        <div className="grain absolute inset-0 opacity-30" aria-hidden />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-[var(--grid-margin)] pb-10 pt-28 md:pb-14 md:pt-32">
        <p className="text-meta self-end text-cream/40">Noida / India</p>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h1
            ref={titleRef}
            className="font-display text-display-xl text-cream"
            aria-label="MUREC"
          >
            {LETTERS.map((letter) => (
              <span key={letter} data-letter className="inline-block">
                {letter}
              </span>
            ))}
          </h1>

          <div ref={taglineRef} className="max-w-[16rem] shrink-0 lg:text-right">
            {TAGLINE_LINES.map(({ text, spaced }) => (
              <p
                key={text}
                data-line
                className={`text-label text-cream/50 ${spaced ? "" : "text-label-normal"}`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        <div ref={bottomRef} className="flex items-end justify-between gap-8">
          <MagneticButton href={hero.cta.href} label={hero.cta.label} variant="light" />
          <a
            href="#legacy"
            className="hidden flex-col items-center gap-2 text-cream/40 transition-colors hover:text-cream md:flex"
            aria-label="Scroll to legacy section"
          >
            <span className="text-meta">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce-slow" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
