---
phase: quick
plan: 001
type: execute
wave: 1
depends_on: []
files_modified: [app/act/page.tsx]
autonomous: true

must_haves:
  truths:
    - "User scrolls through 7 full-viewport snap slides on /act"
    - "User sees hero with CATALYST USA branding, tagline, and CTA button"
    - "User sees Three Pillars with glass-morphism cards and SVG icons"
    - "User sees Issues Tracker with LIVE links to /social-security and /compare, and COMING SOON badges for Housing and Tax Reform"
    - "User can fill out waitlist form with name, email, location, issue dropdown, and action checkboxes"
    - "Form submission saves to localStorage and shows success state with amber star"
    - "User can copy shareable text and share via Twitter/Facebook/LinkedIn/Email buttons"
    - "Footer slide shows Catalyst USA branding with navigation links"
  artifacts:
    - path: "app/act/page.tsx"
      provides: "Complete 7-slide activism page"
      min_lines: 300
  key_links:
    - from: "app/act/page.tsx"
      to: "/social-security"
      via: "Next.js Link in Issues Tracker"
      pattern: "Link.*href.*social-security"
    - from: "app/act/page.tsx"
      to: "/compare"
      via: "Next.js Link in Issues Tracker"
      pattern: "Link.*href.*compare"
    - from: "app/act/page.tsx"
      to: "localStorage"
      via: "form submit handler"
      pattern: "localStorage\\.setItem"
---

<objective>
Completely rewrite app/act/page.tsx from the current 4-slide placeholder into a polished 7-slide Activism & Civic Engagement page following the Prism Data Feed design language (black background, amber/gold accent, scroll-snap, glass-morphism).

Purpose: This is the primary call-to-action and community-building page for Catalyst USA -- the page where visitors convert into engaged citizens.

Output: A single fully rewritten file at app/act/page.tsx with all 7 slides, waitlist form with localStorage persistence, share tools, and responsive design.
</objective>

<execution_context>
@/Users/dustanbruggeman/.claude/get-shit-done/workflows/execute-plan.md
@/Users/dustanbruggeman/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@app/act/page.tsx (current file to be COMPLETELY REWRITTEN)
@app/social-security/page.tsx (reference for Prism Data Feed design patterns: ScrollIndicator, slide structure, snap behavior, amber accent palette)
@app/layout.tsx (nav already includes /act link, Footer component is separate)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rewrite app/act/page.tsx with all 7 slides</name>
  <files>app/act/page.tsx</files>
  <action>
Completely replace the contents of app/act/page.tsx with a "use client" component implementing 7 full-viewport scroll-snap slides. Use the same ScrollIndicator pattern from social-security/page.tsx. Use Next.js Link for internal navigation and standard anchor tags with target="_blank" rel="noopener noreferrer" for external links.

**Root container:** `bg-black text-white snap-y snap-mandatory h-screen overflow-y-auto`

**Slide 1 - Hero:**
- Diagonal line + amber dot SVG motif (same pattern as social-security hero)
- "CATALYST USA" in amber-500, xs, font-semibold, tracking-[0.3em], uppercase
- Main heading: "This isn't about left or right." (text-4xl sm:text-5xl md:text-6xl font-bold)
- Subheading: "It's about what's right." (text-2xl sm:text-3xl text-amber-500 font-bold)
- Body text about building a movement of citizens
- CTA button: "SEE WHAT WE STAND FOR" with amber border, NOT filled. Style: `border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold px-8 py-4 rounded-xl transition-all text-sm tracking-[0.15em]`. This button scrolls to the next slide (use scrollIntoView or an anchor).
- ScrollIndicator at bottom

