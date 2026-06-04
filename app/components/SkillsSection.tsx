import { skillCategories, currentlyLearning } from "@/app/data/skills";
import RevealWrapper from "./RevealWrapper";

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 bg-[#040404] border-t border-[#111] overflow-hidden">

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <RevealWrapper>
          <div className="mb-16">
            <span className="font-mono text-xs text-accent tracking-widest">05 // SKILLS</span>
            <h2 className="mt-2 text-4xl font-black tracking-tight">Tech Stack</h2>
          </div>
        </RevealWrapper>

        {/* Skill grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, ci) => (
            <RevealWrapper key={cat.id} delay={ci * 80}>
              <div className="rounded-lg border border-[#1a1a1a] bg-[#080808] p-6 h-full">
                <h3 className="mb-5 font-mono text-xs text-accent tracking-widest uppercase">
                  {cat.title}
                </h3>
                <div className="flex flex-col gap-2">
                  {cat.skills.map((skill, si) => (
                    <div
                      key={skill}
                      className="group flex items-center gap-3 rounded px-3 py-2 transition-colors hover:bg-[#0f0f0f]"
                      style={{ animationDelay: `${si * 40}ms` }}
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#333] transition-colors group-hover:bg-accent"
                      />
                      <span className="text-sm text-[#777] transition-colors group-hover:text-white">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>

        {/* Learning now */}
        <RevealWrapper className="mt-12">
          <div className="rounded-lg border border-dashed border-[#1a1a1a] p-6">
            <span className="font-mono text-xs text-[#444] tracking-widest">
              CURRENTLY LEARNING
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {currentlyLearning.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#1a1a1a] px-3 py-1 font-mono text-xs text-[#555]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
