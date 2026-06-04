import { Briefcase, GraduationCap } from "lucide-react";
import { experiences } from "@/app/data/experience";
import RevealWrapper from "./RevealWrapper";

const work = experiences.filter((e) => e.type === "work");
const edu  = experiences.filter((e) => e.type === "education");

function TimelineItem({ item }: { item: (typeof experiences)[number] }) {
  return (
    <div className="relative pl-8 group">
      {/* Connector dot */}
      <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-black
                      group-hover:bg-accent transition-colors duration-300 z-10" />
      {/* Vertical line — rendered by parent */}

      <div className="card-hover rounded-lg bg-[#080808] p-5 flex flex-col gap-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
          <div>
            <h4 className="font-semibold text-white leading-tight">{item.role}</h4>
            <p className="text-sm text-accent font-mono">{item.org}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <span className="font-mono text-[10px] text-[#444] tracking-wider whitespace-nowrap">
              {item.period}
            </span>
            <span className="font-mono text-[10px] text-[#333] tracking-wider">
              {item.location}
            </span>
            {item.current && (
              <span className="inline-flex items-center gap-1 font-mono text-[9px] text-accent border border-accent/30 rounded-full px-2 py-0.5">
                <span className="h-1 w-1 rounded-full bg-accent animate-ping" />
                Current
              </span>
            )}
          </div>
        </div>

        {/* Bullets */}
        <ul className="flex flex-col gap-1.5">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#666] leading-relaxed">
              <span className="text-accent shrink-0 mt-0.5 font-mono text-xs">›</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Tags */}
        {item.tags && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded font-mono text-[10px] px-2 py-0.5 bg-[#111] text-[#555]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Column({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: typeof experiences;
}) {
  return (
    <div className="flex flex-col gap-0">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-8 text-[#555]">
        {icon}
        <span className="font-mono text-xs tracking-widest uppercase">{title}</span>
      </div>

      {/* Timeline items with vertical line */}
      <div className="relative flex flex-col gap-5">
        {/* Vertical guide line */}
        <div className="absolute left-[4px] top-2 bottom-2 w-px bg-[#111]" />

        {items.map((item, i) => (
          <RevealWrapper key={item.id} delay={i * 80}>
            <TimelineItem item={item} />
          </RevealWrapper>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative py-32 bg-black border-t border-[#111]"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <RevealWrapper>
          <div className="mb-16">
            <span className="font-mono text-xs text-accent tracking-widest">03 // EXPERIENCE</span>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Where I&apos;ve Been
            </h2>
          </div>
        </RevealWrapper>

        {/* Two-column timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Column
            title="Work Experience"
            icon={<Briefcase size={14} strokeWidth={1.5} />}
            items={work}
          />
          <Column
            title="Education"
            icon={<GraduationCap size={14} strokeWidth={1.5} />}
            items={edu}
          />
        </div>
      </div>
    </section>
  );
}