**Slide 2 - Three Pillars:**
- Section heading: "What We Stand For"
- 3 cards in horizontal grid (md:grid-cols-3), stacking on mobile
- Card style: `bg-white/5 border border-white/10 border-t-2 border-t-amber-500 rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300`
- Card 1: Radical Transparency - SVG chart/bar-chart icon (simple inline SVG, NOT emoji), amber-500 color, 32x32. Description: "Every dollar tracked. Every source verified. No spin. No agenda."
- Card 2: Civic Action - SVG lightning bolt icon, amber-500, 32x32. Description: "We don't just show you the data -- we help you act on it."
- Card 3: Nonpartisan Accountability - SVG shield icon, amber-500, 32x32. Description: "Not left. Not right. Just facts, transparency, and the courage to demand better."
- ScrollIndicator at bottom

**Slide 3 - Issues Tracker:**
- Heading: "Issues We're Tracking"
- 2x2 grid (md:grid-cols-2) of issue cards
- Each card: same glass-morphism card style as pillars but without amber top border. Include the issue name, a short description, and a status badge.
- LIVE issues (use Next.js Link wrapping the entire card):
  - Social Security Crisis -> /social-security. Badge: `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2 py-0.5 rounded-full` with text "LIVE"
  - State Budget Transparency -> /compare. Same LIVE badge.
- COMING SOON issues (these are NOT links, just styled cards):
  - Housing Affordability Crisis. Badge: `bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2 py-0.5 rounded-full` with text "COMING SOON". On click, smooth-scroll to the waitlist slide.
  - Tax Reform. Same COMING SOON badge + scroll behavior.
- ScrollIndicator at bottom

**Slide 4 - Impact Counter:**
- Heading: "By The Numbers"
- 4 stat boxes in a grid (grid-cols-2 md:grid-cols-4), each with border border-white/5 rounded-xl p-6 text-center
- Stats: "2" (States Tracked), "12+" (Verified Sources), "21" (Data Points Verified), "100%" (Open Source)
- Stat values in `text-5xl font-bold text-amber-500`
- Labels in `text-gray-400 text-sm mt-2`
- Below the grid, a quote block with amber-500/20 border and amber-500/5 bg:
  "We believe citizens deserve to see exactly where their money goes -- and have the tools to do something about it."
- ScrollIndicator at bottom

**Slide 5 - Waitlist Form (id="waitlist" for scroll targeting):**
- Heading: "Join the Movement"
- Subheading: "Be the first to know when new issues launch."
- Use React useState for form state. Fields:
  - firstName (text input, placeholder "First Name")
  - email (email input, placeholder "Email Address", required)
  - location (text input, placeholder "City, State (optional)")
  - issueInterest (select dropdown with placeholder "What issue matters most to you?" and 6 options: Social Security Reform, Housing Affordability, Government Spending Transparency, Tax Reform, Healthcare Costs, Other)
  - 4 checkboxes for action preferences: "Notify me when new data drops", "I want to share this with others", "I'd contact my representative", "I want to volunteer"
- Input style: `w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all text-base`
- Select style: same as input, plus `bg-black` on options
- Checkbox style: custom with `accent-amber-500`
- Submit button: `w-full bg-amber-500 text-black font-bold py-4 rounded-xl hover:bg-amber-400 transition-all text-lg tracking-wide`
- On submit: preventDefault, save form data to localStorage key "catalyst-waitlist" as JSON, set submitted=true
- Success state: amber star SVG (5-pointed star, filled amber-500, ~48px), "You're in." in text-2xl font-bold text-amber-500, welcome message, then 2 CTA links: "Explore Social Security Data" -> /social-security, "Compare State Budgets" -> /compare
- Below form: "No spam. No politics. Just data-driven action." in gray-600 text-xs
- ScrollIndicator at bottom

