# Furniture E-Commerce Program Plan

## 0. Vision and Success Metrics
- Core objective: deliver a premium omnichannel furniture shopping experience that helps visitors discover, evaluate, and purchase pieces suited to their space, budget, and timeline within minutes.
- Success KPIs (first 6 months post-launch):
  - Home→category click-through >= 45%.
  - Category→PDP click-through >= 35%.
  - PDP→add-to-cart conversion >= 18%.
  - Cart→checkout start >= 55%; checkout completion >= 70%.
  - Return rate <= 6% within 30 days; damage claims <= 1.5%.
  - Customer service CSAT >= 4.5/5; accessibility audits maintain WCAG 2.2 AA.

## 1. Audience and Persona Alignment
- Primary personas:
  - Urban apartment shopper: prioritizes footprint, modularity, fast delivery, white-glove assembly options.
  - Suburban family: looks for durability, kid-friendly materials, financing, bundle savings.
  - Interior designer/pro trade: needs bulk pricing, spec sheets, swatch ordering, project tracking.
  - Remote worker: seeks ergonomic office furniture with quick ship, easy returns.
- Secondary stakeholders: merchandising team, logistics providers, customer support, returns specialists, marketing and performance teams, finance/compliance.

## 2. Brand Narrative and Content Pillars
- Positioning: modern, trustworthy, solutions-oriented furniture retailer balancing style with practical delivery realities.
- Tone guidelines: confident but warm, detail-rich, proactively answers sizing and care questions, avoids jargon.
- Content pillars:
  - Inspiration: room lookbooks, lifestyle editorials, AR showcases, designer collaborations.
  - Evaluation: in-depth PDP storytelling, comparison charts, materials science, care guides.
  - Confidence: delivery promises, warranty, sustainability certifications, customer testimonials.
  - Conversion: promotions, financing education, bundle recommendations, fast-ship collections.
- Editorial cadence:
  - Weekly: new arrivals spotlight, blog posts on styling/maintenance, social-ready video loops.
  - Monthly: collection drops, designer interviews, sustainability transparency reports.
  - Quarterly: catalog PDF, trend report, seasonal campaign microsite refresh.

## 3. Merchandising and Catalog Strategy
- Category tree (baseline): Seating, Bedroom, Dining, Storage, Office, Outdoor, Lighting, Rugs/Decor, Kids, Collections.
- Catalog governance: centralized PIM with versioned attributes, seasonal tagging, discontinued SKU workflow, localization-ready naming.
- Core attributes captured per item: detailed dimensions (mm), package box dimensions/weight, materials/finish, color swatches, weight capacity, assembly requirements, lead time, shipping class, warranty, care instructions, collection compatibility.
- Category-specific attributes for filtering:
  - Seating: seat depth, configuration (L/U/modular), recline, cushion fill, upholstery type.
  - Dining: seating capacity, extendable, top material, leg clearance.
  - Bedroom: mattress size compatibility, storage drawers, headboard height.
  - Outdoor: weather rating, UV resistance, cover availability.
- Data hygiene: enforce units in metric storage, automatic conversion to cm/in; standardized color taxonomy and swatch QC; high-res imagery with alt text and swatch thumbnails.
- Pricing strategy: list vs compare-at pricing, membership or trade pricing tiers, bundling logic, clearance pipelines with inventory thresholds.

## 4. Experience Requirements
- Homepage: hero with current campaign, quick ETA filter, top categories, shoppable lookbook carousel, promotions module, trust badges.
- Search and navigation: predictive search with typo tolerance and synonym dictionary (sofa/couch), faceted results with sticky filters, comparison shortlist, recently viewed persistence.
- Category listing: responsive product cards with color hover, ETA badge, shipping class icon, rating summary, quick add to comparison or cart.
- PDP essentials:
  - First view: price, promotions, financing, real-time ETA, delivery options, stock status, swatch selector, primary CTA, secondary express checkout.
  - Visualization: 3D/AR viewer (GLB/USDZ), 360 spin, detail zoom, lifestyle gallery.
  - Decision support: dimension diagrams, door/ elevator clearance check, material and care tabs, bundle recommendations, Q&A, photo reviews with filters.
  - Policies: transparent shipping tiers, return rules, assembly options, warranty highlights.
