<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Portfolio-Specific Agent Notes

## Stack
- **Next.js 16.2.6** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS v4**
- No `tailwind.config.js` — all theme tokens are in `app/globals.css` inside `@theme inline { ... }`
- `@import "tailwindcss"` is the v4 way; do NOT use `@tailwind base/components/utilities`

## File Structure
```
app/
  layout.tsx          ← Root layout (html + body tags, fonts, metadata)
  page.tsx            ← Assembles all section components
  globals.css         ← Tailwind v4 entry + custom design tokens + keyframes
  data/
    portfolio.ts      ← All demo content (personalInfo, projects, skills, stats)
  components/
    Navbar.tsx        ← 'use client' — sticky nav, IntersectionObserver active links
    HeroSection.tsx   ← 'use client' — terminal boot animation + hero copy
    AboutSection.tsx  ← Server component — stats, bio, philosophy cards
    ProjectsSection.tsx ← 'use client' — filterable project card grid
    SkillsSection.tsx ← Server component — 4-column skill matrix
    ContactSection.tsx  ← Server component — email, socials
    Footer.tsx        ← 'use client' — copyright, scroll-to-top
    RevealWrapper.tsx ← 'use client' — IntersectionObserver scroll reveal
```

## Design System (Tailwind v4)
Custom tokens defined in `globals.css` via `@theme inline`:
- `text-accent` / `bg-accent` → `#00ff88` neon green
- `font-mono` → JetBrains Mono (var `--font-jetbrains`)
- `font-sans` → Inter (var `--font-inter`)
- `animate-blink` → terminal cursor blinking keyframe
- `animate-fade-up`, `animate-fade-in`, `animate-slide-right`
- CSS class `.bg-grid` → subtle dot grid background
- CSS class `.card-hover` → border + glow hover transition
- CSS class `.reveal` / `.reveal.visible` → scroll reveal transition
- CSS class `.text-glow` → neon text-shadow
- CSS class `.accent-glow` → neon box-shadow

## Key Conventions
- `'use client'` required for any component using hooks (useState, useEffect, useRef) or browser APIs
- Scroll reveal: wrap sections in `<RevealWrapper>`, which adds `.visible` class via IntersectionObserver
- All content lives in `app/data/portfolio.ts` — edit there to customize
- Section IDs: `#home`, `#about`, `#projects`, `#skills`, `#contact`
- Section numbering in labels: `01 // HOME`, `02 // ABOUT`, etc.

## Next.js 16 Gotchas
- `params` in dynamic routes is now a **Promise** — must `await params` or use `React.use(params)`
- Layouts do NOT re-render on navigation — use `usePathname()` in a Client Component for active states
- No manual `<head>` tags — use the `metadata` export or `generateMetadata()`
- `next/font/google` function call API is unchanged from v13+ (Geist, Inter, JetBrains_Mono etc.)
