/* ==========================================================================
   justify.js — block-style (justified) paragraphs without wide word gaps
   CSS justifies paragraphs on every page. This script measures the spaces
   in each one and, where justifying would stretch a space too much (narrow
   columns, short lines), falls back to the normal alignment for that
   paragraph only. It re-checks on width, visibility and language changes.
   ========================================================================== */
(function () {
  'use strict';
  if (!window.ResizeObserver || !document.createRange) return;

  const SELECTOR = 'p, blockquote, dd, .trainer-points li';
  const MAX_GAP = 0.5;              // widest allowed space, in em (a normal space is ~0.24em)
  const OFF = 'tj-off';
  const widths = new WeakMap();

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

  function check(el) {
    if (!el.isConnected || !el.offsetWidth) return;
    el.classList.remove(OFF);
    if (getComputedStyle(el).textAlign !== 'justify') return;
    if (widestSpace(el) > MAX_GAP) el.classList.add(OFF);
  }

  const observer = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const w = Math.round(entry.contentRect.width);
      if (widths.get(entry.target) === w) return;
      widths.set(entry.target, w);
      check(entry.target);
    });
  });

  function watchAll() {
    document.querySelectorAll(SELECTOR).forEach(el => {
      if (el.closest('.reg-toast')) return;
      if (!widths.has(el)) { widths.set(el, -1); observer.observe(el); }
    });
  }
  const recheck = () => document.querySelectorAll(SELECTOR).forEach(el => { if (widths.has(el)) check(el); });

  watchAll();
  /* content added later (reviews, galleries) and language switches */
  let pending = null;
  new MutationObserver(list => {
    const inToast = m => { const el = m.target.nodeType === 1 ? m.target : m.target.parentElement; return el && el.closest('.reg-toast'); };
    if (list.every(m => m.type !== 'attributes' && inToast(m))) return;
    clearTimeout(pending);
    pending = setTimeout(() => { watchAll(); recheck(); }, 60);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'], childList: true, subtree: true, characterData: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(recheck);
  window.addEventListener('load', recheck);
})();
