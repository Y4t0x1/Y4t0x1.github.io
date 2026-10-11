import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { capabilityGroups } from "@/data/cv";

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      kicker="02 / Capabilities"
      title="Security capabilities"
      lede="Grouped by attack surface. Every item below appears in the CV — as skills, lab exercises, or documented coursework."
      className="hairline"
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {capabilityGroups.map((group, i) => (
          <Reveal
            as="article"
            key={group.id}
            delay={i * 80}
            className="card flex flex-col p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-zinc-100">{group.title}</h3>
              <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-signal-500" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">{group.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="mono-chip">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