**Slide 6 - Share Tools:**
- Heading: "Spread the Word"
- Shareable text block (displayed in a bg-white/5 border border-white/10 rounded-xl p-6): "Did you know Social Security started with 222,000 people and now serves 72.9 million -- with only 2.5 workers per beneficiary? The math doesn't work. See the data: https://catalystpatriot.com/social-security"
- Copy button: "Copy to Clipboard" with clipboard SVG icon. On click, copy the text to navigator.clipboard, show "Copied!" feedback for 2 seconds using useState.
- 4 share buttons in a row (flex-wrap on mobile):
  - Twitter/X: opens `https://twitter.com/intent/tweet?text=...&url=https://catalystpatriot.com/social-security` in new tab
  - Facebook: opens `https://www.facebook.com/sharer/sharer.php?u=https://catalystpatriot.com/social-security` in new tab
  - LinkedIn: opens `https://www.linkedin.com/sharing/share-offsite/?url=https://catalystpatriot.com/social-security` in new tab
  - Email: opens `mailto:?subject=...&body=...` with URL-encoded subject "Check out this Social Security data" and body with the shareable text
- Share button style: `border border-white/10 rounded-xl px-6 py-3 text-gray-300 hover:bg-white/5 hover:border-white/20 transition-all`
- ScrollIndicator at bottom

**Slide 7 - Footer Slide:**
- Amber 5-pointed star SVG (filled, ~32px) centered at top
- "CATALYST USA" in amber-500, xs, tracking-[0.3em], uppercase, font-semibold
- Tagline: "Civic intelligence for the people."
- EXPLORE THE DATA section with 4 links (using Next.js Link): Florida -> /florida, Illinois -> /illinois, Compare States -> /compare, Social Security -> /social-security
- COMING SOON section: Housing Affordability, Tax Reform, Healthcare Costs (plain text, gray-600)
- Copyright: current year, Catalyst USA. All rights reserved. Open source.
- No ScrollIndicator on last slide

**State management (all via useState):**
- submitted: boolean (form submission state)
- copied: boolean (clipboard feedback)
- Form field values: firstName, email, location, issueInterest, and an actions object with 4 boolean fields

**Important implementation notes:**
- Do NOT import or use Recharts -- this page has no charts
- Do NOT use emoji characters for icons -- use simple inline SVGs
- All SVG icons should be simple, clean, 24-32px, stroke or fill in amber-500
- Ensure mobile responsiveness: grids collapse, cards stack, form is full-width on small screens
- The "COMING SOON" issue cards in slide 3 should use button elements (not Link) that call scrollIntoView on the waitlist section
  </action>
  <verify>
Run `npm run build` and confirm no TypeScript or build errors. Then run `npm run dev` and visit http://localhost:3000/act to verify:
1. All 7 slides render with scroll-snap behavior
2. Hero shows CATALYST USA branding and CTA button
3. Three Pillars cards display with SVG icons and glass-morphism styling
4. Issues Tracker shows 2 LIVE (linked) and 2 COMING SOON cards
5. Form accepts input, submits to localStorage, shows success state
6. Share tools copy text and open share URLs
7. Footer slide shows branding and navigation links
8. Mobile responsive (resize browser to confirm stacking)
  </verify>
  <done>
app/act/page.tsx contains a complete 7-slide page that builds without errors, all slides render with proper scroll-snap, form persists to localStorage, share tools function correctly, and the page is responsive on mobile viewports.
  </done>
</task>

</tasks>

<verification>
- `npm run build` completes with zero errors
- All 7 slides visible and scroll-snap working at /act
- LIVE issue cards navigate to /social-security and /compare
- COMING SOON cards scroll to waitlist
- Form submission saves to localStorage (check via DevTools > Application > Local Storage)
- Copy button copies text and shows "Copied!" feedback
- Share buttons open correct URLs in new tabs
- Page is responsive (cards/form stack on mobile)
</verification>

<success_criteria>
- Single file modified: app/act/page.tsx
- 7 full-viewport scroll-snap slides rendering correctly
- Waitlist form with localStorage persistence and success state
- Share tools with clipboard copy and social media links
- All internal links use Next.js Link component
- All external links open in new tabs
- Zero build errors
</success_criteria>

<output>
After completion, create `.planning/quick/001-act-civic-engagement-page/001-SUMMARY.md`
</output>
