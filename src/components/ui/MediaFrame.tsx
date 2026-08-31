"use client";

type MediaFrameProps = {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
  video?: boolean;
  lazy?: boolean;
};

export function MediaFrame({
  src,
  poster,
  alt = "",
  className = "",
  video = false,
  lazy = true,
}: MediaFrameProps) {
  if (video) {
    return (
      <div className={`media-frame overflow-hidden ${className}`}>
        <video
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload={lazy ? "none" : "metadata"}
        />
      </div>
    );
  }

  return (
    <div className={`media-frame overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
  );
}
