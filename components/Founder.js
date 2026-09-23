import Media from "./Media";
import { site } from "@/data/site";

export default function Founder() {
  const f = site.founder;
  return (
    <div className="founder" aria-labelledby="founder-title">
      <div className="founder__visual">
        {f.image ? (
          <Media src={f.image} alt={`${f.name}, ${f.role}`} ratio="4 / 5" sizes="(min-width: 900px) 40vw, 100vw" />
        ) : (
          <div className="founder__panel" role="img" aria-label="Billzoa monogram">
            <span>B</span>
          </div>
        )}
      </div>
      <div className="founder__text">
        <h2 id="founder-title" className="founder__heading">{f.title}</h2>
        <p className="founder__name">{f.name}</p>
        <p className="founder__role">{f.role}</p>
        <p className="founder__desc">{f.description}</p>
      </div>
    </div>
  );
}
