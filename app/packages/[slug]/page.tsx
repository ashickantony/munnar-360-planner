import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowLeft } from "lucide-react";
import { getPackages, getPackage, getSite } from "@/lib/content";
import { BrandImage } from "@/components/brand-image";
import { EnquiryForm } from "@/components/enquiry-form";
import { priceFrom } from "@/lib/utils";

export function generateStaticParams() {
  return getPackages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  return { title: `${pkg.name} — Munnar 360°`, description: pkg.summary };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();
  const site = getSite();

  return (
    <article className="pt-16">
      <header className="relative flex min-h-[52svh] items-end overflow-hidden">
        <BrandImage
          src={pkg.images[0]}
          alt={`${pkg.name} — Kerala`}
          className="absolute inset-0"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/85 via-deep-forest/30 to-transparent" />
        <div className="section-shell relative pb-10">
          <Link
            href="/#packages"
            className="mb-4 inline-flex items-center gap-1.5 font-body text-sm text-mist/80 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> All packages
          </Link>
          <span className="rounded-pill bg-mist/90 px-3 py-1 font-mono text-xs uppercase tracking-wide text-deep-forest">
            {pkg.days} Days
          </span>
          <h1 className="mt-4 font-display text-5xl uppercase tracking-wide text-cream sm:text-6xl">
            {pkg.name}
          </h1>
          <p className="mt-3 max-w-xl font-body text-lg text-mist/90">{pkg.summary}</p>
          <p className="mt-3 font-mono text-gold">{priceFrom(pkg.priceFrom)}</p>
        </div>
      </header>

      <div className="section-shell grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr] lg:py-20">
        {/* Itinerary */}
        <div>
          <p className="eyebrow">Day by day</p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-moss">
            The itinerary
          </h2>
          <ol className="mt-8 space-y-6">
            {pkg.itinerary.map((day) => (
              <li key={day.day} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-moss font-mono text-sm text-cream">
                    D{day.day}
                  </span>
                  {day.day !== pkg.itinerary.length && (
                    <span className="mt-1 w-px flex-1 bg-moss/20" />
                  )}
                </div>
                <div className="pb-2">
                  <h3 className="font-display text-lg uppercase tracking-wide text-moss">
                    {day.title}
                  </h3>
                  <p className="mt-1 font-body text-[15px] text-deep-forest/80">
                    {day.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Gallery */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            {pkg.images.map((src, i) => (
              <BrandImage
                key={src}
                src={src}
                alt={`${pkg.name} — view ${i + 1}`}
                className="aspect-[4/3] rounded-card"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            ))}
          </div>
        </div>

        {/* Inclusions / exclusions */}
        <aside>
          <div className="sticky top-24 space-y-6">
            <div className="rounded-card bg-cream p-6 brand-card-border">
              <p className="font-mono text-xl text-gold">{priceFrom(pkg.priceFrom)}</p>
              <p className="mt-1 font-body text-sm text-deep-forest/60">
                per person · custom dates
              </p>

              <p className="eyebrow mt-6">Includes</p>
              <ul className="mt-3 space-y-2.5">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 font-body text-sm text-deep-forest/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="eyebrow mt-6">Excludes</p>
              <ul className="mt-3 space-y-2.5">
                {pkg.excludes.map((item) => (
                  <li key={item} className="flex gap-2.5 font-body text-sm text-deep-forest/60">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-moss/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Pre-filled enquiry */}
      <section className="bg-deep-forest py-16 text-mist">
        <div className="section-shell max-w-2xl">
          <p className="font-script text-3xl text-gold sm:text-4xl">
            Book the {pkg.name}
          </p>
          <p className="mt-2 font-body text-mist/80">
            Tell us your dates and traveller count. We&apos;ll confirm
            availability and tailor the {pkg.days}-day route to you.
          </p>
          <div className="mt-8 rounded-card border border-mist/10 bg-deep-forest/60 p-6 sm:p-8">
            <EnquiryForm site={site} presetExperience={pkg.name} />
          </div>
        </div>
      </section>
    </article>
  );
}
