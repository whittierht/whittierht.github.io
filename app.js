/* Clock, scroll spy, reveals, the hero letters. Progressive enhancement:
   the page is complete without any of this. */
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
      t = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Boise', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date());
    } catch (e) {
      t = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    clock.textContent = 'Rexburg, ID. ' + t;
  }
  tick();
  setInterval(tick, 20000);

  /* ------------------------------------------------- split the name up */
  /* one delay per letter; the counter runs across lines, not per line */
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
      i += 2; /* beat between lines */
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
  if (reduced) {
    raiseHero();
  } else {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { requestAnimationFrame(armHero); });
      setTimeout(armHero, 900); /* do not let a slow font stall it */
    } else {
      requestAnimationFrame(armHero);
    }
    /* force the resting state if the transition never lands */
    setTimeout(function () { root.classList.add('hero-settled'); }, 3000);
  }

  /* ------------------------------------------------------ mobile menu */
  var rail = document.getElementById('rail');
  var menuBtn = document.getElementById('menuBtn');
  var scrim = document.getElementById('railScrim');

  function setMenu(open) {
    rail.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (scrim) scrim.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (menuBtn && rail) {
    menuBtn.addEventListener('click', function () {
      setMenu(!rail.classList.contains('open'));
    });
    if (scrim) scrim.addEventListener('click', function () { setMenu(false); });
    /* a link closes it, otherwise the sheet covers what you jumped to */
    rail.addEventListener('click', function (e) {
      if (e.target.closest('.toc a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && rail.classList.contains('open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    /* going back to the desktop rail must not leave the body locked */
    window.matchMedia('(min-width: 1101px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ------------------------------------------------------ scroll spy */
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  var spied = Array.prototype.slice.call(document.querySelectorAll('[data-spy]'));

  function setActive(id) {
    var a = byId[id];
    /* Sections without a link in the contents (the hero) must not clear it. */
    if (!a) return;
    links.forEach(function (l) { l.classList.remove('is-active'); });
    a.classList.add('is-active');
    var sub = a.closest('.sub');
    if (sub && sub.previousElementSibling) sub.previousElementSibling.classList.add('is-active');
  }

  if ('IntersectionObserver' in window && spied.length) {
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      /* Last visible section that actually has a link, so a nested
         article wins over its parent and the hero is skipped. */
      var pick = null;
      for (var i = 0; i < spied.length; i++) {
        var id = spied[i].id;
        if (visible[id] && byId[id]) pick = id;
      }
      if (pick) setActive(pick);
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 });
    spied.forEach(function (s) { spy.observe(s); });
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

  /* ---------------------------------------- portrait: grey to colour */
  var portrait = document.querySelector('.portrait img');
  var ticking = false;
  function frame() {
    ticking = false;
    if (reduced || !portrait) return;
    var vh = window.innerHeight;
    var pr = portrait.getBoundingClientRect();
    if (pr.height) {
      var mid = pr.top + pr.height / 2;
      var q = (vh * 0.92 - mid) / (vh * 0.42);
      portrait.style.setProperty('--gs', (1 - Math.min(1, Math.max(0, q))).toFixed(3));
    }
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(frame);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  frame();

  /* -------------------------------------------------------- copy email */
  var copy = document.querySelector('[data-copy]');
  if (copy && navigator.clipboard) {
    copy.addEventListener('click', function () {
      var text = copy.getAttribute('data-copy');
      var was = copy.textContent;
      navigator.clipboard.writeText(text).then(function () {
        copy.textContent = 'Copied';
        setTimeout(function () { copy.textContent = was; }, 1600);
      });
    });
  } else if (copy) {
    copy.hidden = true;
  }

  /* --------------------------------------------------- phone shimmer */
  /* Drop the sweep once each phone screenshot has actually decoded. */
  Array.prototype.forEach.call(document.querySelectorAll('.phone .screen'), function (screen) {
    var img = screen.querySelector('img');
    if (!img) return;
    function done() { screen.classList.add('loaded'); }
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
  if (form && window.fetch) {
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
        note.textContent = 'Sent. I will get back to you.';
      }).catch(function () {
        note.className = 'f-note bad';
        note.textContent = 'That did not send. Email whittierht@gmail.com instead.';
      }).then(function () { btn.disabled = false; });
    });
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
