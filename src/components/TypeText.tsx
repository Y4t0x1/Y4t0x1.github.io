"use client";

import { useEffect, useState } from "react";

type TypeTextProps = {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
};

export function TypeText({ text, className = "", speed = 42, delay = 700 }: TypeTextProps) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(text);
      setDone(true);
      return;
    }

    let i = 0;
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {typed}
        <span className="caret">▌</span>
      </span>
    </span>
  );
}
