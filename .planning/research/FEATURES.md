# Feature Landscape: Government Budget Visualization

**Domain:** Tax dollar and government budget visualization
**Researched:** 2026-02-05
**Confidence:** MEDIUM (based on training data, not verified with current sources)

## Executive Summary

Government budget visualization tools serve citizens trying to understand "where does my money go?" The feature landscape divides into three tiers:

1. **Table stakes**: Interactive visualizations with drill-down, category breakdowns, and searchable data
2. **Differentiators**: Personal tax calculator ("your contribution"), comparisons (historical, peer states), and narrative context
3. **Anti-features**: Political editorializing, overwhelming complexity, and raw data dumps

The domain has matured around treemaps and sunburst charts as standard patterns. Users expect to interact, not just read. The differentiators that drive engagement are personalization ("how much of MY taxes?") and comparison ("vs last year" or "vs other states").

**Critical insight for CatalystPatriot:** The personal tax calculator feature is the biggest differentiator. It transforms abstract billions into concrete "your $X went here" stories.

---

## Table Stakes

Features users expect. Missing = product feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Phase Recommendation |
|---------|--------------|------------|---------------------|
| **Interactive chart (treemap/sunburst)** | Industry standard since OpenSpending popularized it. Users expect to click and explore. | Medium | MVP - Core experience |
| **Drill-down into categories** | "Education 26%" is meaningless without seeing K-12 vs Higher Ed vs Admin. | Medium | MVP - Essential for understanding |
| **Total budget amount displayed** | Anchor point for all percentages. "$116.5B" gives context to "39.5% Health". | Low | MVP - Critical context |
| **Category percentages** | Users think in percentages, not absolute dollars. Both needed. | Low | MVP - Basic math |
| **Search/filter by category** | With 50+ line items, users need to find "public schools" quickly. | Low-Medium | MVP or Phase 2 |
| **Mobile responsive design** | 50%+ traffic is mobile for civic tools. Desktop-only = half audience gone. | Medium | MVP - Non-negotiable |
| **Accessible color palette** | Government tools must meet WCAG standards. Colorblind users are 8% of population. | Low-Medium | MVP - Legal/ethical requirement |
| **Data source attribution** | "Where did you get this data?" is first question. Builds trust. | Low | MVP - Credibility essential |
| **Fiscal year clarity** | Budget data is time-bound. "FY 2024-25" must be prominent. | Low | MVP - Prevents confusion |
| **Export/share functionality** | Users want to share findings. At minimum: shareable URL, ideally: image export. | Low-Medium | Phase 2 - Drives virality |

### Table Stakes Analysis

**What happens if missing:**
- No interactive chart → Users bounce, looks like a spreadsheet
- No drill-down → Users can't answer their questions, abandon
- No mobile responsive → Lose 50% of potential audience
- No data source → Trust issues, looks like advocacy not facts

**MVP threshold:** First 9 features are must-haves. Export/share can wait for Phase 2.

---

## Differentiators

Features that set products apart. Not expected, but drive engagement and retention.

