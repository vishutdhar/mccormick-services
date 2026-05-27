"use client";

import { useEffect } from "react";

/**
 * Force-top guard. When the page is opened directly with a leftover hash
 * (e.g. a saved or shared `…/#contact` link), the browser would jump straight
 * to that section — so a first-time visitor lands mid-page instead of on the
 * hero. This snaps back to the top and clears the hash on the initial load.
 *
 * It runs ONCE, on mount, so it only affects a fresh page load. Clicking an
 * in-page anchor afterward (e.g. "Get a Free Quote" → #contact) does NOT
 * remount this component, so those CTAs still scroll to their section normally.
 */
export function ScrollTopOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) return;
    window.scrollTo(0, 0);
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }, []);

  return null;
}
