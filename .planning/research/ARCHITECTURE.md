# Architecture Patterns: Government Budget Visualization

**Domain:** Tax dollar/budget visualization web application
**Researched:** 2026-02-05
**Confidence:** MEDIUM (based on training data and Next.js/React visualization patterns)

## Executive Summary

Government budget visualization systems typically follow a layered architecture with clear separation between data, business logic, presentation, and interaction layers. For static budget data (like CatalystPatriot), the architecture can be simplified to avoid backend complexity while maintaining scalability for multi-state expansion.

**Key architectural principle:** Data flows unidirectionally from static sources → processing/calculation layer → presentation components → interactive UI elements.

## Recommended Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js App Router                   │
├─────────────────────────────────────────────────────────┤
│  Pages (Route Handlers)                                 │
│  ├─ / (Landing)                                         │
│  ├─ /state/[stateId] (State Detail)                     │
│  ├─ /compare (State Comparison)                         │
│  └─ /about (Methodology)                                │
├─────────────────────────────────────────────────────────┤
│  UI Components                                           │
│  ├─ Layout Components (Header, Footer, Nav)            │
│  ├─ Visualization Components (Charts, Maps)             │
│  ├─ Interactive Components (Modals, Tooltips)          │
│  └─ Utility Components (Cards, Buttons)                │
├─────────────────────────────────────────────────────────┤
│  Business Logic Layer                                    │
│  ├─ Data Adapters (transform raw budget data)          │
│  ├─ Calculation Services (percentages, totals)         │
│  ├─ Formatting Utilities (currency, numbers)           │
│  └─ State Comparison Logic                              │
├─────────────────────────────────────────────────────────┤
│  Data Layer                                              │
│  ├─ Budget Data Files (app/data/*.ts)                  │
│  ├─ Type Definitions (interfaces for budget shape)     │
│  └─ Data Registry (state metadata, discovery)          │
└─────────────────────────────────────────────────────────┘
```

### Component Boundaries

| Component | Responsibility | Communicates With | Key Patterns |
|-----------|---------------|-------------------|--------------|
| **Page Components** | Route handling, data loading, layout composition | Data Layer (direct import), UI Components (props) | Server Components for data loading, Client Components for interactivity |
| **Chart Components** | Data visualization rendering | Business Logic (receives processed data), Interactive Components (emits events) | Pure presentation, accept normalized data shape |
| **Modal Components** | Drill-down detail display | Chart Components (triggered by), Data Layer (fetches detail data) | Client Component with state management |
| **Data Adapters** | Transform raw budget data to chart-ready format | Data Layer (reads), Chart Components (consumed by) | Pure functions, no side effects |
| **Calculation Services** | Compute percentages, per-capita, aggregations | Data Layer (reads), Page Components (called by) | Pure functions, memoizable |
| **Type System** | Define budget data shape, chart data shape | All layers (imported by) | Single source of truth for data contracts |

### Data Flow

#### 1. Initial Page Load (Server-Side)

```
User Request
    ↓
Next.js Route Handler (app/page.tsx)
    ↓
Import Budget Data (app/data/florida-budget.ts)
    ↓
Data Adapter transforms to chart format
    ↓
Calculation Service computes percentages
    ↓
Server Component renders with processed data
    ↓
HTML sent to client
```

#### 2. Interactive Drill-Down (Client-Side)

```
User clicks chart segment
    ↓
Chart Component emits click event with category ID
    ↓
Modal Component state updates (show modal)
    ↓
Data Adapter filters detail data for category
    ↓
Calculation Service computes subcategory percentages
    ↓
Modal renders detail chart with subcategory data
```

#### 3. State Comparison Flow

```
User navigates to /compare
    ↓
Server Component imports multiple state data files
    ↓
Comparison Logic normalizes data (per capita, same categories)
    ↓
Data Adapter transforms to comparison chart format
    ↓
Render side-by-side or overlay visualizations
```

## Patterns to Follow

### Pattern 1: Static Data Module Pattern
**What:** Budget data as TypeScript modules with typed exports
**When:** Static, infrequently-changing data (budget updates annually)
**Why:** Type safety, tree-shaking, no runtime overhead, simple deployment

**Example:**
```typescript
// app/data/florida-budget.ts
import { BudgetData } from '../types/budget'

export const floridaBudget: BudgetData = {
  state: 'Florida',
  fiscalYear: '2024-25',
  totalBudget: 116500000000,
  categories: [
    {
      id: 'health-human-services',
      name: 'Health & Human Services',
      amount: 46017500000,
      subcategories: [
        { id: 'medicaid', name: 'Medicaid', amount: 32000000000 },
        // ...
      ]
    },
    // ...
  ],
  fundingSources: [
    { type: 'General Revenue', amount: 48930000000 },
    { type: 'State Trust Funds', amount: 30290000000 },
    { type: 'Federal Funds', amount: 37280000000 }
  ]
}
```

### Pattern 2: Data Adapter Layer
**What:** Pure functions that transform budget data to chart-specific formats
**When:** Before passing data to visualization components
**Why:** Separation of concerns, testable, reusable across different chart types

**Example:**
```typescript
// app/lib/adapters/budget-to-pie.ts
import { BudgetData, PieChartData } from '../types'

export function budgetToPieData(budget: BudgetData): PieChartData[] {
  return budget.categories.map(category => ({
    name: category.name,
    value: category.amount,
    percentage: (category.amount / budget.totalBudget) * 100,
    color: getCategoryColor(category.id)
  }))
}
```

### Pattern 3: Server Component for Data, Client for Interaction
**What:** Use React Server Components for data loading, Client Components for charts/modals
**When:** Default pattern for Next.js App Router
**Why:** Reduce client bundle, server-side rendering for SEO, hydrate only interactive parts

**Example:**
```typescript
// app/page.tsx (Server Component)
import { floridaBudget } from './data/florida-budget'
import { budgetToPieData } from './lib/adapters/budget-to-pie'
import BudgetChart from './components/BudgetChart'

export default function Home() {
  const chartData = budgetToPieData(floridaBudget)

  return (
    <main>
      <h1>Florida Budget: ${formatCurrency(floridaBudget.totalBudget)}</h1>
      <BudgetChart data={chartData} />
    </main>
  )
}

// app/components/BudgetChart.tsx (Client Component)
'use client'
import { PieChart } from 'recharts'
import { useState } from 'react'

export default function BudgetChart({ data }) {
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <>
      <PieChart onClick={(e) => setSelectedCategory(e.payload)}>
        {/* Chart implementation */}
      </PieChart>
      {selectedCategory && (
        <DrillDownModal category={selectedCategory} onClose={() => setSelectedCategory(null)} />
      )}
    </>
  )
}
```

### Pattern 4: Type-Driven Development
**What:** Define TypeScript interfaces for all data shapes first
**When:** Before writing data files or components
**Why:** Ensures consistency across states, catches errors early, enables autocomplete

**Example:**
```typescript
// app/types/budget.ts
export interface BudgetData {
  state: string
  fiscalYear: string
  totalBudget: number
  categories: Category[]
  fundingSources: FundingSource[]
  metadata?: {
    population?: number
    dataSource?: string
    lastUpdated?: string
  }
}

