import ProjectList from "@/components/ProjectList";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import CTA from "@/components/CTA";

export const metadata = buildMetadata({
  title: "Projects",
  path: "/projects",
  description: "Websites, e-commerce experiences and business platforms designed and built by Billzoa.",
});

export default function ProjectsPage() {
  return (
    <>
      <header className="page-head container">
        <h1 className="display-lg">Projects</h1>
        <p className="lede">Digital products, websites and experiences we’ve designed and built, and the problems behind them.</p>
      </header>
      <section className="container section--tight" aria-label="All projects">
        <ProjectList projects={projects} prioritizeFirst />
      </section>
      <CTA />
    </>
  );
}
