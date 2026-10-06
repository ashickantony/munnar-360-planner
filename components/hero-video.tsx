"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function syncMotionPreference() {
      const video = videoRef.current;
      if (!video) return;

      if (motionPreference.matches) {
        video.pause();
        return;
      }

      void video.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "NotAllowedError") return;
        console.error("[hero-video] playback failed", error);
      });
    }

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);
    const video = videoRef.current;
    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      video?.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video absolute inset-0 h-full w-full object-cover"
      src="/videos/munnar-hero.mp4"
      poster="/images/munnar-video-poster.jpg"
      muted
      loop
      playsInline
      preload="metadata"
      style={{ objectPosition: "center 40%" }}
      aria-hidden="true"
    />
  );
}
