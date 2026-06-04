"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/app/data/personal";

type Phase = "loading" | "exiting" | "hidden";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState<Phase>("loading");

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    const INITIAL_DELAY = 400; // ms to hold at 0% before filling

    let tick: ReturnType<typeof setInterval>;
    let current = 0;

    const startTick = setTimeout(() => {
      tick = setInterval(() => {
        const step =
          current < 50 ? 4
          : current < 75 ? 2
          : current < 90 ? 0.8
          : 0.25;
        current = Math.min(current + step, 99);
        setProgress(current);
      }, 16);
    }, INITIAL_DELAY);

    const snapTimer  = setTimeout(() => { clearInterval(tick); setProgress(100); }, INITIAL_DELAY + 1800);
    // fire hero animation as slide-up begins
    const exitTimer  = setTimeout(() => {
      setPhase("exiting");
      window.dispatchEvent(new CustomEvent("portfolio:loaded"));
    }, INITIAL_DELAY + 2200);
    // unlock scroll only AFTER the 1000ms slide-up finishes
    const scrollTimer = setTimeout(() => {
      document.documentElement.style.overflow = "";
    }, INITIAL_DELAY + 2200 + 1000);
    const hideTimer  = setTimeout(() => setPhase("hidden"), INITIAL_DELAY + 3300);

    return () => {
      clearTimeout(startTick);
      clearInterval(tick);
      clearTimeout(snapTimer);
      clearTimeout(exitTimer);
      clearTimeout(scrollTimer);
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
        transition: "transform 1000ms cubic-bezier(0.76, 0, 0.24, 1)",
        transform: phase === "exiting" ? "translateY(-100%)" : "translateY(0)",
      }}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
    >
      {/* Same dot-grid as hero */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Radial glow — same as hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Subtle corner marks */}
      <div className="absolute top-6 left-6 h-5 w-5 border-t border-l border-[#1a1a1a]" />
      <div className="absolute top-6 right-6 h-5 w-5 border-t border-r border-[#1a1a1a]" />
      <div className="absolute bottom-6 left-6 h-5 w-5 border-b border-l border-[#1a1a1a]" />
      <div className="absolute bottom-6 right-6 h-5 w-5 border-b border-r border-[#1a1a1a]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-10 select-none w-full px-8">

        {/* Name */}
        <div className="flex flex-col items-center gap-2 w-full">
          <span
            className="font-mono font-black tracking-widest text-accent text-glow text-center"
            style={{ fontSize: "clamp(1.75rem, 8vw, 3rem)" }}
          >
            {personalInfo.nameTag}
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#2a2a2a] uppercase text-center">
            {personalInfo.title}&nbsp;/&nbsp;{personalInfo.titleAccent.replace("& ", "")}
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-3 w-full max-w-[14rem]">
          <div className="relative h-px w-full overflow-hidden bg-[#111]">
            {/* Glow tail */}
            <div
              className="absolute inset-y-0 w-12 blur-sm bg-accent opacity-40"
              style={{
                left: `calc(${progress}% - 3rem)`,
                transition: "left 400ms ease-out",
              }}
            />
            {/* Fill */}
            <div
              className="absolute inset-y-0 left-0 bg-accent"
              style={{
                width: `${progress}%`,
                transition: "width 400ms ease-out",
              }}
            />
          </div>

          <div className="flex w-full justify-between font-mono text-[10px] text-[#2a2a2a]">
            <span>INITIALIZING</span>
            <span className="text-accent" style={{ opacity: 0.7 }}>
              {Math.floor(progress).toString().padStart(3, "0")}%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
