"use client";

import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { experience, experienceNote, type ExperienceEntry } from "@/data/cv";

function ModeIcon({ mode }: { mode?: "remote" | "onsite" | "hybrid" }) {
  if (mode === "remote") {
    return (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    );
  }
  if (mode === "hybrid") {
    return (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
        <path d="M12 12V8" />
      </svg>
    );
  }
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      kicker="04 / Experience"
      title="Training and lab work, in order."
      lede={experienceNote}
      className="hairline"
    >
      <ol className="tl flex flex-col gap-8 md:gap-10">
        {experience.map((entry: ExperienceEntry, i: number) => (
          <Reveal as="li" key={entry.id} delay={i * 110} className="tl__item">
            {/* Rail node dot on the vertical timeline */}
            <span className="tl__node" aria-hidden="true" />

            {/* Content row: Meta column + Glassy card */}
            <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-start lg:gap-7">
              {/* Meta column — aligns dates vertically on desktop */}
              <div className="flex shrink-0 flex-col items-start gap-2 lg:w-56 lg:pt-1">
                <time className="font-mono text-xs leading-relaxed tracking-[0.06em] text-zinc-300 tabular-nums">
                  {entry.period ?? `${entry.start} — ${entry.end}`}
                </time>
                <span className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                  <ModeIcon mode={entry.mode} />
                  {entry.location}
                </span>
                {entry.mostRecent ? (
                  <span className="tag tag--accent mt-0.5 shadow-[0_0_12px_rgba(232,163,61,0.25)]">
                    Most recent
                  </span>
                ) : null}
              </div>

              {/* Glassy surface card */}
              <div className="surface-card sheen lift edge-rule min-w-0 flex-1 p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="tag">{entry.kindBadge ?? (entry.kind === "training" ? "Program" : "Employment")}</span>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-400">
                    {entry.organization}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-zinc-100 sm:text-xl">
                  {entry.role ?? entry.program}
                </h3>

                {/* Bullets with glowing accent dots */}
                <ul className="mt-5 flex max-w-[68ch] flex-col gap-2.5">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500 shadow-[0_0_8px_rgba(232,163,61,0.8)]"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technology and focus tags */}
                {entry.tags && entry.tags.length > 0 ? (
                  <ul
                    className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-5"
                    aria-label="Technologies and focus areas"
                  >
                    {entry.tags.map((tag) => (
                      <li key={tag}>
                        <span className="tag transition-colors hover:border-signal-500/40 hover:text-signal-300">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
