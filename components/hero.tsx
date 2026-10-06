import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import type { Site } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { CompassMark } from "@/components/compass-mark";
import { HeroVideo } from "@/components/hero-video";

export function Hero({ site }: { site: Site }) {
  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-deep-forest px-5 pb-16 pt-24 sm:px-8 sm:pt-28"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src="/images/munnar-video-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <HeroVideo />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(14,28,21,0.62)_0%,rgba(14,28,21,0.22)_50%,rgba(14,28,21,0.46)_100%),linear-gradient(0deg,rgba(14,28,21,0.84)_0%,rgba(14,28,21,0.12)_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-deep-forest/55 to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/35 bg-deep-forest/30 text-gold shadow-lg backdrop-blur-sm sm:h-16 sm:w-16"
        >
          <CompassMark className="h-9 w-9 sm:h-10 sm:w-10" />
        </div>

        <p
          className="mt-6 font-script text-3xl text-cream drop-shadow sm:text-4xl"
        >
          Let&apos;s explore
        </p>

        <h1
          className="mt-1 font-display text-[clamp(3.5rem,14vw,8.5rem)] uppercase leading-[0.92] tracking-[0.035em] text-cream drop-shadow-[0_3px_18px_rgba(0,0,0,0.32)]"
        >
          Kerala
        </h1>

        <p className="eyebrow mt-5 max-w-full text-center text-gold tracking-[0.18em] sm:tracking-[0.32em]">
          {site.tagline}
        </p>
        <p className="mt-4 max-w-xl text-balance font-body text-base leading-relaxed text-cream/90 drop-shadow sm:text-lg">
          Misty tea hills, quiet backwaters, and a route shaped around you.
        </p>

        <div
          className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <Button asChild variant="mist" size="lg">
            <Link href="/#enquiry">Plan my trip</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-cream/50 text-cream hover:bg-cream/10"
          >
            <a href={`tel:${site.phones[0]}`}>
              <Phone /> {site.phones[0]}
            </a>
          </Button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-b from-transparent to-mist"
      />
    </section>
  );
}
