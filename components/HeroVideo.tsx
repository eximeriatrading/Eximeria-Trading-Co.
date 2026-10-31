"use client";

import { useEffect, useRef, useState } from "react";

// Rendered only after mount, and skipped for reduced-motion or data-saver visitors,
// who keep the poster image behind it and never download the video.
export default function HeroVideo() {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!reduced && !saveData) setEnabled(true);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true; // Browsers only allow autoplay when muted.
    video.play().catch(() => {
      // Autoplay refused (e.g. low-power mode): the poster stays visible.
    });
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={ref}
      className={`hero__video${playing ? " is-playing" : ""}`}
      src="/videos/hero-port.mp4"
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
    />
  );
}
