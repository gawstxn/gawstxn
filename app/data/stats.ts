/* ─────────────────────────────────────────────────────
   Stats & Engineering Philosophy
   ───────────────────────────────────────────────────── */

export const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "10+", label: "Projects Completed" },
  { value: "∞", label: "Cups of Coffee" },
  { value: "100%", label: "Delivery Rate" },
] as const;

export const philosophies = [
  {
    id: "quality",
    lucideIcon: "Code2",
    title: "Quality Over Speed",
    description:
      "Rushing code creates technical debt. I prioritize writing clean, readable, and maintainable TypeScript that teammates can build on confidently.",
  },
  {
    id: "reliability",
    lucideIcon: "ShieldCheck",
    title: "Reliability Through Testing",
    description:
      "Software that isn't tested isn't finished. Thoughtful testing — from unit to E2E — is what separates a working product from a trustworthy one.",
  },
  {
    id: "growth",
    lucideIcon: "TrendingUp",
    title: "Always Learning",
    description:
      "The frontend ecosystem moves fast. I stay curious, pick up new tools deliberately, and apply what I learn to ship better experiences with every project.",
  },
] as const;
