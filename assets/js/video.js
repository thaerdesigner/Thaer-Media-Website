/* ==========================================================================
   video.js — short-form video gallery (work.video/)
   Cards show each poster cropped to 4:5 (like an Instagram grid); opening a
   card plays the video at its full 9:16 size with sound, in a viewer that
   works like the image galleries: X to close, side arrows, keyboard, swipe.
   ========================================================================== */
(function () {
  'use strict';
  const S = window.SITE;
  const { esc, url, t } = S;
  const work = S.data.work.video;
  const grid = document.getElementById('galleryGrid');
  if (!work || !grid) { S.ready();
  revealCurrentTab(); return; }
  const items = work.gallery;
  const n = items.length;

  /* ---------- Header (same as the other galleries) ---------- */
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
  if (n) {
    count.setAttribute('data-ar', `${n} ${n === 1 ? 'فيديو' : n === 2 ? 'فيديوهان' : n <= 10 ? 'فيديوهات' : 'فيديو'}`);
    count.setAttribute('data-en', `${n} ${n === 1 ? 'video' : 'videos'}`);
  } else {
    count.hidden = true;
  }
  document.getElementById('galleryTabs').innerHTML = Object.entries(S.data.work).map(([key, g]) => `
    <a href="${esc(url(g.path))}"${g === work ? ' aria-current="page"' : ''} data-ar="${esc(g.title.ar)}" data-en="${esc(g.title.en)}">${esc(g.title.ar)}</a>`).join('');

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
  if (!n) {
    grid.outerHTML = `<div class="video-empty card">
      <span class="video-empty-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10.5 5.2-3a.5.5 0 0 1 .8.4v8.2a.5.5 0 0 1-.8.4l-5.2-3"/></svg></span>
      <h2 data-ar="الأعمال في الطريق" data-en="Work coming soon">الأعمال في الطريق</h2>
      <p data-ar="نجهّز هنا مختارات من أعمالنا في المونتاج والموشن جرافيك. تابعنا قريباً." data-en="We are preparing a selection of our video editing and motion graphics work. Check back soon.">نجهّز هنا مختارات من أعمالنا في المونتاج والموشن جرافيك. تابعنا قريباً.</p>
    </div>`;
    S.ready();
  revealCurrentTab();
    return;
  }
  grid.innerHTML = items.map((item, i) => `
    <li class="gallery-item">
      <button type="button" class="gallery-open video-card" data-index="${i}" data-label-ar="تشغيل: ${esc(item.alt.ar)}" data-label-en="Play: ${esc(item.alt.en)}" aria-label="تشغيل: ${esc(item.alt.ar)}">
        <span class="gallery-frame">
          <img src="${esc(url(item.poster))}" srcset="${esc(url(item.poster).replace(/\.webp$/, '-sm.webp'))} 360w, ${esc(url(item.poster))} 720w" sizes="(max-width:640px) 46vw, 270px" alt="${esc(item.alt.ar)}" data-alt-ar="${esc(item.alt.ar)}" data-alt-en="${esc(item.alt.en)}" ${i < 2 ? 'fetchpriority="high"' : i < 4 ? '' : 'loading="lazy"'} decoding="async">
          <span class="video-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span>
          ${item.duration ? `<span class="video-duration" dir="ltr">${esc(item.duration)}</span>` : ''}
        </span>
      </button>
    </li>`).join('');
  S.ready();
  revealCurrentTab();

  /* ---------- Player ---------- */
  const box = document.getElementById('player');
  const video = document.getElementById('playerVideo');
  const frame = document.getElementById('playerFrame');
  const counter = document.getElementById('playerCounter');
  const muteBtn = document.getElementById('playerMute');
  const progress = document.getElementById('playerProgress');
  const state = document.getElementById('playerState');
  let index = 0;
  let trigger = null;
  let muted = false;
  if (n < 2) box.classList.add('is-single');

  function setMuted(value) {
    muted = value;
    video.muted = value;
    box.classList.toggle('is-muted', value);
    muteBtn.setAttribute('data-label-ar', value ? 'تشغيل الصوت' : 'كتم الصوت');
    muteBtn.setAttribute('data-label-en', value ? 'Unmute' : 'Mute');
    muteBtn.setAttribute('aria-label', t({ ar: muteBtn.getAttribute('data-label-ar'), en: muteBtn.getAttribute('data-label-en') }));
  }
  function play() {
    const attempt = video.play();
    if (attempt) attempt.catch(() => {
      /* Some browsers block autoplay with sound: retry muted */
      if (!video.muted) { setMuted(true); video.play().catch(() => {}); }
    });
  }
  function show(i) {
    index = (i + n) % n;
    const item = items[index];
    video.pause();
    box.classList.add('is-loading');
    video.poster = url(item.poster);
    video.src = url(item.video);
    video.setAttribute('aria-label', t(item.alt));
    counter.textContent = `${index + 1} / ${n}`;
    progress.value = 0;
    video.muted = muted;
    play();
    /* Warm up the next poster */
    const next = new Image();
    next.src = url(items[(index + 1) % n].poster);
  }
  video.addEventListener('loadeddata', () => box.classList.remove('is-loading'));
  video.addEventListener('play', () => box.classList.remove('is-paused'));
  video.addEventListener('pause', () => box.classList.add('is-paused'));
  /* when a video ends: play the next one; after the last video, stop */
  video.addEventListener('ended', () => { if (index < n - 1) show(index + 1); });
  video.addEventListener('timeupdate', () => {
    if (video.duration) progress.value = Math.round(video.currentTime / video.duration * 1000);
    progress.style.setProperty('--p', (progress.value / 10) + '%');
  });
  progress.addEventListener('input', () => {
    if (video.duration) video.currentTime = progress.value / 1000 * video.duration;
    progress.style.setProperty('--p', (progress.value / 10) + '%');
  });
  muteBtn.addEventListener('click', () => setMuted(!muted));
  frame.addEventListener('click', event => {
    if (event.target.closest('.reel-controls')) return;
    if (video.paused) play(); else video.pause();
  });

  function open(i, from) {
    trigger = from;
    box.showModal();
    document.documentElement.classList.add('has-modal');
    requestAnimationFrame(() => box.classList.add('is-open'));
    show(i);
  }
  function close() { if (box.open) box.close(); }
  box.addEventListener('close', () => {
    video.pause();
    video.removeAttribute('src');
    video.load();
    box.classList.remove('is-open');
    document.documentElement.classList.remove('has-modal');
    trigger?.focus();
  });

  grid.addEventListener('click', event => {
    const card = event.target.closest('.video-card');
    if (card) open(Number(card.dataset.index), card);
  });
  document.getElementById('playerClose').addEventListener('click', close);
  box.querySelectorAll('.lightbox-nav').forEach(btn => btn.addEventListener('click', () => show(index + (btn.dataset.dir === 'next' ? 1 : -1))));
  box.addEventListener('click', event => {
    if (event.target === box || event.target.classList.contains('reel-stage')) close();
  });
  box.addEventListener('keydown', event => {
    if (event.target === progress) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const rtl = document.documentElement.dir === 'rtl';
      show(index + (((event.key === 'ArrowLeft') === rtl) ? 1 : -1));
    } else if (event.key === ' ') {
      event.preventDefault();
      if (video.paused) play(); else video.pause();
    } else if (event.key.toLowerCase() === 'm') {
      setMuted(!muted);
    }
  });

  /* Swipe left / right on touch screens */
  let start = null;
  frame.addEventListener('touchstart', e => {
    /* dragging the progress bar or touching the controls is not a swipe */
    if (e.touches.length !== 1 || e.target.closest('.reel-controls, .reel-progress, button, input')) { start = null; return; }
    start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  frame.addEventListener('touchend', e => {
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x, dy = e.changedTouches[0].clientY - start.y;
    start = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    const forward = document.documentElement.dir === 'rtl' ? dx > 0 : dx < 0;
    show(index + (forward ? 1 : -1));
  });
  S.onLanguageChange(() => setMuted(muted));
})();
