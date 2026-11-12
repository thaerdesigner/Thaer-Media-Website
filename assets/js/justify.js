/* ==========================================================================
   justify.js — block-style (justified) text on every page
   Paragraphs, headings, descriptions and list items get justified lines.
   - Text keeps its own side: start-aligned text stays at the start, centred
     text keeps a centred last line.
   - Where justifying would stretch the spaces between words, the text size
     is nudged a little (up to ±10%) until the spaces stay small.
   It re-checks on width, visibility and language changes.
   ========================================================================== */
(function () {
  'use strict';
  if (!window.ResizeObserver || !document.createRange) return;

  const SELECTOR = 'main :is(p, blockquote, dd, dt, h1, h2, h3, h4, li, figcaption), .site-footer p, .footer-brand p';
  const SKIP = '.reg-toast, nav, button, a, label, select, .btn, .menu, .site-header';
  const GOOD = 0.5;        // a space up to this width (em) counts as small (a normal space is ~0.24em)
  const LIMIT = 0.7;       // beyond this even after resizing, leave the text unjustified
  const STEPS = [0.985, 1.015, 0.97, 1.03, 0.955, 1.045, 0.94, 1.06, 0.925, 1.075, 0.91, 1.09, 0.9, 1.1];
  const seen = new WeakMap();

  function widestSpace(el) {
    const size = parseFloat(getComputedStyle(el).fontSize) || 16;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    let node, worst = 0;
    while ((node = walker.nextNode())) {
      const text = node.textContent;
      for (let i = 0; i < text.length; i++) {
        if (text[i] !== ' ') continue;
        range.setStart(node, i); range.setEnd(node, i + 1);
        const rect = range.getClientRects()[0];
        if (rect && rect.width / size > worst) worst = rect.width / size;
      }
    }
    return worst;
  }

  function lines(el) {
    const cs = getComputedStyle(el);
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5;
    return Math.round((el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)) / lh);
  }

  function check(el) {
    el.classList.remove('tj', 'tj-c', 'tj-off');
    el.style.fontSize = '';
    if (!el.isConnected || !el.offsetWidth) return;
    const cs = getComputedStyle(el);
    const rtl = cs.direction === 'rtl';
    const align = cs.textAlign;
    const start = align === 'start' || align === 'justify' || align === (rtl ? 'right' : 'left');
    if (!start && align !== 'center') return;                 // end-aligned text stays as it is
    el.classList.add('tj');
    if (align === 'center') el.classList.add('tj-c');
    if (lines(el) < 2) return;                                // one line: nothing to stretch
    let worst = widestSpace(el);
    if (worst <= GOOD) return;
    const base = parseFloat(cs.fontSize);
    let best = { s: 1, w: worst };
    for (const s of STEPS) {
      el.style.fontSize = (base * s).toFixed(2) + 'px';
      worst = widestSpace(el);
      if (worst < best.w) best = { s, w: worst };
      if (worst <= GOOD) break;
    }
    el.style.fontSize = best.s === 1 ? '' : (base * best.s).toFixed(2) + 'px';
    if (best.w > LIMIT) { el.style.fontSize = ''; el.classList.remove('tj', 'tj-c'); if (align === 'justify') el.classList.add('tj-off'); }
  }

  const observer = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      const w = el.offsetWidth;
      if (seen.get(el) === w) return;
      check(el);
      seen.set(el, el.offsetWidth);
    });
  });

  function hasText(el) {
    for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) return true;
    return false;
  }
  function watchAll() {
    document.querySelectorAll(SELECTOR).forEach(el => {
      if (seen.has(el) || !hasText(el) || el.closest(SKIP)) return;
      seen.set(el, -1);
      observer.observe(el);
    });
  }
  function recheckAll() {
    document.querySelectorAll(SELECTOR).forEach(el => {
      if (!seen.has(el)) return;
      check(el);
      seen.set(el, el.offsetWidth);
    });
  }

  watchAll();
  /* content added later (reviews, galleries) and language switches */
  let pending = null;
  const inToast = m => { const el = m.target.nodeType === 1 ? m.target : m.target.parentElement; return el && el.closest('.reg-toast'); };
  new MutationObserver(list => {
    if (list.every(m => m.type !== 'attributes' && inToast(m))) return;
    clearTimeout(pending);
    pending = setTimeout(() => { watchAll(); recheckAll(); }, 60);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'], childList: true, subtree: true, characterData: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(recheckAll);
  window.addEventListener('load', recheckAll);
})();
