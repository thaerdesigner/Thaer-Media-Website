const contactLeadForm = document.getElementById('contactLeadForm');
if (contactLeadForm) {
  contactLeadForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactLeadForm.reportValidity()) return;

    const data = typeof SITE_DATA !== 'undefined' ? SITE_DATA.contact : null;
    const whatsappNumber = data?.whatsappNumber;
    const status = document.getElementById('contactFormStatus');
    if (!whatsappNumber || !/^\d+$/.test(whatsappNumber)) {
      status.textContent = document.documentElement.lang === 'en'
        ? 'WhatsApp contact is unavailable right now. Please email instead.'
        : 'التواصل عبر واتساب غير متاح حالياً. يرجى الإرسال عبر البريد الإلكتروني.';
      status.hidden = false;
      return;
    }

    const values = new FormData(contactLeadForm);
    const isEnglish = document.documentElement.lang === 'en';
    const message = [
      isEnglish ? 'New project inquiry' : 'طلب مشروع جديد',
      `${isEnglish ? 'Name' : 'الاسم'}: ${values.get('name').trim()}`,
      `${isEnglish ? 'Phone' : 'رقم الجوال'}: ${values.get('phone').trim()}`,
      `${isEnglish ? 'Project details' : 'تفاصيل المشروع'}: ${values.get('project').trim()}`
    ].join('\n');

    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  });
}
