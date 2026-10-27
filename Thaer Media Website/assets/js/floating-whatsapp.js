(() => {
  if (document.querySelector('.floating-whatsapp')) return;

  const link = document.createElement('a');
  const isEnglish = document.documentElement.lang === 'en';
  link.className = 'floating-whatsapp';
  link.href = 'https://wa.me/970599351383';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', isEnglish ? 'Chat with me on WhatsApp' : 'تواصل معي عبر واتساب');
  link.setAttribute('title', isEnglish ? 'Chat on WhatsApp' : 'تواصل عبر واتساب');
  link.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16.02 3.2a12.63 12.63 0 0 0-10.8 19.17L3.5 28.8l6.57-1.72A12.62 12.62 0 1 0 16.02 3.2Zm0 22.96c-1.9 0-3.78-.51-5.42-1.47l-.39-.23-3.9 1.02 1.04-3.8-.25-.4a10.25 10.25 0 1 1 8.92 4.88Zm5.63-7.68c-.31-.16-1.84-.91-2.12-1.01-.29-.1-.49-.16-.7.16-.2.31-.8 1.01-.98 1.22-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.47-1.52-.91-.81-1.53-1.82-1.71-2.13-.18-.31-.02-.48.14-.64.14-.14.31-.36.46-.54.16-.18.2-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.7-1.69-.96-2.31-.25-.6-.51-.52-.7-.53l-.6-.01c-.2 0-.54.08-.83.39-.28.31-1.09 1.06-1.09 2.59 0 1.53 1.12 3.01 1.27 3.22.16.2 2.2 3.36 5.33 4.71.74.32 1.32.52 1.77.66.74.24 1.42.21 1.95.13.6-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.07-.13-.28-.21-.59-.36Z"/></svg>';
  document.body.append(link);
})();