- Cart and checkout: multi-address support, dynamic shipping calculation, assembly add-ons, financing offers, guest checkout default, order summary with ETA per item.
- Post-purchase: confirmation page with delivery timeline, upsell on care kits, account/order tracking, proactive delay notifications.

## 5. Information Architecture and Navigation
- Primary navigation:
  - Shop: category mega-menu with icons, promotions, quick ETA filters.
  - Rooms: living room, bedroom, office, outdoor, kids.
  - Inspiration: lookbooks, style quizzes, blog, designer spots.
  - Services: design consult, trade program, delivery, assembly, financing.
  - About: brand story, sustainability, reviews, FAQs, contact.
- Utility bar: search, account, wishlist, cart, language/currency toggle, trade login, customer support.
- Footer: store policies, shipping info, returns portal, warranty, gift cards, careers, press, social, newsletter signup.
- Mobile navigation: persistent bottom bar (home, search, categories, cart, account) with slide-out filter drawer.
- Cross-linking rules:
  - PDP -> related collections, compatible accessories, cross-sells from same collection.
  - Category -> buying guides, AR instructions, designer chat promotion.
  - Blog -> shoppable products with UTM tracking.

## 6. Experience and Design System
- Visual direction: neutral palette with accent color per collection, high contrast for text, ample whitespace to evoke showroom feel.
- Component library (Figma + Storybook): hero modules, mega menu, product card variants, swatch selectors, comparison tables, review list, shipping estimator, sticky CTA bar, financing banner, trust badge strip.
- Interaction guidance: micro-animations ≤ 200ms, skeleton loading for gallery, lazy load non-critical assets, consistent focus outlines, accessible radio-group behavior for swatches.
- Accessibility commitments: keyboard operability on carousels and filters, AR/3D alternative descriptions, motion-reduce variants, color contrast >= 4.5:1, screen reader copy for pricing and promotions.
- Content management model: modular blocks for campaign landing pages, curated room guides, UGC galleries; guardrails to keep hero copy ≤ 2 lines on mobile.

## 7. Technical Architecture
- Frontend: Next.js App Router with Server Components, TypeScript, Tailwind or design tokens, `next/image` with AVIF/WebP, edge caching and ISR for catalog pages (60–300s revalidation), server actions for cart and checkout operations.
- Backend: Next API routes/server actions with Prisma + Postgres; background jobs via Vercel Cron or QStash; caching with Redis layer for inventory and pricing; Typesense/Algolia for search and autocomplete.
- Payments: Stripe Payment Intent with Link/Apple Pay/Google Pay; BNPL integration (Affirm/Klarna) via server-side toggles; PCI scoped to hosted fields.
- Media pipeline: Cloudinary or Imgix for responsive imagery, Mux for video/360 spins, model compression (Draco/KTX2) for 3D assets.
- Logistics integrations: freight carriers APIs for LTL scheduling, parcel rate shops, white-glove service partners; webhook ingestion for status updates.
- Observability: Sentry (web/API), DataDog/Logflare logs, GA4 + server-side event forwarding, privacy-compliant heatmaps.
- Security: rate limiting on checkout/login, webhook signature verification, encryption for PII, MFA for admin, inventory adjustments audited.

