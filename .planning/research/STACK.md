# Technology Stack

**Project:** Catalyst Patriot (Tax Dollar Visualizer)
**Domain:** Government Budget Data Visualization
**Researched:** 2026-02-05
**Overall Confidence:** HIGH

## Executive Summary

For government budget visualization apps, the standard 2025 stack prioritizes:
1. **Server-rendered React** for fast initial loads and SEO
2. **Declarative charting libraries** over imperative D3 for maintainability
3. **Component-first styling** for dark mode and responsive design
4. **Static data management** for simple, auditable deployments

The project's existing Next.js 16 + Tailwind CSS 4 foundation is excellent. Key additions needed are data visualization, animations, and modal management.

---

## Recommended Stack

### Core Framework (Already Configured)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Next.js** | 16.1.6 | React framework with App Router | Industry standard for React SSR/SSG, excellent SEO, built-in optimization, Vercel deployment | **HIGH** |
| **React** | 19.2.3 | UI library | Latest stable with improved concurrent features, required by Next.js 16 | **HIGH** |
| **TypeScript** | ^5 | Type safety | Prevents data structure bugs critical for budget accuracy, excellent DX | **HIGH** |

**Status:** ✓ Already configured
**Notes:** Next.js 16 App Router is the correct choice. Server Components improve performance for data-heavy pages.

### Styling (Already Configured)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Tailwind CSS** | ^4 | Utility-first CSS | v4 brings native CSS support, excellent dark mode, consistent spacing for charts/modals | **HIGH** |
| **@tailwindcss/postcss** | ^4 | PostCSS integration | Required for Tailwind v4 architecture | **HIGH** |

**Status:** ✓ Already configured
**Notes:** Tailwind v4 is cutting edge (released late 2024). Dark mode via `dark:` classes is standard for civic tech apps.

---

## Data Visualization (NEED TO ADD)

### Primary Charting Library

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Recharts** | ^2.13.3 | Declarative charts for React | Composable React components, excellent for donut/pie/bar charts, easier than D3 for standard charts, good TypeScript support | **HIGH** |

**Installation:**
```bash
npm install recharts
```

**Why Recharts over alternatives:**

| Library | Pros | Cons | Verdict |
|---------|------|------|---------|
| **Recharts** | React-native API, declarative, handles responsiveness, good for standard charts | Less flexible than D3, limited custom shapes | ✓ **RECOMMENDED** for this project |
| D3.js | Maximum flexibility, custom visualizations, best performance | Steep learning curve, imperative API fights React, overkill for donut/pie charts | ✗ Too complex for standard charts |
| Chart.js | Simple, lightweight, good documentation | Canvas-based (not SVG), poor React integration, harder to customize | ✗ Not React-first |
| Victory | Similar to Recharts, good animation | Larger bundle size, less active maintenance | ✗ Recharts more popular |
| Nivo | Beautiful defaults, great for dashboards | Larger bundle, opinionated styling harder to override | ✗ Less control over patriotic theme |

**Rationale:** For government budget visualization, you need:
- Donut/pie charts (spending categories)
- Bar charts (state comparisons)
- Interactive tooltips
- Responsive sizing
- Custom colors (patriotic theme)

Recharts excels at all of these without D3's complexity.

**Confidence:** HIGH — Recharts is the standard React charting library for these exact use cases.

---

### Animation Library

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Framer Motion** | ^11.15.0 | Animation library for React | Best-in-class React animations, excellent for modal transitions and chart entry animations, great TypeScript support | **HIGH** |

**Installation:**
```bash
npm install framer-motion
```

**Why Framer Motion:**
- Modal enter/exit animations (critical for drill-down UX)
- Chart reveal animations (progressive disclosure)
- Page transitions
- Gesture support (swipe on mobile)
- Works with Next.js App Router (with proper client component boundaries)

**Alternatives considered:**
- React Spring: More imperative API, steeper curve
- CSS transitions: Not sufficient for complex modal animations
- GSAP: More powerful but overkill, commercial license concerns

**Use cases:**
```typescript
// Modal drill-down animation
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
>
  {/* Budget subcategory breakdown */}
</motion.div>
```

**Confidence:** HIGH — Framer Motion is the React animation standard in 2025.

---

## UI Components (NEED TO ADD)

