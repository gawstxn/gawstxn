import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProjectsGrid from "./ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects — Alex Chen",
  description:
    "All projects by Alex Chen — AI systems, computer vision, full-stack apps, and distributed systems.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black">
        {/* Page header */}
        <div
          className="border-b border-[#111] bg-[#040404]"
          style={{ boxShadow: "0 1px 0 rgba(0,255,136,0.08), 0 4px 32px rgba(0,255,136,0.04)" }}
        >
          <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
            <span className="font-mono text-xs text-accent tracking-widest">
              ALL PROJECTS
            </span>
            <h1 className="mt-2 text-5xl font-black tracking-tight">
              Everything I&apos;ve Built
            </h1>
            <p className="mt-4 max-w-xl text-[#666] leading-relaxed">
              A complete catalogue of personal projects, hackathon entries, and
              side experiments. Filter by category or browse them all.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="mx-auto max-w-6xl px-6 py-16">
          <ProjectsGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
