# Phase 01: Core Visualization (MVP) - Research

**Researched:** 2026-02-05
**Domain:** Interactive budget visualization (React/Next.js, charting, accessibility)
**Confidence:** HIGH

## Summary

This research focused on the standard React/Next.js stack for interactive budget charts (treemap/sunburst/donut), touch-first drill-down interactions, and accessibility requirements for non-text visualizations. The core implementation should use Recharts for charting (Pie/Donut, Treemap, SunburstChart, Tooltip, ResponsiveContainer) and Radix Dialog for accessible drill-down modals. WCAG 2.1 SC 1.1.1 requires text alternatives for charts, so each visualization must include a data table or long-text description linked to the chart.

The standard approach is: keep budget data in a hierarchical shape compatible with Recharts (`name`, `value`, `children`), render responsive charts with `ResponsiveContainer`, provide touch-friendly interactions via `onClick` handlers and `Tooltip` with `trigger="click"`, and present drill-down details in a Radix Dialog with `Title`/`Description` (optionally hidden with Radix Visually Hidden). This ensures mobile compatibility, accessible interaction, and compliance with text-alternative requirements.

**Primary recommendation:** Use Recharts (Pie/Treemap/SunburstChart + Tooltip + ResponsiveContainer) with Radix Dialog, and always pair each chart with a text alternative (table or description) linked via `aria-describedby` to satisfy WCAG 1.1.1.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | React framework (App Router) | Already in repo, standard for SSR/SSG and performance |
| React | 19.2.3 | UI library | Required by Next.js 16, project baseline |
| Tailwind CSS | 4.x | Styling | Existing stack, good for responsive layouts |
| Recharts | 3.7.0 | Charting (donut/treemap/sunburst) | Declarative React charts with responsive container, built-in tooltip and hierarchy charts |
| @radix-ui/react-dialog | 1.1.15 | Drill-down modal | Accessible focus management, ARIA dialog pattern, composable |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @radix-ui/react-visually-hidden | 1.2.4 | Accessible hidden text | Hide chart descriptions or dialog titles while keeping them readable by screen readers |
| Intl.NumberFormat | Built-in | Currency/percent formatting | Format budget values without extra dependencies |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Recharts | D3.js | More flexible but imperative and higher complexity for MVP charts (LOW confidence, no official source in this research) |
| Radix Dialog | Custom modal | Hard to implement correct focus trap and ARIA semantics (LOW confidence, common pitfall) |

**Installation:**
```bash
npm install recharts @radix-ui/react-dialog @radix-ui/react-visually-hidden
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── components/
│   ├── charts/           # Recharts visualizations
│   ├── modals/           # Radix Dialog wrappers
│   └── tables/           # Text alternatives for charts
├── data/                 # Budget data + derived summaries
└── page.tsx              # Server component, composes sections
```

### Pattern 1: Responsive Chart Container
**What:** Wrap charts in `ResponsiveContainer` so they adapt to parent size (uses ResizeObserver).
**When to use:** All charts in responsive layouts.
**Example:**
```tsx
// Source: https://recharts.github.io/en-US/api/ResponsiveContainer/
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

<ResponsiveContainer width="100%" height={360}>
  <PieChart>
    <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" />
    <Tooltip />
  </PieChart>
</ResponsiveContainer>
```

### Pattern 2: Hierarchical Data for Treemap/Sunburst
**What:** Shape data with `name`, `value`, and `children` for hierarchical charts.
**When to use:** Treemap or Sunburst chart for top-level categories + subcategories.
**Example:**
```tsx
// Source: https://recharts.github.io/en-US/api/Treemap/
const data = [
  {
    name: "Education",
    value: 100,
    children: [
      { name: "K-12", value: 60 },
      { name: "Higher Ed", value: 40 },
    ],
  },
];

<Treemap data={data} dataKey="value" nameKey="name" />
```

### Pattern 3: Touch-Friendly Tooltip
**What:** Use `Tooltip` with `trigger="click"` to support mobile without hover.
**When to use:** Any chart with tooltips on touch devices.
**Example:**
```tsx
// Source: https://recharts.github.io/en-US/api/Tooltip/
<Tooltip trigger="click" />
```

