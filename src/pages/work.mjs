import { win } from '../lib.mjs';

export const projects = [
  {
    href: '/work/loafa/',
    name: 'Loafa',
    img: 'loafa-top',
    url: 'loafa-band.web.app',
    alt: 'The Loafa home page: a yellow hand-drawn LOAFA logo on black',
    kicker: ['Band site', 'Provo, Utah', '2026'],
    place: 'Provo, Utah',
    line: 'Band site. One HTML file, every release on a sideways timeline.',
    text: 'An alt rock band from Provo. The site is one HTML file with no libraries. Every song has a preview, and all eight releases sit on a sideways timeline.',
    live: 'https://loafa-band.web.app/',
  },
  {
    href: '/work/bravo-6-flight-academy/',
    name: 'Bravo 6 Flight Academy',
    img: 'b6-home',
    url: 'bravo6flightacademy.com',
    alt: 'The Bravo 6 Flight Academy home page',
    kicker: ['Flight school', 'Rexburg and Pocatello, Idaho', '2026'],
    place: 'Rexburg and Pocatello, Idaho',
    line: 'Flight school. WordPress to 135 static pages, plus two tools.',
    text: 'A Divi site rebuilt as 135 static pages by two Python scripts. Under Resources, Is It Flyable Today checks the weather live. Next to it is a map of the training areas.',
    live: 'https://bravo6flightacademy.com/',
  },
  {
    href: '/work/outdoors-for-youth/',
    name: 'Outdoors for Youth',
    img: 'ofy-home',
    url: 'outdoorsforyouth.org',
    alt: 'The Outdoors for Youth home page',
    kicker: ['Teen adventure camp', 'Newdale, Idaho', '2026'],
    place: 'Newdale, Idaho',
    line: 'Teen adventure camp. Off Wix, 22 pages, custom registration.',
    text: 'Off Wix and onto 22 hand-coded pages, with every slug matched so the rankings carried over. The seven-step registration form saves answers so a parent can finish later.',
    live: 'https://www.outdoorsforyouth.org/',
  },
  {
    href: '/work/nadias-dog-nanny/',
    name: "Nadia's Dog Nanny Services",
    img: 'nadia-home',
    url: 'nadiawalksdogs.com',
    alt: "The Nadia's Dog Nanny Services home page",
    kicker: ['Boarding and daycare', 'Phoenix, Arizona', '2026'],
    place: 'Phoenix, Arizona',
    line: 'Boarding and daycare. Off GoDaddy, 14 pages, schema on every one.',
    text: "Off GoDaddy's builder and onto 14 hand-coded pages, one schema graph each. The builder had the schema pointing at a made-up domain.",
    live: 'https://nadiawalksdogs.com/',
  },
  {
    href: '/work/blood-ante/',
    name: 'Blood Ante',
    img: 'ba-play',
    url: 'bloodantegame.web.app',
    alt: 'Blood Ante in play: pixel-art knights on a card floor',
    kicker: ['My own game', 'Version 0.6'],
    place: 'My own game',
    line: 'A pixel-art card game for the browser.',
    text: 'A pixel-art card game. It runs in the browser on a phone or a computer. Your weapons fire on their own while you pick up playing cards and play them as hands.',
    live: 'https://bloodantegame.web.app/',
    liveLabel: 'Play it',
  },
];

// The list of projects, as rows. Used here and on the home page.
export const workIndex = `
    <ol class="index stagger">
${projects.map((p) => `      <li>
        <a class="ix" href="${p.href}">
          <span class="ix-name">${p.name}</span>
          <span class="ix-sector">${p.line}</span>
          <span class="ix-place">${p.place}</span>
          <span class="ix-year">${p.kicker.length > 2 ? p.kicker[2] : ''}</span>
        </a>
      </li>`).join('\n')}
    </ol>`;

export default {
  path: '/work/',
  slug: 'work',
  nav: 'work',
  priority: 0.9,
  pageType: 'CollectionPage',
  title: 'Work | Hyrum Whittier',
  description: "Websites I've designed and built for Loafa, Bravo 6 Flight Academy, Outdoors for Youth and Nadia's Dog Nanny Services, plus a browser game of my own.",
  crumbs: [['Work', '/work/']],
  image: '/images/loafa-top-1600.webp',
  body: `
<header class="page-top">
  <div class="wrap">
    <p class="label reveal">Work</p>
    <h1 class="reveal">Recent builds</h1>
    <p class="standfirst reveal">Four hand-coded client sites, all live, and a game of my own. Search work also runs on accounts I haven't rebuilt, like Madison Health in Rexburg.</p>
  </div>
</header>

<section class="sec" aria-label="Projects">
  <div class="wrap">
    <div class="work-rows">
${projects.map((p) => `      <article class="work-row">
        <div class="reveal">${win(p.img, p.url, p.alt, { sizes: '(max-width: 900px) 92vw, 640px' })}</div>
        <div class="reveal">
          <p class="case-kicker">${p.kicker.map((k) => `<span>${k}</span>`).join('')}</p>
          <h2><a href="${p.href}">${p.name}</a></h2>
          <p>${p.text}</p>
          <p class="case-links"><a class="txtlink" href="${p.href}">The full project</a><a class="txtlink" href="${p.live}">${p.liveLabel || p.url}</a></p>
        </div>
      </article>`).join('\n')}
    </div>
  </div>
</section>
`,
};
