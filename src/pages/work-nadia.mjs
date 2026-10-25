import { plate, SITE } from '../lib.mjs';
import { caseBody } from '../case.mjs';

const N = 'https://nadiawalksdogs.com';

export default {
  path: '/work/nadias-dog-nanny/',
  slug: 'case',
  nav: 'work',
  priority: 0.7,
  title: "Nadia's Dog Nanny Services website | Hyrum Whittier",
  description: "Nadia's Dog Nanny Services in Phoenix moved off GoDaddy's builder to 14 hand-coded pages, each with one schema graph, and an offer catalog with verified prices.",
  crumbs: [['Work', '/work/'], ["Nadia's Dog Nanny Services", '/work/nadias-dog-nanny/']],
  image: '/images/nadia-home-1600.webp',
  schema: [{ '@type': 'WebSite', '@id': N + '/#website', name: "Nadia's Dog Nanny Services", url: N + '/', creator: { '@id': SITE + '/#person' } }],
  body: caseBody({
    name: "Nadia's Dog Nanny Services",
    kicker: ['Boarding and daycare', 'Phoenix, Arizona', '2026'],
    shot: 'nadia-home',
    url: 'nadiawalksdogs.com',
    alt: "The Nadia's Dog Nanny Services home page",
    phone: 'nadia-m',
    phoneAlt: "The Nadia's Dog Nanny Services home page on a phone",
    meta: [
      ['Scope', 'Rebuild off GoDaddy, structured data, photo pass'],
      ['Built with', 'HTML, CSS, JSON-LD, Tag Manager'],
      ['Live at', `<a href="${N}/">nadiawalksdogs.com</a>`],
      ['Year', '2026. Live since August.'],
    ],
    heading: 'A builder caps what you can do for search',
    standfirst: "GoDaddy's builder wrote the schema, the sitemap and the titles, and it wouldn't let me fix any of them.",
    body: `
        <p>The business schema pointed at a made-up domain. The sitemap had junk URLs in it, and the titles came out double-encoded.</p>
        <p>So the rebuild was about getting control back: 14 hand-coded pages from her own copy and prices, with one schema graph each.</p>
        <p>The seven services are marked up as an offer catalog with verified prices. The certifications are real, and there's no review-star markup.</p>`,
    links: [
      [N + '/', 'Visit the site'],
      [N + '/services', 'Services'],
      [N + '/boarding', 'Boarding'],
    ],
    plates: [
      plate('nadia-services', 'nadiawalksdogs.com/services', "The services page of Nadia's Dog Nanny Services", 'Services', 'Seven services with verified prices, marked up as an offer catalog.'),
      plate('nadia-boarding', 'nadiawalksdogs.com/boarding', "The boarding page of Nadia's Dog Nanny Services", 'Boarding', "The client's own photos, compressed and self-hosted."),
    ],
    next: ['/work/blood-ante/', 'Blood Ante'],
  }),
};
