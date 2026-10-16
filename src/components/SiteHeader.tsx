"use client";

import { useEffect, useState } from "react";
import { navLinks, identity } from "@/data/cv";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? doc.scrollTop / max : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = navLinks
      .filter((link) => link.href.startsWith("#"))
      .map((link) => document.querySelector(link.href) as HTMLElement | null)
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const linkClass = (href: string) =>
    `nav-link focus-ring rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-zinc-100 ${
      active === href ? "text-zinc-50" : "text-zinc-400"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="focus-ring flex items-center gap-2 rounded-md text-sm font-semibold text-zinc-100"
        >
          <span aria-hidden="true" className="font-mono text-signal-500">
            hh
          </span>
          <span className="hidden sm:inline">{identity.name}</span>
          <span className="sm:hidden">{identity.title}</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  className={linkClass(link.href)}
                >
                  <span className="inline-flex items-center gap-1">
                    {link.label}
                    {link.external && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-signal-400/80" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                      </svg>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-white/30 hover:bg-white/5 focus-ring sm:inline-flex"
          >
            Contact
          </a>
          <button
            type="button"
            className="focus-ring rounded-md border border-white/15 p-2 text-zinc-200 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary mobile"
        className={`border-t border-white/10 lg:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="shell grid gap-1 py-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`nav-link focus-ring flex items-center justify-between rounded-md px-3 py-2.5 text-sm hover:bg-white/5 ${
                  active === link.href ? "text-zinc-50" : "text-zinc-300 hover:text-zinc-100"
                }`}
              >
                <span>{link.label}</span>
                {link.external && (
                  <span className="flex items-center gap-1 font-mono text-xs text-signal-400">
                    Blog
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}