| Feature | Value Proposition | Complexity | Phase Recommendation | Notes |
|---------|-------------------|------------|---------------------|-------|
| **Personal tax calculator** | "Enter your income → see YOUR contribution" transforms abstract to concrete. Massive engagement driver. | High | Phase 2 or 3 - Requires tax rate data | Biggest differentiator in domain |
| **Year-over-year comparison** | "Health spending up 8% from last year" provides narrative context. | Medium-High | Phase 3 - Requires historical data | Needs multi-year dataset |
| **State-to-state comparison** | "Florida spends 26% on education vs national avg 22%" benchmarks performance. | High | Phase 3-4 - Multi-state data pipeline | Your roadmap already includes this |
| **Funding source breakdown** | "General Revenue vs Federal vs Trust" shows dependency on federal dollars. | Medium | Phase 2 - Data already available | You have this data (42/26/32 split) |
| **Per capita metrics** | "$560 per resident on transportation" makes numbers relatable at personal scale. | Low-Medium | Phase 2 - Simple calculation | Easy win, high value |
| **Narrative annotations** | "Why is Health 39%? Medicaid expansion in 2021" provides context tooltips. | Medium | Phase 3 - Requires research | Editorial content, maintenance burden |
| **Historical trend charts** | Line charts showing "Education % over 10 years" reveal priorities shift. | High | Phase 4 - Multi-year + charting | Powerful but data-intensive |
| **Subcategory detail pages** | Dedicated page for "K-12 Education" with its own breakdowns and trends. | Medium-High | Phase 3-4 - Content architecture | Scales complexity significantly |
| **Budget proposal comparison** | "Governor proposed $X, legislature approved $Y" shows political process. | High | Phase 4+ - Requires proposal data | Niche audience, hard data sourcing |
| **Downloadable datasets** | CSV/JSON export of underlying data for researchers/journalists. | Low-Medium | Phase 2-3 - API or static files | Builds credibility with power users |
| **Embed widgets** | iframe embeds for news orgs or advocacy groups to use your viz. | Medium | Phase 4 - Requires robust caching | Distribution channel, not user feature |
| **Email alerts** | "Notify me when FY 2025-26 budget is published" builds return visitors. | Medium | Phase 4+ - Infrastructure overhead | Retention play, low priority |

### Differentiator Analysis

**High-impact, medium-effort (prioritize):**
- Personal tax calculator (if can source FL tax rates)
- Funding source breakdown (data already available)
- Per capita metrics (simple math, high relatability)

**High-impact, high-effort (phase carefully):**
- Year-over-year comparison (needs historical data pipeline)
- State-to-state comparison (already in roadmap, correctly placed)
- Historical trend charts (requires multi-year data + complex UI)

**Medium-impact, watch scope creep:**
- Narrative annotations (editorial burden, ongoing maintenance)
- Budget proposal comparison (niche audience, hard to source)
- Email alerts (infrastructure overhead for marginal retention gain)

---

## Anti-Features

Features to explicitly NOT build. Common mistakes in this domain.

| Anti-Feature | Why Avoid | What to Do Instead | Severity |
|--------------|-----------|-------------------|----------|
| **Political commentary in UI** | Users want facts to form own opinions. "Wasteful spending on X" destroys credibility. | Stick to objective data, neutral language. Let data speak. | CRITICAL |
| **Overwhelming detail by default** | Showing all 2,000 line items at once paralyzes users. Information overload. | Start high-level (10 categories), drill-down on demand. Progressive disclosure. | HIGH |
| **Raw spreadsheet view** | CSV dump as primary interface. Users want visualization, not homework. | Chart-first, table optional for power users. | HIGH |
| **Inflation-unadjusted historical comparisons** | "Education spending up 50% in 10 years!" ignores 30% inflation. Misleading. | Always use real dollars (inflation-adjusted) or clearly label nominal. | HIGH |
| **Cherry-picked comparisons** | "Florida #1 in X!" without context of methodology or peer selection. | Show full distribution, let users choose comparison states. | MEDIUM |
| **Auto-play video explanations** | Annoying, slows load time, accessibility nightmare. | Text with optional video, never auto-play. | MEDIUM |
| **Requiring login to view data** | Government data is public. Walling it off is hostile. | Public access, optional account for saved views/alerts. | MEDIUM |
| **Gamification** | "Earn badges for exploring budget!" Frivolous tone for serious civic topic. | Professional, respectful of user's time and the subject matter. | LOW-MEDIUM |
| **Social features** | Comments, forums, user-generated content. Moderation nightmare, off-topic. | Focus on data visualization, not community building. | MEDIUM |
| **Real-time editing/proposals** | "Submit your budget!" sounds engaging but creates false expectations. | Clear framing: this is educational, not a petition platform. | MEDIUM |

