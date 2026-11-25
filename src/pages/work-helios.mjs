import { caseBody } from '../case.mjs';
import { plate } from '../lib.mjs';

const SITE = 'https://heliosclock.com';

export default {
  path: '/work/helios/',
  slug: 'case',
  nav: 'work',
  priority: 0.8,
  title: 'Helios, a time clock and HR app | Hyrum Whittier',
  description: 'Helios is the time clock and HR app I built at my job. An iPad by the door becomes the time clock, and Helios keeps the hours, PTO and HR file in order.',
  crumbs: [['Helios', '/work/helios/']],
  image: '/images/helios-1600.webp',
  body: caseBody({
    name: 'Helios',
    kicker: ['Time clock and HR app', 'Built at my job'],
    live: SITE + '/',
    shot: 'helios',
    url: 'heliosclock.com',
    alt: 'The Helios site: Every hour, accounted for',
    phone: 'helios-m',
    phoneAlt: 'The Helios site on a phone, with the iPad time clock under the headline',
    meta: [
      ['What I built', 'The app and its website'],
      ['Runs on', 'An iPad by the door, and any phone'],
      ['Status', 'Live. New teams get in by invitation.'],
      ['See it', `<a href="${SITE}/">heliosclock.com</a>`],
    ],
    heading: 'A time clock and HR app for small teams',
    standfirst: "Helios turns an iPad by the door into a time clock. You find your name and tap a four-digit PIN to clock in. It's live, and new teams get in by invitation.",
    body: `
        <p>People can clock in from their phone too, with nothing to install. If someone forgets to clock out, Helios closes the shift at 11:59 pm and flags it for a look.</p>
        <p>Face sign-in is optional, and each person decides for themselves. The iPad turns a face into 128 numbers and saves only those. No photo ever leaves the iPad.</p>
        <p>PTO runs on the company's own policy, and the balance comes from the hours people actually work.</p>
        <p>Helios doesn't hold pay rates. At the end of a pay period it checks the hours, flags anything that needs fixing and hands payroll one CSV file.</p>
        <p>The HR side keeps the team directory and an org chart that redraws itself when someone gets a new manager. There are checklists for a first day and a last one, and documents get signed with a typed name.</p>`,
    links: [
      [SITE + '/', 'heliosclock.com', 'ring'],
      [SITE + '/tools/', 'Free time card tools'],
    ],
    plates: [
      plate('helios-face', 'heliosclock.com', 'Face sign-in on the Helios kiosk, with a check mark after a match', 'Face sign-in', 'Optional, and each person chooses for themselves.'),
      plate('helios-payroll', 'heliosclock.com', "The Helios payroll screen on an iPad, with each person's hours for the pay period", 'Payroll hours', 'Every hour in the pay period, checked before payday.'),
    ],
    next: ['/work/traffic-control/', 'Traffic Control'],
  }),
};
