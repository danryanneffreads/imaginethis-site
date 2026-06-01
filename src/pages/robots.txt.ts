export const prerender = true;

export function GET({ request }) {
const origin = new URL(request.url).origin;
const lines = [
"User-agent: *",
"Allow: /",
"Disallow: /preview/",
"Disallow: /demos/",
Sitemap: ${origin}/sitemap.xml,
];
return new Response(lines.join("\n"), {
headers: { "Content-Type": "text/plain; charset=utf-8" },
});
}