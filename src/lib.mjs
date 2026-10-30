// Shared pieces for every page: the layout, the screenshot frames and the JSON-LD.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));
export const SITE = 'https://whittierht.github.io';
export const EMAIL = 'whittierht@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/hyrum-whittier/';
export const WHERE = 'Utah and Idaho';
export const VERSION = '5.1';

const IMG = join(ROOT, 'images');

/* ------------------------------------------------------------ images */

function webpSize(file) {
  const b = readFileSync(file).subarray(0, 40);
  const tag = b.toString('ascii', 12, 16);
  if (tag === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (tag === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (tag === 'VP8L') { const v = b.readUInt32LE(21); return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1]; }
  throw new Error('not a webp: ' + file);
}

const files = readdirSync(IMG);

// Every images/<name>-<width>.webp, smallest first.
function variants(name) {
  const re = new RegExp('^' + name.replace(/[-]/g, '\\-') + '-(\\d+)\\.webp$');
  const list = files.map((f) => f.match(re)).filter(Boolean).map((m) => {
    const [w, h] = webpSize(join(IMG, m[0]));
    return { file: m[0], w, h };
  });
  if (!list.length) throw new Error('no images for ' + name);
  return list.sort((a, b) => a.w - b.w);
}

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// <img> with srcset, sizes, width and height filled in from the files.
export function img(name, alt, { sizes = '100vw', eager = false, cls = '' } = {}) {
  const v = variants(name);
  const src = [...v].reverse().find((x) => x.w <= 1600) || v[0];
  const srcset = v.length > 1 ? ` srcset="${v.map((x) => `/images/${x.file} ${x.w}w`).join(', ')}" sizes="${sizes}"` : '';
  const load = eager ? ' fetchpriority="high"' : ' loading="lazy"';
  return `<img src="/images/${src.file}"${srcset} width="${src.w}" height="${src.h}" alt="${esc(alt)}"${load} decoding="async"${cls ? ` class="${cls}"` : ''}>`;
}

// A desktop screenshot with the page's address above it.
export function win(name, url, alt, opts = {}) {
  return `<div class="win"><div class="win-bar">${url}</div><div class="win-body">${img(name, alt, opts)}</div></div>`;
}

// A phone screenshot.
export function phone(name, alt, { land = false, sizes = '250px' } = {}) {
  return `<figure class="phone reveal${land ? ' land' : ''}"><div class="screen">${img(name, alt, { sizes })}</div></figure>`;
}

// A smaller screenshot with a caption under it.
export function plate(name, url, alt, title, note) {
  return `<figure class="plate reveal">${win(name, url, alt, { sizes: '(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 560px' })}<figcaption><b>${title}</b> ${note}</figcaption></figure>`;
}

/* ------------------------------------------------------------ schema */

export const person = {
  '@type': 'Person',
  '@id': SITE + '/#person',
  name: 'Hyrum Whittier',
  url: SITE + '/',
  image: SITE + '/images/hyrum.jpg',
  jobTitle: 'SEO Specialist and Internal Tools Builder',
  email: 'mailto:' + EMAIL,
  address: { '@type': 'PostalAddress', addressLocality: 'Rexburg', addressRegion: 'ID', addressCountry: 'US' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Brigham Young University-Idaho' },
  knowsAbout: ['Local SEO', 'Technical SEO', 'Structured data', 'Web design', 'Web development', 'Page builder migration'],
  sameAs: [LINKEDIN],
};

const website = {
  '@type': 'WebSite',
  '@id': SITE + '/#website',
  url: SITE + '/',
  name: 'Hyrum Whittier',
  publisher: { '@id': SITE + '/#person' },
  inLanguage: 'en-US',
};

function graph(p) {
  const url = SITE + p.path;
  const nodes = [website, person];
  const pageNode = {
    '@type': p.pageType || 'WebPage',
    '@id': url + '#webpage',
    url,
    name: p.title,
    description: p.description,
    isPartOf: { '@id': SITE + '/#website' },
    inLanguage: 'en-US',
    primaryImageOfPage: { '@type': 'ImageObject', url: SITE + (p.image || '/images/share.png') },
  };
  if (p.path === '/' || p.pageType === 'ProfilePage') pageNode.about = { '@id': SITE + '/#person' };
  if (p.crumbs) {
    pageNode.breadcrumb = { '@id': url + '#breadcrumb' };
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': url + '#breadcrumb',
      itemListElement: [['Home', '/'], ...p.crumbs].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + path })),
    });
  }
  nodes.push(pageNode);
  if (p.schema) nodes.push(...p.schema);
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }, null, 1);
}

