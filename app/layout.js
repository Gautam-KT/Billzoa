import "./globals.css";
import { grotesk } from "@/lib/fonts";
import { site } from "@/data/site";
import { validSocials } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, type: "website", locale: "en", title: site.title, description: site.description, url: site.url },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  icons: { icon: "/icon.svg" },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f100f" },
  ],
  colorScheme: "dark light",
};

// Runs before first paint: saved choice → else system preference → else dark.
const themeInit = `try{var t=localStorage.getItem('billzoa-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.contact.email,
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    sameAs: validSocials().map(([, url]) => url),
  };

  return (
    <html lang="en" className={grotesk.variable} suppressHydrationWarning>
      <head>
        {/* Enables JS-only reveal states without hiding content when scripts are unavailable. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js');${themeInit}` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CustomCursor />
      </body>
    </html>
  );
}
