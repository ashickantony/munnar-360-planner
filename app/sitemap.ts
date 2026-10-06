import type { MetadataRoute } from "next";
import { getExperiences, getPackages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://munnar-360-planner.vercel.app";
  const experiences = getExperiences();
  const packages = getPackages();

  const staticRoutes = ["", "/about"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route ? 0.7 : 1,
  }));

  const experienceRoutes = experiences.map((experience) => ({
    url: `${siteUrl}/experiences/${experience.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const packageRoutes = packages.map((pkg) => ({
    url: `${siteUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...experienceRoutes, ...packageRoutes];
}
