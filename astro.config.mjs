// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

/**
 * Draft page filter integration (hardened)
 * Removes any pages with `status: "draft"` from the built output.
 * (Runs only on build, not during dev.)
 */
const draftPageFilter = {
  name: 'draft-page-filter',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      try {
        const distDir = fileURLToPath(dir);
        const srcPagesDir = path.join(process.cwd(), 'src/pages');
        const draftPages = findDraftPages(srcPagesDir);
        if (!draftPages.length) return;

        for (const page of draftPages) {
          const outPath = pagePathToDist(page, distDir);
          if (fs.existsSync(outPath)) {
            fs.rmSync(outPath, { force: true });
          }
        }
      } catch (e) {
        console.warn('[draft-page-filter] Warning:', e?.message || e);
      }
    },
  },
};

function findDraftPages(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findDraftPages(filePath, fileList);
    } else if (file.endsWith('.astro')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      if (fm && fm[1].includes('status: "draft"')) fileList.push(filePath);
    }
  }
  return fileList;
}

function pagePathToDist(srcPath, distDir) {
  const pagesDir = path.join(process.cwd(), 'src', 'pages');
  let rel = path.relative(pagesDir, srcPath).replace(/\\/g, '/');
  rel = rel.replace(/\.astro$/, '');
  if (rel === 'index') return path.join(distDir, 'index.html');
  if (rel.endsWith('/index')) return path.join(distDir, rel + '.html');
  return path.join(distDir, rel, 'index.html');
}

/**
 * Vite dev middleware to ensure HTML is always served with UTF-8 charset.
 * This fixes mojibake in development when the header would otherwise omit the charset.
 */
function forceUtf8ForHtml() {
  return {
    name: 'force-utf8-for-html',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Heuristic: only touch HTML document requests
        const accept = req.headers.accept || '';
        const isHtml =
          accept.includes('text/html') ||
          (req.url && req.url.endsWith('.html')) ||
          req.url === '/' ||
          (req.url && req.url.endsWith('/'));
        if (isHtml) {
          const existing = res.getHeader('Content-Type');
          if (typeof existing === 'string') {
            if (!existing.toLowerCase().includes('charset=')) {
              res.setHeader('Content-Type', existing + '; charset=utf-8');
            }
          } else if (!existing) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
          }
        }
        next();
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://imaginethis.site',

  // Astro alias (mirrored into Vite resolve below)
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },

  vite: {
    plugins: [tailwindcss(), forceUtf8ForHtml()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },

  integrations: [draftPageFilter],
});
