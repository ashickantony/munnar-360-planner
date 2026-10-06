"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { RotateCw, Compass as CompassIcon, ArrowRight } from "lucide-react";
import type { Experience } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { priceFrom } from "@/lib/utils";

/**
 * The signature "360° Compass" (spec 3.4). Three experience nodes on a dashed
 * gold orbit ring around a central compass. Rotating the ring by −120° per step
 * snaps the active node to the top; a detail panel updates alongside.
 *
 * Interaction surface: rotate button, node click, ← / → keys, touch swipe, and
 * scroll-linked rotation as the section enters view. Honours reduced-motion by
 * dropping the overshoot animation (content still updates instantly).
 */

const STEP = 120; // degrees between nodes

export function Compass({ experiences }: { experiences: Experience[] }) {
  const nodes = experiences.slice(0, 3);
  const [active, setActive] = useState(0);
  const [ringRotation, setRingRotation] = useState(0);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const activeRef = useRef(0);
  const manualOverride = useRef(false);

  function changeActive(next: number, manual = false) {
    const current = activeRef.current;
    if (next === current) return;

    const forward = (next - current + nodes.length) % nodes.length;
    const steps = forward > nodes.length / 2 ? forward - nodes.length : forward;
    activeRef.current = next;
    manualOverride.current ||= manual;
    setActive(next);
    setRingRotation((rotation) => rotation - steps * STEP);
  }

  const rotate = (dir: 1 | -1) => {
    changeActive((activeRef.current + dir + nodes.length) % nodes.length, true);
  };
  const goTo = (i: number) => {
    changeActive(i, true);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) manualOverride.current = false;
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Scroll-linked rotation: map the section's progress through the viewport to
  // the active node, unless the user has taken control of the compass.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce || manualOverride.current) return;
    const idx = Math.min(nodes.length - 1, Math.max(0, Math.round(p * (nodes.length - 1))));
    changeActive(idx);
  });

  const activeExp = nodes[active];

  return (
    <div
      ref={sectionRef}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
      role="group"
      aria-label="360 degree experiences compass"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          rotate(1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          rotate(-1);
        }
      }}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) rotate(dx < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      {/* The ring */}
      <div className="relative mx-auto aspect-square w-full max-w-[380px] overflow-x-clip overflow-y-visible">
        {/* dashed orbit */}
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-gold/60" />
        <div className="absolute inset-8 rounded-full border border-moss/15" />

        {/* centre compass */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-deep-forest shadow-lg">
            <CompassIcon className="h-9 w-9" strokeWidth={1.5} />
          </div>
        </div>

        {/* rotating layer holding the nodes */}
        <div
          className="compass-rotation absolute inset-0"
          style={{ transform: `rotate(${ringRotation}deg)` }}
        >
          {nodes.map((exp, i) => {
            const base = i * STEP;
            const isActive = i === active;
            return (
              <div
                key={exp.slug}
                className="absolute left-1/2 top-1/2 h-0 w-0"
                style={{
                  transform: `rotate(${base}deg) translateY(clamp(-9.375rem, -28vw, -5rem))`,
                }}
              >
                {/* counter-rotate so the node stays upright */}
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${exp.title}`}
                  aria-pressed={isActive}
                  className="compass-rotation absolute -left-12 -top-12 rounded-full outline-offset-4"
                  style={{ transform: `rotate(${-base - ringRotation}deg)` }}
                >
                  <span
                    className={[
                      "flex h-24 w-24 flex-col items-center justify-center rounded-full border text-center transition-colors",
                      isActive
                        ? "border-gold bg-cream text-moss shadow-xl"
                        : "border-moss/15 bg-cream/70 text-moss/60 hover:text-moss",
                    ].join(" ")}
                  >
                    <span className="font-display text-[13px] uppercase leading-tight tracking-wide">
                      {exp.title}
                    </span>
                    <span className="mt-1 font-mono text-[10px] text-gold">
                      {priceFrom(exp.priceFrom)}
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div className="text-center lg:text-left">
        <p className="eyebrow">
          Experience {active + 1} / {nodes.length}
        </p>
        <motion.div
          key={activeExp.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.4 }}
        >
          <h3 className="mt-2 font-display text-4xl uppercase tracking-wide text-moss sm:text-5xl">
            {activeExp.title}
          </h3>
          <p className="mx-auto mt-3 max-w-md font-body text-lg text-deep-forest/80 lg:mx-0">
            {activeExp.hook}
          </p>
          <p className="mt-4 font-mono text-gold">{priceFrom(activeExp.priceFrom)}</p>
        </motion.div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <Button type="button" variant="gold" onClick={() => rotate(1)}>
            <RotateCw /> Rotate the compass
          </Button>
          <Button asChild variant="outline">
            <Link href={`/experiences/${activeExp.slug}`}>
              Explore <ArrowRight />
            </Link>
          </Button>
        </div>

        {/* dot indicators / direct access */}
        <div className="mt-6 flex justify-center gap-2 lg:justify-start" role="tablist" aria-label="Choose experience">
          {nodes.map((exp, i) => (
            <button
              key={exp.slug}
              role="tab"
              aria-selected={i === active}
              aria-label={exp.title}
              onClick={() => goTo(i)}
              className={[
                "h-2.5 rounded-full transition-all",
                i === active ? "w-8 bg-gold" : "w-2.5 bg-moss/25 hover:bg-moss/40",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
