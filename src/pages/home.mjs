import { img, SITE, EMAIL, WHERE } from '../lib.mjs';
import { projects, row } from '../projects.mjs';

export default {
  path: '/',
  slug: 'home',
  nav: 'home',
  priority: 1,
  title: 'Hyrum Whittier | Websites, Web Apps and SEO in Utah and Idaho',
  ogTitle: 'Hyrum Whittier, websites, web apps and SEO',
  description: 'I build websites and web apps, and I do SEO, in Utah and Idaho. Work for a flight school, a teen camp and a print shop, plus four apps built at my job.',
  schema: [
    {
      '@type': 'ProfessionalService',
      '@id': SITE + '/#service',
      name: 'Hyrum Whittier, Websites, Web Apps and SEO',
      url: SITE + '/',
      image: SITE + '/images/share.png',
      email: 'mailto:' + EMAIL,
      founder: { '@id': SITE + '/#person' },
      address: { '@type': 'PostalAddress', addressLocality: 'Rexburg', addressRegion: 'ID', addressCountry: 'US' },
      areaServed: [{ '@type': 'State', name: 'Utah' }, { '@type': 'State', name: 'Idaho' }],
      knowsAbout: ['Web applications', 'Web design', 'Local SEO', 'Structured data', 'Page builder migration'],
    },
  ],
  body: `
<section class="hero" aria-label="Introduction">
  ${img('tetons', 'The Grand Teton range reflected across a wide lake', { cls: 'hero-image', eager: true, sizes: '130vw' })}
  <div class="grain" aria-hidden="true"></div>
  <div class="wrap">
    <div class="hero-top">
      <p class="kicker reveal">Websites, apps and SEO <i>/</i> ${WHERE}</p>
      <h1 class="name" data-split>
        <span class="ln"><span>Hyrum</span></span>
        <span class="ln"><span>Whittier</span></span>
      </h1>
      <figure class="hero-face">${img('hyrum', 'Hyrum Whittier', { sizes: '(max-width: 900px) 30vw, 290px', eager: true })}</figure>
    </div>
    <div class="hero-foot">
      <p class="hero-statement reveal">I build websites and apps, and I do the <span class="hl">SEO</span> so people find them.</p>
      <p class="hero-role reveal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 6l12 12M18 8v10H8"/></svg>Developer and<br>SEO specialist</p>
    </div>
  </div>
</section>

<section class="sec intro" aria-label="What I do">
  <div class="wrap intro-grid">
    <p class="intro-big reveal">My office dropped Asana for Memphis, a task app I wrote. The whole team is in it every day. Outdoors for Youth takes its camp sign-ups and payments through a form of mine.</p>
    <div class="intro-side reveal">
      <p>I do SEO full time at a marketing agency in Rexburg, Idaho. On my own time I build sites and apps for small businesses in ${WHERE}.</p>
      <a class="round" href="/about/"><span>About me</span></a>
    </div>
  </div>
</section>

<section class="sec" id="work" aria-labelledby="work-h">
  <div class="wrap">
    <h2 class="rows-label" id="work-h">Apps and websites I've built</h2>
    <ul class="rows stagger">
${projects.map((p) => row(p)).join('\n')}
    </ul>
  </div>
</section>

<section class="sec" aria-labelledby="seo-h">
  <div class="wrap">
    <header class="sec-head reveal">
      <h2 id="seo-h">SEO is my full-time job</h2>
      <p class="standfirst">I've been doing SEO for a year and a half at a marketing agency in Rexburg. One of my accounts is a national payments processor, and the rest are local businesses. Every site I build gets the same work.</p>
    </header>
    <ul class="index index--places stagger">
      <li><div class="ix"><span class="ix-name">Nationwide</span><span class="ix-who">A payments processor</span><span class="ix-sector">Keywords and schema for every page</span></div></li>
      <li><div class="ix"><span class="ix-name">Rexburg and Pocatello</span><span class="ix-who">Bravo 6 Flight Academy</span><span class="ix-sector">A page for each town, with its own schema</span></div></li>
      <li><div class="ix"><span class="ix-name">Rexburg, Idaho</span><span class="ix-who">Madison Health</span><span class="ix-sector">SEO on the site they already had</span></div></li>
      <li><div class="ix"><span class="ix-name">Newdale, Idaho</span><span class="ix-who">Outdoors for Youth</span><span class="ix-sector">Moved off Wix with every slug kept</span></div></li>
    </ul>
    <p class="rows-more reveal"><a class="ring" href="/seo/">More about my SEO work</a></p>
  </div>
</section>
`,
};
