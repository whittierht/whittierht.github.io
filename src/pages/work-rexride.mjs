import { caseBody } from '../case.mjs';

const RR = 'https://rexride-staging.web.app';

export default {
  path: '/work/rexride/',
  slug: 'case',
  nav: 'work',
  priority: 0.7,
  title: 'RexRide, a ride board for Rexburg students | Hyrum Whittier',
  description: "RexRide is a ride board app for students in Rexburg, built with React and Firebase. It's on a staging site and isn't live yet.",
  crumbs: [['Work', '/work/'], ['RexRide', '/work/rexride/']],
  image: '/images/rexride-site-1600.webp',
  body: caseBody({
    name: 'RexRide',
    kicker: ['Ride board app', 'Rexburg, Idaho'],
    off: true,
    live: RR + '/demo/',
    liveLabel: 'Try the demo',
    shot: 'rexride-site',
    url: 'rexride-staging.web.app',
    alt: 'The RexRide site: Rides out of Rexburg, posted by students',
    phone: 'rexride-m',
    phoneAlt: 'The RexRide demo on a phone, with sample trips to Logan and Pocatello',
    meta: [
      ['What I built', 'The app, its website and a demo with sample data'],
      ['Built with', 'React 19, Vite, Firebase'],
      ['Status', 'Not live yet. On a staging site, version 0.6.1.'],
      ['See it', `<a href="${RR}/">rexride-staging.web.app</a>`],
    ],
    heading: 'A ride board for Rexburg students',
    standfirst: "A buddy of mine wanted a ride board for students in Rexburg, so I'm building it. It isn't live yet, so for now it sits on a staging site. There's a demo with sample data you can click through.",
    body: `
        <p>Drivers post rides with open seats, and riders post requests. There's a map, a chat for every ride and a group chat for drivers.</p>
        <p>You get a verified student badge with a .edu email. Your exact pickup pin stays private. Everyone else sees a three-mile area that's nudged off the real spot.</p>
        <p>Pickup uses a QR code. After a ride you can say whether you'd ride with that person again. Admins and monitors handle reports.</p>
        <p>The demo runs on sample rides and made-up people, and you don't need an account.</p>`,
    links: [
      [RR + '/demo/', 'Try the demo', 'ring'],
      [RR + '/', 'The staging site'],
    ],
    next: ['/work/loafa/', 'Loafa'],
  }),
};
