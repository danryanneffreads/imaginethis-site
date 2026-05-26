# ImagineThis.Site

A rapid concept-site factory built with Astro and Tailwind CSS. Design, prototype, and deploy beautiful concept websites in hours, not weeks.

## Project Structure

```
src/
├── pages/          # Page routes (index.astro becomes /)
├── components/     # Reusable UI components
├── layouts/        # Page layouts (applied to all pages)
├── styles/         # Global styles and Tailwind imports
└── assets/         # Static assets (images, fonts, etc.)
```

## Core Components

- **Header** — Navigation header with logo and links
- **Footer** — Footer with company info and links
- **Hero** — Large hero section with title, subtitle, and CTA
- **Card** — Reusable card for showcasing concept sites or features
- **CTASection** — Call-to-action section for engagement
- **Layout** — Base layout wrapper (includes meta, Header, Footer)

## Getting Started

### Install dependencies
```bash
npm install
```

### Start the dev server
```bash
npm run dev
```

Visit `http://localhost:4321/` to see your site. The server reloads on file changes.

### Build for production
```bash
npm run build
```

Output goes to `dist/` (ready for Cloudflare Pages).

### Preview the production build
```bash
npm run preview
```

### Deploy to Cloudflare Pages

#### Option 1: Manual deploy (one-time)
```bash
npm run deploy
```

This builds the site and publishes to Cloudflare Pages via `wrangler`. Requires:
- Cloudflare account
- `CLOUDFLARE_API_TOKEN` environment variable
- `CLOUDFLARE_ACCOUNT_ID` environment variable

#### Option 2: Automatic deploy on git push
1. Set up GitHub repository
2. Connect it to Cloudflare Pages
3. Add secrets to GitHub Actions:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. Push to `master` branch — automatic build and deploy

See `.github/workflows/deploy.yml` for the CI/CD configuration.

## Creating New Pages

1. Add a new file in `src/pages/` (e.g., `src/pages/example.astro`)
2. Import the Layout component
3. Use existing components to build your page

### Example page:
```astro
---
import Layout from "../layouts/Layout.astro";
import Hero from "../components/Hero.astro";
---

<Layout title="My Example">
  <Hero title="Example Site" subtitle="Built with ImagineThis.Site" />
</Layout>
```

## Creating New Components

Components are reusable UI pieces. Create them in `src/components/`:

```astro
---
// components/MyComponent.astro

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div>
  <h2>{title}</h2>
</div>
```

## Styling

All styling uses **Tailwind CSS utility classes**. No raw CSS needed. See `src/styles/global.css` for Tailwind imports.

## Private Preview System

Private concept demos use file-based secret URLs:

1. Each demo is a random slug (e.g., `/demos/a7f2k9xr1q2b3`)
2. All private demo pages include `<meta name="robots" content="noindex, nofollow">` to keep them out of search engines
3. Each demo displays a banner: "A concept designed for [Business Name]"
4. Deleting the demo file kills the URL (simple, file-based approach)
5. Not linked in navigation — only accessible via the secret URL

**Usage:** Create a new file in `src/pages/demos/[slug].astro` and customize the business name. The dynamic route handles it automatically.

**Future enhancement:** Store demo metadata in a data collection to manage business names and custom content per demo.

## Public Example Sites

Public examples go in `/pages/examples/` and are fully indexed:
- `/examples/coffee.astro` — Coffee shop concept site demonstrating the reusable component system
- Add more examples as you build them

## Components

In addition to the core components, you can extend or create new ones:
- **TestimonialCard** — For customer testimonials and quotes

## Technology Stack

- **Astro 6** — Static site generation with hybrid mode for on-demand routes
- **Tailwind CSS 4** — Utility-first CSS
- **Cloudflare Pages** — Hosting and deployment
- **Wrangler** — CLI for Cloudflare deployments
- **@astrojs/cloudflare** — Adapter for hybrid rendering on Cloudflare Workers

## Next Steps

- Deploy to Cloudflare Pages and test live previews
- Create a workflow for duplicating templates → customizing → deploying private demos
- Build more example concept sites
- Integrate WordPress CMS for client dashboards (future phase)

---

Built by ImagineThis.Site. Learning Astro, designing concepts, shipping fast.
