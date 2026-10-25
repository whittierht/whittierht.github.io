import { plate, SITE } from '../lib.mjs';
import { caseBody } from '../case.mjs';

const OFY = 'https://www.outdoorsforyouth.org';

export default {
  path: '/work/outdoors-for-youth/',
  slug: 'case',
  nav: 'work',
  priority: 0.8,
  title: 'Outdoors for Youth website | Hyrum Whittier',
  description: 'Outdoors for Youth moved off Wix to 22 hand-coded pages with every slug kept, a seven-step registration form, and session dates from Salesforce.',
  crumbs: [['Work', '/work/'], ['Outdoors for Youth', '/work/outdoors-for-youth/']],
  image: '/images/ofy-home-1600.webp',
  schema: [{ '@type': 'WebSite', '@id': OFY + '/#website', name: 'Outdoors for Youth', url: OFY + '/', creator: { '@id': SITE + '/#person' } }],
  body: caseBody({
    name: 'Outdoors for Youth',
    kicker: ['Teen adventure camp', 'Newdale, Idaho', '2026'],
    shot: 'ofy-home',
    url: 'outdoorsforyouth.org',
    alt: 'The Outdoors for Youth home page',
    phone: 'ofy-m',
    phoneAlt: 'The Outdoors for Youth home page on a phone',
    meta: [
      ['Scope', 'Wix migration, 22 pages, registration flow'],
      ['Built with', 'HTML, CSS, compiled Tailwind, a custom form engine'],
      ['Live at', `<a href="${OFY}/">outdoorsforyouth.org</a>`],
      ['Year', '2026. Live since July.'],
    ],
    heading: 'Off Wix, rankings intact',
    standfirst: "On Wix, the camp's best content was locked inside iframes. Search engines saw the frame and not the text.",
    body: `
        <p>Now it's 22 hand-coded pages, and every slug matches the old site, so the rankings carried over.</p>
        <p>Registration is a seven-step form. It saves answers so a parent can finish later, and it totals rentals as they're added.</p>
        <p>The session tiles come from the camp's Salesforce inventory. The waitlist only shows up once a week has sold out.</p>`,
    links: [
      [OFY + '/', 'Visit the site'],
      [OFY + '/register-for-ofy', 'Dates and registration'],
      [OFY + '/gallery', 'Gallery'],
    ],
    plates: [
      plate('ofy-dates', 'outdoorsforyouth.org/register-for-ofy', 'The Outdoors for Youth session dates: Pick your adventure week', 'Dates and registration', "Session tiles from the camp's Salesforce inventory."),
      plate('ofy-gallery', 'outdoorsforyouth.org/gallery', 'The Outdoors for Youth photo gallery', 'Gallery', "More than 200 of the camp's own photos."),
    ],
    next: ['/work/nadias-dog-nanny/', "Nadia's Dog Nanny Services"],
  }),
};
