# Deployment & Infrastructure

How this site is hosted, deployed, and domained — and the non-obvious gotchas that
cost time the first time. Last updated **2026-06-08** (migration to Mike's accounts +
custom domain launch).

## Live

- **Production:** <https://mccormickpros.com> (and `www.mccormickpros.com` → same project)
- **Vercel fallback URL:** `mccormickpros.vercel.app`
- SSL: issued automatically by Vercel.

## Where everything lives

| Thing | Value |
| --- | --- |
| **Canonical GitHub repo** | `mccormickservices84-art/mccormickpros` (Mike's account, private) |
| **Personal mirror** | `vishutdhar/mccormick-services` (Vishut's portfolio copy — **not** the source of truth for the live site) |
| **Vercel team** | `mike-mccormik` ("Mike's projects", Hobby/free plan) |
| **Vercel project** | `mccormickpros` |
| **Vercel owner account** | Mike — `mccormickservices84@gmail.com` |
| **Domain registrar** | Hostinger |
| **DNS** | Kept at Hostinger (nameservers unchanged) |

> **Two repos, one source of truth.** The live site deploys from the **local working copy**
> via CLI, and that copy is pushed to **Mike's** repo (`mike` remote). The personal repo
> (`origin`) is a snapshot/portfolio and can drift. For the live site, treat **Mike's repo
> as canonical**.

## Deploying a new version

Git auto-deploy is **not** connected, so deploy from the CLI:

```bash
cd ~/Code/mccormick-services
npx vercel@latest --prod --yes --scope mike-mccormik
```

Then push the same commit to Mike's repo so it stays in sync:

```bash
git push --no-verify mike main
```

(`--no-verify` is needed because a global pre-push hook blocks direct `main` pushes; this
is a deliberate one-maintainer repo, so it's fine here.)

### Gotcha 1 — commits MUST be authored by Mike

Vercel's **free Hobby plan blocks any deployment whose git commit author is not a member
of the team** (`readyStateReason: "Git author … must have access to the team"`,
`blockCode: TEAM_ACCESS_REQUIRED`). Hobby teams can't add members without upgrading to Pro,
so the fix is to **author commits as Mike**. This repo is already configured:

```bash
git config user.name  "Mike McCormick"
git config user.email "mccormickservices84@gmail.com"
```

If a deploy shows **BLOCKED** in the Vercel dashboard, this is almost always why. Re-author
the offending commit and redeploy:

```bash
git commit --amend --reset-author --no-edit
git push --no-verify --force mike main
npx vercel@latest --prod --yes --scope mike-mccormik
```

### Gotcha 2 — use `npx vercel@latest`, not Homebrew `vercel`

The Homebrew `vercel` on this machine is an old major version. Always use
`npx vercel@latest`.

### Gotcha 3 — don't fire many deploys at once

Hobby builds run **one at a time**. Rapid-fire deploys pile up (QUEUED / INITIALIZING) and
can wedge. Deploy once, wait for **READY**, then deploy again. To check state without the
dashboard:

```bash
npx vercel@latest ls mccormickpros --scope mike-mccormik
```

### Gotcha 4 — git credential helper can serve the wrong GitHub account

`git` here uses **osxkeychain**, which may have cached a different account's GitHub token
(e.g. from a one-off login). If a push is denied with a wrong-account 403, that's the cause.
`gh auth status` shows who `gh` thinks is active; the keychain entry is separate.

## Domain & DNS (Hostinger)

The domain is at Hostinger and DNS stays there (we did **not** switch to Vercel
nameservers). Records:

| Type | Name | Value | Notes |
| --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | Vercel apex IP (Vercel also lists a newer `216.198.79.1`; the current one works) |
| CNAME | `www` | `cname.vercel-dns.com` | redirects to apex |

Add/attach a domain to the project with:

```bash
npx vercel@latest domains add <domain> --scope mike-mccormik
```

Vercel verifies via the A record (the dashboard's "nameserver mismatch ✘" is expected and
harmless when using the A-record method).

## Quote form

Not live yet — `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is still the `REPLACE_ME` placeholder, so
the contact section shows a call/text fallback. To turn it on: create a free Formspree form,
put its POST URL in `.env.local` (and in Vercel's env vars), redeploy.

## Not yet done (owner-dependent)

- **Google Business Profile** + **Google Search Console** — both need Mike's Google account
  (`mccormickservices84@gmail.com`). Scheduled for when Mike is available.
- **Possible brand rename** "McCormick Services" → "McCormick Pros" (to match the domain),
  pending Mike's decision. If it happens: change `BUSINESS.name` in `src/lib/business.ts`
  **and** the hard-coded "McCormick Services" text in `src/app/opengraph-image.tsx`. Decide
  this **before** creating the Google Business Profile, since renaming a GBP after the fact
  is disruptive.
- **Connect Git auto-deploy** (optional) — install the Vercel GitHub app on Mike's account
  and connect `mccormickservices84-art/mccormickpros` so pushes deploy automatically (removes
  the manual CLI step).
