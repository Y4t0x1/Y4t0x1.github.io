import { identity, heroChips } from "@/data/cv";
import { TypeText } from "./TypeText";
import { PointerGlow } from "./PointerGlow";
import { SurfaceReticle } from "./SurfaceReticle";

const nameWords = identity.name.split(" ");

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-texture" />
      <div aria-hidden="true" className="hero-scan" />
      <PointerGlow />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-600/60 to-transparent"
      />

      <div className="shell relative py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 xl:gap-20">
          {/* ======================================================= copy */}
          <div className="flex flex-col items-start">
            <p className="kicker hero-anim" style={{ animationDelay: "0s" }}>
              Portfolio · Offensive Security
            </p>

            <h1
              id="hero-title"
              className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl"
            >
              {nameWords.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="hero-anim mr-[0.28em] inline-block last:mr-0"
                  style={{ animationDelay: `${0.15 + i * 0.12}s` }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="mt-3 font-mono text-base text-signal-400 sm:text-lg">
              <TypeText text={identity.title} delay={750} speed={40} />
            </p>

            <p
              className="hero-anim mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
              style={{ animationDelay: "0.95s" }}
            >
              Hands-on experience assessing web, mobile, and infrastructure targets — identifying,
              exploiting, and clearly reporting security weaknesses through lab-based training and
              structured penetration-testing methodologies.
            </p>

            <div
              className="hero-anim mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "1.1s" }}
            >
              <a href="#work" className="btn-primary">
                View Security Work
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#experience" className="btn-secondary">
                View Experience
              </a>
              <a href="#contact" className="btn-secondary">
                Contact
              </a>
              <a
                href={identity.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            <ul
              className="mt-10 flex flex-wrap gap-2"
              aria-label="Technical capability indicators"
            >
              {heroChips.map((chip, i) => (
                <li
                  key={chip}
                  className="hero-anim mono-chip"
                  style={{ animationDelay: `${1.3 + i * 0.07}s` }}
                >
                  <span aria-hidden="true" className="mr-2 text-signal-500">
                    ›
                  </span>
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          {/* ===================================================== visual: sensor dial */}
          <div
            className="hero-anim group relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-none lg:translate-x-[70px]"
            style={{ animationDelay: "0.35s" }}
            aria-hidden="true"
          >
            <div className="relative p-2 sm:p-4">
              {/* Radial ambient bloom behind sensor reticle */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(232,163,61,0.2),transparent_68%)] blur-3xl opacity-75 transition-opacity duration-500 group-hover:opacity-100"
              />
              <SurfaceReticle />
              {/* Framing instrument brackets */}
              <span className="pointer-events-none absolute left-0 top-1/4 h-px w-8 bg-white/20 transition-colors duration-500 group-hover:bg-signal-500/50" />
              <span className="pointer-events-none absolute right-0 top-1/4 h-px w-8 bg-white/20 transition-colors duration-500 group-hover:bg-signal-500/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
