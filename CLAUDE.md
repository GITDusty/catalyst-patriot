# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Catalyst Patriot is a state budget visualizer that helps citizens understand where their tax dollars go. It displays interactive donut charts of state budgets with drill-down capability into subcategories. Currently features Florida FY 2024-25 data with Illinois data prepared.

## Commands

```bash
npm run dev     # Start development server at localhost:3000
npm run build   # Production build
npm run lint    # Run ESLint
```

## Architecture

### Data Flow

Budget data files (`app/data/*-budget.ts`) → `BudgetExplorer` component → `BudgetDonut` chart + `CategoryTable` → `CategoryDialog` modal for subcategory drill-down

### Key Directories

- `app/` - Next.js App Router pages and components
  - `app/data/` - Budget data files per state (florida-budget.ts, illinois-budget.ts)
  - `app/components/` - Feature components (BudgetExplorer, charts/, modals/, tables/)
  - `app/utils/` - Currency and percent formatters
  - `app/florida/`, `app/illinois/`, `app/compare/` - State-specific routes
- `components/` - Legacy shared components (being migrated to app/components/)
- `lib/data/` - Legacy data and types (older structure)
- `.planning/` - GSD workflow planning files (PROJECT.md, ROADMAP.md)

### Type System

Two type definitions exist:
- `app/data/budget-types.ts` - Current: `BudgetData`, `BudgetCategory` with nested children and `SourceMeta`
- `lib/data/types.ts` - Legacy: `StateBudget`, `BudgetCategory` with `Provenance`

Use `app/data/budget-types.ts` for new work. The `BudgetCategory` type supports nested `children` for subcategory drill-down.

### Source Attribution

All budget figures include source metadata via the `SourceMeta` type (`url` + `description`). The `SourceIndicator` component renders clickable source links inline with values.

### Styling

- Tailwind CSS 4.x with CSS custom properties for theming (see `app/globals.css`)
- Chart colors defined in `--chart-1` through `--chart-6` CSS variables
- Dark mode is the default theme

### Visualization

Uses Recharts for charts. The `BudgetDonut` component wraps `PieChart` with custom tooltip and click-to-select behavior.

### Adding a New State

1. Create `app/data/[state]-budget.ts` following the `BudgetData` structure
2. Include source URLs for all figures
3. Create route at `app/[state]/page.tsx`
