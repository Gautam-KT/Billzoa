"use client";
import { useEffect, useState } from "react";

const KEY = "billzoa-theme";

// The initial theme is applied by an inline script in <head> (no flash). This component only flips and remembers it.
// Until someone chooses, the site follows the operating-system preference (and updates if that changes).
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystem = (e) => {
      try { if (localStorage.getItem(KEY)) return; } catch {}
      const next = e.matches ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    mq.addEventListener("change", onSystem);
    return () => mq.removeEventListener("change", onSystem);
  }, []);

  const toggle = () => {
    const next = (document.documentElement.dataset.theme || "dark") === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem(KEY, next); } catch {}
  };

  const label = theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Toggle color theme";

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label} data-cursor="link">
      <svg className="i-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
      </svg>
      <svg className="i-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
      </svg>
    </button>
  );
}
