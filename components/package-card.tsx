import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Package } from "@/lib/schemas";
import { priceFrom } from "@/lib/utils";

/** Featured-package card with real photography and a premium travel-card treatment. */
export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group flex flex-col overflow-hidden rounded-card bg-cream brand-card-border shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div
        className="relative flex h-48 items-end overflow-hidden p-5"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(8,26,25,0.12), rgba(8,26,25,0.62)), url('${pkg.images[0]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(70% 60% at 30% 20%, rgba(237,233,222,0.35), transparent)",
          }}
        />
        <div className="relative flex items-center justify-between w-full gap-3">
          <span className="rounded-pill bg-mist/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-deep-forest">
            {pkg.days} Days
          </span>
          <span className="rounded-pill border border-cream/40 bg-deep-forest/30 px-3 py-1 font-body text-[11px] uppercase tracking-wide text-cream backdrop-blur-sm">
            {pkg.name}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl uppercase tracking-wide text-moss">
          {pkg.name}
        </h3>
        <p className="mt-2 flex-1 font-body text-[15px] text-deep-forest/75">
          {pkg.summary}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-moss/10 pt-4">
          <span className="font-mono text-sm text-gold">
            {priceFrom(pkg.priceFrom)}
          </span>
          <span className="flex items-center gap-1 font-body text-sm font-medium text-moss transition-transform group-hover:translate-x-1">
            View <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
