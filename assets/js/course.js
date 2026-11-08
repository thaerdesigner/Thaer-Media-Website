/* ==========================================================================
   course.js — workshop page: registration form that opens WhatsApp
   ========================================================================== */
(function () {
  'use strict';
  const S = window.SITE;

  S.whatsappForm(document.getElementById('courseForm'), {
    rules: { fullName: 'fullName', whatsapp: 'phone', email: 'email' },
    status: document.getElementById('courseStatus'),
    message: (v, lang) => (lang === 'en'
      ? ['I would like to register for the social media and AI tools workshop.', '', `Full name: ${v.fullName}`, `WhatsApp: ${v.whatsapp}`, `Email: ${v.email}`]
      : ['أريد التسجيل في ورشة التواصل الاجتماعي واستخدام منصات الذكاء الاصطناعي.', '', `الاسم الكامل: ${v.fullName}`, `رقم الواتساب: ${v.whatsapp}`, `البريد الإلكتروني: ${v.email}`]
    ).join('\n')
  });

  S.ready();
})();
