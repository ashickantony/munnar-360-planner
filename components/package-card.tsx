import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Package } from "@/lib/schemas";
import { priceFrom } from "@/lib/utils";

/** Featured-package card: gradient banner, DAYS mono label, name, summary, price. */
export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group flex flex-col overflow-hidden rounded-card bg-cream brand-card-border shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      {/* gradient banner with day-count */}
      <div className="relative flex h-40 items-end bg-gradient-to-br from-teal-water via-moss to-deep-forest p-5">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(70% 60% at 30% 20%, rgba(237,233,222,0.4), transparent)",
          }}
        />
        <span className="relative rounded-pill bg-mist/90 px-3 py-1 font-mono text-xs uppercase tracking-wide text-deep-forest">
          {pkg.days} Days
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl uppercase tracking-wide text-moss">
          {pkg.name}
        </h3>
        <p className="mt-2 flex-1 font-body text-[15px] text-deep-forest/75">
          {pkg.summary}
        </p>
        <div className="mt-4 flex items-center justify-between">
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
