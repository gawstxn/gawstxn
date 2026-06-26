/* ─────────────────────────────────────────────────────
   Projects data
   ───────────────────────────────────────────────────── */

export type ProjectCategory = "all" | "feature" | "others";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, "all">;
  tags: string[];
  github?: string;
  live?: string;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  all: "All Projects",
  feature: "Featured",
  others: "Others",
};

export const projects: Project[] = [
  {
    id: "okane",
    title: "Okane (おかね)",
    description:
      "A production-ready personal finance platform featuring AI-assisted transaction recording, budgeting, subscription tracking, savings goals, and financial analytics.",
    category: "feature",
    live: "https://okane.gawstxn.dev",
    tags: [
      "Next.js",
      "TypeScript",
      "Drizzle",
      "SQLite",
      "Rules based & Gemini API",
      "Framer Motion",
    ],
  },
  {
    id: "loyalty-platform",
    title: "Loyalty Platform",
    description:
      "A full-stack loyalty management platform integrated with LINE Official Account, supporting customer engagement, point accumulation, reward redemption, and configurable marketing campaigns.",
    category: "feature",
    tags: ["Next.js", "TypeScript", "LINE OA", "Prisma", "PostgreSQL"],
  },
  {
    id: "tennis-booking",
    title: "Tennis Court Booking",
    description:
      "A real-time court booking platform integrated with LINE Official Account, supporting flexible reservations, optional add-ons, and automated booking notifications.",
    category: "feature",
    tags: ["Next.js", "TypeScript", "LINE Notify", "Prisma", "PostgreSQL"],
  },
  {
    id: "cscase",
    title: "CS2 Case Simulator",
    description:
      "A CS2-inspired case opening simulator featuring weighted randomization, inventory management, case battles, trade-up contracts, a marketplace, and daily progression.",
    category: "others",
    live: "https://cscase.gawstxn.dev",
    github: "https://github.com/gawstxn/cs-case",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
];
