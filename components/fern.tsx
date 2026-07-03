/** Decorative fern frond used in the hero corners (mirrors the brand poster). */
export function Fern({ className }: { className?: string }) {
  // A gently curving stem with paired leaflets that taper toward the tip.
  const leaflets = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 10 C 60 70, 90 130, 120 250"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {leaflets.map((i) => {
        const t = i / (leaflets.length - 1);
        const x = 20 + 100 * t * t;
        const y = 10 + 240 * t;
        const len = 46 * (1 - t) + 10;
        return (
          <g key={i} stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity={0.9 - t * 0.3}>
            <path d={`M${x} ${y} q ${-len * 0.7} ${-len * 0.5} ${-len} ${-len * 0.2}`} />
            <path d={`M${x} ${y} q ${len * 0.7} ${-len * 0.5} ${len} ${-len * 0.2}`} />
          </g>
        );
      })}
    </svg>
  );
}
