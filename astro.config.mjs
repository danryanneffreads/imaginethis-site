// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

/**
 * Draft page filter integration (hardened)
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

        console.log(
          `\n[draft-page-filter] Removing ${draftPages.length} draft page(s) from build output...`
        );
        for (const pagePath of draftPages) {
          const distPath = pagePathToDist(pagePath, distDir);
          try {
            fs.rmSync(distPath, { force: true });
            const parentDir = path.dirname(distPath);
            try {
              if (
                fs.existsSync(parentDir) &&
                fs.readdirSync(parentDir).length === 0
              ) {
                fs.rmdirSync(parentDir);
              }
            } catch {}
            console.log(`  ✓ Removed: ${pagePath}`);
          } catch (e) {
            console.warn(
              `  ⚠ Skipped ${pagePath}: ${e instanceof Error ? e.message : String(e)}`
            );
          }
        }
        console.log('[draft-page-filter] Done.\n');
      } catch (e) {
        console.warn(
          `[draft-page-filter] Non-fatal error: ${e instanceof Error ? e.message : String(e)}`
        );
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

// https://astro.build/config
export default defineConfig({
  site: 'https://imaginethis.site',

  // Astro alias (Astro will also apply to Vite, but we mirror it below for safety)
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Ensure Vite/Rollup see the alias during build
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },

  integrations: [draftPageFilter],
});
