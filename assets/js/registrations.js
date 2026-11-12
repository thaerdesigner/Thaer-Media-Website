/* ==========================================================================
   registrations.js — "new registration" notifications on every page
   Shows name, registration time and workshop name from the Google Sheet
   (via the Apps Script link in data.js), one at a time, in a card at the
   bottom of the page. The last list is kept in the browser, so on every page
   after the first it appears immediately while a fresh copy loads.
   ========================================================================== */
(function () {
  'use strict';
  const S = window.SITE;
  const cfg = S && S.data.registrations;
  if (!cfg || !cfg.endpoint) return;
  const FIRST = 1200;    // ms before the first card
  const SHOW = 6000;     // how long each card stays
  const GAP = 5000;      // pause between cards
  const KEY = 'regFeed';
  const store = (() => { try { return window.localStorage; } catch (e) { return null; } })();

  /* Times arrive as ISO dates or as text typed in the sheet (e.g. 2026-11-10 14:30) */
  function parseTime(v) {
    if (!v) return null;
    let d = new Date(v);
    if (isNaN(d)) {
      const m = String(v).trim().match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(?:[ T]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/)
             || String(v).trim().match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})(?:[ T]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
      if (!m) return null;
      const ymd = m[1].length === 4 ? [m[1], m[2], m[3]] : [m[3], m[2], m[1]];
      d = new Date(+ymd[0], +ymd[1] - 1, +ymd[2], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
    }
    return isNaN(d) ? null : d;
  }
  function relTime(v) {
    const d = parseTime(v);
    if (!d) return '';
    const en = S.lang() === 'en';
    const diff = Math.max(0, (Date.now() - d.getTime()) / 1000);
    if (diff < 60) return en ? 'just now' : 'الآن';
    const rtf = new Intl.RelativeTimeFormat(en ? 'en' : 'ar', { numeric: 'auto' });
    const steps = [[3600, 'minute', 60], [86400, 'hour', 3600], [604800, 'day', 86400], [2629800, 'week', 604800], [31557600, 'month', 2629800], [Infinity, 'year', 31557600]];
    for (const [limit, unit, size] of steps) if (diff < limit) return rtf.format(-Math.floor(diff / size), unit);
    return '';
  }

  function cached() {
    try { return JSON.parse(store.getItem(KEY) || 'null'); } catch (e) { return null; }
  }
  function fetchFresh() {
    return fetch(cfg.endpoint).then(r => r.json()).then(data => {
      try { store.setItem(KEY, JSON.stringify({ at: Date.now(), data })); } catch (e) { /* ignore */ }
      return data;
    });
  }

  const hidden = (cfg.hide || []).map(n => String(n).trim());
  const listFrom = data => (data && data.people || []).filter(p => p && p.name && hidden.indexOf(String(p.name).trim()) === -1);

  /* ---------- Card ---------- */
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
    ${S.page === 'course' ? '' : `<a class="reg-cta" href="${S.esc(S.url('socialmedia.courses1/'))}"></a>`}`;
  document.body.append(box);

  function fill(p) {
    const en = S.lang() === 'en';
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

  /* ---------- Rotation: continues across pages instead of restarting ---------- */
  let people = [];
  let index = (() => { try { return Number(sessionStorage.getItem('regIndex')) || 0; } catch (e) { return 0; } })();
  let started = false;
  function cycle() {
    if (!people.length) return;
    if (document.hidden) { setTimeout(cycle, 2000); return; }
    index = index % people.length;
    fill(people[index]);
    box.classList.add('is-shown');
    index++;
    try { sessionStorage.setItem('regIndex', String(index)); } catch (e) { /* ignore */ }
    setTimeout(() => { box.classList.remove('is-shown'); setTimeout(cycle, GAP); }, SHOW);
  }
  function start(list) {
    people = list;
    if (!started && people.length) { started = true; setTimeout(cycle, FIRST); }
  }

  const saved = cached();
  if (saved) start(listFrom(saved.data));                     // instant on repeat visits
  if (!saved || Date.now() - saved.at > 60 * 1000) {
    fetchFresh().then(data => { const list = listFrom(data); if (started) people = list; else start(list); }).catch(() => {});
  }
  S.onLanguageChange(() => { if (people.length && box.classList.contains('is-shown')) fill(people[(index - 1 + people.length) % people.length]); });
})();
