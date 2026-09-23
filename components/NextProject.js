import Link from "next/link";
import Media from "./Media";

export default function NextProject({ project }) {
  return (
    <section className="next container" aria-label="Next project">
      <Link href={`/projects/${project.slug}`} className="next__link" data-cursor="view">
        <span className="next__label">Next project</span>
        <span className="next__title display-lg">{project.title}<span className="arrow" aria-hidden="true"> →</span></span>
        <span className="next__preview" aria-hidden="true"><Media src={project.image} alt="" sizes="480px" ratio="8 / 5" /></span>
      </Link>
    </section>
  );
}
