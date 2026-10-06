import type { Metadata } from "next";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy notice — Munnar 360° Planner",
  description:
    "How Munnar 360° Planner handles information shared through trip enquiries and the on-site trip helper.",
};

export default function PrivacyPage() {
  const site = getSite();

  return (
    <article className="bg-mist">
      <header className="bg-deep-forest px-5 pb-14 pt-28 text-center text-cream sm:pb-20 sm:pt-36">
        <div className="section-shell">
          <p className="eyebrow">Your information</p>
          <h1 className="mt-3 font-display text-4xl uppercase tracking-wide sm:text-5xl">
            Privacy notice
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-mist/75">
            This notice explains what happens when you contact Munnar 360°
            Planner through this website.
          </p>
        </div>
      </header>

      <div className="section-shell max-w-3xl space-y-8 py-12 sm:py-16">
        <section>
          <h2 className="font-display text-xl uppercase tracking-wide text-moss">
            Information you provide
          </h2>
          <p className="mt-2 font-body text-deep-forest/80">
            If you submit the enquiry form, we use your name, email address,
            travel dates, and message to respond to your trip request. The form
            sends this information to our configured email-delivery provider
            (Resend) and to the recipient address set by Munnar 360° Planner.
            The site does not currently keep a separate database of enquiries.
            Its operational logs record delivery status and limited submission
            metadata, not your name, email address, or message text.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl uppercase tracking-wide text-moss">
            Trip planning helper
          </h2>
          <p className="mt-2 font-body text-deep-forest/80">
            The free trip helper matches your question against the package and
            experience information published on this site. It does not use an
            external AI service, check live availability, or send or save your
            messages. Its conversation is held temporarily in your browser and
            is cleared when the page is reloaded.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl uppercase tracking-wide text-moss">
            WhatsApp and other services
          </h2>
          <p className="mt-2 font-body text-deep-forest/80">
            If you choose to contact us using WhatsApp, your message is handled
            by WhatsApp under its own privacy terms. Links to Instagram and
            other external services are also governed by their providers&apos;
            privacy practices.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl uppercase tracking-wide text-moss">
            Retention and requests
          </h2>
          <p className="mt-2 font-body text-deep-forest/80">
            Enquiry emails are retained in the receiving mailbox and related
            email systems until the business deletes them. To ask about,
            correct, or request deletion of an enquiry, contact us at{" "}
            <a
              href={`https://wa.me/${site.whatsapp}`}
              className="font-medium text-moss underline decoration-gold underline-offset-4"
            >
              Munnar 360° Planner on WhatsApp
            </a>
            .
          </p>
        </section>

        <p className="border-t border-moss/10 pt-5 font-body text-sm text-deep-forest/60">
          This is a practical privacy notice for the current site, not legal
          advice. Review it for your business and applicable local privacy
          requirements before launch.
        </p>
      </div>
    </article>
  );
}
