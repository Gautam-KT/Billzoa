import { site } from "@/data/site";
import { navigation } from "@/data/navigation";
import { projects } from "@/data/projects";

export default function sitemap() {
  const now = new Date();
  const pages = ["/", ...navigation.map((n) => n.href)];
  return [
    ...pages.map((p) => ({ url: new URL(p, site.url).toString(), lastModified: now, priority: p === "/" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: new URL(`/projects/${p.slug}`, site.url).toString(), lastModified: now, priority: 0.7 })),
  ];
}
