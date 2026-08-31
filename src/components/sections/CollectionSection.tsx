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
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const videoRef = useVideoInView<HTMLVideoElement>();
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (reducedMotion || !isDesktop || !pinRef.current) return;
    if (!mediaRef.current || !titleRef.current || !copyRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(mediaRef.current, { scale: 0.62 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(mediaRef.current, { scale: 1, ease: "none", duration: 1 })
        .from(
          titleRef.current!.querySelectorAll("[data-col-title]"),
          { x: 80, opacity: 0, duration: 0.35, stagger: 0.08 },
          0.4,
        )
        .from(copyRef.current, { y: 32, opacity: 0, duration: 0.3 }, 0.62)
        .to(mediaRef.current, { filter: "brightness(0.4)", duration: 0.25 }, 0.82);

      gsap.to(titleRef.current, {
        x: -48,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=130%",
          scrub: true,
        },
      });
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
      y: 36,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
  }, [isDesktop, reducedMotion]);

  return (
    <section ref={sectionRef} id="collection" className="bg-stone">
      {/* Desktop pinned scene */}
      <div ref={pinRef} className="relative hidden min-h-[100svh] md:block">
        <SectionMeta
          index="03"
          label="Collection"
          location="Murec Collection"
          className="absolute top-10 left-[var(--grid-margin)] z-20"
        />

        <div
          ref={mediaRef}
          className="absolute inset-0 overflow-hidden"
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
          <div className="absolute inset-0 bg-charcoal/20" />
        </div>

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-[var(--grid-margin)] pb-16">
          <div ref={titleRef}>
            <h2 className="font-display text-display-sm text-cream">
              <span data-col-title className="block">
                {collection.title[0]}
              </span>
              <span data-col-title className="block text-cream/75">
                {collection.title[1]}
              </span>
            </h2>
          </div>

          <div ref={copyRef} className="mt-10 ml-auto max-w-md">
            <p className="mb-8 text-body text-cream/85">{collection.copy}</p>
            <ArrowLink href={collection.cta.href} label={collection.cta.label} />
          </div>
        </div>
      </div>

      {/* Mobile vertical layout */}
      <div className="px-[var(--grid-margin)] py-20 md:hidden">
        <SectionMeta index="03" label="Collection" className="mb-10" />
        <div data-col-reveal className="mb-8 aspect-[4/5] overflow-hidden">
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
        </div>
        <h2 data-col-reveal className="mb-6 font-display text-heading text-charcoal">
          {collection.title.join(" ")}
        </h2>
        <p data-col-reveal className="mb-8 text-body text-muted">
          {collection.copy}
        </p>
        <div data-col-reveal>
          <ArrowLink href={collection.cta.href} label={collection.cta.label} dark />
        </div>
      </div>
    </section>
  );
}
