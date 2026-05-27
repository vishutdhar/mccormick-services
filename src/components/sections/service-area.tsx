import { MapPin, Phone } from "lucide-react";
import {
  SERVICE_AREA_CITIES,
  PRIMARY_PHONE,
  formatTelHref,
  formatPhoneDisplay,
} from "@/lib/business";

/**
 * Service area — where Mike works.
 *
 * No map embed (privacy: a real Google Map loads third-party tracking; we
 * also have no API key) and no fake gray "Map" box. Instead the towns ARE the
 * visual: a confident chip cloud on the left, and a forest brand panel on the
 * right that turns the location proof into a CTA. This reads as a designed
 * coverage statement, not a placeholder.
 */
export function ServiceArea() {
  return (
    <section id="service-area" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-stretch gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Left: headline + town chips */}
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-olive">
            Where we work
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-brand-forest sm:text-5xl">
            Serving Macomb County, Michigan
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-brand-ink/75">
            Mike covers towns across Macomb County. If you live nearby, chances
            are good he can help — here are the communities we serve most often.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {SERVICE_AREA_CITIES.map((city) => (
              <li
                key={city}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-olive/25 bg-brand-cream px-4 py-2 font-display text-sm font-semibold text-brand-forest transition-colors hover:border-brand-lime hover:bg-brand-lime-soft/40 motion-reduce:transition-none"
              >
                <MapPin
                  className="size-3.5 text-brand-olive"
                  aria-hidden="true"
                />
                {city}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: forest brand panel — replaces the old fake map entirely. */}
        <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-brand-forest bg-forest-weave p-8 text-brand-cream ring-1 ring-brand-forest/10 sm:p-10">
          {/* Soft lime glow for depth, hero-style. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-lime/15 blur-3xl"
          />
          <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-brand-lime text-brand-forest">
            <MapPin className="size-7" aria-hidden="true" />
          </span>
          <p className="relative mt-6 font-display text-2xl font-bold leading-snug sm:text-3xl">
            Don&apos;t see your town?
          </p>
          <p className="relative mt-3 max-w-sm leading-relaxed text-brand-cream/80">
            Macomb County and the surrounding communities — if you&apos;re
            close, just ask. There&apos;s a good chance Mike can still help.
          </p>
          <a
            href={formatTelHref(PRIMARY_PHONE)}
            className="relative mt-7 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full bg-brand-lime px-7 py-3 font-display text-base font-bold text-brand-forest shadow-lg transition-all hover:bg-brand-lime/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-lime/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest active:translate-y-px sm:w-auto sm:self-start"
          >
            <Phone className="size-5" aria-hidden="true" />
            Call {formatPhoneDisplay(PRIMARY_PHONE)}
          </a>
        </div>
      </div>
    </section>
  );
}
