import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Instagram } from "lucide-react";
import { getSite } from "@/lib/content";
import { CompassMark } from "@/components/compass-mark";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About — Munnar 360°",
  description:
    "A local Kerala team that plans trips the way they'd show a friend — tea hills, backwaters, and offbeat trails.",
};

export default function AboutPage() {
  const site = getSite();

  return (
    <div className="pt-16">
      <section className="relative overflow-hidden bg-deep-forest py-24 text-center text-mist">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, rgba(201,162,75,0.35), transparent)",
          }}
        />
        <div className="section-shell relative">
          <div className="mx-auto mb-6 w-fit">
            <CompassMark className="h-14 w-14" />
          </div>
          <p className="eyebrow">Our story</p>
          <h1 className="mt-3 font-display text-5xl uppercase tracking-wide text-cream sm:text-6xl">
            God&apos;s Own Country
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-script text-2xl text-gold">
            {site.about.positioning}
          </p>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-24">
        <div className="section-shell max-w-2xl space-y-6">
          {site.about.story.map((para, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="font-body text-lg leading-relaxed text-deep-forest/85">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact block */}
      <section className="bg-cream py-16">
        <div className="section-shell max-w-2xl">
          <h2 className="font-display text-3xl uppercase tracking-wide text-moss">
            Say hello
          </h2>
          <p className="mt-2 font-body text-deep-forest/75">
            Call, WhatsApp, or follow along. We&apos;re happy to talk routes even
            before you&apos;ve picked your dates.
          </p>
          <div className="mt-6 space-y-3">
            {site.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="flex items-center gap-3 font-mono text-lg text-moss hover:text-gold"
              >
                <Phone className="h-5 w-5 text-gold" />
                {phone}
              </a>
            ))}
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-body text-moss hover:text-gold"
            >
              <Instagram className="h-5 w-5 text-gold" />
              {site.instagramHandle}
            </a>
          </div>
          <p className="mt-8 font-body text-deep-forest/75">
            Ready to plan?{" "}
            <Link
              href="/#enquiry"
              className="font-medium text-moss underline decoration-gold underline-offset-4"
            >
              Send us your dates
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
