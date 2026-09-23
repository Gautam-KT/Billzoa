"use client";
import { useEffect, useRef } from "react";

// Desktop-only cursor. Elements opt in with data-cursor="view" | "open" | "link".
// Anything else interactive (a, button…) gets the expanded "link" state automatically.
export default function CustomCursor() {
  const dot = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = dot.current;
    const root = document.documentElement;
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0, shown = false;

    const tick = () => {
      cx += (x - cx) * (reduce ? 1 : 0.22);
      cy += (y - cy) * (reduce ? 1 : 0.22);
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; cx = x; cy = y; root.classList.add("cursor-on"); }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onOver = (e) => {
      const t = e.target instanceof Element ? e.target : null;
      const tagged = t?.closest("[data-cursor]");
      const text = t?.closest("input, textarea, select");
      let state = "";
      let word = "";
      if (text) state = "text";
      else if (tagged && tagged.dataset.cursor === "view") { state = "label"; word = "VIEW"; }
      else if (tagged && tagged.dataset.cursor === "open") { state = "label"; word = "OPEN"; }
      else if (tagged || t?.closest("a, button, summary, [role=button]")) state = "link";
      el.dataset.state = state;
      label.current.textContent = word;
    };
    const onLeave = () => { el.dataset.state = "hidden"; };
    const onEnter = () => { el.dataset.state = ""; };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("cursor-on");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div ref={dot} className="cursor" aria-hidden="true">
      <span ref={label} className="cursor__label" />
    </div>
  );
}
