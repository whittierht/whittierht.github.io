/* Hyrum Whittier. Portfolio, third edition.
   The page is complete without this file. It fits the big type to the
   viewport, runs the scroll motion, and handles the small interactions. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 900px)');
  /* the pinned hero is a landscape layout; styles.css uses the same query */
  var HERO_WIDE = '(min-width: 900px) and (min-aspect-ratio: 1/1)';
  var heroWide = window.matchMedia(HERO_WIDE);
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  var motion = hasGsap && !reduce;
  var lenis = null;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function navH() {
    var nav = document.getElementById('nav');
    return nav ? nav.offsetHeight : 0;
  }

  /* ------------------------------------------------------ width fitting */
  /* Archivo's width axis runs 62 to 125. Each headline line is solved to
     the width that makes it span its container exactly. */
  var NARROW = 62, WIDE = 125;

  function widthAt(el, w) {
    el.style.setProperty('--w', w);
    return el.getBoundingClientRect().width;
  }

  function solve(el, target) {
    if (widthAt(el, WIDE) <= target) return WIDE;
    if (widthAt(el, NARROW) >= target) return NARROW;
    var lo = NARROW, hi = WIDE;
    for (var i = 0; i < 12; i++) {
      var mid = (lo + hi) / 2;
      if (widthAt(el, mid) < target) lo = mid; else hi = mid;
    }
    return lo;
  }

  function innerWidth(el) {
    var cs = getComputedStyle(el);
    return el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  }

  /* -------------------------------------------------------------- name */
  var pin = document.getElementById('heroPin');
  var nameEl = document.getElementById('name');
  var lines = nameEl ? $$('.nl', nameEl) : [];
  /* 1 squeezes the name to its narrowest. The intro lets go of it on load
     and the pinned hero squeezes it again on scroll. */
  var squeeze = { intro: motion ? 1 : 0, scroll: 0 };

  function paintName() {
    var k = Math.max(squeeze.intro, squeeze.scroll);
    lines.forEach(function (l) {
      var fit = l._fit || 100;
      l.style.setProperty('--w', (fit - (fit - NARROW) * k).toFixed(2));
    });
  }

  function fitName() {
    if (!nameEl || !lines.length) return;
    var W = nameEl.clientWidth;
    nameEl.style.setProperty('--name-size', '100px');
    var lo = 0, hi = Infinity;
    lines.forEach(function (l) {
      var narrow = widthAt(l, NARROW), wide = widthAt(l, WIDE);
      lo = Math.max(lo, W * 100 / wide);
      hi = Math.min(hi, W * 100 / narrow);
    });
    /* in the landscape hero the name takes a bit over half the height */
    var room = heroWide.matches ? (pin.clientHeight - navH()) * 0.56 / (lines.length * 0.8) : hi;
    var size = lo > hi ? hi : Math.max(lo, Math.min(hi, room));
    nameEl.style.setProperty('--name-size', size.toFixed(1) + 'px');
    lines.forEach(function (l) { l._fit = solve(l, W); });
    paintName();
  }

  /* --------------------------------------------------- kinetic headings */
  var kin = $$('[data-kin]');

  function fitKin() {
    kin.forEach(function (el) {
      el._to = solve(el, innerWidth(el.parentElement));
      el.style.setProperty('--w', motion ? NARROW : el._to.toFixed(2));
    });
  }

  /* ------------------------------------------------------------- intro */
  function intro() {
    if (!motion) { root.classList.add('ready'); return; }
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(squeeze, { intro: 0, duration: 1.4, ease: 'expo.out', onUpdate: paintName }, 0)
      .fromTo('.pile .print-in',
        { opacity: 0, scale: 1.18, rotation: function (i) { return [7, -9, 4][i] || 0; } },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.55, stagger: 0.13 }, 0.3)
      .fromTo('.statement, .status', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.55)
      .fromTo('.sticker', { scale: 0 }, { scale: 1, duration: 0.45, ease: 'back.out(2.4)' }, 1.05);
    root.classList.add('ready');
  }

  /* ------------------------------------------------------ scroll motion */
  function heroMotion() {
    /* The signature moment. --p drives the CSS that grows the Loafa print
       out of the pile; the same number squeezes the name behind it. */
    gsap.matchMedia().add(HERO_WIDE, function () {
      gsap.timeline({
        scrollTrigger: { trigger: pin, start: 'top top', end: '+=120%', pin: true, scrub: true, anticipatePin: 1 }
      })
        .to(squeeze, {
          scroll: 1, duration: 0.82, ease: 'power2.inOut',
          onUpdate: function () {
            pin.style.setProperty('--p', squeeze.scroll.toFixed(4));
            paintName();
          }
        })
        .to({}, { duration: 0.18 });
      return function () {
        squeeze.scroll = 0;
        pin.style.removeProperty('--p');
        paintName();
      };
    });
  }

  function reelMotion(reel) {
    var track = document.getElementById('reelTrack');
    gsap.matchMedia().add('(min-width: 900px)', function () {
      reel.classList.add('is-pinned');
      reel.scrollLeft = 0;
      var dist = function () { return Math.max(0, track.offsetWidth - reel.clientWidth); };
      /* the strip travels faster than the page, so nine plates do not cost nine screens */
      var PACE = 0.6;
      gsap.to(track, {
        x: function () { return -dist(); },
        ease: 'none',
        scrollTrigger: {
          trigger: reel,
          start: function () { return 'top ' + navH() + 'px'; },
          end: function () { return '+=' + dist() * PACE; },
          pin: true, scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true
        }
      });
      return function () {
        reel.classList.remove('is-pinned');
        gsap.set(track, { clearProps: 'transform' });
      };
    });
  }

  function scrollMotion() {
    gsap.registerPlugin(ScrollTrigger);

    if (window.Lenis) {
      lenis = new Lenis({ lerp: 0.11 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    heroMotion();

    /* created in document order, so the two pins are measured in sequence */
    $$('[data-kin], [data-rise], [data-wipe], [data-speed], #reel, .pano, .circled').forEach(function (el) {
      if (el.id === 'reel') { reelMotion(el); return; }

      if (el.hasAttribute('data-kin')) {
        gsap.fromTo(el, { '--w': NARROW }, {
          '--w': function () { return el._to || NARROW; },
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 96%', end: 'top 42%', scrub: 0.4, invalidateOnRefresh: true }
        });
        return;
      }

      if (el.hasAttribute('data-rise')) {
        var sibs = $$('[data-rise]', el.parentElement);
        gsap.from(el, {
          y: 34, opacity: 0, duration: 0.9, ease: 'power3.out',
          delay: Math.min(sibs.indexOf(el), 4) * 0.07,
          scrollTrigger: { trigger: el, start: 'top 93%', once: true }
        });
        return;
      }

      if (el.hasAttribute('data-wipe')) {
        gsap.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'expo.out', clearProps: 'clipPath',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        });
        var shot = $('a img', el);
        if (shot) {
          gsap.fromTo(shot, { scale: 1.12 }, {
            scale: 1, duration: 1.5, ease: 'expo.out', clearProps: 'transform',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true }
          });
        }
        return;
      }

      if (el.hasAttribute('data-speed')) {
        var s = parseFloat(el.getAttribute('data-speed')) || 1;
        var amp = function () { return window.innerHeight * 0.06 * s; };
        gsap.fromTo(el, { y: amp }, {
          y: function () { return -amp(); },
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true }
        });
        return;
      }

      if (el.classList.contains('pano')) {
        gsap.fromTo($('img', el), { yPercent: -16 }, {
          yPercent: 0, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
        });
        return;
      }

      /* the marker circle around the price draws itself */
      gsap.fromTo($$('path', el), { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut',
        scrollTrigger: { trigger: el, start: 'top 78%', once: true }
      });
    });

    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  /* ---------------------------------------------------------------- boot */
  function boot() {
    fitName();
    fitKin();
    intro();
    if (motion) scrollMotion();
  }

  /* Fitting needs the real font. Ask for it, but do not wait on a slow
     connection: boot with what is there and refit when the font lands. */
  var booted = false;
  function start() {
    if (booted) { refit(); return; }
    booted = true;
    boot();
  }
  if (document.fonts && document.fonts.load) {
    var asked = Promise.all([
      document.fonts.load('900 100px Archivo', 'HYRUMWITEAOFLS'),
      document.fonts.load('400 20px "Covered By Your Grace"', 'the best')
    ]).catch(function () {});
    asked.then(start);
    setTimeout(start, 1800);
  } else {
    start();
  }

  function refit() {
    fitName();
    fitKin();
    if (motion) ScrollTrigger.refresh();
  }

  var lastW = window.innerWidth, lastH = window.innerHeight, resizeT;
  window.addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      /* phones resize on every address-bar slide; only width matters there */
      var w = window.innerWidth, h = window.innerHeight;
      if (w === lastW && !(desktop.matches && h !== lastH)) return;
      lastW = w; lastH = h;
      refit();
    }, 160);
  });

  /* -------------------------------------------------------------- video */
  /* Recordings carry no src until they are near the viewport, and only
     play while they are on screen. */
  var vids = $$('video.vid');
  function arm(v) {
    if (v.getAttribute('src') || !v.getAttribute('data-src')) return;
    v.preload = 'metadata';
    v.src = v.getAttribute('data-src');
  }
  if ('IntersectionObserver' in window) {
    var near = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        arm(e.target);
        near.unobserve(e.target);
      });
    }, { rootMargin: '60% 0px' });
    var onScreen = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (!e.isIntersecting) { v.pause(); return; }
        arm(v);
        if (reduce) return;
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) {
      if (reduce) v.controls = true;
      near.observe(v);
      onScreen.observe(v);
    });

    /* the reel slides sideways, which lazy loading does not anticipate */
    var reelEl = document.getElementById('reel');
    if (reelEl) {
      var reelNear = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        $$('img', reelEl).forEach(function (img) { img.loading = 'eager'; });
        reelNear.disconnect();
      }, { rootMargin: '100% 0px' });
      reelNear.observe(reelEl);
    }
  } else {
    vids.forEach(function (v) { arm(v); v.controls = true; });
  }

  /* -------------------------------------------------------------- clock */
  var clock = document.getElementById('clock');
  if (clock && window.Intl) {
    try {
      var fmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Boise' });
      var tick = function () { clock.textContent = 'Rexburg, Idaho ' + fmt.format(new Date()); };
      tick();
      setInterval(tick, 30000);
    } catch (err) { /* keep the plain place name */ }
  }

  /* --------------------------------------------------------------- menu */
  var menuBtn = document.getElementById('menuBtn');
  var links = document.getElementById('links');
  function setMenu(open) {
    if (!menuBtn || !links) return;
    links.classList.toggle('open', open);
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.textContent = open ? 'Close' : 'Menu';
    if (lenis) { if (open) lenis.stop(); else lenis.start(); }
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
    });
    desktop.addEventListener('change', function () { setMenu(false); });
  }

  /* ------------------------------------------------------- in-page links */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    var target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    setMenu(false);
    var toTop = id === 'top';
    if (lenis) {
      lenis.scrollTo(toTop ? 0 : target, { offset: toTop ? 0 : -navH(), duration: 1.1 });
    } else {
      var y = toTop ? 0 : target.getBoundingClientRect().top + window.pageYOffset - navH();
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }
    if (!toTop) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });

  /* --------------------------------------------------------- send button */
  var mag = $('[data-magnet]');
  if (mag && motion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var xTo = gsap.quickTo(mag, 'x', { duration: 0.4, ease: 'power3.out' });
    var yTo = gsap.quickTo(mag, 'y', { duration: 0.4, ease: 'power3.out' });
    mag.addEventListener('pointermove', function (e) {
      var r = mag.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    mag.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
  }

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