### Anti-Feature Rationale

**Critical to avoid:**
- **Political commentary**: One editorial statement destroys credibility built by accurate data.
- **Overwhelming detail**: The "show everything" impulse kills usability. Treemap with 2000 boxes is unusable.

**High risk of scope creep:**
- **Social features**: Every "let users comment!" idea leads to moderation burden and off-topic discussions.
- **Real-time proposals**: "Build your own budget!" sounds cool but sets expectation you can't deliver (actual policy impact).

**Technically problematic:**
- **Inflation-unadjusted comparisons**: Easy to implement wrong, hard to fix after launch. Decide early: real or nominal dollars.

---

## Feature Dependencies

### Dependency Hierarchy

```
Core Visualization (MVP)
├── Interactive chart (treemap/sunburst)
├── Drill-down modals
├── Category percentages
├── Total budget display
├── Mobile responsive
└── Data source attribution

↓ Enables ↓

Enhanced Context (Phase 2)
├── Funding source breakdown (requires: core viz)
├── Per capita metrics (requires: core viz + population data)
├── Search/filter (requires: category taxonomy)
└── Export/share (requires: stable URLs)

↓ Enables ↓

Comparisons (Phase 3)
├── Year-over-year (requires: multi-year data + enhanced context)
├── State-to-state (requires: multi-state data + per capita)
└── Historical trends (requires: year-over-year + charting library)

↓ Enables ↓

Personalization (Phase 2-3)
└── Personal tax calculator (requires: core viz + funding source breakdown + tax rate data)

↓ Enables ↓

Deep Dives (Phase 4)
├── Subcategory pages (requires: all above + content architecture)
├── Budget proposal comparison (requires: proposal data pipeline)
└── Narrative annotations (requires: research + CMS)
```

### Critical Path Features

Features that block other features:

1. **Interactive chart** → Blocks everything (foundation)
2. **Category taxonomy** → Blocks search, drill-down, subcategory pages
3. **Data pipeline architecture** → Blocks multi-year, multi-state features
4. **Funding source breakdown** → Blocks personal tax calculator (need to show "your general revenue" vs "federal pass-through")

### Independent Features

Features that can be built in any order:

- Export/share functionality
- Mobile responsive (should be simultaneous with desktop)
- Accessible color palette (should be baked into design system)
- Data source attribution
- Downloadable datasets

---

## MVP Feature Recommendations

For CatalystPatriot.com MVP, prioritize this subset:

### Must-Have (MVP Blockers)

1. **Interactive treemap/sunburst chart** - Core experience
2. **Drill-down modals** - Category detail view
3. **Category percentages + total budget** - Essential context
4. **Mobile responsive design** - 50% of audience
5. **Accessible colors** - Legal/ethical requirement
6. **Data source attribution** - Credibility
7. **Fiscal year display** - Temporal context

**Rationale:** These 7 features constitute a "complete" budget visualization. Users can explore, understand, and trust the data.

### Should-Have (MVP Enhancements)

8. **Funding source breakdown** - You have the data (42/26/32), adds important context
9. **Per capita metrics** - Easy calculation, high relatability
10. **Search/filter** - Usability boost for 50+ categories

**Rationale:** These 3 features elevate from "functional" to "useful". If timeline allows, include them.

### Could-Have (Phase 2)

11. **Export/share** - Virality driver but not core experience
12. **Downloadable datasets** - Power user feature
13. **Personal tax calculator** - HIGH impact but HIGH complexity, carefully scope

**Rationale:** These drive engagement and retention but aren't needed to launch.

---

## Feature Complexity Assessment

| Complexity | Features | Avg Time Estimate |
|------------|----------|------------------|
| **Low** | Budget total, percentages, fiscal year, attribution, per capita | 1-2 days each |
| **Low-Medium** | Accessible colors, search/filter, export/share, downloadable data | 3-5 days each |
| **Medium** | Interactive chart, drill-down, mobile responsive, funding breakdown, narrative annotations | 1-2 weeks each |
| **Medium-High** | Year-over-year, subcategory pages | 2-3 weeks each |
| **High** | State comparison, personal tax calculator, historical trends, proposal comparison | 3-6 weeks each |

