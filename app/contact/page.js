import ContactForm from "@/components/ContactForm";
import { contactPage } from "@/data/contact";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description: "Start a project with Billzoa. Tell us what needs to work better and we’ll reply with the right questions.",
});

export default async function ContactPage({ searchParams }) {
  const sp = await searchParams;
  const type = typeof sp?.type === "string" ? sp.type : "";
  return (
    <div className="contact container">
      <header className="contact__intro">
        <h1 className="display-lg">{contactPage.title}</h1>
        <p className="lede">{contactPage.copy}</p>
        <p className="contact__direct">Prefer email? <a href={`mailto:${site.contact.email}`} data-cursor="link">{site.contact.email}</a></p>
      </header>
      <ContactForm defaultType={type} />
    </div>
  );
}
