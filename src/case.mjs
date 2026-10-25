// One project page, in the second edition's case layout: the site in a
// window with the phone beside it, the details on the left, the story on
// the right, then up to two more screenshots.
import { win, phone } from './lib.mjs';

export function caseBody(c) {
  const kicker = [`<a href="/work/">Work</a>`, ...c.kicker].map((k) => `<span>${k}</span>`).join('');
  const visual = `
    <div class="case-visual${c.phone ? '' : ' solo'}">
      <div class="reveal">${win(c.shot, c.url, c.alt, { sizes: '(max-width: 1100px) 92vw, 760px', eager: true })}</div>
      ${c.phone ? phone(c.phone, c.phoneAlt) : ''}
    </div>`;
  const meta = c.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n          ');
  const links = c.links.map(([href, label, cls]) => `<a class="${cls || 'txtlink'}" href="${href}">${label}</a>`).join('\n          ');
  const plates = c.plates && c.plates.length ? `\n    <div class="plates">\n      ${c.plates.join('\n      ')}\n    </div>` : '';
  return `
<article class="case">
  <div class="wrap">
    <header class="case-top">
      <p class="case-kicker">${kicker}</p>
      <h1>${c.name}</h1>
    </header>
${visual}

    <div class="case-grid">
      <aside class="case-meta reveal" aria-label="Project details">
        <dl class="meta">
          ${meta}
        </dl>
      </aside>
      <div class="case-body reveal">
        <h2>${c.heading}</h2>
        <p class="standfirst">${c.standfirst}</p>
        ${c.body.trim()}
        <p class="case-links">
          ${links}
        </p>
      </div>
    </div>${plates}

    <nav class="next-case" aria-label="Next project">
      <p class="label">Next project</p>
      <a href="${c.next[0]}">${c.next[1]}</a>
    </nav>
  </div>
</article>`;
}
