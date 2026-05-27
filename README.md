# McCormick Services

The website for McCormick Services — power washing, painting, lawn care, and fall cleaning across Macomb County, Michigan.

## Where everything lives

| What you want to change | File |
| --- | --- |
| Business name, owner, phones, tagline, hours, price range | `src/lib/business.ts` |
| List of services and descriptions | `src/lib/business.ts` (`SERVICES`) |
| Cities you serve | `src/lib/business.ts` (`SERVICE_AREA_CITIES`) |
| Hero copy | `src/components/sections/hero.tsx` |
| Trust strip wording | `src/components/sections/why.tsx` |
| Gallery photos | `public/placeholder/` — drop new images in and update `src/components/sections/gallery.tsx` |
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

Hosted on Vercel. To deploy a new version:

```bash
git push origin main
```

Vercel builds automatically on push.

## Pointing a custom domain

1. Buy a domain (Cloudflare Registrar or Namecheap, ~$12/year).
2. In Vercel → project → Settings → Domains → add the domain.
3. Follow Vercel's DNS instructions at your registrar.
4. Vercel issues a free SSL certificate automatically.

## Updating phones

Edit `PRIMARY_PHONE` and `SECONDARY_PHONE` in `src/lib/business.ts`. Every place on the site that shows a phone updates from these constants.
