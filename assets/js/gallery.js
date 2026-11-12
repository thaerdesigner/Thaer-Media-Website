/* ==========================================================================
   gallery.js — portfolio gallery pages
   Renders the grid from data.js (body[data-gallery]) and runs the lightbox:
   keyboard arrows, swipe, pinch / double-tap zoom on touch screens.
   ========================================================================== */
(function () {
  'use strict';
  const S = window.SITE;
  const { esc, url, t } = S;
  const slug = document.body.dataset.gallery;
  const work = S.data.work[slug];
  const grid = document.getElementById('galleryGrid');
  if (!work || !grid) { S.ready();
  revealCurrentTab(); return; }

  /* ---------- Header ---------- */
  const intro = document.getElementById('galleryIntro');
  intro.setAttribute('data-ar', work.intro.ar);
  intro.setAttribute('data-en', work.intro.en);
  intro.textContent = work.intro.ar;
  ['galleryTitle', 'galleryCrumb'].forEach(id => {
    const el = document.getElementById(id);
    el.setAttribute('data-ar', work.title.ar);
    el.setAttribute('data-en', work.title.en);
  });
  const count = document.getElementById('galleryCount');
  const n = work.gallery.length;
  count.setAttribute('data-ar', `${n} ${n > 10 ? 'عملاً' : 'أعمال'}`);
  count.setAttribute('data-en', `${n} projects`);

  /* Tabs to the other galleries */
  const tabs = document.getElementById('galleryTabs');
  tabs.innerHTML = Object.entries(S.data.work).map(([key, g]) => `
    <a href="${esc(url(g.path))}"${key === slug ? ' aria-current="page"' : ''} data-ar="${esc(g.title.ar)}" data-en="${esc(g.title.en)}">${esc(g.title.ar)}</a>`).join('');

  /* Keep the current gallery's tab in view on narrow screens */
  function revealCurrentTab() {
    const tab = document.querySelector('#galleryTabs [aria-current="page"]');
    if (!tab) return;
    const row = tab.parentElement;
    const r = tab.getBoundingClientRect(), box = row.getBoundingClientRect();
    if (r.left < box.left || r.right > box.right) row.scrollLeft += (r.left + r.width / 2) - (box.left + box.width / 2);
  }
  S.onLanguageChange(() => requestAnimationFrame(revealCurrentTab));

  /* ---------- Grid ---------- */
  grid.innerHTML = work.gallery.map((item, i) => {
    const thumb = item.cover || item.thumb || item.image;
    return `
    <li class="gallery-item">
      <button type="button" class="gallery-open" data-index="${i}" data-label-ar="عرض: ${esc(item.alt.ar)}" data-label-en="View: ${esc(item.alt.en)}" aria-label="عرض: ${esc(item.alt.ar)}">
        <span class="gallery-frame">
          <img src="${esc(url(thumb))}"${slug !== 'social' ? ` srcset="${esc(url(thumb).replace(/\.webp$/, '-sm.webp'))} 560w, ${esc(url(thumb))} 1100w" sizes="(max-width:640px) 92vw, 46vw"` : ''} data-full="${esc(url(item.image))}" alt="${esc(item.alt.ar)}" data-alt-ar="${esc(item.alt.ar)}" data-alt-en="${esc(item.alt.en)}" ${i < 2 ? 'fetchpriority="high"' : i < 4 ? '' : 'loading="lazy"'} decoding="async">
        </span>
        <span class="gallery-zoom" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4M11 8v6M8 11h6"/></svg></span>
      </button>
    </li>`;
  }).join('');
  grid.querySelectorAll('img').forEach(img => {
    /* If an optional thumbnail is missing, fall back to the full image */
    img.addEventListener('error', () => { if (img.src !== img.dataset.full) img.src = img.dataset.full; }, { once: true });
    /* Social designs mix 4:5 and 1:1 artwork: show each one uncropped */
    if (slug === 'social') {
      const fit = () => { if (img.naturalWidth) img.parentElement.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`; };
      if (img.complete) fit(); else img.addEventListener('load', fit, { once: true });
    }
  });

  S.ready();
  revealCurrentTab();

  /* ---------- Lightbox ---------- */
  const box = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  const items = work.gallery;
  let index = 0;
  let trigger = null;

  function show(i) {
    index = (i + items.length) % items.length;
    resetZoom();
    box.classList.add('is-loading');
    img.src = url(items[index].image);
    img.alt = t(items[index].alt);
    counter.textContent = `${index + 1} / ${items.length}`;
    [index - 1, index + 1].forEach(j => { const pre = new Image(); pre.src = url(items[(j + items.length) % items.length].image); });
  }
  img.addEventListener('load', () => box.classList.remove('is-loading'));

  function open(i, from) {
    trigger = from;
    show(i);
    box.showModal();
    document.documentElement.classList.add('has-modal');
    requestAnimationFrame(() => box.classList.add('is-open'));
  }
  function close() { if (box.open) box.close(); }
  box.addEventListener('close', () => {
    box.classList.remove('is-open');
    document.documentElement.classList.remove('has-modal');
    resetZoom();
    trigger?.focus();
  });

  grid.addEventListener('click', event => {
    const button = event.target.closest('.gallery-open');
    if (button) open(Number(button.dataset.index), button);
  });
  document.getElementById('lightboxClose').addEventListener('click', close);
  box.querySelectorAll('.lightbox-nav').forEach(btn => btn.addEventListener('click', () => show(index + (btn.dataset.dir === 'next' ? 1 : -1))));
  box.addEventListener('click', event => { if (event.target === box || event.target.classList.contains('lightbox-stage')) close(); });
  box.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const rtl = document.documentElement.dir === 'rtl';
    show(index + (((event.key === 'ArrowLeft') === rtl) ? 1 : -1));
  });
  if (items.length < 2) box.classList.add('is-single');

  /* ---------- Touch: swipe, pinch and double-tap zoom ---------- */
  let scale = 1, panX = 0, panY = 0;
  let gesture = null;
  let lastTap = 0;
  function apply(animate) {
    const maxX = img.offsetWidth * (scale - 1) / 2;
    const maxY = img.offsetHeight * (scale - 1) / 2;
    panX = Math.max(-maxX, Math.min(maxX, panX));
    panY = Math.max(-maxY, Math.min(maxY, panY));
    img.style.transition = animate ? 'transform .2s ease' : 'none';
    img.style.transform = scale > 1 ? `translate(${panX}px, ${panY}px) scale(${scale})` : '';
    box.classList.toggle('is-zoomed', scale > 1);
  }
  function resetZoom() { scale = 1; panX = 0; panY = 0; gesture = null; img.style.transform = ''; box.classList.remove('is-zoomed'); }
  const dist = (a, b) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

  img.addEventListener('touchstart', event => {
    const [a, b] = event.touches;
    if (b) {
      gesture = { type: 'pinch', d: dist(a, b), scale };
    } else if (scale > 1) {
      gesture = { type: 'pan', x: a.clientX, y: a.clientY, panX, panY };
    } else {
      gesture = { type: 'swipe', x: a.clientX, y: a.clientY };
    }
  }, { passive: true });
  img.addEventListener('touchmove', event => {
    if (!gesture) return;
    const [a, b] = event.touches;
    if (gesture.type === 'pinch' && b) {
      event.preventDefault();
      scale = Math.max(1, Math.min(4, gesture.scale * dist(a, b) / gesture.d));
      apply(false);
    } else if (gesture.type === 'pan' && a) {
      event.preventDefault();
      panX = gesture.panX + a.clientX - gesture.x;
      panY = gesture.panY + a.clientY - gesture.y;
      apply(false);
    }
  }, { passive: false });
  img.addEventListener('touchend', event => {
    if (!gesture) return;
    const touch = event.changedTouches[0];
    if (gesture.type === 'swipe' && touch) {
      const dx = touch.clientX - gesture.x, dy = touch.clientY - gesture.y;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        const forward = document.documentElement.dir === 'rtl' ? dx > 0 : dx < 0;
        show(index + (forward ? 1 : -1));
      } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        const now = Date.now();
        if (now - lastTap < 300) { scale = 2.2; panX = 0; panY = 0; apply(true); lastTap = 0; }
        else lastTap = now;
      }
    } else if (gesture.type === 'pan' && touch && Math.abs(touch.clientX - gesture.x) < 10 && Math.abs(touch.clientY - gesture.y) < 10) {
      const now = Date.now();
      if (now - lastTap < 300) { scale = 1; panX = 0; panY = 0; apply(true); lastTap = 0; }
      else lastTap = now;
    }
    if (!event.touches.length) gesture = null;
  });
  /* Desktop: double-click toggles zoom */
  img.addEventListener('dblclick', () => { scale = scale > 1 ? 1 : 2; panX = 0; panY = 0; apply(true); });
})();
