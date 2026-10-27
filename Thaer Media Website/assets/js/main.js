const floatingWhatsAppScript=document.createElement('script');
floatingWhatsAppScript.src=new URL('floating-whatsapp.js',document.currentScript.src).href;
document.head.append(floatingWhatsAppScript);

// Discourage casual copying of portfolio artwork. Browser/OS screenshots remain possible.
document.addEventListener('contextmenu',event=>{
  if(event.target instanceof Element&&event.target.closest('.gallery-card[data-image],.lightbox-figure img'))event.preventDefault();
});
document.addEventListener('dragstart',event=>{
  if(event.target instanceof Element&&event.target.closest('.gallery-card[data-image],.lightbox-figure img'))event.preventDefault();
});

// Service cards scroll to the matching work card without leaving the homepage.
// If a service has no matching work card (e.g. Marketing Solutions), fall back
// to the card's own href (its dedicated work-*.html page).
document.querySelectorAll('#services .service[data-service-target]').forEach(card=>{
  card.addEventListener('click',event=>{
    const key=card.getAttribute('data-service-target');
    const target=document.querySelector(`#work .work-card[data-service=\"${key}\"]`);
    if(target){
      event.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});
      document.querySelectorAll('#work .work-card.service-focus').forEach(c=>c.classList.remove('service-focus'));
      target.classList.add('service-focus');
      clearTimeout(target._focusTimer);
      target._focusTimer=setTimeout(()=>target.classList.remove('service-focus'),2200);
    }
  });
});

// Header: subtle background/shadow once scrolled, and highlight the nav link
// for whichever section is currently in view.
const headerEl=document.querySelector('header');
window.addEventListener('scroll',()=>{
  headerEl.classList.toggle('scrolled',window.scrollY>24);
},{passive:true});

