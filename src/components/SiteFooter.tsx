import { identity } from "@/data/cv";

export function SiteFooter() {
  return (
    <footer className="hairline py-10">
      <div className="shell flex flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-zinc-300">{identity.name}</span> · {identity.title} · {identity.location}
        </p>
        <p className="font-mono text-xs">
          Built with Next.js &amp; Tailwind CSS ·{" "}
          <a href="https://y4t0x1.github.io/blog" className="text-zinc-400 transition-colors hover:text-signal-400">
            Writeups &amp; Blog
          </a>{" "}
          · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
