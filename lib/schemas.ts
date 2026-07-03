import { z } from "zod";

/**
 * Zod schemas for all static content. These are the single source of truth for
 * the shape of `content/*.json`. In PHASE 2 the same schemas can validate data
 * coming from a CMS (Sanity/Payload) so the content-loader interface stays identical.
 */

export const siteSchema = z.object({
  brandName: z.string(),
  tagline: z.string(),
  phones: z.array(z.string()).min(1),
  whatsapp: z.string(), // digits only, incl. country code, for wa.me links
  instagramHandle: z.string(),
  instagramUrl: z.string().url(),
  nav: z.array(z.object({ label: z.string(), href: z.string() })),
  whyUs: z
    .array(z.object({ title: z.string(), detail: z.string() }))
    .min(1),
  about: z.object({
    story: z.array(z.string()).min(1),
    positioning: z.string(),
  }),
});
export type Site = z.infer<typeof siteSchema>;

export const experienceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  hook: z.string(),
  priceFrom: z.number().int().positive(),
  description: z.string(),
  included: z.array(z.string()).min(1),
  images: z.array(z.string()).min(1),
  accent: z.enum(["moss", "teal-water", "gold"]).default("moss"),
});
export type Experience = z.infer<typeof experienceSchema>;
export const experiencesSchema = z.array(experienceSchema);

export const itineraryDaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string(),
  detail: z.string(),
});

export const packageSchema = z.object({
  slug: z.string(),
  name: z.string(),
  days: z.number().int().positive(),
  priceFrom: z.number().int().positive(),
  summary: z.string(),
  itinerary: z.array(itineraryDaySchema).min(1),
  includes: z.array(z.string()).min(1),
  excludes: z.array(z.string()).min(1),
  images: z.array(z.string()).min(1),
});
export type Package = z.infer<typeof packageSchema>;
export const packagesSchema = z.array(packageSchema);

export const reviewSchema = z.object({
  name: z.string(),
  tripType: z.string(),
  quote: z.string(),
});
export type Review = z.infer<typeof reviewSchema>;
export const reviewsSchema = z.array(reviewSchema);
