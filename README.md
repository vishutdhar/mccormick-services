# McCormick Services

The website for McCormick Services — power washing, exterior painting, lawn care, and seasonal cleanup across Macomb County, Michigan. **Live at <https://mccormickpros.com>.**

## Where everything lives

| What you want to change | File |
| --- | --- |
| Business name, owner, phone, tagline, hours, price range | `src/lib/business.ts` |
| List of services and descriptions | `src/lib/business.ts` (`SERVICES`) |
| Cities you serve | `src/lib/business.ts` (`SERVICE_AREA_CITIES`) |
| Hero copy | `src/components/sections/hero.tsx` |
| Trust strip wording | `src/components/sections/why.tsx` |
| Gallery / hero photos | `public/work/` and `public/hero/` — drop new images in and update `src/components/sections/gallery.tsx` / `hero.tsx` (currently stock illustrations, framed as service examples — not Mike's own jobs) |
| Footer | `src/components/sections/footer.tsx` |

## Running locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Tests

```bash
npm test
```

## Where quote form submissions go

The quote form posts to Formspree. The endpoint is set in `.env.local` as `NEXT_PUBLIC_FORMSPREE_ENDPOINT`. Create or manage your Formspree form at <https://formspree.io>. Submissions arrive in the email address you configured there. Until a real endpoint is set, the contact section shows a "call or text" fallback instead of the form.

To change the destination email: log into Formspree, edit the form's destination email — no code changes needed.

## Deploying

**Live at <https://mccormickpros.com>**, hosted on Mike's Vercel (team `mike-mccormik`,
project `mccormickpros`). Git auto-deploy is **not** connected yet, so deploys are run
from the CLI:

```bash
npx vercel@latest --prod --yes --scope mike-mccormik
```

> Two things that will bite you if you skip them — see `docs/DEPLOYMENT.md` for the full
> story:
> 1. **Commits must be authored by Mike**, or Vercel's free-tier rule blocks the deploy
>    (`TEAM_ACCESS_REQUIRED`). This repo's git author is already set to Mike.
> 2. Use `npx vercel@latest`, not the older Homebrew `vercel`.

## Custom domain

Already live: `mccormickpros.com` (registered at Hostinger, DNS kept at Hostinger).
The records are `A @ → 76.76.21.21` and `CNAME www → cname.vercel-dns.com`. Vercel issued
the SSL certificate automatically. Full details in `docs/DEPLOYMENT.md`.

## Updating the phone number

The business uses **one** number — `PRIMARY_PHONE` in `src/lib/business.ts` (currently
586-840-6888, Mike's iMessage-capable line). Every call/text link and displayed number on
the site derives from this single constant, including the JSON-LD and the quote-form
fallback.
