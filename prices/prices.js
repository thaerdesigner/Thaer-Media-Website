/* ==========================================================================
   prices.js — prices page: package cards, the order (cart) and WhatsApp
   - Prices and packages come from SITE_DATA.pricing (assets/js/data.js).
   - "Add to order" keeps items in this browser (localStorage) until sent.
   - "Order now" opens the same form with just that package.
   - Sending saves the order in the Google Sheet (tab «الطلبات») and opens
     WhatsApp with a ready message.
   ========================================================================== */
(function () {
  'use strict';
  const S = window.SITE;
  const P = S.data.pricing;
  if (!P) return;
  const { t, esc } = S;
  const KEY = 'order';
  const $ = id => document.getElementById(id);
  const lang = () => S.lang();
  const safe = fn => { try { return fn(); } catch (e) { return null; } };

  /* ---------- Items ---------- */
  const ITEMS = {};
  P.categories.forEach(cat => cat.items.forEach(item => { ITEMS[item.id] = Object.assign({ cat }, item); }));

  const num = n => Number(n).toLocaleString(lang() === 'en' ? 'en-US' : 'en-US');
  const usd = n => (lang() === 'en' ? `$${num(n)}` : `${num(n)}$`);
  const ils = n => (lang() === 'en' ? `₪${num(n)}` : `${num(n)} شيكل`);
  const T = {
    from: { ar: 'يبدأ من', en: 'From' },
    quote: { ar: 'السعر حسب الطلب', en: 'Price on request' },
    equals: { ar: 'ما يعادل', en: '≈' },
    equalsCard: { ar: 'ويعادل', en: '≈' },
    quoteLine: { ar: 'عرض سعر حسب الطلب', en: 'custom quote' },
    perDesign: { ar: 'سعر التصميم الواحد', en: 'Price per design' },
    designs: { ar: 'تصاميم', en: 'designs' },
    reach: { ar: 'الوصول المتوقع', en: 'Expected reach' },
    people: { ar: 'شخص', en: 'people' },
    days: { ar: 'مدة الحملة', en: 'Duration' },
    add: { ar: 'أضف للطلب', en: 'Add to order' },
    added: { ar: 'أُضيف إلى طلبك ✓', en: 'Added to your order ✓' },
    now: { ar: 'اطلب الآن', en: 'Order now' },
    askQuote: { ar: 'اطلب عرض سعر', en: 'Request a quote' },
    firstFree: { ar: 'التعديل الأول مجاني، وكل تعديل بعده بـ 5 دولارات', en: 'First revision free, then $5 per revision' },
    qty: { ar: 'العدد', en: 'Quantity' },
    remove: { ar: 'حذف', en: 'Remove' },
    order: { ar: 'طلبك', en: 'Your order' },
    direct: { ar: 'اطلب الآن', en: 'Order now' },
    total: { ar: 'المجموع التقديري', en: 'Estimated total' },
    totalNote: { ar: 'سعر البنود «يبدأ من» و«حسب الطلب» يُحدَّد بعد النقاش.', en: 'Items marked “From” or “Custom quote” are priced after we talk.' },
    empty: { ar: 'طلبك فارغ. أضف خدمة من الأسعار.', en: 'Your order is empty. Add a service from the prices.' },
    services: n => (lang() === 'en' ? `${n} ${n === 1 ? 'item' : 'items'}` : `${n} ${n === 1 ? 'خدمة' : n === 2 ? 'خدمتان' : n <= 10 ? 'خدمات' : 'خدمة'}`)
  };

  /* price text for one item (times qty) */
  function priceText(item, qty) {
    qty = qty || 1;
    if (item.quote) return t(T.quoteLine);
    let text;
    if (item.usd != null && item.ils != null) text = `${usd(item.usd * qty)} ${t(T.equals)} ${ils(item.ils * qty)}`;
    else text = item.usd != null ? usd(item.usd * qty) : ils(item.ils * qty);
    return (item.from ? t(T.from) + ' ' : '') + text;
  }

  /* escaped text with dollar amounts kept left-to-right inside Arabic */
  const money = text => esc(text).replace(/(\$?\d[\d.,]*\$?)/g, '<bdi dir="ltr">$1</bdi>');

  /* ---------- Cards ---------- */
  function card(item) {
    const id = esc(item.id);
    let price;
    if (item.quote) price = `<span class="plan-price-main">${esc(t(T.quote))}</span>`;
    else {
      const main = item.usd != null ? usd(item.usd) : ils(item.ils);
      const second = item.usd != null && item.ils != null ? `<span class="plan-price-alt">${esc(t(T.equalsCard))} ${esc(ils(item.ils))}</span>` : '';
      price = `${item.from ? `<span class="plan-price-from">${esc(t(T.from))}</span>` : ''}<bdi class="plan-price-main" dir="${item.usd != null ? 'ltr' : 'auto'}">${esc(main)}</bdi>${second}`;
    }
    const feats = [];
    if (item.per && item.usd) feats.push(`${t(T.perDesign)}: <bdi dir="ltr">${usd(Math.round(item.usd / item.per * 10) / 10)}</bdi>`);
    if (item.reach) {
      const [a, b] = item.reach.map(num);
      feats.push(`${t(T.reach)}<br><strong class="plan-reach">${lang() === 'en' ? `${a}–${b} people` : `من ${a} إلى ${b} شخص`}</strong>`);
    }
    (item.features || []).forEach(f => feats.push(esc(t(f))));
    if (item.cat.revisions) feats.push(esc(t(T.firstFree)));
    return `
      <li class="plan card${item.badge ? ' plan--featured' : ''}${item.hideName ? ' plan--noname' : ''}" data-id="${id}">
        ${item.badge ? `<span class="plan-badge">${esc(t(item.badge))}</span>` : ''}
        ${item.hideName ? '' : `<h3 class="plan-name">${esc(t(item.name))}</h3>`}
        <p class="plan-price">${price}</p>
        ${item.desc ? `<p class="plan-desc">${esc(t(item.desc))}</p>` : ''}
        <ul class="plan-features">${feats.map(f => `<li>${f}</li>`).join('')}</ul>
        <div class="plan-actions">
          <button class="btn btn--primary btn--sm" type="button" data-now="${id}">${esc(t(item.quote ? T.askQuote : T.now))}</button>
          <button class="btn btn--ghost btn--sm" type="button" data-add="${id}">${esc(t(T.add))}</button>
        </div>
      </li>`;
  }

  function render() {
    $('pricesTabs').innerHTML = P.categories.map(cat => `<a href="#${esc(cat.id)}">${esc(t(cat.title))}</a>`).join('');
    $('pricesPolicy').textContent = t(P.revisions);
    $('pricesList').innerHTML = P.categories.map(cat => `
      <section class="section prices-section" id="${esc(cat.id)}" aria-labelledby="${esc(cat.id)}Title">
        <div class="container">
          <div class="section-head">
            <h2 id="${esc(cat.id)}Title">${esc(t(cat.title))}</h2>
            ${cat.intro ? `<p>${esc(t(cat.intro))}</p>` : ''}
          </div>
          <ul class="plans plans--${['', 'one', 'two', 'three', 'four', 'five', 'six'][cat.items.length] || 'many'}">${cat.items.map(i => card(ITEMS[i.id])).join('')}</ul>
          ${cat.note ? `<p class="prices-note">${esc(t(cat.note))}</p>` : ''}
        </div>
      </section>`).join('');
  }

  /* ---------- Order (cart) ---------- */
  let cart = (safe(() => JSON.parse(localStorage.getItem(KEY))) || []).filter(l => ITEMS[l.id]);
  let lines = cart;            // lines shown in the dialog (the cart, or one package for "order now")
  let mode = 'cart';
  const save = () => safe(() => localStorage.setItem(KEY, JSON.stringify(cart)));

  function totals(list) {
    let ilsSum = 0, usdSum = 0, allUsd = true, from = false, quote = false, priced = 0;
    list.forEach(l => {
      const it = ITEMS[l.id];
      if (it.quote) { quote = true; return; }
      priced++;
      if (it.from) from = true;
      if (it.ils != null) ilsSum += it.ils * l.qty;
      if (it.usd != null) usdSum += it.usd * l.qty; else allUsd = false;
    });
    if (!priced) return { text: t(T.quoteLine), note: quote };
    let text = (from ? t(T.from) + ' ' : '') + ils(ilsSum);
    if (allUsd) text = (from ? t(T.from) + ' ' : '') + `${usd(usdSum)} ${t(T.equals)} ${ils(ilsSum)}`;
    return { text, note: from || quote };
  }

  function count(list) { return list.length; }

  function updateBar() {
    const bar = $('cartBar');
    bar.hidden = !cart.length;
    document.body.classList.toggle('has-cart', cart.length > 0);
    if (!cart.length) return;
    $('cartCount').textContent = `${t(T.order)}: ${T.services(count(cart))}`;
    $('cartTotal').innerHTML = `${esc(t(T.total))}: ${money(totals(cart).text)}`;
  }

  function lineName(it) { return `${t(it.cat.title)} — ${t(it.name)}`; }

  function renderLines() {
    $('orderTitle').textContent = t(mode === 'cart' ? T.order : T.direct);
    const list = $('orderLines');
    if (!lines.length) {
      list.innerHTML = `<li class="order-empty">${esc(t(T.empty))}</li>`;
      $('orderTotal').innerHTML = '';
      return;
    }
    list.innerHTML = lines.map((l, i) => {
      const it = ITEMS[l.id];
      const qty = it.qty ? `
        <span class="qty" role="group" aria-label="${esc(t(T.qty))}">
          <button type="button" data-step="-1" data-i="${i}" aria-label="−">−</button>
          <output>${l.qty}</output>
          <button type="button" data-step="1" data-i="${i}" aria-label="+">+</button>
          <span class="qty-unit">${esc(t(it.unit))}</span>
        </span>` : '';
      return `
        <li class="order-line">
          <span class="order-line-text"><strong>${esc(t(it.name))}</strong><small>${esc(t(it.cat.title))}</small></span>
          <span class="order-line-price">${money(priceText(it, l.qty))}</span>
          ${qty || mode === 'cart' ? `<span class="order-line-tools">${qty}${mode === 'cart' ? `<button type="button" class="order-remove" data-remove="${i}">${esc(t(T.remove))}</button>` : ''}</span>` : ''}
        </li>`;
    }).join('');
    const tot = totals(lines);
    $('orderTotal').innerHTML = `<span>${esc(t(T.total))}</span><strong>${money(tot.text)}</strong>${tot.note ? `<small>${esc(t(T.totalNote))}</small>` : ''}`;
  }

  function addToCart(id, button) {
    const line = cart.find(l => l.id === id);
    if (line) { if (ITEMS[id].qty) line.qty++; }
    else cart.push({ id, qty: 1 });
    save(); updateBar();
    $('cartBar').classList.remove('is-bump'); void $('cartBar').offsetWidth; $('cartBar').classList.add('is-bump');
    if (button) {
      button.textContent = t(T.added);
      button.classList.add('is-added');
      clearTimeout(button._timer);
      button._timer = setTimeout(() => { button.textContent = t(T.add); button.classList.remove('is-added'); }, 1600);
    }
  }

  const dialog = $('orderDialog');
  function openDialog(newMode, id) {
    mode = newMode;
    lines = mode === 'cart' ? cart : [{ id, qty: 1 }];
    $('orderStatus').hidden = true;
    renderLines();
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', '');
    document.documentElement.classList.add('dialog-open');
  }
  function closeDialog() {
    if (dialog.close) dialog.close(); else dialog.removeAttribute('open');
  }
  dialog.addEventListener('close', () => document.documentElement.classList.remove('dialog-open'));
  dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(); });     // click on the backdrop
  $('orderClose').addEventListener('click', closeDialog);
  $('cartOpen').addEventListener('click', () => openDialog('cart'));

  $('orderLines').addEventListener('click', e => {
    const step = e.target.closest('[data-step]');
    const rm = e.target.closest('[data-remove]');
    if (step) {
      const l = lines[+step.dataset.i];
      l.qty = Math.max(1, Math.min(99, l.qty + Number(step.dataset.step)));
    } else if (rm) {
      lines.splice(+rm.dataset.remove, 1);
    } else return;
    if (mode === 'cart') { save(); updateBar(); }
    renderLines();
  });

  $('pricesList').addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    const now = e.target.closest('[data-now]');
    if (add) addToCart(add.dataset.add, add);
    if (now) openDialog('direct', now.dataset.now);
  });

  /* ---------- WhatsApp message ---------- */
  function orderLines(list) {
    return list.map((l, i) => {
      const it = ITEMS[l.id];
      const qty = it.qty ? ` × ${l.qty} ${t(it.unit)}` : '';
      return `${i + 1}. ${lineName(it)}${qty}: ${priceText(it, l.qty)}`;
    });
  }

  S.whatsappForm($('orderForm'), {
    rules: { name: 'name', whatsapp: 'phone', email: 'email' },
    status: $('orderStatus'),
    onSend: (v, lng) => {
      const list = lines.slice();
      const endpoint = S.data.registrations && S.data.registrations.endpoint;
      if (endpoint && list.length) {
        const body = JSON.stringify({
          type: 'order', name: v.name, whatsapp: v.whatsapp, email: v.email,
          items: orderLines(list).join('\n'), total: totals(list).text,
          note: $('orderForm').elements.note.value.trim().slice(0, 500),
          lang: lng, website: $('orderWebsite').value
        });
        safe(() => fetch(endpoint, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body }));
      }
      if (mode === 'cart' && list.length) { cart = []; lines = []; save(); updateBar(); }
    },
    message: v => {
      const list = lines.length ? lines : [];
      const note = $('orderForm').elements.note.value.trim();
      const tot = totals(list);
      const en = lang() === 'en';
      const out = en
        ? ['Hello Thaer Media, I would like to order the following:', '', `Name: ${v.name}`, `WhatsApp: ${v.whatsapp}`, `Email: ${v.email}`, '', 'Order:']
        : ['مرحباً Thaer Media، أود طلب الخدمات التالية:', '', `الاسم: ${v.name}`, `رقم الواتساب: ${v.whatsapp}`, `البريد الإلكتروني: ${v.email}`, '', 'الطلب:'];
      out.push(...orderLines(list), '', `${t(T.total)}: ${tot.text}`);
      if (tot.note) out.push(t(T.totalNote));
      if (note) out.push('', `${en ? 'Notes' : 'ملاحظات'}: ${note}`);
      return out.join('\n');
    }
  });
  /* block sending an empty order */
  $('orderForm').addEventListener('submit', e => {
    if (!lines.length) { e.stopImmediatePropagation(); e.preventDefault(); }
  }, true);

  /* ---------- Boot ---------- */
  render();
  updateBar();
  S.onLanguageChange(() => { render(); updateBar(); if (dialog.open) renderLines(); });
  S.ready();
})();
