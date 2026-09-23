import Reveal from "./Reveal";
import Media from "./Media";

function Row({ title, children }) {
  return (
    <section className="case-row" aria-labelledby={`cs-${title.replace(/\W+/g, "-").toLowerCase()}`}>
      <Reveal as="h2" id={`cs-${title.replace(/\W+/g, "-").toLowerCase()}`} className="case-row__title">{title}</Reveal>
      <div className="case-row__body">{children}</div>
    </section>
  );
}

// problem → thinking → solution → execution, in the order the brief asks for.
export default function CaseStudy({ project }) {
  const { challenge, strategy, solution, design, development, features, technologies, results, metrics, gallery, title } = project;
  return (
    <div className="case container">
      <Row title="Challenge"><p className="case-text">{challenge}</p></Row>
      <Row title="Strategy"><p className="case-text">{strategy}</p></Row>
      <Row title="Solution"><p className="case-text">{solution}</p></Row>

      {gallery?.[0] && (
        <Reveal variant="image" className="case-wide">
          <Media src={gallery[0]} alt={`${title} interface detail`} sizes="100vw" ratio="16 / 9" />
        </Reveal>
      )}

      <Row title="Design"><p className="case-text">{design}</p></Row>
      <Row title="Development"><p className="case-text">{development}</p></Row>

      <Row title="Key features">
        <ul className="rows">{features.map((f) => <li key={f}>{f}</li>)}</ul>
      </Row>
      <Row title="Technology">
        <ul className="tags tags--lg">{technologies.map((t) => <li key={t}>{t}</li>)}</ul>
      </Row>
      <Row title="Results">
        <ul className="rows">{results.map((r) => <li key={r}>{r}</li>)}</ul>
        {metrics?.length > 0 && (
          <dl className="metrics">
            {metrics.map((m) => (
              <div key={m.label}><dd>{m.value}</dd><dt>{m.label}</dt></div>
            ))}
          </dl>
        )}
      </Row>

      {gallery?.[1] && (
        <Reveal variant="image" className="case-wide">
          <Media src={gallery[1]} alt={`${title} visual showcase`} sizes="100vw" ratio="16 / 9" />
        </Reveal>
      )}
    </div>
  );
}
