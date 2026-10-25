import { plate } from '../lib.mjs';

const head = (n, label, id, h, standfirst = '') => `
    <header class="sec-head reveal">
      <p class="label"><span class="num">${n}</span> ${label}</p>
      <h2 id="${id}-h">${h}</h2>${standfirst ? `\n      <p class="standfirst">${standfirst}</p>` : ''}
    </header>`;

export default {
  path: '/local-seo/',
  slug: 'seo',
  nav: 'seo',
  priority: 0.9,
  title: 'Local SEO | Hyrum Whittier, Utah and Idaho',
  description: 'How I do local SEO: town pages with their own schema, moves off Wix and GoDaddy that kept the URLs, and a crawl of 63 Rexburg business websites.',
  crumbs: [['Local SEO', '/local-seo/']],
  image: '/images/b6-rexburg-1600.webp',
  body: `
<header class="page-top">
  <div class="wrap">
    <p class="label reveal">Local SEO</p>
    <h1 class="reveal">How I do local search</h1>
    <p class="standfirst reveal">What I do for local search, and the sites where I've done it.</p>
  </div>
</header>

<section class="sec" id="where" aria-labelledby="where-h">
  <div class="wrap">${head('01', 'Places', 'where', "Where I've done it", "I'm the SEO specialist at a marketing agency in Rexburg, working across a book of client accounts. These are the local ones I can point to.")}
    <ul class="index index--places stagger">
      <li><div class="ix"><span class="ix-name">Rexburg, Idaho</span><span class="ix-who">Bravo 6 Flight Academy</span><span class="ix-sector">Rebuilt, with its own town page</span></div></li>
      <li><div class="ix"><span class="ix-name">Rexburg, Idaho</span><span class="ix-who">Madison Health</span><span class="ix-sector">Search work on the site they already had</span></div></li>
      <li><div class="ix"><span class="ix-name">Pocatello, Idaho</span><span class="ix-who">Bravo 6 Flight Academy</span><span class="ix-sector">Trains here too, with a town page of its own</span></div></li>
      <li><div class="ix"><span class="ix-name">Newdale, Idaho</span><span class="ix-who">Outdoors for Youth</span><span class="ix-sector">Moved off Wix</span></div></li>
      <li><div class="ix"><span class="ix-name">Phoenix, Arizona</span><span class="ix-who">Nadia's Dog Nanny Services</span><span class="ix-sector">Moved off GoDaddy's builder</span></div></li>
    </ul>
  </div>
</section>

<section class="sec" id="check" aria-labelledby="check-h">
  <div class="wrap">${head('02', 'Audits', 'check', 'What I check')}
    <div class="prose reveal">
      <p>My crawler checks the same things on every site: status codes, whether each page can be indexed, canonicals, schema types and redirect chains. It runs them against every sitemap the site lists.</p>
      <p>Titles and descriptions get measured in pixels, because Google cuts them off by width.</p>
      <p>Then I read the schema by hand, since a graph can pass validation and still describe the wrong thing.</p>
    </div>
    <p class="sec-more reveal"><a class="txtlink" href="/tools/#tools">The crawler and the other tools</a></p>
  </div>
</section>

<section class="sec" id="towns" aria-labelledby="towns-h">
  <div class="wrap">${head('03', 'Town pages', 'towns', 'A page for each town')}
    <div class="prose reveal">
      <p>Bravo 6 Flight Academy trains pilots in Rexburg and Pocatello. Each town has its own page. The schema on each one has that location's hours and coordinates, and names the airport.</p>
      <p>The Rexburg page opens with where the school is, at Rexburg-Madison County Airport on the west side of town.</p>
    </div>
    <div class="plates">
      ${plate('b6-rexburg', 'bravo6flightacademy.com/rexburg-flight-school/', 'The Bravo 6 Rexburg page: Flight training in Rexburg at our home field', 'The Rexburg page', 'Flight training at their home field.')}
      ${plate('b6-pocatello', 'bravo6flightacademy.com/pocatello-flight-school/', 'The Bravo 6 Pocatello page: Flight training in Pocatello at a towered airport', 'The Pocatello page', 'Flight training at a towered airport.')}
    </div>
  </div>
</section>

<section class="sec" id="moving" aria-labelledby="moving-h">
  <div class="wrap">${head('04', 'Migrations', 'moving', 'Moving a site without losing rankings')}
    <div class="prose reveal">
      <p>Outdoors for Youth was on Wix, with the content locked inside iframes. I rebuilt it as 22 hand-coded pages and matched every slug to the old site, so the rankings carried over. It's been live since July.</p>
      <p>Bravo 6 was a Divi site. Two Python scripts now build it as 135 static pages, each in its own folder so the URLs stay clean on shared hosting. It moved onto the main domain in August.</p>
    </div>
  </div>
</section>

<section class="sec" id="builders" aria-labelledby="builders-h">
  <div class="wrap">${head('05', 'Page builders', 'builders', 'Fixing what a builder got wrong')}
    <div class="prose reveal">
      <p>Nadia's Dog Nanny Services in Phoenix was on GoDaddy's builder, which wrote its own schema. That schema pointed at a made-up domain. Her sitemap had junk URLs in it, and the titles were double-encoded.</p>
      <p>Now it's 14 hand-coded pages with one schema graph each. Her seven services are listed as an offer catalog with verified prices. Every certification in the schema is real, and there's no review-star markup.</p>
    </div>
  </div>
</section>

<section class="sec sec-tint" id="rexburg" aria-labelledby="rexburg-h">
  <div class="wrap">${head('06', 'A crawl', 'rexburg', 'Rexburg, August 2026', 'In August I crawled every website in the Chamber of Commerce member directory here in Rexburg. That was 63 sites, and 59 of them loaded.')}
    <table class="tally reveal">
      <caption>Of the 59 that loaded</caption>
      <thead><tr><th scope="col">Problem</th><th scope="col">Sites</th></tr></thead>
      <tbody>
        <tr><th scope="row">More than one H1</th><td>15</td></tr>
        <tr><th scope="row">No structured data</th><td>14</td></tr>
        <tr><th scope="row">No meta description</th><td>12</td></tr>
        <tr><th scope="row">No H1 at all</th><td>10</td></tr>
        <tr><th scope="row">No canonical tag</th><td>9</td></tr>
      </tbody>
    </table>
    <div class="prose reveal"><p>I'm not naming any of them.</p></div>
  </div>
</section>

<section class="sec" id="national" aria-labelledby="national-h">
  <div class="wrap">${head('07', 'Enterprise', 'national', 'SEO at national scale', "Not every account is local. One is a national payments processor and its co-branded programs. Their teams take the work live, so I don't name it here.")}
    <ul class="worklist stagger">
      <li><h3>Keyword architecture</h3><p>Every indexable page mapped to one target keyword, with a call on each URL: keep, rewrite, merge, redirect or retire.</p></li>
      <li><h3>Schema and metadata at scale</h3><p>A JSON-LD graph for every indexable page across the account, plus a rewritten title and description. All of it validated before handover.</p></li>
      <li><h3>Fixing an orphaned library</h3><p>A whole article section had no crawlable path into it. The controls that opened each category were buttons, and Googlebot doesn't click buttons.</p></li>
      <li><h3>Partner bank web audits</h3><p>A bank's public web presence scored against a fixed framework, then a gap analysis and a roadmap. The crawl can run again for the next partner.</p></li>
    </ul>
  </div>
</section>
`,
};
