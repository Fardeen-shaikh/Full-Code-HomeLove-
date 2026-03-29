# HOMElove Website Revamp — Project Reference

## Project Overview

**Client:** Empire Asia Events Marketing Sdn. Bhd. (Malaysia)
**Service Provider:** Jakex Group (India)
**Agreement Date:** 17th March, 2026
**Project Fee:** RM 30,000
**Timeline:** 10-12 weeks from effective date
**Domain:** homelove.com.my
**Brand:** HOMElove — Malaysia's premier home & living exhibition organiser

The client operates the HOMElove brand and organises home and furniture exhibitions across Malaysia. This project is a full website revamp — migrating from an existing Drupal site to a custom-built platform.

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js / React |
| Styling | Tailwind CSS |
| Backend | Node.js / Express |
| Database | PostgreSQL |
| CMS | Payload CMS (free, open source, self-hosted — provides REST API + Admin Panel) |
| Email (Transactional) | Resend |
| Newsletter | Brevo |
| Hosting | Railway |
| User Data Storage | PostgreSQL with cookie-based anonymous sessions (no user login/registration) |

**Architecture:** API-first monorepo using **Turborepo + pnpm workspaces**. The backend exposes a RESTful API that both the Next.js frontend and admin panel consume. This ensures a future mobile app can reuse the same API without rebuilding backend logic.

```
homelove/
├── apps/
│   ├── api/          # Payload CMS (Express + PostgreSQL) — REST API + Admin Panel built-in
│   └── web/          # Next.js frontend (consumes Payload REST API)
├── packages/
│   └── shared/       # Shared TypeScript types, constants, validation schemas, utilities
├── turbo.json        # Turborepo pipeline config
├── pnpm-workspace.yaml
├── package.json      # Root package.json
├── .gitignore
├── .eslintrc.js
├── .prettierrc
└── tsconfig.base.json
```

**Why Payload CMS:**
- Free & open source (MIT license), self-hosted on Railway
- Built on Express + PostgreSQL — matches our stack exactly
- Auto-generates REST API for all collections (exhibitions, blog posts, deals, etc.)
- Comes with a polished React admin panel — no need to build a separate admin app
- TypeScript native — shared types with frontend
- Future mobile app just calls the same Payload REST API

**Monorepo Benefits:**
- Single repo, single `git clone` — all apps together
- Shared types between API and web (change once, reflected everywhere)
- Turborepo smart caching — only rebuilds what changed
- Easy to add `apps/mobile` in the future
- Each app deploys independently on Railway

- **Design Reference:** The mockup at `homelove-website-revamp-proposal.netlify.app/mockup-light` was approved by the client (~90% match to their internal vision). Use this as the primary visual direction.
- **Roadmap shared with client:** `homelove-roadmap.netlify.app`

---

## Project Phases & Timeline

| Phase | Deliverable | Week | Dates |
|-------|------------|------|-------|
| Phase 1 | Discovery & Kickoff — Kickoff meeting, Drupal audit (35+ pages), URL mapping & 301 redirect planning, design direction | Week 1 | Mar 23–29 |
| Phase 2 | Design — Low-fi wireframes, high-fi designs (desktop & mobile), interactive prototypes, design review & sign-off | Weeks 2–3 | Mar 30–Apr 12 |
| Phase 3 | Core Development — Exhibition system, Crazy Deals, Visitor Registration + Brevo, CMS Admin, Home Checklist, Promotional Popup, Hidden Pages, Newsletter, SEO & URL migration | Weeks 4–7 | Apr 13–May 10 |
| Phase 4 | Content Migration & Testing — Migrate 35+ pages, UAT (mobile & desktop), bug fixes, 301 redirect verification | Weeks 8–10 | May 11–31 |
| **Phase 5** | **Go Live — Production deployment, DNS & domain config, GA & Search Console setup, full handover & docs, 30-day post-launch warranty** | **Weeks 11–12** | **Jun 1–14** |

---

## Payment Schedule

| Payment | % | Amount (RM) | Trigger |
|---------|---|-------------|---------|
| Advance | 30% | 9,000 | Mid-April 2026 |
| Mid-Project | 40% | 12,000 | Upon Design Approval (Week 4) |
| Final | 30% | 9,000 | Upon Project Completion & Go-Live |

---

## Pages to Build (35+ pages, migrating from Drupal)

### Existing Pages (Migration)
- Homepage
- About Us
- Exhibit With Us
- Visiting
- Participating Brands
- Contact Us
- Furniture Fair
- Privacy Policy
- Terms & Conditions
- Dynamic Exhibition Pages
- Home Tips (listing + articles)
- Trends & Ideas (listing + articles)
- State Pages (location filters)

### New Pages/Features
- Home Checklist (3 profiles)
- Hidden Pages System (TNC, Contest forms, Share & Win, Full Crazy Deals listing)