### Modal/Dialog Management

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Radix UI** | ^1.2.2 (primitives) | Headless UI components | Unstyled, accessible, composable — perfect for custom patriotic styling while maintaining WCAG compliance | **HIGH** |

**Installation:**
```bash
npm install @radix-ui/react-dialog @radix-ui/react-tooltip
```

**Why Radix UI:**
- Headless = full styling control (critical for patriotic theme)
- WCAG 2.1 Level AA compliant out of box
- Focus management, keyboard navigation, screen reader support
- Works perfectly with Tailwind CSS
- No runtime JS for static props

**Components needed:**
- `@radix-ui/react-dialog` — Modal for budget drill-down
- `@radix-ui/react-tooltip` — Chart data point tooltips

**Alternatives considered:**
- Headless UI: Good but less comprehensive than Radix
- Shadcn/ui: Nice but adds opinions, prefer building custom for unique patriotic theme
- Reach UI: Less actively maintained
- Custom modal: Accessibility is hard, don't reinvent

**Confidence:** HIGH — Radix UI is the gold standard for accessible React primitives.

---

## Data Management (NEED TO ADD)

### Number Formatting

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Intl.NumberFormat** | Built-in | Format currency and percentages | Native browser API, no bundle size, locale-aware, perfect for $116.5B formatting | **HIGH** |

**Installation:** None (native)

**Usage:**
```typescript
// $116.5 billion
const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1
});

// 39.5%
const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});
```

**Why NOT libraries:**
- `numeral.js` — Unmaintained since 2018
- `accounting.js` — Unmaintained
- `dinero.js` — Overkill for display formatting
- `react-number-format` — Unnecessary for read-only data

**Confidence:** HIGH — Native API is the modern standard.

---

### Date Formatting

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Intl.DateTimeFormat** | Built-in | Format fiscal year dates | Native browser API, no bundle size, locale-aware | **HIGH** |

**Installation:** None (native)

**Usage:**
```typescript
// "FY 2024-25"
const fiscalYear = 'FY 2024-25'; // Keep as string for government contexts
```

**Why NOT libraries:**
- `date-fns` — Overkill for static fiscal year strings
- `moment.js` — Deprecated, massive bundle
- `dayjs` — Not needed for static data

**Confidence:** HIGH — Static strings are sufficient for budget years.

---

## Data Structure (TypeScript)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Zod** | ^3.23.8 | Runtime data validation | Validate budget data at build time, catch malformed data before production, great DX with TypeScript | **MEDIUM** |

**Installation:**
```bash
npm install zod
```

**Why Zod:**
- Runtime validation of budget data files
- Catch errors like "percentages don't add to 100%"
- Type inference reduces boilerplate
- Excellent error messages

**Usage:**
```typescript
import { z } from 'zod';

const BudgetCategorySchema = z.object({
  name: z.string(),
  amount: z.number().positive(),
  percentage: z.number().min(0).max(100),
  subcategories: z.array(z.object({
    name: z.string(),
    amount: z.number().positive()
  }))
});

// Validates at import time
export const floridaBudget = BudgetCategorySchema.parse(rawData);
```

**Alternative:**
- Manual validation — Error-prone, no type inference
- JSON Schema — Less TypeScript-native

**Confidence:** MEDIUM — Not strictly required but highly recommended for data accuracy.

---

## Utilities (NEED TO ADD)

### Class Name Management

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **clsx** | ^2.1.1 | Conditional class names | Tiny (228 bytes), handles conditional Tailwind classes cleanly | **HIGH** |
| **tailwind-merge** | ^2.7.0 | Merge Tailwind classes | Prevents class conflicts when composing components | **HIGH** |

**Installation:**
```bash
npm install clsx tailwind-merge
```

**Usage:**
```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  'rounded-lg p-4',
  isDarkMode && 'bg-slate-800',
  isActive && 'ring-2 ring-blue-500'
)} />
```

**Why:**
- `clsx` handles conditionals elegantly
- `tailwind-merge` prevents conflicts like `p-4 p-6` (keeps `p-6`)

**Confidence:** HIGH — Standard pattern in modern Tailwind projects.

---

## Icon Library

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Lucide React** | ^0.468.0 | Icon library | Modern, tree-shakeable, consistent design, good patriotic icons (flag, map, etc.) | **HIGH** |

