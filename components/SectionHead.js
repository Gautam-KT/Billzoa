import Reveal from "./Reveal";

export default function SectionHead({ title, copy, as: Tag = "h2", id }) {
  return (
    <header className="section-head">
      <Reveal as={Tag} id={id} className="display-md section-head__title">{title}</Reveal>
      {copy && <p className="section-head__copy">{copy}</p>}
    </header>
  );
}
