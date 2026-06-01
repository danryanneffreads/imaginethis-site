 export const prerender = true;
 
// Update this list if you add/remove public pages.
const routes = [
"/",                                  // Home
"/sync-coffee/",                      // Synchronize Coffee example (your existing public page)
"/examples/human-ai-systems-summit/", // Summit example (now public under /examples/)
"/web-builders",                      // Web Builders Guide
];

export function GET({ request }) {
const origin = new URL(request.url).origin;
const lastmod = new Date().toISOString();

const urls = routes
.map(
(path) =>        <url>         <loc>${origin}${path}</loc>         <lastmod>${lastmod}</lastmod>         <changefreq>weekly</changefreq>         <priority>${path === "/" ? "1.0" : "0.7"}</priority>       </url>
)
.join("");

const xml = <?xml version="1.0" encoding="UTF-8"?>   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">     ${urls}   </urlset>.trim();

return new Response(xml, {
headers: { "Content-Type": "application/xml; charset=utf-8" },
});
}
