import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/app/components/LoadingScreen";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gawstxn.dev"),
  title: {
    default:
      "Naruenat Khamwaree — Junior Full-Stack Developer & Software Engineer",
    template: "%s | Naruenat Khamwaree",
  },
  description:
    "Portfolio of Naruenat Khamwaree, a Junior Full-Stack Developer and Software Engineer specializing in TypeScript, React, Next.js, and LINE OA integrations. Based in Bangkok, Thailand.",
  keywords: [
    "gawstxn",
    "Naruenat Khamwaree",
    "Junior Full-Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "LINE OA",
    "Bangkok",
    "Thailand",
    "Portfolio",
  ],
  authors: [{ name: "Naruenat Khamwaree", url: "https://gawstxn.dev" }],
  creator: "Naruenat Khamwaree",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://gawstxn.dev",
    title:
      "Naruenat Khamwaree — Junior Full-Stack Developer & Software Engineer",
    description:
      "IT graduate building clean interfaces and reliable software. React · Next.js · TypeScript · LINE OA · Based in Bangkok.",
    siteName: "Naruenat Khamwaree Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Naruenat Khamwaree — Junior Full-Stack Developer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Naruenat Khamwaree — Junior Full-Stack Developer & Software Engineer",
    description:
      "IT graduate building clean interfaces and reliable software. React · Next.js · TypeScript · Based in Bangkok.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-white min-h-screen antialiased">
        <SmoothScrollProvider />
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
