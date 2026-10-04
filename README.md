# hyrumwhittier.com, third edition

Portfolio site. Static HTML, CSS and vanilla JS. No framework, no build step.

```
index.html     the whole site
styles.css     tokens, layout, the hero's scroll states
app.js         type fitting, scroll motion, video loading, menu, form
images/        screenshots as WebP in two sizes, portrait, panorama, share card
video/         scroll recordings of the four live sites
robots.txt
sitemap.xml
.nojekyll      keeps GitHub Pages from running the files through Jekyll
```

## Running locally

```bash
python -m http.server 5599 --directory .
```

Then open http://localhost:5599/. The videos need a server; everything else also works straight from disk.

## Deploying

Push the folder contents to `main` on `whittierht/whittierht.github.io`. A push is a publish.

The canonical, `og:url` and the JSON-LD all point at `https://whittierht.github.io/`, because that is the URL that resolves today. When `hyrumwhittier.com` is pointed at Pages and a `CNAME` file is added, search-and-replace that host in `index.html`, `sitemap.xml` and `robots.txt`.

## Design

- Colour: black paper (`--ink`), bone type, one flat orange (`--hot`). Tools and Enterprise sit on a paper section, Contact on the orange. No shadows, gradients or rounded corners.
- Type: Archivo variable from Google Fonts, used on its width axis (62 to 125). IBM Plex Mono for URLs and small labels, Covered By Your Grace for the three handwritten bits.
- The name and the section headings are fitted to their container by `app.js`, which solves the width axis per line. The CSS fallbacks (`--w1`, `--w2`, `--name-size`) are close enough with JS off.
- Layout: a normal full-width top bar, a full-screen menu below 900px.
- Panorama: Grand Teton lake by David Chalifoux, CC0 1.0, free to use commercially without attribution.

## Motion

GSAP 3.13 with ScrollTrigger and Lenis, all from CDNs. If any of them fails to load, the page stays static and complete. Only the hero intro hides anything, behind `.js-anim:not(.ready)`, and an inline timer in the head lifts that after 3.5s no matter what.

- Hero: on a landscape window 900px or wider the hero pins and `--p` runs 0 to 1. CSS grows the Loafa print from the pile into a centred window off that one number, and the name squeezes to its narrowest width behind it.
- Loafa reel: a swipe strip by default, pinned and scrubbed sideways at 900px and up
- Headings stretch along the width axis as they scroll in (`[data-kin]`)
- Screenshots wipe up from the bottom (`[data-wipe]`), text rises (`[data-rise]`), phones and photos drift (`[data-speed]`)
- Videos have no `src` until they are near the viewport and only play while on screen
- `prefers-reduced-motion: reduce` turns all of it off: headings are fitted and still, videos get controls instead of autoplay

## Images and video

Client sites and the Loafa site were captured on their live domains on 2026-10-04 with headless Chrome: 1440x900 at 2x for desktop, 390x844 at 3x for phone, chat widgets hidden. Stills are WebP at 1600 and 800 wide (phones at 780 and 390).

The videos are frame-by-frame scroll recordings at 1280x800, cropped to 1120x700, 30 fps, H.264 at CRF 30, no audio. Keep that 16:10 frame so the windows and their posters line up (`aspect-ratio: 1120 / 700` in `styles.css`).

Memphis and Tarmac are screenshots supplied from the running apps. `images/share.png` is the hero at 1200x630 with the top bar hidden.
