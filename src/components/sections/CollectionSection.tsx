"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { collection } from "@/data/murec";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useVideoInView } from "@/hooks/useVideoInView";

registerGsap();

export function CollectionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useVideoInView<HTMLVideoElement>();
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (reducedMotion || !isDesktop || !pinRef.current) return;
    if (!mediaContainerRef.current || !titleRef.current || !copyRef.current) return;

    const ctx = gsap.context(() => {
      // Surprise Moment: Aperture expanding from 60vw framed view to 100vw/100vh full-bleed
      gsap.set(mediaContainerRef.current, {
        clipPath: "inset(14% 16% 14% 16%)",
        scale: 0.88,
      });
      gsap.set(overlayRef.current, { opacity: 0.3 });
      gsap.set(titleRef.current!.querySelectorAll("[data-col-title]"), {
        y: 60,
        opacity: 0,
      });
      gsap.set(copyRef.current, { y: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Phase 1: Video expands from framed aperture to full viewport
      tl.to(
        mediaContainerRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        0,
      )
        // Phase 2: Vignette deepens for typography contrast
        .to(
          overlayRef.current,
          { opacity: 0.65, duration: 0.8, ease: "power2.inOut" },
          0.4,
        )
        // Phase 3: Giant Typography enters dramatically
        .to(
          titleRef.current!.querySelectorAll("[data-col-title]"),
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
          },
          0.6,
        )
        // Phase 4: Supporting narrative copy appears
        .to(
          copyRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          0.9,
        )
        // Phase 5: Typography gently drifts laterally as user continues scrolling
        .to(
          titleRef.current,
          {
            x: -60,
            duration: 1,
            ease: "none",
          },
          1.2,
        );
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [reducedMotion, isDesktop]);

  useEffect(() => {
    if (isDesktop || !sectionRef.current || reducedMotion) return;

    gsap.from(sectionRef.current.querySelectorAll("[data-col-reveal]"), {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
  }, [isDesktop, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative bg-[#0e0e0d] text-cream"
    >
      {/* Desktop Pinned Expanding Cinematic Scene */}
      <div ref={pinRef} className="relative hidden h-[100svh] min-h-[640px] w-full overflow-hidden md:block">
        {/* Full-bleed Video with Expanding Aperture */}
        <div
          ref={mediaContainerRef}
          className="absolute inset-0 h-full w-full overflow-hidden"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-center"
            src={collection.video}
            poster={collection.poster}
            muted
            loop
            playsInline
            preload="none"
          />
          <div
            ref={overlayRef}
            className="cinematic-vignette absolute inset-0 pointer-events-none"
          />
          <div className="grain absolute inset-0 opacity-20 pointer-events-none" />
        </div>

        {/* Top Floating Section Meta */}
        <div className="absolute top-10 left-[var(--grid-margin)] z-20">
          <SectionMeta
            index="03"
            label="Collection"
            location="The Portfolio"
          />
        </div>

        {/* Cinematic Content Layout */}
        <div className="relative z-10 flex h-full flex-col justify-between px-[var(--grid-margin)] pb-16 pt-32">
          <div className="text-right">
            <span className="font-sans text-[10px] tracking-[0.3em] text-accent uppercase">
              FEATURED PORTFOLIO
            </span>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div ref={titleRef} className="lg:col-span-7">
              <h2 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.88] text-cream">
                <span data-col-title className="block transform-gpu">
                  {collection.title[0]}
                </span>
                <span data-col-title className="block transform-gpu text-cream/70">
                  {collection.title[1]}
                </span>
              </h2>
            </div>

            <div ref={copyRef} className="lg:col-span-5 lg:pl-10">
              <div className="max-w-md border-l border-cream/20 pl-6">
                <p className="mb-8 font-sans text-base leading-relaxed text-cream/75 md:text-lg">
                  {collection.copy}
                </p>
                <ArrowLink href={collection.cta.href} label={collection.cta.label} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Editorial Layout */}
      <div className="flex flex-col gap-10 px-[var(--grid-margin)] py-24 md:hidden">
        <SectionMeta index="03" label="Collection" />
        <div data-col-reveal className="relative aspect-[4/5] overflow-hidden border border-cream/10 bg-charcoal shadow-2xl">
          <video
            className="h-full w-full object-cover object-center"
            src={collection.video}
            poster={collection.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
          <div className="absolute inset-0 bg-charcoal/30 pointer-events-none" />
        </div>
        <h2 data-col-reveal className="font-display text-5xl leading-tight text-cream">
          {collection.title.join(" ")}
        </h2>
        <p data-col-reveal className="font-sans text-base leading-relaxed text-cream/70">
          {collection.copy}
        </p>
        <div data-col-reveal>
          <ArrowLink href={collection.cta.href} label={collection.cta.label} />
        </div>
      </div>
    </section>
  );
}