export interface Category {
  id: string
  name: string
  amount: number
  subcategories?: Subcategory[]
  description?: string
}

export interface Subcategory {
  id: string
  name: string
  amount: number
  description?: string
}

export interface FundingSource {
  type: string
  amount: number
}
```

### Pattern 5: State Registry Pattern
**What:** Central registry of available states with metadata
**When:** Multi-state expansion begins (Phase 2+)
**Why:** Dynamic discovery, routing, comparison features

**Example:**
```typescript
// app/data/registry.ts
import { floridaBudget } from './florida-budget'
import { texasBudget } from './texas-budget'

export const stateRegistry = {
  florida: {
    id: 'florida',
    name: 'Florida',
    abbr: 'FL',
    data: floridaBudget,
    enabled: true
  },
  texas: {
    id: 'texas',
    name: 'Texas',
    abbr: 'TX',
    data: texasBudget,
    enabled: false // Not yet released
  }
}

export function getAvailableStates() {
  return Object.values(stateRegistry).filter(state => state.enabled)
}
```

### Pattern 6: Responsive Chart Wrapper Pattern
**What:** HOC or wrapper component that adjusts chart size/config based on viewport
**When:** For all chart components
**Why:** Mobile responsiveness, accessibility, consistent behavior

**Example:**
```typescript
// app/components/ResponsiveChartWrapper.tsx
'use client'
import { useEffect, useState } from 'react'

