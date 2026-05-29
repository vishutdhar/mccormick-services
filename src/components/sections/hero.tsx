import Image from "next/image";
import { Phone, ArrowRight, Check } from "lucide-react";
import { Logo } from "@/components/logo";
import {
  BUSINESS,
  PRIMARY_PHONE,
  formatTelHref,
  formatPhoneDisplay,
} from "@/lib/business";

/**
 * Hero — the first impression. Goal: a homeowner instantly understands
 * "local guy, four honest services, one phone call away" — now photo-led.
 *
 * Composition: a full-bleed exterior photo behind the content. A forest-green
 * gradient is weighted toward the bottom-left (where the copy sits) so text is
 * WCAG-AA legible over a bright, busy image. Content is bottom-anchored and
 * left-aligned; on mobile the overlay is intentionally heavier because the
 * photo competes harder with stacked text.
 *
 * Lime CTA uses forest text (#2f4f1c on #a6ce38 clears AA for large text).
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-end overflow-hidden bg-brand-forest"
    >
      {/*
        Background photo. ROYALTY-FREE UNSPLASH PLACEHOLDER — swap for Mike's
        own job photos (a freshly washed driveway or a crisp paint job reads
        even better here). This is the LCP element, hence `priority`.
      */}
      <Image
        src="/hero/home-exterior.jpg"
        alt="Freshly maintained suburban home exterior in Macomb County, Michigan"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/*
        Overlay stack — two layers tuned for real contrast on THIS photo:
        1) A diagonal forest gradient pulling weight to the bottom-left where
           the headline lives, fading to transparent over the bright top-right
           sky so the house still reads.
        2) A bottom-up scrim that deepens on mobile (the default) and relaxes
           from `sm:` up, keeping the headline legible when copy stacks tall.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-forest/95 via-brand-forest/65 to-brand-forest/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/35 to-transparent sm:from-brand-ink/70 sm:via-brand-ink/20"
      />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36 lg:pb-28">
        <div className="max-w-2xl">
          <div
            className="reveal mb-6 flex flex-wrap items-center gap-x-3 gap-y-2"
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
          >
            <Logo width={44} className="drop-shadow-md" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime sm:text-sm">
              Power washing · Painting · Lawn care · Fall cleaning
            </span>
          </div>

          <h1
            className="reveal font-display text-5xl font-extrabold leading-[1.03] tracking-tight text-brand-cream [text-shadow:0_2px_24px_rgba(26,31,18,0.55)] sm:text-6xl lg:text-7xl"
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            {BUSINESS.name}
          </h1>

          <p
            className="reveal mt-5 max-w-xl text-lg leading-relaxed text-brand-cream/85 [text-shadow:0_1px_12px_rgba(26,31,18,0.5)] sm:text-xl"
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          >
            {BUSINESS.tagline}
          </p>

          <div
            className="reveal mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
          >
            <a
              href={formatTelHref(PRIMARY_PHONE)}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-brand-lime px-7 py-3 font-display text-base font-bold text-brand-forest shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-lime/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-lime/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest active:translate-y-px motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <Phone className="size-5" aria-hidden="true" />
              Call {formatPhoneDisplay(PRIMARY_PHONE)}
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-brand-cream/45 px-7 py-3 font-display text-base font-semibold text-brand-cream backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand-cream hover:bg-brand-cream hover:text-brand-forest hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-cream/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest active:translate-y-px motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Get a Free Quote
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
          </div>

          {/* Reassurance that travels with the primary CTAs — the same-day
              promise otherwise lived only in the Contact/CTA-band sections. */}
          <p
            className="reveal mt-5 text-sm font-medium text-brand-cream/80 [text-shadow:0_1px_8px_rgba(26,31,18,0.5)]"
            style={{ "--reveal-delay": "270ms" } as React.CSSProperties}
          >
            Free quotes · most calls answered the same day
          </p>

          {/* Trust badges — only verifiably-true claims. No "insured/licensed"
              here; that unconfirmed claim lives (with a TODO) in the Why
              section only and must not be amplified on the hero. */}
          <ul
            className="reveal mt-9 flex flex-wrap items-center gap-x-3 gap-y-3"
            style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
          >
            {[
              "Owner-operated",
              "Free quotes",
              "Locally owned · Macomb County",
            ].map((claim) => (
              <li
                key={claim}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-cream/25 bg-brand-forest/40 px-3.5 py-1.5 text-sm font-medium text-brand-cream/90 backdrop-blur-sm"
              >
                <Check
                  className="size-4 shrink-0 text-brand-lime"
                  aria-hidden="true"
                />
                {claim}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
