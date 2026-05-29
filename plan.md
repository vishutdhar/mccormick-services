# McCormick Services — Website Improvement Plan

> **Status:** research complete, nothing implemented yet (2026-05-29).
> **Source:** 8-dimension research pass (conversion/CRO, local SEO, trust, content,
> accessibility & legal, performance, analytics, growth), with every high/medium
> idea adversarially verified against the actual source files and against what is
> realistic for a **solo owner-operator** to sustain. Generic/agency advice was culled.
> **Goal of the site:** make the phone ring for a one-person local home-services
> business (power washing, painting, lawn care, fall cleaning) in Macomb County, MI.

## Headline reframe

For a brand-new, no-name solo operator, **the website is already in good shape** — the
biggest remaining levers are **off-page** (Google Business Profile, real reviews,
missed-call recovery, word-of-mouth), not more on-page polish. Sequence the work so the
free, highest-leverage off-page assets come first, and so **analytics ships before any
CRO change** (otherwise nothing can be measured).

Legend — **Impact**: high / med / low · **Effort**: S/M/L · **Conf**: confidence the
recommendation is correct & current (2026) · **Dep**: `now` (no owner input) /
`needs-mike` / `needs-decision`.

---

## 1. Buildable now — no input from Mike

Ordered by impact-per-effort. These can ship as PRs today.

- [ ] **Cookieless conversion analytics on every Call/Text tap** — *high · S · 92% · now*
  - Vercel Web Analytics + a custom event on each `tel:`/`sms:` tap. Default to cookieless
    Vercel Analytics over GA4 since there is no privacy policy/consent banner.
  - **Prerequisite for everything else** — today every tap is invisible, so Mike can't tell
    if the site produces leads and no CRO change can be validated.
  - tel:/sms: are centralized in `formatTelHref`/`formatSmsHref` (`src/lib/business.ts`),
    used at ~6 call sites (hero, header, contact ×3, footer, cta-band) → one shared handler
    wires them all.
- [ ] **Mirror the 8 service-area cities into JSON-LD `areaServed` as `City[]`** — *med · S · 84% · now*
  - `schema.ts` currently declares one `AdministrativeArea` ("Macomb County"); the 8 towns
    already exist in `SERVICE_AREA_CITIES` (`business.ts`) and render on the page.
  - Gives an explicit relevance signal for the exact "power washing Sterling Heights"
    queries locals type. Derives from the existing constant, so it can't drift.
- [ ] **Render business hours on the page** (Contact + footer) — *med · S · 80% · now (confirm w/ Mike)*
  - Hours live in `business.ts` and feed JSON-LD `openingHoursSpecification` (`schema.ts`)
    but render to no human. Sets the "call on the days he answers" expectation.
  - **UX, not SEO** (Google reads hours from GBP, not the page). Reuse `BUSINESS.hours` —
    no second source of truth. Confirm hours are still accurate before shipping.
- [ ] **Mobile sticky bottom Call/Text bar** (mobile only, hidden `lg+`) — *med · S · 85% · now*
  - The header Call button is hidden until ~0.65 viewports of scroll; no pinned affordance
    during the highest-intent first moments on a phone. Reuses the tel/sms helpers.
  - ⚠️ **Do this AFTER analytics** so the lift is observable (cited 15–32% figures are
    vendor folklore until measured). Note: a *bottom* bar doesn't overlap the hero, unlike
    the top mobile bar previously removed.
- [ ] **Quote-form a11y: `role="status"` / `aria-live="polite"` + move focus on state change** — *low · S · 88% · now*
  - `quote-form.tsx` success/error `<p>` have no live region or focus management — screen-reader
    users can't tell if submit worked. Only takes visible effect once the form is live.
- [ ] **Microcopy: same-day-response promise on hero + sticky CTAs** — *low · S · ~75% · now*
  - The speed promise exists only in Contact/CtaBand. Make the differentiator travel with
    every tap (e.g. "Free quote — most calls answered same day"). Pure copy.
