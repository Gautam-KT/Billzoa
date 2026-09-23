import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = { ...buildMetadata({ title: "Page not found", path: "/404" }), robots: { index: false } };

export default function NotFound() {
  return (
    <section className="page-head container">
      <h1 className="display-lg">Nothing here.</h1>
      <p className="lede">That page doesn’t exist, or it moved. Head back to the work.</p>
      <p><Link className="btn btn--primary" href="/" data-cursor="open">Back to home</Link></p>
    </section>
  );
}