### 7.1 Data Model (Prisma excerpt)
```prisma
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }
generator client { provider = "prisma-client-js" }

model Product {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  subtitle        String?
  description     String
  brand           String?
  collectionId    String?
  madeToOrder     Boolean  @default(false)
  shippingClass   ShippingClass
  warrantyMonths  Int?
  careInstructions String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  variants        Variant[]
  images          Image[]
  reviews         Review[]
  qna             Question[]
  attributes      Json
}

model Variant {
  id              String  @id @default(cuid())
  productId       String
  sku             String  @unique
  price           Int
  compareAt       Int?
  currency        String  @default("USD")
  color           String?
  finish          String?
  material        String?
  swatchImage     String?
  stockQty        Int      @default(0)
  leadTimeDays    Int      @default(0)
  weightKg        Float?
  packageCount    Int?
  boxDims         Json?
  dimensions      Json
  weightCapacity  Int?
  assemblyRequired Boolean @default(false)
  assemblyTimeMin Int?
  status          VariantStatus @default(ACTIVE)
  images          Image[]
  Product         Product @relation(fields: [productId], references: [id])
}

model Image {
  id        String  @id @default(cuid())
  variantId String?
  productId String?
  url       String
  alt       String
  sort      Int     @default(0)
  Variant   Variant? @relation(fields: [variantId], references: [id])
  Product   Product? @relation(fields: [productId], references: [id])
}

model Review {
  id        String  @id @default(cuid())
  productId String
  rating    Int
  title     String?
  body      String?
  photos    Json?
  createdAt DateTime @default(now())
  Product   Product @relation(fields: [productId], references: [id])
}

model Question {
  id        String  @id @default(cuid())
  productId String
  body      String
  answer    String?
  createdAt DateTime @default(now())
  Product   Product @relation(fields: [productId], references: [id])
}

enum ShippingClass { PARCEL LTL WHITE_GLOVE }
enum VariantStatus { ACTIVE DRAFT DISCONTINUED }
```

### 7.2 Integration and Data Flow
- Content publishing: CMS webhook triggers Next.js revalidation ensure PDP/category updated within 60 seconds; inventory deltas via message queue.
- Pricing and promotions: centralized rules engine; sync to storefront cache; audit logs for overrides.
- ETA calculation: lead time + zone-based transit days + scheduling buffer; fallback heuristics for backorder; expose API for PDP and checkout.
- Order orchestration: checkout -> OMS -> WMS -> carrier; partial shipments supported; push notifications for milestones.
- Customer data: unify profiles across web, retail, support; consent management for marketing; secure tokens for saved payment methods.

## 8. Fulfillment, Delivery, and After-Sales
- Shipping tiers:
  - Parcel: small goods, automated rate shopping, same-day handoff.
  - LTL freight: large items with liftgate and appointment scheduling, signature required.
  - White-glove: room-of-choice, unpack, optional assembly, packaging removal.
- Service playbooks:
  - ETA transparency: show date range, SMS/email updates, reschedule options.
  - Doorway clearance tool: prompt customer for doorway dimensions, auto-flag risk.
  - Assembly selection: partner coverage map, upsell at cart/checkout, cost estimator.
- Returns and exchanges:
  - Standard policy: 30-day returns, restocking fees for LTL, return pickup scheduling.
  - Damage claims: 48-hour photo submission, RMA workflow, partial refund or replacement.
  - MTO/clearance: final sale warnings with explicit consent checkbox.
- After-care: automated follow-up at 7/30/180 days with care guides, product registration, review solicitation, accessory recommendations.

## 9. Content and Marketing Operations
- Governance: merchandising leads supply product facts, brand team owns storytelling, performance marketing manages campaign overlays, CX reviews policies.
- Workflow in CMS: brief -> draft -> merchandising QA -> legal/ops review -> publish -> syndicate to paid/organic channels.
- Asset toolkit: dimension diagrams, swatch boards, AR model checklist, video templates, testimonial library, promotion copy bank.
- Localization: currency and unit conversion, language support for key markets, localized shipping policies.
- Lifecycle marketing:
  - Acquisition: SEO-optimized buying guides, social ads with shoppable UGC, influencer partnerships.
  - Nurture: welcome series with room planner, browse abandonment flows with swatch mailers, educational content.
  - Retention: purchase anniversary offers, care reminders, trade-up programs, loyalty tiers.

## 10. Analytics, Personalization, and Experimentation
- KPI dashboards:
  - Conversion funnel: home -> category -> PDP -> cart -> checkout -> order.
  - Merchandising effectiveness: top search queries, zero-result terms, filter usage, collection revenue share.
  - Operations: delivery on-time rate, return reasons, damage rates, customer service SLAs.
