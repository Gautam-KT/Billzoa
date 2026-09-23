import localFont from "next/font/local";

// Self-hosted variable font (weight 200–800, width 75–100). No third-party requests, no layout shift.
export const grotesk = localFont({
  src: "../app/fonts/Bricolage.woff2",
  variable: "--font-grotesk",
  display: "swap",
  weight: "200 800",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});
