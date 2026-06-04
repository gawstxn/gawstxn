/* ─────────────────────────────────────────────────────
   Projects data
   ───────────────────────────────────────────────────── */

export type ProjectCategory = "all" | "web" | "ai";

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
  web: "Web Apps",
  ai: "AI & ML",
};

export const projects: Project[] = [
  {
    id: "okane",
    title: "Okane (おかね)",
    description:
      "A premium personal finance management web application inspired by Zen simplicity and the Japanese Kakeibo budgeting method.",
    category: "ai",
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
      "A full-stack loyalty platform integrated with the LINE Official Account API, featuring member point management, reward redemption flows, and automated notifications.",
    category: "web",
    tags: ["Next.js", "TypeScript", "LINE OA", "Prisma", "PostgreSQL"],
  },
  {
    id: "tennis-booking",
    title: "Tennis Court Booking",
    description:
      "A web-based court booking application with real-time availability scheduling and automated LINE notifications.",
    category: "web",
    tags: ["Next.js", "TypeScript", "LINE Notify", "Prisma", "PostgreSQL"],
  },
  // {
  //   id: "rag-docs",
  //   title: "Vector Docs RAG",
  //   description:
  //     "Automated PDF parser and document Q&A engine using retrieval-augmented generation with semantic vector embeddings and re-ranking.",
  //   category: "ai",
  //   tags: ["LangChain", "OpenAI", "pgvector", "FastAPI", "Next.js"],
  //   // github: "https://github.com",
  // },
  // {
  //   id: "btc-predictor",
  //   title: "BTC ML Predictor",
  //   description:
  //     "Multi-model ensemble pricing predictor with LSTM + XGBoost + Random Forest trained on 12 years of historical data achieving 87% accuracy.",
  //   category: "ai",
  //   tags: ["PyTorch", "XGBoost", "Python", "NumPy", "Pandas"],
  //   github: "https://github.com",
  // },
  // {
  //   id: "pose-game",
  //   title: "Pose Detection Game",
  //   description:
  //     "Real-time pose-controlled game using webcam input with YOLOv8 running at 30+ FPS with wrist-trajectory slashing detection.",
  //   category: "cv",
  //   tags: ["YOLOv8", "Python", "OpenCV", "WebSocket", "Canvas"],
  //   github: "https://github.com",
  //   live: "https://example.com",
  // },
  // {
  //   id: "algo-trade",
  //   title: "AlgoTrade Console",
  //   description:
  //     "Automated algorithmic paper-trading platform with technical indicator calculations, Alpaca API integration, and real-time Telegram alerts.",
  //   category: "systems",
  //   tags: ["Python", "Alpaca API", "React", "Zustand", "Vercel Cron"],
  //   github: "https://github.com",
  // },
  // {
  //   id: "gis-dashboard",
  //   title: "GIS Analytics Dashboard",
  //   description:
  //     "Interactive geographic dashboard displaying real-time terminal metrics across Thailand with device monitoring and live map overlays.",
  //   category: "systems",
  //   tags: ["FastAPI", "Leaflet.js", "PostgreSQL", "Chart.js", "Python"],
  //   github: "https://github.com",
  //   live: "https://example.com",
  // },
  // {
  //   id: "kafka-connector",
  //   title: "Kafka-to-API Connector",
  //   description:
  //     "Enterprise-grade microservice syncing Apache Kafka topics with REST APIs with at-least-once delivery guarantees and Dead Letter Queues.",
  //   category: "systems",
  //   tags: ["Java 21", "Spring Boot", "Apache Kafka", "Docker", "DLQ"],
  //   github: "https://github.com",
  // },
];