export default function ResponsiveChartWrapper({ children }) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      setDimensions({
        width: width < 768 ? width - 32 : Math.min(800, width * 0.8),
        height: width < 768 ? 400 : 600
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <div style={{ width: dimensions.width, height: dimensions.height }}>
      {children(dimensions)}
    </div>
  )
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Fetching Static Data at Runtime
**What:** Using `fetch()` or API routes to load budget data that never changes between builds
**Why bad:** Unnecessary network requests, slower page loads, added complexity
**Instead:** Import data files directly in Server Components, leverage Next.js static optimization

### Anti-Pattern 2: Client-Side Data Processing
**What:** Doing calculations (percentages, aggregations) in Client Components
**Why bad:** Larger client bundle, slower initial render, duplicated work on every render
**Instead:** Process data in Server Components or during build time, pass pre-computed values to client

### Anti-Pattern 3: Prop Drilling Chart Configuration
**What:** Passing chart colors, sizes, formats through many component layers
**Why bad:** Brittle, hard to maintain, coupling between unrelated components
**Instead:** Use design tokens (CSS variables), centralized theme configuration, or React Context for chart config

### Anti-Pattern 4: Tight Coupling to Recharts API
**What:** Directly using Recharts components throughout codebase
**Why bad:** Hard to swap visualization libraries, testing complexity, unclear abstractions
**Instead:** Create chart facade components (BudgetPieChart, CategoryBarChart) that wrap Recharts internally

### Anti-Pattern 5: Mixing Budget Data with UI State
**What:** Storing modal state, selected categories, etc. in same structure as budget data
**Why bad:** Confusion about data sources, serialization issues, state management complexity
**Instead:** Keep budget data immutable, manage UI state separately in component state or state management

### Anti-Pattern 6: Over-Engineering Data Layer
**What:** Adding database, API layer, caching for static data that updates once per year
**Why bad:** Unnecessary complexity, deployment dependencies, maintenance burden
**Instead:** Start simple with TypeScript files, migrate to backend only if data becomes truly dynamic

## Scalability Considerations

| Concern | At 1 State (MVP) | At 5 States | At 50 States |
|---------|------------------|-------------|--------------|
| **Data Loading** | Direct import in page | Registry pattern with dynamic imports | Code splitting per state, lazy loading |
| **Bundle Size** | ~50KB data per state, acceptable | ~250KB data, still acceptable | ~2.5MB data, need chunking strategy |
| **Build Time** | Negligible | Negligible | May need incremental static regeneration |
| **Comparison Logic** | N/A | Simple array operations | Need normalized comparison API, worker threads |
| **Search/Discovery** | N/A | Simple list/dropdown | Full-text search index, autocomplete |
| **State Updates** | Manual file edits | Manual file edits | Consider data pipeline/CMS for bulk updates |

### Scaling Strategy

**Phase 1 (1-3 states):** Direct imports, simple structure
- Budget data as TypeScript files
- Direct imports in Server Components
- Manual data updates

**Phase 2 (4-10 states):** Registry + dynamic imports
- Centralized state registry
- `import()` for lazy-loading state data
- Comparison features with normalized data

**Phase 3 (11-50 states):** Code splitting + ISR
- Next.js dynamic routes with `generateStaticParams`
- Incremental Static Regeneration for data updates
- CDN-cached JSON files for data
- Search index for state discovery

**Phase 4 (50+ states):** Database-backed with static export
- Budget data in structured database
- Build-time export to static files
- Admin interface for data management
- Automated data validation pipeline

## Component Dependency Order

Based on architectural dependencies, suggested build order:

### Foundation Layer (Phase 1)
1. **Type Definitions** (`app/types/budget.ts`)
   - No dependencies
   - Enables type-safe development everywhere

2. **Budget Data File** (`app/data/florida-budget.ts`)
   - Depends on: Type Definitions
   - Enables all downstream components

3. **Utility Functions** (`app/lib/utils/format.ts`, `app/lib/utils/colors.ts`)
   - No dependencies
   - Reusable across all components

### Data Processing Layer (Phase 2)
4. **Data Adapters** (`app/lib/adapters/budget-to-pie.ts`)
   - Depends on: Type Definitions, Budget Data, Utilities
   - Transforms data for chart consumption

5. **Calculation Services** (`app/lib/services/calculations.ts`)
   - Depends on: Type Definitions
   - Provides computed values (percentages, per capita)

### Presentation Layer (Phase 3)
6. **Layout Components** (`app/components/Header.tsx`, `app/components/Footer.tsx`)
   - No data dependencies
   - Can be built in parallel with data layer

7. **Base Chart Components** (`app/components/charts/PieChart.tsx`)
   - Depends on: Utilities (colors, formatting)
   - Wraps Recharts with app-specific defaults

8. **Interactive Components** (`app/components/DrillDownModal.tsx`)
   - Depends on: Base Chart Components, Data Adapters
   - Provides drill-down functionality

### Page Layer (Phase 4)
9. **Landing Page** (`app/page.tsx`)
   - Depends on: All above
   - Composes Server Components with data loading

10. **State Detail Page** (`app/state/[stateId]/page.tsx`)
    - Depends on: State Registry (Phase 2 addition)
    - Dynamic routing for multi-state

11. **Comparison Page** (`app/compare/page.tsx`)
    - Depends on: Comparison Logic (Phase 2 addition)
    - Most complex page, build last

### Critical Path for MVP

The minimal viable architecture:
1. Type Definitions → 2. Budget Data → 3. Format Utils → 4. Budget-to-Pie Adapter → 5. Pie Chart Component → 6. Landing Page

This path enables the core value: "Show Florida budget as interactive pie chart."

## Technology-Specific Patterns

### Next.js App Router Patterns

**File-Based Routing:**
- `app/page.tsx` → `/` (landing)
- `app/state/[stateId]/page.tsx` → `/state/florida`
- `app/compare/page.tsx` → `/compare`
- `app/about/page.tsx` → `/about`

**Metadata API for SEO:**
```typescript
// app/state/[stateId]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const state = getStateData(params.stateId)
  return {
    title: `${state.name} Budget | Catalyst Patriot`,
    description: `Visualize ${state.name}'s ${state.fiscalYear} budget of $${formatCurrency(state.totalBudget)}`
  }
}
```

**Server/Client Component Split:**
- Server: Page layouts, data loading, static content
- Client: Charts, modals, tooltips, any interactivity

### Recharts Integration Patterns

**Chart Component Structure:**
```typescript
'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function BudgetPieChart({ data, onSegmentClick }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          onClick={onSegmentClick}
        >
          {data.map((entry, index) => (
            <Cell key={entry.id} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(value)} />
      </PieChart>
    </ResponsiveContainer>
  )
}
```

### Tailwind CSS Patterns

**Theme Variables for Budget Categories:**
```css
/* app/globals.css */
:root {
  --color-health: #3b82f6;
  --color-education: #10b981;
  --color-transportation: #f59e0b;
  --color-corrections: #ef4444;
  --color-environment: #06b6d4;
  --color-other: #8b5cf6;
}
```

**Responsive Chart Container:**
```typescript
<div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="aspect-square md:aspect-video">
    <BudgetPieChart data={data} />
  </div>
