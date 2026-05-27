"use client";

import { useEffect } from "react";

/**
 * ScrollReveal — progressive-enhancement controller for `.reveal` elements.
 *
 * The `.reveal` class is fully visible by default (see globals.css). This
 * client component is the *only* thing that opts the page into the hidden
 * "from" state, and it does so by adding a `reveal-enabled` gate class to
 * <html>. That means:
 *
 *   - JS disabled / failed / crawlers → `reveal-enabled` is never added →
 *     `.reveal` stays fully visible. Content is never hidden.
 *   - prefers-reduced-motion → gate is NOT added and we skip observing →
 *     everything shows statically, no movement.
 *   - JS + motion allowed → gate is added (elements hide), then an
 *     IntersectionObserver reveals each `.reveal` once as it scrolls into view.
 *
 * Renders nothing.
 */
export function ScrollReveal() {
  useEffect(() => {
    // Reduced-motion users: never hide anything, never observe. Belt-and-
    // suspenders alongside the CSS @media block.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const root = document.documentElement;

    // The gate. Adding this is what flips `.reveal` into its hidden start
    // state, so it must happen here (in JS) and not in the static markup.
    root.classList.add("reveal-enabled");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // reveal once, never re-trigger
          }
        }
      },
      {
        // Trigger slightly before an element is fully in view, and only once
        // a small portion is visible — feels deliberate, not jumpy.
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    // Observe everything already present at mount.
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      // Leave content visible if this controller ever unmounts.
      root.classList.remove("reveal-enabled");
    };
  }, []);

  return null;
}
