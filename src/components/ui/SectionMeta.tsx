type SectionMetaProps = {
  index: string;
  label: string;
  location?: string;
  className?: string;
  light?: boolean;
};

export function SectionMeta({
  index,
  label,
  location,
  className = "",
}: SectionMetaProps) {
  return (
    <div className={`flex items-center gap-3 text-meta text-cream/40 ${className}`}>
      <span className="font-mono text-accent text-[11px]">{index}</span>
      <span className="h-2 w-px bg-cream/20" />
      <span className="tracking-[0.22em] text-cream/70 uppercase">{label}</span>
      {location && (
        <>
          <span className="h-1 w-1 rounded-full bg-cream/30" />
          <span className="tracking-[0.2em] text-cream/40">{location}</span>
        </>
      )}
    </div>
  );
}
