# Five Oaks Oakville

Independent informational website for **Five Oaks**, a coming-soon Caivan Communities community of single-detached homes and townhomes in Oakville, Ontario, Canada.

Canonical origin: **https://www.fiveoaksoakville.co**

This is **not** the official Five Oaks or Caivan website. Official Five Oaks details were incomplete as of **August 24, 2026**. Pricing, floor plans, deposits, incentives, exact project location, launch date and occupancy remain to be announced.

This implementation is a functioning campaign site. It is **not** legally approved. Final legal, brokerage, privacy and compliance review remains the publisher's responsibility.

## Sibling campaign and SEO cannibalization

This `.co` site is a sibling of [fiveoaksbycaivan.ca](https://www.fiveoaksbycaivan.ca/). It uses the **same lead form contract**, **same Google Sheet**, and **same pictures**, with a **new visual design** and a hub-and-spoke URL structure.

**After this `.co` site is the campaign you want indexed**, 301 or canonical the `.ca` site (and any `.com` duplicate) to matching `.co` URLs so rankings are not split. Do not leave two indexable Five Oaks Oakville homepages with overlapping titles.

Suggested mapping once `.co` is the primary:

| Current duplicate | Target |
| --- | --- |
| `https://www.fiveoaksbycaivan.ca/` | `https://www.fiveoaksoakville.co/` |
| Privacy / disclaimer on `.ca` | Matching `/privacy` and `/disclaimer` on `.co` |

Apex `fiveoaksoakville.co` should 308 to `https://www.fiveoaksoakville.co/`.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript (strict)
- Tailwind CSS 4
- Zod 4 for server-side lead validation
- Vitest for unit tests

## Local setup

1. Copy `.env.example` to `.env.local`, or copy production env from the sibling `.ca` project and then set:

```bash
NEXT_PUBLIC_SITE_URL=https://www.fiveoaksoakville.co
NEXT_PUBLIC_SITE_DOMAIN=www.fiveoaksoakville.co
NEXT_PUBLIC_LANDING_PAGE_VARIANT=co-oakville-2026-08
```

Keep Google OAuth, spreadsheet ID, emails, analytics and verification keys as copied. Do not commit `.env.local`.

2. Install dependencies:

```bash
npm install
```

## Commands

| Task | Command |
| --- | --- |
| Install dependencies | `npm install` |
| Development server | `npm run dev` |
| Production build | `npm run build` |
| Start production server | `npm start` |
| Lint | `npm run lint` |
| Type-check | `npm run typecheck` |
| Unit tests | `npm test` |

Open [http://localhost:3000](http://localhost:3000) after `npm run dev`.

## Routes

| URL | Primary query |
| --- | --- |
| `/` | Five Oaks Oakville, Five Oaks by Caivan |
| `/location` | Where is Five Oaks |
| `/homes` | Five Oaks townhomes / detached |
| `/pricing` | Five Oaks prices / cost |
| `/floor-plans` | Five Oaks floor plans |
| `/faqs` | People Also Ask |
| `/privacy` `/disclaimer` | Trust; unique self-canonical |

Every money page has a unique title and H1, a 40–80 word answer block, a dated August 24, 2026 fact excerpt, a lead form, and links to sibling spokes.

## Environment variables

See `.env.example` for every supported variable. Important groups:

### Public identity and canonical URL

- `NEXT_PUBLIC_SITE_URL` — production origin `https://www.fiveoaksoakville.co`. Must be HTTPS and not localhost before the site is indexed.
- `NEXT_PUBLIC_SITE_DOMAIN` — `www.fiveoaksoakville.co`
- `NEXT_PUBLIC_LANDING_PAGE_VARIANT` — `co-oakville-2026-08`
- Publisher identity placeholders until legal fills them
- `NEXT_PUBLIC_NOINDEX` — keep `true` on staging. Set `false` only after the canonical domain is verified.

The site stays `noindex` until a public HTTPS canonical URL is configured **and** `NEXT_PUBLIC_NOINDEX` is not `true`.

### Lead integration

Same Sheet as the `.ca` campaign:

- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET` / `GOOGLE_OAUTH_REFRESH_TOKEN`
- `GOOGLE_SHEETS_TAB_NAME` — defaults to `Sheet1`

Sheet columns stay: Date, First Name, Last Name, Email, Phone, Product Interest, Buyer Timing, Marketing Consent, UTM Source, UTM Medium, UTM Campaign, Landing Page, Referrer, Submission ID, Project.

Project cell: `Five Oaks Oakville`.

When you `vercel link` this `.co` project, import env from the copied `.env.local` so production writes to the **same Sheet**.

Lead-delivery order:

1. If Google Sheets OAuth and a spreadsheet ID are set, the server appends the validated lead to that sheet.
2. If `LEAD_WEBHOOK_URL` is also set, the server posts the lead there after a successful Sheets write.
3. Otherwise, if internal email and an email API key are set, the server sends the internal new-lead email.
4. In non-production, if neither destination is configured, leads are appended to `.data/leads.jsonl`.
5. Set `ALLOW_LOCAL_LEAD_CAPTURE=true` only for staging or local production-server tests when no CRM is configured.
6. In production, if no destination is configured, the form returns a recoverable failure. Success is reported only after confirmed capture.

### Analytics

- `NEXT_PUBLIC_ANALYTICS_MEASUREMENT_ID`
- `NEXT_PUBLIC_ALLOW_FBCLID`
- `NEXT_PUBLIC_LANDING_PAGE_VARIANT`

`generate_lead` fires only after the server confirms capture. Names, emails, phone numbers and other form values are never sent to analytics.

## How to update project facts

All time-sensitive project copy is centralized in `lib/project-data.ts`.

1. Verify the new fact against official Five Oaks/Caivan material.
2. Update the fact ledger object: `value`, `sourceLabel`, `sourceUrl`, `checked`, `status`, and `displayBehavior`.
3. Use `VERIFIED`, `PROVISIONAL`, `CONFLICTING` or `TBA`.
4. TBA values must render as **To be announced** or **Request the latest verified update**. Do not invent a fallback.
5. Update `INFORMATION_CHECKED_ISO` / `INFORMATION_CHECKED_DISPLAY`.
6. Update visible FAQ answers if they depend on the fact.
7. Update JSON-LD only when the visible page actually supports the new entity or property.

Never treat a third-party pre-construction directory as authority for prices, deposits, incentives, launch dates, occupancy, inventory, floor plans or site address.

Do not present Caivan's general Oakville Sales Centre at 209 Oak Park Blvd. as the Five Oaks project location.

## Crawler configuration

- Allow Googlebot, Bingbot and OAI-SearchBot.
- `/api/` is disallowed.
- Homepage sitemap loc uses a trailing slash: `https://www.fiveoaksoakville.co/`
- Every page is self-canonical. Privacy, disclaimer and spokes must not canonical to home.
- `public/llms.txt` is experimental and is not a substitute for crawlable HTML.

## Known TBA project information

As of August 24, 2026, official reviewed material had not published:

- Exact project site/address/intersection
- Official site plan
- Number of lots/homes
- Lot widths, home sizes, bedroom/bathroom configurations and elevations
- Detailed features and finishes
- Price list and starting prices
- Deposit schedule
- Incentives
- Release dates and sales launch date
- Occupancy/closing dates
- Assignment rules
- Development charges
- Parking details
- Official floor plans

If a fact is unpublished, answer with the dated TBA and the form — never guess.
