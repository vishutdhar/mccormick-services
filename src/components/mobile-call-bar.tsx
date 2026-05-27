import { Phone, ArrowRight } from "lucide-react";
import { PRIMARY_PHONE, formatTelHref } from "@/lib/business";

/**
 * Sticky mobile call bar — bottom-fixed conversion shortcut shown ONLY on
 * small screens (`sm:hidden`). The two biggest decisions a phone visitor
 * makes are "call now" or "get a quote", so we keep exactly those two large
 * tap targets always within thumb reach.
 *
 * iOS safe-area: the bar pads its bottom with env(safe-area-inset-bottom) so
 * it never sits under the home indicator. The page adds matching bottom
 * padding (see page.tsx) so the bar never covers footer content.
 */
export function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-lime/20 bg-brand-forest/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md shadow-[0_-8px_24px_rgba(26,31,18,0.35)] sm:hidden"
      role="navigation"
      aria-label="Quick contact"
    >
      <div className="flex items-center gap-3">
        <a
          href={formatTelHref(PRIMARY_PHONE)}
          className="flex min-h-[3rem] flex-1 items-center justify-center gap-2 rounded-full bg-brand-lime font-display text-base font-bold text-brand-forest transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-px focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-lime/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <Phone className="size-5" aria-hidden="true" />
          Call
        </a>
        <a
          href="#contact"
          className="flex min-h-[3rem] flex-1 items-center justify-center gap-2 rounded-full border-2 border-brand-cream/70 font-display text-base font-semibold text-brand-cream transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-px focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-cream/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          Quote
          <ArrowRight className="size-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
