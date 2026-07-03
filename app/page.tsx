import Link from "next/link";
import { Check } from "lucide-react";
import { getSite, getExperiences, getPackages, getReviews } from "@/lib/content";
import { Hero } from "@/components/hero";
import { Compass } from "@/components/compass";
import { SectionHeading } from "@/components/section-heading";
import { PackageCard } from "@/components/package-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const site = getSite();
  const experiences = getExperiences();
  const packages = getPackages();
  const reviews = getReviews();

  return (
    <>
      <Hero site={site} />

      {/* The 360° Experiences */}
      <section id="experiences" className="scroll-mt-20 bg-mist py-20 sm:py-28">
        <div className="section-shell">
          <SectionHeading eyebrow="The 360° Experiences" title="Spin to Discover" />
          <div className="mt-14">
            <Compass experiences={experiences} />
          </div>
        </div>
      </section>

      {/* Featured packages */}
      <section id="packages" className="scroll-mt-20 bg-cream py-20 sm:py-28">
        <div className="section-shell">
          <SectionHeading eyebrow="Ready-made routes" title="Featured Packages" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.slug} delay={i * 0.08}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center font-body text-deep-forest/70">
            Want something in between?{" "}
            <Link href="/#enquiry" className="font-medium text-moss underline decoration-gold underline-offset-4">
              Tell us your dates
            </Link>{" "}
            and we&apos;ll build a custom route.
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="section-shell">
          <SectionHeading eyebrow="Why travel with us" title="Local, Honest, Yours" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {site.whyUs.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.06}>
                <div className="flex h-full gap-4 rounded-card bg-cream p-6 brand-card-border">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg uppercase tracking-wide text-moss">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 font-body text-[15px] text-deep-forest/75">
                      {point.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews strip */}
      <section className="bg-teal-water py-20 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="From our travellers"
            title="What They Said"
            className="[&_.eyebrow]:text-cream [&_h2]:text-cream"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal key={review.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-card bg-cream/95 p-6 shadow-sm">
                  <blockquote className="flex-1 font-body text-[15px] leading-relaxed text-deep-forest/85">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-moss/10 pt-4">
                    <p className="font-display text-sm uppercase tracking-wide text-moss">
                      {review.name}
                    </p>
                    <p className="font-mono text-xs text-gold">{review.tripType}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band bridging into the enquiry footer */}
      <section className="bg-mist py-16 text-center">
        <div className="section-shell">
          <p className="font-script text-3xl text-moss sm:text-4xl">
            Ready when you are
          </p>
          <div className="mt-6">
            <Button asChild variant="gold" size="lg">
              <Link href="/#enquiry">Plan my trip</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
