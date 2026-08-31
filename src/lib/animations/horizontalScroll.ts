import { gsap, ScrollTrigger } from "@/lib/gsap";

type HorizontalScrollOptions = {
  scrub?: number;
  pinSpacing?: boolean;
  onUpdate?: (self: ScrollTrigger) => void;
};

export function createHorizontalScroll(
  section: HTMLElement,
  track: HTMLElement,
  options: HorizontalScrollOptions = {},
) {
  const { scrub = 1, pinSpacing = true, onUpdate } = options;

  const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

  return gsap.to(track, {
    x: () => -getDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${getDistance()}`,
      pin: true,
      scrub,
      pinSpacing,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate,
    },
  });
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
