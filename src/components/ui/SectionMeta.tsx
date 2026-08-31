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
  light = false,
}: SectionMetaProps) {
  return (
    <p
      className={`text-meta ${light ? "text-cream/45" : "text-muted"} ${className}`}
    >
      {index} / {label}
      {location ? ` · ${location}` : ""}
    </p>
  );
}