- [ ] **Soften the secondary "Get a Free Quote" button until the form is live** — *low · S · 62% · now*
  - Hero/cta-band/service-cards all point at `#contact`, which currently lands on the
    "Quote by phone" fallback card (form gated by `REPLACE_ME`). Keep Call the unambiguous
    primary until the form goes live. Partly self-resolves once the form is live.

---

## 2. Needs Mike (the highest-value work lives here)

Blocked on the owner's content, accounts, or a yes/no decision.

- [ ] **Google Business Profile — Service-Area Business (no address)** — *high · S · 95% · needs-mike*
  - **The #1 lever.** For a SAB the GBP — not the website — surfaces in the Maps local pack
    that makes the phone ring; correct **primary category** is the single biggest local-pack
    factor. $0, one-time. Unblocks `sameAs` schema, citations, and the review flow.
  - **From Mike:** he must claim/verify it himself (Google mails a code). Decisions: ONE
    primary category (highest-revenue service, e.g. "Pressure washing service"); confirm
    no-storefront SAB with home address hidden; ONE primary phone (he has two:
    586-909-0027 / 586-840-6888).
- [ ] **Real Google-review flow + on-page testimonials section** — *high · M · 90% · needs-mike*
  - **Single biggest content gap** — zero social proof anywhere, and "Licensed & insured"
    was deliberately removed, so there's no third-party proof at all. 87–91% of homeowners
    read reviews before hiring; named quotes with a town ("Linda, Shelby Twp") are the
    strongest available trust lever for a new business.
  - Build as a static array in `business.ts` (same pattern as `SERVICES`). **No paid widget.
    No self-served `aggregateRating`/`review` JSON-LD** — Google killed self-served stars in
    2019 and can issue a manual action. Set up a GBP review short-link + QR card + copy-paste
    SMS template so the ask is a 5-minute same-day habit.
  - **From Mike:** real customer quotes (first name + initial + town + service), with
    permission (fabricating = FTC Fake-Reviews-Rule violation). GBP must be live first.
