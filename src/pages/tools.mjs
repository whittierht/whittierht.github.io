import { win } from '../lib.mjs';

const SIZES = '(max-width: 900px) 92vw, 720px';

// The four apps built at work. I made each app and the site for it.
export const products = [
  {
    id: 'memphis',
    name: 'Memphis',
    kind: 'Tasks and timesheets for agencies',
    site: 'memphistasks.com',
    img: 'memphis-site',
    alt: 'The Memphis site: The task board that fills in your timesheet',
    lead: [
      'This is the one we use every day. Our whole agency runs on Memphis, and we dropped Asana for it.',
      'You start a timer on a task and the hours go to the right client, so the timesheet fills itself in.',
    ],
    bullets: [
      'Tasks, hours, clients, a calendar, an inbox and project boards are all in one window.',
      "Clients approve work inside it. There's a weekly report and a KPI board too.",
      'It has an API with personal keys, so other tools can create work and time it.',
      'Every agency gets its own private Memphis with its own database.',
      "It runs on the web and on iPhone. The What's New page has 123 entries since July.",
    ],
    access: "It's in early access right now.",
  },
  {
    id: 'tarmac',
    name: 'Tarmac',
    kind: 'Flight school management and scheduling',
    site: 'tarmacflight.com',
    img: 'tarmac-site',
    alt: 'The Tarmac site: First call to checkride',
    lead: [
      "Tarmac is flight school software, built at Bravo 6 Flight Academy in Rexburg. It runs a flight school from a student's first call to their checkride.",
      'When a plane gets checked back in, Tarmac makes the invoice and emails it.',
    ],
    bullets: [
      'It has sixteen parts, like the schedule, dispatch, maintenance and billing.',
      'The daily risk check asks 26 questions in five sections.',
      'Dispatch records the Hobbs and tach numbers when a plane goes out and when it comes back.',
      'There are six flight calculators, including an E6B, and a portal for students.',
      'Records get archived, never deleted. Staff sign in with two steps.',
    ],
    access: 'Other flight schools get in by invitation.',
  },
  {
    id: 'helios',
    name: 'Helios',
    kind: 'Time clock and HR for small teams',
    site: 'heliosclock.com',
    img: 'helios',
    alt: 'The Helios site: Every hour, accounted for',
    lead: [
      "Helios is a time clock and HR app for small teams. There's an iPad by the door, and you clock in with your name and a four-digit PIN.",
      'You can clock in from your phone too.',
    ],
    bullets: [
      'Face sign-in is optional. The iPad turns your face into 128 numbers and never saves a photo.',
      'PTO follows the company policy, including accrual, carryover and paid holidays.',
      "Payroll hours come out as one CSV file. Helios doesn't hold pay rates.",
      'The HR side has a directory, an org chart and onboarding checklists. You sign documents by typing your name.',
      'AWS hosts it, and you sign in with Google.',
    ],
    access: "It's by invitation only.",
  },
  {
    id: 'traffic-control',
    name: 'Traffic Control',
    kind: 'Phone system for small businesses',
    site: 'trafficcontrolphone.com',
    img: 'traffic',
    alt: 'The Traffic Control site: Your phones, under control',
    lead: [
      'Traffic Control is a phone system for small businesses. You set up the phone menu, ring groups and business hours, and then you answer calls right in the browser.',
      'If you miss a call, it texts the customer back.',
    ],
    bullets: [
      'Voicemail comes with a transcript.',
      'Each customer gets one text thread that the whole team shares.',
      'Call tracking gives each website visitor a number, so you can see which ad and landing page a call came from.',
      'Other apps can embed its screens, with an API key and webhooks.',
      'One sign-in can cover several businesses.',
    ],
    access: "It's invite only.",
  },
];

