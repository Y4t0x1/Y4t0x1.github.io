import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { toolkit } from "@/data/cv";

export function Toolkit() {
  return (
    <Section
      id="toolkit"
      kicker="03 / Toolkit"
      title="Security toolkit"
      lede="Tools named in the CV, grouped by how they are actually used. No proficiency percentages — the work samples below speak for that."
      className="hairline"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {toolkit.map((category, i) => (
          <Reveal as="article" key={category.id} delay={i * 70} className="card p-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="font-mono text-xs uppercase tracking-label text-zinc-400">
                {category.title}
              </h3>
              <span className="font-mono text-[0.6875rem] text-signal-500/80">
                0{category.tools.length}
              </span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {category.tools.map((tool) => (
                <li
                  key={tool}
                  className="group/tool flex items-center gap-2.5 text-sm text-zinc-200 transition-colors hover:text-zinc-50"
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-signal-500 transition-transform duration-200 group-hover/tool:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span className="font-mono text-[0.875rem]">{tool}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
