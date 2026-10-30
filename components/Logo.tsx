import Link from "next/link";

// Placeholder "EC" monogram drawn in SVG. To use the real logo file, drop it in
// /public/logo.png and replace the <svg> with <img src="/logo.png" alt="Eximeria Trading Co." />.
export default function Logo({ plate = false }: { plate?: boolean }) {
  return (
    <Link href="/" className={`logo${plate ? " logo--plate" : ""}`} aria-label="Eximeria Trading Co. home">
      <svg className="logo__mark" viewBox="0 0 52 34" aria-hidden="true">
        <path d="M2 4h20v6H9v4h11v6H9v4h13v6H2z" fill="#CE9117" stroke="#0E0F14" strokeWidth="1.4" />
        <path d="M50 4H32a6 6 0 0 0-6 6v14a6 6 0 0 0 6 6h18v-6H33V10h17z" fill="#0E0F14" />
        <rect x="35" y="14" width="15" height="6" fill="#CE9117" />
      </svg>
      <span className="logo__divider" />
      <span className="logo__word">
        Eximeria
        <br />
        Trading
        <br />
        Co.
      </span>
    </Link>
  );
}
