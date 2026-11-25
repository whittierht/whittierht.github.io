import { plate, SITE } from '../lib.mjs';
import { caseBody } from '../case.mjs';

const MAC = 'https://www.muscleactivationcenter.com';

export default {
  path: '/work/muscle-activation-center/',
  slug: 'case',
  nav: 'work',
  priority: 0.8,
  title: 'Muscle Activation Center website and notes app | Hyrum Whittier',
  description: "A website for Muscle Activation Center, a MAT practice in Shelley and Idaho Falls, and the session notes app I'm building to replace their paper notes.",
  crumbs: [['Work', '/work/'], ['Muscle Activation Center', '/work/muscle-activation-center/']],
  image: '/images/mac-home-1600.webp',
  schema: [{ '@type': 'WebSite', '@id': MAC + '/#website', name: 'Muscle Activation Center', url: MAC + '/', creator: { '@id': SITE + '/#person' } }],
  body: caseBody({
    name: 'Muscle Activation Center',
    kicker: ['MAT® practice', 'Shelley and Idaho Falls, Idaho', '2026'],
    live: MAC + '/',
    shot: 'mac-home',
    url: 'muscleactivationcenter.com',
    alt: 'The Muscle Activation Center home page: Find the root cause of muscle pain and weakness',
    phone: 'mac-m',
    phoneAlt: 'The Muscle Activation Center home page on a phone',
    meta: [
      ['What I built', 'The website, a visit request form and a session notes app'],
      ['Built with', 'HTML and CSS from a Node build script, Firestore, Cloudflare Pages'],
      ['Live at', `<a href="${MAC}/">muscleactivationcenter.com</a>`],
      ['Year', '2026. Live since November 18.'],
    ],
    heading: 'Their website, and the form behind it',
    standfirst: "Jacob and Abbey Read do Muscle Activation Techniques (MAT®) in Shelley and Idaho Falls. I built their website, and now I'm building the app they'll take notes in.",
    body: `
        <p>Their site is static pages that a Node script builds, and it's hosted on Cloudflare Pages. The photos are their own headshots.</p>
        <p>When someone asks for a visit, the request saves to Firestore. It shows up on a page that only the two of them can open.</p>`,
    parts: [
      {
        label: 'Not live yet',
        title: 'The session notes app',
        shot: 'notes-map',
        url: 'Session notes · demo data',
        alt: 'The check-in step of a visit, with a body map where the left knee is marked mild and the last visit beside it',
        phone: 'notes-visit-m',
        phoneAlt: 'The check-in step of a visit on a phone',
        meta: [
          ['Status', 'Not live yet. Demo data only until the HIPAA work is done.'],
          ['Built with', 'React 19, TypeScript, Vite, Firebase'],
          ['Sign-in', 'Google, then a 4-digit passcode on each device'],
          ['Tests', '103 unit tests and 32 rules tests'],
        ],
        heading: 'Notes during the appointment',
        standfirst: 'Right now they take notes on paper during appointments. This app replaces the paper.',
        body: `
        <p>A visit has five steps: check-in, assess, muscle tests, reassess and plan. On the body map, one tap marks a spot mild, two is moderate and three is severe. A fourth tap clears it.</p>
        <p>Muscles that tested weak last visit come up on their own. The last visit stays next to the current one the whole time.</p>
        <p>The plan step sets the home exercises and the next visit. The exercises print as a sheet the client takes home.</p>
        <p>Google Calendar appointments are built and switched off until the app is HIPAA compliant. Every client in these screenshots is made up.</p>`,
        plates: [
          plate('notes-tests', 'Session notes · demo data', 'The muscle tests step, listing three muscles that tested weak last visit', 'Muscle tests', "Last visit's weak muscles are already on the list."),
          plate('notes-today', 'Session notes · demo data', 'The Today screen, with a visit in progress and a new booking request', 'Today', 'Visits in progress, and new requests from the website.'),
        ],
      },
    ],
    next: ['/work/rexride/', 'RexRide'],
  }),
};
