import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import {
  PRIMARY_PHONE,
  formatTelHref,
  formatPhoneDisplay,
} from "@/lib/business";

/**
 * Mid-page CTA band — a full-bleed photo break that re-asserts the offer
 * halfway down the page, mirroring the hero's photo + forest-gradient
 * treatment so the page reads as one cohesive system rather than stacked
 * generic blocks.
 *
 * The overlay is intentionally heavy on the left (where the copy sits) and
 * relaxes toward the right so the clean-home result still reads. CTAs reuse
 * the exact hrefs from the hero: a tel: call and the in-page #contact anchor.
 */
export function CtaBand() {
  return (
    <section
      aria-label="Ready to get started?"
      className="relative overflow-hidden bg-brand-forest"
    >
      {/*
        Background photo. ROYALTY-FREE UNSPLASH PLACEHOLDER — swap for one of
        Mike's real finished-job photos (a clean driveway or freshly painted
        exterior reads strongest here). Below the fold, so no `priority`.
      */}
      <Image
        src="/work/cta-home.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay stack tuned to match the hero: a diagonal forest wash pulling
          weight to the left, plus a bottom-up ink scrim for legibility. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-forest/95 via-brand-forest/75 to-brand-forest/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/60 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime sm:text-sm">
            Free, no-pressure quotes
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-cream [text-shadow:0_2px_24px_rgba(26,31,18,0.5)] sm:text-5xl lg:text-6xl">
            Ready to get your home
            <br className="hidden sm:block" /> looking its best?
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-brand-cream/85 [text-shadow:0_1px_12px_rgba(26,31,18,0.5)]">
            Tell Mike what you need. You&apos;ll hear back within one business
            day — usually the same day.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
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
        </div>
      </div>
    </section>
  );
}
