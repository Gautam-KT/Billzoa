import Hero from "@/components/Hero";
import ScrollText from "@/components/ScrollText";
import SectionHead from "@/components/SectionHead";
import ProjectList from "@/components/ProjectList";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Capabilities from "@/components/Capabilities";
import Clients from "@/components/Clients";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/", description: site.description });

export default function Home() {
  return (
    <>
      <Hero />
      <section className="statement container" aria-label="About Billzoa">
        <ScrollText className="statement__text">{site.hero.statement}</ScrollText>
      </section>

      <section id="work" className="section container" aria-labelledby="work-title">
        <SectionHead id="work-title" title={site.work.title} copy={site.work.copy} />
        <ProjectList projects={featuredProjects} prioritizeFirst />
        <p className="section__more"><Link href="/projects" className="link-arrow" data-cursor="link">All projects <span className="arrow" aria-hidden="true">→</span></Link></p>
      </section>

      <Services />
      <Process />
      <Capabilities />
      <Clients />
      <About />
      <CTA />
    </>
  );
}
