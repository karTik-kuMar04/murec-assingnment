"use client";

import { useEffect, useRef } from "react";

export function useVideoInView<T extends HTMLVideoElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25, rootMargin: "100px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return ref;
}
