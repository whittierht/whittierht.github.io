import { plate } from '../lib.mjs';

const head = (n, label, id, h, standfirst = '') => `
    <header class="sec-head reveal">
      <p class="label"><span class="num">${n}</span> ${label}</p>
      <h2 id="${id}-h">${h}</h2>${standfirst ? `\n      <p class="standfirst">${standfirst}</p>` : ''}
    </header>`;

export default {
  path: '/seo/',
  slug: 'seo',
  nav: 'seo',
  priority: 0.9,
  title: 'SEO | Hyrum Whittier, Utah and Idaho',
  description: 'A year and a half of SEO on enterprise and local accounts: keyword and schema work for a national payments processor, and town pages and site moves for local businesses.',
  crumbs: [['SEO', '/seo/']],
  image: '/images/b6-rexburg-1600.webp',
  body: `
<header class="page-top">
  <div class="wrap">
    <p class="label reveal">SEO</p>
    <h1 class="reveal">Enterprise and local SEO</h1>
    <p class="standfirst reveal">I've been doing SEO for a year and a half. I'm the SEO specialist at a marketing agency in Rexburg, and my accounts run from a national payments processor to local service businesses.</p>
  </div>
</header>

<section class="sec" id="enterprise" aria-labelledby="enterprise-h">
  <div class="wrap">${head('01', 'Enterprise', 'enterprise', 'A national payments processor', "One of my accounts is a national payments processor and its co-branded programs. Their teams take the work live, so I don't name the company here.")}
    <ul class="worklist stagger">
      <li><h3>Keyword architecture</h3><p>Every indexable page mapped to one target keyword, with a call on each URL: keep, rewrite, merge, redirect or retire.</p></li>
      <li><h3>Schema and metadata at scale</h3><p>A JSON-LD graph for every indexable page across the account, plus a rewritten title and description. All of it validated before handover.</p></li>
      <li><h3>Fixing an orphaned library</h3><p>A whole article section had no crawlable path into it. The controls that opened each category were buttons, and Googlebot doesn't click buttons.</p></li>
      <li><h3>One page type a week</h3><p>The content plan takes one page type each week. Its template gets built once, then rolls out to every page of that type.</p></li>
      <li><h3>Partner bank audits</h3><p>A bank's public web presence scored against a fixed framework, then a gap analysis and a roadmap. The crawl can run again for the next partner.</p></li>
      <li><h3>Support center rebuilds</h3><p>Pitched as working mockups instead of slides, built from their real content inside their real header and footer.</p></li>
    </ul>
  </div>
</section>

<section class="sec" id="local" aria-labelledby="local-h">
  <div class="wrap">${head('02', 'Local', 'local', 'Local businesses', "On the local side I've worked with Bravo 6 Flight Academy, Outdoors for Youth, Madison Health and Nadia's Dog Nanny Services. I rebuilt three of those sites. Madison Health kept the one it had, and the search work happens there.")}
    <ul class="worklist stagger">
      <li id="towns"><h3>A page for each town</h3><p>Bravo 6 trains pilots in Rexburg and Pocatello, and each town has its own page. The schema on each one has that location's hours and coordinates, and names the airport.</p></li>
      <li><h3>Off Wix with every slug kept</h3><p>Outdoors for Youth had its content locked inside Wix iframes. I rebuilt it as 22 hand-coded pages and matched every slug to the old site, so the rankings carried over.</p></li>
      <li><h3>Off Divi</h3><p>Bravo 6 was a Divi site. Two Python scripts now build it as 135 static pages with clean URLs, and it moved onto the main domain in August.</p></li>
      <li><h3>Fixing a builder's schema</h3><p>GoDaddy's builder gave Nadia's site schema that pointed at a made-up domain. Now each of her 14 pages has one graph, and her seven services are listed with verified prices.</p></li>
    </ul>
    <div class="plates">
      ${plate('b6-rexburg', 'bravo6flightacademy.com/rexburg-flight-school/', 'The Bravo 6 Rexburg page: Flight training in Rexburg at our home field', 'The Rexburg page', 'Flight training at their home field.')}
      ${plate('b6-pocatello', 'bravo6flightacademy.com/pocatello-flight-school/', 'The Bravo 6 Pocatello page: Flight training in Pocatello at a towered airport', 'The Pocatello page', 'Flight training at a towered airport.')}
    </div>
  </div>
</section>

<section class="sec sec-tint" id="check" aria-labelledby="check-h">
  <div class="wrap">${head('03', 'Audits', 'check', 'What I check on every site')}
    <div class="prose reveal">
      <p>My crawler checks status codes, whether each page can be indexed, canonicals, schema types and redirect chains. It runs against every sitemap the site lists.</p>
      <p>Titles and descriptions get measured in pixels, because Google cuts them off by width.</p>
      <p>Then I read the schema by hand. A graph can pass validation and still describe the wrong thing.</p>
    </div>
    <p class="sec-more reveal"><a class="txtlink" href="/tools/#tools">The crawler and the other tools</a></p>
  </div>
</section>
`,
};
