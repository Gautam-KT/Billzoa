import Link from "next/link";
import Reveal from "./Reveal";
import { site } from "@/data/site";

export default function CTA() {
  const { title, copy, label, href } = site.cta;
  return (
    <section className="cta section container" aria-labelledby="cta-title">
      <Reveal as="h2" id="cta-title" className="display-lg cta__title">{title}</Reveal>
      <div className="cta__foot">
        <p className="cta__copy">{copy}</p>
        <div className="cta__actions">
          <Link href={href} className="btn btn--primary btn--xl" data-cursor="open">{label} <span aria-hidden="true">→</span></Link>
          <a href={`mailto:${site.contact.email}`} className="cta__mail" data-cursor="link">{site.contact.email}</a>
        </div>
      </div>
    </section>
  );
}
