# whittierht.github.io, fifth edition

Hyrum Whittier's portfolio: web design and local SEO in Utah and Idaho.

It's the second edition's look (dark, the Tetons and the big name) split into separate pages, with a sticky top bar. On phones the links fold into a menu. Static HTML, CSS and vanilla JS. A small Node script writes the pages, with no dependencies.

```
build.mjs           node build.mjs writes every page and sitemap.xml
src/lib.mjs         the layout, the top bar, the contact panel, image helpers, JSON-LD
src/case.mjs        the layout shared by the five project pages
src/pages/*.mjs     one file per page
styles.css          everything visual
app.js              clock, phone menu, reveals, copy button, form
images/             WebP screenshots at two widths, portrait, photos, share card
favicon.svg
robots.txt
.nojekyll           keeps GitHub Pages from running the files through Jekyll
```

The built pages (`index.html`, `seo/`, `work/`, `tools/`, `about/`, `contact/`, `404.html`) and `sitemap.xml` are output. Edit `src/` and rebuild instead of editing them.

`local-seo/` is output too: the SEO page used to live there, so `build.mjs` writes a small page that forwards to `/seo/`. Add to `moved` in `build.mjs` if another page changes address.

## Pages

| URL | What's on it |
| --- | --- |
| `/` | Hero, background strip, SEO first, the project list, Blood Ante, apps |
| `/seo/` | Enterprise work for the payments processor, local businesses and town pages, what I check |
| `/work/` | One screenshot per project |
| `/work/<project>/` | Loafa, Bravo 6 Flight Academy, Outdoors for Youth, Nadia's Dog Nanny, Blood Ante |
| `/tools/` | Memphis, Tarmac, Enterprise Mockups and the smaller tools |
| `/about/` | Background, the mission, family |
| `/contact/` | The form and common questions |

## Building and running locally

```bash
node build.mjs
python -m http.server 5599
```

Then open http://localhost:5599/. Links are root-relative, so open the site through a server, not from disk.

## Adding a page

Add a file to `src/pages/` that exports `{ path, slug, nav, title, description, body }`. Optional fields:

- `priority` sets the order in the sitemap. `noindex` leaves the page out of it.
- `crumbs` adds a BreadcrumbList. `schema` adds extra JSON-LD nodes. `pageType` changes the WebPage type.
- `image` sets the share image. `noCloser` drops the contact panel at the bottom.

Add a link to `NAV` in `src/lib.mjs` if the page belongs in the top bar.

## Images

`img('name', alt)` finds every `images/name-<width>.webp` and writes the `srcset`, width and height. `win()` puts a screenshot under an address bar, `phone()` frames a phone shot, and `plate()` is a smaller window with a caption.

Client sites were captured on their live domains with headless Chrome: 1440x900 at 2x for desktop, 390x844 at 3x for phones, chat widgets hidden. Desktop shots are WebP at 1600 and 800 wide, phones at 780 and 390. Memphis and Tarmac are screenshots from the running apps.

`images/share.png` is the home page hero at 1200x630 with the top bar hidden.

The Teton photo is by David Chalifoux, CC0.

## Deploying

A push to `main` on `whittierht/whittierht.github.io` publishes the site. Run `node build.mjs` first so the pages and sitemap are current.

The canonical URLs, `og:url`, JSON-LD and sitemap all use `https://whittierht.github.io`. If a custom domain gets pointed at Pages, change `SITE` in `src/lib.mjs`, update `robots.txt`, add a `CNAME` file and rebuild.

## Not used any more

`video/` and some older images (`game-*`, `loafa-hero2`, `loafa-home` and others) are left over from earlier editions. Nothing links to them.
