import { img } from '../lib.mjs';

const tools = [
  ['SEO Meta Manager', 'WordPress plugin', 'A spreadsheet-style meta editor with CSV bulk upload for titles, descriptions and JSON-LD. It overrides Yoast and Rank Math.', 'PHP, GD, JavaScript'],
  ['FlashCompress', 'Extension and command line', 'Image and video compression in the browser: WebP, JPEG, PNG and AVIF. The command line version runs the same worker, so the files match byte for byte.', 'JavaScript, WebAssembly, Puppeteer'],
  ['MetaCounter', 'Chrome extension', 'Measures titles and descriptions in pixels, which is how Google cuts them off.', 'JavaScript'],
  ['StackLens', 'Chrome extension', 'Shows the stack behind whatever site you have open.', 'JavaScript'],
  ['Site crawler', 'Command line', 'Status codes, indexability, canonicals, hreflang, schema types and redirect chains, checked against every sitemap it can find.', 'Python'],
  ['Structured data validator', 'Command line', "The schema.org vocabulary and Google's eligibility rules, offline, so a graph can be scored before it ships.", 'Runs offline'],
  ['Web capture', 'Command line', 'Full-page screenshots and PDFs for one URL, a list, or a whole sitemap.', 'Python, Playwright'],
  ['Brand assets', 'Command line', "Pulls a site's real logo, favicon and brand colors.", 'Python, standard library only'],
  ['Screenshot Save Prompt', 'macOS utility', 'Region capture with a live pixel readout. It asks whether to keep each shot.', 'Swift, AppKit'],
  ['KeyRack', 'Password manager', 'A local password manager for the agency, with TOTP and an importer for the spreadsheet it replaced.', 'Next.js, SQLite, Drizzle'],
  ['FuelBurn', 'Subscription tracker', "Tracks the agency's recurring software spend. Sign-in is locked to the company domain.", 'Next.js, Firebase'],
  ['Office KPI board', 'Wall dashboard', 'One HTML file that pulls live numbers from the Memphis API onto the office TV.', 'HTML, Firebase'],
];

export default {
  path: '/tools/',
  slug: 'tools',
  nav: 'tools',
  priority: 0.7,
  title: "Apps and tools I've built | Hyrum Whittier",
  description: 'Three internal apps for the agency, Memphis, Tarmac and Enterprise Mockups, plus twelve smaller tools: a site crawler, Chrome extensions and a WordPress plugin.',
  crumbs: [['Apps and tools', '/tools/']],
  image: '/images/memphis-2000.webp',
  body: `
<header class="page-top">
  <div class="wrap">
    <p class="label reveal">Beyond websites</p>
    <h1 class="reveal">Apps and tools</h1>
    <p class="standfirst reveal">When a tool I need doesn't exist, I build it. Three of them turned into full apps for the agency.</p>
  </div>
</header>

<section class="sec" aria-labelledby="apps-h">
  <div class="wrap">
    <header class="sec-head reveal">
      <p class="label"><span class="num">01</span> Apps</p>
      <h2 id="apps-h">Three apps for the agency</h2>
      <p class="standfirst">All three sit behind a company sign-in, so screenshots are what I can show.</p>
    </header>

    <article class="prod" id="memphis">
      <div class="prod-head reveal"><h3>Memphis</h3></div>
      <p class="mono reveal">Project management</p>
      <div class="prod-stack">
        <figure class="prod-shot reveal">
          <div class="win"><div class="win-bar">memphis.hangarmarketing.com</div><div class="win-body free">${img('memphis', 'The Memphis dashboard with daily tasks, agency numbers, overdue and upcoming work, and a task inbox', { sizes: '(max-width: 1100px) 92vw, 1000px' })}</div></div>
        </figure>
        <div class="prod-text cols reveal">
          <p>The agency's project management system, and the reason we stopped paying for Asana.</p>
          <ul class="bullets">
            <li>A REST API with scoped keys, so work can be created and timed from outside the app.</li>
            <li>Messages go through Slack's API, so one sent here lands in the real workspace.</li>
            <li>The old Asana board came across as an archive, with its columns and tags.</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="prod" id="tarmac">
      <div class="prod-head reveal"><h3>Tarmac</h3></div>
      <p class="mono reveal">Staff time and payroll</p>
      <div class="prod-grid">
        <figure class="prod-shot reveal">
          <div class="phone"><div class="screen">${img('tarmac', 'The Tarmac timeclock on a phone, with hours for today, this week and the pay period', { sizes: '240px' })}</div></div>
          <figcaption>The phone portal.</figcaption>
        </figure>
        <div class="prod-text reveal">
          <p>Staff time and operations: an iPad kiosk, a phone portal and an admin panel. It started on Firebase and later moved to AWS Amplify.</p>
          <ul class="bullets">
            <li>PTO accrues per pay period. Holidays credit that day's scheduled hours.</li>
            <li>The payroll export separates worked hours from paid hours.</li>
            <li>Face clock-in at the kiosk is opt-in and runs on the iPad. No image leaves it.</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="prod" id="mockups">
      <div class="prod-head reveal"><h3>Enterprise Mockups</h3></div>
      <p class="mono reveal">Client review</p>
      <div class="prod-grid">
        <div class="prod-text reveal">
          <p>The client review board. Reviewers pin comments to the exact spot, and the export names the file, the position and the element.</p>
          <ul class="bullets">
            <li>Frames can be PDFs, HTML files, images, live URLs or a zipped site.</li>
            <li>Pins are saved as fractions of the frame. They hold at any zoom and stay put when the file is replaced.</li>
          </ul>
        </div>
        <div class="prod-text reveal">
          <p>There's a design editor inside it too, with live cursors for everyone in the file.</p>
          <p>Deleting a board only archives it. A purge is what removes it for good.</p>
        </div>
      </div>
    </article>
  </div>
</section>

<section class="sec sec-tint" id="tools" aria-labelledby="tools-h">
  <div class="wrap">
    <header class="sec-head reveal">
      <p class="label"><span class="num">02</span> Smaller tools</p>
      <h2 id="tools-h">Things I built along the way</h2>
      <p class="standfirst">Browser extensions, a WordPress plugin, command line scripts and a few apps for the agency.</p>
    </header>
    <div class="tl stagger">
      <div class="tl-row tl-head" aria-hidden="true"><span>Name</span><span>What it does</span><span>Built with</span></div>
${tools.map(([name, kind, what, stack]) => `      <div class="tl-row"><div class="tl-name">${name}<small>${kind}</small></div><div class="tl-desc">${what}</div><div class="tl-stack">${stack}</div></div>`).join('\n')}
    </div>
  </div>
</section>
`,
};
