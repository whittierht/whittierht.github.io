import { plate, SITE } from '../lib.mjs';
import { caseBody } from '../case.mjs';

const B6 = 'https://bravo6flightacademy.com';

export default {
  path: '/work/bravo-6-flight-academy/',
  slug: 'case',
  nav: 'work',
  priority: 0.8,
  title: 'Bravo 6 Flight Academy website | Hyrum Whittier',
  description: "Bravo 6 Flight Academy's Divi site, rebuilt as 165 static pages with a cost calculator, a live weather check, a training area map and pages for Rexburg and Pocatello.",
  crumbs: [['Bravo 6 Flight Academy', '/work/bravo-6-flight-academy/']],
  image: '/images/b6-home-1600.webp',
  schema: [{ '@type': 'WebSite', '@id': B6 + '/#website', name: 'Bravo 6 Flight Academy', url: B6 + '/', creator: { '@id': SITE + '/#person' } }],
  body: caseBody({
    name: 'Bravo 6 Flight Academy',
    kicker: ['Flight school', 'Rexburg and Pocatello, Idaho', '2026'],
    live: B6 + '/',
    shot: 'b6-home',
    video: 'b6-hero',
    url: 'bravo6flightacademy.com',
    alt: 'The Bravo 6 Flight Academy home page: Take flight',
    phone: 'b6-m',
    phoneAlt: 'The Bravo 6 home page on a phone',
    meta: [
      ['What I built', 'The whole website, plus three tools on it'],
      ['Built with', 'HTML, CSS, Python, PHP, Leaflet'],
      ['Live at', `<a href="${B6}/">bravo6flightacademy.com</a>`],
      ['Year', '2026. On the main domain since August.'],
    ],
    heading: 'From WordPress to 165 pages',
    standfirst: "Their old site was built with Divi on WordPress. Now it's 165 pages that my Python scripts build, and it just got a big upgrade.",
    body: `
        <p>The newest part is the flight training cost calculator. You drag sliders for flight, ground and simulator hours, and the estimate changes as you go. One switch jumps between the FAA minimum of 40 hours and the 60 hours the school lists for most students.</p>
        <p>Is It Flyable Today checks the live airport weather against the school's own minimums. The training area map draws the practice areas over an FAA sectional chart.</p>
        <p>The fleet page lists seven airplanes and a Redbird simulator with their hourly rates. Every training program has its own page now.</p>
        <p>The site launched at 135 pages. Every page sits in its own folder, so clean URLs work on plain shared hosting.</p>
        <p>Rexburg and Pocatello each have their own page, with schema for that location. There's more about those on the <a href="/seo/#local">SEO page</a>.</p>`,
    links: [
      [B6 + '/flight-training-cost/', 'Cost calculator'],
      [B6 + '/flyable/', 'Is It Flyable Today'],
      [B6 + '/training-area-map/', 'Training area map'],
    ],
    plates: [
      plate('b6-calc', 'bravo6flightacademy.com/flight-training-cost/', 'The flight training cost calculator, with three sliders and a running estimate', 'Cost calculator', 'Three sliders and a running total.'),
      plate('b6-flyable', 'bravo6flightacademy.com/flyable/', 'Is It Flyable Today on the Bravo 6 site, showing GO for VFR conditions', 'Is It Flyable Today', "Live weather, checked against the school's own limits."),
      plate('b6-map', 'bravo6flightacademy.com/training-area-map/', 'The Bravo 6 training area map on satellite view, with three practice areas outlined', 'Training area map', 'The practice areas, drawn over the map.'),
      plate('b6-fleet', 'bravo6flightacademy.com/our-fleet/', 'The Bravo 6 fleet page: Our fleet, aircraft and hourly rates', 'The fleet', 'Seven airplanes and a simulator, with hourly rates.'),
    ],
    next: ['/work/outdoors-for-youth/', 'Outdoors for Youth'],
  }),
};
