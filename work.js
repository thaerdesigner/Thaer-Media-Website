const workScriptUrl=document.currentScript.src;
const floatingWhatsAppScript=document.createElement('script');
floatingWhatsAppScript.src=new URL('floating-whatsapp.js',workScriptUrl).href;
document.head.append(floatingWhatsAppScript);

// Discourage casual copying of portfolio artwork. Browser/OS screenshots remain possible.
document.addEventListener('contextmenu',event=>{
  if(event.target instanceof Element&&event.target.closest('.gallery-card[data-image],.lightbox-figure img'))event.preventDefault();
});
document.addEventListener('dragstart',event=>{
  if(event.target instanceof Element&&event.target.closest('.gallery-card[data-image],.lightbox-figure img'))event.preventDefault();
});
const menu=document.getElementById('menuBtn');
const navLinks=document.getElementById('primaryNavigation');
function closeMenu({restoreFocus=false}={}){
  if(!menu||!navLinks)return;
  navLinks.style.display='';
  menu.setAttribute('aria-expanded','false');
  if(restoreFocus)menu.focus();
}
menu?.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')==='true';
  navLinks.style.display=open?'none':'flex';
  menu.setAttribute('aria-expanded',String(!open));
});
navLinks?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  if(window.matchMedia('(max-width:980px)').matches)closeMenu();
}));
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){
    closeMenu({restoreFocus:true});
  }
});
document.addEventListener('pointerdown',event=>{
  if(menu?.getAttribute('aria-expanded')==='true'&&!event.target.closest('header'))closeMenu();
});
window.addEventListener('resize',()=>{
  if(window.innerWidth>980&&menu?.getAttribute('aria-expanded')==='true')closeMenu();
});

// Matches the homepage header: subtle background/shadow once scrolled.
const headerEl=document.querySelector('header');
window.addEventListener('scroll',()=>{
  headerEl.classList.toggle('scrolled',window.scrollY>24);
},{passive:true});

const yearEl=document.getElementById('year');
if(yearEl) yearEl.textContent=new Date().getFullYear();

/* تبديل اللغة (نفس آلية main.js بالضبط — كانت هذه الصفحات عربي فقط، صارت
   ثنائية اللغة بطلب العميل). عنوان تبويب المتصفح يُقرأ من window.__pageTitle
   اللي render.js يجهزه حسب الصفحة (اسم خدمة أو "تواصل معنا")، لأنه مش نفس
   العنوان الثابت بكل الصفحات متل ما هو بـmain.js. */
const langBtn=document.getElementById('langBtn');
let lang='ar';
function setLang(next){
  lang=next;
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-ar]').forEach(el=>{
    const value=el.getAttribute(lang==='ar'?'data-ar':'data-en');
    if(value!==null) el.innerHTML=value;
  });
  document.querySelectorAll('[data-alt-ar]').forEach(el=>{
    const value=el.getAttribute(lang==='ar'?'data-alt-ar':'data-alt-en');
    if(value!==null) el.alt=value;
  });
  document.querySelectorAll('[data-placeholder-ar]').forEach(el=>{
    const value=el.getAttribute(lang==='ar'?'data-placeholder-ar':'data-placeholder-en');
    if(value!==null) el.placeholder=value;
  });
  if(langBtn) langBtn.textContent=lang==='ar'?'EN':'AR';
  if(window.__pageTitle) document.title=lang==='ar'?window.__pageTitle.ar:window.__pageTitle.en;
  try{localStorage.setItem('lang',lang)}catch(e){}
}
langBtn?.addEventListener('click',()=>setLang(lang==='ar'?'en':'ar'));
try{
  const savedLang=localStorage.getItem('lang');
  if((savedLang==='en'||savedLang==='ar')&&savedLang!==lang)setLang(savedLang);
}catch(e){}

// Theme toggle: saved state is applied before first paint by a tiny inline
// script in <head> (avoids a flash of the wrong theme) — this handles the
// click + persisting the choice, and also swaps the logo (its wordmark is
// baked white into logo.png, so it needs a pre-recolored logo-light.png
// swapped in via JS rather than a CSS content:url(), which <img> doesn't
// support reliably).
function applyLogos(theme){
  document.querySelectorAll('.logo').forEach(img=>{
    const logoPath=theme==='light'?'../images/logo-light.png':'../images/logo.png';
    img.src=new URL(logoPath,workScriptUrl).href;
  });
}
applyLogos(document.documentElement.getAttribute('data-theme')==='light'?'light':'dark');
const themeBtn=document.getElementById('themeBtn');
themeBtn?.addEventListener('click',()=>{
  const next=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
  if(next==='light')document.documentElement.setAttribute('data-theme','light');
  else document.documentElement.removeAttribute('data-theme');
  try{localStorage.setItem('theme',next)}catch(e){}
  applyLogos(next);
});

