"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Site } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { CompassMark } from "@/components/compass-mark";
import { cn } from "@/lib/utils";

export function SiteHeader({ site }: { site: Site }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        scrolled
          ? "bg-mist/95 backdrop-blur-sm shadow-[0_1px_0_rgba(59,74,37,0.12)]"
          : "bg-transparent"
      )}
    >
      <div className="section-shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${site.brandName} home`}
        >
          <CompassMark className="h-8 w-8 shrink-0" />
          <span
            className={cn(
              "font-display text-lg uppercase tracking-[0.12em]",
              scrolled ? "text-moss" : "text-cream"
            )}
          >
            {site.brandName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-body text-sm font-medium transition-colors hover:text-gold",
                scrolled ? "text-moss" : "text-cream"
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
            scrolled ? "text-moss" : "text-cream"
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