---

## Global UI Components

- **Back to Top Button:** Floating button for easy navigation
- **WhatsApp Chat Widget:** Floating icon on bottom right linking to WhatsApp (+6010-232 3620)
- **Section ID/Anchor Links:** Ability to link directly to specific page sections
- **Promotional Popup:** Non-fullscreen, closeable popup for big discount items. Configurable via CMS (show/hide, content). Session-based display (don't show repeatedly)
- ~~Floating navigational menu module~~ (removed from scope)

---

## Header Navigation

- Home
- Exhibitions
- Home Tips
- Contact Us
- Exhibit With Us
- About Us
- **Button:** Home Checklist

Top bar: "Malaysia's Premier Home & Living Exhibition" (left) | Phone: 010-232 3620 | Email: info@homelove.com.my (right)

---

## Footer

### Top Row (Main Footer)
- **Left column:** HOMElove logo + tagline ("Malaysia's premier home & living exhibition, bringing together the best exhibitors and homeowners for over a decade.")
- **Quick Links:** Home, About, Exhibitions, Home Tips, Checklist
- **For Exhibitors:** Exhibit With Us, Booth Packages, Success Stories, FAQ
- **Connect:** About Us, Contact, Facebook, Instagram
- **Social Media Links:** Facebook, Instagram, TikTok, XHS (Xiaohongshu), RedNote, YouTube

### Bottom Row
- **Left:** Organised by Empire Asia Events Marketing Sdn. Bhd. (1102402-K) | info@homelove.com.my | +60X-XXXX XXXX
- **Right:** Affiliated Expos: (4-5 brand logos)
- Copyright notice
- Links: Privacy Policy, Terms of Use, Sitemap

---

## Page-by-Page Specifications

### 1. Homepage

**Sections (top to bottom):**

1. **Hero Section**
   - Heading: "Transform Your Dream Home Into Reality"
   - Subtext: "Discover upcoming HOMElove home expos across Malaysia and explore furniture, home appliances, renovation solutions, home essentials, and exclusive expo deals all in one place."
   - CTA: "Find Exhibitions"

2. **Upcoming Events Preview Cards** (on top fold, right side of hero)
   - Event cards with date, location, venue name
   - Example: "22 - 24 May, Sarawak, Borneo Convention Centre Kuching (BCCK)"

3. **Why Choose HOMElove**
   - Stats (CMS editable): 141+ Exhibitions Organised | 4,300+ Trusted Exhibitors (note: actual count 6,173) | 5M+ Happy Visitors | 8 Locations Nationwide
   - Badge: "Your trusted Home Expo since 2015"

4. **One of The Largest Home Expos in Malaysia**
   - Image left, text right
   - Bullet points: Verified Track Record, National Reach, Expert Curation, Massive Reach

5. **Upcoming Events Section**
   - "Find an Exhibition Near You"
   - Event cards with images, dates, location, CTA

6. **App Download Section**
   - "Download the HOMElove App"
   - App Store / Play Store links
   - App feature highlights

7. **Featured Brands/Exhibitors**
   - Logo carousel only (NO full directory — deliberate client decision to protect exhibitor contacts)

8. **Home Tips Preview**
   - "Trends & Ideas" section
   - 3 article cards with images, category tag, title, date

9. **Newsletter Signup**
   - Title: "Get Latest Deals & Event Updates"
   - Form fields: Name, Phone, Email, State, Disclaimers
   - Syncs with Brevo

10. **FAQ Section**
    - "FAQs About Home Expo in Malaysia"
    - Accordion-style Q&A

---

### 2. Event Pages

#### 2a. Event Listing Page
- Location (state) filter
- Event cards with key details (image, date, location, venue, CTA)
- UI suggestion welcomed

#### 2b. Individual Event Page

**Sections:**

1. **Banner with Countdown Timer** — Days, Hours, Minutes until event
2. **CTAs:** Add to Calendar (Google Calendar / iCal), Get Latest Deals & Event Updates (subscription form)
3. **Video + Details Section**
   - Left: Vertical video
   - Right: Text details, brand count, map icon, TNC button (links to hidden page)
4. **Brands Logo Section** — Logo carousel of participating brands
5. **Program Schedule** — Event activities and timings
6. **Crazy Deals Section**
   - Show 2 rows preview
   - CTA to browse all on a hidden page
   - Favourite items with database storage (cookie-based session)
7. **Discount Coupons Section** — Display available coupons
8. **Contest Section** (if applicable)
   - Colouring contest, share & win
   - Forms: popup on CTA click preferred, else embed on page
   - Share & Win: hidden page form for Facebook post
9. **TNC Button** — Links to hidden page (uploaded 1-2 weeks before event)
10. **FAQ Section** — Event-specific FAQs

---

### 3. Home Tips (Blog)

#### 3a. Listing Page
- Banner with text
- Category filtering (icon-based filter bar)
- Posts preview grid

#### 3b. Article Page
- Article content
- Share function (social icons on right side)
- Category filter
- Prev/Next article navigation at bottom
- "Next Event" promotion section at bottom of blog content
- Sidebar: "More Posts" with thumbnails

---

### 4. Home Checklist (New Feature)

**Banner:**
- Heading: "HOMElove Home Checklist"
- Subheading: "Tick What You Need for Your Home"
- Description about planning shopping for the expo
- CTA: "Start My Checklist"

**Profile Selection:**
- First Home
- Home Renovation
- Rental / Airbnb Setup

Each profile has:
- Description and top priorities
- Room-by-room checklist with tick/untick functionality

#### First Home Categories:
- Living Room (9 items: Sofa, Coffee Table, TV Cabinet, Rug/Carpet, Curtains/Blinds, Lighting, Storage Cabinet, Air Purifier, Home Décor)
- Bedroom (8 items: Mattress, Bed Frame, Pillows/Bedding, Wardrobe, Bedside Table, Dressing Table, Curtains/Blinds, Bedroom Lighting)
- Dining Area (4 items: Dining Table, Dining Chairs, Sideboard/Storage Cabinet, Tableware)
- Kitchen (9 items: Refrigerator, Water Filter/Water Purifier, Hob/Hood, Oven/Microwave, Air Fryer, Rice Cooker, Cookware, Kitchen Storage, Small Kitchen Appliances)
- Bathroom (5 items: Water Heater, Bathroom Accessories, Mirror, Shower Fittings, Storage Shelves)
- Utility & Cleaning (6 items: Washing Machine, Dryer, Vacuum Cleaner, Laundry Rack, Cleaning Tools, Storage Solutions)
- Home Improvement & Smart Living (6 items: Digital Lock, Basic Security System, Smart Home Devices, Lighting/Ceiling Fans, Space-Saving Furniture, Home Organization Solutions)

#### Home Renovation Categories:
- Living Room (10 items — adds Recliner/Massage Chair, Decorative Lighting, Air Purifier)
- Bedroom (8 items — "Mattress Upgrade" instead of "Mattress", adds Storage Solutions)
- Dining Area (5 items — adds Decorative Pieces)
- Kitchen (9 items — adds Built-in Kitchen Solutions)
- Bathroom (6 items — adds Bathroom Improvement Ideas)
- Utility & Cleaning (7 items — adds Robot Vacuum)
- Home Improvement & Smart Living (6 items — Security System instead of Basic Security System)

#### Rental / Airbnb Setup Categories:
- Living Room (9 items — adds Easy-Clean Furnishings, Simple Home Décor)
- Bedroom (7 items)
- Dining Area (4 items — Basic Tableware)
- Kitchen (8 items — Microwave, Rice Cooker, Kettle, Basic Cookware)
- Bathroom (5 items)
- Utility & Cleaning (6 items)
- Home Improvement & Smart Living (6 items)

**Compare Section (all profiles):**
- Things to compare at the expo: Product Price, Warranty Period, Installation Cost, Delivery Time, Bundle Deals / Free Gifts

**Bottom CTA Section:**
- "Complete Your Home Shopping List at HOMElove"
- CTA: "See Upcoming Events" / "See Event Details / Plan My Visit"

**Technical Requirements:**
- Interactive tick/untick checkboxes
- Database storage via anonymous session cookies in PostgreSQL
- Download checklist as PDF
- CMS-managed: add/edit/delete items and categories, create/modify profiles
- Scalable architecture for future expansion

---

### 5. Contact Us

1. **Hero:** Title "Contact Us", Sub-title "Get in Touch With the HOMElove Team", Expo background
2. **Contact Information:**
   - Email: info@homelove.com.my
   - Phone: +603-7620 2672
   - WhatsApp: +6010-232 3620
3. **Form:** Name (required), Email (required), Contact Number (required), Message / Additional Info

---

### 6. Exhibit With Us

1. **Hero Banner:**
   - Title: "Exhibit With Us at HOMElove Home Expo"
   - Sub-title: "Grow Your Brand at Malaysia's Home Expo"
   - Optional text about showcasing products
   - CTA: "Enquire About Exhibiting"

2. **Why Exhibit With HOMElove** (6 benefit cards):
   - Meet High-Intent Shoppers
   - Showcase Your Products
   - Generate Leads & Sales
   - Build Brand Awareness
   - Launch Promotions
   - Expand Market Reach

3. **Who Should Exhibit** (category chips/grid):
   - Furniture, Home Appliances, Kitchen Solutions, Renovation & Interiors, Bathroom & Sanitary, Mattresses & Sofas, Smart Home, Flooring & Curtains, Home Security, Home Essentials

4. **How to Exhibit** (4 steps):
   - Step 1: Submit Your Inquiry
   - Step 2: Get Contacted by Our Team
   - Step 3: Explore Suitable Options
   - Step 4: Join HOMElove Home Expo

5. **Event Photos Gallery:** "Where Home Brands Meet Ready Buyers"

6. **Exhibitor Inquiry Form:**
   - Email (required), Contact Number (required), Exhibit Venue (required), Company Name (required), Product/Service to be Exhibited (required), Additional Info

---

### 7. About Us
- Reuse existing content from current site

---

## CMS Admin Panel

- Page management
- Media library
- SEO settings (meta titles, descriptions, OG tags)
- Hidden page creation (published/hidden toggle)
- Analytics integration
- Exhibition management: Create/edit exhibitions, event details, floorplans, schedules, countdown timer, add to calendar
- Home Checklist management: Add/edit/delete items, categories, profiles
- Crazy Deals management
- Discount Coupons management
- Contest & Promotions management
- Newsletter/Subscriber management (Brevo sync, export)
- Promotional Popup configuration (show/hide, content)
- Blog/Home Tips management

---

## Key Platform Features (Module Summary)

| Module | Features |
|--------|----------|
| Exhibition Management | Create/edit exhibitions, event details, floorplans, schedules, countdown timer, add to calendar |
| Crazy Deals Section | Preview rows with CTA to browse all on hidden page, favouriting with database storage |
| Discount Coupons | Display coupons under event pages |
| Featured Exhibitors | Logo carousel of participating brands (no full directory) |
| Visitor Registration | Registration forms (Name, Phone, Email, State), subscriber list, export, Brevo sync |
| CMS Admin Panel | Page management, media library, SEO settings, hidden page creation, analytics |
| Home Checklist | Interactive tick/untick, 3 profiles, database-stored selections, download PDF |
| Contest & Promotions | Colouring contest forms, share & win hidden pages, popup forms |
| Newsletter Integration | Brevo integration, subscriber sync, automated campaigns |
| Favourites System | Database storage for users to save and revisit crazy deal items |

---

## SEO & Migration Requirements

- 301 redirects for ALL existing URLs (critical for SEO preservation)
- Meta titles and descriptions (per page, CMS editable)
- Open Graph tags for social sharing
- XML sitemap generation
- Google Analytics integration (including backend code integration)
- Google Search Console setup
- Section IDs for anchor links / direct URL access

---

## Important Design Decisions

1. **NO full exhibitor directory** — Only featured brand logos shown in carousels. This is a deliberate client decision to prevent competitor access to exhibitor contact information. Implement as a design requirement, not a technical limitation.

2. **No user registration/login** — User data (favourites, checklist selections) stored via anonymous session cookies in PostgreSQL. If users clear cookies or use a different device/browser, a new session is created.

3. **Hidden Pages System** — Pages not visible in navigation or sitemap, accessible via direct URL only. Used for: TNC pages, Contest forms, Share & Win, Full Crazy Deals listing. CMS toggle: Published / Hidden.

4. **Promotional Popup** — Non-fullscreen, centered modal, closeable with X button. Session-based display (don't show repeatedly). CMS configurable.

5. **Crazy Deals Display** — Show 2 rows preview on event page, CTA to browse all items on a hidden page. Favouriting functionality with database storage.

---

## Third-Party Costs (NOT included in project fee, borne by client)

- Domain registration/renewal
- Hosting fees (if new hosting required)
- SSL certificate (if not included with hosting)
- Third-party service subscriptions (Brevo, etc.)
- Stock images or premium fonts (if required)

---

## Client Obligations (Content to Provide)

- Access to existing Drupal website (for content migration)
- Domain registrar access (for DNS updates)
- Hosting/server access
- Brand assets (logos, colors, fonts, guidelines)
- Brevo account credentials
- Affiliated Expo logos (4-5 brands)
- Social media account links (FB, IG, TikTok, XHS, RedNote, YouTube)
- WhatsApp business number
- Home Checklist items content (categories and items per profile)
- All text content for new pages
- High-resolution images and media files
- Exhibition and exhibitor information
- Existing subscriber data for migration
- Vertical video files for event pages
- Crazy deals content and images
- Discount coupon details and designs
- Contest rules and form requirements

---

## Contact Information

- **Email:** info@homelove.com.my
- **Phone:** +603-7620 2672
- **WhatsApp:** +6010-232 3620
- **Organiser:** Empire Asia Events Marketing Sdn. Bhd. (1102402-K)
- **Address:** Unit D-3A-01, Capital 4, Oasis Square, 2, Jalan PJU 1A/7, Oasis Ara Damansara, Petaling Jaya, Selangor, 47301, Malaysia
