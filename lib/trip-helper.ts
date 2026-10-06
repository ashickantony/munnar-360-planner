import type { Experience, Package } from "@/lib/schemas";
import { formatPrice } from "@/lib/utils";

export type TripHelperReply = {
  text: string;
  packageSlug?: string;
  experienceSlug?: string;
};

function parseBudget(message: string): number | undefined {
  const match = message.match(
    /(?:under|below|budget(?:\s+is)?|less\s+than|around|₹|inr|rs\.?)\s*₹?\s*(\d[\d,]*(?:\.\d+)?)\s*(k)?/i
  );

  if (!match) return undefined;
  const amount = Number(match[1].replaceAll(",", ""));
  if (!Number.isFinite(amount)) return undefined;
  return Math.round(amount * (match[2] ? 1000 : 1));
}

export function answerTripQuestion(
  input: string,
  packages: Package[],
  experiences: Experience[]
): TripHelperReply {
  const message = input.trim().toLowerCase();
  const budget = parseBudget(message);
  const daysMatch = message.match(/\b(\d{1,2})\s*(?:days?|nights?)\b/i);
  const requestedDays = daysMatch ? Number(daysMatch[1]) : undefined;
  const asksAvailability = /\b(available|availability|book|booking|reserve|reservation|confirm)\b/.test(
    message
  );
  const asksInclusions = /\b(include|includes|included|inclusions|exclude|excludes)\b/.test(
    message
  );

  if (asksAvailability) {
    return {
      text: "I can share the listed routes and starting prices, but I can’t check live availability or confirm a booking. Message our team on WhatsApp and they can confirm dates and the final quote.",
    };
  }

  if (budget !== undefined) {
    const suitable = packages
      .filter((item) => item.priceFrom <= budget)
      .sort((a, b) => b.days - a.days || a.priceFrom - b.priceFrom)[0];

    if (!suitable) {
      return {
        text: `The listed packages start at ${formatPrice(Math.min(...packages.map((item) => item.priceFrom)))} per person. Tell our team your budget and dates on WhatsApp to ask about a custom route.`,
      };
    }

    return {
      text: `${suitable.name} is the longest listed package starting within ${formatPrice(budget)} per person. It runs ${suitable.days} days and starts at ${formatPrice(suitable.priceFrom)} per person. Final pricing depends on your dates and availability.`,
      packageSlug: suitable.slug,
    };
  }

  const packageMatch = packages.find((item) => {
    const name = item.name.toLowerCase();
    return message.includes(name) || message.includes(item.slug.replaceAll("-", " "));
  });
  const experienceMatch = experiences.find((item) => {
    const tokens =
      item.slug === "tea-hills"
        ? ["tea", "munnar", "hill", "sunrise"]
        : item.slug === "backwaters"
          ? ["backwater", "houseboat", "alleppey", "kettuvallam", "boat"]
          : ["offbeat", "trail", "waterfall", "bike", "adventure"];
    return tokens.some((token) => message.includes(token));
  });

  if (asksInclusions && packageMatch) {
    return {
      text: `${packageMatch.name} includes ${packageMatch.includes.join(", ")}. It excludes ${packageMatch.excludes.join(", ").toLowerCase()}. The listed starting price is ${formatPrice(packageMatch.priceFrom)} per person; ask our team to confirm the final quote.`,
      packageSlug: packageMatch.slug,
    };
  }

  if (experienceMatch) {
    const relatedPackage = packages.find((item) =>
      item.summary.toLowerCase().includes(experienceMatch.slug === "backwaters" ? "backwater" : experienceMatch.slug === "tea-hills" ? "tea hills" : "trail")
    );
    return {
      text: `${experienceMatch.hook} This experience starts at ${formatPrice(experienceMatch.priceFrom)}. ${relatedPackage ? `For a multi-day trip, ${relatedPackage.name} starts at ${formatPrice(relatedPackage.priceFrom)} per person.` : "Tell our team your dates for a custom itinerary."}`,
      packageSlug: relatedPackage?.slug,
      experienceSlug: experienceMatch.slug,
    };
  }

  if (requestedDays !== undefined) {
    const suggestion =
      packages.find((item) => item.days >= requestedDays) ??
      packages.reduce((longest, item) => (item.days > longest.days ? item : longest));
    return {
      text: `${suggestion.name} is our closest ready-made option for a ${requestedDays}-day trip. It runs ${suggestion.days} days and starts at ${formatPrice(suggestion.priceFrom)} per person. The team can tailor it around your dates.`,
      packageSlug: suggestion.slug,
    };
  }

  return {
    text: `Here are our ready-made routes: ${packages.map((item) => `${item.name} (${item.days} days, from ${formatPrice(item.priceFrom)} per person)`).join("; ")}. Ask me about Munnar tea hills, backwaters, trails, budget, or what a package includes.`,
  };
}
