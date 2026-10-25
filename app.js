/* Clock, menu, reveals, the hero letters and the contact form.
   Progressive enhancement: every page is complete without any of this. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) root.classList.add('js-anim');

  /* ---------------------------------------------------------- clock */
  var clock = document.getElementById('clock');
  function tick() {
    if (!clock) return;
    var t;
    try {
      t = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Denver', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date());
    } catch (e) {
      t = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    clock.textContent = 'Utah and Idaho, ' + t;
  }
  tick();
  setInterval(tick, 20000);

  /* ------------------------------------------------- split the name up */
  Array.prototype.forEach.call(document.querySelectorAll('[data-split]'), function (host) {
    var i = 0;
    Array.prototype.forEach.call(host.querySelectorAll('.ln > span'), function (line) {
      var text = line.textContent;
      line.textContent = '';
      text.split('').forEach(function (c) {
        var ch = document.createElement('span');
        ch.className = 'ch';
        ch.textContent = c === ' ' ? ' ' : c;
        ch.style.transitionDelay = (i * 34) + 'ms';
        line.appendChild(ch);
        i++;
      });
      i += 2; /* a beat between lines */
    });
  });

  var lines = Array.prototype.slice.call(document.querySelectorAll('.hero .ln'));
  function raiseHero() { lines.forEach(function (l) { l.classList.add('up'); }); }
  function armHero() {
    if (document.hidden) {
      document.addEventListener('visibilitychange', function once() {
        if (document.hidden) return;
        document.removeEventListener('visibilitychange', once);
        requestAnimationFrame(raiseHero);
      });
      return;
    }
    raiseHero();
  }
  if (lines.length) {
    if (reduced) {
      raiseHero();
    } else {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { requestAnimationFrame(armHero); });
        setTimeout(armHero, 900); /* a slow font must not stall it */
      } else {
        requestAnimationFrame(armHero);
      }
      setTimeout(function () { root.classList.add('hero-settled'); }, 3000);
    }
  }

  /* ------------------------------------------------------ phone menu */
  var bar = document.getElementById('topbar');
  var menuBtn = document.getElementById('menuBtn');
  var scrim = document.getElementById('navScrim');

  function setMenu(open) {
    bar.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (scrim) scrim.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (menuBtn && bar) {
    menuBtn.addEventListener('click', function () { setMenu(!bar.classList.contains('open')); });
    if (scrim) scrim.addEventListener('click', function () { setMenu(false); });
    bar.addEventListener('click', function (e) { if (e.target.closest('.nav a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && bar.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });
  }

  /* ---------------------------------------------------------- reveals */
  var blocks = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var rows = Array.prototype.slice.call(document.querySelectorAll('.stagger > *'));

  if (reduced || !('IntersectionObserver' in window)) {
    blocks.forEach(function (el) { el.classList.add('in'); });
    rows.forEach(function (el) { el.classList.add('lit'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
    blocks.forEach(function (el) { io.observe(el); });

    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('lit');
        rio.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
    rows.forEach(function (el, i) {
      el.style.transitionDelay = (i % 5) * 60 + 'ms';
      rio.observe(el);
    });
  }

  /* Belt and braces: anything that has reached the viewport opens even if
     an observer callback was missed, so no screenshot stays hidden. */
  function sweepReveals() {
    var vh = window.innerHeight;
    for (var i = blocks.length - 1; i >= 0; i--) {
      var el = blocks[i];
      if (el.classList.contains('in')) { blocks.splice(i, 1); continue; }
      if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add('in');
    }
    rows.forEach(function (el) { if (!el.classList.contains('lit') && el.getBoundingClientRect().top < vh * 0.95) el.classList.add('lit'); });
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; sweepReveals(); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  sweepReveals();

  /* -------------------------------------------------------- copy email */
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (copy) {
    if (!navigator.clipboard) { copy.hidden = true; return; }
    copy.addEventListener('click', function () {
      var was = copy.textContent;
      navigator.clipboard.writeText(copy.getAttribute('data-copy')).then(function () {
        copy.textContent = 'Copied';
        setTimeout(function () { copy.textContent = was; }, 1600);
      });
    });
  });

  /* ------------------------------------------------------ media loading */
  /* Each screenshot shimmers until it decodes. */
  Array.prototype.forEach.call(document.querySelectorAll('.win-body img, .phone .screen img'), function (img) {
    var frame = img.parentElement;
    function done() { if (frame) frame.classList.add('ready'); }
    if (img.complete && img.naturalWidth) done();
    else {
      img.addEventListener('load', done);
      img.addEventListener('error', done);
    }
  });

  /* ------------------------------------------------------ contact form */
  /* Posts in the background so the visitor stays on the page. With JS off
     the form submits normally and the endpoint handles the redirect. */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form && note && window.fetch) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      note.className = 'f-note';
      note.textContent = 'Sending...';
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        note.className = 'f-note ok';
        note.textContent = 'Sent. Thanks for writing.';
      }).catch(function () {
        note.className = 'f-note bad';
        note.textContent = "That didn't go through. Email whittierht@gmail.com instead.";
      }).then(function () { btn.disabled = false; });
    });
  }
})();
