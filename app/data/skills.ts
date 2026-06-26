/* ─────────────────────────────────────────────────────
   Tech skills — edit here to customise
   ───────────────────────────────────────────────────── */

export const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python"],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: ["React.js", "Next.js", "Astro", "Tailwind CSS", "Shadcn/ui"],
  },
  {
    id: "backend",
    title: "Backend",
    skills: ["Nest.js", "Express.js", "Hono", "FastAPI"],
  },
  {
    id: "database",
    title: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  },
  {
    id: "ai-integration",
    title: "AI & Integrations",
    skills: ["Gemini API", "LINE Messaging API", "Workflow Automation"],
  },
  {
    id: "tools",
    title: "Tools",
    skills: ["Git", "GitHub", "Docker"],
  },
] as const;

/* Edit this list to update the "Currently Learning" banner */
export const currentlyLearning = ["Go", "Gin", "GORM", "Websocket"] as const;
