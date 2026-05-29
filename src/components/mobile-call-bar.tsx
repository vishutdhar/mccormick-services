"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Phone, MessageSquareText } from "lucide-react";
import {
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  formatTelHref,
  formatSmsHref,
} from "@/lib/business";

/**
 * MobileCallBar — the single persistent CTA on phones (hidden at `lg`+, where
 * the top SiteHeader plays that role instead). Call (primary) + Text, in the
 * thumb zone, above the iOS home indicator via safe-area inset padding.
 *
 * Like the header, it stays OUT of the way over the hero — otherwise the hero's
 * own Call/Quote CTAs plus this bar would stack four call/text buttons into one
 * screen. It slides up only once the visitor scrolls past the hero, so the first
 * impression stays clean. Exactly one persistent affordance per platform: the
 * top header on desktop, this bottom bar on mobile — never both at once.
 *
 * Progressive enhancement mirrors SiteHeader:
 *   - SSR / JS off / crawlers → the <noscript> rule forces it visible + interactive.
 *   - JS → hidden over the hero, revealed on scroll; `inert` while hidden (gated
 *     on a hydration probe so the no-JS bar isn't inert). Reduced-motion: no slide.
 */

const noopSubscribe = () => () => {};

export function MobileCallBar() {
  // Hidden on first paint (a fresh load lands over the hero), so SSR and the
  // first client render agree and nothing flashes. The <noscript> override
  // below handles the JS-disabled case separately.
  const [hiddenOverHero, setHiddenOverHero] = useState(true);
  const [animate, setAnimate] = useState(false);
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    const measure = () => {
      // Same threshold as the header so the two affordances hand off in sync.
      const threshold = Math.min(window.innerHeight * 0.65, 560);
      setHiddenOverHero(window.scrollY < threshold);
    };
    measure();
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
      <noscript>
        <style>{`.mobile-call-bar{transform:none!important;opacity:1!important;pointer-events:auto!important}`}</style>
      </noscript>
      <div
        inert={mounted && hiddenOverHero}
        className={`mobile-call-bar fixed inset-x-0 bottom-0 z-40 border-t border-brand-cream/10 bg-brand-forest/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden ${
          animate
            ? "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            : ""
        } ${
          hiddenOverHero
            ? "pointer-events-none translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-stretch gap-3 px-4 py-3">
          <a
            href={formatTelHref(PRIMARY_PHONE)}
            className="inline-flex min-h-[3rem] flex-1 items-center justify-center gap-2 rounded-full bg-brand-lime px-4 font-display text-sm font-bold text-brand-forest shadow-md transition-colors hover:bg-brand-lime/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-lime/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest active:translate-y-px"
          >
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            Call Mike
          </a>
          <a
            href={formatSmsHref(SECONDARY_PHONE)}
            className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border-2 border-brand-cream/40 px-5 font-display text-sm font-semibold text-brand-cream transition-colors hover:border-brand-cream/70 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-cream/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest active:translate-y-px"
          >
            <MessageSquareText className="size-4 shrink-0" aria-hidden="true" />
            Text
          </a>
        </div>
      </div>
    </>
  );
}
