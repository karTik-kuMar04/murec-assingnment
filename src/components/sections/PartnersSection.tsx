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
          duration: 0.75,
          ease: "power3.out",
        })
        .fromTo(
          quoteRef.current,
          { x: dir * 48, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
          0.12,
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
      scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
    });
  }, [reducedMotion]);

  const goNext = () => animateTransition((active + 1) % total, 1);
  const goPrev = () => animateTransition((active - 1 + total) % total, -1);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="min-h-[100svh] bg-ivory px-[var(--grid-margin)] py-20 md:py-28"
    >
      <SectionMeta index="06" label="Partners" className="mb-12 md:mb-16" />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col justify-between lg:col-span-4 lg:min-h-[65vh]">
          <div data-partner-head>
            <p className="text-meta mb-6 text-muted">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <h2 className="font-display text-heading text-charcoal md:text-5xl">
              {partners.title[0]}
              <br />
              <span className="text-accent">{partners.title[1]}</span>
            </h2>
          </div>

          <div className="mt-10 flex gap-3 lg:mt-0">
            <button
              type="button"
              onClick={goPrev}
              disabled={animating}
              className="flex h-12 w-12 min-h-[44px] min-w-[44px] items-center justify-center border border-charcoal/15 transition-colors hover:bg-charcoal hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal disabled:opacity-40"
              aria-label="Previous partner"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={animating}
              className="flex h-12 w-12 min-h-[44px] min-w-[44px] items-center justify-center border border-charcoal/15 transition-colors hover:bg-charcoal hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal disabled:opacity-40"
              aria-label="Next partner"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative aspect-[3/4] overflow-hidden lg:col-span-5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={partner.image}
            src={partner.image}
            alt={partner.name}
            className="h-full w-full object-cover object-top"
          />
          {"logo" in partner && partner.logo && (
            <div className="absolute bottom-5 left-5 bg-ivory/92 px-4 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={partner.logo} alt={`${partner.name} logo`} className="h-7 w-auto object-contain" />
            </div>
          )}
        </div>

        <div ref={quoteRef} className="flex flex-col justify-center lg:col-span-3">
          <blockquote className="mb-6 font-display text-xl leading-snug text-charcoal md:text-2xl lg:text-[1.65rem]">
            &ldquo;{partner.quote}&rdquo;
          </blockquote>
          <p className="text-meta text-muted">{partner.name}</p>
        </div>
      </div>
    </section>
  );
}
