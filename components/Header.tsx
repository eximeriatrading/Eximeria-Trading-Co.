"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const links = NAV.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className={`nav-link${isActive(item.href) ? " is-active" : ""}`}
      aria-current={isActive(item.href) ? "page" : undefined}
    >
      {item.label}
    </Link>
  ));

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo />
        <nav className="header__nav" aria-label="Main">
          {links}
        </nav>
        <div className="header__cta">
          <Link href="/contact" className="btn btn--primary">
            Get a Quote
          </Link>
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className={`mobile-nav${open ? " is-open" : ""}`} aria-label="Mobile">
        {links}
        <Link href="/contact" className="btn btn--primary">
          Get a Quote
        </Link>
      </nav>
    </header>
  );
}
