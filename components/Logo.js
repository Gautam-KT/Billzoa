import Link from "next/link";
import { site } from "@/data/site";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`logo ${className}`} aria-label={`${site.name} — home`} data-cursor="link">
      <span className="logo__word">{site.name}</span>
      <span className="logo__dot" aria-hidden="true" />
    </Link>
  );
}
