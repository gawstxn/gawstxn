"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/app/data/personal";

// ─── Script ──────────────────────────────────────────────────────────────────
const L1      = `> ${personalInfo.nameTag}`;    // e.g. "> GAWSTXN.DEV"
const L2      = "> LOADING PORTFOLIO...";
const L3      = "> READY";

const SPEED_L1 = 80;   // ms / char for the big name
const SPEED_L2 = 38;   // ms / char for the status line

// Absolute timestamps (ms from mount)
const L1_START   = 250;
const L1_END     = L1_START + L1.length * SPEED_L1;             // ~1290
const L2_START   = L1_END   + 280;                               // ~1570
const L2_END     = L2_START + L2.length * SPEED_L2;             // ~2330
const BAR_START  = L2_END   + 120;                               // ~2450
const BAR_DUR    = 1800;                                         // progress fill time
const L3_AT      = BAR_START + BAR_DUR + 80;                    // ~3280
const EXIT_AT    = L3_AT    + 480;                               // ~3760
const UNLOCK_AT  = EXIT_AT  + 950;
const HIDE_AT    = EXIT_AT  + 1150;

type Cursor = "l1" | "l2" | "none";
type Phase  = "typing" | "bar" | "ready" | "exiting" | "hidden";

export default function LoadingScreen() {
  const [l1Chars,   setL1Chars]   = useState("");
  const [l2Chars,   setL2Chars]   = useState("");
  const [showL3,    setShowL3]    = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [cursor,    setCursor]    = useState<Cursor>("l1");
  const [phase,     setPhase]     = useState<Phase>("typing");

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const ids: ReturnType<typeof setTimeout>[] = [];
    const at = (fn: () => void, delay: number) =>
      ids.push(setTimeout(fn, delay));

    // ── Type line 1 (name) ────────────────────────────────────────────────────
    for (let i = 1; i <= L1.length; i++) {
      at(() => setL1Chars(L1.slice(0, i)), L1_START + i * SPEED_L1);
    }

    // Move cursor to line 2 slot
    at(() => setCursor("l2"), L2_START - 60);

    // ── Type line 2 (status) ─────────────────────────────────────────────────
    for (let i = 1; i <= L2.length; i++) {
      at(() => setL2Chars(L2.slice(0, i)), L2_START + i * SPEED_L2);
    }

    // ── Progress bar ─────────────────────────────────────────────────────────
    at(() => {
      setPhase("bar");
      setCursor("none");

      const tick = 16;
      let val = 0;
      const barStart = performance.now();
      const iv = setInterval(() => {
        const elapsed = performance.now() - barStart;
        const t = Math.min(elapsed / BAR_DUR, 1);
        // ease-out power curve: fast start, decelerates near 100%
        val = Math.pow(t, 0.42) * 100;
        setProgress(val);
        if (t >= 1) { clearInterval(iv); }
      }, tick);
      ids.push(iv as unknown as ReturnType<typeof setTimeout>);
    }, BAR_START);

    // ── READY line ───────────────────────────────────────────────────────────
    at(() => { setProgress(100); setShowL3(true); setPhase("ready"); }, L3_AT);

    // ── Exit ─────────────────────────────────────────────────────────────────
    at(() => {
      setPhase("exiting");
      window.dispatchEvent(new CustomEvent("portfolio:loaded"));
    }, EXIT_AT);
    at(() => { document.documentElement.style.overflow = ""; }, UNLOCK_AT);
    at(() => setPhase("hidden"), HIDE_AT);

    return () => {
      ids.forEach(clearTimeout);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "hidden") return null;

  const isExiting = phase === "exiting";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
      style={{
        willChange: "transform",
        transition: isExiting
          ? "transform 950ms cubic-bezier(0.76, 0, 0.24, 1)"
          : "none",
        transform: isExiting ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />

      {/* Radial ambient green */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(0,255,136,0.055) 0%, transparent 70%)",
        }}
      />

      {/* Corner marks */}
      <div className="absolute top-6 left-6   h-5 w-5 border-t border-l border-[#1a1a1a]" />
      <div className="absolute top-6 right-6  h-5 w-5 border-t border-r border-[#1a1a1a]" />
      <div className="absolute bottom-6 left-6  h-5 w-5 border-b border-l border-[#1a1a1a]" />
      <div className="absolute bottom-6 right-6 h-5 w-5 border-b border-r border-[#1a1a1a]" />

      {/* ── Terminal block ── */}
      <div className="relative z-10 w-full max-w-lg px-8 flex flex-col gap-4 select-none">

        {/* Line 1 — big name */}
        <div className="flex items-center gap-0 leading-none">
          <span
            className="font-mono font-bold tracking-widest text-accent"
            style={{
              fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
              textShadow: "0 0 28px rgba(0,255,136,0.55), 0 0 60px rgba(0,255,136,0.2)",
            }}
          >
            {l1Chars}
          </span>
          {cursor === "l1" && (
            <span
              className="inline-block bg-accent animate-blink ml-1"
              style={{ width: "0.55em", height: "1.15em", verticalAlign: "middle" }}
            />
          )}
        </div>

        {/* Line 2 — status */}
        {(l2Chars || cursor === "l2") && (
          <div className="flex items-center gap-0 font-mono text-sm text-[#555]">
            <span>{l2Chars}</span>
            {cursor === "l2" && (
              <span
                className="inline-block bg-[#555] animate-blink ml-1"
                style={{ width: "0.5em", height: "0.9em", verticalAlign: "middle" }}
              />
            )}
          </div>
        )}

        {/* Progress bar */}
        {phase !== "typing" && (
          <div className="flex flex-col gap-2 pt-1">
            <div className="relative h-px w-full bg-[#111] overflow-hidden rounded-full">
              {/* Glow tail */}
              <div
                className="absolute inset-y-0 w-20 bg-accent opacity-30 blur-sm"
                style={{
                  left: `calc(${progress}% - 5rem)`,
                  transition: "left 80ms linear",
                }}
              />
              {/* Fill */}
              <div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{
                  width: `${progress}%`,
                  transition: "width 80ms linear",
                }}
              />
            </div>
            <div className="flex justify-between font-mono text-[10px]">
              <span className="text-[#222]">INITIALIZING</span>
              <span
                className="text-accent"
                style={{ opacity: 0.65 }}
              >
                {Math.floor(progress).toString().padStart(3, "0")}%
              </span>
            </div>
          </div>
        )}

        {/* Line 3 — READY */}
        {showL3 && (
          <div
            className="font-mono text-sm text-accent animate-fade-in"
            style={{
              textShadow: "0 0 16px rgba(0,255,136,0.8)",
            }}
          >
            {L3}
            <span
              className="inline-block bg-accent animate-blink ml-1"
              style={{ width: "0.5em", height: "0.85em", verticalAlign: "middle" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
