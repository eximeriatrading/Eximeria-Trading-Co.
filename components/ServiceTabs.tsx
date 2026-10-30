"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Icon from "./Icon";
import { SERVICES } from "@/lib/content";

export default function ServiceTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  // Deep-linking: /services#freight-logistics opens that tab (used by the footer and service cards).
  const syncFromHash = useCallback(() => {
    const idx = SERVICES.findIndex((s) => s.slug === window.location.hash.slice(1));
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
    history.replaceState(null, "", `#${SERVICES[i].slug}`);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const n = SERVICES.length;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") select((active + 1) % n, true);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") select((active - 1 + n) % n, true);
    else if (e.key === "Home") select(0, true);
    else if (e.key === "End") select(n - 1, true);
    else return;
    e.preventDefault();
  };

  const s = SERVICES[active];

  return (
    <div ref={rootRef} className="service-tabs">
      <div className="tabs-v" role="tablist" aria-orientation="vertical" aria-label="Service areas" onKeyDown={onKeyDown}>
        {SERVICES.map((svc, i) => (
          <button
            key={svc.slug}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`tab-${svc.slug}`}
            aria-selected={i === active}
            aria-controls={`panel-${svc.slug}`}
            tabIndex={i === active ? 0 : -1}
            className="tab-row"
            onClick={() => select(i)}
          >
            <span className="icon-tile">
              <Icon name={svc.icon} />
            </span>
            {svc.title}
          </button>
        ))}
      </div>
      <div key={s.slug} className="service-panel" role="tabpanel" id={`panel-${s.slug}`} aria-labelledby={`tab-${s.slug}`}>
        <div className="service-panel__head">
          <span className="icon-tile icon-tile--solid">
            <Icon name={s.icon} />
          </span>
          <h3>{s.title}</h3>
        </div>
        <p>{s.description}</p>
        <span className="eyebrow">What&apos;s Included</span>
        <ul className="check-list">
          {s.included.map((item) => (
            <li key={item}>
              <Icon name="check" />
              {item}
            </li>
          ))}
        </ul>
        <Link href={`/contact?service=${s.slug}`} className="btn btn--primary">
          Enquire about this service <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
