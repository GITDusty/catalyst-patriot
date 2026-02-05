# Project Research Summary

**Project:** Catalyst Patriot (Tax Dollar Visualizer)
**Domain:** Government Budget Data Visualization
**Researched:** 2026-02-05
**Confidence:** MEDIUM-HIGH

## Executive Summary

Government budget visualization tools succeed when they transform abstract billions into concrete, explorable insights while maintaining absolute accuracy and political neutrality. The research reveals a clear technical path: Next.js 16 with Server Components for data loading, Recharts for declarative charts, and Radix UI for accessible interactions. The existing project foundation (Next.js 16, React 19, Tailwind CSS 4) is excellent and aligned with current best practices.

The recommended approach follows a progressive disclosure pattern: start with high-level category visualization (MVP), add contextual features (per capita, funding sources), then build comparisons (year-over-year, state-to-state), and finally layer in personalization (personal tax calculator). This order respects both technical dependencies and user comprehension patterns. The architecture should remain simple—static TypeScript data files with Server Component processing—avoiding backend complexity until multi-state scaling demands it.

Key risks center on credibility and accessibility: misleading visualizations destroy trust permanently, mobile-hostile designs exclude 50%+ of users, and partisan aesthetics alienate half the audience. Prevention requires mobile-first development, WCAG compliance from day one, neutral terminology, and obsessive focus on visualization accuracy. The personal tax calculator is the highest-impact differentiator but requires careful scoping (Florida has no state income tax, complicating "your contribution" modeling).

## Key Findings

### Recommended Stack

The existing Next.js 16 + Tailwind CSS 4 foundation is ideal for government budget visualization. Key additions needed are data visualization (Recharts), animation (Framer Motion), and accessible UI primitives (Radix UI). The stack prioritizes server-rendered React for SEO, declarative charting over imperative D3 for maintainability, and static data management for simple deployments.

**Core technologies:**
- **Next.js 16**: App Router with Server Components for fast initial loads and SEO
- **Recharts 2.13+**: Declarative React charts for donut/pie/bar visualizations
- **Radix UI**: Headless accessible components for modals and tooltips
- **Framer Motion 11+**: Animation library for modal transitions and chart reveals
- **Tailwind CSS 4**: Already configured, excellent for dark mode and responsive design
- **Zod 3.23+**: Runtime validation to ensure budget data accuracy (percentages sum to 100%)
- **Lucide React**: Tree-shakeable icons for patriotic theme
- **clsx + tailwind-merge**: Utility for conditional Tailwind classes

**Installation priority:**
1. Recharts, Radix UI, Framer Motion (MVP blockers)
2. clsx, tailwind-merge, Lucide (quality of life)
3. Zod (recommended for data accuracy)
4. Vitest, Playwright (deferred to Phase 2+)

**Anti-recommendations:**
- D3.js (overkill for standard charts, steep curve)
- Redux (unnecessary for static data)
- Material UI (opinionated styling fights patriotic theme)

### Expected Features

Budget visualization features divide into three tiers: table stakes (users expect them), differentiators (drive engagement), and anti-features (explicit avoidances).

**Must have (table stakes):**
- Interactive treemap/sunburst chart with drill-down modals
- Category percentages + total budget display ($116.5B, 39.5% Health)
- Mobile responsive design (50%+ of civic tool traffic)
- Accessible color palette (WCAG AA minimum)
- Data source attribution (credibility essential)
- Fiscal year clarity (FY 2024-25 prominent)
- Search/filter by category (50+ line items need quick access)

**Should have (competitive differentiators):**
- Funding source breakdown (General 42%, Trust 26%, Federal 32% — data already available)
- Per capita metrics ($560 per FL resident on Transportation — easy calculation, high relatability)
- Personal tax calculator (biggest differentiator but high complexity)
- Year-over-year comparison (requires historical data pipeline)
- State-to-state comparison (already in roadmap, correctly placed)
- Export/share functionality (virality driver)

**Defer (v2+):**
- Historical trend charts (multi-year + complex UI)
- Subcategory detail pages (content architecture complexity)
- Budget proposal comparison (niche audience, hard data sourcing)
- Narrative annotations (editorial burden, ongoing maintenance)
- Email alerts (infrastructure overhead for marginal retention gain)

**Anti-features (explicitly avoid):**
- Political commentary in UI (destroys credibility)
- Overwhelming detail by default (paralyzes users)
- Raw spreadsheet view as primary interface
- Inflation-unadjusted comparisons (misleading)
- Auto-play videos, gamification (frivolous tone)
- Social features/comments (moderation nightmare)

