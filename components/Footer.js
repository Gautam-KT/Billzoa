import Link from "next/link";
import Logo from "./Logo";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { validSocials } from "@/lib/seo";

const labels = { instagram: "Instagram", linkedin: "LinkedIn", github: "GitHub" };

export default function Footer() {
  const socials = validSocials();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo />
          <p>{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="footer__col">
          <h2 className="footer__h">Navigate</h2>
          <ul>{navigation.map((n) => <li key={n.href}><Link href={n.href} data-cursor="link">{n.label}</Link></li>)}</ul>
        </nav>
        {socials.length > 0 && (
          <div className="footer__col">
            <h2 className="footer__h">Elsewhere</h2>
            <ul>
              {socials.map(([key, url]) => (
                <li key={key}><a href={url} target="_blank" rel="noopener noreferrer" data-cursor="link">{labels[key] || key}</a></li>
              ))}
            </ul>
          </div>
        )}
        <div className="footer__col">
          <h2 className="footer__h">Contact</h2>
          <ul>
            <li><a href={`mailto:${site.contact.email}`} data-cursor="link">{site.contact.email}</a></li>
            {site.contact.phone && <li><a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a></li>}
          </ul>
        </div>
      </div>
      <div className="footer__mark" aria-hidden="true">{site.name}</div>
      <div className="container footer__bottom">
        <p>{site.footer.copyright}</p>
      </div>
    </footer>
  );
}
