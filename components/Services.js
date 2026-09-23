import ServiceRow from "./ServiceRow";
import SectionHead from "./SectionHead";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default function Services() {
  return (
    <section className="section container" aria-labelledby="services-title">
      <SectionHead id="services-title" title={site.services.title} copy={site.services.copy} />
      <ul className="services">
        {services.map((s, i) => <ServiceRow key={s.id} service={s} index={i} />)}
      </ul>
    </section>
  );
}
