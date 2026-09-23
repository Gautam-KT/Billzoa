import Clients from "@/components/Clients";
import CTA from "@/components/CTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Clients",
  path: "/clients",
  description: "The businesses Billzoa builds websites, platforms and digital experiences for.",
});

export default function ClientsPage() {
  return (
    <>
      <header className="page-head container">
        <h1 className="display-lg">Clients</h1>
        <p className="lede">Businesses we’ve built for. Open a logo to see the project behind it.</p>
      </header>
      <Clients heading={false} />
      <CTA />
    </>
  );
}
