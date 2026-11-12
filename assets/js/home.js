/* ==========================================================================
   home.js — homepage content and interactions
   Renders metrics, promo slides, services, work, process and client reviews
   from data.js, and runs the two carousels.
   ========================================================================== */
(function () {
  'use strict';
  const S = window.SITE;
  const D = S.data.home;
  const { esc, url } = S;
  const attrs = value => `data-ar="${esc(value.ar)}" data-en="${esc(value.en)}"`;

  /* ---------- Metrics ---------- */
  const metrics = document.getElementById('metrics');
  metrics.innerHTML = D.metrics.map(m => `
    <div class="metric">
      <dt ${attrs(m)}>${esc(m.ar)}</dt>
      <dd><span class="metric-value" data-count="${m.value}">${m.value}</span><span aria-hidden="true">+</span></dd>
    </div>`).join('');

  function animateCounters() {
    const counters = metrics.querySelectorAll('[data-count]');
    if (S.reducedMotion.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const el = entry.target;
        const target = Number(el.dataset.count);
        const start = performance.now();
        const duration = 1200;
        const tick = now => {
          const p = Math.min((now - start) / duration, 1);
          el.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        el.textContent = '0';
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    counters.forEach(c => observer.observe(c));
  }

  /* ---------- Promo slides ---------- */
  document.getElementById('promoCta').href = url(D.slidesLink);
  document.getElementById('promoTrack').innerHTML = D.slides.map((s, i) => `
    <div class="slide"><a class="promo-slide" href="${esc(url(D.slidesLink))}">
      <img src="${esc(url(s.ar))}" data-src-ar="${esc(s.ar)}" data-src-en="${esc(s.en)}"
           alt="${esc(s.altAr)}" data-alt-ar="${esc(s.altAr)}" data-alt-en="${esc(s.altEn)}"
           width="1440" height="480" decoding="async" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
    </a></div>`).join('');

  /* ---------- Services ---------- */
  const SERVICE_ICONS = {
    social: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10.5 18.5h3"/><path d="M12 13.4s-3.2-1.9-3.2-4a1.7 1.7 0 0 1 3.2-.8 1.7 1.7 0 0 1 3.2.8c0 2.1-3.2 4-3.2 4Z"/>',
    identity: '<path d="m12 19 7-7 3 3-7 7-3-3Z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
    ads: '<path d="M3 11v3a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    print: '<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7" rx="1"/><path d="M18 12h.01"/>',
    content: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10.5 5.2-3a.5.5 0 0 1 .8.4v8.2a.5.5 0 0 1-.8.4l-5.2-3"/><path d="m7.5 9.5 4 2.5-4 2.5Z"/>',
    marketing: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/><path d="M15 8h5v5"/>'
  };
  document.getElementById('servicesGrid').innerHTML = D.services.map(s => `
    <a class="service-card card" href="${esc(url(s.href))}">
      <span class="service-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${SERVICE_ICONS[s.icon] || ''}</svg></span>
      <h3 ${attrs(s.title)}>${esc(s.title.ar)}</h3>
      <p ${attrs(s.desc)}>${esc(s.desc.ar)}</p>
      <span class="card-link"><span data-ar="${s.href.startsWith('contact') ? 'اطلب الخدمة' : 'شاهد الأعمال'}" data-en="${s.href.startsWith('contact') ? 'Request this service' : 'View the work'}">${s.href.startsWith('contact') ? 'اطلب الخدمة' : 'شاهد الأعمال'}</span>${S.icons.arrow}</span>
    </a>`).join('');

  /* ---------- Work ---------- */
  document.getElementById('workGrid').innerHTML = D.workTeaser.map(w => `
    <a class="work-card${w.wide ? ' work-card--wide' : ''}" href="${esc(url(w.href))}" data-work="${esc(w.href)}">
      ${w.coverVideo
        ? `<video class="work-card-video" muted loop playsinline preload="none" poster="${esc(url(w.poster))}" data-src="${esc(url(w.coverVideo))}" aria-hidden="true"></video>`
        : `<img src="${esc(url(w.coverAr))}" data-src-ar="${esc(w.coverAr)}" data-src-en="${esc(w.coverEn)}" alt="" width="1200" height="800" loading="lazy" decoding="async">`}
      <span class="work-card-body">
        <h3 ${attrs(w.title)}>${esc(w.title.ar)}</h3>
        <span class="work-card-arrow" aria-hidden="true">${S.icons.arrow}</span>
      </span>
    </a>`).join('');

  /* Service cards that have a portfolio scroll down to its cover in "Our work"
     and highlight it; the visitor then opens the gallery from the cover.
     Services without a portfolio (content, marketing) go to the contact page. */
  document.getElementById('servicesGrid').addEventListener('click', event => {
    const card = event.target.closest('.service-card');
    if (!card || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const service = D.services[[...card.parentElement.children].indexOf(card)];
    const cover = service && document.querySelector(`.work-card[data-work="${CSS.escape(service.href)}"]`);
    if (!cover) return;
    event.preventDefault();
    cover.scrollIntoView({ behavior: S.reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
    document.querySelectorAll('.work-card.is-focus').forEach(el => el.classList.remove('is-focus'));
    cover.classList.add('is-focus');
    clearTimeout(cover._focusTimer);
    cover._focusTimer = setTimeout(() => cover.classList.remove('is-focus'), 2600);
    setTimeout(() => cover.focus({ preventScroll: true }), S.reducedMotion.matches ? 0 : 600);
  });

  /* Animated covers play only while on screen (and never with reduced motion) */
  const coverVideos = document.querySelectorAll('.work-card-video');
  if (coverVideos.length && 'IntersectionObserver' in window && !S.reducedMotion.matches) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else v.pause();
    }), { threshold: 0.25 });
    coverVideos.forEach(v => io.observe(v));
  }

  /* ---------- Process ---------- */
  document.getElementById('processGrid').innerHTML = D.process.map((p, i) => `
    <li class="process-step card">
      <span class="process-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <h3 ${attrs(p.title)}>${esc(p.title.ar)}</h3>
      <p ${attrs(p.desc)}>${esc(p.desc.ar)}</p>
    </li>`).join('');

  /* ---------- Testimonials ----------
     Two rows of message-style cards drifting in opposite directions. Each row
     holds its cards twice so the loop is seamless; the copy is hidden from
     screen readers. Hover, touch or keyboard focus pauses the motion. */
  const reviewCard = (item, hidden) => `
    <figure class="review"${hidden ? ' aria-hidden="true"' : ''}>
      <svg class="review-mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M13 7C7.9 8.7 5 12.6 5 18.4V25h9v-9H9.7c.2-3.2 1.8-5.3 4.8-6.4L13 7Zm14 0c-5.1 1.7-8 5.6-8 11.4V25h9v-9h-4.3c.2-3.2 1.8-5.3 4.8-6.4L27 7Z"/></svg>
      <blockquote ${attrs(item.quote)}>${esc(item.quote.ar)}</blockquote>
      <figcaption class="review-author">
        <span class="review-avatar${item.logo ? ' has-logo' : ''}" aria-hidden="true">${item.logo
          ? `<img src="${esc(url(item.logo))}" alt="" width="80" height="80" loading="lazy" decoding="async">`
          : item.icon === 'cake'
            ? '<svg viewBox="0 0 24 24"><path d="M12 3.5c.9.8 1.4 1.6 1.4 2.4a1.4 1.4 0 0 1-2.8 0c0-.8.5-1.6 1.4-2.4Z"/><path d="M12 7.5V10"/><rect x="4" y="10" width="16" height="4.5" rx="1.5"/><path d="M4 12.2c1.3 1 2.7 1 4 0s2.7-1 4 0 2.7 1 4 0 2.7-1 4 0"/><path d="M5 14.5v5h14v-5"/><path d="M3.5 19.5h17"/></svg>'
            : esc(item.initial || '')}</span>
        <span class="review-meta">
          <strong ${attrs(item.author)}>${esc(item.author.ar)}</strong>
          <span class="review-service" ${attrs(item.service)}>${esc(item.service.ar)}</span>
        </span>
      </figcaption>
    </figure>`;
  const half = Math.ceil(D.testimonials.length / 2);
  const rows = [D.testimonials.slice(0, half), D.testimonials.slice(half)];
  document.querySelectorAll('#reviews .reviews-track').forEach((track, r) => {
    const list = rows[r] || [];
    track.innerHTML = list.map(item => reviewCard(item, false)).join('') + list.map(item => reviewCard(item, true)).join('');
  });
  const reviews = document.getElementById('reviews');
  reviews.addEventListener('touchstart', () => reviews.classList.add('is-paused'), { passive: true });
  reviews.addEventListener('touchend', () => setTimeout(() => reviews.classList.remove('is-paused'), 2500), { passive: true });

  /* ---------- Hero title: always exactly two lines ----------
     Each line is nowrap; if a line is wider than its column (e.g. a wider
     web font loads), the title is scaled down just enough to fit. */
  const heroTitle = document.getElementById('heroTitle');
  function fitHeroTitle() {
    heroTitle.style.fontSize = '';
    const box = heroTitle.clientWidth;
    const widest = Math.max(...[...heroTitle.querySelectorAll('.hero-line')].map(line => {
      const range = document.createRange();
      range.selectNodeContents(line);
      return range.getBoundingClientRect().width;
    }));
    if (widest > box) heroTitle.style.fontSize = (parseFloat(getComputedStyle(heroTitle).fontSize) * box / widest * 0.98) + 'px';
  }
  let fitTimer;
  window.addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(fitHeroTitle, 100); });
  document.fonts?.ready.then(fitHeroTitle);
  S.onLanguageChange(() => requestAnimationFrame(fitHeroTitle));

  /* ---------- Carousel ---------- */
  function Carousel(root) {
    const track = root.querySelector('.slider-track');
    const viewport = root.querySelector('.slider-viewport');
    const slides = [...track.children];
    const dotsBox = root.querySelector('.slider-dots');
    const delay = Number(root.dataset.autoplay) || 0;
    let index = 0;
    let timer = null;
    let paused = false;
    let inView = true;
    if (slides.length < 2) { root.classList.add('is-single'); return; }

    dotsBox.innerHTML = slides.map((_, i) => `<button type="button" class="slider-dot" data-label-ar="الشريحة ${i + 1} من ${slides.length}" data-label-en="Slide ${i + 1} of ${slides.length}" aria-label="الشريحة ${i + 1} من ${slides.length}"></button>`).join('');
    const dots = [...dotsBox.children];
    slides.forEach((slide, i) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('data-label-ar', `${i + 1} من ${slides.length}`);
      slide.setAttribute('data-label-en', `${i + 1} of ${slides.length}`);
      slide.setAttribute('aria-label', `${i + 1} من ${slides.length}`);
    });

    /* Seamless loop: a copy of the last slide sits before the first and a
       copy of the first after the last. Moving past either end animates onto
       the copy, then silently jumps to the real slide, so the carousel always
       moves in the same direction instead of rewinding through every slide. */
    const n = slides.length;
    const cloneOf = slide => {
      const c = slide.cloneNode(true);
      c.classList.add('is-clone');
      c.removeAttribute('aria-label');
      c.setAttribute('aria-hidden', 'true');
      c.inert = true;
      c.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
      return c;
    };
    track.prepend(cloneOf(slides[n - 1]));
    track.append(cloneOf(slides[0]));
    let pos = 1;           // position on the track, including the two copies
    let moving = false;
    const reduce = () => S.reducedMotion.matches;
    function place(animate) {
      const sign = document.documentElement.dir === 'rtl' ? 1 : -1;
      if (!animate) track.style.transition = 'none';
      track.style.transform = `translateX(${sign * pos * 100}%)`;
      if (!animate) { track.offsetWidth; track.style.transition = ''; }
      moving = animate;
    }
    function settle() {
      if (pos === 0) { pos = n; place(false); }
      else if (pos === n + 1) { pos = 1; place(false); }
      moving = false;
    }
    track.addEventListener('transitionend', event => {
      if (event.target === track && event.propertyName === 'transform') settle();
    });
    function go(next, { user = false, step = null } = {}) {
      if (moving) settle();                          // finish a jump before the next move
      pos = step !== null ? pos + step : next + 1;
      index = ((pos - 1) % n + n) % n;
      place(!reduce());
      if (reduce()) settle();
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        slide.inert = !active;
        /* Make sure the current and next images are requested */
        if (active || i === (index + 1) % n) slide.querySelectorAll('img[loading="lazy"]').forEach(img => { img.loading = 'eager'; });
      });
      dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
      if (user) restart();
    }
    function stop() { clearInterval(timer); timer = null; }
    function restart() {
      stop();
      if (!delay || paused || !inView || S.reducedMotion.matches || document.hidden) return;
      timer = setInterval(() => go(null, { step: 1 }), delay);
    }

    root.querySelectorAll('.slider-arrow').forEach(btn => btn.addEventListener('click', () => go(null, { user: true, step: btn.dataset.dir === 'next' ? 1 : -1 })));
    dots.forEach((dot, i) => dot.addEventListener('click', () => go(i, { user: true })));
    root.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const rtl = document.documentElement.dir === 'rtl';
      const forward = (event.key === 'ArrowLeft') === rtl;
      go(null, { user: true, step: forward ? 1 : -1 });
    });
    root.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { paused = true; stop(); } });
    root.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') { paused = false; restart(); } });
    root.addEventListener('focusin', () => { paused = true; stop(); });
    root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) { paused = false; restart(); } });
    document.addEventListener('visibilitychange', restart);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; restart(); }, { threshold: 0.3 }).observe(root);
    }

    /* Swipe */
    let startX = null, startY = null, moved = false;
    viewport.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse') return;
      startX = event.clientX; startY = event.clientY; moved = false;
    });
    viewport.addEventListener('pointermove', event => {
      if (startX !== null && Math.abs(event.clientX - startX) > 10) moved = true;
    });
    const end = event => {
      if (startX === null) return;
      const dx = event.clientX - startX, dy = event.clientY - startY;
      startX = null;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      const forward = document.documentElement.dir === 'rtl' ? dx > 0 : dx < 0;
      go(null, { user: true, step: forward ? 1 : -1 });
    };
    viewport.addEventListener('pointerup', end);
    viewport.addEventListener('pointercancel', () => { startX = null; });
    /* Don't follow the slide link after a swipe */
    viewport.addEventListener('click', event => { if (moved) { event.preventDefault(); moved = false; } }, true);

    S.onLanguageChange(() => { settle(); place(false); });   // direction flips: re-place without animating
    pos = 1;
    place(false);
    go(0);
    settle();
    restart();
  }

  Carousel(document.getElementById('promoSlider'));
  S.ready();
  animateCounters();
})();
