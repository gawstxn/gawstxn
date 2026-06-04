/* ─────────────────────────────────────────────────────
   Tech skills — edit here to customise
   ───────────────────────────────────────────────────── */

export const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    skills: ["JavaScript", "TypeScript"],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: ["React.js", "Next.js", "Astro", "Tailwind CSS", "Shadcn/ui"],
  },
  {
    id: "backend",
    title: "Backend & ORM",
    skills: ["Node.js", "Express.js", "Hono", "Prisma", "Sequelize", "Drizzle"],
  },
  {
    id: "database",
    title: "Database & Tools",
    skills: ["PostgreSQL", "MongoDB", "Supabase", "SQLite", "Git", "GitHub"],
  },
] as const;

/* Edit this list to update the "Currently Learning" banner */
export const currentlyLearning = [
  "Playwright",
  "Automated Testing",
  "Nest.js",
  "WebSockets",
] as const;
