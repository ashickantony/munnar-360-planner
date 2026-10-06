"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import type { Site } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { CompassMark } from "@/components/compass-mark";
import { Fern } from "@/components/fern";

/**
 * Layered parallax hero (spec 4.1 §2). Gradient valley stand-in (teal-water →
 * moss with a mist glow), mirrored fern fronds, a drifting mist overlay, and the
 * load sequence: ferns settle → mist fades → the 360° mark spins once.
 * All motion is gated on reduced-motion.
 */
export function Hero({ site }: { site: Site }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yFore = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Background gradient valley + radial mist glow (photo stand-in) */}
      <motion.div
        style={reduce ? undefined : { y: yBack }}
        className="absolute inset-0 -z-20"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-1.jpg')",
            filter: "saturate(0.92) contrast(1.05) brightness(0.8)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-water/80 via-moss/70 to-deep-forest/90" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 18%, rgba(237,233,222,0.55) 0%, rgba(237,233,222,0) 60%)",
          }}
        />
      </motion.div>

      {/* Drifting mist overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-1/2 animate-mist-drift bg-[radial-gradient(50%_50%_at_50%_50%,rgba(237,233,222,0.35),transparent)]"
      />

      {/* Fern fronds, top corners, mirrored */}
      <motion.div
        style={reduce ? undefined : { y: yFore }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, rotate: -8, x: -30 }}
          animate={{ opacity: 0.9, rotate: 0, x: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute -left-8 -top-6 w-40 text-moss/80 sm:w-64"
        >
          <Fern />
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, rotate: 8, x: 30 }}
          animate={{ opacity: 0.9, rotate: 0, x: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute -right-8 -top-6 w-40 -scale-x-100 text-moss/80 sm:w-64"
        >
          <Fern />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={reduce ? undefined : { opacity }}
        className="section-shell relative flex flex-col items-center text-center"
      >
        <motion.div
          initial={reduce ? false : { rotate: 0, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 360, scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.34, 1.3, 0.5, 1], delay: 0.3 }}
        >
          <CompassMark className="h-16 w-16 drop-shadow" />
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 font-script text-3xl text-cream sm:text-4xl"
        >
          Let&apos;s explore
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="font-display uppercase leading-none text-cream"
          style={{ fontSize: "clamp(56px, 13vw, 92px)", letterSpacing: "0.04em" }}
        >
          Kerala
        </motion.h1>

        <p className="eyebrow mt-3 text-gold tracking-[0.32em]">{site.tagline}</p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button asChild variant="mist" size="lg">
            <Link href="/#enquiry">Plan my trip</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-cream/40 text-cream hover:bg-cream/10"
          >
            <a href={`tel:${site.phones[0]}`}>
              <Phone /> {site.phones[0]}
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* soft fade into the next (mist) section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-mist" />
    </section>
  );
}
