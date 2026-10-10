# Portfolio development

The portfolio uses Astro, Tailwind CSS v4, strict TypeScript, GSAP, and Lenis. `README.md` remains the original GitHub profile README.

## Run locally

Use Node.js 22.14 or newer and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` runs Astro/TypeScript checks before generating `dist/`. There is no separate lint or unit-test script.

## Edit content

- `src/data/profile.ts`: name, role, company, availability, biography, contact, and links.
- `src/data/experience.ts`: work history, education, dates, and tools used at work.
- `src/data/projects.ts`: projects, descriptions, links, and artwork.
- `src/data/skills.ts`: toolkit categories, descriptions, and technologies.
- `src/data/site.ts`: intro, smooth scroll, motion, cursor, scroll scenes, noise, and scrollbar switches.
- `src/pages/index.astro`: metadata and section composition.
- `src/components/`: section layouts and project interface concepts.
- `src/styles/global.css`: design tokens, responsive layouts, and reduced motion.
- `src/scripts/`: motion, navigation, project dialogs, image carousel, and toolkit tabs.

The portrait and resume are original assets. Tookbaht uses its public English preview. Loyalty and Court Booking are clearly labeled interface concepts with sample data. Keep `public/github.png` because the original profile README references it.

## Deployment

`astro.config.mjs` sets the canonical site URL. `vercel.json` selects the Astro framework and serves the static `dist/` build, overriding the previous Next.js preset. The former `/projects` URL redirects to the selected work section. `public/robots.txt` and `public/sitemap.xml` retain crawler entry points.

Astro and the `unifont` override are pinned for the existing Node.js 22.14 environment. Review the override when upgrading dependencies or Node.js.

Local artifacts, dependencies, generated output, secret files, and hosting metadata must not be committed. See `DESIGN.md` for visual and motion decisions.
