# hyrumwhittier.com

Portfolio site. Static HTML, CSS and vanilla JS. No framework, no build step.

```
index.html
styles.css
app.js
images/
```

## Running locally

Open `index.html`, or serve the folder:

```bash
python -m http.server 5599 --directory .
```

## Deploying

Deployed to GitHub Pages from `main`. `.nojekyll` keeps Pages from running the
files through Jekyll. To host elsewhere, upload the folder to any static host.

The only external request is the Google Fonts stylesheet for Inter and Inter
Tight. Drop that `<link>` and the system sans stack takes over.

## Structure

| Section | Content |
|---|---|
| Hero | Name, statement, credential strip |
| 01 Work | Index table and three case studies |
| 02 Services | Eight service lines |
| 03 Beyond websites | Memphis and Tarmac, plus smaller tools |
| 04 Enterprise | Payments account |
| 05 About | Background and degree |
| Contact | Inverted closing panel |

## Motion

`app.js` adds `js-anim` to `<html>` and only that class hides anything, so with
JS off or `prefers-reduced-motion: reduce` the page renders complete and static.

- Scroll progress bar
- Name reveals letter by letter
- Masked line reveals on section headings
- Screenshots wipe open from the top
- Portrait desaturates to colour on scroll (`--gs`)
- Sticky case meta and portrait columns
- Hover preview on the work index, pointer devices only
- Film grain overlay

Two things to keep in mind when touching the screenshot reveal:

- The clip goes on the `img`, never on `.shot`. `.shot` is the element the
  IntersectionObserver watches, and clipping it to zero height makes the
  observer treat it as off screen, so it never gets the class that opens it.
- `.shot-frame img` is top-anchored and cropped from the bottom. Adding a
  vertical drift crops the captured site's own header, which is the part
  worth showing.

## Images

Case screenshots captured at 1440x1000, heroes resized to 1400px wide and
supporting plates to 1000px.

| Case | Hero | Plates |
|---|---|---|
| Bravo 6 | `bravo6.jpg` | `b6-flyable.jpg`, `b6-map.jpg`, `b6-news.jpg` |
| Outdoors for Youth | `ofy.jpg` | `ofy-register.jpg`, `ofy-camp.jpg`, `ofy-tetons.jpg` |
| Nadia's | `nadia.jpg` | `nadia-services.jpg`, `nadia-boarding.jpg`, `nadia-edu.jpg` |
| Memphis | `memphis.jpg` | shown in the Systems section |
| Tarmac | `tarmac-tight.jpg` | shown in the Systems section |

Hero background is `hero-tetons.jpg`, David Chalifoux's *Grand Teton lake
panorama*, released under CC0 1.0 and free to use commercially without
attribution.
[Source](https://commons.wikimedia.org/wiki/File:Grand_Teton_lake_panorama_(Unsplash).jpg)

## Notes

- Name size is one value: the middle of `font-size: clamp(...)` on `.name`.
- Canonical URL and Open Graph tags point at `https://hyrumwhittier.com/`.
  Update if the domain changes.
