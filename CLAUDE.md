# Ackiss Homes — Project Context

## Overview
Professional real estate website for Ackiss Homes. Single-page site with dark/luxury aesthetic.

## Tech Stack
- Next.js 15 (App Router), TypeScript, Tailwind CSS 4
- Deployed on Vercel (auto-deploys from GitHub master branch)
- GitHub: yoship90/ackiss-homes
- Vercel URL: https://ackiss-homes.vercel.app
- Node.js installed locally at C:/Users/Admin/nodejs (not in system PATH — use `export PATH="/c/Users/Admin/nodejs:$PATH"` before npm/node commands)
- GitHub CLI installed at C:/Users/Admin/gh-temp/bin/gh.exe

## Site Structure (top to bottom)
1. Header — Sticky nav with logo + section links, mobile hamburger menu
2. Hero — Full-screen dark background with logo watermark, headline, CTA
3. About — Company intro + animated stat counters (200+ homes, 15+ years, 98% satisfaction, 50+ reviews)
4. Services — 4-card grid (Buying, Selling, Rentals, Consultations)
5. Listings — Featured property cards (conditionally hidden when empty)
6. MLS Search — Triumph Realty IDX iframe embed (currently live, pending Triumph approval)
7. Testimonials — 3 client quote cards
8. Social Feed — Instagram placeholder grid (ready for Behold/Instagram integration)
9. Contact — Form (name/email/phone/message) + business info sidebar
10. Footer — Logo, social links, copyright

## Design
- Dark backgrounds (#0a0a0a to #2a2a2a), gold/amber accent (#c9952e)
- Fonts: Playfair Display (headings), Inter (body)
- ScrollReveal animations on all sections
- Mobile responsive with hamburger nav

## Key Decisions
- Broker is Triumph Realty (triumphrealtyva.com) — they use Placester for IDX
- MLS iframe embed works (no X-Frame-Options blocking) but need Triumph's permission before going live permanently
- Follow Up Boss (FUB) will be used to manage featured listings via custom fields (Featured on Website, Listing Price, Address, Beds, Baths, Sqft, Status, Zillow Link, Photo URL)
- Listings section auto-hides when no featured listings exist
- Social feed section is placeholder — will connect to Instagram via Behold or similar service
- Contact form is client-side only (no backend yet) — planned to push leads to FUB

## Future TODO
- Wire up FUB API for featured listings
- Connect Instagram feed (Behold widget)
- SEO: structured data (JSON-LD), Open Graph tags, sitemap, robots.txt
- Confirm Triumph iframe permission (then remove from live if denied)
- Hide Listings nav link when no featured listings
- Consider static export (output: 'export') if moving off Vercel
- Custom domain (ackisshomes.com)
