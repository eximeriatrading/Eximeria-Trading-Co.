import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero page-hero--center" style={{ padding: "140px 0" }}>
      <div className="container">
        <span className="eyebrow">404</span>
        <h1 className="h1">This route doesn&apos;t exist.</h1>
        <p className="lead">The page you&apos;re looking for has moved or never shipped.</p>
        <div className="btn-row" style={{ justifyContent: "center", marginTop: 32 }}>
          <Link href="/" className="btn btn--primary">Back to Home</Link>
          <Link href="/contact" className="btn btn--ghost">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
