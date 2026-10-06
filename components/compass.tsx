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
// Overshoot snap easing from the spec: cubic-bezier(.34,1.3,.5,1)
const SNAP_EASE = [0.34, 1.3, 0.5, 1] as const;
const getNow = () => Date.now();

export function Compass({ experiences }: { experiences: Experience[] }) {
  const nodes = experiences.slice(0, 3);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  // Pause scroll-driven changes briefly after a manual interaction.
  const manualUntil = useRef<number>(0);

  const rotate = (dir: 1 | -1) => {
    manualUntil.current = getNow() + 1200;
    setActive((i) => (i + dir + nodes.length) % nodes.length);
  };
  const goTo = (i: number) => {
    manualUntil.current = getNow() + 1200;
    setActive(i);
  };

  // Scroll-linked rotation: map the section's progress through the viewport to
  // the active node, unless the user just interacted manually.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce) return;
    if (getNow() < manualUntil.current) return;
    const idx = Math.min(nodes.length - 1, Math.max(0, Math.round(p * (nodes.length - 1))));
    setActive((cur) => (cur === idx ? cur : idx));
  });

  const ringRotation = -active * STEP;
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
      <div className="relative mx-auto aspect-square w-full max-w-[380px]">
        {/* dashed orbit */}
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-gold/60" />
        <div className="absolute inset-8 rounded-full border border-moss/15" />

        {/* centre compass */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={reduce ? undefined : { rotate: [0, 360] }}
            transition={
              reduce
                ? undefined
                : { duration: 40, ease: "linear", repeat: Infinity }
            }
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-deep-forest shadow-lg"
          >
            <CompassIcon className="h-9 w-9" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* rotating layer holding the nodes */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: ringRotation }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.9, ease: SNAP_EASE }
          }
        >
          {nodes.map((exp, i) => {
            const base = i * STEP;
            const isActive = i === active;
            return (
              <div
                key={exp.slug}
                className="absolute left-1/2 top-1/2 h-0 w-0"
                style={{
                  transform: `rotate(${base}deg) translateY(-clamp(5rem, 28vw, 9.375rem))`,
                }}
              >
                {/* counter-rotate so the node stays upright */}
                <motion.button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${exp.title}`}
                  aria-pressed={isActive}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-offset-4"
                  animate={{ rotate: -base - ringRotation }}
                  transition={
                    reduce ? { duration: 0 } : { duration: 0.9, ease: SNAP_EASE }
                  }
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
                </motion.button>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Detail panel */}
      <div className="text-center lg:text-left">
        <p className="eyebrow">
          Experience {active + 1} / {nodes.length}
        </p>
        <motion.div
          key={activeExp.slug}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
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