- [ ] **Turn the quote form live** — *high · S · 90% · needs-mike*
  - Fully built (6 fields, honeypot, fetch/success/error) but gated by `REPLACE_ME` in
    `.env.local`, so Contact renders the fallback. The form is the only async channel that
    catches a lead when Mike's on a ladder. One-line env paste.
  - **No TCPA consent checkbox** — his texting is customer-initiated, manually answered P2P
    from his own phone (outside the autodialer regime; MI has no mini-TCPA reaching it). At
    most a single plain one-liner under submit.
  - **From Mike:** create a free Formspree form, paste the POST URL into
    `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, confirm which inbox/phone receives notifications.
- [ ] **Replace ALL placeholder photos with real before/after job photos** — *high · M · 88% · needs-mike*
  - Placeholders span 6 spots: hero, why (`why-porch`), cta-band, services anchor, gallery
    (4 Unsplash shots with a visible "Sample photos for now" disclaimer), and `schema.ts`
    image (also the OG image). For power-washing/painting the before/after **is** the product
    demo and the highest-impact trust swap. One photo effort feeds the website AND the GBP.
  - Build a lightweight self-made CSS/JS before/after slider for the power-washing & painting
    tiles (no paid widget). Remove the "Sample photos" disclaimer once real photos land.
  - **From Mike:** real job photos, ideally before/after pairs + one clean exterior; phone
    photos fine; a short caption each ("Driveway, Clinton Twp").
- [ ] **Resolve insurance/license, then display the exact claim only if true** — *high · S · 82% · needs-decision*
  - "Licensed & insured" was fully removed (unconfirmed) — only TODO comments remain.
    "Insured" is one of the strongest reassurances before letting a stranger pressure-wash
    siding; MI requires a builder license for paint jobs >$600. Single chip gated on a yes/no.
    Do **not** re-add a blanket badge on speculation.
  - **From Mike:** does he carry general liability insurance? Does he hold a MI
    builder/maintenance-&-alteration license (+ number) for painting? Reinstate only what he
    confirms.
- [ ] **Free NAP citations** (Bing Places, Apple Business Connect, Yelp, Nextdoor, Facebook) — *high · M · 85% · needs-mike*
  - A handful of **consistent free** listings (not 100 directories) is the main organic path
    to calls for a no-address solo op; they also feed Google/Apple AI local answers. Apple
    Business Connect matters (iOS → Apple Maps). Nextdoor is neighbor-recommendation gold.
  - **Explicitly skip Angi/HomeAdvisor/Thumbtack** — high cost-per-lead, ghost leads.
  - **From Mike:** ONE primary phone used identically everywhere, exact name spelling +
    service-area, claim each profile himself.
- [ ] **"Meet Mike" block + a real photo of him on a job** — *med · S · 82% · needs-mike*
  - The differentiator already in the copy is "you talk to Mike directly, not a call center."
    Far more believable with a face — the only human-trust lever while reviews are zero.
    Drops into the already-TODO'd photo slot in `why.tsx`.
  - **From Mike:** one real photo (ideally on a job site) + 2–4 sentences (years in the area,
    that he personally does the work and answers the phone).

---

## 3. Beyond the website (off-page / process — flagged by completeness critic)

These aren't code, but several out-rank any on-page tweak for a solo operator.

- [ ] ⭐ **Missed-call auto-text-back** — *the biggest leak.* A one-man crew on a ladder can't
  answer most calls; a caller who hits voicemail dials the next contractor within minutes.
  A free/cheap missed-call→text auto-reply (carrier feature / Google Voice / basic VoIP)
  firing "Hi, this is Mike — saw I missed you, what can I quote?" recovers exactly the leads
  the site is built to generate. *Note: an automated business auto-text is the one place
  TCPA auto-reply rules can apply — keep it a single transactional reply, no marketing.*
- [ ] **Referral / re-book loop** — word-of-mouth and repeat work are the #1/#2 lead sources
  for residential trades, dwarfing SEO for a new business. Leave-behind card (tel + GBP review
  link), a "tell a neighbor" line, a same-day-after-job text that asks for the review AND the
  referral AND the next seasonal booking. One happy customer on a street → 3–4 jobs.
- [ ] **Email channel** — only phones exist; no `mailto`, no displayed address. Some homeowners
  (esp. paint jobs) prefer to email details/photos, and some won't call a stranger. A simple
  obfuscated email / `mailto` is a near-zero-effort capture path. Also: a branded business
  email (vs a random inbox) sets reply-trust for Formspree leads.
- [ ] **Phone-call attribution reality check** — tap-tracking measures website *intent*, not
  calls or source mix. Use GBP's free "calls from your Business Profile" metric + ask "how'd
  you find me?" at call open. A dedicated call-tracking number is likely overkill/cost here.
  Name the gap so expectations are set: taps ≠ attributed calls.

---

## 4. Later / optional (foundational but lower near-term ROI)

- [ ] **`sameAs[]` in JSON-LD** (GBP + Yelp/FB/Nextdoor URLs) — ~3 lines, blocked on those
  profiles existing first; the call-driving half happens inside GBP.
- [ ] **A few rich per-service sections/pages** with `Service`/`hasOfferCatalog` schema; wire
  sitemap + internal links when they ship. Foundational SEO that pays off over months; needs
  unique copy from Mike; unmeasurable until analytics. Park until GBP/reviews/photos/form/
  analytics are done. (`makesOffer` already in `schema.ts`; sitemap is homepage-only; footer
  links all → `#services`.)
