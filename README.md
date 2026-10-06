# Munnar 360° Planner

A content-driven lead-generation site for **Munnar 360° Planner** — a
Kerala trip planner selling three signature experiences (Tea Hills, Backwaters,
Offbeat Trails). Built to feel the mist and make visitors want to enquire.

> The trip helper is local, rules-based, and uses published site content; it does
> not call a paid AI API. Enquiries require configured Resend delivery; there
> is no enquiry database, booking, or payment system yet.
> Built by Synark42 / Anulink Solutions.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
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
  layout.tsx                 # fonts, header, footer, and contact widgets
  page.tsx                   # home: hero → compass → packages → why-us → reviews
  experiences/[slug]/        # tea-hills, backwaters, offbeat-trails
  packages/[slug]/           # backwater-escape, munnar-mist, full-360-kerala
  about/
  privacy/
  api/enquiry/route.ts       # validates enquiries and requires successful Resend delivery
components/                  # hero, compass, contact widgets, header, footer, cards…
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

## Enquiry handling

`components/enquiry-form.tsx` POSTs to `app/api/enquiry/route.ts`. The route
validates the payload and reports success only after Resend accepts the message.
Set `RESEND_API_KEY`, `ENQUIRY_TO`, and `ENQUIRY_FROM` in Vercel; without them
the form returns an error and directs visitors to the always-available phone
and WhatsApp contacts instead. Configure a verified sender address before
accepting live enquiries.

## Trip helper and contact buttons

The site-wide trip helper suggests packages and experiences from the published
JSON content. It is a free local rules-based guide, not a generative AI chatbot.
Conversations stay in browser memory only. It cannot confirm availability or
final prices. Visitors can hand off to the persistent WhatsApp contact button.
Review `/privacy` and customize its contact/data-handling details for the
business before launch.

## Deploy to Vercel

The app is a standard Next.js project — zero config on Vercel.

```bash
npm i -g vercel
vercel            # first deploy (preview URL)
vercel --prod     # production
```

Or push to GitHub and "Import Project" in the Vercel dashboard. Before taking
enquiries, configure `RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM`, and
`NEXT_PUBLIC_SITE_URL` as environment variables.

## Phase 2 seams (not built — marked in code with `// PHASE 2:`)

CMS (Sanity/Payload behind the same content-loader interface) · real enquiry
pipeline (WhatsApp Business API + lead dashboard) · bookings + Razorpay · SEO
metadata / sitemap / structured data · analytics · EN/ML/HI i18n · live Google reviews.
