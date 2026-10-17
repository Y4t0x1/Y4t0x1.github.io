import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { identity } from "@/data/cv";

export function Contact() {
  return (
    <Section
      id="contact"
      kicker="10 / Contact"
      title="Get in touch"
      lede="Open to junior penetration testing roles, security consultancy conversations, and authorized testing opportunities."
      className="hairline"
    >
      <Reveal>
        <div className="card p-6 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm leading-relaxed text-zinc-400">
              The fastest way to reach me is email. For professional context, my LinkedIn is the
              best place to verify credentials and training history.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${identity.email}`} className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                Email me
              </a>
              <a
                href={identity.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          <dl className="space-y-4 text-sm">
            <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
              <dt className="font-mono text-[0.68rem] uppercase tracking-label text-zinc-500">
                Email
              </dt>
              <dd>
                <a
                  href={`mailto:${identity.email}`}
                  className="focus-ring rounded-md text-zinc-200 hover:text-signal-400 break-all"
                >
                  {identity.email}
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
              <dt className="font-mono text-[0.68rem] uppercase tracking-label text-zinc-500">
                LinkedIn
              </dt>
              <dd>
                <a
                  href={identity.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring rounded-md text-zinc-200 hover:text-signal-400 break-all"
                >
                  {identity.linkedinLabel}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
              <dt className="font-mono text-[0.68rem] uppercase tracking-label text-zinc-500">
                GitHub
              </dt>
              <dd className="placeholder-slot inline-block w-fit">
                [ADD GITHUB URL]
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-mono text-[0.68rem] uppercase tracking-label text-zinc-500">
                Location
              </dt>
              <dd className="text-zinc-200">{identity.location}</dd>
            </div>
          </dl>
        </div>
      </div>
      </Reveal>
    </Section>
  );
}