### Pattern 4: Accessible Drill-Down Modal
**What:** Use Radix Dialog with Title/Description for screen readers.
**When to use:** Drill-down modal for category detail.
**Example:**
```tsx
// Source: https://www.radix-ui.com/primitives/docs/components/dialog
import { Dialog } from "radix-ui";

<Dialog.Root>
  <Dialog.Trigger asChild>
    <button>View details</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Education</Dialog.Title>
      <Dialog.Description>Subcategory breakdown</Dialog.Description>
      <Dialog.Close asChild>
        <button>Close</button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### Anti-Patterns to Avoid
- **Hover-only interactions:** Tooltips or drill-downs that require hover fail on mobile; use click/tap triggers instead.
- **Fixed-size charts:** Charts without `ResponsiveContainer` break on small screens.
- **Modal without Title/Description:** Screen readers lose context; always include or hide via Visually Hidden.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Chart rendering | Custom SVG/d3 setup | Recharts | Built-in responsive charting and tooltip behavior |
| Modal accessibility | Custom modal | Radix Dialog | Focus trap, ARIA semantics, keyboard support |
| Hidden labels | Custom CSS hacks | Radix Visually Hidden | Screen-reader safe hiding |

**Key insight:** Accessibility and responsive behaviors have subtle edge cases; established libraries already solve them.

## Common Pitfalls

### Pitfall 1: Missing text alternatives for charts
**What goes wrong:** Charts are unreadable to screen readers, failing WCAG 1.1.1.
**Why it happens:** Developers treat charts as purely visual.
**How to avoid:** Provide a data table or long description and link it with `aria-describedby`.
**Warning signs:** No table/summary near the chart, or chart not described in text.

### Pitfall 2: Charts render at 0px height
**What goes wrong:** Recharts charts disappear on mobile.
**Why it happens:** `ResponsiveContainer` measures its parent; if parent has no height, chart is 0px tall.
**How to avoid:** Set explicit height or min-height on the parent container.
**Warning signs:** Chart renders in desktop but not in responsive layouts.

### Pitfall 3: Hover-only tooltips
**What goes wrong:** Mobile users cannot access details.
**Why it happens:** Tooltip defaults to hover.
**How to avoid:** Set `trigger="click"` for `Tooltip` and ensure tap targets are large enough.
**Warning signs:** No tooltip appears on touch devices.

### Pitfall 4: Dialog without accessible labeling
**What goes wrong:** Screen readers open a modal with no context.
**Why it happens:** Missing `Dialog.Title` and `Dialog.Description`.
**How to avoid:** Include Title/Description or hide with Visually Hidden.
**Warning signs:** Screen reader announces "dialog" with no title.

## Code Examples

Verified patterns from official sources:

### Responsive Donut Chart
```tsx
// Source: https://recharts.github.io/en-US/api/PieChart/
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

<ResponsiveContainer width="100%" height={360}>
  <PieChart>
    <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" />
    <Tooltip />
  </PieChart>
</ResponsiveContainer>
```

### Treemap with Hierarchy
```tsx
// Source: https://recharts.github.io/en-US/api/Treemap/
<Treemap data={data} dataKey="value" nameKey="name" type="flat" />
```

### Radix Dialog Skeleton
```tsx
// Source: https://www.radix-ui.com/primitives/docs/components/dialog
<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title />
      <Dialog.Description />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### Accessible Hidden Text
```tsx
// Source: https://www.radix-ui.com/primitives/docs/utilities/visually-hidden
import { VisuallyHidden } from "radix-ui";

<VisuallyHidden.Root>Budget chart data table follows.</VisuallyHidden.Root>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Fixed-size SVG charts | ResponsiveContainer with ResizeObserver | Recharts current docs | Charts adapt to mobile layouts without manual resize logic |
| Hover-only tooltips | Tooltip supports `trigger="click"` | Recharts current docs | Touch-friendly interactions |

**Deprecated/outdated:**
- Building custom modal focus traps instead of using accessible primitives.

## Open Questions

1. **Budget data source and attribution text**
   - What we know: Phase requires data source attribution and fiscal year clarity.
   - What's unclear: Exact source URL, license, and preferred attribution language.
   - Recommendation: Confirm official Florida FY 2024-25 budget source and required attribution text before implementation.

2. **Budget category taxonomy**
   - What we know: Visualization requires top-level categories and subcategories.
   - What's unclear: Final category names, percentages, and data format.
   - Recommendation: Lock the JSON schema for `name`, `value`, `children` before building charts.

## Sources

### Primary (HIGH confidence)
- https://recharts.github.io/en-US/api/PieChart/ - PieChart props, events, and responsive usage
- https://recharts.github.io/en-US/api/Pie/ - Pie dataKey/nameKey and donut support
- https://recharts.github.io/en-US/api/Treemap/ - Hierarchical data support and props
- https://recharts.github.io/en-US/api/SunburstChart/ - SunburstChart availability and props
- https://recharts.github.io/en-US/api/ResponsiveContainer/ - ResizeObserver-based responsiveness
- https://recharts.github.io/en-US/api/Tooltip/ - Tooltip configuration and click trigger
- https://www.radix-ui.com/primitives/docs/components/dialog - Accessible dialog structure and features
- https://www.radix-ui.com/primitives/docs/utilities/visually-hidden - Accessible hidden text utility
- https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html - WCAG 2.1 SC 1.1.1 text alternatives

### Secondary (MEDIUM confidence)
- https://www.npmjs.com/package/recharts - Version source (3.7.0)
- https://www.npmjs.com/package/@radix-ui/react-dialog - Version source (1.1.15)
- https://www.npmjs.com/package/@radix-ui/react-visually-hidden - Version source (1.2.4)

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official docs + npm registry versions
- Architecture: HIGH - Patterns directly from Recharts/Radix documentation
- Pitfalls: MEDIUM - Derived from docs + WCAG guidance

**Research date:** 2026-02-05
**Valid until:** 2026-03-07
