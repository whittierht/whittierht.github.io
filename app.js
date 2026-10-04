/* Hyrum Whittier. Portfolio, third edition.
   The page is complete without this file. It loads the recordings, fades
   pictures in once, and handles the menu, the copy button and the form. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 900px)');
  var hasIO = 'IntersectionObserver' in window;

  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ------------------------------------------------------------- reveal */
  /* Pictures fade in once as they arrive. Anything already on screen is
     marked first, so nothing that was visible gets hidden. */
  var rv = $$('[data-rv]');
  if (hasIO && !reduce && rv.length) {
    rv.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
    });
    root.classList.add('rv-on');
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        seen.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (el) { if (!el.classList.contains('in')) seen.observe(el); });
  }

  /* -------------------------------------------------------------- video */
  /* Recordings carry no src until they are near the viewport, and only
     play while they are on screen. */
  var vids = $$('video.vid');
  function arm(v) {
    if (v.getAttribute('src') || !v.getAttribute('data-src')) return;
    v.preload = 'metadata';
    v.src = v.getAttribute('data-src');
  }
  if (hasIO) {
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
  } else {
    vids.forEach(function (v) { arm(v); v.controls = true; });
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
  }
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
    /* the links are plain anchors; the browser does the scrolling */
    links.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
    });
    desktop.addEventListener('change', function () { setMenu(false); });
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