const navAnchors=document.querySelectorAll('.navlinks a[href^="#"]');
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id=entry.target.id||'home';
      navAnchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`));
    }
  });
},{rootMargin:'-40% 0px -55% 0px'});
// The hero section has no id of its own — treat it as "#home" so "الرئيسية"
// lights up while the user is at the top, before any other section is reached.
document.querySelectorAll('.hero, section[id]').forEach(s=>sectionObserver.observe(s));

const langBtn=document.getElementById('langBtn');
let lang='ar';
let activeAdSlide=0;
let adPosition=1;
let adTransitioning=false;
let activeTestimonialSlide=0;
let testimonialPosition=1;
let testimonialTransitioning=false;
function positionAdSlider(reset=false){
  const track=document.querySelector('#adSlider .ad-slider-track');
  if(!track) return;
  if(reset){
    adPosition=activeAdSlide+1;
    adTransitioning=false;
  }
  const direction=document.documentElement.dir==='rtl'?1:-1;
  if(reset) track.style.transition='none';
  track.style.transform=`translateX(${adPosition*direction*-100}%)`;
  if(reset){
    track.offsetWidth;
    track.style.removeProperty('transition');
  }
}
function positionTestimonialSlider(reset=false){
  const track=document.querySelector('#testimonialSlider .testimonials-track');
  if(!track) return;
  if(reset) testimonialPosition=activeTestimonialSlide+1;
  const direction=document.documentElement.dir==='rtl'?1:-1;
  if(reset){
    testimonialTransitioning=false;
    track.style.transition='none';
  }
  track.style.transform=`translateX(${testimonialPosition*direction*-100}%)`;
  if(reset){
    track.offsetWidth;
    track.style.removeProperty('transition');
  }
}
function fitTestimonialHeight(){
  const slider=document.getElementById('testimonialSlider');
  if(!slider) return;
  if(window.innerWidth>980){
    slider.style.removeProperty('height');
    return;
  }
  const slide=slider.querySelector('.testimonial.active');
  const content=slide?.firstElementChild;
  if(!slide||!content) return;
  const style=getComputedStyle(slide);
  const contentHeight=[...content.children].reduce((height,child)=>{
    const childStyle=getComputedStyle(child);
    return height+child.getBoundingClientRect().height+
      parseFloat(childStyle.marginTop)+parseFloat(childStyle.marginBottom);
  },0);
  const verticalPadding=parseFloat(style.paddingTop)+parseFloat(style.paddingBottom);
  slider.style.height=`${Math.ceil(contentHeight+verticalPadding+2)}px`;
}
function updateWorkCovers(){
  const arts=[...document.querySelectorAll('.work-art[data-cover-ar]')];
  const loadCover=art=>{
    const src=art.getAttribute('data-cover-ar');
    if(src) art.style.backgroundImage=`url(\"${src}\")`;
  };
  if(!('IntersectionObserver' in window)){arts.forEach(loadCover);return;}
  const coverObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      loadCover(entry.target);
      coverObserver.unobserve(entry.target);
    });
  },{rootMargin:'400px 0px'});
  arts.forEach(art=>coverObserver.observe(art));
}
function updateAdSlideImages(){
  const slides=[...document.querySelectorAll('#adSlider .ad-slide')];
  const originalSlides=slides.filter(slide=>!slide.dataset.slideClone);
  originalSlides.forEach((slide,index)=>{slide.dataset.slideIndex=String(index)});
  const nextSlide=(activeAdSlide+1)%originalSlides.length;
  slides.forEach(slide=>{
    const slideIndex=Number(slide.dataset.slideIndex);
    if(slideIndex!==activeAdSlide&&slideIndex!==nextSlide)return;
    const image=slide.querySelector('img[data-slide-ar][data-slide-en]');
    if(!image)return;
    const source=image.getAttribute(lang==='ar'?'data-slide-ar':'data-slide-en');
    if(image.dataset.loadedSource!==source){
      image.src=source;
      image.dataset.loadedSource=source;
    }
  });
  requestAnimationFrame(fitAdRegisterButtons);
}
function fitAdRegisterButtons(){
  const mobile=window.matchMedia('(max-width:640px)').matches;
  document.querySelectorAll('#adSlider .ad-slide').forEach(slide=>{
    const button=slide.querySelector('.ad-slide-register');
    const image=slide.querySelector('.ad-slide-link img');
    if(!button||!image)return;
    if(!mobile){
      ['left','right','top','width','height'].forEach(property=>button.style.removeProperty(property));
      return;
    }
    if(!image.complete||image.naturalWidth<=1||!image.naturalHeight)return;
    const box=slide.getBoundingClientRect();
    if(!box.width||!box.height)return;
    const scale=Math.max(box.width/image.naturalWidth,box.height/image.naturalHeight);
    const renderedWidth=image.naturalWidth*scale;
    const cropX=(renderedWidth-box.width)/2;
    const visibleStart=cropX/renderedWidth;
    const visibleEnd=(cropX+box.width)/renderedWidth;
    const textRange=lang==='ar'?[.09,.66]:[.35,.92];
    const textStart=Math.max(visibleStart,textRange[0]);
    const textEnd=Math.min(visibleEnd,textRange[1]);
    const textCenter=textEnd>textStart?(textStart+textEnd)/2:(textRange[0]+textRange[1])/2;
    button.style.left=`${(textCenter*renderedWidth-cropX)/box.width*100}%`;
    button.style.right='auto';
    button.style.top='79.3%';
    button.style.width='max-content';
    button.style.height='auto';
  });
}

function setLang(next){
  lang=next;
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-ar]').forEach(el=>{
    const value=el.getAttribute(lang==='ar'?'data-ar':'data-en');
    if(value!==null) el.innerHTML=value;
  });
  document.querySelectorAll('#adSlider [data-label-ar], #testimonialSlider [data-label-ar]').forEach(el=>{
    el.setAttribute('aria-label',el.getAttribute(lang==='ar'?'data-label-ar':'data-label-en'));
  });
  updateAdSlideImages();
  langBtn.textContent=lang==='ar'?'EN':'AR';
  document.title=window.__pageTitle
    ?(lang==='ar'?window.__pageTitle.ar:window.__pageTitle.en)
    :(lang==='ar'?'Thaer Media — نوظِّفُ خبرتنا لنجــاح علامتـــك التجاريــة':'Thaer Media — We turn experience into brand success');
  try{localStorage.setItem('lang',lang)}catch(e){}
}
langBtn.addEventListener('click',()=>setLang(lang==='ar'?'en':'ar'));
updateWorkCovers();

