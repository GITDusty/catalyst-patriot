# Codebase Structure

**Analysis Date:** 2026-02-05

## Directory Layout

```
catalyst-patriot/
├── app/                    # Next.js App Router - all routes and layouts
│   ├── layout.tsx         # Root layout component wrapping all pages
│   ├── page.tsx           # Home page component (/ route)
│   ├── globals.css        # Global styles and CSS variables
│   └── favicon.ico        # Site favicon
├── public/                # Static assets served directly
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .planning/             # GSD planning and analysis documents
│   └── codebase/         # Codebase analysis docs
├── .next/                # Next.js build output (generated)
├── node_modules/         # Installed dependencies (generated)
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript compiler configuration
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Locked dependency versions
├── postcss.config.mjs    # PostCSS configuration for Tailwind
├── eslint.config.mjs     # ESLint configuration
└── README.md             # Project documentation
```

## Directory Purposes

**`app/` - Next.js App Router Directory:**
- Purpose: Contains all application routes, layouts, and page components
- Contains: React components (`.tsx`), CSS stylesheets (`.css`), static assets specific to routes
- Key files: `layout.tsx` (root layout), `page.tsx` (home page), `globals.css` (global styles)
- Structure: File names map to URL routes (e.g., `app/page.tsx` → `/`, `app/about/page.tsx` → `/about`)

**`public/` - Static Assets:**
- Purpose: Serves static files (images, SVGs, fonts) directly without processing
- Contains: SVG icons and static assets
- Accessed via: `/` root in URLs (e.g., `/file.svg`)
- Not committed to version control: No (static assets should be committed)

**`.planning/codebase/` - Analysis Documents:**
- Purpose: Stores GSD codebase analysis and planning documents
- Contains: Architecture, structure, conventions, testing patterns, and concerns documentation
- Generated: Yes (by GSD analyzer)
- Committed: Yes (to support GSD planning)

**`.next/` - Build Output:**
- Purpose: Generated Next.js build output and compiled code
- Contains: Compiled JavaScript, type definitions, build artifacts
- Generated: Yes (by `next build` or `next dev`)
- Committed: No (should be in `.gitignore`)

**`node_modules/` - Dependencies:**
- Purpose: Installed npm packages
- Generated: Yes (by `npm install`)
- Committed: No (should be in `.gitignore`)

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout component - wraps all routes with HTML structure and metadata
- `app/page.tsx`: Home page component - renders content for `/` route
- `next.config.ts`: Next.js server configuration - defines build and runtime settings

**Configuration:**
- `tsconfig.json`: TypeScript compiler options and module resolution
- `package.json`: Dependencies, scripts, and project metadata
- `postcss.config.mjs`: PostCSS plugins (Tailwind CSS)
- `eslint.config.mjs`: Linting rules and code quality standards

**Core Logic:**
- `app/layout.tsx`: Root layout with font loading and metadata
- `app/page.tsx`: Home page logic and JSX
- `app/globals.css`: Global styles and design tokens

**Testing:**
- Not yet implemented (no test files present)

## Naming Conventions

**Files:**
- PascalCase for React component files: `Layout`, `Page` (implicit from `layout.tsx`, `page.tsx`)
- kebab-case for static files: `next.svg`, `file.svg`
- UPPERCASE.md for documentation: `README.md`
- `.config.` for configuration files: `next.config.ts`, `postcss.config.mjs`
- lowercase for compiled output: `.next/`

**Directories:**
- lowercase for route segments: `app/`, `public/`
- PascalCase for feature directories (future pattern when routes added): e.g., `app/Dashboard/`
- dot-prefix for special Next.js directories: `.next/`, `.git/`, `.planning/`

**React Components:**
- Default exports for page and layout components: `export default function Layout()`, `export default function Home()`
- TypeScript types for props: `React.ReactNode`, `Readonly<{}>` for immutable props

**TypeScript Path Aliases:**
- `@/*` maps to project root: Allows `import { x } from '@/utils'` instead of relative paths
- Currently minimal usage due to small codebase

## Where to Add New Code

**New Feature/Page:**
- Primary code: Create `app/[feature]/page.tsx` for the page component
- Styles: Add CSS module `app/[feature]/[feature].module.css` or use inline Tailwind classes
- Layout: If feature needs unique layout, create `app/[feature]/layout.tsx`

**New Component/Module:**
- Implementation: Create directory `app/components/` for reusable components
- Example: `app/components/Button/Button.tsx` for a button component
- Styles: Co-locate styles with component or use Tailwind classes in JSX

**Utilities:**
- Shared helpers: Create `app/utils/` directory
- Example: `app/utils/formatting.ts` for string formatting utilities
- Common patterns: Create `app/lib/` for library code (database connections, API clients, etc.)

**Styling:**
- Global styles: Add rules to `app/globals.css`
- Component-scoped styles: Use Tailwind class names directly in JSX (preferred)
- CSS modules: Create `[Component].module.css` if isolated styling needed

**API Routes:**
- Server routes: Create `app/api/[route]/route.ts` following Next.js API Routes pattern
- Example: `app/api/users/route.ts` for `/api/users` endpoint

## Special Directories

**`.next/` - Next.js Build Output:**
- Purpose: Contains compiled code from `next build` command
- Generated: Yes (automatically created)
- Committed: No (add to `.gitignore`)
- When to clear: If build artifacts become corrupted, run `rm -rf .next` and rebuild

**`node_modules/` - Installed Packages:**
- Purpose: npm-installed dependencies
- Generated: Yes (by `npm install`)
- Committed: No (excluded via `.gitignore`)
- When to update: Run `npm install` to sync with `package-lock.json`

**`.planning/` - GSD Analysis Directory:**
- Purpose: Planning documents generated by GSD tools
- Contains: Codebase analysis (ARCHITECTURE.md, STRUCTURE.md, etc.)
- Generated: Yes (by GSD mappers)
- Committed: Yes (helps other GSD commands during planning)

---

*Structure analysis: 2026-02-05*