**Installation:**
```bash
npm install lucide-react
```

**Why Lucide:**
- Tree-shakeable (only bundle icons you use)
- Consistent 24x24 design system
- Clean, modern style (not dated)
- Good government/civic icons (Flag, MapPin, TrendingUp, PieChart)

**Alternatives:**
- React Icons: Larger bundle, inconsistent styles
- Heroicons: Good but smaller icon set
- Font Awesome: Not tree-shakeable, dated feel

**Usage:**
```typescript
import { Flag, PieChart, TrendingUp } from 'lucide-react';

<PieChart className="w-6 h-6 text-blue-600" />
```

**Confidence:** HIGH — Lucide is the modern standard for React icons.

---

## Testing (Recommended for Budget Accuracy)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Vitest** | ^2.1.8 | Unit testing | Fast, Vite-based, better DX than Jest, excellent TypeScript support | **MEDIUM** |
| **Playwright** | ^1.49.1 | E2E testing | Test chart interactions, modal drill-downs, cross-browser | **MEDIUM** |

**Installation:**
```bash
npm install -D vitest @vitejs/plugin-react
npm install -D @playwright/test
```

**Why testing matters for budget data:**
- Validate percentages add to 100%
- Ensure chart data matches source data
- Test modal interactions work
- Verify number formatting accuracy

**Confidence:** MEDIUM — Not required for v1 but highly recommended for data accuracy.

---

## Development Tools (Already Configured)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **ESLint** | ^9 | Linting | Already configured, prevents bugs | **HIGH** |
| **eslint-config-next** | 16.1.6 | Next.js rules | Already configured | **HIGH** |

**Status:** ✓ Already configured

---

## Deployment (Already Decided)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Vercel** | N/A | Hosting platform | Zero-config Next.js deployment, global CDN, automatic HTTPS, built by Next.js creators | **HIGH** |

**Why Vercel:**
- Next.js 16 optimized out of box
- Edge network for fast chart loads
- Free tier sufficient for civic project
- Git-based deployment

**Alternatives:**
- Netlify: Good but not Next.js-optimized
- Cloudflare Pages: Good but newer
- AWS Amplify: More complex setup

**Confidence:** HIGH — Vercel is the standard for Next.js apps.

---

## Complete Installation Commands

```bash
# Data visualization
npm install recharts

# Animation
npm install framer-motion

# UI primitives
npm install @radix-ui/react-dialog @radix-ui/react-tooltip

# Data validation (recommended)
npm install zod

# Utilities
npm install clsx tailwind-merge

# Icons
npm install lucide-react

# Testing (optional for v1)
npm install -D vitest @vitejs/plugin-react @playwright/test
```

---

## Anti-Recommendations

### Do NOT Use

| Technology | Why Avoid | What to Use Instead |
|------------|-----------|-------------------|
| **D3.js** | Imperative API fights React, massive overkill for donut/pie charts, steep learning curve | Recharts (declarative, React-native) |
| **Create React App** | Deprecated, no SSR, slower than Next.js | Next.js 16 (already using) |
| **Styled Components** | Runtime CSS-in-JS is slower, fights with Tailwind | Tailwind CSS (already using) |
| **Redux** | Overkill for static data, unnecessary complexity | React state + Server Components |
| **Axios** | Unnecessary when `fetch` is native and Next.js caches automatically | Native `fetch` |
| **Moment.js** | Deprecated, massive bundle (67kb) | Intl.DateTimeFormat (native) or date-fns (if needed) |
| **Material UI** | Opinionated styling hard to override for patriotic theme | Radix UI (headless) + Tailwind |
| **Bootstrap** | jQuery-era framework, fights with React | Tailwind CSS |

---

## Stack Summary

### Must Have (Core)
```
Next.js 16 ✓
React 19 ✓
TypeScript ✓
Tailwind CSS 4 ✓
Recharts ← ADD
Framer Motion ← ADD
Radix UI ← ADD
```

### Should Have (Quality)
```
clsx + tailwind-merge ← ADD
Lucide React ← ADD
Zod ← ADD (recommended)
```

### Nice to Have (Polish)
```
Vitest
Playwright
```

---

## Version Matrix

