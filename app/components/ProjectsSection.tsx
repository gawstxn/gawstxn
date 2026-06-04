"use client";

import { useState } from "react";
import Link from "next/link";
import {
  projects,
  categoryLabels,
  type ProjectCategory,
} from "@/app/data/projects";
import RevealWrapper from "./RevealWrapper";

const CATEGORIES = Object.keys(categoryLabels) as ProjectCategory[];

export default function ProjectsSection() {
  const [active, setActive] = useState<ProjectCategory>("all");

  const LIMIT = 6;
  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);
  const visible = filtered.slice(0, LIMIT);
  const hasMore = filtered.length > LIMIT;

  return (
    <section
      id="projects"
      className="relative py-32 border-t border-[#111] overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <RevealWrapper>
          <div className="mb-10">
            <span className="font-mono text-xs text-accent tracking-widest">
              04 // PROJECTS
            </span>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Selected Work
            </h2>
          </div>
        </RevealWrapper>

        {/* Filter tabs */}
        <RevealWrapper className="mb-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat}`}
                onClick={() => setActive(cat)}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-200 cursor-pointer ${
                  active === cat
                    ? "border-accent bg-accent text-black font-bold"
                    : "border-[#222] text-[#666] hover:border-[#444] hover:text-white"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </RevealWrapper>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((project, i) => (
            <RevealWrapper key={project.id} delay={i * 80}>
              <article className="card-hover rounded-lg bg-[#080808] p-6 flex flex-col gap-4 h-full">
                {/* Category pill */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase">
                    {project.category}
                  </span>
                  <div className="flex gap-3">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="text-[#444] transition-colors hover:text-accent"
                      >
                        {/* External link icon */}
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub`}
                        className="text-[#444] transition-colors hover:text-accent"
                      >
                        {/* GitHub icon */}
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white leading-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#666] leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#111]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded font-mono text-[10px] px-2 py-0.5 bg-[#111] text-[#555]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>

        {hasMore && (
          <RevealWrapper className="mt-12 text-center">
            <Link
              href="/projects"
              id="all-projects-link"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#555] hover:text-accent transition-colors"
            >
              {`View ${filtered.length - LIMIT} more project${filtered.length - LIMIT > 1 ? "s" : ""}`}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </RevealWrapper>
        )}
      </div>
    </section>
  );
}
