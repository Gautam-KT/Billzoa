import Media from "./Media";
import Reveal from "./Reveal";
import Link from "next/link";
import { getClient } from "@/data/clients";

export default function ProjectHero({ project }) {
  const client = getClient(project.clientId);
  return (
    <section className="project-hero container" aria-labelledby="project-title">
      <p className="project-hero__back"><Link href="/projects" data-cursor="link">← All projects</Link></p>
      <h1 id="project-title" className="display-lg">{project.title}</h1>
      <p className="project-hero__headline">{project.headline}</p>
      {project.liveUrl && (
        <p className="project-hero__visit">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-arrow" data-cursor="open">
            Visit live site <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </p>
      )}
      <dl className="facts">
        <div><dt>Client</dt><dd>{client?.website && client.website !== "#" ? <a href={client.website} rel="noopener noreferrer" target="_blank">{project.client}</a> : project.client}</dd></div>
        <div><dt>Category</dt><dd>{project.category}</dd></div>
        <div><dt>Year</dt><dd>{project.year}</dd></div>
        <div><dt>Stack</dt><dd>{project.technologies.join(", ")}</dd></div>
      </dl>
      <Reveal variant="image" className="project-hero__image">
        <Media src={project.image} alt={project.imageAlt || project.title} priority sizes="100vw" ratio="16 / 9" />
      </Reveal>
    </section>
  );
}
