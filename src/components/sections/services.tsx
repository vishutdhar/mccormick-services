import Image from "next/image";
import { Droplets, PaintBucket, Sprout, Leaf, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES } from "@/lib/business";

/** Maps each service slug to its lucide icon. Kept beside the data it adorns. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  "power-washing": Droplets,
  painting: PaintBucket,
  "lawn-care": Sprout,
  "fall-cleaning": Leaf,
};

/**
 * Services — a bento layout, NOT four identical icon chips in a row.
 *
 * One large photo tile (the power-washing portrait) anchors the left and
 * grounds the section in real work; the four services sit in a 2×2 grid of
 * confident cards beside it. Each card leads with an oversized faded index
 * numeral, a lime accent rule, a big lucide icon, and a hover-lift — so the
 * grid reads as a designed editorial set rather than a generated template.
 */
export function Services() {
  return (
    <section id="services" className="bg-brand-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-olive">
            What we do
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-brand-forest sm:text-5xl">
            Services we offer
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-ink/75">
            Four things, done properly. No upselling, no jargon — just the work
            your home needs, season to season.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Photo anchor tile — spans the left column on desktop, full-width
              banner on mobile. ROYALTY-FREE UNSPLASH PLACEHOLDER — swap for
              Mike's real job photos. */}
          <div className="group relative overflow-hidden rounded-3xl bg-brand-forest ring-1 ring-brand-forest/10 lg:col-span-5">
            <div className="relative h-56 w-full sm:h-72 lg:h-full lg:min-h-[30rem]">
              <Image
                src="/work/curb-appeal-home.jpg"
                alt="A clean, well-kept suburban home with a manicured lawn in Macomb County"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime">
                  Real results
                </p>
                <p className="mt-2 max-w-xs font-display text-2xl font-bold leading-snug text-brand-cream sm:text-3xl">
                  Curb appeal that turns heads on the block.
                </p>
              </div>
            </div>
          </div>

          {/* 2×2 service cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[service.slug] ?? Sprout;
              return (
                <a
                  key={service.slug}
                  href="#contact"
                  aria-label={`Get a quote for ${service.title}`}
                  className="group/svc relative flex flex-col overflow-hidden rounded-3xl border-0 bg-white p-7 ring-1 ring-brand-forest/10 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-brand-lime/60 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-forest/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {/* Oversized faded index numeral, top-right. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-7xl font-extrabold text-brand-lime-soft/40 transition-colors group-hover/svc:text-brand-lime-soft/60"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-brand-lime-soft/60 text-brand-forest transition-colors group-hover/svc:bg-brand-lime motion-reduce:transition-none">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>

                  {/* Lime accent rule. */}
                  <span
                    aria-hidden="true"
                    className="mt-5 h-1 w-10 rounded-full bg-brand-lime transition-all group-hover/svc:w-16 motion-reduce:transition-none"
                  />

                  <h3 className="relative mt-5 font-display text-xl font-bold text-brand-forest">
                    {service.title}
                  </h3>
                  <p className="relative mt-2 flex-1 text-[0.95rem] leading-relaxed text-brand-ink/70">
                    {service.description}
                  </p>

                  <span className="relative mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-olive transition-colors group-hover/svc:text-brand-forest">
                    Get a quote
                    <ArrowRight
                      className="size-4 transition-transform group-hover/svc:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
