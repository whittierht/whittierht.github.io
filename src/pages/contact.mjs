import { EMAIL, LINKEDIN, WHERE, face } from '../lib.mjs';

const faq = [
  ["I don't have a website at all. Can you start from scratch?", "Yes, and that's the easiest kind of job. There's nothing to move and no old links to keep. We plan the pages around what you sell."],
  ['Can you build an app for my business?', "Yes. I've built sign-up forms that take payments, calculators and full apps that a business runs on. Tell me what you need it to do."],
  ['Do I own it afterward?', 'Yes. You get the files, and the hosting and domain stay in your name.'],
  ["I'm on Wix or Squarespace. Do I have to move?", "To work with me, yes. I don't build inside page builders. Your URLs and wording come with you, so your rankings can too."],
  ['Can you work on my existing site instead of rebuilding it?', "If it's hand-coded or on WordPress, yes. I can do the audit, schema, metadata and speed work right where it is. If it's on a builder, I can still audit it, and the fixes come with the rebuild."],
  ['What do you need from me to start?', 'Just the URL. Search Console and Analytics access helps me pick what to fix first, but I can crawl the site without either.'],
];

export default {
  path: '/contact/',
  slug: 'contact',
  nav: 'contact',
  priority: 0.8,
  pageType: 'ContactPage',
  noCloser: true,
  title: 'Contact | Hyrum Whittier, Utah and Idaho',
  description: 'Get in touch about a new website, a web app, a move off a page builder, or SEO in Utah and Idaho.',
  crumbs: [['Contact', '/contact/']],
  body: `
<section class="contact contact--page" aria-labelledby="contact-h">
  <div class="wrap">
    <h1 class="reveal" id="contact-h">${face}Tell me about<br>your project</h1>

    <div class="contact-grid">
      <form class="form form--rows reveal" id="contactForm" action="https://formsubmit.co/${EMAIL}" method="POST">
        <input type="hidden" name="_subject" value="New message from the portfolio">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_captcha" value="false">
        <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" class="hp">

        <div class="f-field">
          <span class="f-num" aria-hidden="true">01</span>
          <label for="f-name">What's your name?</label>
          <input id="f-name" name="name" type="text" required autocomplete="name" placeholder="First and last name">
        </div>

        <div class="f-field">
          <span class="f-num" aria-hidden="true">02</span>
          <label for="f-email">What's your email?</label>
          <input id="f-email" name="email" type="email" required autocomplete="email" placeholder="you@example.com">
        </div>

        <div class="f-field">
          <span class="f-num" aria-hidden="true">03</span>
          <label for="f-url">Do you have a website already? <span>optional</span></label>
          <input id="f-url" name="website" type="url" inputmode="url" placeholder="https://" autocomplete="url">
        </div>

        <div class="f-field">
          <span class="f-num" aria-hidden="true">04</span>
          <label for="f-msg">What do you need?</label>
          <textarea id="f-msg" name="message" rows="4" required placeholder="A new website, an app, SEO help"></textarea>
        </div>

        <div class="f-foot">
          <button class="round" type="submit"><span>Send it</span></button>
          <p class="f-note" id="formNote" role="status" aria-live="polite"></p>
        </div>
      </form>

      <aside class="contact-side reveal" aria-label="Contact details">
        <div>
          <h2>Email</h2>
          <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
          <button class="copy" type="button" data-copy="${EMAIL}">Copy address</button>
        </div>
        <div>
          <h2>Where</h2>
          <p>Rexburg, Idaho</p>
          <p>I work with businesses in ${WHERE}.</p>
        </div>
        <div>
          <h2>Elsewhere</h2>
          <p><a href="${LINKEDIN}" rel="me">LinkedIn</a></p>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="sec" id="questions" aria-labelledby="faq-h">
  <div class="wrap">
    <header class="sec-head reveal">
      <h2 id="faq-h">Common questions</h2>
      <p class="standfirst">I build sites and apps from scratch, and I move existing sites off page builders. Either way I write the code myself.</p>
    </header>
    <dl class="faq stagger">
${faq.map(([q, a]) => `      <div><dt>${q}</dt><dd>${a}</dd></div>`).join('\n')}
    </dl>
  </div>
</section>
`,
};
