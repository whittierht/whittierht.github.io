import { img, win, phone, SITE, EMAIL, WHERE } from '../lib.mjs';
import { workIndex } from './work.mjs';

export default {
  path: '/',
  slug: 'home',
  nav: 'home',
  priority: 1,
  title: 'Hyrum Whittier | Web Design and Local SEO in Utah and Idaho',
  ogTitle: 'Hyrum Whittier, web design and local SEO',
  description: 'Hand-coded websites and local SEO in Utah and Idaho. Work for a band from Provo, a flight school, a teen camp and a dog daycare in Phoenix.',
  schema: [
    {
      '@type': 'ProfessionalService',
      '@id': SITE + '/#service',
      name: 'Hyrum Whittier, Web Design and Local SEO',
      url: SITE + '/',
      image: SITE + '/images/share.png',
      email: 'mailto:' + EMAIL,
      founder: { '@id': SITE + '/#person' },
      address: { '@type': 'PostalAddress', addressLocality: 'Rexburg', addressRegion: 'ID', addressCountry: 'US' },
      areaServed: [{ '@type': 'State', name: 'Utah' }, { '@type': 'State', name: 'Idaho' }],
      priceRange: 'From $2,000',
      knowsAbout: ['Local SEO', 'Web design', 'Structured data', 'Page builder migration'],
    },
  ],
  body: `
<section class="hero" aria-label="Introduction">
  ${img('tetons', 'The Grand Teton range reflected across a wide lake', { cls: 'hero-image', eager: true, sizes: '130vw' })}
  <div class="grain" aria-hidden="true"></div>
  <div class="wrap">
    <p class="kicker reveal">Web design and local SEO <i>/</i> ${WHERE}</p>
    <h1 class="name" data-split>
      <span class="ln"><span>Hyrum</span></span>
      <span class="ln"><span>Whittier</span></span>
    </h1>
    <div class="hero-foot">
      <p class="hero-statement reveal">I build websites, and I do the <span class="hl">search work</span> behind them.</p>
    </div>
  </div>
  <div class="scroll-cue" aria-hidden="true"><span>Scroll</span></div>
</section>

<section class="creds" aria-label="Background">
  <div class="wrap creds-grid">
    <div class="cred">
      <p class="cred-k">Education</p>
      <p class="cred-v">B.S. Web Design and Development</p>
      <p class="cred-n">Brigham Young University-Idaho</p>
    </div>
    <div class="cred">
      <p class="cred-k">Current role</p>
      <p class="cred-v">SEO Specialist and Internal Tools Builder</p>
      <p class="cred-n">Agency side, across a book of client accounts.</p>
    </div>
    <div class="cred">
      <p class="cred-k">Sectors</p>
      <p class="cred-v">Local service businesses to enterprise</p>
      <p class="cred-n">Recent work spans music, pet care, aviation, camps, healthcare, home services and payments.</p>
    </div>
    <div class="cred">
      <p class="cred-k">Websites</p>
      <p class="cred-v">Taking on new builds</p>
      <p class="cred-n">Hand-coded, from $2,000. ${WHERE}.</p>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="seo-h">
  <div class="wrap">
    <header class="sec-head reveal">
      <p class="label"><span class="num">01</span> Local SEO</p>
      <h2 id="seo-h">Search is the day job</h2>
      <p class="standfirst">I'm the SEO specialist at a marketing agency in Rexburg, working across a book of client accounts. The sites I build get the same work: a page for each town, schema that matches the real business, and titles short enough that Google doesn't cut them off.</p>
    </header>
    <ul class="index index--places stagger">
      <li><div class="ix"><span class="ix-name">Rexburg, Idaho</span><span class="ix-who">Bravo 6 Flight Academy</span><span class="ix-sector">A town page with its own schema</span></div></li>
      <li><div class="ix"><span class="ix-name">Pocatello, Idaho</span><span class="ix-who">Bravo 6 Flight Academy</span><span class="ix-sector">A town page with its own schema</span></div></li>
      <li><div class="ix"><span class="ix-name">Newdale, Idaho</span><span class="ix-who">Outdoors for Youth</span><span class="ix-sector">Moved off Wix with every slug kept</span></div></li>
      <li><div class="ix"><span class="ix-name">Phoenix, Arizona</span><span class="ix-who">Nadia's Dog Nanny Services</span><span class="ix-sector">Off GoDaddy, with the schema fixed</span></div></li>
      <li><div class="ix"><span class="ix-name">Rexburg, Idaho</span><span class="ix-who">Madison Health</span><span class="ix-sector">Search work on the site they already had</span></div></li>
    </ul>
    <p class="sec-more reveal"><a class="txtlink" href="/local-seo/">How I do local SEO</a><a class="txtlink" href="/local-seo/#rexburg">What I found crawling 63 Rexburg sites</a></p>
  </div>
</section>

<section class="sec" aria-labelledby="work-h">
  <div class="wrap">
    <header class="sec-head reveal">
      <p class="label"><span class="num">02</span> Selected work</p>
      <h2 id="work-h">Recent builds</h2>
      <p class="standfirst">Four hand-coded client sites, all live, and a game of my own.</p>
    </header>
${workIndex}

    <div class="feature">
      <div class="case-visual">
        <div class="reveal">${win('loafa-top', 'loafa-band.web.app', 'The Loafa home page: a yellow hand-drawn LOAFA logo on black', { sizes: '(max-width: 1100px) 92vw, 760px' })}</div>
        ${phone('loafa-m', 'The Loafa home page on a phone')}
      </div>
      <div class="feature-foot reveal">
        <p><b>Newest: Loafa.</b> An alt rock band from Provo, in one HTML file with no libraries.</p>
        <a class="txtlink" href="/work/loafa/">The full project</a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-tint" aria-labelledby="game-h">
  <div class="wrap">
    <div class="work-row flat">
      <div class="reveal">${win('ba-play', 'bloodantegame.web.app', 'Blood Ante in play: pixel-art knights on a card floor, with damage numbers', { sizes: '(max-width: 900px) 92vw, 640px' })}</div>
      <div class="reveal">
        <p class="label"><span class="num">03</span> On the side</p>
        <h2 id="game-h">Blood Ante</h2>
        <p>I make a game on the side. It's a pixel-art card game that runs in the browser, on a phone or a computer.</p>
        <p class="case-links"><a class="btn btn--light" href="https://bloodantegame.web.app/">Play Blood Ante</a><a class="txtlink" href="/work/blood-ante/">How it plays</a></p>
      </div>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="apps-h">
  <div class="wrap">
    <header class="sec-head reveal">
      <p class="label"><span class="num">04</span> Beyond websites</p>
      <h2 id="apps-h">Apps and tools</h2>
      <p class="standfirst">When a tool I need doesn't exist, I build it. Three of them turned into full apps for the agency.</p>
    </header>
    <ul class="worklist three stagger">
      <li><h3>Memphis</h3><p>The agency's project management system, and the reason we stopped paying for Asana.</p></li>
      <li><h3>Tarmac</h3><p>Staff time and payroll: an iPad kiosk, a phone portal and an admin panel.</p></li>
      <li><h3>Enterprise Mockups</h3><p>The client review board. Reviewers pin comments to the exact spot.</p></li>
    </ul>
    <p class="sec-more reveal"><a class="txtlink" href="/tools/">The apps and twelve smaller tools</a></p>
  </div>
</section>
`,
};
