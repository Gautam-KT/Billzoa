import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { process } from "@/data/services";
import { site } from "@/data/site";

// A real sequence, so numbering is meaningful here. The line draws itself when it enters the viewport.
export default function Process() {
  return (
    <section className="section container" aria-labelledby="approach-title">
      <SectionHead id="approach-title" title={site.approach.title} copy={site.approach.copy} />
      <Reveal variant="line" className="journey">
        <ol className="journey__steps">
          {process.map((step, i) => (
            <li key={step.title} className="step" style={{ "--i": i }}>
              <span className="step__node" aria-hidden="true" />
              <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__desc">{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="journey__loop">Then it starts again, with better questions.</p>
      </Reveal>
    </section>
  );
}
