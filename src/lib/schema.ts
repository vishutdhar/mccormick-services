import {
  BUSINESS,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  SERVICES,
  formatTelHref,
} from "./business";

const toE164 = (phone: string): string =>
  formatTelHref(phone).replace(/^tel:/, "");

/**
 * LocalBusiness (HomeAndConstructionBusiness) structured data for Google's
 * local pack / rich results. Derived entirely from `business.ts` so it never
 * drifts from the visible site. No street address is published — Mike runs a
 * service-area business — so `areaServed` + region carry the local signal.
 */
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: BUSINESS.name,
    description: BUSINESS.tagline,
    url: BUSINESS.url,
    image: `${BUSINESS.url}/work/curb-appeal-home.jpg`,
    telephone: toE164(PRIMARY_PHONE),
    priceRange: BUSINESS.priceRange,
    areaServed: {
      "@type": "AdministrativeArea",
      name: BUSINESS.areaServed,
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: BUSINESS.state,
      addressCountry: BUSINESS.country,
    },
    openingHoursSpecification: BUSINESS.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
    contactPoint: [PRIMARY_PHONE, SECONDARY_PHONE].map((phone) => ({
      "@type": "ContactPoint",
      telephone: toE164(phone),
      contactType: "customer service",
    })),
    makesOffer: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  };
}

/**
 * Serializes the schema for embedding in a `<script type="application/ld+json">`
 * element. Escapes `<` to its unicode equivalent so the JSON payload can never
 * break out of the script element (the XSS-safety step from Next.js's JSON-LD
 * guide). All inputs are compile-time constants from `business.ts`.
 */
export function serializeSchemaForScript(): string {
  return JSON.stringify(buildLocalBusinessSchema()).replace(/</g, "\\u003c");
}
