// Builds the site: node build.mjs
// Each src/pages/*.mjs exports one page. This wraps it in the layout, writes
// <path>/index.html (so URLs end in a slash), then writes sitemap.xml.
import { readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, SITE, layout } from './src/lib.mjs';

const dir = join(ROOT, 'src', 'pages');
const pages = [];
for (const f of readdirSync(dir).filter((f) => f.endsWith('.mjs')).sort()) {
  const mod = await import(pathToFileURL(join(dir, f)).href);
  pages.push(mod.default);
}

const today = new Date().toLocaleDateString('en-CA');
for (const p of pages) {
  const out = p.file ? join(ROOT, p.file) : join(ROOT, p.path, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, layout(p));
  console.log('wrote', out.slice(ROOT.length));
}

// Pages that moved. GitHub Pages can't send a server redirect, so the old
// URL gets a tiny page that forwards to the new one and names it canonical.
const moved = { '/local-seo/': '/seo/', '/work/nadias-dog-nanny/': '/work/' };
for (const [from, to] of Object.entries(moved)) {
  const out = join(ROOT, from, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="${SITE}${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace('${to}' + location.hash);</script>
</head>
<body><p>This page moved to <a href="${to}">${SITE}${to}</a>.</p></body>
</html>
`);
  console.log('wrote', out.slice(ROOT.length), '->', to);
}

const urls = pages
  .filter((p) => !p.noindex)
  .sort((a, b) => (b.priority || 0.5) - (a.priority || 0.5) || a.path.localeCompare(b.path))
  .map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${today}</lastmod></url>`);
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`);
console.log('wrote sitemap.xml with', urls.length, 'urls');