/* معرض الصور المكبّر (lightbox) — يفتح فقط للبطاقات اللي عندها صورة حقيقية
   (.gallery-card[data-image]، render.js حطها بس لما SITE_DATA...image تكون
   معبّية). contact.html كمان يحمّل work.js بس ما عندها gallery أصلاً، فهاد
   الجزء ببساطة ما بيسوي شي هناك (lightbox = null). */
(function(){
  const lightbox=document.getElementById('lightbox');
  if(!lightbox) return;
  const imgEl=document.getElementById('lightboxImg');
  const numEl=document.getElementById('lightboxNum');
  const titleEl=document.getElementById('lightboxTitle');
  const descEl=document.getElementById('lightboxDesc');
  const closeBtn=document.getElementById('lightboxClose');
  const prevBtn=document.getElementById('lightboxPrev');
  const nextBtn=document.getElementById('lightboxNext');
  let items=[];
  let current=0;
  let lastTrigger=null;

  function collect(){ items=Array.from(document.querySelectorAll('.gallery-card[data-image]')); }

  function positionLightboxNav(){
    if(!lightbox.open)return;
    const rect=imgEl.getBoundingClientRect();
    if(!rect.width||!rect.height)return;
    const mobile=window.matchMedia('(max-width:640px)').matches;
    const size=prevBtn.getBoundingClientRect().width||48;
    if(mobile){
      const safeBottom=Math.max(18,(parseFloat(getComputedStyle(lightbox).paddingBottom)||110)-92);
      const top=Math.min(rect.bottom+16,window.innerHeight-size-safeBottom);
      prevBtn.style.top=`${Math.max(12,top)}px`;
      nextBtn.style.top=`${Math.max(12,top)}px`;
      prevBtn.style.bottom='auto';
      nextBtn.style.bottom='auto';
      prevBtn.style.left='';
      prevBtn.style.right='';
      nextBtn.style.left='';
      nextBtn.style.right='';
      return;
    }
    const gap=18;
    const rtl=document.documentElement.dir==='rtl';
    const prevLeft=rtl?rect.right+gap:rect.left-gap-size;
    const nextLeft=rtl?rect.left-gap-size:rect.right+gap;
    const maxLeft=window.innerWidth-size-12;
    prevBtn.style.left=`${Math.max(12,Math.min(maxLeft,prevLeft))}px`;
    nextBtn.style.left=`${Math.max(12,Math.min(maxLeft,nextLeft))}px`;
    prevBtn.style.right='auto';
    nextBtn.style.right='auto';
    const top=rect.top+rect.height/2;
    prevBtn.style.top=`${top}px`;
    nextBtn.style.top=`${top}px`;
  }

  function show(index){
    if(!items.length) return;
    current=(index+items.length)%items.length;
    const card=items[current];
    imgEl.loading='eager';
    imgEl.fetchPriority='high';
    imgEl.src=card.getAttribute('data-image');
    requestAnimationFrame(positionLightboxNav);
    for(const offset of [-1,1]){
      const neighbor=items[(current+offset+items.length)%items.length];
      if(neighbor){const preload=new Image();preload.src=neighbor.getAttribute('data-image');}
    }
    const h2=card.querySelector('.gallery-overlay h2');
    const p=card.querySelector('.gallery-overlay p');
    const span=card.querySelector('.gallery-overlay span');
    numEl.textContent=span?span.textContent:'';
    // نفس سمة data-ar/data-en المستخدمة بكل الموقع — هيك لو المستخدم بدّل اللغة
    // والـlightbox مفتوح، setLang() (اللي أصلاً بتمسح كل [data-ar]) بتحدّث
    // الكابشن هون تلقائياً من غير أي كود إضافي.
    const titleAr=h2.getAttribute('data-ar')||h2.textContent;
    const titleEn=h2.getAttribute('data-en')||h2.textContent;
    const descAr=p.getAttribute('data-ar')||p.textContent;
    const descEn=p.getAttribute('data-en')||p.textContent;
    titleEl.setAttribute('data-ar',titleAr);
    titleEl.setAttribute('data-en',titleEn);
    titleEl.innerHTML=h2.innerHTML;
    descEl.setAttribute('data-ar',descAr);
    descEl.setAttribute('data-en',descEn);
    descEl.innerHTML=p.innerHTML;
    imgEl.setAttribute('data-alt-ar',`${titleAr}. ${descAr}`);
    imgEl.setAttribute('data-alt-en',`${titleEn}. ${descEn}`);
    imgEl.alt=document.documentElement.lang==='en'?`${titleEn}. ${descEn}`:`${titleAr}. ${descAr}`;
    const multi=items.length>1;
    prevBtn.style.display=multi?'':'none';
    nextBtn.style.display=multi?'':'none';
  }

  function openAt(index){
    collect();
    show(index);
    if(typeof lightbox.showModal==='function') lightbox.showModal();
    else lightbox.setAttribute('open','');
    document.body.style.overflow='hidden';
    requestAnimationFrame(()=>requestAnimationFrame(()=>lightbox.classList.add('is-open')));
  }

  function close(){
    lightbox.classList.remove('is-open');
    document.body.style.overflow='';
    // Close the native dialog immediately so the X always works, even if
    // the figure transition does not emit transitionend on the dialog.
    try {
      if (lightbox.open && typeof lightbox.close === 'function') lightbox.close();
      else lightbox.removeAttribute('open');
    } catch (_) {
      lightbox.removeAttribute('open');
    }
    if(lastTrigger) lastTrigger.focus();
  }

  document.addEventListener('click', e=>{
    const card=e.target.closest('.gallery-card[data-image]');
    if(!card) return;
    collect();
    lastTrigger=card;
    openAt(items.indexOf(card));
  });
  document.addEventListener('keydown', e=>{
    if((e.key==='Enter'||e.key===' ') && e.target.matches && e.target.matches('.gallery-card[data-image]')){
      e.preventDefault();
      collect();
      lastTrigger=e.target;
      openAt(items.indexOf(e.target));
    }
  });

  closeBtn.addEventListener('click', close);
  imgEl.addEventListener('load',positionLightboxNav);
  lightbox.querySelector('.lightbox-figure').addEventListener('transitionend',positionLightboxNav);
  window.addEventListener('resize',positionLightboxNav,{passive:true});
  new MutationObserver(positionLightboxNav).observe(document.documentElement,{attributes:true,attributeFilter:['dir']});
  prevBtn.addEventListener('click', ()=>show(current-1));
  nextBtn.addEventListener('click', ()=>show(current+1));
  let swipeStart=null;
  const touchDevice=window.matchMedia('(hover: none) and (pointer: coarse)');
  lightbox.addEventListener('touchstart',event=>{
    if(!touchDevice.matches||event.touches.length!==1||!event.target.closest('.lightbox-figure'))return;
    swipeStart={x:event.touches[0].clientX,y:event.touches[0].clientY};
  },{passive:true});
  lightbox.addEventListener('touchend',event=>{
    if(!swipeStart)return;
    const deltaX=event.changedTouches[0].clientX-swipeStart.x;
    const deltaY=event.changedTouches[0].clientY-swipeStart.y;
    swipeStart=null;
    if(Math.abs(deltaX)<30||Math.abs(deltaX)<Math.abs(deltaY)*1.15)return;
    const forward=document.documentElement.dir==='rtl'?deltaX>0:deltaX<0;
    show(current+(forward?1:-1));
  },{passive:true});
  lightbox.addEventListener('touchcancel',()=>{swipeStart=null},{passive:true});
  lightbox.addEventListener('click', e=>{ if(e.target===lightbox) close(); });
  // Esc الأصلية للـ<dialog> بتسكر فوراً من غير أنيميشن — منعها ومنعمل close()
  // العادية حتى تشتغل نفس حركة الإغلاق بكل الطرق.
  lightbox.addEventListener('cancel', e=>{ e.preventDefault(); close(); });
  document.addEventListener('keydown', e=>{
    if(!lightbox.open) return;
    if(e.key==='Escape'){
      e.preventDefault();
      close();
    }
    if(e.key==='ArrowRight') show(current+1);
    if(e.key==='ArrowLeft') show(current-1);
  });
})();
