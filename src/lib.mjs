// Shared pieces for every page: the layout, the screenshot frames and the JSON-LD.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));
export const SITE = 'https://hyrumwhittier.com';
export const EMAIL = 'whittierht@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/hyrum-whittier/';
export const WHERE = 'Utah and Idaho';
export const VERSION = '7.0';

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

// The address of one size of an image, for the hover preview on project rows.
export function shot(name, want = 800) {
  const v = variants(name);
  return '/images/' + (v.find((x) => x.w >= want) || v[v.length - 1]).file;
}

// A short silent clip that plays over a screenshot once it scrolls into
// view. It lives at video/<name>.mp4. The screenshot stays underneath, so
// a browser that never plays the clip still shows the page.
const clips = existsSync(join(ROOT, 'video')) ? readdirSync(join(ROOT, 'video')) : [];
export function clip(name) {
  if (!name) return '';
  if (!clips.includes(name + '.mp4')) { console.warn('no video/' + name + '.mp4, showing the still only'); return ''; }
  return '/video/' + name + '.mp4';
}

// A desktop screenshot with the page's address above it.
export function win(name, url, alt, opts = {}) {
  const { video, ...rest } = opts;
  const src = clip(video);
  const film = src ? `<video class="win-video" data-autoplay muted loop playsinline preload="none" tabindex="-1" aria-hidden="true"><source src="${src}" type="video/mp4"></video>` : '';
  return `<div class="win"><div class="win-bar">${url}</div><div class="win-body">${img(name, alt, rest)}${film}</div></div>`;
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
  knowsAbout: ['Web applications', 'Web development', 'Web design', 'Local SEO', 'Technical SEO', 'Structured data', 'Page builder migration'],
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
  { href: '/work/', label: 'Work', key: 'work' },
  { href: '/tools/', label: 'Apps', key: 'tools' },
  { href: '/seo/', label: 'SEO', key: 'seo' },
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

// A small round photo that sits inside a big heading.
export const face = `<span class="face" aria-hidden="true">${img('hyrum', '', { sizes: '120px' })}</span>`;

// The light panel that closes every page except Contact.
const closer = `
<section class="closer" aria-labelledby="closer-h">
  <div class="wrap">
    <h2 class="closer-h reveal" id="closer-h">${face}Let's talk about<br>your site or app</h2>
    <div class="closer-line reveal"><a class="round" href="/contact/"><span>Get in touch</span></a></div>
    <p class="closer-links reveal">
      <a class="ring" href="mailto:${EMAIL}">${EMAIL}</a>
      <a class="ring" href="${LINKEDIN}" rel="me">LinkedIn</a>
    </p>
    <p class="closer-note reveal">Rexburg, Idaho. I work with businesses in ${WHERE}.</p>
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
    <div><p class="colo-k">Version</p><p>2026 &copy; Hyrum Whittier</p></div>
    <div><p class="colo-k">Local time</p><p class="clock" id="clock">${WHERE}</p></div>
    <div><p class="colo-k">Elsewhere</p><p><a href="${LINKEDIN}" rel="me">LinkedIn</a></p></div>
    <div class="colo-top"><p class="colo-k">Page</p><p><a href="#main">Back to top</a></p></div>
  </div>
</footer>

<script src="/app.js?v=${VERSION}" defer></script>
</body>
</html>
`;
}
