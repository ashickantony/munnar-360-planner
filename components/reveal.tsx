"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Fade-and-rise on scroll into view. No-op under reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0 : 0.6,
        ease: "easeOut",
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