function resetHeadingStyles(){
  document.querySelectorAll('.section-head h2,.hero h1 span,.cta h2').forEach(element=>{
    element.style.removeProperty('font-size');
    element.style.removeProperty('white-space');
  });
}
/* بعد تبديل اللغة يتغيّر المحتوى، فيُعاد الضبط */
const _setLang=setLang;
setLang=function(next){_setLang(next);positionAdSlider(true);positionTestimonialSlider(true);requestAnimationFrame(()=>{resetHeadingStyles();fitTestimonialHeight()});};
window.__applyLanguage=setLang;
/* استرجاع لغة محفوظة من زيارة سابقة (اتجاه RTL/LTR يُضبط أبكر من هذا في
   سكربت مضمّن داخل <head> لتفادي "قفزة" التخطيط؛ هذا الجزء يبدّل نص
   العناصر فعلياً عبر setLang الكاملة). */
try{
  const savedLang=localStorage.getItem('lang');
  if((savedLang==='en'||savedLang==='ar')&&savedLang!==lang)setLang(savedLang);
}catch(e){}
let resizeT;
window.addEventListener('resize',()=>{clearTimeout(resizeT);resizeT=setTimeout(()=>{resetHeadingStyles();fitTestimonialHeight();fitAdRegisterButtons()},150);});
window.addEventListener('load',()=>{resetHeadingStyles();fitTestimonialHeight();fitAdRegisterButtons()});
document.fonts?.ready.then(fitTestimonialHeight);
resetHeadingStyles();

const yearsCounter=document.getElementById('yearsCounter');
if(yearsCounter){
  // الرقم المستهدف (عدد سنوات الخبرة) يُقرأ من data.js بدل ما يكون ثابتاً هون
  const targetYears=(typeof SITE_DATA!=='undefined'&&SITE_DATA.home&&SITE_DATA.home.hero.yearsOfExperience)||12;
  const duration=1100;
  const start=performance.now();
  function countYears(now){
    const progress=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-progress,3);
    yearsCounter.textContent=String(Math.max(1,Math.round(eased*targetYears)));
    if(progress<1) requestAnimationFrame(countYears);
  }
  requestAnimationFrame(countYears);
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')});
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

/* الـ.in أعلاه دائم (لتأثير الظهور) ولا يُزال أبداً، لذلك لا يصلح كمفتاح لتشغيل
   حركة التوهج الضبابية خلف كروت الخدمات/الأعمال — لو اعتمدنا عليه فقط تبقى كل
   حركة تعمل إلى الأبد بعد أول ظهور لها حتى بعد خروج الكرت من الشاشة، وهذا يُبطئ
   السكرول تراكمياً كل ما مرّ المستخدم على كروت أكثر. مراقب منفصل يشغّل
   ويوقف glow-active حسب الظهور الفعلي الحالي فقط. */
const glowObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>e.target.classList.toggle('glow-active',e.isIntersecting));
},{rootMargin:'200px 0px',threshold:0});
document.querySelectorAll('.service, .work-card').forEach(el=>glowObserver.observe(el));

