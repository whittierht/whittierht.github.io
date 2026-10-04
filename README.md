# hyrumwhittier.com, third edition

Portfolio site. Static HTML, CSS and vanilla JS. No framework, no libraries, no build step.

```
index.html     the whole site
styles.css     tokens, the grid, every module
app.js         video loading, the one fade-in, menu, copy button, form
images/        screenshots as WebP in two sizes, portrait, panorama, share card
video/         scroll recordings of three live sites (loafa, b6, ofy)
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
- Type: Archivo variable from Google Fonts at its narrowest width for headings, IBM Plex Mono for URLs and small labels.
- Panorama: Grand Teton lake by David Chalifoux, CC0 1.0, free to use commercially without attribution.

## Layout

One 12-column grid at 900px and up. The same three lines keep coming back: the left edge, column 7 and column 10.

- `.head` opens every section: a hairline rule, the title in columns 1 to 6, the lede and details in columns 7 to 12, both sitting on the same baseline.
- `.lead` is a browser window across columns 1 to 9 with a phone in columns 10 to 12. The window sets the row height and the phone is fitted inside it. `.lead--flip` swaps the sides.
- `.shots` is the grid of stills under a lead, three across. `.shots--8` (Loafa) starts with a row of two.
- From 600px to 899px the stills go two across. Below that everything is one column, with a full-screen menu.

### The name

The name fills the column edge to edge in CSS alone. `.hero` is a size container and the font size is `100cqw` divided by the width of the ink in ems, measured at weight 900 with `letter-spacing: -.012em`:

- Stacked, below 900px: `3.6`. HYRUM is set at `"wdth" 89.44` so it comes out as wide as WHITTIER at 62.
- One line, 900px and up: `6.3125`, both words at 62.

The small negative left margins pull the H's side bearing out so the ink starts on the column edge. Change the name, the weight or the letter spacing and those numbers need measuring again.

## Motion

There is very little, on purpose.

- Pictures marked `[data-rv]` fade in once as they arrive. `app.js` adds `.rv-on` to the root only when IntersectionObserver exists and motion is allowed, and it marks anything already on screen first, so nothing visible gets hidden.
- In-page links scroll smoothly. `[id]` carries a `scroll-margin-top` so targets clear the top bar.
- Videos have no `src` until they are near the viewport and only play while on screen.
- `prefers-reduced-motion: reduce` turns the fade and the smooth scroll off and gives the videos controls instead of autoplay.

With JS off the page is complete: posters stand in for the videos and the form posts normally.

## Images and video

Client sites and the Loafa site were captured on their live domains on 2026-10-04 with headless Chrome: 1440x900 at 2x for desktop, 390x844 at 3x for phone, chat widgets hidden. Stills are WebP at 1600 and 800 wide (phones at 780 and 390).

The videos are frame-by-frame scroll recordings at 1280x800, cropped to 1120x700, 30 fps, H.264 at CRF 30, no audio. Keep that 16:10 frame so the windows and their posters line up (`aspect-ratio: 1120 / 700` in `styles.css`).

Memphis and Tarmac are screenshots supplied from the running apps. `images/share.png` is the top of the page at 1200x630 with the top bar hidden.
