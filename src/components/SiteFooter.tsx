import { identity } from "@/data/cv";

export function SiteFooter() {
  return (
    <footer className="hairline py-10">
      <div className="shell flex flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-zinc-300">{identity.name}</span> · {identity.title} · {identity.location}
        </p>
        <p className="font-mono text-xs">
          Built with Next.js, TypeScript &amp; Tailwind CSS · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
