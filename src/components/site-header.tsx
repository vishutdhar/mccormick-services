"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import {
  BUSINESS,
  PRIMARY_PHONE,
  formatTelHref,
  formatPhoneDisplay,
} from "@/lib/business";

/**
 * SiteHeader — a reveal-on-scroll app bar.
 *
 * The hero is a deliberate, full-bleed first impression, so the header stays
 * OUT of the way over it and only slides in once the visitor scrolls past the
 * hero. Its real job is to carry an always-available Call button (and brand)
 * through the rest of the long single-page scroll — the persistent call
 * affordance the page otherwise lacks below the fold.
 *
 * Progressive enhancement (mirrors ScrollReveal's gate philosophy):
 *   - SSR / JS disabled / crawlers → renders VISIBLE and solid. A plain,
 *     working sticky-style header. Nothing is hidden behind JS.
 *   - JS enabled → on mount we measure scroll position and hide the bar while
 *     the hero is on screen, revealing it once scrolled past the threshold.
 *
 * It is `fixed` (not sticky) so it never reserves layout space — the hero
 * stays flush to the top of the viewport. In-page anchor targets clear the bar
 * via `scroll-padding-top` on <html> (see globals.css).
 */

/** Stable no-op subscription for the hydration probe below — the value never
 *  changes after mount, so there is nothing to subscribe to. */
const noopSubscribe = () => () => {};

/** Desktop anchor links. Each maps to an existing in-page section id. */
const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Mike" },
  { href: "#gallery", label: "Work" },
  { href: "#service-area", label: "Areas" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  // Hydrated initial state is HIDDEN. A fresh load lands at the top (over the
  // hero), where the bar should be hidden anyway — so the server markup and
  // the first client render agree, and there is no flash of the bar over the
  // hero before the effect runs. The no-JS fallback is handled separately by
  // the <noscript> override below (which forces the bar visible), so starting
  // hidden here does NOT strand JS-disabled visitors.
  const [hiddenOverHero, setHiddenOverHero] = useState(true);
  // Whether JS has taken over. Until then we must not apply `inert`, or a
  // no-JS visitor (whose bar the <noscript> rule reveals) would get a header
  // with dead links. Returns false on the server and the first hydration
  // render, then true — the canonical "am I hydrated" probe, with no
  // setState-in-effect.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  // Transitions are enabled one frame AFTER mount, so the first measurement
  // (e.g. a deep-linked load landing mid-page) snaps instantly instead of
  // animating — no slide glitch on first paint.
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const measure = () => {
      // Reveal once the visitor is roughly past the hero. Capped so very tall
      // viewports don't push the reveal point unreasonably far down.
      const threshold = Math.min(window.innerHeight * 0.65, 560);
      setHiddenOverHero(window.scrollY < threshold);
    };

    measure(); // set correct initial state before transitions are on
    const raf = requestAnimationFrame(() => setAnimate(true));

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <>
      {/* No-JS fallback, kept SEPARATE from the hydrated initial state: with JS
          off, the reveal logic never runs, so force the bar to its visible,
          interactive resting state. (With JS on, this <style> is inert.) */}
      <noscript>
        <style>{`.site-header{transform:none!important;opacity:1!important;pointer-events:auto!important}`}</style>
      </noscript>
      <header
        // While hidden over the hero the bar is only visually offscreen, so mark
        // it inert to keep its links out of the tab order and pointer flow until
        // it is revealed. Only once JS has mounted — otherwise a no-JS visitor
        // (whose bar <noscript> reveals) would get dead, unfocusable links.
        inert={mounted && hiddenOverHero}
        className={`site-header fixed inset-x-0 top-0 z-40 hidden border-b border-brand-cream/10 bg-brand-forest/95 shadow-lg shadow-brand-ink/20 backdrop-blur-md lg:block ${
        animate
          ? "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          : ""
      } ${
        hiddenOverHero
          ? "pointer-events-none -translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 sm:px-8">
        {/* Brand → back to top */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest"
          aria-label={`${BUSINESS.name} — back to top`}
        >
          <Logo width={30} />
          <span className="font-display text-base font-bold tracking-tight text-brand-cream">
            {BUSINESS.name}
          </span>
        </a>

        {/* Desktop anchor nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-display text-sm font-semibold text-brand-cream/75 transition-colors hover:text-brand-lime focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest motion-reduce:transition-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Always-present Call CTA — the persistent affordance the page lacks
            below the fold. Full number on larger screens, compact on mobile. */}
        <a
          href={formatTelHref(PRIMARY_PHONE)}
          className="inline-flex min-h-[2.75rem] shrink-0 items-center gap-2 rounded-full bg-brand-lime px-4 py-2 font-display text-sm font-bold text-brand-forest shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-lime/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-lime/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest active:translate-y-px motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-5"
        >
          <Phone className="size-4 shrink-0" aria-hidden="true" />
          <span className="sm:hidden">Call</span>
          <span className="hidden sm:inline">
            Call {formatPhoneDisplay(PRIMARY_PHONE)}
          </span>
        </a>
      </div>
      </header>
    </>
  );
}
