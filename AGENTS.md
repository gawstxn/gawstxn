# Portfolio agent notes

## Stack and layout

- Astro, TypeScript in strict mode, Tailwind CSS v4, GSAP, and Lenis.
- `src/pages/index.astro` composes the single-page portfolio.
- `src/components/` contains section components and project artwork.
- `src/data/` contains profile, experience, projects, tools, and appearance settings.
- `src/styles/global.css` contains Tailwind theme tokens and responsive styles.
- `src/scripts/` contains navigation, project dialogs, carousel, toolkit, and motion.
- `public/` contains the original portrait, resume, and public preview assets.
- `README.md` is the GitHub profile README. Preserve it and `public/github.png`.
- `DEVELOPMENT.md` contains development and editing instructions.

## Conventions

- Use the existing npm lockfile. Ask before adding dependencies.
- Respond in Thai; write code, comments, and commit messages in English.
- Keep factual content in data files and respect the owner's confirmed information.
- Honor reduced motion, keyboard access, and motion switches in `src/data/site.ts`.
- Project artwork labeled as interface concepts uses sample data; do not claim it is a production screenshot.
- Keep `README.md` unchanged unless the owner explicitly requests an edit.
- Never read or commit secrets. Ignore generated files and hosting metadata.
- Never commit or push unless explicitly requested. Create a feature or fix branch before edits.
- Do not force-push, rewrite history, disable hooks, or change Git configuration.

## Verification

- Run `npm run build` for Astro/TypeScript diagnostics and the production build.
- Run `npm run typecheck` when only checking types.
- No separate lint or unit-test script is currently configured.
- Verify interactions in the browser when changing UI behavior, including mobile layouts.
- Report changed files, verification, and any remaining limitations.
