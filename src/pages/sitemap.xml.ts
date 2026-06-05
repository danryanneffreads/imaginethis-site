import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? 'https://imaginethis.site').replace(/\/$/, '');
  const today = new Date().toISOString().split('T')[0];

  const routes = [
    '/', // Home
    '/guides', // Guides hub
    '/guides/planning', // Planning
    '/guides/web-builders', // Platform overview
  ];

  const urlset = routes
    .map((path) => {
      return `
    <url>
      <loc>${base}${path}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${path === '/' ? '1.0' : '0.8'}</priority>
    </url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
