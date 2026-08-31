"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import { contact } from "@/data/murec";
import { useReducedMotion } from "@/hooks/useReducedMotion";

registerGsap();

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.from(sectionRef.current.querySelectorAll("[data-contact-reveal]"), {
      y: 70,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[90svh] bg-charcoal px-[var(--grid-margin)] py-32 text-cream md:py-40"
    >
      <div className="mx-auto flex min-h-[60vh] max-w-[1600px] flex-col justify-between">
        <h2
          data-contact-reveal
          className="font-display text-display text-cream"
        >
          {contact.title[0]}
          <br />
          {contact.title[1]}
          <br />
          <span className="text-accent">{contact.title[2]}</span>
        </h2>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <div data-contact-reveal>
            <p className="mb-3 max-w-md font-sans text-base text-cream/70 md:text-lg">
              {contact.copy}
            </p>
            <p className="max-w-md font-sans text-base text-cream/45 md:text-lg">
              {contact.subcopy}
            </p>
          </div>

          <div data-contact-reveal className="lg:text-right">
            <a
              ref={ctaRef}
              href={contact.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-6 font-sans text-sm tracking-[0.35em] text-cream uppercase transition-colors hover:text-accent"
            >
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                  {contact.cta.label}
                </span>
                <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                  {contact.cta.label}
                </span>
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/25 transition-all duration-500 group-hover:scale-110 group-hover:border-cream">
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1"
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
