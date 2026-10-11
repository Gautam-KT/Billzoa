export const projectTypes = [
  { value: "web-design", label: "Web Design" },
  { value: "web-development", label: "Web Development" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "business-platform", label: "Business Platform" },
  { value: "ui-ux", label: "UI/UX" },
  { value: "performance", label: "Performance" },
  { value: "other", label: "Something else" },
];

export const currencies = [
  { code: "USD", symbol: "$" },
  { code: "INR", symbol: "₹" },
];

export const budgetRangesByCurrency = {
  USD: [
    { value: "unsure", label: "Not sure yet" },
    { value: "usd-lt-2k", label: "Under $2,000" },
    { value: "usd-2k-5k", label: "$2,000 – $5,000" },
    { value: "usd-5k-15k", label: "$5,000 – $15,000" },
    { value: "usd-15k-plus", label: "$15,000+" },
  ],
  INR: [
    { value: "unsure", label: "Not sure yet" },
    { value: "inr-10k-25k", label: "₹10,000 – ₹25,000" },
    { value: "inr-25k-50k", label: "₹25,000 – ₹50,000" },
    { value: "inr-50k-1l", label: "₹50,000 – ₹1,00,000" },
    { value: "inr-1l-plus", label: "₹1,00,000+" },
  ],
};

// Exporting budgetRanges satisfies lib/validate.js without breaking validation
export const budgetRanges = [
  ...budgetRangesByCurrency.USD,
  ...budgetRangesByCurrency.INR.filter((b) => b.value !== "unsure"),
];

export const contactPage = {
  title: "LET’S BUILD SOMETHING USEFUL.",
  copy: "Tell us what needs to work better. We read every inquiry and reply with questions, not a sales pitch.",
  submitLabel: "Send Project Inquiry",
};