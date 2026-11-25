import { plate } from '../lib.mjs';

const head = (id, h, standfirst = '') => `
    <header class="sec-head reveal">
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
    <h1 class="reveal">I do SEO full time</h1>
    <p class="standfirst reveal">I've been doing SEO for a year and a half. I'm the SEO specialist at a marketing agency in Rexburg. One of my accounts is a national payments processor, and the rest are local businesses.</p>
  </div>
</header>

<section class="sec" id="enterprise" aria-labelledby="enterprise-h">
  <div class="wrap">${head('enterprise', 'A national payments processor', "My enterprise account is a national payments processor and its co-branded programs. Their own teams put my work live, so I don't name the company here.")}
    <ul class="worklist stagger">
      <li><h3>Keyword architecture</h3><p>I mapped every indexable page to one target keyword. Each URL got a call: keep, rewrite, merge, redirect or retire.</p></li>
      <li><h3>Schema and metadata at scale</h3><p>Every indexable page on the account got a JSON-LD graph and a new title and description. I validated all of it before handing it over.</p></li>
      <li><h3>An orphaned article library</h3><p>A whole article section had no path a crawler could follow. The category controls were buttons, and Googlebot doesn't click buttons.</p></li>
      <li><h3>One page type a week</h3><p>The content plan takes one page type each week. I build its template once, and then it goes out to every page of that type.</p></li>
      <li><h3>Partner bank audits</h3><p>I score a bank's public website against a fixed framework, then write the gap analysis and a roadmap. The same crawl runs again for the next partner.</p></li>
      <li><h3>Support center rebuilds</h3><p>I pitched these as working mockups instead of slides. They used the real content inside the real header and footer.</p></li>
    </ul>
  </div>
</section>

<section class="sec" id="local" aria-labelledby="local-h">
  <div class="wrap">${head('local', 'Local businesses', "On the local side I've worked with Bravo 6 Flight Academy, Outdoors for Youth and Madison Health. I rebuilt the first two. Madison Health kept its site, and I do the SEO on it there.")}
    <ul class="worklist three stagger">
      <li id="towns"><h3>A page for each town</h3><p>Bravo 6 trains pilots in Rexburg and Pocatello, so each town has its own page. The schema on each page has that location's hours and coordinates, and it names the airport.</p></li>
      <li><h3>Off Wix with every slug kept</h3><p>On Wix, the camp's content was stuck inside iframes. I rebuilt the site by hand and matched every slug to the old one, so the rankings carried over.</p></li>
      <li><h3>Off Divi</h3><p>Bravo 6 was a Divi site on WordPress. Now my Python scripts build it as 165 static pages with clean URLs. It moved onto the main domain in August.</p></li>
    </ul>
    <div class="plates">
      ${plate('b6-rexburg', 'bravo6flightacademy.com/rexburg-flight-school/', 'The Bravo 6 Rexburg page: Flight training in Rexburg at our home field', 'The Rexburg page', 'Flight training at their home field.')}
      ${plate('b6-pocatello', 'bravo6flightacademy.com/pocatello-flight-school/', 'The Bravo 6 Pocatello page: Flight training in Pocatello at a towered airport', 'The Pocatello page', 'Flight training at a towered airport.')}
    </div>
  </div>
</section>

<section class="sec sec-tint" id="check" aria-labelledby="check-h">
  <div class="wrap">${head('check', 'What I check on every site')}
    <div class="prose reveal">
      <p>I wrote my own crawler. It checks status codes, whether each page can be indexed, canonicals, schema types and redirect chains, against every sitemap the site lists.</p>
      <p>I measure titles and descriptions in pixels, because Google cuts them off by width.</p>
      <p>Then I read the schema by hand. A graph can pass validation and still describe the wrong thing.</p>
    </div>
    <p class="sec-more reveal"><a class="ring" href="/tools/#tools">The crawler and my other tools</a></p>
  </div>
</section>
`,
};
