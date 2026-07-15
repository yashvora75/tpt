/* THE PERFUME TAILOR — interactions */
(function () {
  'use strict';

  /* Nav scroll state */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => document.body.classList.toggle('menu-open'));
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => document.body.classList.remove('menu-open'))
    );
  }

  /* Auto-stagger: children of [data-stagger] each reveal with a small delay */
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', '');
      child.style.transitionDelay = (i * 0.09) + 's';
    });
  });

  /* Scroll reveal */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  /* 3D tilt on cards / scents */
  const tiltEls = document.querySelectorAll('[data-tilt]');
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  if (supportsHover) {
    tiltEls.forEach(el => {
      el.addEventListener('mousemove', (ev) => {
        const r = el.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5;
        const py = (ev.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-6px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* Count-up stats */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1600; const start = performance.now();
        const step = (t) => {
          const p = Math.min((t - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = (target % 1 ? val.toFixed(1) : Math.floor(val)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(c => cio.observe(c));
  }

  /* Graceful logo fallback — hide the <img> if the file isn't present yet,
     so the wordmark shows cleanly instead of a broken-image icon */
  document.querySelectorAll('.brand img').forEach(img => {
    const hide = () => { img.style.display = 'none'; };
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener('error', hide);
  });

  /* Year */
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  /* Note: the contact form has its own dedicated handler in contact.html */
})();
