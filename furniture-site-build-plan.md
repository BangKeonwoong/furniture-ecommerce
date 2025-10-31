# Furniture E-Commerce Build Plan

## Phase 0 — Preparation (Day 0)
1. Confirm project scope, KPIs, and success metrics (reference `church-website-program-plan.md`).  
   - Deliverable: agreed scope note with KPIs.
2. Select base stack: Next.js (App Router), TypeScript, Tailwind, Prisma, Postgres (local via SQLite fallback), Stripe test mode, Typesense stub.  
   - Deliverable: tech stack summary in README.
3. Define environment requirements and developer tooling (Node version, package managers, linting/formatting, testing).  
   - Deliverable: `.nvmrc`, tooling checklist.

## Phase 1 — Project Scaffolding (Day 1)
1. Initialize Next.js app with TypeScript and Tailwind.  
   - Command: `npx create-next-app@latest furniture-shop --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`
2. Configure repository structure: move into `apps/web`, create `packages/ui` placeholder if needed.  
   - Deliverable: workspace layout documented.
3. Install additional dependencies: Prisma, @prisma/client, zod, @tanstack/react-query (if needed), @google/model-viewer, date-fns.  
4. Set up basic scripts in `package.json` (lint, test, typecheck, dev).
5. Initialize Git repository (if not already) and create initial commit.

## Phase 2 — Data Layer & Utilities (Day 2-3)
1. Configure Prisma schema for Product, Variant, Image, Review, Question as defined in guide.  
   - Deliverable: `prisma/schema.prisma` + migration.
2. Set up local database (SQLite for development, Postgres env placeholders).  
   - Deliverable: `.env.example`, migration applied.
3. Implement seed script with sample catalog (20 items).  
   - Deliverable: `prisma/seed.ts`, `package.json` seed script.
4. Create shared utility modules: unit conversion (mm↔cm↔inch), ETA calculation, doorway clearance check.  
   - Deliverable: `src/lib/` utilities with tests.
5. Write Jest/Vitest tests for utilities.  
   - Deliverable: `pnpm test` passing.

## Phase 3 — Core Application Pages (Day 4-8)
1. Implement global layout: header, footer, navigation, theme tokens.  
   - Deliverable: `src/app/layout.tsx`, `src/components/navigation/*`.
2. Build homepage hero, featured categories, quick filters, trust strip.  
   - Deliverable: `src/app/page.tsx` with mock data.
3. Implement category listing page with server filtering and pagination.  
   - Deliverable: `src/app/category/[slug]/page.tsx`, server data fetcher.
4. Implement search page with Typesense placeholder, server actions for filters.  
   - Deliverable: `src/app/search/page.tsx`.
5. Build PDP including gallery, swatches, specs, policies, reviews, Q&A, AR viewer placeholder.  
   - Deliverable: `src/app/product/[slug]/page.tsx`, subcomponents (`Gallery`, `SwatchSelector`, etc.).
6. Implement cart page and global mini-cart state.  
   - Deliverable: `src/app/cart/page.tsx`, `src/components/cart` store.
7. Add 404/500 fallback pages and loading skeletons.

## Phase 4 — Checkout & Integrations (Day 9-12)
1. Implement checkout flow (address -> shipping -> payment) using server actions and Stripe Payment Element.  
   - Deliverable: `src/app/checkout` route.
2. Add order confirmation page with ETA summary.  
   - Deliverable: `src/app/checkout/success/[orderId]/page.tsx`.
3. Set up Stripe webhook handler for payment events.  
   - Deliverable: `src/app/api/checkout/webhook/route.ts` with signature verification.
4. Integrate shipping estimators and assembly upsell (mock services if real APIs unavailable).  
   - Deliverable: `src/app/api/shipping/route.ts` stub.
5. Implement customer reviews submission with basic moderation queue.  
   - Deliverable: `src/app/api/reviews/route.ts` and UI form.

## Phase 5 — Content, QA, and Launch Prep (Day 13-15)
1. Create CMS integration placeholder (Sanity/Contentful) or local JSON fallback for inspiration pages.  
   - Deliverable: `src/lib/cms.ts` stub and sample data.
2. Polish accessibility: keyboard navigation, aria labels, color contrast checks, axe automated test.  
   - Deliverable: accessibility issues documented/resolved.
3. Performance review: Lighthouse targets (LCP < 2.5s, CLS < 0.1).  
   - Deliverable: performance report.
4. QA checklist execution: flows (browse->PDP->cart->checkout), unit tests, integration tests (Playwright).  
   - Deliverable: `tests/e2e/*`, CI config placeholder.
5. Update README with setup, scripts, deployment steps and final launch checklist.  
   - Deliverable: comprehensive README.

## Phase 6 — Deployment & Handover (Day 16)
1. Prepare environment variables for Vercel deployment (DATABASE_URL, STRIPE keys, SEARCH keys).  
   - Deliverable: deployment config note.
2. Deploy to staging environment (Vercel) and run smoke tests.  
   - Deliverable: staging URL + test log.
3. Capture final handover docs: architecture summary, runbooks for ops, backlog of post-MVP enhancements.  
   - Deliverable: `/docs/handover.md`.

---

### Working Conventions
- Use Git branches per phase; merge via PR review checklist.
- Enforce lint/type/test before commit (`pnpm lint && pnpm typecheck && pnpm test`).
- Document blockers and open questions inside `/docs/blockers.md`.
- Maintain TODO list per feature in code comments (`TODO(bk): ...`).
