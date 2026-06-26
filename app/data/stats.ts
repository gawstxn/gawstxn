/* ─────────────────────────────────────────────────────
   Stats & Engineering Philosophy
   ───────────────────────────────────────────────────── */

export const stats = [
  { value: "15+", label: "Projects Built" },
  { value: "10+", label: "Technologies" },
  { value: "4+", label: "Year of Coding" },
  { value: "100%", label: "Commitment" },
] as const;

export const philosophies = [
  {
    id: "quality",
    lucideIcon: "Code2",
    title: "Quality Over Speed",
    description:
      "I value maintainable, readable, and scalable code over quick fixes. Building software that others can confidently extend is more important than shipping fast.",
  },
  {
    id: "reliability",
    lucideIcon: "ShieldCheck",
    title: "Reliability Through Testing",
    description:
      "Reliable software comes from thoughtful testing and continuous improvement. Every feature should be stable before it reaches users.",
  },
  {
    id: "growth",
    lucideIcon: "TrendingUp",
    title: "Always Learning",
    description:
      "Technology evolves rapidly. I continuously explore new tools, frameworks, and best practices to become a better software engineer.",
  },
] as const;
