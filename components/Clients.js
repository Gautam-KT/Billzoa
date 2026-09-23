import SectionHead from "./SectionHead";
import ClientLogo from "./ClientLogo";
import { clients } from "@/data/clients";
import { site } from "@/data/site";

// Grid is auto-fill, so adding clients to data/clients.js never needs layout changes.
export default function Clients({ heading = true }) {
  return (
    <section className={heading ? "section container" : "container"} aria-labelledby="clients-title">
      {heading ? <SectionHead id="clients-title" title={site.clients.title} /> : <h2 id="clients-title" className="sr-only">Clients</h2>}
      <ul className="clients">
        {clients.map((c) => <ClientLogo key={c.id} client={c} />)}
      </ul>
    </section>
  );
}
