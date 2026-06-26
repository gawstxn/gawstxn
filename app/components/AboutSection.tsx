import Image from "next/image";
import { Code2, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { stats, philosophies } from "@/app/data/stats";
import { personalInfo } from "@/app/data/personal";
import RevealWrapper from "./RevealWrapper";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  ShieldCheck,
  TrendingUp,
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 bg-[#040404] border-t border-[#111] overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <RevealWrapper>
          <div className="mb-16">
            <span className="font-mono text-xs text-accent tracking-widest">
              02 // ABOUT
            </span>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Who I Am
            </h2>
          </div>
        </RevealWrapper>

        {/* Stats row */}
        <RevealWrapper className="mb-20">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[#1a1a1a] rounded-lg overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 1px rgba(0,255,136,0.06), 0 0 32px rgba(0,255,136,0.05)",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-1 bg-[#080808] py-8 px-4 hover:bg-[#0d0d0d] transition-colors"
              >
                <span className="text-4xl font-black text-accent text-glow">
                  {stat.value}
                </span>
                <span className="font-mono text-xs text-[#555] tracking-wider text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </RevealWrapper>

        {/* Bio + image placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
          <RevealWrapper className="lg:col-span-3 flex flex-col gap-5 text-[#999] leading-relaxed">
            <p>
              I'm an IT graduate from King Mongkut's University of Technology
              North Bangkok with a strong passion for building modern full-stack
              web applications.
            </p>
            <p>
              During my cooperative education at{" "}
              <span className="text-white">Codemonday</span>, I developed
              production-ready systems including a LINE Official Account loyalty
              platform and an integrated court booking application with
              automated customer workflows.
            </p>
            <p>
              I enjoy designing scalable software architectures, integrating AI
              APIs into real-world applications, and continuously learning new
              technologies to improve both development experience and product
              quality.
            </p>
            <p>
              Currently, I'm seeking my first full-time opportunity as a{" "}
              <span className="text-accent">Junior Full-Stack Developer</span>{" "}
              or <span className="text-accent">Software Engineer</span>.
            </p>
          </RevealWrapper>

          {/* Avatar */}
          <RevealWrapper className="lg:col-span-2 flex items-center justify-center">
            <div
              className="relative w-56 h-64 rounded-lg overflow-hidden group"
              style={{
                border: "1px solid rgba(0,255,136,0.22)",
                boxShadow:
                  "0 0 0 1px rgba(0,255,136,0.06), 0 0 40px rgba(0,255,136,0.18), 0 0 80px rgba(0,255,136,0.07), 0 16px 48px rgba(0,0,0,0.75)",
              }}
            >
              {personalInfo.photo ? (
                <Image
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0d1f15 100%)",
                  }}
                >
                  <div className="text-5xl select-none">👨‍💻</div>
                  <span className="font-mono text-xs text-[#555]">
                    photo goes here
                  </span>
                </div>
              )}
              {/* Corner accents */}
              <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-accent opacity-70 pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-[1.5px] border-r-[1.5px] border-accent opacity-70 pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-[1.5px] border-l-[1.5px] border-accent opacity-70 pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-accent opacity-70 pointer-events-none" />
            </div>
          </RevealWrapper>
        </div>

        {/* Engineering philosophies */}
        <RevealWrapper>
          <h3 className="mb-8 font-mono text-xs text-[#555] tracking-widest uppercase">
            Engineering Philosophy
          </h3>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {philosophies.map((p, i) => (
            <RevealWrapper key={p.id} delay={i * 100}>
              <div className="card-hover rounded-lg p-6 bg-[#080808] h-full">
                <div className="mb-4 text-accent">
                  {(() => {
                    const Icon = ICON_MAP[p.lucideIcon];
                    return Icon ? <Icon size={20} strokeWidth={1.6} /> : null;
                  })()}
                </div>
                <h4 className="mb-2 font-semibold text-white">{p.title}</h4>
                <p className="text-sm text-[#666] leading-relaxed">
                  {p.description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
