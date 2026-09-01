# hyrumwhittier.com, second edition

Portfolio site. Static HTML, CSS and vanilla JS. No framework, no build step.

```
index.html     the whole site
styles.css     tokens, layout, motion
app.js         clock, theme, scroll spy, reveals, parallax
images/        screenshots (2880x1800 desktop, 1170x2532 phone), portrait, panorama, share card
robots.txt
sitemap.xml
.nojekyll      keeps GitHub Pages from running the files through Jekyll
```

## Running locally

```bash
python3 -m http.server 5599 --directory .
```

Then open http://localhost:5599/. Opening index.html straight from disk also works.

## Deploying

Push the folder contents to `main` on `whittierht/whittierht.github.io`. A push is a publish.

The canonical, `og:url` and the JSON-LD all point at `https://whittierht.github.io/`, because that is the URL that resolves today. When `hyrumwhittier.com` is pointed at Pages and a `CNAME` file is added, search-and-replace that host in `index.html`, `sitemap.xml` and `robots.txt`.

## Design

- Type: Inter Tight (display) and Inter (text) from Google Fonts, the same pair as the first edition. Drop the `<link>` and the system stacks take over.
- Colour: a light page with a burnt orange accent under the first edition's dark photographic hero. A dark scheme follows the OS and can be forced with the Light / dark button (stored in `localStorage` as `hw-theme`). The hero and the contact panel keep their own literal colours in both themes.
- Layout: a fixed left rail with a scroll-spied table of contents on desktop, a sticky top bar below 1100px.
- Hero photo: Grand Teton lake panorama by David Chalifoux, CC0 1.0, free to use commercially without attribution.

## Motion

`app.js` adds `js-anim` to `<html>` and only that class hides anything, so with JS off or `prefers-reduced-motion: reduce` the page renders complete and static.

- Name rides up letter by letter on load (`[data-split]`), with a 3s fallback that forces the resting state
- Hero photo pans slowly; film grain sits over the hero only
- Blocks fade in on scroll (`.reveal`), rows stagger (`.stagger > *`)
- Screenshots develop from the top. The clip is on the `img`, never on the observed element.
- The portrait goes from grey to colour as it rises through the viewport

## Images

Client sites were captured on their live domains on 2026-09-01 with Playwright: 1440x900 at 2x for desktop, 390x844 at 3x for phone, Safari user agent, chat widgets removed. Re-capture with the same settings so the frames keep their aspect ratios (`1440 / 900` and `390 / 844` in `styles.css`).

Games were captured from the local builds at 1280x720 at 2x. Memphis and Tarmac screenshots are the originals from the first edition.
