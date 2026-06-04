"use client";

import { personalInfo } from "@/app/data/personal";
import RevealWrapper from "./RevealWrapper";

const SOCIALS = [
  {
    label: "GitHub",
    href: personalInfo.github,
    svg: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  },
  {
    label: "LinkedIn",
    href: personalInfo.linkedin,
    svg: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: personalInfo.instagram,
    svg: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 border-t border-[#111] overflow-hidden">

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <RevealWrapper>
          <div className="mb-16">
            <span className="font-mono text-xs text-accent tracking-widest">
              06 // CONTACT
            </span>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Let&apos;s Work Together
            </h2>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <RevealWrapper className="flex flex-col gap-6">
            {/* Available badge */}
            {personalInfo.available && (
              <div className="inline-flex items-center gap-2 w-fit font-mono text-xs text-accent border border-accent/30 rounded-full px-4 py-1.5 bg-accent/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                OPEN TO OPPORTUNITIES
              </div>
            )}

            <p className="text-[#777] leading-relaxed max-w-md">
              Whether you have an exciting project in mind, want to discuss a
              collaboration, or just say hi — my inbox is always open. I&apos;ll
              do my best to get back to you within 24 hours.
            </p>

            {/* Email */}
            <a
              href={`mailto:${personalInfo.email}`}
              id="contact-email"
              className="group inline-flex items-center gap-3 text-sm md:text-lg font-mono text-white hover:text-accent transition-all"
              style={{ transition: "color 0.2s ease, text-shadow 0.2s ease" }}
              onMouseEnter={e => (e.currentTarget.style.textShadow = "0 0 20px rgba(0,255,136,0.6)")}
              onMouseLeave={e => (e.currentTarget.style.textShadow = "")}
            >
              <svg className="h-5 w-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span className="break-all">{personalInfo.email}</span>
            </a>

            {/* Phone */}
            {personalInfo.phone && (
              <a
                href={`tel:${personalInfo.phone.replace(/[\s-]/g, '')}`}
                id="contact-phone"
                className="group inline-flex items-center gap-3 text-sm md:text-lg font-mono text-white hover:text-accent transition-all"
                style={{ transition: "color 0.2s ease, text-shadow 0.2s ease" }}
                onMouseEnter={e => (e.currentTarget.style.textShadow = "0 0 20px rgba(0,255,136,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.textShadow = "")}
              >
                <svg className="h-5 w-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.87l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="break-all">{personalInfo.phone}</span>
              </a>
            )}

            {/* Location */}
            <div className="flex items-center gap-3 text-sm text-[#555]">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {personalInfo.location}
            </div>
          </RevealWrapper>

          {/* Right: social cards */}
          <RevealWrapper className="flex flex-col gap-4">
            {SOCIALS.map(({ label, href, svg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-4 rounded-lg bg-[#080808] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#111] text-[#555] transition-colors group-hover:text-accent">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={svg} />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{label}</div>
                  <div className="font-mono text-xs text-[#444]">
                    {href.replace("https://", "")}
                  </div>
                </div>
                <svg className="ml-auto h-4 w-4 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            ))}
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
