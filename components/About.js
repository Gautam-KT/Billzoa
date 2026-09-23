import SectionHead from "./SectionHead";
import Founder from "./Founder";
import { site } from "@/data/site";

export default function About() {
  return (
    <section className="section container" aria-labelledby="about-title">
      <SectionHead id="about-title" title={site.about.title} copy={site.about.copy} />
      <ul className="principles">
        {site.about.principles.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <Founder />
    </section>
  );
}
