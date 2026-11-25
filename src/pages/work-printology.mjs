import { plate } from '../lib.mjs';
import { caseBody } from '../case.mjs';

const STORE = 'Printology rebuild · not live yet';
const STUDIO = 'Printology Studio · staff tools';

export default {
  path: '/work/printology/',
  slug: 'case',
  nav: 'work',
  priority: 0.8,
  title: 'Printology online store and back office | Hyrum Whittier',
  description: "A full rebuild of Printology's Shopify site as a custom online store and staff back office, for print shops in American Fork and Saratoga Springs. Not live yet.",
  crumbs: [['Printology', '/work/printology/']],
  image: '/images/pr-home-1600.webp',
  body: caseBody({
    name: 'Printology',
    kicker: ['Print shop', 'American Fork and Saratoga Springs, Utah'],
    off: true,
    shot: 'pr-home',
    url: STORE,
    alt: 'The rebuilt Printology home page: Print shop in American Fork and Saratoga Springs, Utah',
    phone: 'pr-m',
    phoneAlt: 'The rebuilt Printology home page on a phone',
    meta: [
      ['What I built', 'The online store, a staff back office and 30 studio tools'],
      ['Built with', 'React 19, TypeScript, Tailwind 4, Drizzle, Cloudflare Workers, D1 and R2'],
      ['Status', 'Not live yet'],
      ['Tests', '885'],
    ],
    heading: 'The whole shop, rebuilt from scratch',
    standfirst: "Printology is a print shop with two locations in Utah, and their site is on Shopify. I'm rebuilding all of it from scratch: the store customers see, and a back office for the staff. None of it is live yet.",
    body: `
        <p>Printing is priced by the sheet. The calculator starts at one sheet and draws every sheet size to scale. The order form shows a live estimate from fixed rules, so the same job always gets the same price.</p>
        <p>Customers can upload files up to 500 MB and approve an itemized quote. Each order has its own page with a six-digit code. That's where the customer follows the status and approves the proof.</p>
        <p>There's a shop too, with collections, sales and codes, and guest checkout for pickup. The old Shopify addresses are kept or redirected.</p>
        <p>On October 10 I loaded both home pages on a phone-sized screen. The live one made 267 requests and weighed 12.1 MB. Mine made 40 requests and weighed 1.2 MB.</p>
        <p>Payments, email, texts and shipping are built and running in test mode. They're waiting on the shop's own accounts.</p>`,
    parts: [
      {
        label: 'The staff side',
        title: 'The back office and the Studio',
        shot: 'st-pdf',
        url: STUDIO,
        alt: 'The PDF studio, a grid of ten tools from Sheet maker to Book cover',
        meta: [
          ['Back office', '50 screens'],
          ['Studio', '30 tools in three groups'],
          ['Sign-in', 'Google, invite only'],
        ],
        heading: 'What the staff get',
        standfirst: "The back office has 50 screens. Orders, appointments, prices and the site's pages are all in there, along with the time clock and the monthly email.",
        body: `
        <p>Staff clock in at a PIN kiosk. Every change goes into a history with undo, and backups run every night.</p>
        <p>Every page has a feedback button. You drag a box around the spot you mean.</p>
        <p>The Studio is 30 tools for the print counter, like Sheet maker, Passport photos and Numbered tickets. Each one makes a file on the computer in front of you and uploads nothing.</p>
        <p>The design editor in that list is OpenDesign, an open-source project. I built the other 29.</p>`,
        plates: [
          plate('st-design', STUDIO, 'The design studio, a grid of tools including Name merge, Numbered tickets and QR codes', 'Design studio', 'Name merge, numbered tickets, address labels and bingo cards.'),
          plate('st-sheets', STUDIO, 'Sheet maker, with a drop area for a PDF and settings for sheet size, bleed and art', 'Sheet maker', 'Copies of a file on one sheet, with crop marks.'),
        ],
      },
    ],
    next: ['/work/bravo-6-flight-academy/', 'Bravo 6 Flight Academy'],
  }),
};