| Category | Library | Minimum Version | Recommended Version | Notes |
|----------|---------|----------------|---------------------|-------|
| Framework | Next.js | 16.0.0 | 16.1.6 | Already configured |
| Framework | React | 19.0.0 | 19.2.3 | Already configured |
| Styling | Tailwind CSS | 4.0.0 | 4.x | Already configured |
| Charts | Recharts | 2.12.0 | 2.13.3 | Latest stable |
| Animation | Framer Motion | 11.0.0 | 11.15.0 | Latest stable |
| UI | Radix Dialog | 1.1.0 | 1.2.2 | Latest stable |
| Icons | Lucide React | 0.400.0 | 0.468.0 | Latest stable |
| Validation | Zod | 3.22.0 | 3.23.8 | Latest stable |
| Utilities | clsx | 2.0.0 | 2.1.1 | Latest stable |
| Utilities | tailwind-merge | 2.0.0 | 2.7.0 | Latest stable |

**Note on versions:** All recommended versions are current as of January 2025 training data. Verify latest stable versions before installation.

---

## Architecture Implications

### Component Structure
```
app/
├── components/
│   ├── charts/
│   │   ├── BudgetDonutChart.tsx (Recharts)
│   │   ├── FundingSourcesChart.tsx (Recharts)
│   │   └── StateComparisonChart.tsx (Recharts)
│   ├── ui/
│   │   ├── Modal.tsx (Radix Dialog + Framer Motion)
│   │   └── Tooltip.tsx (Radix Tooltip)
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── data/
│   ├── florida-budget.ts (TypeScript with Zod validation)
│   └── types.ts
└── page.tsx (Server Component)
```

### Performance Strategy
- **Server Components** for static content (Next.js 16 default)
- **Client Components** only for interactive charts and modals
- **Static data** = no API calls, instant loads
- **Code splitting** automatic via Next.js
- **Image optimization** via next/image for any infographics

### Dark Mode Strategy
- **Tailwind dark mode** via `dark:` classes
- **Chart colors** defined in Tailwind config
- **CSS custom properties** for dynamic theme values

---

## Confidence Assessment

| Category | Level | Reasoning |
|----------|-------|-----------|
| Framework (Next.js/React/TypeScript) | **HIGH** | Already configured, industry standard, extensive documentation |
| Styling (Tailwind CSS 4) | **HIGH** | Already configured, proven for data viz apps |
| Charting (Recharts) | **HIGH** | Standard React charting library for these exact use cases |
| Animation (Framer Motion) | **HIGH** | De facto React animation standard |
| UI (Radix UI) | **HIGH** | Gold standard for accessible headless components |
| Utilities (clsx, tailwind-merge) | **HIGH** | Tiny, battle-tested, standard pattern |
| Icons (Lucide React) | **HIGH** | Modern standard for React icons |
| Validation (Zod) | **MEDIUM** | Recommended but not required, depends on data accuracy needs |
| Testing (Vitest/Playwright) | **MEDIUM** | Best-in-class but not required for v1 |

---

## Sources

**Note:** Web search tools were unavailable during this research. Recommendations are based on:

1. **Training data (January 2025)** — Covers standard practices for React data visualization apps
2. **Existing project configuration** — Next.js 16, React 19, Tailwind CSS 4 already in place
3. **Library ecosystem knowledge** — Common patterns for civic tech and data visualization

**Verification needed:**
- Latest stable versions of recommended libraries (use `npm info [package] version`)
- Recharts compatibility with React 19 (check official docs)
- Radix UI latest primitives (check official docs)
- Framer Motion App Router guidance (check official docs)

**Confidence note:** These are standard, widely-adopted libraries with strong communities. However, without access to Context7 or current documentation, version numbers should be verified before installation.

---

## Next Steps

1. **Install core libraries:**
   ```bash
   npm install recharts framer-motion @radix-ui/react-dialog @radix-ui/react-tooltip clsx tailwind-merge lucide-react
   ```

2. **Verify versions:**
   ```bash
   npm info recharts version
   npm info framer-motion version
   # ... etc
   ```

3. **Create sample chart** to validate Recharts + Tailwind integration

4. **Set up Radix Dialog** for modal drill-down pattern

5. **Configure Framer Motion** for modal animations

6. **Consider Zod** if data validation is critical (recommended)

---

*Research completed: 2026-02-05*
*Researcher: GSD Project Researcher*
*Downstream consumer: Roadmap creation*
