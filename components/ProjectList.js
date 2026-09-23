import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects, prioritizeFirst = false }) {
  return (
    <div className="project-list">
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} priority={prioritizeFirst && i === 0} />
      ))}
    </div>
  );
}
