// One project page: a big title with a round link to the live site, the
// site in a window with the phone beside it, the details on the left, the
// story on the right, then up to four more screenshots. A project with a
// second piece of work (an app beside the site, a staff side) adds it as a
// part.
import { win, phone } from './lib.mjs';

const SIZES = '(max-width: 1100px) 92vw, 1160px';

function visual(c, eager) {
  return `
    <div class="case-visual${c.phone ? '' : ' solo'}">
      <div class="reveal">${win(c.shot, c.url, c.alt, { sizes: SIZES, eager, video: c.video })}</div>
      ${c.phone ? phone(c.phone, c.phoneAlt) : ''}
    </div>`;
}

function grid(c, tag) {
  const meta = c.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n          ');
  const links = (c.links || []).map(([href, label, cls]) => `<a class="${cls || 'txtlink'}" href="${href}">${label}</a>`).join('\n          ');
  return `
    <div class="case-grid">
      <aside class="case-meta reveal" aria-label="${tag === 'h2' ? 'Project details' : 'Details'}">
        <dl class="meta">
          ${meta}
        </dl>
      </aside>
      <div class="case-body reveal">
        <${tag}>${c.heading}</${tag}>
        <p class="standfirst">${c.standfirst}</p>
        ${c.body.trim()}${links ? `
        <p class="case-links">
          ${links}
        </p>` : ''}
      </div>
    </div>`;
}

const plates = (c) => (c.plates && c.plates.length ? `\n    <div class="plates">\n      ${c.plates.join('\n      ')}\n    </div>` : '');

function part(p, i) {
  return `
    <section class="case-part" aria-labelledby="part-${i + 1}">
      <header class="case-part-top reveal">
        <p class="label">${p.label}</p>
        <h2 id="part-${i + 1}">${p.title}</h2>
      </header>
${visual(p, false)}
${grid(p, 'h3')}${plates(p)}
    </section>`;
}

// `off` marks a project that isn't live yet. `live` is the address the
// round button opens, and `liveLabel` is what the button says.
export function caseBody(c) {
  const bits = [`<a href="/work/">Work</a>`, ...c.kicker].map((k) => `<span>${k}</span>`);
  if (c.off) bits.push('<span class="state">Not live yet</span>');
  return `
<article class="case">
  <div class="wrap">
    <header class="case-top">
      <div>
        <p class="case-kicker">${bits.join('')}</p>
        <h1>${c.name}</h1>
      </div>${c.live ? `
      <a class="round" href="${c.live}"><span>${c.liveLabel || 'Live site'}</span></a>` : ''}
    </header>
${visual(c, true)}
${grid(c, 'h2')}${plates(c)}
${(c.parts || []).map(part).join('\n')}
    <nav class="next-case" aria-label="Next project">
      <p class="label">Next project</p>
      <a href="${c.next[0]}">${c.next[1]}</a>
    </nav>
  </div>
</article>`;
}