### Architecture Approach

The architecture follows a layered pattern optimized for static budget data: data layer (TypeScript modules) → business logic (adapters, calculations) → presentation (Server Components) → interaction (Client Components). Data flows unidirectionally from static sources through processing to charts, avoiding backend complexity until multi-state scaling demands it.

**Major components:**
1. **Data Layer**: Budget data as typed TypeScript modules (`app/data/florida-budget.ts`) with Zod validation
2. **Data Adapter Layer**: Pure functions transforming budget data to chart-specific formats (budgetToPieData, budgetToBarData)
3. **Server Components**: Pages load and process data server-side for SEO and performance
4. **Client Components**: Charts, modals, tooltips require interactivity (Recharts, Radix, Framer Motion)
5. **Calculation Services**: Compute percentages, per-capita, aggregations (pure functions, memoizable)
6. **State Registry**: Central registry of available states for multi-state expansion (Phase 2+)

**Key patterns:**
- **Static Data Module Pattern**: Budget data as TypeScript with typed exports (type safety, no runtime overhead)
- **Server Component for Data, Client for Interaction**: Leverage Next.js optimization, reduce client bundle
- **Data Adapter Layer**: Separate data transformation from presentation (testable, reusable)
- **Type-Driven Development**: Define interfaces first (ensures consistency across states)
- **Responsive Chart Wrapper**: HOC adjusts chart size/config based on viewport

**Anti-patterns to avoid:**
- Fetching static data at runtime (unnecessary network requests)
- Client-side data processing (larger bundle, slower render)
- Tight coupling to Recharts API (create chart facade components)
- Mixing budget data with UI state (keep budget immutable)
- Over-engineering data layer (avoid database/API until needed)

### Critical Pitfalls

Budget visualization is uniquely challenging because one misleading chart destroys credibility permanently, and budget discussions are inherently political minefields. Citizens distrust government data by default, so design must be boringly accurate and politically invisible.

1. **Misleading Scale & Proportion**: Using 3D pie charts or inconsistent axes distorts budget proportions. Users compare wrong values or misunderstand spending scale. Prevention: Linear scales only, avoid 3D entirely, ensure percentages sum to 100%, test with non-technical users before launch.

2. **Mobile Hostility**: Complex interactive charts optimized for desktop are unusable on mobile (tiny touch targets, hover-dependent interactions). 50%+ of civic tool traffic is mobile; lower-income citizens (most affected by budget decisions) are most likely mobile-only. Prevention: Mobile-first design, touch-friendly targets (44x44px minimum), replace hover with tap, test on actual devices.

3. **Budget Category Opacity**: Using official government names ("Other Post-Employment Benefits") instead of citizen-friendly terms ("Teacher Pensions"). Users can't find "schools" or "police" spending. Prevention: Two-layer naming (citizen-friendly primary + official in tooltip), search maps common terms to categories, glossary page.

4. **Context-Free Numbers**: Showing "$500M for education" without per capita, historical trends, or state comparisons. Users can't determine if spending is appropriate. Prevention: Always include per capita, year-over-year changes, percentage of total, national averages when possible.

5. **Partisan Visual Design**: Red/white/blue color schemes or terminology ("waste," "entitlements") signal political affiliation. Half of potential audience dismisses site immediately. Prevention: Neutral palette (blue + complementary), avoid loaded terminology, user test with politically diverse group, no editorializing in labels.

6. **Stale Data Perception**: Even with labeled dates, users assume visualization shows "current" budget. Fiscal year vs calendar year confusion, 6+ month old data triggers "outdated" perception. Prevention: Prominent "Data as of [date]" on every page, explain fiscal vs calendar year, plan update cadence before launch.

## Implications for Roadmap

Based on research, suggested phase structure follows dependencies and progressive disclosure:

### Phase 1: Core Visualization (MVP)
**Rationale:** Foundation that all other features build on. Minimum viable = users can explore and understand Florida's budget.

**Delivers:**
- Interactive treemap showing budget categories (Health 39.5%, Education 26.6%, Transportation 13.5%)
- Drill-down modals for subcategory exploration
- Mobile-responsive design with accessible colors
- Data source attribution and fiscal year clarity

**Addresses:** Table stakes from FEATURES.md (interactive chart, drill-down, mobile responsive, accessible, attribution, fiscal year)

