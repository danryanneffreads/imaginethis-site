// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

// Draft page filter integration
const draftPageFilter = {
  name: 'draft-page-filter',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      // After build, find and remove draft pages from dist/
      const distDir = dir.pathname;
      const srcPagesDir = path.join(process.cwd(), 'src/pages');
      
      // Get list of draft pages
      const draftPages = findDraftPages(srcPagesDir);
      
      if (draftPages.length > 0) {
        console.log(`\n[draft-page-filter] Found ${draftPages.length} draft page(s), removing from build output...`);
        
        // Remove draft pages from dist/
        for (const pagePath of draftPages) {
          const distPath = pagePathToDist(pagePath, distDir);
          if (fs.existsSync(distPath)) {
            // Remove the HTML file
            fs.unlinkSync(distPath);
            // Try to remove parent directory if empty
            const parentDir = path.dirname(distPath);
            try {
              if (fs.readdirSync(parentDir).length === 0) {
                fs.rmdirSync(parentDir);
              }
            } catch (e) {
              // Directory not empty, that's fine
            }
            console.log(`  ✓ Removed: ${pagePath}`);
          }
        }
        console.log(`[draft-page-filter] Done. Draft pages excluded from live build.\n`);
      }
    }
  }
};

// Helper: Find all draft pages in src/pages/
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
      // Check if frontmatter contains status: "draft"
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        if (frontmatter.includes('status: "draft"')) {
          fileList.push(filePath);
        }
      }
    }
  }
  
  return fileList;
}

// Helper: Convert src/pages path to dist path
function pagePathToDist(srcPath, distDir) {
  // Get relative path from src/pages directory
  const pagesDir = path.join(process.cwd(), 'src', 'pages');
  let relativePath = path.relative(pagesDir, srcPath);
  
  // Normalize path separators
  relativePath = relativePath.replace(/\\/g, '/');
  
  // Remove .astro extension
  relativePath = relativePath.replace(/\.astro$/, '');
  
  // Handle index files: index → index.html
  if (relativePath === 'index') {
    return path.join(distDir, 'index.html');
  }
  // Handle nested: foo/index → foo/index.html
  if (relativePath.endsWith('/index')) {
    return path.join(distDir, relativePath, 'index.html');
  }
  // Handle regular files: foo → foo/index.html
  return path.join(distDir, relativePath, 'index.html');
}

// https://astro.build/config
export default defineConfig({
  site:"https://imaginethis.site",
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [draftPageFilter]
});