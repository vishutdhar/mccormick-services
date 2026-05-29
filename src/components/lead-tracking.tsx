"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * LeadTracking — fires a Vercel Analytics custom event whenever a visitor taps
 * any tel: or sms: link, anywhere on the page.
 *
 * Uses ONE delegated capture-phase listener instead of wiring an onClick into
 * every CTA, so the server-rendered anchors across hero, header, contact,
 * footer, cta-band, and the mobile call bar are all covered without converting
 * any of them into client components. This is the only way to know whether the
 * site actually produces calls — there is no other analytics, and every other
 * conversion change is unmeasurable until this exists.
 *
 * `track()` is a no-op outside a Vercel deployment (dev / other hosts), so this
 * is safe everywhere. Renders nothing.
 */
export function LeadTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.('a[href^="tel:"], a[href^="sms:"]');
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const kind = href.startsWith("tel:") ? "call" : "text";
      // Coarse sense of which CTA converts: nearest section id, else the
      // structural region the link lives in.
      const where =
        link.closest("[id]")?.id ??
        (link.closest("header")
          ? "header"
          : link.closest("footer")
            ? "footer"
            : "unknown");

      track("contact_tap", { kind, where });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
