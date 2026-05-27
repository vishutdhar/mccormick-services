import { Phone, MessageSquareText } from "lucide-react";
import { QuoteForm } from "@/components/quote-form";
import {
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  formatTelHref,
  formatSmsHref,
  formatPhoneDisplay,
} from "@/lib/business";

/**
 * Contact — the conversion section (SERVER component).
 *
 * The quote form posts to a Formspree endpoint supplied via
 * NEXT_PUBLIC_FORMSPREE_ENDPOINT. Until Mike pastes a real endpoint, the env
 * var holds the "REPLACE_ME" placeholder — in that case we render a friendly
 * call/text fallback instead of a form that would silently fail. This must
 * never crash the page when the endpoint is missing or unconfigured.
 */
export function Contact() {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const formReady = !!endpoint && !endpoint.includes("REPLACE_ME");

  return (
    <section id="contact" className="bg-brand-cream bg-dot-grid py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-olive">
            Let&apos;s talk
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-brand-forest sm:text-5xl">
            Get a free quote
          </h2>
          <span
            aria-hidden="true"
            className="mt-5 block h-1 w-16 rounded-full bg-brand-lime"
          />
          <p className="mt-5 text-lg leading-relaxed text-brand-ink/75">
            We respond within one business day — usually the same day.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: talk to a human */}
          <div className="flex flex-col">
            <h3 className="font-display text-2xl font-bold text-brand-forest">
              Call or text
            </h3>
            <p className="mt-2 text-brand-ink/70">
              Prefer to just talk it through? Reach Mike directly.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <a
                href={formatTelHref(PRIMARY_PHONE)}
                className="group flex min-h-[3.5rem] items-center gap-4 rounded-2xl bg-brand-forest px-5 py-4 text-brand-cream transition-colors hover:bg-brand-forest/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-forest/40"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-lime text-brand-forest">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-brand-cream/70">
                    Primary
                  </span>
                  <span className="font-display text-2xl font-bold sm:text-3xl">
                    {formatPhoneDisplay(PRIMARY_PHONE)}
                  </span>
                </span>
              </a>

              <a
                href={formatTelHref(SECONDARY_PHONE)}
                className="group flex min-h-[3.5rem] items-center gap-4 rounded-2xl border-2 border-brand-forest/15 bg-white px-5 py-4 text-brand-forest transition-colors hover:border-brand-forest/30 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-forest/40"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-lime-soft text-brand-forest">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-brand-olive">
                    Secondary
                  </span>
                  <span className="font-display text-2xl font-bold sm:text-3xl">
                    {formatPhoneDisplay(SECONDARY_PHONE)}
                  </span>
                </span>
              </a>
            </div>

            <a
              href={formatSmsHref(SECONDARY_PHONE)}
              className="mt-5 inline-flex min-h-[2.75rem] items-center gap-2 self-start font-display font-semibold text-brand-olive transition-colors hover:text-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest/40 focus-visible:ring-offset-2"
            >
              <MessageSquareText className="size-5" aria-hidden="true" />
              Prefer to text? Tap to text
            </a>
          </div>

          {/* Right: the quote form (or graceful fallback). Lime top-rule ties
              the card to the brand system without touching form logic. */}
          <div className="overflow-hidden rounded-3xl border-t-4 border-brand-lime bg-white p-6 shadow-lg ring-1 ring-brand-forest/10 sm:p-8">
            {formReady ? (
              <QuoteForm endpoint={endpoint!} />
            ) : (
              <div className="flex h-full flex-col justify-center">
                <h3 className="font-display text-xl font-bold text-brand-forest">
                  Quote by phone
                </h3>
                <p className="mt-3 text-brand-ink/75">
                  Online quote form coming soon — please call or text for now.
                </p>
                <a
                  href={formatTelHref(PRIMARY_PHONE)}
                  className="mt-6 inline-flex min-h-[3rem] items-center justify-center gap-2 self-start rounded-full bg-brand-lime px-6 py-3 font-display font-bold text-brand-forest transition-colors hover:bg-brand-lime/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-forest/40"
                >
                  <Phone className="size-5" aria-hidden="true" />
                  Call {formatPhoneDisplay(PRIMARY_PHONE)}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
