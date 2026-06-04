"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { personalInfo } from "@/app/data/personal";

const navLinks = [
  { href: "#about",      label: "About"      },
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects"   },
  { href: "#skills",     label: "Skills"     },
  { href: "#contact",    label: "Contact"    },
];

export default function Navbar() {
  const pathname                        = usePathname();
  const isHome                          = pathname === "/";
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeSection, setSection]     = useState("");

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section: scroll-position approach, no dead zones ── */
  useEffect(() => {
    const sectionIds = ["home", ...navLinks.map((l) => l.href.slice(1))];

    const getActive = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      let active = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) active = id;
      }
      setSection(active === "home" ? "" : active);
    };

    getActive();
    window.addEventListener("scroll", getActive, { passive: true });
    return () => window.removeEventListener("scroll", getActive);
  }, []);

  /* ── Body scroll lock on mobile menu ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-[#1a1a1a] bg-black/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href={isHome ? "#home" : "/"}
            className="font-mono text-sm font-bold tracking-widest text-accent hover:text-glow transition-all"
          >
            {personalInfo.nameTag}
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? "text-accent text-glow"
                    : "text-[#888] hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-accent px-4 py-1.5 font-mono text-xs text-accent transition-all hover:bg-accent hover:text-black"
              style={{ transition: "all 0.2s ease" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 16px rgba(0,255,136,0.45), 0 0 40px rgba(0,255,136,0.15)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
            >
              Resume
            </a>
          </div>

          {/* Hamburger */}
          <button
            id="nav-hamburger"
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "translate-y-2.5 rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-2.5 -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      {/* Mobile menu — full-screen, slides down from top */}
      <div
        className="fixed inset-0 z-40 md:hidden overflow-hidden"
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <div
          className="absolute inset-0 bg-black flex flex-col items-center justify-center"
          style={{
            willChange: "transform",
            transition: "transform 950ms cubic-bezier(0.22, 1, 0.36, 1)",
            transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          {/* Corner marks */}
          <div className="absolute top-6 left-6 h-5 w-5 border-t border-l border-[#1a1a1a]" />
          <div className="absolute top-6 right-6 h-5 w-5 border-t border-r border-[#1a1a1a]" />
          <div className="absolute bottom-6 left-6 h-5 w-5 border-b border-l border-[#1a1a1a]" />
          <div className="absolute bottom-6 right-6 h-5 w-5 border-b border-r border-[#1a1a1a]" />

          {/* Links — staggered fade-up */}
          <nav className="relative z-10 flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-3 font-mono text-3xl"
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: "800ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: menuOpen ? `${300 + i * 100}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  color: "#888",
                }}
              >
                <span className="font-mono text-[10px] text-accent w-4 text-right" style={{ opacity: 0.4 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="group-hover:text-white transition-colors duration-200">
                  {link.label}
                </span>
              </a>
            ))}

            {/* Resume */}
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded border border-accent px-8 py-2 font-mono text-sm text-accent hover:bg-accent hover:text-black transition-all"
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "800ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: menuOpen ? `${300 + navLinks.length * 100}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,136,0.45), 0 0 50px rgba(0,255,136,0.15)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
            >
              Resume
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
