import Link from "next/link";

export default function ServiceRow({ service, index }) {
  return (
    <li className="service">
      <Link href={`/contact?type=${service.id}`} className="service__link" data-cursor="open" aria-label={`${service.title}: ${service.description} Start a ${service.title} project`}>
        <span className="service__num">{String(index + 1).padStart(2, "0")}</span>
        <span className="service__title">{service.title}</span>
        <span className="service__desc">{service.description}</span>
        <span className="service__arrow" aria-hidden="true">→</span>
      </Link>
    </li>
  );
}
