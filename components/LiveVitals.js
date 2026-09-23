"use client";
import { useEffect, useState } from "react";

// Real numbers, measured in the visitor's own browser right now. Nothing here is invented.
export default function LiveVitals() {
  const [v, setV] = useState({ lcp: null, cls: 0, load: null, kb: null });

  useEffect(() => {
    let cls = 0;
    const update = (patch) => setV((p) => ({ ...p, ...patch }));
    const obs = [];
    const watch = (type, cb) => {
      try {
        const o = new PerformanceObserver((list) => cb(list.getEntries()));
        o.observe({ type, buffered: true });
        obs.push(o);
      } catch {}
    };
    watch("largest-contentful-paint", (e) => update({ lcp: e[e.length - 1].startTime }));
    watch("layout-shift", (e) => {
      e.forEach((x) => { if (!x.hadRecentInput) cls += x.value; });
      update({ cls });
    });
    const nav = performance.getEntriesByType("navigation")[0];
    const done = () => {
      const n = performance.getEntriesByType("navigation")[0];
      const bytes = performance.getEntriesByType("resource").reduce((s, r) => s + (r.transferSize || 0), 0) + (n?.transferSize || 0);
      update({ load: n?.domContentLoadedEventEnd || null, kb: bytes ? bytes / 1024 : null });
    };
    if (nav && document.readyState === "complete") done();
    else window.addEventListener("load", () => setTimeout(done, 0), { once: true });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  const fmt = (n, unit, d = 0) => (n == null ? "…" : `${n.toFixed(d)}${unit}`);
  const rows = [
    ["Largest paint", fmt(v.lcp, " ms"), v.lcp != null && v.lcp <= 2500],
    ["Layout shift", v.cls.toFixed(3), v.cls <= 0.1],
    ["DOM ready", fmt(v.load, " ms"), v.load != null && v.load <= 2000],
    ["Transferred", v.kb == null ? "…" : `${v.kb.toFixed(0)} KB`, null],
  ];

  return (
    <aside className="vitals" aria-label="Live performance readings for this page">
      <p className="vitals__head">This page, measured in your browser just now.</p>
      <dl>
        {rows.map(([k, val, good]) => (
          <div key={k} className={good ? "is-good" : ""}>
            <dt>{k}</dt>
            <dd>{val}</dd>
          </div>
        ))}
      </dl>
      <p className="vitals__note">Results vary with your device and connection. Highlighted values are inside Google’s “good” thresholds.</p>
    </aside>
  );
}
