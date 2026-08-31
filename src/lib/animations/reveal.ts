import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function revealOnScroll(
  elements: gsap.TweenTarget,
  options?: { y?: number; stagger?: number; start?: string; trigger?: Element | string },
) {
  const { y = 48, stagger = 0.12, start = "top 85%", trigger } = options ?? {};

  return gsap.from(elements, {
    y,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    stagger,
    scrollTrigger: {
      trigger: trigger ?? (elements as Element),
      start,
      toggleActions: "play none none reverse",
    },
  });
}

export function clipReveal(
  element: HTMLElement,
  options?: { direction?: "up" | "left"; start?: string },
) {
  const { direction = "up", start = "top 80%" } = options ?? {};
  const clipFrom =
    direction === "up"
      ? "inset(100% 0% 0% 0%)"
      : "inset(0% 100% 0% 0%)";

  gsap.set(element, { clipPath: clipFrom });

  return gsap.to(element, {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: 1.4,
    ease: "power4.inOut",
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: "play none none reverse",
    },
  });
}
