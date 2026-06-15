# Deploying to Vercel

This project is a TanStack Start app built with Vite + Nitro. It's preconfigured to deploy on Vercel.

## One-time setup

1. Push this repo to GitHub (already connected via Lovable).
2. Go to https://vercel.com/new and **Import** the GitHub repo
   `evaluation-context-protocol/evaluationcontextprotocol`.
3. On the import screen, leave defaults — Vercel will read `vercel.json`:
   - Install: `bun install`
   - Build:   `bun run build`
   - Output:  `.vercel/output` (Vercel Build Output API, emitted by Nitro)
4. Click **Deploy**.

That's it. Every push to the default branch redeploys automatically; PRs get preview URLs.

## How it works

- `vite.config.ts` detects the `VERCEL` env var that Vercel CI sets and pins the
  Nitro preset to `vercel`. Nitro then emits `.vercel/output/` in the Vercel
  Build Output API format, so SSR runs on Vercel Functions and static assets
  are served from Vercel's CDN.
- Inside the Lovable sandbox this override is ignored — Lovable forces the
  Cloudflare preset for its own preview/publish flow.

## Environment variables

Set any `VITE_*` (public, injected at build) or server-only variables in
**Vercel → Project → Settings → Environment Variables** before deploying.

## Custom domain

Vercel → Project → Settings → Domains. Add `evaluationcontextprotocol.org`
(or whatever you own) and follow the DNS instructions.
