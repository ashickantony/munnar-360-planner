import type { Metadata } from "next";
import { Anton, Caveat, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { getSite } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// The four brand typefaces, exposed as CSS variables for Tailwind's fontFamily.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});
const caveat = Caveat({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const site = getSite();

export const metadata: Metadata = {
  // PHASE 2: per-route metadata, sitemap, and TravelAgency/TouristTrip structured data.
  title: `${site.brandName} Planner — ${site.tagline}`,
  description:
    "Kerala trips built by a local team — misty Munnar tea hills, Alleppey backwater houseboats, and offbeat trails. Tell us your dates, we'll build the route.",
  metadataBase: new URL("https://munnar-360-planner.vercel.app"),
  openGraph: {
    title: `${site.brandName} Planner — ${site.tagline}`,
    description:
      "Kerala trips built by a local team — tea hills, backwaters, and offbeat trails.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${caveat.variable} ${jakarta.variable} ${spaceMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-gold focus:px-4 focus:py-2 focus:font-body focus:text-deep-forest"
        >
          Skip to content
        </a>
        <SiteHeader site={site} />
        <main id="main">{children}</main>
        <SiteFooter site={site} />
      </body>
    </html>
  );
}
