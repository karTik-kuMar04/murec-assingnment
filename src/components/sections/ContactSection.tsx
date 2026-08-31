"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import { contact } from "@/data/murec";
import { useReducedMotion } from "@/hooks/useReducedMotion";

registerGsap();

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      // Letters expanding / shifting on scroll approach
      if (titleRef.current) {
        gsap.from(titleRef.current.querySelectorAll("[data-contact-line]"), {
          x: (i) => (i % 2 === 0 ? -60 : 60),
          opacity: 0,
          duration: 1.3,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });

        // Subtle lateral parallax shift on continuous scroll
        gsap.to(titleRef.current.querySelectorAll("[data-contact-line]"), {
          x: (i) => (i % 2 === 0 ? 30 : -30),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }

      if (copyRef.current) {
        gsap.from(copyRef.current, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[90svh] overflow-hidden bg-[#080808] px-[var(--grid-margin)] py-36 text-cream md:py-48"
    >
      {/* Background ambient lighting and noise */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,168,128,0.06),transparent_70%)]" />
      <div className="grain absolute inset-0 opacity-20 pointer-events-none" />

      <div className="mx-auto flex min-h-[60vh] max-w-[1600px] flex-col justify-between">
        {/* Massive Typographic Climax */}
        <h2
          ref={titleRef}
          className="font-display text-[clamp(4.5rem,14vw,12rem)] leading-[0.85] text-cream tracking-tight"
        >
          <span data-contact-line className="block transform-gpu">
            {contact.title[0]}
          </span>
          <span data-contact-line className="block transform-gpu text-cream/40 pl-[4vw]">
            {contact.title[1]}
          </span>
          <span data-contact-line className="block transform-gpu text-accent pl-[8vw]">
            {contact.title[2]}
          </span>
        </h2>

        {/* Narrative & Large Action */}
        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div ref={copyRef} className="lg:col-span-6">
            <p className="mb-3 max-w-md font-sans text-lg text-cream/75 md:text-xl">
              {contact.copy}
            </p>
            <p className="max-w-md font-sans text-sm text-cream/45">
              {contact.subcopy}
            </p>
          </div>

          <div className="lg:col-span-6 lg:text-right">
            <a
              ref={ctaRef}
              href={contact.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-8 font-sans text-sm tracking-[0.35em] text-cream uppercase transition-colors hover:text-accent"
            >
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                  {contact.cta.label}
                </span>
                <span className="absolute inset-0 inline-block translate-y-full text-accent transition-transform duration-500 group-hover:translate-y-0">
                  {contact.cta.label}
                </span>
              </span>
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/25 bg-charcoal/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent/10">
                <ArrowRight
                  className="h-5 w-5 text-cream transition-transform duration-500 group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
