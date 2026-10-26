const courseForm=document.getElementById('courseRegistrationForm');
const courseStatus=document.getElementById('courseFormStatus');
const courseFallback=document.getElementById('courseWhatsappFallback');
const courseLangButton=document.getElementById('langBtn');
const courseThemeButton=document.getElementById('themeBtn');
const courseScriptUrl=document.currentScript.src;
const floatingWhatsAppScript=document.createElement('script');
floatingWhatsAppScript.src=new URL('floating-whatsapp.js',courseScriptUrl).href;
document.head.append(floatingWhatsAppScript);
let courseLang=document.documentElement.lang==='en'?'en':'ar';

const yearElement=document.getElementById('year');
if(yearElement)yearElement.textContent=new Date().getFullYear();

function setCourseLanguage(next){
  courseLang=next;
  document.documentElement.lang=next;
  document.documentElement.dir=next==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-ar]').forEach(element=>{
    const value=element.getAttribute(next==='ar'?'data-ar':'data-en');
    if(value!==null)element.textContent=value;
  });
  document.querySelectorAll('[data-placeholder-ar]').forEach(element=>{
    const value=element.getAttribute(next==='ar'?'data-placeholder-ar':'data-placeholder-en');
    if(value!==null)element.setAttribute('placeholder',value);
  });
  document.querySelectorAll('[data-alt-ar]').forEach(element=>{
    element.alt=element.getAttribute(next==='ar'?'data-alt-ar':'data-alt-en')||'';
  });
  document.querySelectorAll('[data-aria-label-ar]').forEach(element=>{
    element.setAttribute('aria-label',element.getAttribute(next==='ar'?'data-aria-label-ar':'data-aria-label-en')||'');
  });
  courseLangButton.textContent=next==='ar'?'EN':'AR';
  courseLangButton.setAttribute('aria-label',next==='ar'?'Switch to English':'التبديل إلى العربية');
  document.getElementById('menuBtn').setAttribute('aria-label',next==='ar'?'القائمة':'Menu');
  courseThemeButton.setAttribute('aria-label',next==='ar'?'تبديل الوضع الداكن/الفاتح':'Toggle dark/light theme');
  document.title=next==='ar'
    ?'العمل عبر منصات التواصل واستخدام أدوات الذكاء الاصطناعي — Thaer Media'
    :'Working on Social Media Platforms and Using AI Tools — Thaer Media';
  document.getElementById('courseMetaDescription').content=next==='ar'
    ?'دورة وجاهية عن إنشاء وإدارة صفحات فيسبوك وإنستغرام، واتساب للأعمال، Meta Business Suite، التصميم بأدوات الذكاء الاصطناعي والحملات الإعلانية.'
    :'An in-person course covering Facebook and Instagram page management, WhatsApp Business, Meta Business Suite, AI-assisted design, and advertising campaigns.';
  try{localStorage.setItem('lang',next)}catch(error){console.warn('Could not save language preference.',error)}
}

courseLangButton.addEventListener('click',()=>setCourseLanguage(courseLang==='ar'?'en':'ar'));
setCourseLanguage(courseLang);

function applyCourseLogos(theme){
  document.querySelectorAll('.logo').forEach(image=>{
    const logoPath=theme==='light'?'../images/logo-light.png':'../images/logo.png';
    image.src=new URL(logoPath,courseScriptUrl).href;
  });
}

applyCourseLogos(document.documentElement.getAttribute('data-theme')==='light'?'light':'dark');
courseThemeButton.addEventListener('click',()=>{
  const next=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
  if(next==='light')document.documentElement.setAttribute('data-theme','light');
  else document.documentElement.removeAttribute('data-theme');
  try{localStorage.setItem('theme',next)}catch(error){console.warn('Could not save theme preference.',error)}
  applyCourseLogos(next);
});

const menuButton=document.getElementById('menuBtn');
const navigation=document.getElementById('primaryNavigation');

function closeNavigation({restoreFocus=false}={}){
  if(!menuButton||!navigation)return;
  navigation.style.display='';
  menuButton.setAttribute('aria-expanded','false');
  if(restoreFocus)menuButton.focus();
}

