/* Clock, menu, reveals, the hero letters, the project list and the contact form.
   Progressive enhancement: every page is complete without any of this. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var saving = !!(navigator.connection && navigator.connection.saveData);
  root.classList.add('js');
  if (!reduced) root.classList.add('js-anim');

  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function make(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

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
  each(document.querySelectorAll('[data-split]'), function (host) {
    var i = 0;
    each(host.querySelectorAll('.ln > span'), function (line) {
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

  /* the photo beside the name comes up with it */
  var lines = Array.prototype.slice.call(document.querySelectorAll('.hero .ln, .hero-face'));
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

  /* The home page's bar sits clear over the photo until the page moves. */
  function stick() { if (bar) bar.classList.toggle('is-stuck', window.scrollY > 24); }
  stick();

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
      var wait = (i % 5) * 70 + 'ms';
      el.style.transitionDelay = wait;
      el.style.setProperty('--sd', wait); /* the name inside a row waits the same */
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
    requestAnimationFrame(function () { ticking = false; stick(); sweepReveals(); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  sweepReveals();

  /* -------------------------------------------------------- copy email */
  each(document.querySelectorAll('[data-copy]'), function (copy) {
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
  each(document.querySelectorAll('.win-body img, .phone .screen img'), function (img) {
    var frame = img.parentElement;
    function done() { if (frame) frame.classList.add('ready'); }
    if (img.complete && img.naturalWidth) done();
    else {
      img.addEventListener('load', done);
      img.addEventListener('error', done);
    }
  });

  /* A clip over a screenshot plays while it is on screen and stops when it
     leaves. With reduced motion or data saving on, the screenshot stays. */
  function start(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  var clips = document.querySelectorAll('video[data-autoplay]');
  if (clips.length && !reduced && !saving && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) start(e.target);
        else e.target.pause();
      });
    }, { threshold: 0.3 });
    each(clips, function (v) {
      v.muted = true;
      v.addEventListener('playing', function () { v.classList.add('is-on'); });
      vio.observe(v);
    });
  }

  /* ------------------------------------------------------ round buttons */
  /* The button leans toward the pointer and its label leans a bit more. */
  if (!reduced && fine) {
    each(document.querySelectorAll('.round'), function (b) {
      var label = b.querySelector('span');
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        b.style.transform = 'translate(' + (x * 0.3).toFixed(1) + 'px,' + (y * 0.3).toFixed(1) + 'px)';
        if (label) label.style.transform = 'translate(' + (x * 0.14).toFixed(1) + 'px,' + (y * 0.14).toFixed(1) + 'px)';
      });
      b.addEventListener('mouseleave', function () {
        b.style.transform = '';
        if (label) label.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------- button fill */
  /* The second colour rises from the bottom when the pointer arrives and
     carries on out through the top when it leaves. */
  if (!reduced && fine) {
    each(document.querySelectorAll('.round, .ring'), function (b) {
      var t = 0;
      b.classList.add('fills');
      function rest() {
        b.classList.add('no-ease');
        b.classList.remove('is-out');
        void b.offsetWidth; /* put the colour back under the button before the next move */
        b.classList.remove('no-ease');
      }
      b.addEventListener('mouseenter', function () {
        clearTimeout(t);
        if (b.classList.contains('is-out')) rest();
        b.classList.add('is-in');
      });
      b.addEventListener('mouseleave', function () {
        b.classList.remove('is-in');
        b.classList.add('is-out');
        t = setTimeout(rest, 580);
      });
    });
  }

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

  /* --------------------------------- project list: a look at the site
     Mouse only, and only where the list is a table. A window opens under
     the pointer and trails it. Its screenshots sit in one tall strip that
     slides as the pointer changes rows. It never takes a click. */
  var links = Array.prototype.slice.call(document.querySelectorAll('a[data-peek]'));
  var wide = window.matchMedia('(min-width: 901px)');
  if (links.length && !reduced && fine) {
    var peek = make('div', 'peek');
    var box = make('div', 'peek-box');
    var strip = make('div', 'peek-strip');
    var dot = make('div', 'peek-dot');
    var dotLabel = make('span');
    dotLabel.textContent = 'View';
    dot.appendChild(dotLabel);
    peek.setAttribute('aria-hidden', 'true');
    dot.setAttribute('aria-hidden', 'true');

    var cells = links.map(function (a) {
      var cell = make('div', 'peek-cell');
      var img = new Image();
      img.alt = '';
      img.decoding = 'async';
      cell.appendChild(img);
      var film = null;
      var filmSrc = saving ? null : a.getAttribute('data-peek-video');
      if (filmSrc) {
        film = document.createElement('video');
        film.muted = true;
        film.loop = true;
        film.playsInline = true;
        film.preload = 'none';
        film.setAttribute('muted', '');
        film.setAttribute('playsinline', '');
        film.addEventListener('playing', function () { film.classList.add('is-on'); });
        cell.appendChild(film);
      }
      strip.appendChild(cell);
      return { img: img, src: a.getAttribute('data-peek'), film: film, filmSrc: filmSrc };
    });
    box.appendChild(strip);
    peek.appendChild(box);
    document.body.appendChild(peek);
    document.body.appendChild(dot);

    var loaded = false, on = false, cur = -1, running = false, hideT = 0, hidAt = 0;
    var tx = 0, ty = 0, bx = 0, by = 0, dx = 0, dy = 0;

    var frame = function () {
      bx += (tx - bx) * 0.11; by += (ty - by) * 0.11;
      dx += (tx - dx) * 0.24; dy += (ty - dy) * 0.24;
      peek.style.transform = 'translate3d(' + bx.toFixed(1) + 'px,' + by.toFixed(1) + 'px,0)';
      dot.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0)';
      if (on || Math.abs(tx - bx) > 0.5 || Math.abs(ty - by) > 0.5) requestAnimationFrame(frame);
      else running = false;
    };

    var films = function (i) {
      cells.forEach(function (c, n) {
        if (!c.film) return;
        if (n === i) {
          if (!c.film.getAttribute('src')) c.film.setAttribute('src', c.filmSrc);
          start(c.film);
        } else c.film.pause();
      });
    };

    var show = function (i, e) {
      if (!wide.matches) return;
      clearTimeout(hideT);
      tx = e.clientX; ty = e.clientY;
      if (!loaded) {
        loaded = true;
        cells.forEach(function (c) { c.img.src = c.src; });
      }
      var fresh = !on;
      if (fresh) {
        /* Start under the pointer unless it only just closed. */
        if (Date.now() - hidAt > 450) { bx = dx = tx; by = dy = ty; }
        on = true;
        peek.classList.add('on');
        dot.classList.add('on');
      }
      if (i !== cur) {
        cur = i;
        if (fresh) strip.style.transition = 'none'; /* open on the right picture, no slide */
        strip.style.transform = 'translate3d(0,' + (-i * 100) + '%,0)';
        if (fresh) { void strip.offsetHeight; strip.style.transition = ''; }
        films(i);
      } else if (fresh) films(i);
      if (!running) { running = true; requestAnimationFrame(frame); }
    };

    var hide = function () {
      if (!on) return;
      on = false;
      hidAt = Date.now();
      peek.classList.remove('on');
      dot.classList.remove('on');
      films(-1);
    };

    links.forEach(function (a, i) {
      a.addEventListener('mouseenter', function (e) { show(i, e); });
      a.addEventListener('mousemove', function (e) { show(i, e); });
      /* Wait a moment, so crossing the line between two rows keeps it open. */
      a.addEventListener('mouseleave', function () { clearTimeout(hideT); hideT = setTimeout(hide, 70); });
    });
    window.addEventListener('scroll', hide, { passive: true });
  }
})();
