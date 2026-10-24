# James Earl Nacario — Student Portfolio

A single-page student developer portfolio built with React, Vite, and Tailwind CSS. The design uses a warm editorial palette, an original crest, and an orange-red accent inspired by motorsport graphics without copying any team identity.

**Status:** local build complete; not deployed yet.

> **Before publishing:** replace the contact placeholders in `src/data/site.js` and the deployment URL placeholders in `index.html`, then run `npm run check:content`. The check is expected to fail until those real details are added.

## What is included

- Home, About, Skills, Projects, and Contact sections that match the assignment brief.
- Honest student positioning with no invented years, client counts, or awards.
- Three documented projects: Promise Lab, the archived Portfolio v1, and this Portfolio v2.
- A standalone Promise Lab demo with explicit resolve/reject controls, fetch error handling, and an accessible event log.
- Light and dark themes, with the chosen theme stored in `localStorage`.
- Responsive layout for desktop and mobile, including a native `<dialog>` menu.
- Original inline-SVG crest and favicon, self-hosted fonts, hover effects, and reduced-motion fallbacks.
- Project screenshots captured from the real builds.

## Stack

- React 19
- Vite 8
- Tailwind CSS 4 (CSS-first configuration)
- Barlow Condensed, Barlow, and JetBrains Mono via Fontsource
- No router, icon library, animation library, or component library

## Run locally

Requires Node `>=22.12.0`. The repository includes an `.nvmrc` for Node 22.

```bash
npm install
npm run dev
```

Open the printed local URL. The standalone demo is at:

```text
/demos/promise-lab/index.html
```

Vite's development fallback does not resolve the directory-only form (`/demos/promise-lab/`) to the demo's `index.html`. The production preview and Vercel both serve the built file correctly; `npm run preview` is the closest local check to deployment.

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Before publishing

### 1. Replace the contact placeholders

Edit `src/data/site.js`. Do not guess an address or profile URL. Use details that belong to James Earl Nacario and that should be public.

```js
contact: {
  email: {
    label: 'Email',
    value: 'the-real-address@example.com',
    isPlaceholder: false,
  },
  github: {
    label: 'GitHub',
    value: 'github.com/the-real-username',
    url: 'https://github.com/the-real-username',
    isPlaceholder: false,
  },
},
```

While `isPlaceholder` is `true`, the site shows non-clickable text and a visible placeholder tag. This prevents a guessed contact link from being published.

### 2. Replace the deployment URL

In `index.html`, replace every `REPLACE-ME.vercel.app` value with the final site URL:

- `rel="canonical"`
- `og:url`
- `og:image`
- `twitter:image`

Keep the Open Graph image at `1200 × 630`. The current cover is `public/og-image.png`; regenerate it if the name, role, or branding changes.

### 3. Run the content check

```bash
npm run check:content
```

This must pass before submission. It fails on:

- remaining contact or URL placeholders
- invented experience, project, client, or award claims
- `href="#"` links and placeholder copy
- missing required assets, including the project images and OG image

### 4. Add the live project link after deployment

Once the Vercel URL is known, add it to the Portfolio v2 entry in `src/data/projects.js`:

```js
links: [{ label: 'View live site', href: 'https://your-project.vercel.app' }],
note: null,
```

Then rebuild, commit, and redeploy.

## Deploy to Vercel

1. Create a public GitHub repository and push this project.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Use the **Vite** framework preset:
   - Root directory: `.`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 22.x
   - Environment variables: none
4. Deploy, then test the production URL in incognito and on a phone.
5. Check `/demos/promise-lab/index.html` and `/og-image.png`.
6. Update the canonical/OG URLs and the Portfolio v2 live link, then commit and redeploy.

Vercel's static hosting may also resolve `/demos/promise-lab/` because the folder contains `index.html`. The explicit `index.html` link is the version that works consistently in local development, preview, and production.

## Project structure

```text
index.html                    document metadata and theme boot script
src/
  App.jsx                     page composition
  index.css                   design tokens, layout, and motion
  data/
    site.js                   name, copy, navigation, contact details
    projects.js               project content, links, screenshots
    skills.js                 honest skill groups
  components/                 header, hero, sections, project cards, footer
  hooks/                      theme, scroll spy, reveal, pointer glow
public/
  demos/promise-lab/          standalone vanilla JavaScript demo
  images/projects/            real project screenshots
  favicon.svg  og-image.png  robots.txt
scripts/check-placeholders.mjs
legacy/                       original files kept outside the deployment
artifacts/                    local QA screenshots, not committed
```

## Content and asset notes

- **Portrait:** `src/assets/profile.jpg` is the original 199 × 200 image. The design keeps it small and stylized. Replace it with a higher-resolution portrait if one becomes available; do not upscale the current file.
- **Portfolio v1:** the archived version is intentionally not linked as a live site. It included sample project claims, placeholder links, and a contact form without a backend. `legacy/` keeps the original files for reference but is outside `public/`, so it is not deployed.
- **Contact:** there is no contact form because there is no backend. The finished site uses direct email and GitHub links only.
- **Promise Lab:** fetch requests use JSONPlaceholder and a deliberately unreachable `.invalid` host to demonstrate network failure. No API key or backend is involved.
- **Resume:** not included. Add a download only when a real PDF exists.

## Accessibility and motion

The site includes a skip link, one `h1`, logical heading order, visible focus states, 44px touch targets, descriptive alt text, and `aria-current` for the active section. The mobile menu uses a native dialog with Escape and backdrop dismissal. The Promise Lab log uses `aria-live="polite"` so outcomes are announced, not only colored.

Hover/tilt effects are limited to fine pointers and are disabled for reduced-motion preferences. The marquee stops and collapses to a single readable sequence under reduced motion.

## AI assistance

This project was built with AI tools as part of the assignment workflow:

- **Qoder** for planning, code generation, and review.
- **browser-use** and **Chrome** for browser testing and screenshots.

The design direction, content decisions, and final review remain the student's responsibility. No invented experience, clients, or project results were added. The archived Portfolio v1 is retained honestly as a learning artifact rather than presented as current work.

## Copyright

© 2026 James Earl Nacario. All project content and screenshots are from the student's own work.
