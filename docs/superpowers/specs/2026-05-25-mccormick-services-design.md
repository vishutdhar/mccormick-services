# McCormick Services — Website Design Spec

**Date:** 2026-05-25
**Status:** Approved (v1 scope)
**Stakeholder:** Mike McCormick (owner, McCormick Services, Macomb County MI)
**Project sponsor:** Vishut Dhar

---

## 1. Purpose

Build a one-page marketing website for McCormick Services, an owner-operated residential services business in Macomb County, Michigan. The goal is to give Mike a professional online presence that turns local search traffic into phone calls and quote requests for power washing, painting, lawn care, and fall cleaning.

This is v1. Out-of-scope features (booking, payments, blog, CMS, multi-page) can be layered on later without restructuring.

## 2. Audience & success criteria

**Primary audience:** homeowners and small property managers in Macomb County, MI, searching for residential exterior services on mobile devices.

**Primary conversion:** phone call (highest-intent action for a local services business).
**Secondary conversion:** quote-request form submission.

**Success criteria:**

- Mobile-first layout; most local-services search traffic is mobile.
- Trust signals visible above the fold: real owner name, local area, services list, phone CTA.
- "Tap to call" is reachable from any scroll position.
- Valid `LocalBusiness` JSON-LD schema for Google rich results.
- Lighthouse mobile scores ≥ 95 on Performance, Accessibility, Best Practices, and SEO.
- Page weight under 200 KB compressed for the initial route.

## 3. Tech stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16, App Router | Matches existing project conventions; first-class Vercel deploy; static optimization for marketing pages. |
| Language | TypeScript | Type safety; lower regression risk when Mike or another helper edits later. |
| Styling | Tailwind CSS v4 | Utility-first; pairs with shadcn/ui; small production bundle. |
| Components | shadcn/ui | Accessible, customizable primitives; convention from frontend-design skill. |
| Forms | Formspree free tier | 50 submissions/month; no server required; emails Mike directly. |
| Hosting | Vercel free tier | Zero config; free SSL; preview deployments; CDN. |
| Analytics | TBD (PostHog or none for v1) | Confirm with sponsor before adding. |
| Domain | `mccormick-services.vercel.app` (v1) | Free; upgrade to custom `.com` later. |

## 4. Brand

Extracted from Mike's business card photo. Values are approximate — refine against the printed card or a color picker on a high-resolution scan before final build.

| Token | Hex (approx) | Use |
|---|---|---|
| `--brand-lime` | `#A6CE38` | Hero accent, primary buttons, highlights |
| `--brand-olive` | `#6B7F2C` | Body headings, secondary fills |
| `--brand-forest` | `#2F4F1C` | Footer, dark text, deep accents |
| `--brand-cream` | `#FAFAF5` | Page background |
| `--brand-ink` | `#1A1F12` | Default body text |

**Typography:**

- Headings: Manrope (variable) — clean, modern, free on Google Fonts.
- Body: Inter (variable) — neutral, legible, free on Google Fonts.
- Both load via `next/font` for self-hosted delivery, no layout shift.

**Logo:** the green recycle arrows from the card, recreated as an inline SVG using `--brand-lime` and `--brand-forest`. Inline SVG avoids an extra request and lets the logo scale and theme cleanly.

## 5. Page structure (single-page, anchor-scrolled)

1. **Hero**
   - H1: "McCormick Services"
   - Sub: "Power washing, painting, lawn care, and fall cleaning across Macomb County."
   - Primary CTA: `Call 586-909-0027` → `tel:+15869090027`
   - Secondary CTA: `Get a Free Quote` → `#contact`
   - Owner trust line: "Owned and operated by Mike McCormick."
   - Background: brand-lime gradient with subtle texture; legible at WCAG AA.

2. **Services**
   - 4-card grid; responsive (1 col mobile, 2 col tablet, 4 col desktop).
   - Cards: Power Washing, Painting, Lawn Care, Fall Cleaning.
   - Each card: icon (Lucide), title, one-line description, "Get a quote" link to `#contact`.

3. **Why McCormick**
   - Trust strip with 3–4 short value props:
     - Local — based in Macomb County
     - Owner-operated — you talk to Mike directly
     - Insured / licensed *(confirm before publishing — placeholder copy until then)*
     - Years in business *(placeholder until confirmed)*

