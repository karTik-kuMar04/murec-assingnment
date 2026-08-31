"use client";

import { useState } from "react";
import { VolumeX } from "lucide-react";

type AudioControlProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  className?: string;
};

export function AudioControl({ videoRef, className = "" }: AudioControlProps) {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("murec_audio_muted");
      if (saved !== null) {
        return saved === "true";
      }
    }
    return true;
  });

  const toggleAudio = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.play().catch(() => {});
    }
    setIsMuted(nextMuted);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("murec_audio_muted", String(nextMuted));
    }
  };

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className={`group relative inline-flex items-center gap-3 rounded-full border border-cream/15 bg-charcoal/60 px-4 py-2 text-label text-cream backdrop-blur-md transition-all duration-300 hover:border-cream/40 hover:bg-charcoal/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream ${className}`}
      aria-label={isMuted ? "Unmute background sound" : "Mute background sound"}
      aria-pressed={!isMuted}
    >
      <span className="flex h-3.5 items-center gap-0.5">
        {!isMuted ? (
          <>
            <span className="h-3 w-0.5 rounded-full bg-accent animate-soundbar-1" />
            <span className="h-4 w-0.5 rounded-full bg-accent animate-soundbar-2" />
            <span className="h-2.5 w-0.5 rounded-full bg-accent animate-soundbar-3" />
          </>
        ) : (
          <VolumeX className="h-3.5 w-3.5 text-cream/60 transition-colors group-hover:text-cream" />
        )}
      </span>
      <span className="font-sans text-[10px] tracking-[0.2em] text-cream/75 transition-colors group-hover:text-cream uppercase">
        {isMuted ? "Sound Off" : "Sound On"}
      </span>
    </button>
  );
}
