/* ==========================================================================
   contact.js — contact page: WhatsApp form and contact details from data.js
   (also loaded by 404.html, where none of these elements exist)
   ========================================================================== */
(function () {
  'use strict';
  const S = window.SITE;
  const C = S.data.contact;

  const whatsapp = document.getElementById('contactWhatsapp');
  if (whatsapp) whatsapp.href = S.whatsappUrl();
  const phone = document.getElementById('contactPhone');
  if (phone) phone.textContent = '+' + C.whatsappNumber.replace(/^(\d{3})(\d{2})(\d{3})(\d{4})$/, '$1 $2 $3 $4');
  const email = document.getElementById('contactEmail');
  if (email) email.href = 'mailto:' + C.email;
  const emailText = document.getElementById('contactEmailText');
  if (emailText) emailText.textContent = C.email;

  S.whatsappForm(document.getElementById('contactForm'), {
    rules: { name: 'name', phone: 'phone', details: 'details' },
    status: document.getElementById('contactStatus'),
    message: (v, lang) => (lang === 'en'
      ? ['Hello Thaer Media,', '', `Name: ${v.name}`, `Phone: ${v.phone}`, `Details: ${v.details}`]
      : ['مرحباً Thaer Media،', '', `الاسم: ${v.name}`, `رقم الجوال: ${v.phone}`, `تفاصيل الخدمة: ${v.details}`]
    ).join('\n')
  });

  S.ready();
})();
