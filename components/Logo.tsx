import Link from "next/link";

// logo.png is for light backgrounds; logo-dark.png is the same artwork with a white wordmark.
// `plate` always shows the light version on a white plate (footer), so it ignores the theme.
export default function Logo({ plate = false }: { plate?: boolean }) {
  return (
    <Link href="/" className={`logo${plate ? " logo--plate" : ""}`} aria-label="Eximeria Trading Co. home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo__img logo__img--light" src="/logo.png" alt="" width={660} height={240} />
      {!plate && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="logo__img logo__img--dark" src="/logo-dark.png" alt="" width={660} height={240} />
      )}
    </Link>
  );
}
