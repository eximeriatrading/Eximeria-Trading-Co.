import Link from "next/link";
import Logo from "./Logo";
import { CATEGORIES, SERVICES, SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <Logo plate />
            <p>{SITE.tagline}</p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          </div>
          <div className="footer__col">
            <h4>Trade Categories</h4>
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <a href={`/products#${c.slug}`}>{c.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a href={`/services#${s.slug}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Trade Services</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
            <h4 style={{ marginTop: 28 }}>Certifications</h4>
            <div className="cert-badges">
              {SITE.certifications.map((c) => (
                <span key={c} className="cert-badge">{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {SITE.name} All rights reserved.</span>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
