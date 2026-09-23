"use client";
import { useEffect, useRef } from "react";

// Adds `.in` once the element scrolls into view. CSS handles the motion; variants: clip | image | fade.
// Only used where a reveal earns its place (headings, hero imagery) — not on every element.
export default function Reveal({ as: Tag = "div", variant = "clip", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-reveal={variant} style={{ "--d": `${delay}ms` }} className={className} {...rest}>
      {/* The observed element is never clipped (browsers treat a clipped target as not intersecting); the inner wrapper carries the motion. */}
      <span className="reveal__inner">{children}</span>
    </Tag>
  );
}
