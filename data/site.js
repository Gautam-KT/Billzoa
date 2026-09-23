// Central site configuration. Change copy, contact details and socials here.
const url = process.env.NEXT_PUBLIC_SITE_URL || "https://billzoa.com";

export const site = {
  name: "Billzoa",
  url,
  title: "Billzoa — Digital Experience & Web Development Studio",
  description:
    "Billzoa builds high-performing websites and custom digital experiences that solve real business problems. Strategy, UI/UX, development and performance in one studio.",
  tagline: "Digital experiences built to solve real problems.",
  year: 2026,

  contact: {
    email: "gautam1billzoa@gmail.com",
    phone: null, // add only when real
  },

  // A platform is only rendered when its URL is a valid http(s) URL.
  socials: {
    instagram: "",
    linkedin: "",
    github: "",
  },

  hero: {
    lines: ["WE BUILD", "DIGITAL", "EXPERIENCES", "THAT WORK."],
    lede: "High-performing websites designed around your business, your users, and the problems that actually matter.",
    primaryCta: { label: "Start a Project", href: "/contact" },
    secondaryCta: { label: "Explore Projects", href: "#work" },
    statement:
      "Billzoa is a digital development studio creating high-performing websites and custom digital experiences for businesses that want more than a template.",
  },

  work: {
    title: "SELECTED WORK",
    copy: "A selection of digital products, websites and experiences we’ve designed and built.",
  },

  services: {
    title: "WHAT WE BUILD",
    copy: "Six things we do, each one accountable to the same question: does it work better afterwards?",
  },

  approach: {
    title: "WE START WITH THE PROBLEM.",
    copy: "Every project begins with understanding what needs to work better.",
  },

  capabilities: {
    title: "BEAUTIFUL ISN’T ENOUGH.",
    copy: "A website should look good, load fast, feel intuitive and help the business move forward.",
  },

  clients: {
    title: "TRUSTED BY",
  },

  about: {
    title: "BILLZOA IS BUILT AROUND PROBLEM SOLVING.",
    copy: "We combine design, technology and business thinking to create digital experiences that are useful, fast and memorable.",
    principles: [
      "Strategy before execution",
      "Design with purpose",
      "Technology that serves the business",
      "Performance from the beginning",
      "Continuous improvement",
    ],
  },

  founder: {
    title: "THE PEOPLE BEHIND BILLZOA",
    name: "Gautam",
    role: "Founder & Digital Product Builder",
    description:
      "Building digital products and experiences at the intersection of technology, design and business problem solving.",
    image: null, // e.g. "/about/founder.webp" — falls back to a typographic panel
  },

  cta: {
    title: "HAVE A PROBLEM WORTH SOLVING?",
    copy: "Let’s turn it into a digital experience that works.",
    label: "Start a Project",
    href: "/contact",
  },

  footer: {
    copyright: "© 2026 Billzoa. All rights reserved.",
  },
};
