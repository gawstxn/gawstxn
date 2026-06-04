"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/app/data/personal";

type Phase = "loading" | "exiting" | "hidden";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    /* ── Variable-speed progress ── */
    let current = 0;
    const tick = setInterval(() => {
      const step =
        current < 50 ? 4
        : current < 75 ? 2
        : current < 90 ? 0.8
        : 0.25;
      current = Math.min(current + step, 99);
      setProgress(current);
    }, 16);

    /* Snap to 100 at 1.8s */
    const snapTimer = setTimeout(() => {
      clearInterval(tick);
      setProgress(100);
    }, 1800);

    /* Start slide-up at 2.1s — dispatch sync event for HeroSection */
    const exitTimer = setTimeout(() => {
      setPhase("exiting");
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new CustomEvent("portfolio:loaded"));
    }, 2100);

    /* Unmount at 2.9s */
    const hideTimer = setTimeout(() => setPhase("hidden"), 2900);

    return () => {
      clearInterval(tick);
      clearTimeout(snapTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        willChange: "transform",
        transition: "transform 900ms cubic-bezier(0.76, 0, 0.24, 1)",
        transform: phase === "exiting" ? "translateY(-100%)" : "translateY(0)",
      }}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-6 left-6 h-6 w-6 border-t border-l border-[#1f1f1f]" />
      <div className="absolute top-6 right-6 h-6 w-6 border-t border-r border-[#1f1f1f]" />
      <div className="absolute bottom-6 left-6 h-6 w-6 border-b border-l border-[#1f1f1f]" />
      <div className="absolute bottom-6 right-6 h-6 w-6 border-b border-r border-[#1f1f1f]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 select-none">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-5xl font-black tracking-widest text-accent text-glow">
            {personalInfo.nameTag}
          </span>
          <span className="font-mono text-[10px] tracking-[0.4em] text-[#333] uppercase">
            {personalInfo.title} / {personalInfo.titleAccent.replace("& ", "")}
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col items-center gap-3 w-56">
          <div className="relative h-px w-full overflow-hidden bg-[#1a1a1a]">
            {/* Glow tail */}
            <div
              className="absolute inset-y-0 w-12 blur-sm bg-accent opacity-40 transition-all duration-[400ms] ease-out"
              style={{ left: `calc(${progress}% - 3rem)` }}
            />
            {/* Fill */}
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-all duration-[400ms] ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex w-full justify-between font-mono text-[10px] text-[#333]">
            <span>INITIALIZING</span>
            <span>{Math.floor(progress).toString().padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
