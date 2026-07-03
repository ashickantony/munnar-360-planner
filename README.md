# Munnar 360° Planner

A static, production-quality lead-generation site for **Munnar 360° Planner** — a
Kerala trip planner selling three signature experiences (Tea Hills, Backwaters,
Offbeat Trails). Built to feel the mist and make visitors want to enquire.

> Trial build. No backend/database yet — all content is static JSON, structured
> so phase-2 features (CMS, bookings, payments) slot in without a rewrite.
> Built by Synark42 / Anulink Solutions.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** (brand token system) + **shadcn/ui**-style primitives
- **Framer Motion** — hero parallax, the 360° compass, scroll reveals
- **next/font** — Anton, Caveat, Plus Jakarta Sans, Space Mono
- **lucide-react** icons
- Content in `content/*.json`, validated by **Zod** schemas in `lib/schemas.ts`

## Getting started

```bash
npm install
npm run dev            # http://localhost:3000
```

Other scripts:

```bash
npm run build          # production build
npm run start          # serve the production build
node scripts/generate-placeholders.mjs   # regenerate placeholder images
```

## Project layout

```
app/
  layout.tsx                 # fonts, header, footer (site-wide enquiry footer)
  page.tsx                   # home: hero → compass → packages → why-us → reviews
  experiences/[slug]/        # tea-hills, backwaters, offbeat-trails
  packages/[slug]/           # backwater-escape, munnar-mist, full-360-kerala
  about/
  api/enquiry/route.ts       # trial enquiry handler (validates + logs, optional email)
components/                  # hero, compass, header, footer, enquiry form, cards…
content/                     # site / experiences / packages / reviews JSON
lib/                         # schemas.ts (Zod), content.ts (typed loaders), utils.ts
public/images/               # placeholder photos + README mapping for the client swap
scripts/generate-placeholders.mjs
```

## Content & images

- **All copy lives in `content/*.json`** — components render from typed loaders in
  `lib/content.ts`. No hardcoded copy in components.
- **Prices** are plain INR integers, formatted `from ₹X,XXX` via `Intl.NumberFormat('en-IN')`.
- **Images** are brand-gradient placeholders at the exact filenames the real photos
  will use — a true drop-in swap. See [`public/images/README.md`](public/images/README.md).

## The 360° compass

The signature element (`components/compass.tsx`). Three experience nodes on a
dashed gold orbit; rotating the ring by −120°/step snaps the active node to the
top and updates the detail panel. Driven by a rotate button, node clicks, ←/→
keys, touch swipe, and scroll-linked rotation, with an overshoot snap
(`cubic-bezier(.34,1.3,.5,1)`). Fully reduced-motion aware.

## Enquiry handling (trial)

`components/enquiry-form.tsx` POSTs to `app/api/enquiry/route.ts`, which validates
and logs the lead (and emails via Resend if `RESEND_API_KEY` is set — see
`.env.example`). Always-available fallbacks sit alongside: `tel:` links and a
`wa.me` WhatsApp deep link. The `onSubmit` seam is isolated so phase 2 can point
it at a real pipeline without touching the UI.

## Deploy to Vercel

The app is a standard Next.js project — zero config on Vercel.

```bash
npm i -g vercel
vercel            # first deploy (preview URL)
vercel --prod     # production
```

Or push to GitHub and "Import Project" in the Vercel dashboard. Optionally set
`RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM` as environment variables.

## Phase 2 seams (not built — marked in code with `// PHASE 2:`)

CMS (Sanity/Payload behind the same content-loader interface) · real enquiry
pipeline (WhatsApp Business API + lead dashboard) · bookings + Razorpay · SEO
metadata / sitemap / structured data · analytics · EN/ML/HI i18n · live Google reviews.
