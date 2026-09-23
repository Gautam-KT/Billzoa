"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";

const { lines, lede, primaryCta, secondaryCta } = site.hero;
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

export default function Hero() {
  const root = useRef(null);
  const canvas = useRef(null);
  const h1 = useRef(null);

  useEffect(() => {
    const section = root.current;
    const cv = canvas.current;
    const ctx = cv.getContext("2d");
    const chars = [...h1.current.querySelectorAll(".ch")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const GAP = 34;
    let dotRgb = "241,242,236", hotRgb = "200,255,62";
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      dotRgb = cs.getPropertyValue("--dot-rgb").trim() || dotRgb;
      hotRgb = cs.getPropertyValue("--hot-rgb").trim() || hotRgb;
    };
    readColors();
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    const mouse = { x: -999, y: -999, sx: -999, sy: -999, inside: false };
    const t = new Float32Array(chars.length); // per-letter influence 0..1

    const size = () => {
      const r = section.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = 170;
      ctx.fillStyle = `rgba(${dotRgb},0.26)`;
      ctx.beginPath();
      const hot = [];
      for (let gx = GAP / 2; gx < w; gx += GAP) {
        for (let gy = GAP / 2; gy < h; gy += GAP) {
          const dx = gx - mouse.sx, dy = gy - mouse.sy;
          const d = Math.hypot(dx, dy);
          if (d < R) {
            const f = 1 - d / R, e = f * f * (3 - 2 * f);
            hot.push([gx + (dx / (d || 1)) * e * 16, gy + (dy / (d || 1)) * e * 16, e]);
          } else ctx.rect(gx - 0.75, gy - 0.75, 1.5, 1.5);
        }
      }
      ctx.fill();
      for (const [x, y, e] of hot) {
        ctx.fillStyle = `rgba(${hotRgb},${0.3 + e * 0.7})`;
        const s = 1.5 + e * 2.5;
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
    };

    const frame = () => {
      raf = 0;
      mouse.sx += (mouse.x - mouse.sx) * 0.14;
      mouse.sy += (mouse.y - mouse.sy) * 0.14;
      let busy = mouse.inside || Math.abs(mouse.x - mouse.sx) + Math.abs(mouse.y - mouse.sy) > 0.5;
      const rs = section.getBoundingClientRect();
      chars.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - (mouse.sx + rs.left), r.top + r.height / 2 - (mouse.sy + rs.top));
        const target = mouse.inside ? clamp(1 - d / 260, 0, 1) : 0;
        t[i] += (target - t[i]) * 0.12;
        if (Math.abs(target - t[i]) > 0.004) busy = true;
        const e = t[i] * t[i] * (3 - 2 * t[i]);
        c.style.fontWeight = Math.round(600 + 200 * e);
        c.style.fontStretch = `${(90 + 10 * e).toFixed(1)}%`;
        const tint = Math.round(Math.min(1, Math.max(0, (e - 0.1) / 0.45)) * 100); // snappy, so light mode skips the muddy brown mid-tones
        c.style.color = tint > 0 ? `color-mix(in srgb, var(--accent) ${tint}%, var(--text-primary))` : "";
      });
      draw();
      if (busy && visible) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      if (!mouse.inside) { mouse.inside = true; if (mouse.sx < -900) { mouse.sx = mouse.x; mouse.sy = mouse.y; } }
      kick();
    };
    const onLeave = () => { mouse.inside = false; mouse.x = mouse.sx; mouse.y = mouse.sy; kick(); };

    size();
    mouse.sx = mouse.sy = -999;
    draw();
    const themeObs = new MutationObserver(() => { readColors(); draw(); });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const ro = new ResizeObserver(() => { size(); draw(); });
    ro.observe(section);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); });
    io.observe(section);

    if (fine && !reduce) {
      section.addEventListener("pointermove", onMove, { passive: true });
      section.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect(); themeObs.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  let n = 0;
  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <canvas ref={canvas} className="hero__grid" aria-hidden="true" />
      <div className="hero__inner container">
        <h1 id="hero-title" ref={h1} className="hero__title" aria-label={lines.join(" ")}>
          {lines.map((line) => (
            <span className="hero__line" key={line} aria-hidden="true">
              {line.split(" ").map((word, wi) => (
                <span className="hero__word" key={wi}>
                  {[...word].map((ch) => (
                    <span className="ch" key={n} style={{ "--i": n++ }}>{ch}</span>
                  ))}
                  {"\u00a0"}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <div className="hero__foot">
          <p className="hero__lede">{lede}</p>
          <div className="hero__ctas">
            <Link href={primaryCta.href} className="btn btn--primary" data-cursor="open">
              {primaryCta.label} <span aria-hidden="true">→</span>
            </Link>
            <a href={secondaryCta.href} className="btn btn--ghost" data-cursor="link">
              {secondaryCta.label} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