menuButton.addEventListener('click',()=>{
  const isOpen=menuButton.getAttribute('aria-expanded')==='true';
  navigation.style.display=isOpen?'none':'flex';
  menuButton.setAttribute('aria-expanded',String(!isOpen));
});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  if(window.matchMedia('(max-width:980px)').matches)closeNavigation();
}));
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){
    closeNavigation({restoreFocus:true});
  }
});
document.addEventListener('pointerdown',event=>{
  if(menuButton.getAttribute('aria-expanded')==='true'&&!event.target.closest('header'))closeNavigation();
});
window.addEventListener('resize',()=>{
  if(window.innerWidth>980&&menuButton.getAttribute('aria-expanded')==='true')closeNavigation();
});

const header=document.querySelector('header');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',window.scrollY>24);
},{passive:true});

function normalizePhone(value){
  return value
    .replace(/[٠-٩۰-۹]/g,digit=>String('٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)%10))
    .trim();
}

function getRegistrationMessage({name,phone,email}){
  if(courseLang==='ar'){
    return [
      'طلب تسجيل في دورة: العمل عبر منصات التواصل واستخدام أدوات الذكاء الاصطناعي',
      `الاسم الكامل: ${name}`,
      `رقم واتساب: ${phone}`,
      `البريد الإلكتروني: ${email}`
    ].join('\n');
  }
  return [
    'Course registration: Working on Social Media Platforms and Using AI Tools',
    `Full name: ${name}`,
    `WhatsApp number: ${phone}`,
    `Email: ${email}`
  ].join('\n');
}

courseForm.addEventListener('submit',event=>{
  event.preventDefault();
  courseFallback.hidden=true;
  courseStatus.hidden=true;
  const formData=new FormData(courseForm);
  const name=String(formData.get('fullName')||'').trim().replace(/\s+/g,' ');
  const rawPhone=String(formData.get('whatsapp')||'');
  const phone=normalizePhone(rawPhone);
  const email=String(formData.get('email')||'').trim();
  const phoneInput=courseForm.elements.namedItem('whatsapp');
  const nameInput=courseForm.elements.namedItem('fullName');
  nameInput.setCustomValidity(name.split(' ').length<2
    ?(courseLang==='ar'?'يرجى إدخال الاسم الكامل.':'Please enter your full name.')
    :'');
  const digits=phone.replace(/\D/g,'');
  phoneInput.setCustomValidity(!/^[+\d\s().-]+$/.test(phone)||digits.length<8||digits.length>15
    ?(courseLang==='ar'?'أدخل رقم واتساب صحيحاً مع رمز الدولة إن أمكن.':'Enter a valid WhatsApp number, including the country code if possible.')
    :'');
  if(!courseForm.reportValidity())return;

  const whatsappNumber=typeof SITE_DATA!=='undefined'?SITE_DATA.contact.whatsappNumber:'';
  if(!/^\d+$/.test(whatsappNumber)){
    courseStatus.dataset.state='error';
    courseStatus.textContent=courseLang==='ar'
      ?'تعذّر تجهيز رابط التسجيل حالياً. يرجى المحاولة لاحقاً.'
      :'The registration link is unavailable right now. Please try again later.';
    courseStatus.hidden=false;
    return;
  }

  const message=getRegistrationMessage({name,phone,email});
  const url=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  courseFallback.href=url;
  const whatsappWindow=window.open(url,'_blank');
  if(whatsappWindow){
    whatsappWindow.opener=null;
    courseStatus.dataset.state='success';
    courseStatus.textContent=courseLang==='ar'
      ?'فُتحت رسالة التسجيل في واتساب. اضغط «إرسال» داخل واتساب لإتمام التسجيل.'
      :'Your registration message is open in WhatsApp. Press Send there to complete your registration.';
  }else{
    courseStatus.dataset.state='error';
    courseStatus.textContent=courseLang==='ar'
      ?'تعذّر فتح واتساب تلقائياً. استخدم الرابط أدناه لمتابعة التسجيل.'
      :'WhatsApp could not open automatically. Use the link below to continue.';
    courseFallback.hidden=false;
    courseFallback.focus();
  }
  courseStatus.hidden=false;
});
