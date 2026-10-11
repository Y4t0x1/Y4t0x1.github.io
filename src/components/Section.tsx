import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  kicker: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, kicker, title, lede, children, className = "" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-16 sm:py-20 ${className}`}>
      <div className="shell">
        <Reveal y={18}>
          <p className="kicker">{kicker}</p>
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
          {lede ? <p className="section-lede">{lede}</p> : null}
        </Reveal>
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}
