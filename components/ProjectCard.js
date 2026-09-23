"use client";
import Link from "next/link";
import Media from "./Media";
import Reveal from "./Reveal";

// Large editorial presentation. The whole card is one link (stretched from the title) so it's a single tab stop.
export default function ProjectCard({ project, index = 0, priority = false }) {
  const { title, headline, client, category, year, description, technologies, image, imageAlt, slug } = project;
  return (
    <article className={`project ${index % 2 ? "project--right" : ""} max-w-4xl mx-auto`} data-cursor="view">
      <div className="project__meta">
        <span>{client}</span>
        <span>{year}</span>
      </div>
      <Reveal variant="image" className="project__frame aspect-[16/9] w-full overflow-hidden">
        <Media src={image} alt={imageAlt || `${title} — ${headline}`} priority={priority} sizes="(min-width: 1200px) 1100px, 100vw" />
        <span className="project__tag">{category}</span>
      </Reveal>
      <div className="project__body">
        <div>
          <h3 className="project__title">
            <Link href={`/projects/${slug}`} className="project__link" aria-label={`${title}: ${headline}. View project`}>
              {title}
            </Link>
          </h3>
          <p className="project__headline">{headline}</p>
        </div>
        <div className="project__info">
          <p>{description}</p>
          <ul className="tags" aria-label="Technology">
            {technologies.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <span className="project__actions">
            <span className="project__more" aria-hidden="true">
              View Project <span className="arrow">→</span>
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project__visit"
                data-cursor="open"
                onClick={(e) => e.stopPropagation()}
              >
                Visit live site <span aria-hidden="true">↗</span>
              </a>
            )}
          </span>
        </div>
      </div>
    </article>
  );
}
