"use client";
import { useEffect, useRef } from "react";

// Words light up as the paragraph scrolls through the viewport. Text stays in the DOM, fully readable without JS.
export default function ScrollText({ children, className = "" }) {
  const ref = useRef(null);
  const words = String(children).split(" ");

  useEffect(() => {
    const el = ref.current;
    const spans = [...el.querySelectorAll(".w")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => s.classList.add("on"));
      return;
    }
    let raf = 0, last = -1;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.88 - r.top) / (vh * 0.5 + r.height * 0.6)));
      const count = Math.round(p * spans.length);
      if (count === last) return;
      spans.forEach((s, i) => s.classList.toggle("on", i < count));
      last = count;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <p ref={ref} className={`scrolltext ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="w">{w}{" "}</span>
      ))}
    </p>
  );
}
