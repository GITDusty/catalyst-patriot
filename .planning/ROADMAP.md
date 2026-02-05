# Catalyst Patriot Roadmap

**Project:** Catalyst Patriot (Tax Dollar Visualizer)
**Created:** 2026-02-05
**Source:** .planning/PROJECT.md + .planning/research/SUMMARY.md

## Phase 1: Core Visualization (MVP)
**Goal:** Users can explore and understand Florida's FY 2024-25 budget at a glance.

**Delivers:**
- Interactive category visualization (treemap/sunburst or donut) for Florida FY 2024-25
- Drill-down modal for subcategory breakdowns
- Mobile-responsive layout and touch-friendly interactions
- Accessible color palette + chart text alternatives
- Data source attribution and fiscal year clarity

**Success Criteria:**
- Users can identify top spending categories and percentages
- Drill-down works on mobile without hover
- All charts have text alternatives or data tables
- Data source + fiscal year shown on every relevant view

**Plans:** 3 plans
**Progress:** 1/3 plans complete
Plans:
- [x] 01-01-PLAN.md — Data foundation and visualization dependencies
- [ ] 01-02-PLAN.md — Chart, drill-down dialog, and text alternative components
- [ ] 01-03-PLAN.md — Page composition, attribution, and visual theme tokens

**Research flag:** Skip (standard patterns)

---

## Phase 2: Context & Shareability
**Goal:** Add context so numbers feel relatable and shareable.

**Delivers:**
- Funding source breakdown (General/Trust/Federal)
- Per-capita metrics for categories
- Search/filter by category
- Shareable URLs for specific views

**Success Criteria:**
- Users can see funding mix and per-capita values
- Search finds citizen-friendly terms
- Shared links preserve selected views

**Research flag:** Skip (standard patterns)

---

## Phase 3: Historical Comparisons
**Goal:** Provide time-based context with year-over-year insights.

**Delivers:**
- Year-over-year comparison for key categories
- Historical trend charts (3–5 years)
- Inflation-adjusted vs nominal toggle

**Success Criteria:**
- Users can see changes over time with clear labeling
- Inflation adjustments are accurate and documented

**Research flag:** Required (data normalization + inflation strategy)

---

## Phase 4: Multi-State Comparison
**Goal:** Enable cross-state benchmarking with normalized categories.

**Delivers:**
- State comparison visualizations
- State registry + metadata
- Normalized category mapping across states
- Per-capita comparison views

**Success Criteria:**
- Users can compare at least 2 states reliably
- Category mapping is documented and transparent

**Research flag:** Required (state data sourcing + normalization)

---

## Phase 5: Personalization
**Goal:** Show "your contribution" using Florida-specific tax modeling.

**Delivers:**
- Personal tax calculator
- Florida tax model (sales/property, no income tax)
- Personalized budget breakdown

**Success Criteria:**
- Users can input simple info and get a credible estimate
- Methodology is transparent and cited

**Research flag:** Required (Florida tax modeling)

---

## Notes
- Phase order is dependency-driven: core visualization → context → comparisons → multi-state → personalization.
- Avoid partisan design; prioritize accuracy, accessibility, and mobile-first UX.
