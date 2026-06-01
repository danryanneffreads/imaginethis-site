export const prerender = true;

export function GET({ request }) {
const origin = new URL(request.url).origin;
const body =
"User-agent: *\n" +
"Allow: /\n" +
"Disallow: /preview/\n" +
"Disallow: /demos/\n" +
"Sitemap: " + origin + "/sitemap.xml";
return new Response(body, {
headers: { "Content-Type": "text/plain; charset=utf-8" },
});
}