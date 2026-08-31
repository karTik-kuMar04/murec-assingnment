"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { footer, hero } from "@/data/murec";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!footerRef.current || !textRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      // Massive text reveal from bottom, giving a structural cinematic finish
      gsap.fromTo(
        textRef.current,
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#030303] pt-32 text-cream"
    >
      <div className="grain absolute inset-0 opacity-20 pointer-events-none z-0" />
      
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cream/10 to-transparent" />

      <div className="relative z-10 px-[var(--grid-margin)]">
        <div className="grid gap-20 md:grid-cols-12 md:gap-8 pb-32">
          {/* Brand & Address */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Image
                src={hero.logo}
                alt="MUREC"
                width={120}
                height={32}
                className="mb-16 h-8 w-auto brightness-0 invert opacity-90 drop-shadow-md"
                style={{ width: "auto" }}
              />
              <p className="mb-8 font-display text-3xl md:text-4xl text-cream tracking-wide cursor-default">
                {footer.team.split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block transition-all duration-200 hover:-translate-y-2 hover:scale-110 hover:text-accent"
                    style={{ whiteSpace: "pre" }}
                  >
                    {char}
                  </span>
                ))}
              </p>
              <address className="max-w-sm not-italic font-sans text-base leading-relaxed text-cream/50">
                {footer.address}
              </address>
            </div>
            
            <div className="mt-20 inline-flex w-max items-center gap-3 rounded-full border border-accent/20 bg-accent/5 px-6 py-2.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-sans text-[10px] tracking-[0.25em] text-accent uppercase font-medium">
                IGBC Green Certified
              </span>
            </div>
          </div>

          {/* Editorial Links Grid */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-8 lg:pl-16">
            <div className="flex flex-col gap-6">
              <p className="font-sans text-[10px] tracking-[0.4em] text-accent uppercase border-b border-cream/10 pb-4 mb-4">
                Inquiries
              </p>
              <a href={`mailto:${footer.email}`} className="group relative w-max overflow-hidden font-sans text-sm tracking-wider text-cream/60 hover:text-cream">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{footer.email}</span>
                <span className="absolute inset-0 inline-block translate-y-full text-accent transition-transform duration-500 group-hover:translate-y-0">{footer.email}</span>
              </a>
              <a href={`tel:${footer.phone.replace(/\s/g, "")}`} className="group relative w-max overflow-hidden font-sans text-sm tracking-wider text-cream/60 hover:text-cream">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{footer.phone}</span>
                <span className="absolute inset-0 inline-block translate-y-full text-accent transition-transform duration-500 group-hover:translate-y-0">{footer.phone}</span>
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <p className="font-sans text-[10px] tracking-[0.4em] text-accent uppercase border-b border-cream/10 pb-4 mb-4">
                Navigation
              </p>
              {footer.links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group relative w-max overflow-hidden font-sans text-sm tracking-wider text-cream/60 hover:text-cream">
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{link.label}</span>
                  <span className="absolute inset-0 inline-block translate-y-full text-accent transition-transform duration-500 group-hover:translate-y-0">{link.label}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <p className="font-sans text-[10px] tracking-[0.4em] text-accent uppercase border-b border-cream/10 pb-4 mb-4">
                Social
              </p>
              {footer.social.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group relative w-max overflow-hidden font-sans text-sm tracking-wider text-cream/60 hover:text-cream">
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{link.label}</span>
                  <span className="absolute inset-0 inline-block translate-y-full text-accent transition-transform duration-500 group-hover:translate-y-0">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-cream/[0.06] py-8 font-sans text-[10px] tracking-[0.2em] text-cream/40 uppercase">
          <p>{footer.copyright}</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-accent transition-colors"
          >
            Back to Top
          </button>
        </div>
      </div>

      {/* Massive Graphic Footer Text */}
      <div className="pointer-events-none relative flex w-full items-end justify-center overflow-hidden pb-4 md:pb-8">
        <div 
          ref={textRef} 
          className="font-display text-[clamp(7rem,23vw,26rem)] leading-[0.75] text-cream/[0.03] select-none whitespace-nowrap px-4 mix-blend-plus-lighter"
        >
          MUREC
        </div>
      </div>
    </footer>
  );
}
