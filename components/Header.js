"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { navigation, headerCta } from "@/data/navigation";

const isActive = (pathname, href) => pathname === href || pathname?.startsWith(href + "/");

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll + Escape to close while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Hide the entire public header on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="header__inner container">
        <Logo />
        <div className="header__end">
          <nav className="header__nav" aria-label="Primary">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                data-cursor="link"
              >
                {item.label}
              </Link>
            ))}
            <Link href={headerCta.href} className="btn btn--small" data-cursor="open">
              {headerCta.label} <span aria-hidden="true">↗</span>
            </Link>
          </nav>
          <ThemeToggle />
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-btn__label">{open ? "Close" : "Menu"}</span>
            <span className="menu-btn__bars" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="overlay" aria-hidden={!open} role="dialog" aria-label="Menu">
        <nav className="overlay__nav container" aria-label="Mobile">
          {[{ label: "Home", href: "/" }, ...navigation].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ "--i": i }}
              aria-current={item.href !== "/" && isActive(pathname, item.href) ? "page" : pathname === "/" && item.href === "/" ? "page" : undefined}
              tabIndex={open ? 0 : -1}
            >
              {item.label}
            </Link>
          ))}
          <Link href={headerCta.href} className="btn btn--primary overlay__cta" tabIndex={open ? 0 : -1}>
            {headerCta.label} <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}