"use client";

import { useEffect, useRef } from "react";

export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = ref.current;
    const host = glow?.parentElement;
    if (!glow || !host) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      host.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      host.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    host.addEventListener("pointermove", onMove);
    return () => host.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} aria-hidden="true" className="pointer-glow" />;
}