**Note:** Estimates assume clean data and established design system. Add 30-50% for data wrangling and edge cases.

---

## Feature Sequencing Rationale

### Why This Order?

**Phase 1 (MVP): Core Visualization**
- Foundation that all other features build on
- Minimum viable = users can explore and understand budget
- ~6-8 weeks for treemap + drill-down + mobile + context

**Phase 2: Context & Shareability**
- Funding source, per capita, export/share
- Makes data more relatable and shareable
- Low-hanging fruit for engagement
- ~3-4 weeks

**Phase 3: Comparisons**
- Year-over-year, state-to-state
- Requires multi-dataset infrastructure
- High impact but needs stable foundation
- ~6-8 weeks (data pipeline + UI)

**Phase 4: Personalization & Deep Dives**
- Personal tax calculator, subcategory pages, trends
- High effort, high impact
- Requires mature data pipeline and analytics
- ~8-12 weeks (staggered)

### What NOT to Build Early

**Avoid premature optimization:**
- Don't build state comparison before single-state works well
- Don't build personal tax calculator before funding source breakdown exists
- Don't build subcategory pages before category taxonomy is stable
- Don't build trends before multi-year data pipeline is proven

---

## Domain-Specific Feature Notes

### Budget Visualization Conventions

**Chart types seen in the wild:**
- **Treemap**: Most common (OpenSpending, USASpending.gov). Good for proportions.
- **Sunburst**: Hierarchical alternative. Better for deep drill-down but steeper learning curve.
- **Sankey**: Shows flow (revenue → spending). Beautiful but complex to implement.
- **Stacked bar**: Simple, accessible. Less engaging than treemap.

**Recommendation for CatalystPatriot:** Start with treemap (familiar, proven). Consider sunburst as alternate view in Phase 2.

### Data Granularity Patterns

**Levels of detail observed:**
1. **High-level** (5-10 categories): Health, Education, Transportation...
2. **Mid-level** (20-40 subcategories): K-12, Higher Ed, Medicaid, Medicare...
3. **Line-item** (100s-1000s): Individual programs, agencies, grants...

**Recommendation:** MVP shows high-level default, mid-level on click. Line-item is Phase 3+ and only if data is clean.

### Comparison Features Best Practices

**Year-over-year pitfalls:**
- Budget structure changes (category renamed, split, merged)
- Inflation adjustment (real vs nominal dollars)
- One-time items (stimulus, disaster relief) skew trends

**State-to-state pitfalls:**
- Different fiscal years (July vs January start)
- Different categorizations ("K-12" vs "Primary & Secondary")
- Different funding models (local vs state property taxes)

**Recommendation:** Build normalization layer before attempting comparisons. Budget data is messier than it looks.

---

## Sources

**Note:** This research is based on training data (knowledge cutoff January 2025) and NOT verified with current sources due to tool access limitations. Confidence level: MEDIUM. Before implementation, verify:

1. Current state of OpenSpending platform and feature set
2. USASpending.gov feature evolution
3. State-level budget visualization tools (FL, CA, TX examples)
4. Recent civic tech best practices (Code for America, Sunlight Foundation resources)
5. Accessibility requirements for government data tools (WCAG 2.1+ standards)

