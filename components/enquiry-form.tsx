"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/content";
import type { Site } from "@/lib/schemas";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Enquiry form. Kept deliberately isolated: the `onSubmit` handler is the single
 * seam that PHASE 2 can repoint at a real lead pipeline (CRM / WhatsApp Business
 * API / email) without touching this markup. Always-available fallbacks (tel:,
 * wa.me) sit alongside so a visitor can reach the team even if the POST is a no-op.
 */
export function EnquiryForm({
  site,
  presetExperience,
}: {
  site: Site;
  presetExperience?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    dates: "",
    message: presetExperience
      ? `I'm interested in the ${presetExperience} experience. `
      : "",
  });

  const waMessage = `Hi Munnar 360°! I'd like to plan a trip.${
    presetExperience ? ` Interested in: ${presetExperience}.` : ""
  }${form.name ? ` Name: ${form.name}.` : ""}${
    form.dates ? ` Dates: ${form.dates}.` : ""
  }`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      // PHASE 2: point this at the real enquiry pipeline. The route below
      // validates and (optionally) emails; the UI contract stays the same.
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, presetExperience }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card bg-cream/10 p-8 text-center">
        <p className="font-script text-3xl text-gold">Thank you!</p>
        <p className="mt-2 font-body text-mist/90">
          We&apos;ve got your enquiry. Our team will reach out shortly to build
          your route. For anything urgent, call or WhatsApp us below.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-mist/20 bg-deep-forest/40 px-4 py-3 font-body text-mist placeholder:text-mist/40 focus-visible:border-gold";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-1.5 block">
            Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow mb-1.5 block">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
      </div>
      <div>
        <label htmlFor="dates" className="eyebrow mb-1.5 block">
          Travel dates
        </label>
        <input
          id="dates"
          value={form.dates}
          onChange={(e) => setForm({ ...form, dates: e.target.value })}
          className={inputClass}
          placeholder="e.g. 12–16 Aug, or 'flexible in September'"
        />
      </div>
      <div>
        <label htmlFor="message" className="eyebrow mb-1.5 block">
          Your trip
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClass}
          placeholder="How many travellers, what you'd love to see, anything else."
        />
      </div>

      {status === "error" && (
        <p className="font-body text-sm text-gold" role="alert">
          Something went wrong sending that. Please WhatsApp or call us — links
          just below.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          variant="gold"
          size="lg"
          disabled={status === "submitting"}
          className="flex-1"
        >
          {status === "submitting" ? "Sending…" : "Enquire"}
        </Button>
        <Button asChild variant="outline" size="lg" className="flex-1 border-mist/30 text-mist hover:bg-mist/10">
          <a
            href={whatsappLink(site.whatsapp, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle /> WhatsApp us
          </a>
        </Button>
      </div>
    </form>
  );
}
