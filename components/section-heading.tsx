import { cn } from "@/lib/utils";

/** Eyebrow (mono, gold, tracked) + display header, used to open each section. */
export function SectionHeading({
  eyebrow,
  title,
  className,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-moss sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
