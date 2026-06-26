/* ─────────────────────────────────────────────────────
   Work Experience & Education — edit here to customise
   ───────────────────────────────────────────────────── */

export type ExperienceItem = {
  id: string;
  type: "work" | "education";
  role: string; // job title or degree
  org: string; // company or university
  location: string;
  period: string; // e.g. "Jan 2023 – Present"
  current?: boolean;
  bullets: string[];
  tags?: string[];
};

export const experiences: ExperienceItem[] = [
  /* ── Work ── */
  {
    id: "codemonday-coop",
    type: "work",
    role: "Software Developer (Cooperative Education)",
    org: "Codemonday",
    location: "Bangkok, Thailand",
    period: "Nov 2025 – Feb 2026",
    bullets: [
      "Developed a full-stack loyalty platform integrated with the LINE Official Account, enabling point accumulation, reward redemption, and automated customer engagement.",
      "Implemented a configurable activity and reward management system that allowed customers to participate in campaigns and redeem loyalty points.",
      "Built a badminton court booking system integrated with LINE Official Account, supporting flexible time-slot selection, optional add-ons, and automated booking notifications.",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "LINE Official Account"],
  },

  /* ── Education ── */
  {
    id: "kmutnb-it",
    type: "education",
    role: "B.Sc. Information Technology",
    org: "King Mongkut's University of Technology North Bangkok",
    location: "Prachinburi, Thailand",
    period: "2022 – 2026",
    bullets: [
      "GPAX 3.36 — Second Class Honours.",
      "Capstone Project: Developed a full-stack loyalty platform with LINE Official Account integration, supporting point tracking, reward redemption, and configurable activity campaigns.",
    ],
    tags: ["Web Development", "AI", "Full-Stack"],
  },
  {
    id: "phanomsarakham-tvet",
    type: "education",
    role: "Certificate of Vocational Education in Electronics",
    org: "Phanomsarakham Technical College",
    location: "Chachoengsao, Thailand",
    period: "2018 – 2021",
    bullets: [
      "GPAX 3.14. Studied electronics fundamentals, circuit design, and embedded systems.",
    ],
    tags: ["Electronics", "Embedded Systems"],
  },
];
