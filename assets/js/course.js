/* ==========================================================================
   course.js — workshop page: registration form that opens WhatsApp
   ========================================================================== */
(function () {
  'use strict';
  const S = window.SITE;

  S.whatsappForm(document.getElementById('courseForm'), {
    rules: { fullName: 'fullName', whatsapp: 'phone', email: 'email' },
    status: document.getElementById('courseStatus'),
    /* Save the registration in the Google Sheet before WhatsApp opens.
       keepalive lets the request finish even while the new tab is opening. */
    onSend: (v, lang) => {
      const endpoint = S.data.registrations && S.data.registrations.endpoint;
      if (!endpoint) return;
      const trap = document.getElementById('courseWebsite');
      const body = JSON.stringify({ fullName: v.fullName, whatsapp: v.whatsapp, email: v.email, lang, website: trap ? trap.value : '' });
      try {
        fetch(endpoint, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body });
      } catch (e) { /* the WhatsApp step still works */ }
      try { localStorage.removeItem('regFeed'); } catch (e) { /* ignore */ }
    },
    message: (v, lang) => (lang === 'en'
      ? ['I would like to register for the social media and AI tools workshop.', '', `Full name: ${v.fullName}`, `WhatsApp: ${v.whatsapp}`, `Email: ${v.email}`]
      : ['أريد التسجيل في ورشة التواصل الاجتماعي واستخدام منصات الذكاء الاصطناعي.', '', `الاسم الكامل: ${v.fullName}`, `رقم الواتساب: ${v.whatsapp}`, `البريد الإلكتروني: ${v.email}`]
    ).join('\n')
  });

  S.ready();
})();
