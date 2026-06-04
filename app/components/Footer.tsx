"use client";

import { personalInfo } from "@/app/data/personal";

export default function Footer() {
  return (
    <footer className="border-t border-[#111] py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[#444]">
          © {new Date().getFullYear()}{" "}
          <span className="text-accent">{personalInfo.name}</span> All rights
          reserved.
        </p>

        <button
          id="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="flex items-center gap-2 font-mono text-xs text-[#444] hover:text-accent transition-colors"
        >
          Back to top
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
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