**Avoids:** Misleading scale pitfall (linear scales, no 3D), mobile hostility (mobile-first), category opacity (citizen-friendly names)

**Stack elements:** Next.js Server Components, Recharts, Radix Dialog, Framer Motion, Tailwind CSS

**Duration estimate:** 6-8 weeks

**Research flag:** Standard patterns, well-documented. Skip `/gsd:research-phase` for this phase.

---

### Phase 2: Context & Shareability
**Rationale:** Makes data more relatable and shareable. Low-hanging fruit for engagement. Requires stable foundation from Phase 1.

**Delivers:**
- Funding source breakdown (General Revenue 42%, Trust Funds 26%, Federal 32%)
- Per capita metrics ($560 per resident on Transportation)
- Export/share functionality with deep linking
- Search/filter by category

**Addresses:** Competitive differentiators from FEATURES.md (funding sources, per capita, export/share, search)

**Avoids:** Context-free numbers pitfall (adds per capita, funding context)

**Stack elements:** Intl.NumberFormat for formatting, URL state management for sharing

**Duration estimate:** 3-4 weeks

**Research flag:** Standard patterns, skip `/gsd:research-phase`.

---

### Phase 3: Historical Comparisons
**Rationale:** Requires multi-year data infrastructure. High impact but needs stable foundation. Addresses "is this good or bad?" user question.

**Delivers:**
- Year-over-year comparison (Health spending up 8% from last year)
- Historical trend charts (3-5 year trends)
- Inflation-adjusted vs nominal dollar toggle

**Addresses:** Differentiators from FEATURES.md (year-over-year, trends)

**Avoids:** Stale data perception (shows historical context), misleading comparisons (inflation-adjusted)

**Stack elements:** Multi-year data files, Recharts line charts, data normalization layer

**Duration estimate:** 6-8 weeks (data pipeline + UI)

**Research flag:** Likely needs `/gsd:research-phase` for data normalization strategies, handling budget structure changes across years.

---

### Phase 4: Multi-State Comparison
**Rationale:** Requires multi-state data pipeline. Provides benchmarking context ("Florida spends 26% on education vs national avg 22%"). Already in project roadmap, correctly placed.

**Delivers:**
- State-to-state comparison visualizations
- State registry with metadata
- Normalized category mapping across states
- Per capita comparisons

**Addresses:** High-value differentiator from FEATURES.md (state comparison)

**Avoids:** Context-free numbers (provides peer comparison)

**Stack elements:** State registry pattern, dynamic imports, comparison logic

**Duration estimate:** 8-12 weeks (multi-state data + normalization + UI)

**Research flag:** Needs `/gsd:research-phase` for state data sourcing, category normalization across different budget structures, fiscal year alignment.

---

### Phase 5: Personalization
**Rationale:** Highest-impact differentiator but complex. Transforms abstract billions into "your $X went here." Florida has no state income tax, so modeling requires careful scoping.

**Delivers:**
- Personal tax calculator (income input → "your contribution" breakdown)
- Tax model for Florida (sales tax, property tax allocation)
- Personalized budget visualization

**Addresses:** Biggest differentiator from FEATURES.md (personal tax calculator)

**Avoids:** Context-free numbers (ultimate personalization)

**Stack elements:** Tax calculation logic, client-side form handling

**Duration estimate:** 4-6 weeks (tax modeling + UI)

**Research flag:** Definitely needs `/gsd:research-phase` for Florida tax structure (no income tax, sales tax distribution, property tax allocation), modeling "your contribution" accurately.

---

### Phase Ordering Rationale

1. **Dependencies drive sequence**: Can't build comparisons before core visualization, can't personalize before funding breakdown exists
2. **Progressive disclosure**: Start simple (one state, current year), add context (per capita), then comparisons (historical, multi-state), finally personalize
3. **Risk mitigation**: Address critical pitfalls (mobile, accessibility, accuracy) in Phase 1 before building advanced features
4. **Value delivery**: Each phase delivers user value, not just infrastructure
5. **Data complexity scaling**: Static data → multi-year → multi-state → tax modeling
6. **Testing complexity**: Simple charts → comparisons → personalization logic

### Research Flags

**Needs deeper research during planning:**
- **Phase 3 (Historical)**: Data normalization strategies when budget categories change across years, inflation adjustment methodology
- **Phase 4 (Multi-State)**: State data sourcing approaches, category taxonomy mapping, fiscal year alignment
- **Phase 5 (Personalization)**: Florida tax structure modeling (no income tax complicates "your contribution"), sales/property tax allocation formulas

