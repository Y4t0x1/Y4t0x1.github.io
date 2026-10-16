import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { projects, type ProjectCard } from "@/data/cv";

const badgeStyles: Record<ProjectCard["badge"], string> = {
  Lab: "border-signal-700/70 bg-signal-700/10 text-signal-300",
  "Training Exercise": "border-white/15 bg-white/5 text-zinc-300",
  "Security Research": "border-white/15 bg-white/5 text-zinc-300",
};

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h5 className="font-mono text-[0.68rem] uppercase tracking-label text-zinc-500">{label}</h5>
      <div className="mt-1.5 text-sm leading-relaxed text-zinc-300">{children}</div>
    </div>
  );
}

function ProjectItem({ project }: { project: ProjectCard }) {
  const panelId = `project-${project.id}-panel`;
  return (
    <details className="card group overflow-hidden">
      <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-label ${badgeStyles[project.badge]}`}
            >
              {project.badge}
            </span>
            <span className="font-mono text-[0.68rem] uppercase tracking-label text-zinc-500">
              {project.category}
            </span>
          </div>
          <h3 className="mt-3 text-base font-semibold text-zinc-100 sm:text-lg">{project.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">{project.summary}</p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 shrink-0 rounded-md border border-white/10 p-2 text-zinc-400 transition-transform group-open:rotate-180"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
        <span className="sr-only">Toggle details</span>
      </summary>

      <div id={panelId} className="details-panel border-t border-white/10 bg-ink-900/60 p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <DetailBlock label="Objective">{project.details.objective}</DetailBlock>
          <DetailBlock label="Environment">{project.details.environment}</DetailBlock>
          <div className="lg:col-span-2">
            <DetailBlock label="Methodology notes">{project.details.approach}</DetailBlock>
          </div>

          <div>
            <h5 className="font-mono text-[0.68rem] uppercase tracking-label text-zinc-500">
              Focus areas
            </h5>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.focusAreas.map((area) => (
                <li key={area} className="mono-chip">
                  {area}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-[0.68rem] uppercase tracking-label text-zinc-500">
              Tools used
            </h5>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <li key={tool} className="mono-chip font-mono">
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <DetailBlock label="Findings">
              <span className="placeholder-slot block">{project.details.findings}</span>
            </DetailBlock>
          </div>
          <div>
            <DetailBlock label="Remediation">
              <span className="placeholder-slot block">{project.details.remediation}</span>
            </DetailBlock>
          </div>
          <div>
            <DetailBlock label="Lessons learned">
              <span className="placeholder-slot block">{project.details.lessons}</span>
            </DetailBlock>
          </div>
          <div>
            <DetailBlock label="Evidence">
              <span className="placeholder-slot block">[ADD LAB SCREENSHOT]</span>
            </DetailBlock>
          </div>
        </div>
      </div>
    </details>
  );
}

export function Work() {
  return (
    <Section
      id="work"
      kicker="08 / Security Work"
      title="Security projects & case studies"
      lede="Expandable case-study slots built from topics documented in the CV — labeled as labs and training exercises, never as client engagements. Placeholder fields are intentionally visible so completed write-ups can be dropped in."
      className="hairline"
    >
      <div className="space-y-4">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 80}>
            <ProjectItem project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={projects.length * 80}>
        <div className="mt-8 rounded-xl border border-signal-500/20 bg-gradient-to-r from-signal-950/40 via-ink-900/60 to-ink-950 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-signal-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-label text-signal-400">
                  CTF Writeups & Security Research
                </span>
              </div>
              <h4 className="text-base font-semibold text-zinc-100 sm:text-lg">
                Hands-on Walkthroughs & Penetration Testing Notes
              </h4>
              <p className="max-w-2xl text-sm text-zinc-400">
                Detailed breakdowns covering Web Exploitation, Cryptography, Reverse Engineering, and Threat Hunting on Hack The Box, PicoCTF, and active labs.
              </p>
            </div>
            <a
              href="https://y4t0x1.github.io/blog"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-signal-500/40 bg-signal-500/10 px-4 py-2.5 text-sm font-medium text-signal-300 transition-colors hover:border-signal-400 hover:bg-signal-500/20 focus-ring"
            >
              <span>Explore Writeups</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
