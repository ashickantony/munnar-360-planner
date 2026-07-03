import { Phone, Instagram } from "lucide-react";
import type { Site } from "@/lib/schemas";
import { EnquiryForm } from "@/components/enquiry-form";
import { CompassMark } from "@/components/compass-mark";

/**
 * The enquiry footer (spec 4.1 §7). Rendered site-wide so every page ends on a
 * lead-capture surface. `deep-forest` background, a Caveat headline, the enquiry
 * form, then both phone numbers as tel: links and the Instagram handle.
 */
export function SiteFooter({ site }: { site: Site }) {
  return (
    <footer id="enquiry" className="scroll-mt-20 bg-deep-forest text-mist">
      <div className="section-shell grid gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <p className="font-script text-4xl text-gold sm:text-5xl">
            A place where your dreams set sail
          </p>
          <p className="mt-4 max-w-md font-body text-lg text-mist/80">
            Tell us your dates. We&apos;ll build the route.
          </p>

          <div className="mt-8 space-y-3">
            {site.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="flex items-center gap-3 font-mono text-lg text-mist hover:text-gold"
              >
                <Phone className="h-5 w-5 text-gold" />
                {phone}
              </a>
            ))}
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-body text-mist hover:text-gold"
            >
              <Instagram className="h-5 w-5 text-gold" />
              {site.instagramHandle}
            </a>
          </div>
        </div>

        <div className="rounded-card border border-mist/10 bg-deep-forest/60 p-6 sm:p-8">
          <EnquiryForm site={site} />
        </div>
      </div>

      <div className="border-t border-mist/10">
        <div className="section-shell flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <CompassMark className="h-7 w-7" />
            <span className="font-display text-sm uppercase tracking-[0.12em] text-mist">
              {site.brandName} Planner
            </span>
          </div>
          <p className="font-body text-xs text-mist/50">
            {site.tagline} · Built by Synark42 / Anulink Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
