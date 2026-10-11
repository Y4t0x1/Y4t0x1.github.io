import { Reveal } from "./Reveal";
import { profile, positioning, languages } from "@/data/cv";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="hairline py-16 sm:py-20">
      <div className="shell">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Narrative: Kicker, Title, Positioning Lede & Body */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-7 xl:col-span-8">
            <Reveal y={18}>
              <p className="kicker">01 / About</p>
              <h2 id="about-title" className="section-title">
                Security work grounded in evidence, not adjectives
              </h2>
              <p className="section-lede mt-4">{positioning}</p>
            </Reveal>

            <Reveal delay={80} className="space-y-4">
              <p className="text-[0.975rem] leading-relaxed text-zinc-300">{profile}</p>
              <p className="text-[0.975rem] leading-relaxed text-zinc-400">
                My strongest documented areas span web and API security, infrastructure and network
                penetration testing, Active Directory attack techniques, Android application testing,
                and vulnerability assessment. I complement offensive work with defensive exposure from
                SOC and incident-response training, and I treat reporting as part of the test — not an
                afterthought.
              </p>
            </Reveal>
          </div>

          {/* Quick facts card: aligned to the same top level and matching height */}
          <div className="flex lg:col-span-5 xl:col-span-4">
            <Reveal
              as="aside"
              delay={140}
              aria-label="Quick facts"
              className="card flex h-full w-full flex-col justify-between p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-mono text-xs uppercase tracking-label text-signal-500">
                    At a glance
                  </h3>
                  <span className="h-1.5 w-1.5 rounded-full bg-signal-500 shadow-[0_0_8px_rgba(232,163,61,0.6)]" />
                </div>

                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-zinc-500">Title</dt>
                    <dd className="mt-1 font-medium text-zinc-200">Junior Penetration Tester</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Based in</dt>
                    <dd className="mt-1 font-medium text-zinc-200">Cairo, Egypt</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Education</dt>
                    <dd className="mt-1 font-medium text-zinc-200">
                      B.Sc. Information Technology — GPA 3.5 / 4
                    </dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Languages</dt>
                    <dd className="mt-1 space-y-1 font-medium text-zinc-200">
                      {languages.map((lang) => (
                        <p key={lang.name}>
                          {lang.name} <span className="font-normal text-zinc-500">— {lang.level}</span>
                        </p>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