</div>
```

## Architecture Decision Records

### ADR-001: Static TypeScript Files for Budget Data

**Context:** Need to store budget data for visualization

**Decision:** Use TypeScript files in `app/data/` directory

**Rationale:**
- Budget data updates infrequently (annually)
- Type safety ensures data consistency
- No backend infrastructure needed
- Zero runtime overhead
- Git-based version control
- Easy for developers to update

**Consequences:**
- ✅ Simpler architecture
- ✅ Faster page loads (no fetch)
- ✅ Type safety
- ✅ Better DX (autocomplete)
- ❌ Non-technical users can't update data
- ❌ Requires rebuild to update data

**Revisit:** When data needs to update more than quarterly, or when non-developers need to manage data

### ADR-002: Server Components for Data, Client for Charts

**Context:** Next.js App Router supports Server and Client Components

**Decision:** Load and process data in Server Components, render charts in Client Components

**Rationale:**
- Leverages Next.js static optimization
- Reduces client bundle size
- Better SEO (HTML includes data)
- Charts require interactivity (must be client)

**Consequences:**
- ✅ Smaller client bundle
- ✅ Better performance
- ✅ SEO-friendly
- ❌ Must mark chart components 'use client'
- ❌ Can't pass functions as props across boundary

**Revisit:** N/A, this is the intended Next.js pattern

### ADR-003: Direct Recharts Integration (No Chart Abstraction Library)

**Context:** Need to render budget visualizations

**Decision:** Use Recharts directly, wrapped in thin facade components

**Rationale:**
- Recharts is React-native, good DX
- Sufficient for pie, bar, line charts
- Chart needs are straightforward (not complex custom viz)
- Facade components provide app-specific defaults without over-abstracting

**Consequences:**
- ✅ Fast implementation
- ✅ Good documentation
- ✅ React-friendly API
- ❌ Tied to Recharts API
- ❌ Limited customization vs D3

**Revisit:** If custom visualizations beyond standard chart types are needed (e.g., Sankey diagrams, geographic maps)

### ADR-004: Modal for Drill-Down (Not Separate Pages)

**Context:** Users should explore category details

**Decision:** Open modal with subcategory chart on category click

**Rationale:**
- Keeps user in context
- Faster than navigation
- Better for exploration workflow
- Simpler state management

**Consequences:**
- ✅ Better UX for exploration
- ✅ No routing complexity
- ✅ Preserves scroll position
- ❌ Not deep-linkable
- ❌ Modal state in client component

**Revisit:** If users need to share links to specific category details

## Sources

**Confidence Level: MEDIUM**

This research is based on:
- React/Next.js App Router patterns (HIGH confidence - well-documented)
- Data visualization architecture principles from training data (MEDIUM confidence)
- Budget visualization domain knowledge from training (MEDIUM confidence - based on examples like OpenBudgetOakland, OpenSpending)

**Note:** Web search tools were unavailable during research. Findings are based on training data (knowledge cutoff: January 2025) and may not reflect latest 2026 patterns. Recommend validating with:
- Official Next.js 16 App Router documentation
- Recharts latest documentation
- Recent budget visualization case studies

**Areas of uncertainty:**
- Specific 2026 best practices for Next.js 16 (released after training)
- Latest Recharts API patterns
- Current state of OpenSpending or similar platforms

**What's solid:**
- General architecture patterns (layered architecture, data flow)
- React Server/Client Component patterns
- TypeScript static data patterns
- Component boundary principles
