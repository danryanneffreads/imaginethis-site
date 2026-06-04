import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ request }) => {
  const origin = new URL(request.url).origin;

  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /preview/',
    `Sitemap: ${origin}/sitemap.xml`,
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
