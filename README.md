# hyrumwhittier.com, seventh edition

Hyrum Whittier's portfolio: websites, apps and SEO in Utah and Idaho.

Dark pages, one sans at a medium weight, big quiet headings and one orange accent. The home page opens on my name with my photo beside it. Right under the hero, the Work list on the home page is a list of names with a preview window that follows the pointer, and every project has its own page. Every page ends on a light panel with a round "Get in touch" button. Buttons fill with a second colour from the bottom on hover. Static HTML, CSS and vanilla JS. A small Node script writes the pages, with no dependencies.

```
build.mjs           node build.mjs writes every page and sitemap.xml
src/lib.mjs         the layout, the top bar, the closing panel, image helpers, JSON-LD
src/case.mjs        the layout shared by the eleven project pages
src/projects.mjs    the project list, in order, which is the Work list on the home page
src/pages/*.mjs     one file per page
styles.css          everything visual
app.js              clock, phone menu, reveals, hover preview, round buttons, button fill, clips, form
images/             WebP screenshots at two widths, portrait, photos, share card
video/              b6-hero.mp4, the clip that plays in the Bravo 6 window
favicon.svg
robots.txt
.nojekyll           keeps GitHub Pages from running the files through Jekyll
```

The built pages (`index.html`, `seo/`, `work/`, `tools/`, `about/`, `contact/`, `404.html`) and `sitemap.xml` are output. Edit `src/` and rebuild instead of editing them.

`local-seo/` is output too: the SEO page used to live there, so `build.mjs` writes a small page that forwards to `/seo/`. `/work/` forwards to `/#work` the same way, since the Work list moved to the home page. Add to `moved` in `build.mjs` if another page changes address.

## Pages

| URL | What's on it |
| --- | --- |
| `/` | Hero with my name and photo, then straight into the Work list with all eleven projects (`#work`, which the top bar's Work link opens), SEO |
| `/work/<project>/` | Memphis, Tarmac, Helios, Traffic Control, Printology, Bravo 6 Flight Academy, Outdoors for Youth, Muscle Activation Center, RexRide, Loafa, Blood Ante |
| `/tools/` | The four apps from work (Memphis, Tarmac, Helios, Traffic Control), Enterprise Mockups and the smaller tools. The top bar calls it Apps. |
| `/seo/` | Enterprise work for the payments processor, local businesses and town pages, what I check |
| `/about/` | Who I am, what I can build, background |
| `/contact/` | The form and common questions |

## Rules for the wording

- No price anywhere on the site.
- The apps get as much room as the websites.
- A project that isn't public is "not live yet". Don't call it unfinished or in progress.
- The order of `projects` in `src/projects.mjs` is most impressive first, and the home page shows it in that order. Each project page's `next` link follows the same order and wraps from Blood Ante back to Memphis.
- Memphis and Helios are live. Tarmac and Traffic Control are not live yet.
- Nothing on the site names AI, even though some of the products have AI features. Screenshots of the Memphis site leave out its AI menu.

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
- `image` sets the share image. `noCloser` drops the closing panel at the bottom.

Add a link to `NAV` in `src/lib.mjs` if the page belongs in the top bar.

A project page passes one object to `caseBody()` in `src/case.mjs`. `live` adds the round button over the first screenshot, `liveLabel` changes what it says, and `off: true` adds "Not live yet" beside the title.

## Images and the clip

`img('name', alt)` finds every `images/name-<width>.webp` and writes the `srcset`, width and height. `win()` puts a screenshot under an address bar, `phone()` frames a phone shot, and `plate()` is a smaller window with a caption. `shot()` gives the address of one size, for the hover preview.

`win(..., { video: 'b6-hero' })` lays `video/b6-hero.mp4` over the screenshot. The clip plays silently while it's on screen. With reduced motion or data saving on, the screenshot stays. If the file is missing the build says so and uses the screenshot alone.

`b6-hero.mp4` is nine seconds of the Bravo 6 home page, recorded from the live site in headless Chrome at 1440x812 and scaled to 1280 wide. The last second fades into the first, so it loops without a jump.

Client sites were captured on their live domains with headless Chrome: 1440x900 at 2x for desktop, 390x844 at 3x for phones, chat widgets hidden. Desktop shots are WebP at 1600 and 800 wide, phones at 780 and 390. The four apps are shots of their public sites, taken one screen at a time so their scroll animations had run. The Memphis shots are its own app screenshots, cropped from its site. No app shot shows a price. The Muscle Activation Center notes app and the Printology rebuild were captured from local builds with demo data, since neither is public. Printology shots never show a staff screen with names in it.

`images/share.png` is the home page hero at 1200x630 with the top bar hidden.

The photo in the home hero is `images/hyrum-*.webp`. On a wide screen it runs from the top of the small line above the name down to the baseline of the name. `--face-h` in `styles.css` sets that from the name's size, so change them together. On a phone it sits above the name.

## Buttons

`.round` is the big round button and `.ring` is the outlined pill. Both fill with a second colour that rises from the bottom on hover. With the script running, the colour leaves through the top when the pointer moves away. `--fill` and `--fill-ink` set the two colours, and the light panels swap them.

The Teton photo is by David Chalifoux, CC0.

## Deploying

A push to `main` on `whittierht/whittierht.github.io` publishes the site. Run `node build.mjs` first so the pages and sitemap are current.

The site lives at `https://hyrumwhittier.com`. The domain is registered at Namecheap, with four A records on `@` pointing at GitHub Pages (185.199.108.153 to 185.199.111.153) and a `www` CNAME to `whittierht.github.io`. The `CNAME` file in the repo tells Pages which domain to serve, and Pages forwards `whittierht.github.io` to it. The canonical URLs, `og:url`, JSON-LD and sitemap all come from `SITE` in `src/lib.mjs`, so if the domain ever changes, change `SITE`, `robots.txt` and `CNAME`, then rebuild.

## Not used any more

`video/b6.mp4`, `video/loafa.mp4`, `video/ofy.mp4` and some older images (`game-*`, `loafa-hero2`, `loafa-home` and others) are left over from earlier editions. Nothing links to them.
