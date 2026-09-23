import Link from "next/link";
import Image from "next/image";
import Media from "./Media";
import { getProjectByClient } from "@/data/projects";

// Logo → name on hover (always visible on touch) → project preview when the client has a linked project.
export default function ClientLogo({ client }) {
  const project = getProjectByClient(client.id);
  const inner = (
    <>
      <Image src={client.logo} alt={`${client.name} logo`} width={320} height={80} unoptimized className="client__logo" />
      <span className="client__name">{client.name}{project ? " — view project" : ""}</span>
      {project && (
        <span className="client__preview" aria-hidden="true">
          <Media src={project.image} alt="" sizes="320px" ratio="8 / 5" />
        </span>
      )}
    </>
  );
  return (
    <li className="client">
      {project ? (
        <Link href={`/projects/${project.slug}`} className="client__cell" data-cursor="view">{inner}</Link>
      ) : client.website && client.website !== "#" ? (
        <a href={client.website} className="client__cell" target="_blank" rel="noopener noreferrer">{inner}</a>
      ) : (
        <div className="client__cell">{inner}</div>
      )}
    </li>
  );
}
