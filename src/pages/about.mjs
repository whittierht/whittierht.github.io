import { img, LINKEDIN, WHERE } from '../lib.mjs';

export default {
  path: '/about/',
  slug: 'about',
  nav: 'about',
  priority: 0.7,
  pageType: 'ProfilePage',
  title: 'About Hyrum Whittier | Websites, Web Apps and SEO',
  description: 'Hyrum Whittier is an SEO specialist who builds websites and web apps. He lives in Rexburg, Idaho, and has a B.S. in Web Design and Development from BYU-Idaho.',
  crumbs: [['About', '/about/']],
  image: '/images/idaho-falls-1600.webp',
  body: `
<header class="page-top">
  <div class="wrap">
    <h1 class="reveal">Hi, I'm Hyrum.</h1>
  </div>
</header>

<section class="sec" aria-label="About me">
  <div class="wrap about-top">
    <div class="about-text reveal">
      <p class="about-lead">I'm the SEO specialist at a marketing agency in Rexburg, Idaho. I also build websites and apps, at work and on my own.</p>
      <p>When we need a tool at work and it doesn't exist, I build it. Memphis started that way, because the agency outgrew Asana. Now we run on it every day, and three more of my <a href="/tools/">apps from work</a> have their own websites.</p>
      <p>On my own time I build sites and apps for small businesses in ${WHERE}. I use the business's own photos, and every site gets the same SEO work I do at my job.</p>
    </div>
    <figure class="portrait reveal">
      ${img('hyrum', 'Portrait of Hyrum Whittier', { sizes: '(max-width: 900px) 352px, 480px' })}
      <figcaption>Hyrum Whittier. Rexburg, Idaho.</figcaption>
    </figure>
  </div>
</section>

<section class="sec" aria-labelledby="offer-h">
  <div class="wrap">
    <header class="sec-head reveal">
      <h2 id="offer-h">What I can build for you</h2>
    </header>
    <ol class="offer stagger">
      <li>
        <span class="num">01</span>
        <h3>Websites</h3>
        <p>I design and code the whole site myself, and you own the files when it's done. If you're on Wix, GoDaddy or WordPress, I keep your URLs the same so your rankings can come with you.</p>
      </li>
      <li>
        <span class="num">02</span>
        <h3>Apps</h3>
        <p>I've built a sign-up form that takes payments, a flight cost calculator and full apps that a business runs on. If it runs in a browser, I can probably build it.</p>
      </li>
      <li>
        <span class="num">03</span>
        <h3>SEO</h3>
        <p>It's what I do all day at my job. Every site I build gets it, and I can work on a site you already have too.</p>
      </li>
    </ol>
  </div>
</section>

<section class="sec" aria-label="Background">
  <div class="wrap">
    <div class="about-grid">
      <div class="about-side">
        <dl class="cv reveal">
          <div>
            <dt>Education</dt>
            <dd><b>Bachelor of Science, Web Design and Development</b><span>Brigham Young University-Idaho, Rexburg</span></dd>
          </div>
          <div>
            <dt>Current job</dt>
            <dd><b>SEO Specialist and Internal Tools Builder</b><span>Marketing agency, Rexburg, Idaho</span></dd>
          </div>
          <div>
            <dt>Elsewhere</dt>
            <dd><b>LinkedIn</b><span><a class="txtlink" href="${LINKEDIN}" rel="me">linkedin.com/in/hyrum-whittier</a></span></dd>
          </div>
        </dl>
      </div>

      <div class="about-text reveal">
        <p>From 2019 to 2021 I served a Spanish-speaking mission for The Church of Jesus Christ of Latter-day Saints in Tampa, Florida. I learned the language as I went.</p>
        <p>My wife and I got married in 2022, and we live in Rexburg. The Tetons on my home page are close enough for a Saturday trip.</p>
        <figure class="snap">
          ${img('idaho-falls', 'Hyrum Whittier and his wife at the falls in Idaho Falls, with the temple behind them', { sizes: '(max-width: 900px) 92vw, 640px' })}
          <figcaption>My wife and me at the falls in Idaho Falls.</figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>
`,
};
