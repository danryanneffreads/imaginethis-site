export const prerender = true;

// Public routes to include in the sitemap
const routes = [
  "/",                                   // Home
  "/concept/sync-coffee/",              // Synchronize Coffee (now under /examples)
  "/concept/human-ai-systems-summit/",  // Summit example
  "/web-builders",                       // Web Builders Guide
];

export function GET({ request }) {
  const origin = new URL(request.url).origin;
  const lastmod = new Date().toISOString();

  let urls = "";
  for (const path of routes) {
    const priority = path === "/" ? "1.0" : "0.7";
    urls +=
      "<url>" +
      `<loc>${origin}${path}</loc>` +
      `<lastmod>${lastmod}</lastmod>` +
      "<changefreq>weekly</changefreq>" +
      `<priority>${priority}</priority>` +
      "</url>";
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    urls +
    "</urlset>";

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

