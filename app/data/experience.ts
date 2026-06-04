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
      "Built a full-stack Loyalty Platform integrated with LINE Official Account, supporting point accumulation, reward redemption, and automated customer interactions.",
      "Implemented a customizable activity system within the Loyalty Platform, allowing customers to participate in activities to earn points and redeem rewards.",
      "Built a LINE OA–integrated badminton court booking system with flexible time selection, optional add-ons, and automated booking notifications.",
    ],
    tags: ["Next.js", "TypeScript", "Node.js", "LINE OA", "PostgreSQL"],
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
      "Senior capstone: Loyalty Program web app with LINE OA integration, point tracking, reward redemption, and activity system.",
    ],
    tags: ["Frontend", "Web Dev", "AI Minor"],
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
