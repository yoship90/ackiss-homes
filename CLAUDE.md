# Ackiss Homes — Project Context

## Overview
Professional real estate website for Ackiss Homes. Single-page site with dark/luxury aesthetic.

## Tech Stack
- Next.js 15 (App Router), TypeScript, Tailwind CSS 4
- Deployed on Vercel (auto-deploys from GitHub master branch)
- GitHub: yoship90/ackiss-homes
- Production URL: https://www.ackisshomes.com
- Vercel URL (also works): https://ackiss-homes.vercel.app
- Node.js installed locally at C:/Users/Admin/nodejs (not in system PATH — use `export PATH="/c/Users/Admin/nodejs:$PATH"` before npm/node commands)
- GitHub CLI installed at C:/Users/Admin/gh-temp/bin/gh.exe
- Start local dev server: `export PATH="/c/Users/Admin/nodejs:$PATH" && npm run dev -- --port 3000` or double-click `start-dev.bat`

## Environment Variables
- `NEXT_PUBLIC_SITE_URL` — set to `https://www.ackisshomes.com` in Vercel and `.env`. Locally overridden to `http://localhost:3000` in `.env.local`
- `FUB_API_KEY` — Follow Up Boss API key. Set in Vercel env vars and `.env.local` (gitignored). Never committed to git.

## Site Structure (top to bottom)
1. Header — Sticky nav with logo + section links, mobile hamburger menu
2. Hero — Full-screen dark background with logo watermark, headline, CTA
3. About — Company intro + animated stat counters (200+ homes, 15+ years, 98% satisfaction, 50+ reviews) + Zillow review links (Amanda + Jeremy)
4. Services — 4-card grid (Buying, Selling, Rentals, Consultations)
5. Property Inquiry — "Browsing Homes Online?" lead capture form (address/MLS ID + contact info) → pushes to FUB
6. Listings — Featured property cards (conditionally hidden when empty)
7. MLS Search — Triumph Realty IDX iframe embed (currently live, pending Triumph approval)
8. Mortgage Calculator — Payment calculator with amortization schedule + historical rate chart (Recharts)
9. Testimonials — 3 client quote cards
10. Social Feed — Instagram placeholder grid (ready for Behold/Instagram integration)
11. Contact — Form (name/email/phone/message) + business info sidebar → pushes to FUB
12. Footer — Logo, social links, copyright

## Design
- Dark backgrounds (#0a0a0a to #2a2a2a), gold/amber accent (#c9952e)
- Fonts: Playfair Display (headings), Inter (body)
- ScrollReveal animations on all sections
- Mobile responsive with hamburger nav

## Key Decisions
- Broker is Triumph Realty (triumphrealtyva.com) — they use Placester for IDX
- MLS iframe embed works (no X-Frame-Options blocking) but need Triumph's permission before going live permanently
- Follow Up Boss (FUB) used for lead management. Both Contact and Property Inquiry forms push leads via `/api/lead` route using FUB `/v1/events` endpoint. Tags applied via follow-up PUT to `/v1/people/{id}`.
- FUB lead tags: `website-lead` + `website-contact` or `website-property-inquiry`
- FUB featured listings: planned via custom fields (Featured on Website, Listing Price, Address, Beds, Baths, Sqft, Status, Zillow Link, Photo URL) — not yet wired up
- Listings section auto-hides when no featured listings exist
- Social feed section is placeholder — will connect to Instagram via Behold or similar service
- Site is noindex/nofollow while WIP — flip `robots` in `layout.tsx` and `robots.ts` to allow indexing at launch

## Hero Design Options
Three versions were built and reviewed. Currently live: **Option C**.

- **Option A — Original (animated gradient + floating cards):** Dark animated gradient background (no photo), large logo watermark with hero-bg.jpg masked through the logo strokes, three tilted floating photo cards (hero-1/2/3.jpg) on the left and right edges, centered headline/CTA. Most creative/unique, least "real estate" feeling.
- **Option B — Split-screen:** Solid dark-900 left panel with left-aligned text/CTA and subtle logo watermark, full-height hero-bg.jpg photo on the right half with a gradient fade bridging the two halves. No floating cards. Most premium/editorial feel. Mobile falls back to full-bleed photo with dark overlay.
- **Option C — Full-bleed photo + floating cards (CURRENT):** hero-bg.jpg fills the entire hero with a layered dark gradient overlay, large parallax logo watermark, three tilted floating photo cards on left/right edges, centered headline/CTA, grain texture. Best balance of real estate imagery and creative personality.

## SEO
- Metadata: Virginia Beach + Hampton Roads keywords, canonical URL, noindex while WIP (flip at launch)
- JSON-LD structured data (RealEstateAgent schema) already in page.tsx
- OG image: currently falls back to hero-bg.jpg (opengraph-image.tsx was removed — low-res brand-lockup.png looked blurry)
- **Niche local queries worth targeting:** "alternatives to Zillow Virginia Beach", "Virginia Beach MLS data", "is Zillow accurate Virginia Beach" — low competition, high buyer intent

## Agent Zillow Profiles
- Amanda: https://www.zillow.com/profile/amanda5867
- Jeremy: https://www.zillow.com/profile/jeremy2621
- Google Business Profile URL: TBD (needed for Google reviews link in About section)

## Future TODO
- **FUB:** Explore action plans, smart lists, and other FUB features not yet in use
- **FUB:** Wire up featured listings via FUB custom fields API
- **FUB:** Consider custom fields for structured property inquiry data (price range, timeline, pre-approval)
- **OG image:** Improve quality — current brand-lockup.png is a low-res screenshot (251×69px). Options: export high-res SVG/PNG of header lockup, or rebuild natively in ImageResponse
- **Calendly:** Add "Schedule a Free Consultation" booking integration. Options: second CTA in hero, Contact section sidebar, or StickyCTA. Free plan at calendly.com.
- **Listings:** Wire up FUB API for featured listings display
- **Listings:** Hide Listings nav link when no featured listings
- **Instagram:** Connect feed via Behold widget
- **MLS:** Confirm Triumph iframe permission (remove if denied)
- **Neighborhoods:** Re-add Featured Neighborhoods section (component exists at src/components/Neighborhoods.tsx)
- **SEO:** Sitemap, robots.txt enhancements, Google Business Profile
- **Reviews:** Add Google Business Profile review link in About section once URL is available
- **Dev workflow:** Set up `dev` branch + Vercel preview deployments before going live with real traffic
- **Launch checklist:** Flip noindex → index in layout.tsx and robots.ts, verify all placeholder content (address, phone, email, testimonials) is replaced with real info
- ~~Custom domain~~ — DONE, live at https://www.ackisshomes.com
