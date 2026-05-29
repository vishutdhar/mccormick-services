import { Phone, MessageSquareText } from "lucide-react";
import {
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  formatTelHref,
  formatSmsHref,
} from "@/lib/business";

/**
 * MobileCallBar — a persistent bottom action bar on phones (hidden at `lg`+).
 *
 * The site header's Call button only appears after the visitor scrolls past
 * the hero, so on a phone there is no always-reachable, thumb-zone call/text
 * affordance during the highest-intent first moments. This fills that gap with
 * the two actions that matter: Call (primary) and Text.
 *
 * Plain server-rendered tel:/sms: anchors — no client JS. Tap analytics come
 * from the page-level LeadTracking delegated listener. Sits above the iOS home
 * indicator via safe-area inset padding; the footer adds matching bottom
 * clearance so it never covers content.
 *
 * NOTE: this is a BOTTOM bar — unlike the earlier top mobile bar that was
 * removed for overlapping the hero's own CTAs. It complements the header
 * rather than duplicating the hero.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-cream/10 bg-brand-forest/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
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
  );
}
