import { EMAIL, LINKEDIN, WHERE } from '../lib.mjs';

const faq = [
  ["I don't have a website at all. Can you start from scratch?", "Yes. It's the simplest kind of job: nothing to migrate and no old URLs to keep. The pages get planned around what you sell."],
  ['Do I own the site afterward?', 'Yes. You get the files, and the hosting and domain stay in your name.'],
  ["I'm on Wix or Squarespace. Do I have to move?", "To work with me, yes. I don't take on work inside page builders. Your URLs and wording come across with you, so the rankings can too."],
  ['Can you work on my existing site instead of rebuilding it?', "If it's hand-coded or WordPress, yes. Audits, schema, metadata and speed work all happen in place. If it's on a builder, the audit still stands on its own, and the fixes come with the rebuild."],
  ['What do you need from me to start?', 'The URL. Access to Search Console and Analytics helps me set priorities, but a crawl needs neither, so the first look can start with the URL alone.'],
];

export default {
  path: '/contact/',
  slug: 'contact',
  nav: 'contact',
  priority: 0.8,
  pageType: 'ContactPage',
  noCloser: true,
  title: 'Contact | Hyrum Whittier, Utah and Idaho',
  description: 'Get in touch about a new website, a rebuild off a page builder, or local SEO in Utah and Idaho. Websites start at $2,000.',
  crumbs: [['Contact', '/contact/']],
  body: `
<section class="contact" aria-labelledby="contact-h">
  <div class="wrap">
    <p class="label reveal">Contact</p>
    <h1 class="reveal" id="contact-h">Tell me about the site.</h1>
    <p class="standfirst reveal">Tell me what's going on with your site, or what you need built. If there's a URL, send it.</p>

    <form class="form reveal" id="contactForm" action="https://formsubmit.co/${EMAIL}" method="POST">
      <input type="hidden" name="_subject" value="New message from the portfolio">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_captcha" value="false">
      <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" class="hp">

      <div class="f-row">
        <div class="f-field">
          <label for="f-name">Name</label>
          <input id="f-name" name="name" type="text" required autocomplete="name">
        </div>
        <div class="f-field">
          <label for="f-email">Email</label>
          <input id="f-email" name="email" type="email" required autocomplete="email">
        </div>
      </div>

      <div class="f-field">
        <label for="f-url">Your website <span>optional</span></label>
        <input id="f-url" name="website" type="url" inputmode="url" placeholder="https://" autocomplete="url">
      </div>

      <div class="f-field">
        <label for="f-msg">What's going on with it?</label>
        <textarea id="f-msg" name="message" rows="5" required></textarea>
      </div>

      <div class="f-foot">
        <button class="btn" type="submit">Send</button>
        <p class="f-note" id="formNote" role="status" aria-live="polite"></p>
      </div>
    </form>

    <p class="contact-alt reveal">
      <a href="mailto:${EMAIL}">${EMAIL}</a>
      <button class="copy" type="button" data-copy="${EMAIL}">Copy address</button>
      <a class="txtlink" href="${LINKEDIN}" rel="me">LinkedIn</a>
      <span>${WHERE}</span>
    </p>
  </div>
</section>

<section class="sec" id="questions" aria-labelledby="faq-h">
  <div class="wrap">
    <header class="sec-head reveal">
      <p class="label">Questions</p>
      <h2 id="faq-h">Common questions</h2>
      <p class="standfirst">I build sites from scratch, and I move existing sites off page builders. Either way the site is hand-coded. I don't work inside page builders.</p>
      <p class="price-line">Websites start at <b>$2,000</b>. Bigger projects cost more, and you get the number before you commit to anything.</p>
    </header>
    <dl class="faq stagger">
${faq.map(([q, a]) => `      <div><dt>${q}</dt><dd>${a}</dd></div>`).join('\n')}
    </dl>
  </div>
</section>
`,
};
