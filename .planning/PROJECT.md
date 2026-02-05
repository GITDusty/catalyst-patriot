# Catalyst Patriot

## What This Is

A tax dollar visualizer that shows citizens where their state budget money goes. Starting with Florida, the goal is to make government spending data accessible, engaging, and understandable through beautiful, interactive data visualizations.

## Core Value

Citizens can instantly understand where their tax dollars go — clarity over complexity.

## Requirements

### Validated

- ✓ Next.js 16 with App Router scaffold — existing
- ✓ Tailwind CSS styling system — existing
- ✓ Dark mode support via CSS custom properties — existing
- ✓ TypeScript configuration — existing

### Active

- [ ] Landing page with Florida FY 2024-25 budget visualization
- [ ] Interactive donut/pie chart for spending by category
- [ ] Funding sources visualization (General Revenue, State Trust, Federal)
- [ ] Modal drill-down showing subcategory breakdown on click
- [ ] State comparison page
- [ ] About/methodology page
- [ ] Mobile responsive layout
- [ ] Patriotic but modern color palette

### Out of Scope

- Real-time data updates — Static data sufficient for v1
- User accounts/authentication — Public read-only data
- Data input/editing — Curated data only
- API for third parties — Focus on direct user experience

## Context

**Target Data (Florida FY 2024-25):**
- Total Budget: $116.5 billion
- Categories: Health & Human Services (39.5%), Education (26.6%), Transportation (13.5%), Corrections (6.3%), Environment (2.9%), Other (11.2%)
- Funding: General Revenue (42%), State Trust Funds (26%), Federal Funds (32%)

**Technical Environment:**
- Next.js 16.1.6 with App Router (no src/ folder)
- React 19 with TypeScript
- Tailwind CSS 4.x for styling
- Recharts for data visualization
- Vercel for deployment

**Data Architecture:**
- Budget data in separate files per state (app/data/florida-budget.ts)
- Components in app/components/
- Designed for multi-state expansion

## Constraints

- **Stack**: Next.js App Router, Tailwind, Recharts — already configured
- **Data Format**: Static TypeScript data files — no database needed for v1
- **Design**: Patriotic but modern — avoid cheesy red/white/blue clichés
- **Accessibility**: Charts must have text alternatives for screen readers

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Start with Florida | Most familiar state for initial development | — Pending |
| Modal for drill-down | Keep user on page, reduce navigation complexity | — Pending |
| Static data files | No backend needed, simple deployment, easy to update | — Pending |
| Recharts over D3 | Simpler React integration, sufficient for donut/pie/bar charts | — Pending |

---
*Last updated: 2026-02-05 after initialization*
