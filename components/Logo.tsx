import Link from "next/link";

// `plate` puts the logo on a white plate, for dark backgrounds such as the footer.
export default function Logo({ plate = false }: { plate?: boolean }) {
  return (
    <Link href="/" className={`logo${plate ? " logo--plate" : ""}`} aria-label="Eximeria Trading Co. home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo__img" src="/logo.png" alt="" width={660} height={240} />
    </Link>
  );
}
