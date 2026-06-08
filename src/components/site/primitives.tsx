"use client";

// Gravii - shared hooks + small components (Concept A · Plainspoken).
// Ported from the Claude Design handoff (gravii-util.jsx + gravii-surfaces helpers).

import { useState, useEffect, useRef, type ReactNode, type CSSProperties, type ElementType } from "react";

export const prefersReduced = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveal-on-scroll: returns [ref, inView]. Fires once, then settles.
// Robust against flaky IntersectionObserver: immediate in-viewport check for
// above-the-fold, IO for scroll, and a hard fallback timer so nothing stays hidden.
export function useInView(opts: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) { setInView(true); return; }
    if (prefersReduced()) { setInView(true); return; }
    let done = false;
    const show = () => { if (!done) { done = true; setInView(true); } };
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    if (r.top < vh * 0.96 && r.bottom > 0) show();
    let io: IntersectionObserver | undefined;
    try {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) show(); });
      }, { threshold: opts.threshold ?? 0.15, rootMargin: opts.rootMargin ?? "0px 0px -5% 0px" });
      io.observe(el);
    } catch { show(); }
    const t = setTimeout(show, 1400);
    return () => { if (io) io.disconnect(); clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as const;
}

// Slow, calm step cycle (one motion at a time). Only runs while `active`.
export function useSlowCycle(steps: number, period: number, active: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active || prefersReduced() || steps <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % steps), period);
    return () => clearInterval(t);
  }, [active, steps, period]);
  return [i, setI] as const;
}

// Reveal a class after `delay`, re-arming whenever `key` changes.
export function useReveal(delay: number, key: unknown) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(false);
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [key, delay]);
  return on;
}

// Reveal wrapper - adds .in when scrolled into view.
export function Reveal({
  children, delay = 0, className = "", as, style,
}: {
  children: ReactNode; delay?: number; className?: string;
  as?: ElementType; style?: CSSProperties;
}) {
  const [ref, inView] = useInView();
  const Tag = (as || "div") as any;
  return (
    <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</Tag>
  );
}

// ---- wordmark ----
export function Wordmark() {
  return (<span className="gv-wm">gravii<span className="dot" /></span>);
}

// ---- evidence chip ----
export function SourceChip({ name, date }: { name: string; date?: string }) {
  return (
    <span className="gv-chip">
      <span className="src-dot" />
      <span>{name}</span>
      {date && <span className="date">{date}</span>}
    </span>
  );
}
