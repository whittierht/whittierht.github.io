import { caseBody } from '../case.mjs';
import { plate } from '../lib.mjs';

const SITE = 'https://tarmacflight.com';

export default {
  path: '/work/tarmac/',
  slug: 'case',
  nav: 'work',
  priority: 0.8,
  title: 'Tarmac, flight school software | Hyrum Whittier',
  description: "Tarmac is flight school software I'm building at Bravo 6 Flight Academy. Scheduling, dispatch, training records and a student portal share one set of records.",
  crumbs: [['Tarmac', '/work/tarmac/']],
  image: '/images/tarmac-site-1600.webp',
  body: caseBody({
    name: 'Tarmac',
    kicker: ['Flight school app', 'Built at my job'],
    off: true,
    live: SITE + '/',
    liveLabel: 'See the site',
    shot: 'tarmac-site',
    url: 'tarmacflight.com',
    alt: 'The Tarmac site: First call to checkride',
    phone: 'tarmac-m',
    phoneAlt: 'The Tarmac site on a phone, with the schedule screen held in a hand',
    meta: [
      ['What I built', 'The app and its website'],
      ['Built with', '<a href="/work/bravo-6-flight-academy/">Bravo 6 Flight Academy</a> in Rexburg and Pocatello'],
      ['Status', 'Not live yet. Other flight schools get in by invitation.'],
      ['See it', `<a href="${SITE}/">tarmacflight.com</a>`],
    ],
    heading: 'Flight school software, from first call to checkride',
    standfirst: "Tarmac runs a flight school. I'm building it inside Bravo 6 Flight Academy, with the people who work their ramp in Rexburg and Pocatello. It isn't live yet, and other schools get in by invitation.",
    body: `
        <p>A booking on the schedule shows up on the dispatch board. Checking a plane out reads its Hobbs and tach. When it comes back, Tarmac logs the flight and emails the invoice.</p>
        <p>Before a flight there's a risk check with 26 questions in five sections. Instructors grade each task and then the lesson. A recorded debrief turns into draft notes, and both of them sign the record.</p>
        <p>Students get their own portal. They book and move flights, sign their lesson records and see how far along they are.</p>
        <p>One record follows a student from their first phone call to their checkride. Records get archived, never deleted, and every staff account signs in with two steps.</p>
        <p>The site has six free flight calculators, an E6B among them. Anyone can use them without signing up.</p>`,
    links: [
      [SITE + '/', 'tarmacflight.com', 'ring'],
      [SITE + '/calculators', 'The flight calculators'],
    ],
    plates: [
      plate('tarmac-dispatch', 'tarmacflight.com', "Tarmac's dispatch board: the day's airplanes with their status, Hobbs and tach", 'Dispatch', "The day's flights, with the Hobbs and tach for each plane."),
      plate('tarmac-portal', 'tarmacflight.com', 'The Tarmac student portal on a phone, with a list of upcoming flights', 'Student portal', 'Students book flights and sign their records here.'),
    ],
    next: ['/work/helios/', 'Helios'],
  }),
};
