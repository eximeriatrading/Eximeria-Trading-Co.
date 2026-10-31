import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { CATEGORIES, HOME_WHY, REGIONS, STATS } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* 5.1 Hero */}
      <section className="hero">
        <div className="hero__bg" style={{ backgroundImage: "url(/images/hero-port-poster.jpg)" }} />
        <HeroVideo />
        <div className="hero__overlay" />
        <div className="container">
          <div className="hero__content">
            <span className="eyebrow-pill">Global Import &amp; Export Trading</span>
            <h1 className="h1">
              We Move Markets.
              <br />
              <span className="gold">We Deliver Results.</span>
            </h1>
            <p className="lead">
              Eximeria Trading Co. connects global buyers and sellers across agri, textiles, machinery, raw materials,
              and consumer goods — with precision, compliance, and scale.
            </p>
            <div className="btn-row">
              <Link href="/contact?role=buyer" className="btn btn--primary">
                I&apos;m a Buyer <span className="arrow">→</span>
              </Link>
              <Link href="/contact?role=seller" className="btn btn--ghost">
                I&apos;m a Seller <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          Scroll
          <span className="scroll-cue__line" />
        </div>
      </section>

      {/* 5.2 Stats strip */}
      <section className="stats" aria-label="Key figures">
        <div className="container stats__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat__value">{s.value}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5.3 Trade Categories bento */}
      <section className="section section--white">
        <div className="container">
          <Reveal className="section-head section-head--split">
            <div>
              <span className="eyebrow">Trade Categories</span>
              <h2 className="h2">
                Every Market.
                <br />
                Every Commodity.
              </h2>
            </div>
            <p className="lead">Five major verticals. Hundreds of product lines. One trusted partner.</p>
          </Reveal>
          <div className="bento">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 70} className={i === 0 ? "bento__item--feature" : ""}>
                <a href={`/products#${c.slug}`} className="cat-card" style={{ height: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt="" loading="lazy" />
                  <span className="badge-gold">{c.badge}</span>
                  <h3>{c.title}</h3>
                  <p>{c.short}</p>
                  <span className="link-arrow">
                    Explore <span>›</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5.4 Why Eximeria */}
      <section className="section section--cream">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Why Eximeria</span>
            <h2 className="h2">
              Trade without the
              <br />
              complexity.
            </h2>
            <p className="lead">
              We manage the full import-export cycle — sourcing, compliance, documentation, freight, and delivery — so
              your team can focus on growth, not logistics.
            </p>
            <Link href="/services" className="btn btn--primary">
              Our Services <span className="arrow">→</span>
            </Link>
          </Reveal>
          <div className="feature-stack">
            {HOME_WHY.map((f, i) => (
              <Reveal key={f.title} delay={i * 80} className="feature-card">
                <span className="icon-tile">
                  <Icon name={f.icon} />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 Global Reach */}
      <section className="section section--dark reach">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow">Global Reach</span>
            <h2 className="h2">Active in 50+ countries.</h2>
            <p className="lead">
              Our trade network spans every major sourcing and destination market across six continents.
            </p>
          </Reveal>
          <div className="grid-4">
            {REGIONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 80} className="dark-card region-card">
                <h3>{r.title}</h3>
                <p>{r.countries}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5.6 CTA band */}
      <div className="cta-wrap">
        <div className="container">
          <Reveal className="cta-band cta-band--split">
            <div>
              <h2>Ready to source or sell globally?</h2>
              <p>
                Whether you&apos;re a buyer looking for reliable supply or a seller seeking new markets, our trade desk
                is ready to help.
              </p>
              <p className="micro">Typical response time: within 24 hours.</p>
            </div>
            <div className="btn-row">
              <Link href="/contact?role=buyer" className="btn btn--inverse">
                I&apos;m a Buyer <span className="arrow">→</span>
              </Link>
              <Link href="/contact?role=seller" className="btn btn--inverse-ghost">
                I&apos;m a Seller <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
