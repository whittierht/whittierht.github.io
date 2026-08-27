/* Clock, scroll progress, reveals and the index hover preview.
   Progressive enhancement: the page is complete without it. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* only hide things we are going to animate */
  if (!reduced) root.classList.add('js-anim');

  /* ------------------------------------------------------------- clock */
  var clock = document.getElementById('clock');
  function tick() {
    if (!clock) return;
    var t;
    try {
      t = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Boise', hour: 'numeric', minute: '2-digit', hour12: true
      }).format(new Date());
    } catch (e) {
      t = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    clock.textContent = 'Rexburg, ID — ' + t.replace(/ /g, ' ');
  }
  tick();
  setInterval(tick, 20000);

  /* -------------------------------------------- masked heading reveals */
  /* wrap contents so they can slide up out of the box */
  Array.prototype.forEach.call(document.querySelectorAll('.mask'), function (el) {
    if (el.querySelector('.mask-in')) return;
    var span = document.createElement('span');
    span.className = 'mask-in';
    while (el.firstChild) span.appendChild(el.firstChild);
    el.appendChild(span);
  });

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
        ch.textContent = c === ' ' ? ' ' : c;
        ch.style.transitionDelay = (i * 34) + 'ms';
        line.appendChild(ch);
        i++;
      });
      i += 2; /* beat between lines */
    });
  });

  /* ------------------------------------------------------------ scroll */
  var masthead = document.getElementById('masthead');
  var progress = document.getElementById('progress');
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot-frame img'));
  var portrait = document.querySelector('.portrait img');
  var ticking = false;

  function frame() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;

    if (masthead) masthead.classList.toggle('stuck', y > 10);

    if (progress) {
      var max = document.documentElement.scrollHeight - vh;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, Math.max(0, y / max)) : 0) + ')';
    }

    if (reduced) return;

    /* Screenshots are top-anchored in CSS. This just opens any that have
   reached the viewport, in case an observer callback is missed. */
    for (var i = 0; i < shots.length; i++) {
      var fr = shots[i].parentElement.getBoundingClientRect();
      var fig = shots[i].parentElement.parentElement;
      if (fig && !fig.classList.contains('in') && fr.top < vh * 0.95) {
        fig.classList.add('in');
      }
    }

    /* grey to colour as it rises through the viewport */
    if (portrait) {
      var pr = portrait.getBoundingClientRect();
      if (pr.height) {
        var mid = pr.top + pr.height / 2;
        var p = (vh * 0.92 - mid) / (vh * 0.42);
        portrait.style.setProperty('--gs', (1 - Math.min(1, Math.max(0, p))).toFixed(3));
      }
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(frame);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ----------------------------------------------------------- reveals */
  var blocks = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var rows = Array.prototype.slice.call(document.querySelectorAll('.detail > div, .numlist li, .index li'));

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
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.12 });
    rows.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 65 + 'ms';
      rio.observe(el);
    });

    /* a .mask outside a .reveal needs its own trigger */
    var lone = Array.prototype.slice.call(document.querySelectorAll('.mask')).filter(function (m) {
      return !m.closest('.reveal');
    });
    if (lone.length) {
      var mio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          mio.unobserve(e.target);
        });
      }, { threshold: 0.1 });
      lone.forEach(function (m) { mio.observe(m); });
    }
  }

  /* --------------------------------------------------------- hero lines */
  /* The name starts clipped, so this reveal cannot be allowed to fail.
     Deferred while the tab is hidden: a transform transition started while
     the page is not compositing can stay unfinished indefinitely. */
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

  /* ------------------------------------------------- index hover preview */
  var peek = document.getElementById('peek');
  var peekImg = document.getElementById('peekImg');
  var index = document.getElementById('index');

  if (peek && peekImg && index && window.matchMedia('(pointer: fine)').matches && !reduced) {
    var px = 0, py = 0, cx = 0, cy = 0, running = false;

    function glide() {
      cx += (px - cx) * 0.14;
      cy += (py - cy) * 0.14;
      peek.style.left = cx + 'px';
      peek.style.top = cy + 'px';
      if (running) requestAnimationFrame(glide);
    }

    index.addEventListener('pointermove', function (e) { px = e.clientX; py = e.clientY; });

    Array.prototype.forEach.call(index.querySelectorAll('a[data-preview]'), function (a) {
      a.addEventListener('pointerenter', function (e) {
        peekImg.src = a.dataset.preview;
        px = cx = e.clientX; py = cy = e.clientY;
        peek.classList.add('on');
        if (!running) { running = true; glide(); }
      });
      a.addEventListener('pointerleave', function () {
        peek.classList.remove('on');
        running = false;
      });
    });
  }

  /* --------------------------------------------------------------- misc */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  frame();
})();
