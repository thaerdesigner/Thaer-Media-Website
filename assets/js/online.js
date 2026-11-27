/* ==========================================================================
   online.js — online workshop page (/courses.online): registration form
   Saves name, WhatsApp, email, country, payment method and the course name
   in the Google Sheet tab «المسجلين أونلاين», then opens WhatsApp.
   ========================================================================== */
(function () {
  'use strict';
  const S = window.SITE;
  const COURSE = 'من المنشور إلى المبيعات (أونلاين)';

  S.whatsappForm(document.getElementById('onlineForm'), {
    rules: { fullName: 'fullName', whatsapp: 'phone', email: 'email', country: 'country', payment: 'choice' },
    status: document.getElementById('onlineStatus'),
    onSend: (v, lang) => {
      const endpoint = S.data.registrations && S.data.registrations.endpoint;
      if (!endpoint) return;
      const trap = document.getElementById('onlineWebsite');
      const body = JSON.stringify({ type: 'online', course: COURSE, fullName: v.fullName, whatsapp: v.whatsapp, email: v.email,
        country: v.country, payment: v.payment, lang, website: trap ? trap.value : '' });
      try {
        fetch(endpoint, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body });
      } catch (e) { /* the WhatsApp step still works */ }
      try { localStorage.removeItem('regFeed2'); } catch (e) { /* ignore */ }
    },
    message: (v, lang) => (lang === 'en'
      ? ['I would like to register for the “From Posts to Sales” online workshop ($15 offer).', '', `Full name: ${v.fullName}`, `WhatsApp: ${v.whatsapp}`, `Email: ${v.email}`, `Country: ${v.country}`, `Payment method: ${v.payment}`]
      : ['أرغب بالتسجيل في ورشة «من المنشور إلى المبيعات» أونلاين (عرض 15$).', '', `الاسم الكامل: ${v.fullName}`, `رقم الواتساب: ${v.whatsapp}`, `البريد الإلكتروني: ${v.email}`, `البلد: ${v.country}`, `طريقة الدفع: ${v.payment}`]
    ).join('\n')
  });

  S.ready();
})();