- [ ] **On-page FAQ** answering objections (towns, response time, do I need to be home,
  one-time vs contract). Real conversion aid as **plain copy** — but the **FAQPage rich
  result was deprecated May 7 2026**, so no schema win; some Q&As (insured/pricing) collide
  with deliberate site decisions. Add once content priorities clear, with answers Mike confirms.
- [ ] **Winter positioning** — Macomb winters shut down outdoor work ~4–5 months. Reorder so
  **interior painting** is the visible winter hero (free copy reordering) so the phone keeps
  ringing Dec–Mar; avoid promising weather-impossible services. Positioning, not just SEO.
- [ ] **Light GBP photo cadence** — post a real job photo *when Mike happens to have one* (not
  a content calendar; the weekly-posting ranking claim is debunked). The value is the photo
  collection, already captured above.
- [ ] **Form friction polish** — service-as-tappable-buttons vs `<select>`, optional ZIP/town.
  M-effort refinement of an already-working form; defer until live + analytics show completion.
- [ ] **`aggregateRating`/review JSON-LD** — only after real review volume, link-out only,
  never self-served stars (near-dead mechanism; revisit only if Google policy changes).
- [ ] **Form spam defense beyond honeypot** — public `NEXT_PUBLIC_` Formspree endpoints get
  harvested; enable Formspree's captcha or a time-trap so real leads aren't buried. (Do when
  the form goes live.)
- [ ] **Privacy policy page** — the one real compliance gap once the form collects PII
  (CalOPPA + Formspree ToS). One static route + footer link. (Pairs with form-live.)
- [ ] **OG-image = real photo** for SMS/iMessage link previews — folded into the photo effort;
  the share-the-link moment is where word-of-mouth converts to a click.

---

## 5. Explicitly rejected (considered & dropped — so the list is trustworthy)

- **TCPA/SMS consent checkbox + STOP opt-out** — his flow is customer-initiated P2P texting;
  compliance theater that adds friction at the CTA without driving calls.
- **Live "Open now / Closed" indicator** — needs America/Detroit client-side math, and can
  actively suppress valuable after-hours calls. Render static confirmed hours instead.
- **Google Guaranteed / Screened badge + a wall of trust badges** — discontinued Oct 20 2025
  (folded into "Google Verified," which requires paid Local Services Ads); BBB has an annual
  fee. Spend the trust budget on free owned assets (reviews, photos, Mike's face, hours).
- **Paid review-embed widgets** (Elfsight/EmbedSocial/Trustindex, $5–29/mo) — recurring cost +
  heavy third-party tracking at low review volume; static quotes + a "Read our Google reviews"
  link beat it and preserve the all-static, no-tracking architecture.
- **Mass city×service doorway pages** (`/power-washing-sterling-heights` × N) — Google
  suppresses/penalizes; unmaintainable solo. A few rich service pages win instead.
- **Published fixed / "starting at" pricing** — risks committing a solo op to prices he can't
  honor across varied jobs; the FTC junk-fee justification doesn't apply to home services.
  "Free, exact quotes" already covers the intent.

---

## Suggested sequencing

1. **Now, no Mike, one PR:** analytics (first) → `areaServed` City[] → hours on page →
   form a11y → CTA microcopy. (Sticky bottom bar lands in a follow-up *after* analytics is
   collecting, so the lift is observable.)
2. **Mike session ("button it up"):** GBP setup → collect photos + review quotes →
   Formspree endpoint → insurance/license answer → "Meet Mike" copy/photo → citations.
   Then ship the photo swap, testimonials section, live form, insurance chip in a second PR.
3. **Process (no build):** stand up missed-call text-back + the post-job review/referral/
   rebook habit. Highest off-page ROI.
4. **Later:** service pages, FAQ copy, winter reorder, privacy page, spam defense, `sameAs`.

> Workflow reminder: every change goes via `quick-pr` → Codex auto-review → squash-merge;
> prod deploy is a separate manual `npx vercel@latest --prod --yes`.
