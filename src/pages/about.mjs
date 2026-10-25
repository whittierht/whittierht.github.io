import { img, LINKEDIN } from '../lib.mjs';

export default {
  path: '/about/',
  slug: 'about',
  nav: 'about',
  priority: 0.7,
  pageType: 'ProfilePage',
  title: 'About Hyrum Whittier | Web Design and Local SEO',
  description: 'Hyrum Whittier is an SEO specialist and web designer who lives in Rexburg, Idaho, with a B.S. in Web Design and Development from BYU-Idaho.',
  crumbs: [['About', '/about/']],
  image: '/images/idaho-falls-1600.webp',
  body: `
<section class="hero hero--short" aria-label="About">
  ${img('tetons', 'The Grand Teton range reflected across a wide lake', { cls: 'hero-image', eager: true, sizes: '130vw' })}
  <div class="grain" aria-hidden="true"></div>
  <div class="wrap">
    <p class="kicker reveal">Hyrum Whittier</p>
    <h1 class="page-name reveal">About</h1>
    <p class="hero-statement reveal">I care what a site looks like, and whether anyone can find it.</p>
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
            <dt>Current</dt>
            <dd><b>SEO Specialist and Internal Tools Builder</b><span>Marketing agency, Rexburg, Idaho</span></dd>
          </div>
          <div>
            <dt>Elsewhere</dt>
            <dd><b>LinkedIn</b><span><a class="txtlink" href="${LINKEDIN}" rel="me">linkedin.com/in/hyrum-whittier</a></span></dd>
          </div>
        </dl>
      </div>

      <div class="about-text reveal">
        <p class="standfirst">A business can be doing everything right and still lose the job because its website looks thrown together. That's fixable.</p>

        <figure class="portrait">
          ${img('hyrum', 'Portrait of Hyrum Whittier', { sizes: '320px' })}
          <figcaption>Hyrum Whittier. Rexburg, Idaho.</figcaption>
        </figure>

        <p>So I build sites that look like someone cared: real type, real spacing, the client's own photos instead of stock, and pages that hold up on a phone. Then I do the search work underneath. A good-looking site nobody can find is a brochure in a drawer.</p>

        <p>When a tool I need doesn't exist, I build that too. Memphis exists because the agency outgrew Asana. The crawler exists because I wanted every page's title width, canonical and schema in one table.</p>

        <h2 class="about-h">Before this</h2>

        <p>From 2019 to 2021 I served a Spanish-speaking mission for The Church of Jesus Christ of Latter-day Saints in Tampa, Florida. Two years of knocking on doors in a language I was still learning taught me to explain things plainly.</p>

        <p>My wife and I got married in 2022, and we live in Rexburg. The Tetons up top are close enough to visit on a Saturday.</p>

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