const tools = [
  ['SEO Meta Manager', 'WordPress plugin', 'A spreadsheet-style editor for titles, descriptions and JSON-LD, with CSV bulk upload. It overrides Yoast and Rank Math.', 'PHP, GD, JavaScript'],
  ['FlashCompress', 'Extension and command line', 'Compresses images and video in the browser to WebP, JPEG, PNG and AVIF. The command line version runs the same worker, so the files match byte for byte.', 'JavaScript, WebAssembly, Puppeteer'],
  ['MetaCounter', 'Chrome extension', 'Measures titles and descriptions in pixels, which is how Google cuts them off.', 'JavaScript'],
  ['StackLens', 'Chrome extension', 'Shows what the site you have open is built with.', 'JavaScript'],
  ['Site crawler', 'Command line', 'Checks status codes, indexability, canonicals, hreflang, schema types and redirect chains against every sitemap it can find.', 'Python'],
  ['Structured data validator', 'Command line', "Checks a schema graph against the schema.org vocabulary and Google's eligibility rules, offline, before it goes live.", 'Runs offline'],
  ['Web capture', 'Command line', 'Takes full-page screenshots and PDFs of one URL, a list, or a whole sitemap.', 'Python, Playwright'],
  ['Brand assets', 'Command line', "Pulls a site's real logo, favicon and brand colors.", 'Python, standard library only'],
  ['Screenshot Save Prompt', 'macOS utility', 'Region capture with a live pixel readout. It asks whether to keep each shot.', 'Swift, AppKit'],
  ['KeyRack', 'Password manager', 'A local password manager for the agency, with TOTP and an importer for the spreadsheet it replaced.', 'Next.js, SQLite, Drizzle'],
  ['FuelBurn', 'Subscription tracker', "Tracks what the agency pays for software every month. Sign-in is locked to the company domain.", 'Next.js, Firebase'],
  ['Office KPI board', 'Wall dashboard', 'One HTML file that puts live numbers from the Memphis API on the office TV.', 'HTML, Firebase'],
];

const product = (p) => `
    <article class="prod" id="${p.id}">
      <div class="prod-head reveal"><h2>${p.name}</h2><p class="state">Not live yet</p></div>
      <p class="mono reveal">${p.kind}</p>
      <div class="prod-grid prod-grid--shot">
        <a class="prod-shot shot-link reveal" href="https://${p.site}/" aria-label="${p.name} at ${p.site}">${win(p.img, p.site, p.alt, { sizes: SIZES })}</a>
        <div class="prod-text reveal">
${p.lead.map((t) => `          <p>${t}</p>`).join('\n')}
          <ul class="bullets">
${p.bullets.map((b) => `            <li>${b}</li>`).join('\n')}
          </ul>
          <p>${p.access}</p>
          <p class="case-links"><a class="ring" href="https://${p.site}/">${p.site}</a></p>
        </div>
      </div>
    </article>`;

export default {
  path: '/tools/',
  slug: 'tools',
  nav: 'tools',
  priority: 0.8,
  title: "Apps I've built | Hyrum Whittier",
  description: "Four apps I built at my job, Memphis, Tarmac, Helios and Traffic Control, and the websites for them. They aren't live yet. Plus twelve smaller tools.",
  crumbs: [['Apps', '/tools/']],
  image: '/images/memphis-site-1600.webp',
  body: `
<header class="page-top">
  <div class="wrap">
    <h1 class="reveal">Apps I built at my job</h1>
    <p class="standfirst reveal">At my job I build the software we run the agency on. Four of those apps turned into products with their own websites. I didn't just make the sites, I made the apps too. They aren't live yet, so right now you get in by invite or early access.</p>
  </div>
</header>

<section class="sec" aria-label="The four apps">
  <div class="wrap">
${products.map(product).join('\n')}

    <article class="prod" id="mockups">
      <div class="prod-head reveal"><h2>Enterprise Mockups</h2><p class="state state--quiet">Internal</p></div>
      <p class="mono reveal">Client review board</p>
      <div class="prod-grid prod-grid--even">
        <div class="prod-text reveal">
          <p>This is the board we send clients when we want their feedback. They pin a comment on the exact spot they mean, and the export names the file, the position and the element.</p>
          <ul class="bullets">
            <li>A frame can be a PDF, an HTML file, an image, a live URL or a zipped site.</li>
            <li>Pins are saved as fractions of the frame. They stay put at any zoom, and when the file gets replaced.</li>
          </ul>
        </div>
        <div class="prod-text reveal">
          <p>There's a design editor inside it too, and you can see everyone's cursor live.</p>
          <p>Deleting a board only archives it. You have to purge it to remove it for good.</p>
        </div>
      </div>
    </article>
  </div>
</section>

<section class="sec sec-tint" id="tools" aria-labelledby="tools-h">
  <div class="wrap">
    <header class="sec-head reveal">
      <h2 id="tools-h">Smaller tools I've made</h2>
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
