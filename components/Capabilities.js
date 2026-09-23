import SectionHead from "./SectionHead";
import LiveVitals from "./LiveVitals";
import { capabilities } from "@/data/services";
import { site } from "@/data/site";

export default function Capabilities() {
  return (
    <section className="section container" aria-labelledby="capabilities-title">
      <SectionHead id="capabilities-title" title={site.capabilities.title} copy={site.capabilities.copy} />
      <div className="caps">
        <LiveVitals />
        <ul className="caps__grid">
          {capabilities.map((c) => (
            <li key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
