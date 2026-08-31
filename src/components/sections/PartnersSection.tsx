"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { partners } from "@/data/murec";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { useReducedMotion } from "@/hooks/useReducedMotion";

registerGsap();

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const isAnimating = useRef(false);
  const [animating, setAnimating] = useState(false);
  const hasEntered = useRef(false);
  const reducedMotion = useReducedMotion();

  const partner = partners.items[active];
  const total = partners.items.length;

  const revealPartner = useCallback(
    (dir: number) => {
      if (!imageRef.current || !quoteRef.current) return;

      gsap.set(imageRef.current, {
        clipPath: dir > 0 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
      });

      gsap
        .timeline({
          onComplete: () => {
            isAnimating.current = false;
            setAnimating(false);
          },
        })
        .to(imageRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.85,
          ease: "power3.out",
        })
        .fromTo(
          quoteRef.current,
          { x: dir * 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          0.15,
        );
    },
    [],
  );

  const animateTransition = useCallback(
    (nextIndex: number, dir: number) => {
      if (isAnimating.current) return;

      if (reducedMotion || !imageRef.current || !quoteRef.current) {
        setActive(nextIndex);
        return;
      }

      isAnimating.current = true;
      setAnimating(true);
      setDirection(dir);

      gsap
        .timeline({
          onComplete: () => {
            setActive(nextIndex);
          },
        })
        .to(imageRef.current, {
          clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
          duration: 0.45,
          ease: "power2.in",
        })
        .to(
          quoteRef.current,
          { x: dir * -40, opacity: 0, duration: 0.35, ease: "power2.in" },
          0,
        );
    },
    [reducedMotion],
  );

  useEffect(() => {
    if (!hasEntered.current) {
      hasEntered.current = true;
      if (!reducedMotion) revealPartner(1);
      return;
    }
    revealPartner(direction);
  }, [active, direction, reducedMotion, revealPartner]);

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.from(sectionRef.current.querySelector("[data-partner-head]"), {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
    });
  }, [reducedMotion]);

  const goNext = () => animateTransition((active + 1) % total, 1);
  const goPrev = () => animateTransition((active - 1 + total) % total, -1);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative min-h-[100svh] bg-[#090908] px-[var(--grid-margin)] py-28 text-cream md:py-36"
    >
      {/* Background grain */}
      <div className="grain absolute inset-0 opacity-20 pointer-events-none" />

      <SectionMeta index="06" label="Partners" className="mb-16 md:mb-20" />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12 lg:items-center">
        {/* Left: Section Header & Nav Buttons */}
        <div className="flex flex-col justify-between lg:col-span-4 lg:min-h-[55vh]">
          <div data-partner-head>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-accent">
                {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-cream/20" />
              <span className="text-meta text-cream/40">EDITORIAL PERSPECTIVE</span>
            </div>

            <h2 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.95] text-cream">
              {partners.title[0]}
              <br />
              <span className="text-accent">{partners.title[1]}</span>
            </h2>
          </div>

          <div className="mt-12 flex items-center gap-4 lg:mt-0">
            <button
              type="button"
              onClick={goPrev}
              disabled={animating}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 bg-charcoal/40 text-cream transition-all duration-300 hover:border-accent hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream disabled:opacity-40"
              aria-label="Previous partner"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={animating}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 bg-charcoal/40 text-cream transition-all duration-300 hover:border-accent hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream disabled:opacity-40"
              aria-label="Next partner"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        {/* Center: Partner Portrait with Magazine Mask */}
        <div
          ref={imageRef}
          className="relative aspect-[3/4] w-full overflow-hidden border border-cream/10 bg-charcoal shadow-2xl lg:col-span-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={partner.image}
            src={partner.image}
            alt={partner.name}
            className="h-full w-full object-cover object-top filter brightness-95 contrast-105"
          />
          {"logo" in partner && partner.logo && (
            <div className="absolute bottom-4 left-4 bg-charcoal/85 px-4 py-2 border border-cream/10 backdrop-blur-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-6 w-auto object-contain brightness-0 invert opacity-80"
              />
            </div>
          )}
        </div>

        {/* Right: Giant Editorial Quote */}
        <div ref={quoteRef} className="flex flex-col justify-center lg:col-span-4 lg:pl-6">
          <blockquote className="mb-8 font-display text-xl leading-relaxed text-cream/90 md:text-2xl lg:text-[1.65rem]">
            &ldquo;{partner.quote}&rdquo;
          </blockquote>
          <div className="border-t border-accent/40 pt-4">
            <p className="font-sans text-sm tracking-[0.15em] text-accent uppercase font-medium">
              {partner.name}
            </p>
            <p className="font-sans text-xs text-cream/40 mt-1">
              Architectural Collaborator
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
