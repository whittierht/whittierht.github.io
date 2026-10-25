import { plate, SITE } from '../lib.mjs';
import { caseBody } from '../case.mjs';

export default {
  path: '/work/loafa/',
  slug: 'case',
  nav: 'work',
  priority: 0.8,
  title: 'Loafa band website | Hyrum Whittier',
  description: 'A one-file website for Loafa, an alt rock band from Provo, Utah: 30-second song previews, all eight releases on a sideways timeline, press, shows and booking.',
  crumbs: [['Work', '/work/'], ['Loafa', '/work/loafa/']],
  image: '/images/loafa-top-1600.webp',
  schema: [{ '@type': 'WebSite', '@id': 'https://loafa-band.web.app/#website', name: 'Loafa', url: 'https://loafa-band.web.app/', creator: { '@id': SITE + '/#person' } }],
  body: caseBody({
    name: 'Loafa',
    kicker: ['Band site', 'Provo, Utah', '2026'],
    shot: 'loafa-top',
    url: 'loafa-band.web.app',
    alt: 'The Loafa home page: a yellow hand-drawn LOAFA logo on black',
    phone: 'loafa-m',
    phoneAlt: 'The Loafa home page on a phone',
    meta: [
      ['Scope', 'Band site in one HTML file'],
      ['Built with', 'HTML, CSS and JavaScript, no libraries'],
      ['Live at', '<a href="https://loafa-band.web.app/">loafa-band.web.app</a>'],
      ['Year', '2026'],
    ],
    heading: 'Eight releases on one page',
    standfirst: "A website for Loafa, an alt rock band from Provo. It's one HTML file with no libraries.",
    body: `
        <p>Every song has a 30-second preview. All eight releases, from 2022 to Unit 210, sit on a timeline that scrolls sideways.</p>
        <p>Unit 210 came out October 1, 2026, and it gets its own yellow band near the top of the page.</p>
        <p>Press from Provo Music Magazine and City Weekly is laid out as torn clippings. Past shows at Velour and other venues are under Live. The videos come from the band's Instagram and YouTube, and the last section is for booking.</p>`,
    links: [
      ['https://loafa-band.web.app/', 'Visit the site'],
      ['https://loafa-band.web.app/#unit-210', 'Unit 210'],
      ['https://loafa-band.web.app/#press', 'Press'],
    ],
    plates: [
      plate('loafa-disc', 'loafa-band.web.app', 'The Loafa discography on a sideways timeline', 'The discography', 'All eight releases on a sideways timeline.'),
      plate('loafa-press', 'loafa-band.web.app/#press', 'Loafa press coverage laid out as torn clippings', 'Press', 'Laid out as torn clippings.'),
    ],
    next: ['/work/bravo-6-flight-academy/', 'Bravo 6 Flight Academy'],
  }),
};
