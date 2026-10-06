"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { Site } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader({ site }: { site: Site }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const solid = scrolled || pathname !== "/";

  // Transparent over the hero, solid mist after a little scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        solid
          ? "bg-mist/95 backdrop-blur-sm shadow-[0_1px_0_rgba(59,74,37,0.12)]"
          : "bg-transparent"
      )}
    >
      <div className="section-shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex min-w-0 items-center rounded-lg bg-deep-forest/85 px-2.5 py-1.5 shadow-sm backdrop-blur-sm"
          aria-label={`${site.brandName} home`}
        >
          <Image
            src="/brand/logo-full.png"
            alt="Munnar 360° Planner — God’s Own Country"
            width={1845}
            height={464}
            unoptimized
            priority
            loading="eager"
            className={cn(
              "h-12 w-auto max-w-[min(48vw,15rem)] object-contain object-left transition-[filter] duration-300",
              solid && "drop-shadow-[0_1px_1px_rgba(17,42,36,0.22)]"
            )}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-body text-sm font-medium transition-colors hover:text-gold",
                solid ? "text-moss" : "text-cream"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="gold" size="sm">
            <Link href="/#enquiry">Plan my trip</Link>
          </Button>
        </nav>

        <button
          className={cn(
            "md:hidden",
            solid ? "text-moss" : "text-cream"
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-moss/10 bg-mist md:hidden">
          <nav className="section-shell flex flex-col gap-1 py-3">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 font-body text-moss hover:bg-moss/5"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="gold" className="mt-2">
              <Link href="/#enquiry" onClick={() => setOpen(false)}>
                Plan my trip
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
