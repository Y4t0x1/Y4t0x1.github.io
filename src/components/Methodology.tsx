import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { methodology } from "@/data/cv";

export function Methodology() {
  return (
    <Section
      id="methodology"
      kicker="09 / Methodology"
      title="Penetration testing workflow"
      lede="A standard methodology/approach used to structure lab exercises and training scenarios — not a claim that every step was performed on a specific client engagement."
      className="hairline"
    >
      <Reveal>
        <div className="relative">
          <span
            aria-hidden="true"
            className="method-line absolute left-0 right-0 top-0 hidden h-px bg-gradient-to-r from-signal-500 via-signal-600/50 to-transparent xl:block"
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {methodology.map((item, i) => (
              <Reveal as="li" key={item.step} delay={i * 90} className="card relative p-5">
                <span className="font-mono text-xs text-signal-500">{item.step}</span>
                <h3 className="mt-2 text-sm font-semibold text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{item.description}</p>
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-5 font-mono text-xs text-zinc-700 max-xl:hidden xl:block"
                >
                  {item.step !== "07" ? "→" : ""}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-zinc-600">
          Note: arrows indicate sequence. In practice the workflow iterates — enumeration feeds new
          hypotheses, and reporting runs continuously rather than only at the end.
        </p>
      </Reveal>
    </Section>
  );
}
