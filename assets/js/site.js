/* ==========================================================================
   site.js — shared behaviour for every page
   Language & theme switching, header/menu, footer, floating WhatsApp button,
   reveal-on-scroll and small helpers used by the page scripts.
   Load order on every page: data.js → site.js → page script.
   ========================================================================== */
(function () {
  'use strict';

  const D = window.SITE_DATA;
  const doc = document.documentElement;
  const scriptUrl = document.currentScript && document.currentScript.src;
  /* Site root, derived from this file's location (assets/js/site.js), so links
     and images work on any host, in a sub-folder and with Live Server. */
  const ROOT = scriptUrl ? new URL('../../', scriptUrl).href : new URL('/', location.href).href;
  const page = document.body.dataset.page || '';
  const isHome = page === 'home';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Helpers ---------- */
  const lang = () => (doc.lang === 'en' ? 'en' : 'ar');
  const t = value => {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[lang()] ?? value.ar ?? '';
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  /* Resolves a site path from data.js ("contact/", "#work", "assets/…") */
  const url = path => {
    const value = String(path ?? '');
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return value;
    if (value.startsWith('#')) return isHome ? value : ROOT + value;
    return new URL(value.replace(/^\/+/, ''), ROOT).href;
  };
  const whatsappUrl = message => `https://wa.me/${D.contact.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
  /* Converts Arabic-Indic digits to Latin digits */
  const latinDigits = value => String(value ?? '').replace(/[٠-٩۰-۹]/g, d => String('٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹'.indexOf(d) % 10));

  const ICONS = {
    arrow: '<svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>'
  };

  const SOCIAL = {
    whatsapp: ['WhatsApp', '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.59-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z"/>'],
    email: ['Email', '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/>', true],
    instagram: ['Instagram', '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"/>'],
    facebook: ['Facebook', '<path d="M9.1 23.69v-7.98H6.63v-3.67H9.1v-1.58c0-4.09 1.85-5.98 5.86-5.98.4 0 .96.04 1.47.1.39.05.77.11 1.14.2v3.32a8.6 8.6 0 0 0-1.39-.04c-.71 0-1.26.1-1.68.31-.29.14-.53.36-.68.62-.26.42-.37 1-.37 1.75v1.3h3.92l-.67 3.67H13.4v8.25C19.4 23.24 24 18.18 24 12.04c0-6.63-5.37-12-12-12S0 5.42 0 12.04c0 5.63 3.87 10.35 9.1 11.65Z"/>'],
    linkedin: ['LinkedIn', '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z"/>'],
    behance: ['Behance', '<path d="M16.97 16.93c.5.47 1.18.71 1.9.68.55.02 1.09-.15 1.53-.48.36-.23.64-.58.78-.99h2.59a5.09 5.09 0 0 1-1.9 2.9 5.3 5.3 0 0 1-3.09.88 5.84 5.84 0 0 1-2.29-.43 4.87 4.87 0 0 1-1.72-1.21 5.66 5.66 0 0 1-1.08-1.87 7.06 7.06 0 0 1-.38-2.4c0-.8.13-1.59.4-2.35a5.31 5.31 0 0 1 5.09-3.6c.83-.01 1.65.18 2.37.56.66.36 1.23.87 1.67 1.49.44.64.76 1.37.94 2.13.2.82.26 1.67.21 2.51h-7.7c-.06.79.18 1.57.69 2.19ZM6.95 4.08c.65-.01 1.3.06 1.93.2.53.12 1.04.33 1.49.64.42.3.75.71.96 1.18.24.58.36 1.2.34 1.83a3.5 3.5 0 0 1-.51 1.96c-.36.56-.88 1-1.5 1.29.87.24 1.58.76 2.03 1.44.46.75.7 1.62.67 2.5a4.6 4.6 0 0 1-.42 2.03c-.28.56-.67 1.04-1.17 1.41-.51.37-1.08.64-1.68.81-.63.17-1.27.26-1.93.26H0V4.08h6.95Zm-.24 12.9c.31 0 .62-.03.92-.1.27-.06.53-.17.76-.33.23-.16.41-.37.54-.62.14-.32.2-.66.19-1.01a2.08 2.08 0 0 0-.64-1.72 2.62 2.62 0 0 0-1.7-.5H3.24v4.28h3.47Zm13.64-5.96a2.13 2.13 0 0 0-1.66-.62c-.4-.01-.8.08-1.16.26-.29.15-.54.36-.74.62-.18.24-.31.51-.4.79-.07.24-.12.49-.13.74h4.77a3.24 3.24 0 0 0-.68-1.79Zm-13.82-.65c.52.02 1.02-.13 1.43-.43.4-.36.6-.88.56-1.42a1.92 1.92 0 0 0-.18-.89 1.3 1.3 0 0 0-.5-.53 1.85 1.85 0 0 0-.7-.28 3.97 3.97 0 0 0-.84-.07H3.24v3.63h3.29v-.01Zm15.09-5.25h-5.98v1.53h5.98V5.12Z"/>'],
    x: ['X', '<path d="M14.23 10.16 22.98 0h-2.07l-7.6 8.82L7.25 0H.26l9.17 13.34L.26 24h2.07l8.02-9.32L16.75 24h6.99l-9.51-13.84Zm-2.83 3.3-.93-1.33L3.08 1.56h3.18l5.97 8.53.93 1.33 7.75 11.09h-3.18l-6.33-9.05Z"/>'],
    threads: ['Threads', '<path d="M18.26 11.1c-.03-3.49-1.92-5.59-5.11-5.59-2.13 0-3.92.96-4.86 2.5l2.06 1.44c.53-.85 1.27-1.55 2.63-1.55 1.53 0 2.32.85 2.54 2.43a15 15 0 0 0-2.23-.17c-4.13 0-6.07 1.87-6.07 4.34s1.94 3.99 4.8 3.99c3.14 0 5.01-2.12 5.78-4.74.8.36 1.35 1.2 1.35 2.47 0 3.39-3.91 5.23-7.22 5.23-4.89 0-8.08-3.2-8.08-8.42 0-6.4 4.22-10.49 9.9-10.49 3.81 0 5.69 1.67 6.97 3.91l2.11-1.47C21.44 2.08 18.33 0 13.66 0 6.23 0 1.17 5.28 1.17 12.93c0 7 4.95 11.07 10.86 11.07 4.87 0 9.8-2.85 9.8-7.72 0-2.54-1.46-4.23-3.57-5.18Zm-6.33 4.85c-1.08 0-2.03-.51-2.03-1.45 0-1.48 1.82-1.93 3.61-1.93.68 0 1.34.04 1.93.17-.42 1.93-1.67 3.22-3.51 3.21Z"/>'],
    tiktok: ['TikTok', '<path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03a10.7 10.7 0 0 1-5.82-1.9c-.01 2.92.01 5.84-.02 8.75a7.64 7.64 0 0 1-1.35 3.94 7.45 7.45 0 0 1-5.91 3.21 7.29 7.29 0 0 1-4.08-1.03 7.55 7.55 0 0 1-3.65-5.71 15 15 0 0 1-.01-1.49 7.53 7.53 0 0 1 8.73-6.68c.02 1.48-.04 2.96-.04 4.44a3.43 3.43 0 0 0-4.38 2.12c-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87a3.37 3.37 0 0 0 2.77-1.61c.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"/>'],
    snapchat: ['Snapchat', '<path d="M12.21.79c.99 0 4.35.28 5.93 3.82.53 1.2.4 3.22.3 4.85l-.03.57c.08.04.2.09.4.09.3-.02.66-.12 1.03-.3a1.1 1.1 0 0 1 .97-.01c.45.15.74.48.74.84.01.45-.39.84-1.21 1.17l-.35.12c-.45.13-1.14.36-1.33.81-.09.22-.06.52.12.87l.01.01c.06.14 1.53 3.48 4.8 4.02.25.04.43.27.42.51a.6.6 0 0 1-.05.22c-.24.57-1.27.99-3.15 1.27-.06.09-.12.38-.16.57-.03.18-.08.36-.14.55-.07.27-.27.41-.55.41h-.03c-.14 0-.31-.03-.54-.08a5.67 5.67 0 0 0-2.19-.06c-.6.1-1.12.46-1.72.88-.85.6-1.83 1.29-3.3 1.29h-.33c-1.46 0-2.42-.68-3.27-1.29-.6-.42-1.11-.78-1.71-.88a5.7 5.7 0 0 0-2.2.07c-.21.05-.39.08-.54.08-.37 0-.52-.23-.58-.42-.06-.19-.09-.39-.14-.57-.04-.18-.1-.49-.16-.57-1.92-.22-2.95-.64-3.19-1.23a.6.6 0 0 1-.06-.22.5.5 0 0 1 .42-.51c3.27-.54 4.73-3.88 4.8-4.02l.01-.03c.18-.35.22-.65.12-.87-.2-.43-.89-.66-1.33-.81l-.35-.12C2.2 10.7 2.05 10.2 2.11 9.86c.09-.48.67-.79 1.17-.79.15 0 .27.03.38.07.42.2.79.3 1.1.3.24 0 .39-.06.47-.1l-.05-.57c-.1-1.63-.22-3.65.31-4.84C7.39 1.08 10.74.81 11.73.81l.42-.02h.06Z"/>']
  };

  /* ---------- Language ---------- */
  const langListeners = [];
  function applyLanguage(next) {
    const value = next === 'en' ? 'en' : 'ar';
    doc.lang = value;
    doc.dir = value === 'ar' ? 'rtl' : 'ltr';
    const key = value === 'ar' ? 'ar' : 'en';
    document.querySelectorAll('[data-ar]').forEach(el => {
      const text = el.getAttribute('data-' + key);
      if (text == null) return;
      if (el.hasAttribute('data-html')) el.innerHTML = text; else el.textContent = text;
    });
    document.querySelectorAll('[data-alt-ar]').forEach(el => { el.alt = el.getAttribute('data-alt-' + key) || ''; });
    document.querySelectorAll('[data-placeholder-ar]').forEach(el => { el.placeholder = el.getAttribute('data-placeholder-' + key) || ''; });
    document.querySelectorAll('[data-label-ar]').forEach(el => { el.setAttribute('aria-label', el.getAttribute('data-label-' + key) || ''); });
    document.querySelectorAll('[data-src-ar]').forEach(el => { el.src = url(el.getAttribute('data-src-' + key)); });
    const title = document.body.getAttribute('data-title-' + key);
    if (title) document.title = title;
    try { localStorage.setItem('lang', value); } catch (e) { /* storage unavailable */ }
    langListeners.forEach(fn => fn(value));
  }

  /* ---------- Theme ---------- */
  function applyTheme(theme) {
    if (theme === 'light') doc.setAttribute('data-theme', 'light');
    else doc.removeAttribute('data-theme');
    document.querySelectorAll('img[data-logo]').forEach(img => {
      img.src = url(theme === 'light' ? 'assets/images/logo-light.png' : 'assets/images/logo.png');
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#f4f9f5' : '#063632';
    try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
  }
  const currentTheme = () => (doc.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  /* ---------- Header navigation ---------- */
  function renderNav() {
    const nav = document.getElementById('navLinks');
    if (!nav) return;
    nav.innerHTML = D.nav.map(item => {
      const current = (page === 'contact' && item.href === 'contact/') ? ' aria-current="page"' : '';
      return `<a href="${esc(url(item.href))}" data-ar="${esc(item.ar)}" data-en="${esc(item.en)}"${current}>${esc(item.ar)}</a>`;
    }).join('');
  }

  function setupMenu() {
    const button = document.getElementById('menuToggle');
    const nav = document.getElementById('navLinks');
    if (!button || !nav) return;
    const setOpen = open => {
      button.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { setOpen(false); button.focus(); }
    });
    document.addEventListener('pointerdown', event => {
      if (button.getAttribute('aria-expanded') === 'true' && !event.target.closest('.nav')) setOpen(false);
    });
    window.matchMedia('(min-width:1081px)').addEventListener('change', event => { if (event.matches) setOpen(false); });
  }

  function setupHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 16);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* Highlights the nav link of the section currently in view (homepage only). */
  function setupScrollSpy() {
    if (!isHome || !('IntersectionObserver' in window)) return;
    const links = [...document.querySelectorAll('#navLinks a')];
    const byId = id => links.find(a => a.getAttribute('href') === '#' + id);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(a => a.classList.remove('is-active'));
        byId(entry.target.id)?.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    const footer = document.getElementById('siteFooter');
    if (!footer) return;
    /* Inner pages (galleries, contact, course) get a minimal footer with a
       single "Home" button; the full footer is only on the homepage and 404. */
    if (['gallery', 'contact', 'course'].includes(page)) {
      footer.classList.add('site-footer--simple');
      footer.innerHTML = `
      <div class="container">
        <a class="btn btn--primary" href="${esc(url(''))}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/></svg>
          <span data-ar="الرئيسية" data-en="Home">الرئيسية</span>
        </a>
        <p class="footer-copy">© ${new Date().getFullYear()} Thaer Media. <span data-ar="جميع الحقوق محفوظة." data-en="All rights reserved.">جميع الحقوق محفوظة.</span></p>
      </div>`;
      return;
    }
    const year = new Date().getFullYear();
    const links = D.nav.map(item => `<a href="${esc(url(item.href))}" data-ar="${esc(item.ar)}" data-en="${esc(item.en)}">${esc(item.ar)}</a>`).join('');
    const services = D.home.services.map(s => `<a href="${esc(url(s.href))}" data-ar="${esc(s.title.ar)}" data-en="${esc(s.title.en)}">${esc(s.title.ar)}</a>`).join('');
    const socials = D.socials.map(s => {
      const icon = SOCIAL[s.key];
      if (!icon) return '';
      const external = /^https?:/.test(s.url) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<li><a href="${esc(s.url)}"${external} aria-label="${icon[0]}" title="${icon[0]}"><svg viewBox="0 0 24 24"${icon[2] ? ' class="stroke"' : ''} aria-hidden="true">${icon[1]}</svg></a></li>`;
    }).join('');
    const phone = '+' + D.contact.whatsappNumber.replace(/^(\d{3})(\d{2})(\d{3})(\d{4})$/, '$1 $2 $3 $4');
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="${esc(url(isHome ? '#home' : ''))}" aria-label="Thaer Media"><img data-logo src="${esc(url('assets/images/logo.png'))}" alt="Thaer Media" width="113" height="44" loading="lazy" decoding="async"></a>
            <p data-ar="نوظّف خبرتنا لنجاح علامتك التجارية، من الهوية البصرية إلى الحملات الإعلانية." data-en="We put our expertise to work for your brand, from visual identity to ad campaigns.">نوظّف خبرتنا لنجاح علامتك التجارية، من الهوية البصرية إلى الحملات الإعلانية.</p>
            <ul class="socials" aria-label="حساباتنا" data-label-ar="حساباتنا على منصات التواصل" data-label-en="Our social accounts">${socials}</ul>
          </div>
          <nav aria-label="روابط سريعة" data-label-ar="روابط سريعة" data-label-en="Quick links">
            <h2 class="footer-title" data-ar="روابط سريعة" data-en="Quick links">روابط سريعة</h2>
            <div class="footer-links">${links}</div>
          </nav>
          <nav aria-label="خدماتنا" data-label-ar="خدماتنا" data-label-en="Our services">
            <h2 class="footer-title" data-ar="خدماتنا" data-en="Our services">خدماتنا</h2>
            <div class="footer-links">${services}</div>
          </nav>
          <div class="footer-contact-col">
            <h2 class="footer-title" data-ar="تواصل معنا" data-en="Get in touch">تواصل معنا</h2>
            <div class="footer-links footer-contact">
              <a href="${esc(whatsappUrl())}" target="_blank" rel="noopener noreferrer">${ICONS.phone}<span class="ltr">${esc(phone)}</span></a>
              <a href="mailto:${esc(D.contact.email)}">${ICONS.mail}<span class="ltr">${esc(D.contact.email)}</span></a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${year} Thaer Media. <span data-ar="جميع الحقوق محفوظة." data-en="All rights reserved.">جميع الحقوق محفوظة.</span></p>
        </div>
      </div>`;
  }

  /* ---------- Floating WhatsApp ---------- */
  function setupFloatingWhatsApp() {
    if (document.body.hasAttribute('data-no-float')) return;
    const link = document.createElement('a');
    link.className = 'floating-whatsapp';
    link.href = whatsappUrl();
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('data-label-ar', 'تواصل معنا عبر واتساب');
    link.setAttribute('data-label-en', 'Chat with us on WhatsApp');
    link.setAttribute('aria-label', 'تواصل معنا عبر واتساب');
    link.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${SOCIAL.whatsapp[1]}</svg>`;
    const aside = document.createElement('aside');
    aside.setAttribute('aria-label', 'WhatsApp');
    aside.append(link);
    document.body.append(aside);
    /* Hide it while a form is on screen so it never covers a field or the
       submit button, and while the footer (which has its own links) is visible. */
    const watched = [...document.querySelectorAll('form, .site-footer')];
    if (!watched.length || !('IntersectionObserver' in window)) return;
    const visible = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)));
      link.classList.toggle('is-hidden', visible.size > 0);
    }, { rootMargin: '0px 0px -40px 0px' });
    watched.forEach(el => observer.observe(el));
  }

  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    const items = document.querySelectorAll('.reveal, .reveal-stagger, .gallery-item');
    if (!('IntersectionObserver' in window) || reducedMotion.matches) {
      items.forEach(el => el.classList.add('is-visible', 'is-revealed'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        observer.unobserve(el);
        /* After the entrance, let cards use their own (faster) hover transitions */
        if (el.classList.contains('reveal-stagger')) setTimeout(() => el.classList.add('is-revealed'), 1300);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => observer.observe(el));
  }
  /* ---------- Protect portfolio artwork from casual saving ---------- */
  function setupArtworkGuard() {
    const guard = event => {
      if (event.target instanceof Element && event.target.closest('.gallery-item img, .lightbox img')) event.preventDefault();
    };
    document.addEventListener('contextmenu', guard);
    document.addEventListener('dragstart', guard);
  }

  /* ---------- WhatsApp forms ----------
     Validates fields with inline, bilingual messages, then opens a prepared
     WhatsApp message. `rules` maps a field name to a function returning an
     error {ar,en} or null. `message` builds the text from the cleaned values. */
  const MSG = {
    required: { ar: 'هذا الحقل مطلوب.', en: 'This field is required.' },
    fullName: { ar: 'يرجى كتابة الاسم الكامل (الاسم الأول واسم العائلة).', en: 'Please enter your full name (first and last name).' },
    name: { ar: 'يرجى كتابة اسمك.', en: 'Please enter your name.' },
    phone: { ar: 'أدخل رقماً صحيحاً، ويُفضّل مع رمز الدولة.', en: 'Enter a valid number, ideally with the country code.' },
    email: { ar: 'أدخل بريداً إلكترونياً صحيحاً.', en: 'Enter a valid email address.' },
    details: { ar: 'اكتب بإيجاز الخدمة التي تحتاجها.', en: 'Briefly describe the service you need.' }
  };
  const validators = {
    name: v => (v.length < 2 ? MSG.name : null),
    fullName: v => (v.split(' ').filter(Boolean).length < 2 ? MSG.fullName : null),
    phone: v => {
      const digits = v.replace(/\D/g, '');
      return (!/^\+?[\d\s().-]+$/.test(v) || digits.length < 8 || digits.length > 15) ? MSG.phone : null;
    },
    email: v => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? MSG.email : null),
    details: v => (v.length < 5 ? MSG.details : null)
  };

  function whatsappForm(form, { rules, message, status }) {
    if (!form) return;
    form.noValidate = true;
    const clean = (name, raw) => {
      let value = String(raw ?? '').trim().replace(/[ \t]+/g, ' ');
      if (rules[name] === 'phone') value = latinDigits(value);
      return value;
    };
    const showError = (field, error) => {
      const wrap = field.closest('.field');
      let note = wrap.querySelector('.field-error');
      if (!error) {
        wrap.classList.remove('is-invalid');
        field.removeAttribute('aria-invalid');
        note?.remove();
        return;
      }
      if (!note) {
        note = document.createElement('span');
        note.className = 'field-error';
        note.id = field.name + 'Error';
        wrap.append(note);
      }
      note.setAttribute('data-ar', error.ar);
      note.setAttribute('data-en', error.en);
      note.textContent = t(error);
      wrap.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', note.id);
    };
    const check = field => {
      const value = clean(field.name, field.value);
      const error = !value ? MSG.required : validators[rules[field.name]](value);
      showError(field, error);
      return !error;
    };
    Object.keys(rules).forEach(name => {
      const field = form.elements.namedItem(name);
      field.addEventListener('blur', () => { if (field.value.trim()) check(field); });
      field.addEventListener('input', () => { if (field.closest('.field').classList.contains('is-invalid')) check(field); });
    });
    const setStatus = (state, text, link) => {
      status.hidden = false;
      status.dataset.state = state;
      status.textContent = t(text);
      if (link) {
        status.append(' ');
        const a = document.createElement('a');
        a.href = link;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = t({ ar: 'افتح واتساب', en: 'Open WhatsApp' });
        status.append(a);
      }
    };
    form.addEventListener('submit', event => {
      event.preventDefault();
      const fields = Object.keys(rules).map(name => form.elements.namedItem(name));
      const invalid = fields.filter(field => !check(field));
      if (invalid.length) { invalid[0].focus(); return; }
      const values = Object.fromEntries(fields.map(field => [field.name, clean(field.name, field.value)]));
      const link = whatsappUrl(message(values, lang()));
      window.open(link, '_blank', 'noopener');
      /* With "noopener" browsers return null even on success, so always show
         a confirmation that doubles as a fallback link (e.g. popup blocked). */
      setStatus('success', {
        ar: 'جهّزنا رسالتك في واتساب، اضغط «إرسال» هناك لإتمامها. إن لم يُفتح واتساب تلقائياً:',
        en: 'Your message is ready in WhatsApp. Press Send there to finish. If WhatsApp didn’t open:'
      }, link);
    });
  }

  /* ---------- Public API for page scripts ---------- */
  window.SITE = {
    data: D, root: ROOT, page, isHome, reducedMotion,
    lang, t, esc, url, whatsappUrl, latinDigits, icons: ICONS,
    onLanguageChange: fn => langListeners.push(fn),
    applyLanguage, whatsappForm
  };

  /* ---------- Boot ---------- */
  renderNav();
  renderFooter();
  setupFloatingWhatsApp();
  applyTheme(currentTheme());
  document.getElementById('themeToggle')?.addEventListener('click', () => applyTheme(currentTheme() === 'light' ? 'dark' : 'light'));
  document.getElementById('langToggle')?.addEventListener('click', () => applyLanguage(lang() === 'ar' ? 'en' : 'ar'));
  setupMenu();
  setupHeaderScroll();
  setupArtworkGuard();
  /* Page scripts run after this file and call SITE.ready() once they have
     rendered their content, so translation and reveal cover everything. */
  let booted = false;
  window.SITE.ready = () => {
    if (booted) return;
    booted = true;
    applyLanguage(lang());
    setupReveal();
    setupScrollSpy();
  };
  /* Pages without a page script */
  document.addEventListener('DOMContentLoaded', () => window.SITE.ready());
})();