const adSlider=document.getElementById('adSlider');
if(adSlider){
  const adSlides=[...adSlider.querySelectorAll('.ad-slide')];
  adSlides.forEach((slide,index)=>{slide.dataset.slideIndex=String(index)});
  adSlider.querySelectorAll('.ad-slide-link img').forEach(image=>image.addEventListener('load',fitAdRegisterButtons));
  const adDots=[...adSlider.querySelectorAll('.ad-slider-dots button')];
  const track=adSlider.querySelector('.ad-slider-track');
  const firstClone=adSlides[0].cloneNode(true);
  const lastClone=adSlides[adSlides.length-1].cloneNode(true);
  firstClone.classList.remove('active');
  lastClone.classList.remove('active');
  firstClone.dataset.slideClone='first';
  firstClone.dataset.slideIndex='0';
  lastClone.dataset.slideClone='last';
  lastClone.dataset.slideIndex=String(adSlides.length-1);
  firstClone.setAttribute('aria-hidden','true');
  lastClone.setAttribute('aria-hidden','true');
  firstClone.querySelectorAll('a').forEach(link=>link.tabIndex=-1);
  lastClone.querySelectorAll('a').forEach(link=>link.tabIndex=-1);
  track.append(firstClone);
  track.prepend(lastClone);
  fitAdRegisterButtons();
  let adTimer;
  function updateAdSlide(index){
    activeAdSlide=(index+adSlides.length)%adSlides.length;
    updateAdSlideImages();
    adSlides.forEach((item,i)=>{
      const active=i===activeAdSlide;
      item.classList.toggle('active',active);
      item.setAttribute('aria-hidden',String(!active));
      if(adDots[i]){
        adDots[i].classList.toggle('active',active);
        adDots[i].setAttribute('aria-current',String(active));
      }
    });
  }
  function moveAdSlide(step){
    if(adTransitioning) positionAdSlider(true);
    activeAdSlide=(activeAdSlide+step+adSlides.length)%adSlides.length;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      positionAdSlider(true);
    }else{
      adPosition+=step;
      positionAdSlider();
      adTransitioning=true;
    }
    updateAdSlide(activeAdSlide);
  }
  function moveAdSlideByPhysicalDirection(direction){
    const directionMultiplier=document.documentElement.dir==='rtl'?1:-1;
    moveAdSlide(direction*directionMultiplier);
  }
  function selectAdSlide(index){
    if(adTransitioning) positionAdSlider(true);
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      updateAdSlide(index);
      positionAdSlider(true);
      return;
    }
    adPosition=index+1;
    positionAdSlider();
    adTransitioning=true;
    updateAdSlide(index);
  }
  track.addEventListener('transitionend',event=>{
    if(event.target!==track||event.propertyName!=='transform') return;
    if(adPosition===0) adPosition=adSlides.length;
    else if(adPosition===adSlides.length+1) adPosition=1;
    else{
      adTransitioning=false;
      return;
    }
    positionAdSlider(true);
  });
  track.addEventListener('transitioncancel',()=>{adTransitioning=false});
  positionAdSlider(true);
  updateAdSlide(activeAdSlide);
  function startAdTimer(){
    clearInterval(adTimer);
    if(adSlides.length<=1||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    adTimer=setInterval(()=>{
      const directionMultiplier=document.documentElement.dir==='rtl'?1:-1;
      moveAdSlide(directionMultiplier);
    },3000);
  }
  adSlider.querySelector('.ad-slider-prev').addEventListener('click',()=>{moveAdSlideByPhysicalDirection(-1);startAdTimer()});
  adSlider.querySelector('.ad-slider-next').addEventListener('click',()=>{moveAdSlideByPhysicalDirection(1);startAdTimer()});
  adDots.forEach((dot,index)=>dot.addEventListener('click',()=>{selectAdSlide(index);startAdTimer()}));
  adSlider.addEventListener('mouseenter',()=>clearInterval(adTimer));
  adSlider.addEventListener('mouseleave',startAdTimer);
  adSlider.addEventListener('focusin',()=>clearInterval(adTimer));
  adSlider.addEventListener('focusout',event=>{if(!adSlider.contains(event.relatedTarget))startAdTimer()});
  startAdTimer();
}

