import { site } from "@/data/site";

// One helper so every page gets: unique title, description, canonical, Open Graph, Twitter.
export function buildMetadata({ title, description, path = "/", image, absoluteTitle = false }) {
  const url = new URL(path, site.url).toString();
  const fullTitle = title ? (absoluteTitle ? title : `${title} | ${site.name}`) : site.title;
  const meta = {
    title: absoluteTitle ? { absolute: fullTitle } : title || { absolute: site.title },
    description: description || site.description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: description || site.description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: description || site.description },
  };
  return meta;
}

export const validSocials = () =>
  Object.entries(site.socials).filter(([, url]) => {
    try {
      const u = new URL(url);
      return u.protocol === "https:" || u.protocol === "http:";
    } catch {
      return false;
    }
  });
