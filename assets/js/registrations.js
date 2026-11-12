/* ==========================================================================
   registrations.js — "new registration" notifications on every page
   Shows name, registration time and workshop name from the Google Sheet,
   one at a time, in a card at the bottom of the page.
   - Main site: settings come from SITE_DATA.registrations (data.js).
   - Sponsor page: settings come from window.REG_CONFIG (set in its HTML).
   The last list is kept in the browser so later pages show it at once,
   and the rotation restarts as soon as the tab becomes visible again.
   ========================================================================== */
(function () {
  'use strict';
  const S = window.SITE;
  const cfg = (S && S.data.registrations) || window.REG_CONFIG;
  if (!cfg || !cfg.endpoint) return;

  const FIRST = 600;     // ms before the first card
  const SHOW = 6000;     // how long each card stays
  const GAP = 400;       // just the fade between cards
  const KEY = 'regFeed2';
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'ar');
  const safe = fn => { try { return fn(); } catch (e) { return null; } };
  const local = safe(() => window.localStorage);
  const session = safe(() => window.sessionStorage);

  /* ---------- Time ---------- */
  /* Sheet times are Palestine time; convert to a real moment for every visitor */
  function gazaDate(y, mo, d, h, mi, se) {
    const guess = Date.UTC(y, mo - 1, d, h, mi, se);
    let offset = 2 * 3600000;
    safe(() => {
      const f = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Gaza', hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
      const o = {}; f.formatToParts(new Date(guess)).forEach(x => { o[x.type] = +x.value; });
      offset = Date.UTC(o.year, o.month - 1, o.day, o.hour, o.minute, o.second) - guess;
    });
    return new Date(guess - offset);
  }
  function parseTime(v) {
    if (!v) return null;
    const t = String(v).trim()
      .replace(/[\u0660-\u0669]/g, c => c.charCodeAt(0) - 0x0660)
      .replace(/[\u06F0-\u06F9]/g, c => c.charCodeAt(0) - 0x06F0);
    if (/^\d{4}-\d{2}-\d{2}T/.test(t)) { const d = new Date(t); return isNaN(d) ? null : d; }   // ISO from the script
    const date = t.match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/) || t.match(/(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
    if (!date) return null;
    const ymd = date[1].length === 4 ? [date[1], date[2], date[3]] : [date[3], date[2], date[1]];
    const rest = t.replace(date[0], ' ');
    const tm = rest.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    let h = tm ? +tm[1] : 0;
    const pm = /م|pm/i.test(rest), am = /ص|am/i.test(rest);
    if (pm && h < 12) h += 12;
    if (am && h === 12) h = 0;
    const d = gazaDate(+ymd[0], +ymd[1], +ymd[2], h, tm ? +tm[2] : 0, tm && tm[3] ? +tm[3] : 0);
    return isNaN(d) ? null : d;
  }
  function relTime(v) {
    const d = parseTime(v);
    if (!d) return '';
    const en = lang() === 'en';
    const diff = Math.max(0, (Date.now() - d.getTime()) / 1000);
    if (diff < 60) return en ? 'just now' : 'الآن';
    const rtf = new Intl.RelativeTimeFormat(en ? 'en' : 'ar', { numeric: 'auto' });
    const steps = [[3600, 'minute', 60], [86400, 'hour', 3600], [604800, 'day', 86400], [2629800, 'week', 604800], [31557600, 'month', 2629800], [Infinity, 'year', 31557600]];
    for (const [limit, unit, size] of steps) if (diff < limit) return rtf.format(-Math.max(1, Math.round(diff / size)), unit);
    return '';
  }

  /* ---------- Data ---------- */
  const hidden = (cfg.hide || []).map(n => String(n).trim());
  const stamp = p => { const d = parseTime(p.time); return d ? d.getTime() : 0; };
  const listFrom = data => (data && data.people || [])
    .filter(p => p && p.name && hidden.indexOf(String(p.name).trim()) === -1)
    .sort((a, b) => stamp(b) - stamp(a));                         // newest first
  const cached = () => { const c = safe(() => JSON.parse(local.getItem(KEY) || 'null')); return c && c.from === cfg.endpoint ? c : null; };   // ignore a list saved from an older link
  const fetchFresh = () => fetch(cfg.endpoint).then(r => r.json()).then(data => {
    safe(() => local.setItem(KEY, JSON.stringify({ at: Date.now(), from: cfg.endpoint, data })));
    return data;
  });

  /* ---------- Card ---------- */
  const courseLink = cfg.courseLink !== undefined ? cfg.courseLink : (S && S.page !== 'course' ? S.url('socialmedia.courses1/') : '');
  const box = document.createElement('div');
  box.className = 'reg-toast';
  box.setAttribute('role', 'status');
  box.setAttribute('aria-live', 'polite');
  box.innerHTML = `
    <span class="reg-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="reg-body">
      <span class="reg-top"><span class="reg-label"></span><span class="reg-time"></span></span>
      <strong class="reg-name" dir="auto"></strong>
      <span class="reg-course"></span>
    </span>
    ${courseLink ? `<a class="reg-cta" href="${courseLink.replace(/"/g, '&quot;')}"></a>` : ''}`;
  document.body.append(box);

  function fill(p) {
    const en = lang() === 'en';
    const when = relTime(p.time);
    box.querySelector('.reg-label').textContent = en ? 'New registration' : 'تسجيل جديد';
    box.querySelector('.reg-time').textContent = when;
    box.querySelector('.reg-time').hidden = !when;
    box.querySelector('.reg-name').textContent = p.name;
    const workshop = (cfg.workshop && cfg.workshop[en ? 'en' : 'ar']) || p.workshop || '';
    box.querySelector('.reg-course').textContent = en ? `for the “${workshop}” workshop` : `في ورشة «${workshop}»`;
    const cta = box.querySelector('.reg-cta');
    if (cta) cta.textContent = en ? 'Register' : 'سجّل الآن';
  }

  /* ---------- Rotation (one timer at a time, paused while the tab is hidden) ---------- */
  let people = [];
  let index = Number(safe(() => session.getItem('regIndex'))) || 0;
  let timer = null;
  const later = (fn, ms) => { clearTimeout(timer); timer = setTimeout(fn, ms); };
  function showNext() {
    if (!people.length || document.hidden || atBottom) return;
    index = index % people.length;
    fill(people[index]);
    box.classList.add('is-shown');
    index++;
    safe(() => session.setItem('regIndex', String(index)));
    later(hide, SHOW);
  }
  function hide() { box.classList.remove('is-shown'); later(showNext, GAP); }
  /* keep the card while the mouse is on it or a finger touches it */
  const hold = () => { if (box.classList.contains('is-shown')) clearTimeout(timer); };
  const release = () => { if (box.classList.contains('is-shown')) later(hide, 2500); };
  box.addEventListener('mouseenter', hold);
  box.addEventListener('mouseleave', release);
  box.addEventListener('touchstart', hold, { passive: true });
  box.addEventListener('touchend', release, { passive: true });
  box.addEventListener('touchcancel', release, { passive: true });
  function restart(delay) {
    if (!people.length) return;
    box.classList.remove('is-shown');
    later(showNext, delay);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimeout(timer); box.classList.remove('is-shown'); }
    else restart(400);
  });
  window.addEventListener('pageshow', e => { if (e.persisted) restart(400); });
  /* step aside while the copyright line at the very bottom is on screen */
  let atBottom = false;
  const rights = document.querySelector('.footer-rights, .footer-copy');
  if (rights && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      atBottom = entries[0].isIntersecting;
      if (atBottom) { clearTimeout(timer); box.classList.remove('is-shown'); }
      else restart(400);
    }).observe(rights);
  }

  function use(list) {
    const first = !people.length;
    people = list;
    /* a new registration (a different newest entry) starts the rotation from the newest */
    const top = list.length ? list[0].name + '|' + list[0].time : '';
    if (top && top !== safe(() => session.getItem('regTop'))) {
      index = 0;
      safe(() => { session.setItem('regTop', top); session.setItem('regIndex', '0'); });
    }
    if (first) restart(FIRST);
  }
  const saved = cached();
  if (saved) use(listFrom(saved.data));                              // instant from the last visit
  if (!saved || Date.now() - saved.at > 30 * 1000) fetchFresh().then(d => use(listFrom(d))).catch(() => {});

  if (S && S.onLanguageChange) S.onLanguageChange(() => { if (people.length && box.classList.contains('is-shown')) fill(people[(index - 1 + people.length) % people.length]); });
  new MutationObserver(() => { if (people.length && box.classList.contains('is-shown')) fill(people[(index - 1 + people.length) % people.length]); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
