// Generates STYLISED previews (not screenshots) for projects and simple wordmarks for clients.
// Replace /public/projects/* and /public/clients/* with real screenshots and logos, keeping the file names
// (or update the paths in data/projects.js and data/clients.js).
import { writeFileSync, mkdirSync } from "node:fs";
mkdirSync("public/projects", { recursive: true });
mkdirSync("public/clients", { recursive: true });

const W = 1600, H = 1000;
const font = `font-family="Helvetica Neue, Arial, sans-serif"`;
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const svg = (body, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img"><rect width="${W}" height="${H}" fill="#0c0c0b"/>${body}<text x="60" y="${H - 22}" ${font} font-size="18" fill="#ffffff" fill-opacity=".3">stylised preview, not a screenshot: ${esc(label)}</text></svg>`;

const sites = {
  "faces-by-gauri": {
    domain: "facesbygauri.com", bg: "#16130f", ink: "#f2ebe0",
    lines: ["Bridal makeup & luxury", "glam, done to perfection."], sub: "Signature bridal, Arabic makeup and party glam.", cta: "Book Your Slot",
    stats: [["2018", "Founded"], ["Bridal", "Signature specialty"], ["Arabic", "Makeup specialty"]],
    list: ["Signature Bridal Luxury Makeup", "Arabic Makeup", "Signature Glam Party Makeup", "Gauri's Party Signature", "Basic Glam Party Makeup", "Hairstyling & Hair Extensions"],
    word: "Faces", sections: ["Services", "Arabic makeup", "Gallery", "Reviews", "FAQ", "Contact"],
  },
  "ritu-mahajan-makeovers": {
    domain: "ritumahajanmakeovers.com", bg: "#711425", ink: "#fbeee8",
    lines: ["Twelve hours of ceremony.", "Zero touch-ups."], sub: "Bridal makeovers trialled, timed and finished for the whole day.", cta: "Book Your Slot",
    stats: [["2018", "Founded"], ["2", "Studios in Punjab"], ["6", "Service categories"]],
    list: ["Bridal Makeup", "Party & Occasion Makeup", "Hairstyling & Hair Care", "Skincare & Facials", "Nail Care & Art", "Draping & Styling"],
    word: "Ritu", sections: ["About", "Services", "Bridal", "Gallery", "Studios", "FAQ"],
  },
  "mahajan-furniture-house": {
    domain: "mahajanfurniturehouse.com", bg: "#2a1d13", ink: "#f4ead9",
    lines: ["Four Decades of", "Trusted Craftsmanship"], sub: "Beds, dining tables, centre tables and sofas since 1981.", cta: "Browse Catalog",
    stats: [["1981", "Serving Mukerian"], ["5", "Furniture categories"], ["WhatsApp", "Enquiry on every piece"]],
    list: ["Beds", "Dining Tables", "Centre Tables", "Cabinets & Console", "Sofas"],
    word: "Mahajan", sections: ["Our story", "Shop by category", "Popular picks", "Materials", "Gallery", "Contact"],
  },
};

const cover = (s) => `
  <rect x="60" y="50" width="1480" height="880" fill="${s.bg}" stroke="${s.ink}" stroke-opacity=".22"/>
  <rect x="60" y="50" width="1480" height="58" fill="${s.ink}" fill-opacity=".07"/>
  <text x="96" y="87" ${font} font-size="22" fill="${s.ink}" fill-opacity=".6">${s.domain}</text>
  ${s.lines.map((l, i) => `<text x="130" y="${300 + i * 118}" ${font} font-size="100" font-weight="800" letter-spacing="-4" fill="${s.ink}">${esc(l)}</text>`).join("")}
  <text x="132" y="${300 + s.lines.length * 118 + 10}" ${font} font-size="30" fill="${s.ink}" fill-opacity=".65">${esc(s.sub)}</text>
  <rect x="130" y="640" width="290" height="70" fill="${s.ink}"/><text x="275" y="684" text-anchor="middle" ${font} font-size="26" font-weight="700" fill="${s.bg}">${esc(s.cta)}</text>
  <line x1="130" y1="790" x2="1470" y2="790" stroke="${s.ink}" stroke-opacity=".22"/>
  ${s.stats.map(([n, l], i) => `<text x="${130 + i * 450}" y="850" ${font} font-size="54" font-weight="800" letter-spacing="-2" fill="${s.ink}">${esc(n)}</text><text x="${130 + i * 450}" y="890" ${font} font-size="22" fill="${s.ink}" fill-opacity=".6">${esc(l)}</text>`).join("")}`;

const phone = (s) => `
  <rect x="120" y="90" width="520" height="820" fill="${s.ink}" fill-opacity=".05"/>
  <text x="120" y="190" ${font} font-size="70" font-weight="800" letter-spacing="-3" fill="${s.ink}">Services</text>
  <rect x="120" y="215" width="70" height="6" fill="${s.ink}"/>
  <rect x="700" y="90" width="330" height="820" fill="${s.bg}" stroke="${s.ink}" stroke-opacity=".5" stroke-width="3"/>
  <rect x="736" y="130" width="120" height="14" fill="${s.ink}" fill-opacity=".8"/>
  ${s.list.slice(0, 5).map((t, i) => `<rect x="736" y="${190 + i * 118}" width="258" height="94" fill="${s.ink}" fill-opacity=".08"/><text x="754" y="${228 + i * 118}" ${font} font-size="19" font-weight="700" fill="${s.ink}">${esc(t.length > 24 ? t.slice(0, 23) + "…" : t)}</text><rect x="754" y="${248 + i * 118}" width="160" height="7" fill="${s.ink}" fill-opacity=".35"/>`).join("")}
  ${s.list.map((t, i) => `<text x="1120" y="${190 + i * 84}" ${font} font-size="30" font-weight="600" fill="${s.ink}" fill-opacity="${i === 0 ? 1 : 0.55}">${esc(t)}</text><line x1="1120" y1="${210 + i * 84}" x2="1480" y2="${210 + i * 84}" stroke="${s.ink}" stroke-opacity=".2"/>`).join("")}`;

const words = (s) => `
  <rect x="60" y="60" width="1480" height="880" fill="${s.bg}"/>
  <text x="110" y="420" ${font} font-size="300" font-weight="800" letter-spacing="-14" fill="${s.ink}">${esc(s.word)}</text>
  ${s.sections.map((t, i) => `<rect x="${110 + (i % 3) * 470}" y="${520 + Math.floor(i / 3) * 190}" width="430" height="150" fill="${s.ink}" fill-opacity=".07"/><text x="${140 + (i % 3) * 470}" y="${610 + Math.floor(i / 3) * 190}" ${font} font-size="36" font-weight="700" fill="${s.ink}">${esc(t)}</text><rect x="${140 + (i % 3) * 470}" y="${635 + Math.floor(i / 3) * 190}" width="60" height="6" fill="${s.ink}" fill-opacity=".6"/>`).join("")}`;

for (const [id, s] of Object.entries(sites)) {
  writeFileSync(`public/projects/${id}.svg`, svg(cover(s), id));
  writeFileSync(`public/projects/${id}-2.svg`, svg(`<rect x="60" y="50" width="1480" height="900" fill="${s.bg}"/>${phone(s)}`, id));
  writeFileSync(`public/projects/${id}-3.svg`, svg(words(s), id));
}

const wordmarks = { "faces-by-gauri": "Faces by Gauri", "ritu-mahajan-makeovers": "Ritu Mahajan", "mahajan-furniture-house": "Mahajan Furniture" };
for (const [id, name] of Object.entries(wordmarks)) {
  writeFileSync(`public/clients/${id}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80"><text x="0" y="52" ${font} font-size="38" font-weight="700" letter-spacing="-1.5" fill="#f1f2ec">${esc(name)}</text></svg>`);
}
console.log("Written.");
