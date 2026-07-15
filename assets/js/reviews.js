/* THE PERFUME TAILOR — customer reviews slider
   ---------------------------------------------------------------
   Replace the placeholder reviews below with your real ones.
   Each entry: { name, place, stars (1-5), text }
   --------------------------------------------------------------- */
(function () {
  'use strict';
  const track = document.getElementById('rev-track');
  if (!track) return;

  const REVIEWS = [
    { name: 'Aarav Mehta', place: 'Mumbai', stars: 5,
      text: 'I finally found a signature scent that feels like me. They actually listened and matched me perfectly — I get compliments every single day.' },
    { name: 'Sneha Rao', place: 'Pune', stars: 5,
      text: 'Long-lasting and beautifully made. My oud holds from morning meetings to late dinners. Honestly rivals the originals.' },
    { name: 'Priya Kapoor', place: 'Delhi', stars: 5,
      text: 'Gifted my husband a fragrance from here and he hasn’t stopped wearing it. Their guidance made choosing so easy.' },
    { name: 'Rohan Desai', place: 'Bengaluru', stars: 5,
      text: 'Genuine, honest advice and a stunning collection. They helped me pick something unique instead of the obvious choice.' },
    { name: 'Ananya Singh', place: 'Hyderabad', stars: 5,
      text: 'The 30ml size is perfect for trying, and the quality is superb. I’ve already ordered three more for my family.' },
    { name: 'Kabir Verma', place: 'Ahmedabad', stars: 5,
      text: 'Warm service and a scent that’s truly mine. This is exactly how buying a fine perfume should feel.' }
  ];

  const initials = (n) => n.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const starRow = (s) =>
    Array.from({ length: 5 }, (_, i) => `<span class="rev-star${i < s ? '' : ' off'}">★</span>`).join('');

  track.innerHTML = REVIEWS.map(r => `
    <article class="rev-card">
      <div class="rev-stars">${starRow(r.stars)}</div>
      <span class="rev-quote">“</span>
      <p class="rev-text">${r.text}</p>
      <div class="rev-person">
        <span class="rev-avatar">${initials(r.name)}</span>
        <div>
          <div class="rev-name">${r.name}</div>
          <div class="rev-meta">${r.place}</div>
        </div>
      </div>
    </article>`).join('');

  const viewport = track.parentElement;
  const dotsWrap = document.getElementById('rev-dots');
  const prev = document.querySelector('.rev-prev');
  const next = document.querySelector('.rev-next');
  const cards = Array.from(track.children);

  const perView = () => {
    const w = window.innerWidth;
    return w <= 640 ? 1 : w <= 1000 ? 2 : 3;
  };

  let index = 0;
  const pages = () => Math.max(1, cards.length - perView() + 1);

  function build_dots() {
    const total = pages();
    dotsWrap.innerHTML = Array.from({ length: total },
      (_, i) => `<button class="rev-dot" aria-label="Go to review ${i + 1}"></button>`).join('');
    dotsWrap.querySelectorAll('.rev-dot').forEach((d, i) =>
      d.addEventListener('click', () => go(i)));
  }

  function go(i) {
    index = Math.max(0, Math.min(i, pages() - 1));
    const card = cards[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = card.offsetWidth + gap;
    track.style.transform = `translateX(${-index * step}px)`;
    dotsWrap.querySelectorAll('.rev-dot').forEach((d, k) =>
      d.classList.toggle('active', k === index));
    prev.disabled = index === 0;
    next.disabled = index >= pages() - 1;
  }

  function goWrap(i) {
    // wrap around instead of clamping, for a seamless auto-loop
    const total = pages();
    index = (i + total) % total;
    go(index);
  }

  prev.addEventListener('click', () => { goWrap(index - 1); restartAutoplay(); });
  next.addEventListener('click', () => { goWrap(index + 1); restartAutoplay(); });

  let rz;
  window.addEventListener('resize', () => {
    clearTimeout(rz);
    rz = setTimeout(() => { build_dots(); go(Math.min(index, pages() - 1)); }, 150);
  });

  /* ---- Autoplay ---- */
  const AUTOPLAY_MS = 4500;
  let autoplayTimer = null;

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => goWrap(index + 1), AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
  function restartAutoplay() { startAutoplay(); }

  viewport.addEventListener('mouseenter', stopAutoplay);
  viewport.addEventListener('mouseleave', startAutoplay);

  build_dots();
  go(0);
  startAutoplay();
})();
