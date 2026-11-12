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
  const GAP = 4000;      // pause between cards
  const KEY = 'regFeed';
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'ar');
  const safe = fn => { try { return fn(); } catch (e) { return null; } };
  const local = safe(() => window.localStorage);
  const session = safe(() => window.sessionStorage);

  /* ---------- Time ---------- */
  function parseTime(v) {
    if (!v) return null;
    let d = new Date(v);
    if (isNaN(d)) {
      const t = String(v).trim();
      const m = t.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(?:[ T]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/)
             || t.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})(?:[ T]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
      if (!m) return null;
      const ymd = m[1].length === 4 ? [m[1], m[2], m[3]] : [m[3], m[2], m[1]];
      d = new Date(+ymd[0], +ymd[1] - 1, +ymd[2], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
    }
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
    for (const [limit, unit, size] of steps) if (diff < limit) return rtf.format(-Math.floor(diff / size), unit);
    return '';
  }

  /* ---------- Data ---------- */
  const hidden = (cfg.hide || []).map(n => String(n).trim());
  const listFrom = data => (data && data.people || []).filter(p => p && p.name && hidden.indexOf(String(p.name).trim()) === -1);
  const cached = () => safe(() => JSON.parse(local.getItem(KEY) || 'null'));
  const fetchFresh = () => fetch(cfg.endpoint).then(r => r.json()).then(data => {
    safe(() => local.setItem(KEY, JSON.stringify({ at: Date.now(), data })));
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
    if (!people.length || document.hidden) return;
    index = index % people.length;
    fill(people[index]);
    box.classList.add('is-shown');
    index++;
    safe(() => session.setItem('regIndex', String(index)));
    later(() => { box.classList.remove('is-shown'); later(showNext, GAP); }, SHOW);
  }
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

  function use(list) {
    const first = !people.length;
    people = list;
    if (first) restart(FIRST);
  }
  const saved = cached();
  if (saved) use(listFrom(saved.data));                              // instant from the last visit
  if (!saved || Date.now() - saved.at > 30 * 1000) fetchFresh().then(d => use(listFrom(d))).catch(() => {});

  if (S && S.onLanguageChange) S.onLanguageChange(() => { if (people.length && box.classList.contains('is-shown')) fill(people[(index - 1 + people.length) % people.length]); });
  new MutationObserver(() => { if (people.length && box.classList.contains('is-shown')) fill(people[(index - 1 + people.length) % people.length]); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
