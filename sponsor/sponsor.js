/* ==========================================================================
   sponsor.js — "Sponsor a student" page
   Everything you may need to edit is in CONFIG below.
   ========================================================================== */
const CONFIG = {
  /* ───────────── صورة الصفحة ─────────────
     ضع صورة جديدة داخل مجلد sponsor بنفس الاسم photo.webp لتستبدلها،
     أو اكتب هنا اسم/مسار الصورة الجديدة. يُفضّل صورة طولية (3:4). */
  photo: 'photo.webp',
  /* صورة المدرب في قسم «من يدرّب الطلاب؟» — نفس الطريقة: استبدل trainer.webp */
  trainerPhoto: 'trainer.webp',

  currencySymbol: '$',
  whatsappNumber: '970599351383',  // أرقام فقط مع رمز الدولة
  email: 'thaeralqrenawi@gmail.com',

  /* ───────────── مبالغ الكفالة ───────────── */
  tiers: [
    { id: 'full',   amount: 50,   ar: 'كفالة طالب كامل',   en: 'Full sponsorship', noteAr: 'مقعد كامل لطالب واحد', noteEn: 'One full seat for a student' },
    { id: 'half',   amount: 25,   ar: 'نصف كفالة',         en: 'Half sponsorship', noteAr: 'تُكمَل مع متبرّع آخر',  noteEn: 'Combined with another donor' },
    { id: 'custom', amount: null, ar: 'أنت تحدّد المبلغ',  en: 'You choose',       noteAr: 'أي مبلغ تستطيعه',       noteEn: 'Any amount you can give' }
  ],

  /* ───────────── وسائل الدفع ─────────────
     لإضافة بيانات وسيلة: املأ url (للروابط) أو value (للبيانات التي تُنسخ).
     أي وسيلة بياناتها فارغة "" تظهر بزر «اطلب البيانات عبر واتساب»
     بدل البيانات، فلا تظهر للزائر بيانات ناقصة.
     لإخفاء وسيلة كلياً اجعل show: false. */
  methods: [
    { show: true, icon: 'card', name: 'PayPal',
      descAr: 'ادفع عبر حساب PayPal أو ببطاقتك البنكية.', descEn: 'Pay with your PayPal account or bank card.',
      url: '',                                   // مثال: https://www.paypal.com/paypalme/USERNAME
      buttonAr: 'ادفع عبر PayPal', buttonEn: 'Pay with PayPal' },

    { show: true, icon: 'card', name: 'Payoneer',
      descAr: 'ادفع ببطاقتك البنكية عبر رابط Payoneer.', descEn: 'Pay by card through a Payoneer payment link.',
      url: '',                                   // رابط طلب الدفع من Payoneer
      buttonAr: 'ادفع عبر Payoneer', buttonEn: 'Pay with Payoneer' },

    { show: true, icon: 'bank', nameAr: 'تحويل بنكي — بنك فلسطين', nameEn: 'Bank transfer — Bank of Palestine',
      descAr: 'حوّل مباشرة إلى الحساب البنكي التالي.', descEn: 'Transfer directly to this bank account.',
      fields: [
        { labelAr: 'اسم صاحب الحساب', labelEn: 'Account holder', value: '' },
        { labelAr: 'IBAN',            labelEn: 'IBAN',           value: '' },
        { labelAr: 'SWIFT',           labelEn: 'SWIFT',          value: '' }
      ] },

    { show: true, icon: 'coin', nameAr: 'Binance — USDT', nameEn: 'Binance — USDT',
      descAr: 'أرسل USDT عبر Binance Pay أو إلى عنوان المحفظة.', descEn: 'Send USDT via Binance Pay or to the wallet address.',
      fields: [
        { labelAr: 'Binance Pay ID',             labelEn: 'Binance Pay ID',           value: '' },
        { labelAr: 'عنوان محفظة USDT (TRC20)',   labelEn: 'USDT wallet (TRC20)',      value: '' }
      ] },

    { show: true, icon: 'transfer', name: 'Western Union',
      descAr: 'أرسل الحوالة بالبيانات التالية، ثم أرسل لنا رقم الحوالة (MTCN).', descEn: 'Send to the details below, then share the transfer number (MTCN) with us.',
      fields: [
        { labelAr: 'اسم المستلم', labelEn: 'Receiver name', value: '' },
        { labelAr: 'الدولة والمدينة', labelEn: 'Country and city', value: '' }
      ] },

    { show: true, icon: 'phone', nameAr: 'محفظة بال باي', nameEn: 'PalPay wallet',
      descAr: 'للتحويل من داخل فلسطين عبر تطبيق بال باي.', descEn: 'For transfers within Palestine via the PalPay app.',
      fields: [
        { labelAr: 'رقم المحفظة', labelEn: 'Wallet number', value: '' },
        { labelAr: 'اسم صاحب المحفظة', labelEn: 'Wallet holder', value: '' }
      ] },

    { show: true, icon: 'phone', nameAr: 'جوال باي', nameEn: 'Jawwal Pay',
      descAr: 'للتحويل من داخل فلسطين عبر تطبيق جوال باي.', descEn: 'For transfers within Palestine via the Jawwal Pay app.',
      fields: [
        { labelAr: 'رقم المحفظة', labelEn: 'Wallet number', value: '' },
        { labelAr: 'اسم صاحب المحفظة', labelEn: 'Wallet holder', value: '' }
      ] }
  ]
};

