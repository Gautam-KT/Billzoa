// Single source of truth for navigation. Header, mobile overlay and footer all read from here.
// Add a page → add one object → every menu updates.
export const navigation = [
  { label: "Projects", href: "/projects" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export const headerCta = { label: "Start a Project", href: "/contact" };
