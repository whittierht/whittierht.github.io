import { plate, SITE } from '../lib.mjs';
import { caseBody } from '../case.mjs';

const OFY = 'https://www.outdoorsforyouth.org';

export default {
  path: '/work/outdoors-for-youth/',
  slug: 'case',
  nav: 'work',
  priority: 0.8,
  title: 'Outdoors for Youth website | Hyrum Whittier',
  description: 'Outdoors for Youth moved off Wix to hand-coded pages with every slug kept, and a seven-step registration form that takes payment by card or bank account.',
  crumbs: [['Outdoors for Youth', '/work/outdoors-for-youth/']],
  image: '/images/ofy-home-1600.webp',
  schema: [{ '@type': 'WebSite', '@id': OFY + '/#website', name: 'Outdoors for Youth', url: OFY + '/', creator: { '@id': SITE + '/#person' } }],
  body: caseBody({
    name: 'Outdoors for Youth',
    kicker: ['Teen adventure camp', 'Newdale, Idaho', '2026'],
    live: OFY + '/',
    shot: 'ofy-home',
    url: 'outdoorsforyouth.org',
    alt: 'The Outdoors for Youth home page',
    phone: 'ofy-m',
    phoneAlt: 'The Outdoors for Youth home page on a phone',
    meta: [
      ['What I built', 'The website, and a registration form that takes payments'],
      ['Built with', 'HTML, CSS, compiled Tailwind, a custom form engine, CardPointe'],
      ['Live at', `<a href="${OFY}/">outdoorsforyouth.org</a>`],
      ['Year', '2026. Live since July.'],
    ],
    heading: 'A camp site with paid registration',
    standfirst: "The big news is registration. It's a custom form I built, it takes payments, and it's finally live.",
    body: `
        <p>Registration for 2027 camp is seven steps, and you pay on the last one by card or bank account. A parent can sign up several campers and pay once.</p>
        <p>Card numbers get typed inside the card processor's own frame. Only a token comes back, so the numbers never touch the site's server.</p>
        <p>The form saves your progress on your device, so you can step away and finish later. Rentals and camp apparel are in the form too. Promo codes work, and a camper on the waitlist isn't charged.</p>
        <p>The session tiles come from the camp's Salesforce inventory. Click one and the form opens with that week already picked.</p>
        <p>Before all this, the site was on Wix, and the camp's best content was stuck inside iframes. I rebuilt it as 22 hand-coded pages and kept every slug, so the rankings carried over.</p>`,
    links: [
      [OFY + '/registration', 'The registration form'],
      [OFY + '/register-for-ofy', 'Camp dates'],
    ],
    plates: [
      plate('ofy-reg', 'outdoorsforyouth.org/registration', 'The Outdoors for Youth registration form on step one of seven, Session Information', 'Registration', 'Seven steps, and you pay on the last one.'),
      plate('ofy-dates', 'outdoorsforyouth.org/register-for-ofy', 'The Outdoors for Youth session dates: Pick your adventure week', 'Dates', 'Each tile opens the form with that week picked.'),
    ],
    next: ['/work/muscle-activation-center/', 'Muscle Activation Center'],
  }),
};