(function () {
  'use strict';
  const doc = document.documentElement;
  const $ = id => document.getElementById(id);
  const lang = () => (doc.lang === 'en' ? 'en' : 'ar');
  const tx = (ar, en) => (lang() === 'en' ? en : ar);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = n => `${CONFIG.currencySymbol}${Number(n).toLocaleString('en-US')}`;
  let selected = 'full';

  const ICONS = {
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/>',
    bank: '<path d="M3 10h18L12 4 3 10Z"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
    wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M21 9h-5a3 3 0 0 0 0 6h5V9Z"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M8 9h8M12 9v8M9 12.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5"/>',
    transfer: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
    phone: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>'
  };
  const svg = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  /* ---------- Render ---------- */
  function renderTiers() {
    $('tiers').innerHTML = CONFIG.tiers.map(t => `
      <button type="button" class="tier${t.id === selected ? ' is-on' : ''}" role="radio" aria-checked="${t.id === selected}" data-id="${t.id}">
        <span class="tier-amount">${t.amount ? money(t.amount) : esc(tx('مبلغ آخر', 'Other'))}</span>
        <span class="tier-name">${esc(tx(t.ar, t.en))}</span>
        <span class="tier-note">${esc(tx(t.noteAr, t.noteEn))}</span>
      </button>`).join('');
    $('customWrap').hidden = selected !== 'custom';
    $('customCur').textContent = CONFIG.currencySymbol;
  }

  const methodName = m => m.name || tx(m.nameAr, m.nameEn);
  const isEmpty = m => (m.url !== undefined ? !m.url : !(m.fields || []).some(f => f.value));
  function requestLink(m) {
    const msg = lang() === 'en'
      ? `Hello Thaer, I would like to donate to sponsor a student in Gaza via ${methodName(m)}. Could you send me the payment details?`
      : `مرحباً ثائر، أرغب في التبرّع لكفالة طالب من غزة عبر ${methodName(m)}. هل يمكنك إرسال بيانات الدفع؟`;
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }
  function renderMethods() {
    const list = CONFIG.methods.map((m, i) => ({ m, i })).filter(({ m }) => m.show !== false);
    $('methods').innerHTML = list.map(({ m, i }) => {
      const head = `<div class="method-head"><span class="method-icon">${svg(m.icon)}</span><div><h4>${esc(methodName(m))}</h4><p>${esc(tx(m.descAr, m.descEn))}</p></div></div>`;
      if (isEmpty(m)) {
        return `<div class="method">${head}<a class="btn btn-soft btn-block" href="${esc(requestLink(m))}" target="_blank" rel="noopener noreferrer">${esc(tx('اطلب البيانات عبر واتساب', 'Request details on WhatsApp'))}</a></div>`;
      }
      if (m.url !== undefined) {
        return `<div class="method">${head}<a class="btn btn-main btn-block" href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">${esc(tx(m.buttonAr, m.buttonEn))}</a></div>`;
      }
      const rows = m.fields.filter(f => f.value).map(f => {
        const j = m.fields.indexOf(f);
        return `
        <div class="field-row"><span class="field-label">${esc(tx(f.labelAr, f.labelEn))}</span>
          <button type="button" class="field-copy" data-m="${i}" data-f="${j}" aria-label="${esc(tx('نسخ ', 'Copy ') + tx(f.labelAr, f.labelEn))}"><bdi>${esc(f.value)}</bdi>${svg('copy')}</button></div>`;
      }).join('');
      return `<div class="method">${head}<div class="fields">${rows}</div></div>`;
    }).join('');
  }

  function amountText() {
    const tier = CONFIG.tiers.find(t => t.id === selected);
    if (tier && tier.amount) return money(tier.amount);
    const v = parseFloat($('customAmount').value);
    return v > 0 ? money(v) : '';
  }

  function updateConfirm() {
    const amount = amountText();
    const tier = CONFIG.tiers.find(t => t.id === selected);
    const msg = lang() === 'en'
      ? `Hello Thaer, I have just donated${amount ? ' ' + amount : ''}${tier.id !== 'custom' ? ` (${tier.en})` : ''} to sponsor a student in Gaza.`
      : `مرحباً ثائر، قمت بالتبرّع${amount ? ' بمبلغ ' + amount : ''}${tier.id !== 'custom' ? ` (${tier.ar})` : ''} لكفالة طالب من غزة.`;
    $('confirmWa').href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    $('confirmMail').href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(tx('تأكيد تبرّع — كفالة طالب', 'Donation confirmation — Student sponsorship'))}&body=${encodeURIComponent(msg)}`;
  }

  /* ---------- Language ---------- */
  function applyLanguage(next) {
    doc.lang = next;
    doc.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-ar]').forEach(el => { el.textContent = el.getAttribute('data-' + next); });
    document.querySelectorAll('[data-alt-ar]').forEach(el => { el.alt = el.getAttribute('data-alt-' + next); });
    document.querySelectorAll('[data-label-ar]').forEach(el => { el.setAttribute('aria-label', el.getAttribute('data-label-' + next)); });
    document.title = document.body.getAttribute('data-title-' + next);
    try { localStorage.setItem('sponsor-lang', next); } catch (e) { /* ignore */ }
    renderTiers();
    renderMethods();
    updateConfirm();
  }

  /* ---------- Events ---------- */
  $('tiers').addEventListener('click', e => {
    const b = e.target.closest('.tier');
    if (!b) return;
    selected = b.dataset.id;
    renderTiers();
    updateConfirm();
    if (selected === 'custom') $('customAmount').focus();
  });
  $('customAmount').addEventListener('input', updateConfirm);
  $('methods').addEventListener('click', async e => {
    const b = e.target.closest('.field-copy');
    if (!b) return;
    const value = CONFIG.methods[b.dataset.m].fields[b.dataset.f].value;
    try { await navigator.clipboard.writeText(value); }
    catch (err) {
      const t = document.createElement('textarea'); t.value = value; document.body.append(t); t.select(); document.execCommand('copy'); t.remove();
    }
    const note = $('copied');
    note.textContent = tx('تم النسخ: ', 'Copied: ') + value;
    note.hidden = false;
    b.classList.add('is-copied');
    clearTimeout(b._t);
    b._t = setTimeout(() => { b.classList.remove('is-copied'); note.hidden = true; }, 2200);
  });
  $('langToggle').addEventListener('click', () => applyLanguage(lang() === 'ar' ? 'en' : 'ar'));

  /* In-page links scroll smoothly without adding #give / #how to the address */
  document.querySelectorAll('[data-scroll]').forEach(a => a.addEventListener('click', e => {
    const target = document.getElementById(a.dataset.scroll);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + scrollY - document.querySelector('.top').offsetHeight - 12;
    window.scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }));
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);

  /* Photo */
  document.querySelectorAll('[data-photo]').forEach(img => { img.src = CONFIG.photo; });
  document.querySelectorAll('[data-trainer]').forEach(img => { img.src = CONFIG.trainerPhoto; });

  /* Hero figure */
  document.querySelectorAll('[data-amount="full"]').forEach(el => {
    const full = CONFIG.tiers.find(t => t.id === 'full');
    el.textContent = full && full.amount ? money(full.amount) : '';
  });
  $('year').textContent = new Date().getFullYear();
  $('footMail').href = 'mailto:' + CONFIG.email;
  $('footMail').textContent = CONFIG.email;

  /* Reveal on scroll */
  const items = document.querySelectorAll('.card, .covers li, .steps li, .give-panel, .faq details, .head, .trainer-media, .trainer-copy');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('rv'));
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  }

  const top = document.querySelector('.top');
  const onScroll = () => top.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  applyLanguage(lang());
})();