- Instrumentation stack: GA4, server-side event forwarding (Rudderstack), BigQuery warehouse, Looker Studio dashboards, privacy-compliant session replay.
- Personalization roadmap: dynamic hero based on last viewed category, recommendation engine (collaborative filtering), content slots for trade customers vs retail.
- Experiment backlog: ETA badge placement, express checkout vs standard, bundling CTAs, review summary format, financing messaging.
- Measurement cadence: weekly trading meeting, monthly AB test readout, quarterly strategy retro.

## 11. Project Roadmap and Resources
- Phase 0: Discovery (Weeks 1-4)
  - Stakeholder interviews, persona validation, catalog audit, data source mapping, KPI alignment.
  - Deliverables: discovery report, prioritized feature matrix, tech stack validation.
- Phase 1: Experience Strategy (Weeks 5-8)
  - IA, user flows, low-fi prototypes for home/category/PDP/checkout, usability testing with 8 participants.
  - Define content model, filter taxonomy, ETA logic requirements.
- Phase 2: Build and Integration (Weeks 9-20)
  - Implement Next.js app shell, PIM integration, search, cart/checkout, payments, shipping calculators, review system, analytics tags.
  - Stand up CMS, create modular components, migrate representative product set, seed AR assets.
- Phase 3: Content and QA (Weeks 21-24)
  - Populate full catalog, finalize imagery/video/UGC, run end-to-end QA (functional, regression, a11y, load), execute logistics dry run.
- Phase 4: Launch and Optimization (Weeks 25-28)
  - Soft launch with customer cohort, monitor metrics, address bugs, roll out marketing campaign, plan post-launch sprints.

- Resource plan: product manager (0.75 FTE), UX/UI designer (1 FTE), front-end engineer (1 FTE), backend engineer (1 FTE), data engineer (0.5 FTE), QA lead (0.5 FTE), content producer (1 FTE), 3D artist (contract), logistics liaison (0.25 FTE).
- Budget considerations: CMS/PIM licensing, search SaaS, payment fees, fulfillment integrations, CDN costs, accessibility audit, marketing launch spend; 15% contingency for scope creep.

## 12. Launch Checklist
- Technical:
  - Domain, SSL, CDN, cache rules, 301 redirects from legacy URLs.
  - Load testing for PDP, cart, checkout, API rate limits; LCP < 2.5s, CLS < 0.1, TBT < 200ms.
  - Failover strategy for cart/checkout, backup image CDN, database snapshot and restore drill.
- Catalog/content:
  - All PDPs with complete imagery, diagrams, swatches, AR assets, alt text, SEO metadata.
  - Inventory sync validated, pricing spot-checked, discontinued SKUs redirected.
  - Filter QA across categories, zero-result search queries pre-filled with recommendations.
- Operations:
  - Carrier integrations smoke-tested, ETA calculator validated, customer service scripts ready.
  - Returns portal live, policy signage consistent, warranty registration flow tested.
- Marketing/comms:
  - Launch campaign assets, influencer embargo schedule, email/SMS sequences, paid media UTM plan.
  - Support escalation matrix, social monitoring plan, FAQ updates.

## 13. Risk Register and Mitigations
- Risk: inaccurate ETAs cause churn -> Mitigation: daily inventory reconciliation, manual override dashboard, customer proactive alerts.
- Risk: high return costs -> Mitigation: enforce fit check prompts, dimensional warnings, AR adoption incentives, post-purchase care education.
- Risk: PDP performance bloat -> Mitigation: audit JS bundles, lazy load heavy assets, maintain performance budget reviews.
- Risk: supply chain disruption -> Mitigation: alternate vendor list, backorder messaging, partial fulfillment policies, finance alignment.
- Risk: review authenticity concerns -> Mitigation: verified purchase badges, moderation queue, transparency statement.

## 14. Immediate Next Steps
- Align leadership on personas, KPI targets, assortment priorities, and launch timeline.
- Select CMS/PIM, search, and payment vendors; initiate security and legal reviews.
- Kick off IA and wireframe sprint leveraging merchandising data and PDP requirements.
- Audit existing product assets, gap-analyze for 3D/AR, swatch coverage, packaging diagrams.
- Convene logistics partners to design ETA calculator inputs and white-glove SLAs.