4. **Gallery / before-after**
   - Responsive grid; 4–6 placeholder slots in v1.
   - Each slot supports a single image or a before/after pair with a caption (service + location).
   - Placeholders clearly labeled so they cannot accidentally ship as "real work."

5. **Service area**
   - Heading: "Serving Macomb County, Michigan."
   - Default cities list (confirm with Mike): Sterling Heights, Warren, Macomb Township, Clinton Township, Shelby Township, Roseville, Eastpointe, St. Clair Shores.
   - Optional embedded Google Map centered on Macomb County. If embedded, lazy-loaded via `<iframe loading="lazy">`.

6. **Contact**
   - Both card numbers as `tel:` links: `586-909-0027` and `586-840-6888`.
   - Quote form fields:
     - Name (required)
     - Phone (required)
     - Email (optional)
     - Service (select: Power Washing / Painting / Lawn Care / Fall Cleaning / Other)
     - Message (optional)
   - Honeypot field for spam mitigation.
   - Client-side validation; submission via Formspree POST; success and error states inline.
   - Form action target is environment-controlled (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`) so it can be repointed without code changes.

7. **Footer**
   - Business name + one-line tagline.
   - Services list.
   - Both phones as `tel:` links.
   - Service area summary.
   - Dynamic copyright year.

## 6. SEO

- `<title>`: "McCormick Services | Power Washing, Painting, Lawn Care | Macomb County MI"
- `<meta name="description">`: services + area, ~150 chars.
- `LocalBusiness` JSON-LD: `name`, `telephone`, `areaServed`, `priceRange`, `openingHours`, `image`, `url`, `sameAs`. Address omitted unless Mike wants a street published; county/state alone is acceptable.
- Open Graph + Twitter Card meta tags with a branded preview image.
- Section H2s include service + city keywords (e.g., "Power washing in Sterling Heights and Warren").
- All images: descriptive alt text.
- `sitemap.xml` and `robots.txt` generated via Next.js metadata API.

## 7. Accessibility

- WCAG 2.2 AA color contrast for all text. Lime-on-white and white-on-lime combinations must be verified — lime is borderline and may need a darker variant for text.
- All interactive elements keyboard-navigable; visible focus rings.
- Form labels programmatically associated with inputs; errors announced to assistive tech.
- Skip-link to main content. **Must hide using `transform: translateY(-100%)`**, not `top: -40px` — the `top` approach produces a visible bar because the element height exceeds 40 px.
- `prefers-reduced-motion` respected on any scroll or transition animation.
- Hit targets ≥ 44×44 px on mobile.

## 8. Responsive breakpoints

- Base: mobile-first.
- `sm` ≥ 640 px: hero text scale up; services 2-col.
- `md` ≥ 768 px: gallery 2-col.
- `lg` ≥ 1024 px: services 4-col; gallery 3-col.
- `xl` ≥ 1280 px: max-width container, generous side gutters.

## 9. Performance budget

- Total transfer ≤ 200 KB compressed for initial route (excluding images).
- Images served via `next/image`, AVIF/WebP, lazy-loaded below the fold.
- Fonts via `next/font` (self-hosted, `display: swap`).
- No client-side JS for the hero, services, why, service area, or footer (static markup).
- Quote form is the only interactive island; mounts client-side only on contact section.

## 10. Deliverables

- Working site deployed to Vercel preview and production.
- `README.md` for Mike (or any future helper):
  - How to swap photos.
  - How to update phone numbers, service area, services list.
  - How to point a custom domain.
  - How to reach the Formspree inbox.
- Spec self-review notes in the spec doc, marked resolved.

## 11. Open items (do not block scaffolding — placeholders are explicit)

- Mike's email for Formspree delivery.
- Insurance / license status — affects trust strip copy.
- Years in business — affects trust strip copy.
- Real project photos — affects gallery section.
- Service area cities — confirm the default list.
- Custom domain decision and registrar.
- Analytics opt-in (PostHog vs none).

## 12. Out of scope (v1)

- Online booking / scheduling.
- Pricing display.
- Blog / content marketing.
- Multi-page architecture.
- E-commerce / payments.
- Headless CMS.
- Internationalization.

## 13. Review recommendation

This is a new feature (greenfield) and will eventually touch a deployed surface (Vercel production). Once implemented, this change meets review criteria under CLAUDE.md Rule 10 (new feature; will be deployed to production). Independent review of the implementation PR is recommended before pointing a real domain or sharing the URL with Mike's customers.
