import { Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import {
  BUSINESS,
  SERVICES,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  formatTelHref,
  formatPhoneDisplay,
  groupedBusinessHours,
} from "@/lib/business";

/** All service links scroll to the single in-page Services section. */
const SERVICE_ANCHOR = "#services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-forest bg-forest-weave text-brand-cream">
      {/* Extra bottom padding below `lg` so the fixed MobileCallBar never
          covers the footer's last rows. */}
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-28 sm:px-8 lg:pb-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* 1: brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-cream/95 p-1.5">
                <Logo width={36} />
              </span>
              <span className="font-display text-xl font-bold">
                {BUSINESS.name}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="mt-5 block h-1 w-12 rounded-full bg-brand-lime"
            />
            <p className="mt-4 max-w-xs leading-relaxed text-brand-cream/75">
              {BUSINESS.tagline}
            </p>
          </div>

          {/* 2: services */}
          <nav aria-label="Services">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-lime">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <a
                    href={SERVICE_ANCHOR}
                    className="inline-flex min-h-[2.5rem] items-center text-brand-cream/80 transition-colors hover:text-brand-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3: contact */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-lime">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-2.5">
              {[PRIMARY_PHONE, SECONDARY_PHONE].map((phone) => (
                <li key={phone}>
                  <a
                    href={formatTelHref(phone)}
                    className="inline-flex min-h-[2.5rem] items-center gap-2 font-display text-lg font-semibold text-brand-cream transition-colors hover:text-brand-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest"
                  >
                    <Phone className="size-4 text-brand-lime" aria-hidden="true" />
                    {formatPhoneDisplay(phone)}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-brand-cream/70">
              Serving {BUSINESS.areaServed} — owned and operated by{" "}
              {BUSINESS.owner}.
            </p>

            <h2 className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-lime">
              Hours
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-brand-cream/70">
              {groupedBusinessHours().map((line) => (
                <li
                  key={line.days}
                  className="flex max-w-[13rem] justify-between gap-4"
                >
                  <span>{line.days}</span>
                  <span
                    className={line.hours === "Closed" ? "text-brand-cream/40" : ""}
                  >
                    {line.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-brand-cream/15 pt-6 text-sm text-brand-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {BUSINESS.name}.
          </p>
          <p>Built with care.</p>
        </div>
      </div>
    </footer>
  );
}
