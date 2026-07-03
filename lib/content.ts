import siteData from "@/content/site.json";
import experiencesData from "@/content/experiences.json";
import packagesData from "@/content/packages.json";
import reviewsData from "@/content/reviews.json";

import {
  siteSchema,
  experiencesSchema,
  packagesSchema,
  reviewsSchema,
  type Site,
  type Experience,
  type Package,
  type Review,
} from "@/lib/schemas";

/**
 * Typed content loaders. Every component reads content through these helpers —
 * no hardcoded copy lives in components.
 *
 * PHASE 2: swap the JSON imports below for CMS fetches (Sanity/Payload). Keep the
 * function signatures identical so callers never change. Validation stays here.
 */

export function getSite(): Site {
  return siteSchema.parse(siteData);
}

export function getExperiences(): Experience[] {
  return experiencesSchema.parse(experiencesData);
}

export function getExperience(slug: string): Experience | undefined {
  return getExperiences().find((e) => e.slug === slug);
}

export function getPackages(): Package[] {
  return packagesSchema.parse(packagesData);
}

export function getPackage(slug: string): Package | undefined {
  return getPackages().find((p) => p.slug === slug);
}

export function getReviews(): Review[] {
  return reviewsSchema.parse(reviewsData);
}

/** Build a wa.me deep link with a prefilled message. */
export function whatsappLink(whatsappDigits: string, message: string): string {
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
}
