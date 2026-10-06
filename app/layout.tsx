import type { Metadata } from "next";
import { Anton, Caveat, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { getExperiences, getPackages, getSite } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactWidgets } from "@/components/contact-widgets";

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
const experiences = getExperiences();
const packages = getPackages();

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://munnar-360-planner.vercel.app"),
  icons: {
    icon: "/brand/icon.png",
  },
  title: `${site.brandName} Planner — ${site.tagline}`,
  description:
    "Kerala trips built by a local team — misty Munnar tea hills, Alleppey backwater houseboats, and offbeat trails. Tell us your dates, and we'll build the route.",
  applicationName: `${site.brandName} Planner`,
  keywords: [
    "Munnar trip planner",
    "Kerala tour packages",
    "Munnar tea hills",
    "Alleppey backwaters",
    "offbeat Kerala experiences",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.brandName} Planner — ${site.tagline}`,
    description:
      "Kerala trips designed by locals — tea hills, backwaters, and offbeat trails curated around your dates.",
    type: "website",
    url: "/",
    siteName: `${site.brandName} Planner`,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brandName} Planner — ${site.tagline}`,
    description:
      "Plan your Munnar and Kerala trip with a local team that handles the route, stays, and experiences.",
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
        <ContactWidgets
          site={site}
          packages={packages}
          experiences={experiences}
        />
      </body>
    </html>
  );
}