/* ------------------------------------------------------------ layout */

// The sticky top bar. On narrow screens the links fold into a menu.
const NAV = [
  { href: '/seo/', label: 'SEO', key: 'seo' },
  { href: '/work/', label: 'Work', key: 'work' },
  { href: '/tools/', label: 'Apps and tools', key: 'tools' },
  { href: '/about/', label: 'About', key: 'about' },
  { href: '/contact/', label: 'Contact', key: 'contact', cls: 'nav-cta' },
];

function topbar(p) {
  const links = NAV.map((n) => {
    const cls = [n.cls, p.nav === n.key ? 'is-on' : ''].filter(Boolean).join(' ');
    const cur = p.path === n.href ? ' aria-current="page"' : '';
    return `      <a href="${n.href}"${cls ? ` class="${cls}"` : ''}${cur}>${n.label}</a>`;
  }).join('\n');
  return `<header class="topbar" id="topbar">
  <div class="wrap topbar-inner">
    <a class="brand" href="/"${p.path === '/' ? ' aria-current="page"' : ''}>Hyrum Whittier</a>
    <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="nav" aria-label="Open menu">
      <span class="menu-bars" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="menu-word">Menu</span>
    </button>
    <nav class="nav" id="nav" aria-label="Main">
${links}
      <a class="nav-mail" href="mailto:${EMAIL}">${EMAIL}</a>
    </nav>
  </div>
</header>
<div class="nav-scrim" id="navScrim" hidden></div>`;
}

// The light panel that closes every page except Contact.
const closer = `
<section class="contact contact--short" aria-labelledby="closer-h">
  <div class="wrap">
    <p class="label reveal">Contact</p>
    <h2 class="reveal" id="closer-h">Tell me about the site.</h2>
    <p class="standfirst reveal">Websites start at $2,000. Email is the quickest way to reach me.</p>
    <p class="contact-mail reveal"><a href="mailto:${EMAIL}">${EMAIL}</a></p>
    <p class="contact-alt reveal">
      <a class="txtlink" href="/contact/">Contact form and questions</a>
      <a class="txtlink" href="${LINKEDIN}" rel="me">LinkedIn</a>
      <span>${WHERE}</span>
    </p>
  </div>
</section>`;

export function layout(p) {
  const url = SITE + p.path;
  const ogImage = SITE + (p.image || '/images/share.png');
  const robots = p.noindex ? '\n<meta name="robots" content="noindex">' : '';
  const canonical = p.noindex ? '' : `\n<link rel="canonical" href="${url}">`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">${canonical}${robots}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Hyrum Whittier">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0c0d0e">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/images/hyrum-400.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;450;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css?v=${VERSION}">
<script type="application/ld+json">
${graph(p)}
</script>
</head>
<body class="pg-${p.slug}">

<a class="skip" href="#main">Skip to content</a>

${topbar(p)}

<main class="main" id="main">
${p.body.trim()}
${p.noCloser ? '' : closer}
</main>

<footer class="colophon">
  <div class="wrap colophon-inner">
    <p>&copy; 2026 Hyrum Whittier</p>
    <p class="clock" id="clock">${WHERE}</p>
    <p><a href="#main">Back to top</a></p>
  </div>
</footer>

<script src="/app.js?v=${VERSION}" defer></script>
</body>
</html>
`;
}
