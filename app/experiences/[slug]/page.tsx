import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import { getExperiences, getExperience, getSite } from "@/lib/content";
import { BrandImage } from "@/components/brand-image";
import { EnquiryForm } from "@/components/enquiry-form";
import { priceFrom } from "@/lib/utils";

// Static params for the three experiences (fully static for the trial).
export function generateStaticParams() {
  return getExperiences().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) return {};
  // PHASE 2: richer per-route metadata + TouristTrip structured data.
  return { title: `${exp.title} — Munnar 360°`, description: exp.hook };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) notFound();
  const site = getSite();

  return (
    <article className="pt-16">
      {/* Hero */}
      <header className="relative flex min-h-[52svh] items-end overflow-hidden">
        <BrandImage
          src={exp.images[0]}
          alt={`${exp.title} — Kerala`}
          className="absolute inset-0"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/85 via-deep-forest/30 to-transparent" />
        <div className="section-shell relative pb-10">
          <Link
            href="/#experiences"
            className="mb-4 inline-flex items-center gap-1.5 font-body text-sm text-mist/80 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> All experiences
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-wide text-cream sm:text-6xl">
            {exp.title}
          </h1>
          <p className="mt-3 max-w-xl font-body text-lg text-mist/90">{exp.hook}</p>
          <p className="mt-3 font-mono text-gold">{priceFrom(exp.priceFrom)}</p>
        </div>
      </header>

      <div className="section-shell grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr] lg:py-20">
        <div>
          <p className="font-body text-lg leading-relaxed text-deep-forest/85">
            {exp.description}
          </p>

          {/* Gallery */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {exp.images.map((src, i) => (
              <BrandImage
                key={src}
                src={src}
                alt={`${exp.title} — view ${i + 1}`}
                className={`rounded-card ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ))}
          </div>
        </div>

        {/* What's included */}
        <aside>
          <div className="sticky top-24 rounded-card bg-cream p-6 brand-card-border">
            <p className="eyebrow">What&apos;s included</p>
            <ul className="mt-4 space-y-3">
              {exp.included.map((item) => (
                <li key={item} className="flex gap-3 font-body text-[15px] text-deep-forest/85">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Pre-filled enquiry */}
      <section className="bg-deep-forest py-16 text-mist">
        <div className="section-shell max-w-2xl">
          <p className="font-script text-3xl text-gold sm:text-4xl">
            Want the {exp.title} trip?
          </p>
          <p className="mt-2 font-body text-mist/80">
            Send your dates — we&apos;ll pre-fill the {exp.title} experience and
            build the rest around it.
          </p>
          <div className="mt-8 rounded-card border border-mist/10 bg-deep-forest/60 p-6 sm:p-8">
            <EnquiryForm site={site} presetExperience={exp.title} />
          </div>
        </div>
      </section>
    </article>
  );
}
