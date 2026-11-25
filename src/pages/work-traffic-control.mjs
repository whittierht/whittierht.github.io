import { caseBody } from '../case.mjs';
import { plate } from '../lib.mjs';

const SITE = 'https://trafficcontrolphone.com';

export default {
  path: '/work/traffic-control/',
  slug: 'case',
  nav: 'work',
  priority: 0.8,
  title: 'Traffic Control, a phone system for small businesses | Hyrum Whittier',
  description: 'Traffic Control is a phone system for small businesses that I built at my job. Set up where calls go, answer them in the browser, and see which ad made the phone ring.',
  crumbs: [['Traffic Control', '/work/traffic-control/']],
  image: '/images/traffic-1600.webp',
  body: caseBody({
    name: 'Traffic Control',
    kicker: ['Business phone system', 'Built at my job'],
    off: true,
    live: SITE + '/',
    liveLabel: 'See the site',
    shot: 'traffic',
    url: 'trafficcontrolphone.com',
    alt: 'The Traffic Control site: Your phones, under control',
    phone: 'traffic-m',
    phoneAlt: 'The Traffic Control site on a phone: Your phones, under control',
    meta: [
      ['What I built', 'The app and its website'],
      ['Status', 'Not live yet. Invite only for now.'],
      ['See it', `<a href="${SITE}/">trafficcontrolphone.com</a>`],
    ],
    heading: 'A phone system for small businesses',
    standfirst: "Traffic Control runs a small business's phones. You decide where calls go on one screen, then answer them in the browser with a headset. It isn't live yet, and it's invite only.",
    body: `
        <p>The phone menu and ring groups are set up on one screen. After hours, callers hear a different greeting. Voicemail comes with a transcript, so you can read it before you call back.</p>
        <p>Miss a call and it can text the caller back, so they don't just call the next business. Each customer gets one text thread, and the whole team can see it.</p>
        <p>Call tracking ties each call to where it came from. Your site shows every visitor their own number, so you can see which ad and keyword led to a call. It also shows whether anyone picked up.</p>
        <p>Other apps can put its screens inside their own, with an API key and webhooks. One sign-in can cover more than one business.</p>`,
    links: [
      [SITE + '/', 'trafficcontrolphone.com', 'ring'],
    ],
    plates: [
      plate('traffic-flow', 'trafficcontrolphone.com', 'Traffic Control call flow: a phone menu that sends 1 to sales, 2 to scheduling and 0 to the front desk', 'Call flow', 'Where each call goes during business hours and after.'),
      plate('traffic-track', 'trafficcontrolphone.com', "Call tracking in Traffic Control: a first call with its source, campaign, keyword and landing page", 'Call tracking', 'The ad and keyword behind a call.'),
    ],
    next: ['/work/printology/', 'Printology'],
  }),
};
