"use client";

import { createElement, useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";

type RevealProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

// Global shared observer to handle all reveal nodes with minimal overhead
let sharedObserver: IntersectionObserver | null = null;
const revealCallbacks = new Map<Element, () => void>();

function getSharedObserver() {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = revealCallbacks.get(entry.target);
            if (cb) {
              cb();
              revealCallbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        }
      },
      { rootMargin: "0px 0px 150px 0px", threshold: 0.01 },
    );
  }
  return sharedObserver;
}

export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 16,
  once = true,
  className = "",
  style,
  ...rest
}: RevealProps) {
  const nodeRef = useRef<HTMLElement | null>(null);
  // Default to visible so initial paint and SSR are 100% visible
  const [status, setStatus] = useState<"visible" | "hidden">("visible");

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStatus("visible");
      return;
    }

    // Check if the element is already in or near viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100 && rect.bottom > 0) {
      setStatus("visible");
      return;
    }

    // Element is genuinely below the fold: set to hidden so it animates when scrolled into view
    setStatus("hidden");

    const revealElement = () => {
      setStatus("visible");
    };

    const obs = getSharedObserver();
    if (obs) {
      revealCallbacks.set(el, revealElement);
      obs.observe(el);
    }

    // Passive scroll listener fallback for guaranteed reliability
    const onScroll = () => {
      const currentRect = el.getBoundingClientRect();
      if (currentRect.top < window.innerHeight + 200 && currentRect.bottom > 0) {
        revealElement();
        revealCallbacks.delete(el);
        obs?.unobserve(el);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Safety timeout: ensure no element is ever stuck in a hidden state
    const timer = setTimeout(() => {
      revealElement();
    }, 2000);

    return () => {
      clearTimeout(timer);
      revealCallbacks.delete(el);
      obs?.unobserve(el);
      window.removeEventListener("scroll", onScroll);
    };
  }, [once]);

  const statusClass = status === "hidden" ? "is-hidden" : "is-visible";

  return createElement(as, {
    ...rest,
    ref: nodeRef,
    className: `reveal ${statusClass} ${className}`.trim(),
    style: {
      ...style,
      "--reveal-delay": `${delay}ms`,
      "--reveal-y": `${y}px`,
    } as React.CSSProperties,
    children,
  });
}
