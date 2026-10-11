import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { certifications, courses, education } from "@/data/cv";

function VerifyMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-signal-500"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function Credentials() {
  return (
    <>
      <Section
        id="certifications"
        kicker="05 / Certifications"
        title="Certifications"
        lede="Names and issuers exactly as documented in the CV. Issue dates are omitted because the CV does not list them."
        className="hairline"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal
              as="li"
              key={cert.name}
              delay={i * 70}
              className="card flex items-start gap-3 p-5"
            >
              <span className="mt-0.5">
                <VerifyMark />
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-100">{cert.name}</p>
                <p className="mt-1 text-xs text-zinc-500">{cert.issuer}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section
        id="courses"
        kicker="06 / Courses"
        title="Courses & training"
        lede="Course completions exactly as documented in the CV. Coursework is listed separately from certifications."
        className="hairline"
      >
        <ol className="grid gap-3 sm:grid-cols-2">
          {courses.map((course, i) => (
            <Reveal
              as="li"
              key={course.name}
              delay={i * 55}
              className="card flex items-baseline gap-4 p-4"
            >
              <span className="font-mono text-xs text-signal-600" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm text-zinc-200">{course.name}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{course.issuer}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="education" kicker="07 / Education" title="Education" className="hairline">
        <Reveal>
          <div className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">{education.degree}</h3>
                <p className="mt-1 text-sm text-zinc-400">{education.institution}</p>
                <p className="mt-1 text-xs text-zinc-500">{education.location}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm text-signal-400">{education.period}</p>
                <p className="mt-1 text-xs text-zinc-500">GPA: {education.gpa}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
