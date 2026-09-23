# Billzoa — studio website

Next.js 15 (App Router), plain CSS, no UI libraries.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Change content centrally (`/data`)
- `site.js` — copy, contact email/phone, social URLs (a social only renders with a valid URL), founder
- `navigation.js` — header, mobile menu and footer read from this
- `projects.js` — adding an object creates the page, sitemap entry and metadata
- `clients.js` — logo grid is auto-fill; `project.clientId` links a project to a client
- `services.js` — services, process steps, capabilities
- `contact.js` — project types, budget ranges, currency

## Before launch
1. Replace placeholder projects/clients and images in `public/projects` and `public/clients` (`npm run placeholders` regenerates the placeholders).
2. Copy `.env.example` to `.env.local`; set `NEXT_PUBLIC_SITE_URL` and `CONTACT_WEBHOOK_URL`. Without a webhook the contact form returns an error in production.
3. Add real social URLs and a founder photo in `data/site.js`.
4. Add real, verified metrics to a project's `metrics` array (`[{ value, label }]`) only when you have them.

## Theme
`data-theme` on `<html>` switches dark (near-black + lime) and light (white + McLaren orange + parrot green). Tokens live at the top of `app/globals.css`. The choice is saved in localStorage; until chosen, the site follows the OS setting. Client logos are shown as dark marks in light mode via a CSS filter, so supply single-colour logos (or adjust `.client__logo` in the light theme).

## Real projects (current)
`data/projects.js` and `data/clients.js` now hold three real, shipped Billzoa sites: Faces by Gauri, Ritu Mahajan Makeovers, and Mahajan Furniture House. Each project has:
- `liveUrl` — the deployed site, shown as "Visit live site ↗" on both the project card and the project page
- A stylised SVG preview in `/public/projects` (labelled "stylised preview, not a screenshot" — these are not real screenshots, since this environment cannot reach those live domains to capture one)
- Case-study copy drawn from what's actually on each site (services, booking flow, gallery, contact) — no invented client quotes or metrics

To swap in real screenshots: replace `/public/projects/<slug>.svg` (and `-2`, `-3`) with actual `.webp`/`.jpg` captures of each site, and update the `image`/`gallery` paths in `data/projects.js` to match.