const testimonialSlider=document.getElementById('testimonialSlider');
if(testimonialSlider){
  const testimonialSlides=[...testimonialSlider.querySelectorAll('.testimonial')];
  const testimonialDots=[...testimonialSlider.querySelectorAll('.ad-slider-dots button')];
  const testimonialTrack=testimonialSlider.querySelector('.testimonials-track');
  if(testimonialSlides.length){
    const firstTestimonialClone=testimonialSlides[0].cloneNode(true);
    const lastTestimonialClone=testimonialSlides[testimonialSlides.length-1].cloneNode(true);
    firstTestimonialClone.classList.remove('active');
    lastTestimonialClone.classList.remove('active');
    firstTestimonialClone.setAttribute('aria-hidden','true');
    lastTestimonialClone.setAttribute('aria-hidden','true');
    testimonialTrack.append(firstTestimonialClone);
    testimonialTrack.prepend(lastTestimonialClone);

    function updateTestimonialSlide(index){
      activeTestimonialSlide=(index+testimonialSlides.length)%testimonialSlides.length;
      testimonialSlides.forEach((item,i)=>{
        const active=i===activeTestimonialSlide;
        item.classList.toggle('active',active);
        item.setAttribute('aria-hidden',String(!active));
        if(testimonialDots[i]){
          testimonialDots[i].classList.toggle('active',active);
          testimonialDots[i].setAttribute('aria-current',String(active));
        }
      });
      fitTestimonialHeight();
    }
    function moveTestimonialSlide(step){
      if(testimonialTransitioning) positionTestimonialSlider(true);
      activeTestimonialSlide=(activeTestimonialSlide+step+testimonialSlides.length)%testimonialSlides.length;
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        positionTestimonialSlider(true);
      }else{
        testimonialPosition+=step;
        positionTestimonialSlider();
        testimonialTransitioning=true;
      }
      updateTestimonialSlide(activeTestimonialSlide);
    }
    function moveTestimonialSlideByPhysicalDirection(direction){
      const directionMultiplier=document.documentElement.dir==='rtl'?1:-1;
      moveTestimonialSlide(direction*directionMultiplier);
    }
    function selectTestimonialSlide(index){
      if(testimonialTransitioning) positionTestimonialSlider(true);
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        updateTestimonialSlide(index);
        positionTestimonialSlider(true);
        return;
      }
      testimonialPosition=index+1;
      positionTestimonialSlider();
      testimonialTransitioning=true;
      updateTestimonialSlide(index);
    }
    testimonialTrack.addEventListener('transitionend',event=>{
      if(event.target!==testimonialTrack||event.propertyName!=='transform') return;
      if(testimonialPosition===0) testimonialPosition=testimonialSlides.length;
      else if(testimonialPosition===testimonialSlides.length+1) testimonialPosition=1;
      else{
        testimonialTransitioning=false;
        return;
      }
      positionTestimonialSlider(true);
    });
    testimonialTrack.addEventListener('transitioncancel',()=>{testimonialTransitioning=false});
    positionTestimonialSlider(true);
    updateTestimonialSlide(activeTestimonialSlide);

    let testimonialTimer;
    function startTestimonialTimer(){
      clearInterval(testimonialTimer);
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      testimonialTimer=setInterval(()=>{
        const directionMultiplier=document.documentElement.dir==='rtl'?1:-1;
        moveTestimonialSlide(directionMultiplier);
      },3000);
    }
    testimonialSlider.querySelector('.ad-slider-prev').addEventListener('click',()=>{
      moveTestimonialSlideByPhysicalDirection(-1);
      startTestimonialTimer();
    });
    testimonialSlider.querySelector('.ad-slider-next').addEventListener('click',()=>{
      moveTestimonialSlideByPhysicalDirection(1);
      startTestimonialTimer();
    });
    testimonialDots.forEach((dot,index)=>dot.addEventListener('click',()=>{
      selectTestimonialSlide(index);
      startTestimonialTimer();
    }));
    testimonialSlider.addEventListener('mouseenter',()=>clearInterval(testimonialTimer));
    testimonialSlider.addEventListener('mouseleave',startTestimonialTimer);
    testimonialSlider.addEventListener('focusin',()=>clearInterval(testimonialTimer));
    testimonialSlider.addEventListener('focusout',event=>{
      if(!testimonialSlider.contains(event.relatedTarget)) startTestimonialTimer();
    });
    startTestimonialTimer();
  }
}

document.getElementById('year').textContent=new Date().getFullYear();

const menu=document.getElementById('menuBtn');
const navLinks=document.getElementById('primaryNavigation');
function closeMenu({restoreFocus=false}={}){
  if(!menu||!navLinks)return;
  navLinks.style.display='';
  navLinks.classList.remove('glass');
  menu.setAttribute('aria-expanded','false');
  if(restoreFocus)menu.focus();
}
menu?.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')==='true';
  navLinks.style.display=open?'none':'flex';
  navLinks.classList.toggle('glass',!open);
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

/* أزرار تبديل الثيم (فاتح/داكن): تُقرأ الحالة المحفوظة قبل أي رسم بواسطة
   سكربت مضمّن صغير في <head> (لتفادي وميض الثيم الخاطئ عند التحميل) —
   هذا الجزء يتعامل مع النقر والحفظ، وأيضاً تبديل شعار الهيدر/الفوتر: نص
   الشعار الأبيض مرسوم داخل الصورة نفسها (logo.png)، فما بيتلوّن تلقائياً مع
   الثيم عبر CSS وحده — بدّلنا لنسخة logo-light.png (نفس الشعار بنص داكن
   ولون ذهبي ثابت) عبر JS بدل الاعتماد على content:url() في CSS، لأنه غير
   مدعوم بثبات لعنصر <img>. */
function applyLogos(theme){
  document.querySelectorAll('.logo').forEach(img=>{
    img.src=theme==='light'?'assets/images/logo-light.png':'assets/images/logo.png';
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
