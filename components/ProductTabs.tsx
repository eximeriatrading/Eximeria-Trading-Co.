"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Icon from "./Icon";
import { CATEGORIES } from "@/lib/content";

export default function ProductTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  // Deep-linking: /products#textiles-apparel opens that tab (used by Home, footer and "View details").
  const syncFromHash = useCallback(() => {
    const slug = window.location.hash.slice(1);
    const idx = CATEGORIES.findIndex((c) => c.slug === slug);
    if (idx >= 0) {
      setActive(idx);
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [syncFromHash]);

  const select = (i: number, focus = false) => {
    setActive(i);
    history.replaceState(null, "", `#${CATEGORIES[i].slug}`);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const n = CATEGORIES.length;
    if (e.key === "ArrowRight") select((active + 1) % n, true);
    else if (e.key === "ArrowLeft") select((active - 1 + n) % n, true);
    else if (e.key === "Home") select(0, true);
    else if (e.key === "End") select(n - 1, true);
    else return;
    e.preventDefault();
  };

  const c = CATEGORIES[active];

  return (
    <div ref={rootRef} id="categories">
      <div className="tabs-h" role="tablist" aria-label="Trade categories" onKeyDown={onKeyDown}>
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.slug}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`tab-${cat.slug}`}
            aria-selected={i === active}
            aria-controls={`panel-${cat.slug}`}
            tabIndex={i === active ? 0 : -1}
            className="tab-chip"
            onClick={() => select(i)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div key={c.slug} className="product-panel" role="tabpanel" id={`panel-${c.slug}`} aria-labelledby={`tab-${c.slug}`}>
        <div className="product-panel__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.image} alt={c.title} />
          <span className="photo-tag">{c.tagline}</span>
        </div>
        <div className="product-panel__body">
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <span className="eyebrow">Product Range</span>
          <ul className="check-list">
            {c.range.map((item) => (
              <li key={item}>
                <Icon name="check" />
                {item}
              </li>
            ))}
          </ul>
          <div className="cert-bar">
            <strong>Certifications:</strong>
            {c.certifications}
          </div>
          <Link href={`/contact?category=${c.slug}`} className="btn btn--primary">
            <Icon name="chat" className="btn-icon" />
            Inquire about {c.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
