# Coding Conventions

**Analysis Date:** 2026-02-05

## Naming Patterns

**Files:**
- React/Next.js components: Use `.tsx` extension for TypeScript components
- Configuration files: Use `.ts` or `.mjs` extensions
- Examples: `layout.tsx`, `page.tsx`, `next.config.ts`, `eslint.config.mjs`

**Functions:**
- Use camelCase for function names
- Example from `app/layout.tsx`: `geistSans`, `geistMono`, `RootLayout` (PascalCase for React components)
- React component names use PascalCase (e.g., `RootLayout`, `Home`)

**Variables:**
- Use camelCase for variable declarations
- Examples: `geistSans`, `geistMono`, `metadata`, `children`
- Constants use camelCase (not UPPER_SNAKE_CASE)
- Example: `const nextConfig: NextConfig = {...}`

**Types:**
- Use PascalCase for TypeScript type names and interfaces
- Examples: `Metadata`, `NextConfig`, `Readonly`
- Generic types and type aliases follow PascalCase
- Type imports use explicit import syntax: `import type { Metadata } from "next"`

## Code Style

**Formatting:**
- No Prettier configuration file detected
- ESLint handles all linting
- Code uses consistent spacing and indentation (observed in `app/layout.tsx` and `app/page.tsx`)

**Linting:**
- ESLint 9 with Next.js integration
- Config file: `eslint.config.mjs`
- Uses `eslint-config-next/core-web-vitals` for best practices
- Uses `eslint-config-next/typescript` for TypeScript-specific rules
- Ignored directories: `.next`, `out`, `build`, `next-env.d.ts`
- Run with: `npm run lint`

**Key ESLint Rules Applied:**
- Core Web Vitals compliance
- TypeScript-specific linting via `@typescript-eslint`
- Next.js best practices and conventions

## Import Organization

**Order:**
1. External framework/library imports (React, Next.js)
2. Type imports (use explicit `import type` syntax)
3. Local relative imports
4. CSS/style imports (at end)

**Examples from codebase:**
```typescript
// From app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
```

**Path Aliases:**
- Root alias configured: `@/*` maps to `./*` (project root)
- Defined in `tsconfig.json` under `compilerOptions.paths`
- Currently not heavily used in minimal codebase

## Error Handling

**Patterns:**
- No explicit error handling patterns observed in current minimal codebase
- Component boundaries exist but minimal complexity
- Next.js default error boundaries apply for React errors

## Logging

**Framework:** Browser `console` object for client-side logging (if needed)

**Patterns:**
- No console logging observed in current source files
- Would use standard `console.log()`, `console.error()`, etc. if needed
- Server-side functions (if added) should use appropriate Node.js logging

## Comments

**When to Comment:**
- Document complex logic or non-obvious implementations
- Explain "why" rather than "what" (code should be self-documenting)
- No extensive comments observed in minimal codebase

**JSDoc/TSDoc:**
- Use TypeScript's built-in type system for documentation
- Add JSDoc comments for public-facing functions if needed
- Example: Type annotations on React props serve as inline documentation

## Function Design

**Size:** Keep functions focused and small

**Parameters:**
- Use destructuring for props, especially in React components
- Example from `app/layout.tsx`:
```typescript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Implementation
}
```

**Return Values:**
- React components return JSX
- Use explicit return types with TypeScript

## Module Design

**Exports:**
- Use `export default` for main component exports
- Example: `export default function Home() { ... }`
- Named exports for utilities or multi-export modules

**Barrel Files:**
- Not currently used in minimal codebase
- Would be appropriate for future feature directories

## TypeScript Strictness

**Compiler Options:**
- Strict mode enabled: `"strict": true`
- Type checking enforced across all files
- JSX mode: `react-jsx` (modern React 17+ JSX transform)
- Module resolution: `bundler` for Next.js optimization
- `skipLibCheck: true` allows faster builds with type definitions

**Type Patterns:**
- All components should have explicit type annotations
- Use `React.ReactNode` or specific types for children
- Use `type` keyword for type imports (not runtime imports)
- Example: `import type { Metadata } from "next"`

---

*Convention analysis: 2026-02-05*