**Standard patterns (skip research-phase):**
- **Phase 1 (Core Viz)**: Well-documented Recharts patterns, Next.js Server Components
- **Phase 2 (Context)**: Standard calculation utilities, URL state management

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Next.js 16, Recharts, Radix UI are standard for this domain. Already configured foundation is excellent. Version numbers should be verified but choices are sound. |
| Features | MEDIUM-HIGH | Table stakes are consistent across civic tech examples. Differentiators based on training data, not 2026 trends. Personal tax calculator complexity is Florida-specific challenge. |
| Architecture | HIGH | Layered architecture, Server/Client split, static data pattern are established Next.js best practices. Scales from 1 state to 50 states with known migration path. |
| Pitfalls | HIGH | Critical pitfalls (misleading viz, mobile hostility, partisan design) are well-documented across failed civic tech projects. Prevention strategies are proven. |

**Overall confidence:** MEDIUM-HIGH

Research is based on established civic tech patterns, Next.js/React best practices, and government transparency project failures. Core architectural and technical decisions have high confidence. Feature prioritization and differentiator impact have medium confidence due to reliance on training data vs 2026 current trends.

### Gaps to Address

**Florida-specific tax modeling:**
- Gap: How to model "your contribution" when Florida has no state income tax
- Handle: Phase 5 research should investigate sales tax distribution formulas, property tax allocation, federal pass-through modeling
- Validation: Consult Florida DOR documentation, potentially interview tax policy experts

**Multi-state category normalization:**
- Gap: How different states structure budget categories (K-12 vs Primary & Secondary, different fiscal years)
- Handle: Phase 4 research should survey state budget formats, create normalization schema
- Validation: Sample 5-10 state budgets before committing to architecture

**Historical data availability:**
- Gap: Whether Florida publishes structured budget data for prior years, format consistency
- Handle: Phase 3 research should audit FL budget archives, assess data quality
- Validation: Attempt to extract 3 years of historical data before committing to feature

**Accessibility compliance for charts:**
- Gap: Specific WCAG 2.2 requirements for interactive data visualizations
- Handle: Phase 1 should audit Recharts accessibility, potentially use Context7 for Radix docs
- Validation: Screen reader testing, consult accessibility specialists

**Update cadence and workflow:**
- Gap: Process for annual budget updates, non-technical user data entry
- Handle: Phase 2 should design update workflow (manual vs automated)
- Validation: Identify update schedule before launch to set user expectations

## Sources

### Primary (HIGH confidence)

**Research files:**
- `.planning/research/STACK.md` — Technology recommendations based on Next.js/React visualization patterns
- `.planning/research/FEATURES.md` — Feature landscape from civic tech domain knowledge
- `.planning/research/ARCHITECTURE.md` — Architecture patterns for Next.js App Router + static data
- `.planning/research/PITFALLS.md` — Domain pitfalls from government transparency project failures

**Basis:** Training data (knowledge cutoff: January 2025) covering React ecosystem, Next.js App Router, Recharts, civic tech best practices, budget visualization patterns (OpenSpending, USASpending.gov examples)

### Secondary (MEDIUM confidence)

**Not verified with current sources:**
- Latest stable versions of recommended libraries (should run `npm info [package] version`)
- Recharts compatibility with React 19 (should check official docs)
- Radix UI latest primitives (should check official docs)
- Framer Motion App Router guidance (should check official docs)
- WCAG 2.2 specific requirements (would verify with official standards)

**Training data sources included:**
- OpenSpending platform (open budget data patterns)
- USASpending.gov (federal spending visualization)
- State budget transparency portals (Florida, California, Texas examples)
- Civic technology literature (Code for America, Sunlight Foundation)
- Data visualization research (treemap conventions, progressive disclosure)

### Tertiary (LOW confidence, needs validation)

**Specific version numbers:** Recommended versions (Recharts 2.13.3, Framer Motion 11.15.0, Radix 1.2.2) reflect training data, not 2026 current releases

**Florida-specific data:** Assumption that FL publishes structured budget data needs verification with actual FL DOR/budget office sources

**Personal tax calculator feasibility:** Modeling "your contribution" in no-income-tax state is non-trivial, needs domain expert validation

---

*Research completed: 2026-02-05*
*Ready for roadmap: yes*
*Next step: Requirements definition based on Phase 1 scope*
