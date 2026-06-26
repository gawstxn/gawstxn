"use client";

import { useEffect, useState } from "react";
import { personalInfo, bootLines } from "@/app/data/personal";

// Module-level flag: false on hard reload (JS re-evaluates), true after first load.
// Persists across client-side navigations within the same session.
let portfolioHasLoaded = false;

export default function HeroSection() {
  /* ── Hero content: animate in after loading screen ── */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (portfolioHasLoaded) {
      // Client-side back-navigation — LoadingScreen won't run again,
      // so animate in directly after a short paint delay.
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    }
    // First load — wait for LoadingScreen to dispatch the event.
    const onLoaded = () => {
      portfolioHasLoaded = true;
      setTimeout(() => setMounted(true), 80);
    };
    window.addEventListener("portfolio:loaded", onLoaded);
    return () => window.removeEventListener("portfolio:loaded", onLoaded);
  }, []);

  /* ── Terminal typing state (decorative — runs in parallel) ── */
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [bootDone, setBootDone] = useState(false);

  /* ── Type boot lines one char at a time ── */
  useEffect(() => {
    if (!mounted || bootDone) return;
    if (currentLine >= bootLines.length) {
      setTimeout(() => setBootDone(true), 400);
      return;
    }

    const target = bootLines[currentLine];
    if (currentChar < target.length) {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] ?? "") + target[currentChar];
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, 22);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, bootDone, mounted]);

  /* ── Hero content reveal class ── */
  const heroClass = mounted
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";

  return (
    <section
      id="home"
      className="relative min-h-screen bg-grid flex items-center overflow-hidden"
    >
      {/* Dark vignette — edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ── Left: Hero copy ── */}
        <div className="flex flex-col gap-6">
          {/* Available badge — only shown when available: true */}
          {personalInfo.available && (
            <div
              className={`inline-flex items-center gap-2 w-fit font-mono text-xs text-accent border border-accent/30 rounded-full px-3 py-1 transition-all duration-700 ${heroClass}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              AVAILABLE FOR WORK
            </div>
          )}

          {/* Name */}
          <div className={`transition-all duration-700 delay-100 ${heroClass}`}>
            <h1
              className="font-black tracking-tight leading-none"
              style={{ fontSize: "clamp(3.25rem, 11vw, 4.5rem)" }}
            >
              {personalInfo.name}
            </h1>
          </div>

          {/* Title */}
          <div className={`transition-all duration-700 delay-200 ${heroClass}`}>
            <p className="text-2xl sm:text-3xl font-light text-[#888]">
              {personalInfo.title}{" "}
              <span className="text-accent font-semibold">
                {personalInfo.titleAccent}
              </span>
            </p>
          </div>

          {/* Subtitle */}
          <div className={`transition-all duration-700 delay-300 ${heroClass}`}>
            <p className="max-w-md text-[#666] leading-relaxed">
              {personalInfo.subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 pt-2 transition-all duration-700 delay-[400ms] ${heroClass}`}
          >
            <a
              href="#projects"
              id="hero-cta-projects"
              className="rounded bg-accent px-6 py-3 font-mono text-sm font-bold text-black transition-all hover:accent-glow hover:scale-105 active:scale-95"
            >
              View Projects
            </a>
            <a
              href={personalInfo.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-resume"
              className="rounded border border-[#333] px-6 py-3 font-mono text-sm text-white transition-all hover:border-accent hover:text-accent"
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 18px rgba(0,255,136,0.25), 0 0 40px rgba(0,255,136,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
            >
              Download CV
            </a>
          </div>

          {/* Social links */}
          <div
            className={`flex gap-5 pt-2 transition-all duration-700 delay-500 ${heroClass}`}
          >
            {[
              {
                href: personalInfo.github,
                label: "GitHub",
                svg: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
              },
              {
                href: personalInfo.linkedin,
                label: "LinkedIn",
                svg: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
              },
              {
                href: personalInfo.instagram,
                label: "Instagram",
                svg: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
              },
            ].map(({ href, label, svg }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#555] transition-colors hover:text-accent"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d={svg} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Terminal window ── */}
        <div
          className={`hidden lg:block transition-all duration-1000 delay-[400ms] ${heroClass}`}
        >
          <div
            className="rounded-lg border border-[#1e2e24] bg-[#080808] overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 1px rgba(0,255,136,0.08), 0 8px 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,255,136,0.12), 0 0 24px rgba(0,255,136,0.08)",
            }}
          >

            {/* Terminal title bar */}
            <div className="flex items-center gap-2 border-b border-[#1a1a1a] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28ca41]" />
              <span className="ml-3 font-mono text-xs text-[#555]">
                gawstxn@portfolio:~$
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-5 font-mono text-sm leading-relaxed min-h-64">
              {displayedLines.map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-accent select-none">›</span>
                  <span
                    className={
                      line.includes("[OK]")
                        ? "text-[#888]"
                        : line === bootLines[bootLines.length - 1]
                          ? "text-accent font-semibold"
                          : "text-[#ccc]"
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}

              {/* Blinking cursor on active line */}
              {!bootDone && (
                <div className="flex gap-3">
                  <span className="text-accent select-none">›</span>
                  <span
                    className="inline-block h-4 w-2.5 bg-accent animate-blink"
                    aria-hidden
                  />
                </div>
              )}

              {/* Post-boot prompt */}
              {bootDone && (
                <div className="mt-4 flex gap-3 text-[#555]">
                  <span className="text-accent">›</span>
                  <span>
                    cat about.txt
                    <span className="ml-1 inline-block h-4 w-2.5 bg-accent animate-blink" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#444]">
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <div
          className="h-8 w-px"
          style={{
            background: "linear-gradient(to bottom, rgba(0,255,136,0.4), transparent)",
            boxShadow: "0 0 6px rgba(0,255,136,0.3)",
          }}
        />
      </div>
    </section>
  );
}
