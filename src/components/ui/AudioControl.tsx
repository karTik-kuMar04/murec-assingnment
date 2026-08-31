"use client";

import { useEffect, useState } from "react";
import { VolumeX } from "lucide-react";

type AudioControlProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  className?: string;
};

export function AudioControl({ videoRef, className = "" }: AudioControlProps) {
  const [mounted, setMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setMounted(true);
    const saved = sessionStorage.getItem("murec_audio_muted");
    if (saved !== null) {
      setIsMuted(saved === "true");
    }
  }, []);

  const toggleAudio = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.play().catch(() => {});
    }
    setIsMuted(nextMuted);
    sessionStorage.setItem("murec_audio_muted", String(nextMuted));
  };

  const activeMuted = mounted ? isMuted : true;

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className={`group relative inline-flex items-center gap-3 rounded-full border border-cream/15 bg-charcoal/60 px-4 py-2 text-label text-cream backdrop-blur-md transition-all duration-300 hover:border-cream/40 hover:bg-charcoal/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream ${className}`}
      aria-label={activeMuted ? "Unmute background sound" : "Mute background sound"}
      aria-pressed={!activeMuted}
    >
      <span className="flex h-3.5 items-center gap-0.5">
        {!activeMuted ? (
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
        {activeMuted ? "Sound Off" : "Sound On"}
      </span>
    </button>
  );
}
