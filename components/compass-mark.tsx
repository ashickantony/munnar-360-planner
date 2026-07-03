import { cn } from "@/lib/utils";

/**
 * The gold "360°" compass mark — the brand's signature glyph.
 * A dashed orbit ring, a four-point compass star, and cardinal ticks.
 * Purely decorative here; `aria-hidden` unless a title is passed.
 */
export function CompassMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("text-gold", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      {title && <title>{title}</title>}
      {/* outer dashed orbit */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 5"
        opacity="0.9"
      />
      {/* inner solid ring */}
      <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      {/* compass star */}
      <path
        d="M50 22 L56 44 L78 50 L56 56 L50 78 L44 56 L22 50 L44 44 Z"
        fill="currentColor"
      />
      <circle cx="50" cy="50" r="4" fill="var(--deep-forest, #1c2415)" />
      {/* cardinal ticks */}
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="4"
          x2="50"
          y2="10"
          stroke="currentColor"
          strokeWidth="2"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </svg>
  );
}
