/* ─────────────────────────────────────────────────────
   Personal information — edit here to customise
   ───────────────────────────────────────────────────── */

export const personalInfo = {
  name: "Naruenat Khamwaree",
  nameTag: "GAWSTXN.DEV",
  title: "Junior Full-Stack Developer",
  titleAccent: "& AI Engineer",
  subtitle:
    "I build clean web applications and intelligent AI solutions. Bridging the gap between modern frontends, scalable backends, and data-driven models.",
  location: "Bangkok, Thailand",
  email: "naruenat.khamwaree@gmail.com",
  phone: "092-870-9655", // TODO: Update with your actual phone number
  github: "https://github.com/gawstxn",
  linkedin: "https://www.linkedin.com/in/naurenat-k",
  instagram: "https://www.instagram.com/gawstxn",
  resumeUrl: "/naruenat-khamwaree.pdf",
  cvUrl: "/naruenat-khamwaree.pdf",
  available: true,
  /**
   * Profile photo shown in the Hero section.
   * - Set to a path string like "/photo.jpg" (place the file in the /public folder).
   * - Set to null to fall back to the terminal window display.
   */
  // photo: null as string | null,
  photo: "/profile.jpg",
} as const;

export const bootLines = [
  "INITIALIZING SYSTEM...",
  "LOADING USER PROFILE... [OK]",
  "MOUNTING FILE SYSTEM... [OK]",
  "ESTABLISHING SECURE CONNECTION... [OK]",
  "COMPILING EXPERIENCE DATA... [OK]",
  "INJECTING CREATIVE MODULES... [OK]",
  "SYSTEM READY. WELCOME.",
] as const;