**Training data sources include:**
- OpenSpending (open budget data platform)
- USASpending.gov (federal spending visualization)
- Various state budget transparency portals
- Civic technology best practices literature
- Data visualization research (Ben Schneiderman's treemap work, etc.)

**Recommended verification:**
- Check OpenSpending GitHub for current feature set
- Review USASpending.gov for interaction patterns
- Survey 5-10 state budget portals for table stakes consensus
- Consult Code for America resources for civic tech patterns

---

## Confidence Assessment

| Category | Level | Reason |
|----------|-------|--------|
| Table stakes features | HIGH | Consistent across training data examples |
| Differentiator features | MEDIUM | Based on training data, not 2026 trends |
| Anti-features | HIGH | Domain pitfalls well-documented in civic tech literature |
| Complexity estimates | MEDIUM | Depends heavily on data quality and infrastructure |
| Feature dependencies | HIGH | Logical dependencies are architecture-based |

---

## Open Questions for Phase-Specific Research

1. **Personal tax calculator:** Where to source FL income tax rates, sales tax distributions, property tax allocations? (No state income tax in FL - how to model "your contribution"?)

2. **State comparison:** Which states to compare to? All 50? Peer states (large, no income tax)? User-selectable?

3. **Data update frequency:** Annually (fiscal year)? Quarterly (revised projections)? What's the maintenance burden?

4. **Drill-down depth:** How many levels before diminishing returns? Budget → Category → Subcategory → Program → Line item?

5. **Historical data:** How many years back? FL budget structure changes over time - how to normalize?

---

## Feature Prioritization Matrix

| Feature | Impact | Effort | Priority |
|---------|--------|--------|----------|
| Interactive chart | Critical | Medium | P0 (MVP blocker) |
| Drill-down | Critical | Medium | P0 (MVP blocker) |
| Mobile responsive | Critical | Medium | P0 (MVP blocker) |
| Funding source breakdown | High | Medium | P1 (MVP+) |
| Per capita | High | Low | P1 (MVP+) |
| Personal tax calc | High | High | P2 (Phase 3) |
| Year-over-year | High | High | P2 (Phase 3) |
| State comparison | High | High | P2 (Phase 3) |
| Search/filter | Medium | Low-Med | P1 (MVP+) |
| Export/share | Medium | Low-Med | P2 (Phase 2) |
| Historical trends | Medium | High | P3 (Phase 4) |
| Subcategory pages | Medium | High | P3 (Phase 4) |
| Narrative annotations | Low-Med | Medium | P3 (Phase 4) |
| Downloadable data | Low-Med | Low-Med | P2 (Phase 2) |

**Priority Legend:**
- **P0**: MVP blocker, must have for launch
- **P1**: MVP enhancement, include if timeline allows
- **P2**: Phase 2-3, high value but not launch-critical
- **P3**: Phase 4+, nice-to-have for mature product

---

## Final Recommendations

### For CatalystPatriot MVP

**Build these 7 features:**
1. Interactive treemap (Health 39.5%, Education 26.6%, Transportation 13.5%...)
2. Drill-down modals (click category → see subcategories)
3. Budget total + category percentages ($116.5B total, % of budget)
4. Mobile responsive (50% of civic tool traffic is mobile)
5. Accessible colors (WCAG AA minimum)
6. Data source attribution (FL FY 2024-25 budget, link to source)
7. Fiscal year display (prominent "FY 2024-25" label)

**Add if time allows:**
8. Funding source breakdown (General 42%, Trust 26%, Federal 32%)
9. Per capita metrics ($560 per FL resident on Transportation)
10. Search/filter (find "public schools" quickly)

**Explicitly defer to Phase 2+:**
- Personal tax calculator (high complexity, requires tax modeling)
- State comparison (you have this in roadmap already, correctly placed)
- Year-over-year (needs historical data pipeline)
- Export/share (virality driver but not core experience)

### Success Criteria

MVP is successful if users can:
1. See where FL's $116.5B goes at a glance (treemap)
2. Drill into categories to understand subcategories (drill-down)
3. Understand funding sources (General/Trust/Federal breakdown)
4. Share findings with others (export or shareable URL)
5. Trust the data (clear attribution to FL budget docs)

The differentiator that will drive engagement is **personalization** (personal tax calculator) but that's Phase 2-3. Get the foundation right first.

---

**END OF FEATURES.MD**
