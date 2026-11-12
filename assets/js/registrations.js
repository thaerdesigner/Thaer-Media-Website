/* ==========================================================================
   registrations.js — "new registration" notifications
   Reads name, registration time and workshop name from the Google Sheet
   (via the Apps Script link in data.js) and shows them one at a time in a
   small card at the bottom of the page. Homepage: up to 2 per visit;
   workshop page: up to 5. Closing it stops them for the rest of the visit.
   ========================================================================== */
(function () {
  'use strict';
  const S = window.SITE;
  const endpoint = S && S.data.registrations && S.data.registrations.endpoint;
  if (!endpoint) return;
  const onCourse = S.page === 'course';
  const max = onCourse ? 5 : 2;
  const firstDelay = onCourse ? 6000 : 9000;
  const gap = 22000;
  const visible = 6500;
  try { if (sessionStorage.getItem('regClosed')) return; } catch (e) { /* ignore */ }

  function relTime(iso) {
    if (!iso) return '';
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    const rtf = new Intl.RelativeTimeFormat(S.lang() === 'en' ? 'en' : 'ar', { numeric: 'auto' });
    const steps = [[60, 'second', 1], [3600, 'minute', 60], [86400, 'hour', 3600], [604800, 'day', 86400], [2629800, 'week', 604800], [31557600, 'month', 2629800], [Infinity, 'year', 31557600]];
    if (diff < 60) return S.lang() === 'en' ? 'just now' : 'الآن';
    for (const [limit, unit, size] of steps) if (diff < limit) return rtf.format(-Math.floor(diff / size), unit);
    return '';
  }

  async function load() {
    try {
      const cached = JSON.parse(sessionStorage.getItem('regFeed') || 'null');
      if (cached && Date.now() - cached.at < 5 * 60 * 1000) return cached.data;
    } catch (e) { /* ignore */ }
    const res = await fetch(endpoint, { method: 'GET' });
    if (!res.ok) throw new Error('feed');
    const data = await res.json();
    try { sessionStorage.setItem('regFeed', JSON.stringify({ at: Date.now(), data })); } catch (e) { /* ignore */ }
    return data;
  }

  function build() {
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
      ${onCourse ? '' : `<a class="reg-cta" href="${S.esc(S.url('socialmedia.courses1/'))}"></a>`}
      <button class="reg-close" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`;
    document.body.append(box);
    box.querySelector('.reg-close').addEventListener('click', () => {
      box.classList.remove('is-shown');
      try { sessionStorage.setItem('regClosed', '1'); } catch (e) { /* ignore */ }
      stopped = true;
    });
    return box;
  }

  let stopped = false;
  function fill(box, p) {
    const en = S.lang() === 'en';
    box.querySelector('.reg-label').textContent = en ? 'New registration' : 'تسجيل جديد';
    const when = relTime(p.time);
    box.querySelector('.reg-time').textContent = when;
    box.querySelector('.reg-time').hidden = !when;   // older rows may have no time
    box.querySelector('.reg-name').textContent = p.name;
    box.querySelector('.reg-course').textContent = (en ? 'for ' : 'في ') + (p.workshop || '');
    const cta = box.querySelector('.reg-cta');
    if (cta) cta.textContent = en ? 'Register' : 'سجّل الآن';
    box.querySelector('.reg-close').setAttribute('aria-label', en ? 'Close' : 'إغلاق');
  }

  load().then(data => {
    const people = (data && data.people || []).filter(p => p && p.name);
    if (!people.length) return;
    const box = build();
    let shown = 0;
    const next = () => {
      if (stopped || shown >= Math.min(max, people.length)) return;
      if (document.hidden) { setTimeout(next, 3000); return; }
      fill(box, people[shown]);
      box.classList.add('is-shown');
      shown++;
      setTimeout(() => {
        box.classList.remove('is-shown');
        setTimeout(next, gap);
      }, visible);
    };
    setTimeout(next, firstDelay);
  }).catch(() => { /* no notifications if the sheet is unreachable */ });
})();
