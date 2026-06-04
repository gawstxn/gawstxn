"use client";

import { useState } from "react";
import Link from "next/link";
import {
  projects,
  categoryLabels,
  type ProjectCategory,
} from "@/app/data/projects";

const CATEGORIES: ProjectCategory[] = ["all", "web", "ai"];

export default function ProjectsGrid() {
  const [active, setActive] = useState<ProjectCategory>("all");
  // bump this key whenever filter changes so cards re-animate
  const [animKey, setAnimKey] = useState(0);

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  function changeFilter(cat: ProjectCategory) {
    setActive(cat);
    setAnimKey((k) => k + 1);
  }

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`page-filter-${cat}`}
            onClick={() => changeFilter(cat)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-200 cursor-pointer ${
              active === cat
                ? "border-accent bg-accent text-black font-bold"
                : "border-[#222] text-[#666] hover:border-[#444] hover:text-white"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
        <span className="ml-auto font-mono text-xs text-[#444] self-center">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid — key resets so cards re-animate on filter change */}
      <div
        key={animKey}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        {filtered.map((project, idx) => {
          const staggerIdx = Math.min(idx + 1, 10);
          return (
            <article
              key={project.id}
              className={`card-hover card-stagger card-stagger-${staggerIdx} rounded-lg bg-[#080808] p-6 flex flex-col gap-4`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase pt-0.5">
                  {project.category}
                </span>
                <div className="flex gap-3 shrink-0">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="text-[#444] transition-colors hover:text-accent"
                    >
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
              <h2 className="text-lg font-bold text-white leading-tight">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-[#666] leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-[#111]">
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
          );
        })}
      </div>

      {/* Back link */}
      <div className="mt-16 flex justify-center">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#444] hover:text-accent transition-colors"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to home
        </Link>
      </div>
    </>
  );
}
