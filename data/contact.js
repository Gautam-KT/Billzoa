// Contact form configuration. Values feed both the form and server-side validation.
export const projectTypes = [
  { value: "web-design", label: "Web Design" },
  { value: "web-development", label: "Web Development" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "business-platform", label: "Business Platform" },
  { value: "ui-ux", label: "UI/UX" },
  { value: "performance", label: "Performance" },
  { value: "other", label: "Something else" },
];

export const currency = "$";

export const budgetRanges = [
  { value: "unsure", label: "Not sure yet" },
  { value: "lt-2k", label: `Under ${currency}2,000` },
  { value: "2k-5k", label: `${currency}2,000 – ${currency}5,000` },
  { value: "5k-15k", label: `${currency}5,000 – ${currency}15,000` },
  { value: "15k-plus", label: `${currency}15,000+` },
];

export const contactPage = {
  title: "LET’S BUILD SOMETHING USEFUL.",
  copy: "Tell us what needs to work better. We read every inquiry and reply with questions, not a sales pitch.",
  submitLabel: "Send Project Inquiry",
};
