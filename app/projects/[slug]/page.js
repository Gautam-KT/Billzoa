import { notFound } from "next/navigation";
import ProjectHero from "@/components/ProjectHero";
import CaseStudy from "@/components/CaseStudy";
import NextProject from "@/components/NextProject";
import CTA from "@/components/CTA";
import { projects, getProject, getNextProject } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return buildMetadata({
    title: `Billzoa — ${p.title} ${p.headline.split(" ").slice(-2).join(" ")}`,
    absoluteTitle: true,
    path: `/projects/${p.slug}`,
    description: `${p.description} A ${p.category.toLowerCase()} project built with ${p.technologies.join(", ")}.`,
  });
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <>
      <ProjectHero project={project} />
      <CaseStudy project={project} />
      <NextProject project={getNextProject(slug)} />
      <CTA />
    </>
  );
}
