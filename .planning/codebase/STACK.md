# Technology Stack

**Analysis Date:** 2026-02-05

## Languages

**Primary:**
- TypeScript 5.x - All source files in `app/` directory
- JavaScript (ESM) - Configuration files

**Secondary:**
- CSS - Styling via Tailwind (see `app/globals.css`)

## Runtime

**Environment:**
- Node.js (version specified in package.json constraints)

**Package Manager:**
- npm (version 10.x implied by package-lock.json structure)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework with App Router
  - Location: `app/` directory uses Next.js 16 App Router
  - Features: Built-in routing, server components, API routes
  - Fonts: Google Fonts via `next/font/google` (Geist fonts loaded in `app/layout.tsx`)

**UI & Styling:**
- React 19.2.3 - UI component library
- React DOM 19.2.3 - React rendering for web
- Tailwind CSS 4.x - Utility-first CSS framework
  - PostCSS 4 integration via `@tailwindcss/postcss`
  - Config: `postcss.config.mjs`
  - Styling: `app/globals.css` with theme variables

**Linting & Code Quality:**
- ESLint 9.x - JavaScript/TypeScript linting
  - Config: `eslint.config.mjs` (flat config format)
  - Extends: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
  - Ignored: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

**Build & Development:**
- Next.js 16.1.6 - Handles bundling, transpilation, and dev server
- TypeScript 5.x - Compilation and type checking
- PostCSS 4.x - CSS processing pipeline

## Key Dependencies

**Critical:**
- `next@16.1.6` - Full-stack framework with App Router, TypeScript support, and production optimizations
- `react@19.2.3` - React library for component rendering
- `react-dom@19.2.3` - DOM rendering for React components
- `typescript@5` - Static type checking and compilation

**Infrastructure & Build:**
- `@tailwindcss/postcss@^4` - Tailwind CSS PostCSS plugin
- `tailwindcss@^4` - Utility-first CSS framework
- `@types/node@^20` - TypeScript types for Node.js APIs
- `@types/react@^19` - TypeScript definitions for React 19
- `@types/react-dom@^19` - TypeScript definitions for React DOM 19
- `eslint-config-next@16.1.6` - Next.js ESLint configuration with Core Web Vitals
- `eslint@^9` - JavaScript/TypeScript linter

## Configuration

**Environment:**
- No `.env*` files detected in repository root
- Environment variables may be configured via:
  - `.env.local` (local development, not committed)
  - `.env.production` (production settings)
  - System environment variables

**Build:**
- `next.config.ts` - Next.js configuration (currently empty/defaults only)
- `tsconfig.json` - TypeScript compiler options with path aliases
  - Base target: ES2017
  - Path alias: `@/*` maps to project root for imports
  - Plugin: Next.js TypeScript plugin for type checking
- `postcss.config.mjs` - PostCSS configuration with Tailwind
- `eslint.config.mjs` - ESLint flat config with Next.js presets

## Platform Requirements

**Development:**
- Node.js (modern LTS or higher recommended)
- npm (v8+)
- TypeScript compiler support
- Git for version control

**Production:**
- Vercel (recommended deployment platform per README)
  - Node.js 18+ runtime
  - Support for serverless functions (API routes)
  - Automatic environment variable management
- Alternative: Any Node.js 18+ hosting with npm support

## Build & Runtime Commands

**Development:**
```bash
npm run dev        # Start Next.js dev server on http://localhost:3000
```

**Production:**
```bash
npm run build      # Build optimized production bundle
npm start          # Run production server
```

**Code Quality:**
```bash
npm run lint       # Run ESLint on all files
```

## Notable Configurations

**TypeScript Path Aliases:**
- `@/*` - Resolves to project root, allowing clean imports like `@/app/layout`

**Tailwind Inline Theme:**
- CSS custom properties defined in `app/globals.css`
- Theme colors: `--color-background`, `--color-foreground`
- Font families: `--font-sans` (Geist), `--font-mono` (Geist Mono)
- Dark mode support via `@media (prefers-color-scheme: dark)`

---

*Stack analysis: 2026-02-05*
