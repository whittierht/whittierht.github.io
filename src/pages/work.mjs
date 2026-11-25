import { win, shot, clip } from '../lib.mjs';

// Every project, most impressive first. `off` marks one that isn't live yet.
// `short` is the line used on the home page.
export const projects = [
  {
    href: '/tools/#memphis',
    name: 'Memphis',
    img: 'memphis-site',
    url: 'memphistasks.com',
    alt: 'The Memphis site: The task board that fills in your timesheet',
    where: 'Built at my job',
    what: 'Task and timesheet app, and its site',
    short: 'Task and timesheet app',
    off: true,
  },
  {
    href: '/tools/#tarmac',
    name: 'Tarmac',
    img: 'tarmac-site',
    url: 'tarmacflight.com',
    alt: 'The Tarmac site: First call to checkride',
    where: 'Built at my job',
    what: 'Flight school app, and its site',
    short: 'Flight school app',
    off: true,
  },
  {
    href: '/tools/#helios',
    name: 'Helios',
    img: 'helios',
    url: 'heliosclock.com',
    alt: 'The Helios site: Every hour, accounted for',
    where: 'Built at my job',
    what: 'Time clock and HR app, and its site',
    short: 'Time clock and HR app',
    off: true,
  },
  {
    href: '/tools/#traffic-control',
    name: 'Traffic Control',
    img: 'traffic',
    url: 'trafficcontrolphone.com',
    alt: 'The Traffic Control site: Your phones, under control',
    where: 'Built at my job',
    what: 'Business phone system, and its site',
    short: 'Business phone system',
    off: true,
  },
  {
    href: '/work/printology/',
    name: 'Printology',
    img: 'pr-home',
    url: 'Printology rebuild · not live yet',
    alt: 'The rebuilt Printology home page: Print shop in American Fork and Saratoga Springs, Utah',
    where: 'American Fork, Utah',
    what: 'Online store and staff back office',
    short: 'Online store and back office',
    off: true,
  },
  {
    href: '/work/bravo-6-flight-academy/',
    name: 'Bravo 6 Flight Academy',
    img: 'b6-home',
    video: 'b6-hero',
    url: 'bravo6flightacademy.com',
    alt: 'The Bravo 6 Flight Academy home page: Take flight',
    where: 'Rexburg, Idaho',
    what: 'Website with a cost calculator',
    short: 'Website and cost calculator',
  },
  {
    href: '/work/outdoors-for-youth/',
    name: 'Outdoors for Youth',
    img: 'ofy-home',
    url: 'outdoorsforyouth.org',
    alt: 'The Outdoors for Youth home page',
    where: 'Newdale, Idaho',
    what: 'Website and paid camp registration',
    short: 'Website and paid registration',
  },
  {
    href: '/work/muscle-activation-center/',
    name: 'Muscle Activation Center',
    img: 'mac-home',
    url: 'muscleactivationcenter.com',
    alt: 'The Muscle Activation Center home page: Find the root cause of muscle pain and weakness',
    where: 'Idaho Falls, Idaho',
    what: 'Website and session notes app',
    short: 'Website and notes app',
  },
  {
    href: '/work/rexride/',
    name: 'RexRide',
    img: 'rexride-site',
    url: 'rexride-staging.web.app',
    alt: 'The RexRide site: Rides out of Rexburg, posted by students',
    where: 'Rexburg, Idaho',
    what: 'Ride board app for students',
    short: 'Ride board app for students',
    off: true,
  },
  {
    href: '/work/loafa/',
    name: 'Loafa',
    img: 'loafa-top',
    url: 'loafa-band.web.app',
    alt: 'The Loafa home page: a yellow hand-drawn LOAFA logo on black',
    where: 'Provo, Utah',
    what: 'Band website',
    short: 'Band website',
  },
  {
    href: '/work/blood-ante/',
    name: 'Blood Ante',
    img: 'ba-play',
    url: 'bloodantegame.web.app',
    alt: 'Blood Ante in play: pixel-art knights on a card floor',
    where: 'My own game',
    what: 'Card game for the browser',
    short: 'Card game for the browser',
  },
];

const state = (p) => `<span class="row-state${p.off ? ' is-off' : ''}">${p.off ? 'Not live yet' : 'Live'}</span>`;

// One project as a row. On a computer the screenshot follows the pointer.
// On a phone it sits above the name.
export const row = (p, { where = false } = {}) => `      <li>
        <a class="row" href="${p.href}" data-peek="${shot(p.img)}"${clip(p.video) ? ` data-peek-video="${clip(p.video)}"` : ''}>
          <div class="row-shot" aria-hidden="true">${win(p.img, p.url, '', { sizes: '(max-width: 900px) 92vw, 400px', video: p.video })}</div>
          <span class="row-name"><span>${p.name}</span></span>${where ? `
          <span class="row-where">${p.where}</span>` : ''}
          <span class="row-what">${where ? p.what : p.short}</span>
          ${state(p)}
        </a>
      </li>`;

// One project as a screenshot with its name under it.
export const tile = (p) => `      <figure class="tile reveal">
        <a class="shot-link" href="${p.href}" tabindex="-1" aria-hidden="true">${win(p.img, p.url, p.alt, { sizes: '(max-width: 900px) 92vw, 32vw' })}</a>
        <figcaption><a class="tile-name" href="${p.href}">${p.name}</a>${state(p)}<span class="tile-what">${p.short}</span></figcaption>
      </figure>`;

export const pick = (...names) => names.map((n) => {
  const p = projects.find((x) => x.name === n);
  if (!p) throw new Error('no project called ' + n);
  return p;
});

export default {
  path: '/work/',
  slug: 'work',
  nav: 'work',
  priority: 0.9,
  pageType: 'CollectionPage',
  title: 'Work | Hyrum Whittier',
  description: "Apps and websites I've built: Memphis, Tarmac, Helios and Traffic Control at my job, and client work for Printology, Bravo 6 Flight Academy and Outdoors for Youth.",
  crumbs: [['Work', '/work/']],
  image: '/images/memphis-site-1600.webp',
  body: `
<header class="page-top">
  <div class="wrap">
    <h1 class="reveal">Apps and websites I've built</h1>
    <p class="standfirst reveal">The apps from my job are first, and the client work comes after. Five of these are live. The other six aren't live yet.</p>
  </div>
</header>

<section class="sec" aria-label="Projects">
  <div class="wrap">
    <div class="rows-head" aria-hidden="true"><span>Project</span><span>Where</span><span>What I built</span><span>Status</span></div>
    <ol class="rows rows--list stagger">
${projects.map((p) => row(p, { where: true })).join('\n')}
    </ol>
  </div>
</section>
`,
};
