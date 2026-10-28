/* ============================================================
   render.js — يبني محتوى الصفحة من data.js عند كل تحميل
   ============================================================
   هذا الملف تقني بحت (ما تحتاج تعدّل فيه شي لتغيير نصوص/صور
   الموقع — هاد كله بملف data.js). لازم يتحمّل بعد data.js
   وقبل main.js/work.js حتى تكون كل عناصر الصفحة جاهزة قبل ما
   تشتغل باقي السكربتات عليها (السلايدر، تأثيرات الظهور...).

   الفكرة: يبني كل قسم مرة وحدة بس، بنفس نمط data-ar/data-en اللي
   الموقع أصلاً يعتمد عليه لتبديل اللغة — فبعد ما render.js يخلص،
   main.js ما بيحتاج يعرف إنه المحتوى كان أصلاً جاي من data.js
   بدل ما يكون مكتوب يدوياً بالـHTML، وكل شي (تبديل اللغة، صور
   الأعمال حسب اللغة، أزرار الكاروسيل...) بيستمر يشتغل تماماً متل
   ما كان.
   ============================================================ */

(function(){
  const D = typeof SITE_DATA !== 'undefined' ? SITE_DATA : null;
  if (!D) return;
  const assetRoot=location.protocol==='file:'&&document.currentScript
    ?new URL('../../',document.currentScript.src).href
    :new URL('/',location.href).href;

  function escAttr(str){
    return String(str==null?'':str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function assetUrl(path){
    const value=String(path==null?'':path);
    if(/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value))return value;
    return new URL(value.replace(/^\/+/, ''),assetRoot).href;
  }
  function get(path){
    return path.split('.').reduce((o,k)=>(o==null?undefined:o[k]), D);
  }
  // قيمة الحقل تصير {ar,en} دايماً (لو كانت نص عادي، نفس النص باللغتين)
  function two(value){
    if (value == null) return {ar:'', en:''};
    if (typeof value === 'string') return {ar:value, en:value};
    return {ar: value.ar!=null?value.ar:'', en: value.en!=null?value.en:(value.ar!=null?value.ar:'')};
  }
  function setBilingual(el, arVal, enVal){
    el.setAttribute('data-ar', arVal);
    el.setAttribute('data-en', enVal);
    el.innerHTML = arVal;
  }
  function bilingualAttrs(value){
    const {ar,en} = two(value);
    return `data-ar="${escAttr(ar)}" data-en="${escAttr(en)}"`;
  }
  function bilingualHtml(value){
    const {ar} = two(value);
    return ar;
  }

  /* ---------- حقول مفردة عن طريق data-key / data-key-img / data-key-href ---------- */
  function renderKeyed(){
    document.querySelectorAll('[data-key]').forEach(el=>{
      const value = get(el.getAttribute('data-key'));
      const {ar,en} = two(value);
      setBilingual(el, ar, en);
    });
    document.querySelectorAll('[data-key-img]').forEach(el=>{
      const value = get(el.getAttribute('data-key-img'));
      if (typeof value === 'string' && value) el.src = value;
    });
    document.querySelectorAll('[data-key-href]').forEach(el=>{
      const value = get(el.getAttribute('data-key-href'));
      if (typeof value === 'string' && value) el.href = value;
    });
  }

  /* ---------- التنقل بالهيدر ---------- */
  function renderNav(isHome){
    const nav = document.querySelector('.navlinks');
    if (!nav) return;
    nav.innerHTML = D.nav.map(item=>{
      const href = item.href.charAt(0)==='#'
        ? (isHome?item.href:('/'+item.href))
        : item.href;
      return `<a href="${href}" ${bilingualAttrs({ar:item.ar,en:item.en})}>${escAttr(item.ar)}</a>`;
    }).join('');
  }

  /* ---------- أيقونات منصات التواصل (تُستخدم بفوتر كل صفحة) ---------- */
  const SOCIAL_ICON_PATHS = {
    whatsapp: {brand:true, d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"},
    email: {brand:false, custom:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22 6 12 13 2 6"></polyline>'},
    instagram: {brand:true, d:"M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"},
    facebook: {brand:true, d:"M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"},
    linkedin: {brand:true, d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"},
    behance: {brand:true, d:"M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"},
    x: {brand:true, d:"M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"},
    threads: {brand:true, d:"M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z"},
    tiktok: {brand:true, d:"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"},
    snapchat: {brand:true, d:"M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"}
  };
  const SOCIAL_LABELS = {whatsapp:'WhatsApp', email:'Email', instagram:'Instagram', facebook:'Facebook', linkedin:'LinkedIn', behance:'Behance', x:'X', threads:'Threads', tiktok:'TikTok', snapchat:'Snapchat'};
  function socialIconHtml(key, url){
    const icon = SOCIAL_ICON_PATHS[key];
    if (!icon) return '';
    const label = SOCIAL_LABELS[key] || key;
    const inner = icon.custom ? icon.custom : `<path d="${icon.d}"></path>`;
    const svgClass = icon.brand ? ' class="brand"' : '';
    const external = /^https?:\/\//.test(url) ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${escAttr(url)}"${external} aria-label="${label}"><svg viewBox="0 0 24 24"${svgClass}>${inner}</svg></a>`;
  }

  /* ---------- الفوتر (كل الصفحات) ---------- */
  function renderFooter(isHome){
    const tagline = document.getElementById('footerTagline');
    if (tagline) setBilingual(tagline, two(D.footer.tagline).ar, two(D.footer.tagline).en);

    const linksTitle = document.getElementById('footerLinksTitle');
    if (linksTitle) setBilingual(linksTitle, two(D.footer.linksTitle).ar, two(D.footer.linksTitle).en);

    const linksList = document.getElementById('footerLinksList');
    if (linksList){
      const items = [D.nav[1], D.nav[2], D.nav[3], D.nav[6]]; // الخدمات، أعمالنا، من نحن، تواصل
      linksList.innerHTML = items.map(it=>{
        const href = it.href.charAt(0)==='#' ? (isHome?it.href:('/'+it.href)) : it.href;
        return `<a href="${href}" ${bilingualAttrs({ar:it.ar,en:it.en})}>${escAttr(it.ar)}</a>`;
      }).join('');
    }

    const svcTitle = document.getElementById('footerServicesTitle');
    if (svcTitle) setBilingual(svcTitle, two(D.footer.servicesTitle).ar, two(D.footer.servicesTitle).en);

    const svcList = document.getElementById('footerServicesList');
    if (svcList){
      const href = isHome ? '#services' : '/#services';
      svcList.innerHTML = D.footer.servicesList.map(s=>`<a href="${href}" ${bilingualAttrs(s)}>${escAttr(two(s).ar)}</a>`).join('');
    }

    const contactTitle = document.getElementById('footerContactTitle');
    if (contactTitle) setBilingual(contactTitle, two(D.footer.contactTitle).ar, two(D.footer.contactTitle).en);

    const socials = document.getElementById('footerSocials');
    if (socials) socials.innerHTML = D.socials.map(s=>socialIconHtml(s.key, s.url)).join('');

    const copy = document.getElementById('copyText');
    if (copy) setBilingual(copy, two(D.footer.copyright).ar, two(D.footer.copyright).en);
  }

  /* ---------- الصفحة الرئيسية: خدماتنا ---------- */
  function renderServices(){
    const grid = document.querySelector('.services-grid');
    if (!grid) return;
    grid.innerHTML = D.home.services.map(s=>`
      <a class="service glass reveal" href="${escAttr(s.href)}" data-service-target="${escAttr(s.slug)}">
        <div class="icon" aria-hidden="true"><img src="${escAttr(s.icon)}" alt="" loading="lazy" decoding="async"></div>
        <h3 ${bilingualAttrs(s.title)}>${escAttr(two(s.title).ar)}</h3>
        <p ${bilingualAttrs(s.desc)}>${escAttr(two(s.desc).ar)}</p>
      </a>`).join('');
  }

  /* ---------- الصفحة الرئيسية: مختارات من أعمالنا ---------- */
  function renderWorkTeaser(){
    const grid = document.querySelector('#work .work-grid');
    if (!grid) return;
    const order={social:0,identity:1,print:2,ads:3,content:4};
    const workItems=[...D.home.workTeaser].sort((a,b)=>(order[a.slug]??99)-(order[b.slug]??99));
    grid.innerHTML = workItems.map(w=>`
      <a class="work-card glass reveal" href="${escAttr(w.href)}" data-service="${escAttr(w.slug)}">
        <div class="work-art" data-cover-ar="${escAttr(w.coverAr)}" data-cover-en="${escAttr(w.coverEn)}"></div>
        <div class="work-overlay">
          <span>${escAttr(w.badge)}</span>
          <h3 ${bilingualAttrs(w.title)}>${escAttr(two(w.title).ar)}</h3>
          <p ${bilingualAttrs(w.desc)}>${escAttr(two(w.desc).ar)}</p>
        </div>
      </a>`).join('');
  }

  /* ---------- الصفحة الرئيسية: كيف نعمل ---------- */
  function renderProcess(){
    const grid = document.querySelector('#process .process');
    if (!grid) return;
    grid.innerHTML = D.home.process.map(p=>`
      <article class="step glass reveal">
        <div class="step-num">${escAttr(p.num)}</div>
        <h3 ${bilingualAttrs(p.title)}>${escAttr(two(p.title).ar)}</h3>
        <p ${bilingualAttrs(p.desc)}>${escAttr(two(p.desc).ar)}</p>
      </article>`).join('');
  }

  /* ---------- الصفحة الرئيسية: آراء العملاء ---------- */
  function renderTestimonials(){
    const slides = document.getElementById('slides');
    const dots = document.getElementById('dots');
    if (!slides || !dots) return;
    slides.innerHTML = D.home.testimonials.map(t=>`
      <article class="testimonial">
        <div>
          <div class="stars">★★★★★</div>
          <div class="quote" ${bilingualAttrs(t.quote)}>${escAttr(two(t.quote).ar)}</div>
          <div class="author" ${bilingualAttrs(t.author)}>${escAttr(two(t.author).ar)}</div>
        </div>
      </article>`).join('');
    dots.innerHTML = D.home.testimonials.map((_,i)=>`<button type="button"${i===0?' class="active" aria-current="true"':' aria-current="false"'} data-label-ar="الرأي ${i+1}" data-label-en="Review ${i+1}" aria-label="الرأي ${i+1}"></button>`).join('');
  }

  /* ---------- صفحات الأعمال الستة: معرض الصور ---------- */
  function renderWorkPage(slug, root=document){
    const page = D.work[slug];
    if (!page) return;
    const titleEl = root.querySelector('.section-title-wrap h1');
    if (titleEl) setBilingual(titleEl, two(page.title).ar, two(page.title).en);
    const descEl = root.querySelector('.section-head > p');
    if (descEl) setBilingual(descEl, two(page.description).ar, two(page.description).en);
    // عنوان تبويب المتصفح: main.js/work.js يحتاجها عند تبديل اللغة لاحقاً
    window.__pageTitle = { ar: 'Thaer Media — ' + two(page.title).ar, en: 'Thaer Media — ' + two(page.title).en };
    document.title = window.__pageTitle.ar;

    const grid = root.querySelector('.gallery-grid');
    if (grid){
      const socialGallery=slug==='social';
      const identityGallery=slug==='identity';
      const printGallery=slug==='print';
      const adsGallery=slug==='ads';
      const artGallery=socialGallery||identityGallery||printGallery||adsGallery;
      grid.classList.toggle('gallery-grid-social',socialGallery);
      grid.classList.toggle('gallery-grid-identity',identityGallery);
      grid.classList.toggle('gallery-grid-print',printGallery);
      grid.classList.toggle('gallery-grid-campaigns',adsGallery);
      // A real project image enables the lightbox; empty-image project slots stay as placeholders.
      const galleryItems=identityGallery?page.gallery.slice(0,4):page.gallery;
      grid.innerHTML = galleryItems.map((g,i)=>{
        const hasImage = !!g.image;
        const loadImmediately=i<8;
        const imagePath = hasImage ? assetUrl(g.image) : '';
        const artStyle = hasImage ? ` style="background-image:url('${escAttr(imagePath)}');background-size:cover;background-position:center"` : '';
        const clickAttrs = hasImage ? ` data-image="${escAttr(imagePath)}" tabindex="0" role="button" aria-labelledby="galTitle${i}"` : '';
        const displayImage = assetUrl(printGallery ? (g.cover || g.image) : g.image);
        const imageMarkup = artGallery && hasImage
          ? (adsGallery
            ? `<div class="campaign-monitor"><img class="gallery-art-image" src="${escAttr(displayImage)}" alt="${escAttr(two(g.title).ar)}" loading="${loadImmediately?'eager':'lazy'}" fetchpriority="${loadImmediately?'high':'low'}" decoding="async"></div>`
            : `<img class="gallery-art-image" src="${escAttr(displayImage)}" alt="${escAttr(two(g.title).ar)}" loading="${loadImmediately?'eager':'lazy'}" fetchpriority="${loadImmediately?'high':'low'}" decoding="async">`)
          : '';
        const socialClass = socialGallery ? ' gallery-card-social' : '';
        const identityClass = identityGallery ? ' gallery-card-identity' : '';
        const printClass = printGallery ? ' gallery-card-print' : '';
        const adsClass = adsGallery ? ' gallery-card-campaign' : '';
        return `
        <div class="gallery-card glass${socialClass}${identityClass}${printClass}${adsClass}"${clickAttrs}>
          <div class="gallery-art${adsGallery?' campaign-stage':''}"${artGallery?'':artStyle}>${imageMarkup}</div>
          <div class="gallery-overlay">
            <span>${escAttr(g.number)}</span>
            <h2 id="galTitle${i}" ${bilingualAttrs(g.title)}>${escAttr(two(g.title).ar)}</h2>
            <p ${bilingualAttrs(g.description)}>${escAttr(two(g.description).ar)}</p>
          </div>
        </div>`;
      }).join('');
    }
  }

  /* ---------- صفحة التواصل ---------- */
  function renderContactPage(root=document){
    const c = D.contactPage;
    window.__pageTitle = two(c.title);
    document.title = window.__pageTitle.ar;

    const headEl = root.querySelector('.section-head:not(.contact-process-head) .section-title-wrap h1');
    if (headEl) setBilingual(headEl, two(c.heading).ar, two(c.heading).en);
    const paraEl = root.querySelector('.section-head:not(.contact-process-head) > p');
    if (paraEl) setBilingual(paraEl, two(c.paragraph).ar, two(c.paragraph).en);

    const processHeadEl = root.querySelector('.contact-process-head .section-title-wrap h2');
    if (processHeadEl) setBilingual(processHeadEl, two(c.processHeading).ar, two(c.processHeading).en);
    const processParaTag = root.querySelector('.contact-process-head > p');
    if (processParaTag) setBilingual(processParaTag, two(c.processParagraph).ar, two(c.processParagraph).en);

    const grid = root.querySelector('.contact-process-grid');
    if (grid){
      grid.innerHTML = c.process.map(p=>`
        <div class="contact-step step glass">
          <span class="step-num">${escAttr(p.num)}</span>
          <h3 ${bilingualAttrs(p.title)}>${escAttr(two(p.title).ar)}</h3>
          <p ${bilingualAttrs(p.description)}>${escAttr(two(p.description).ar)}</p>
        </div>`).join('');
    }

  }

  window.renderOfflineWorkPage = renderWorkPage;
  window.renderOfflineContactPage = renderContactPage;

  /* ---------- التشغيل ---------- */
  const isHome = !!document.querySelector('.hero');
  renderNav(isHome);
  renderFooter(isHome);
  renderKeyed();
  if (isHome){
    renderServices();
    renderWorkTeaser();
    renderProcess();
    renderTestimonials();
  } else {
      const m = location.pathname.match(/work-([a-z]+)(?:\.html)?\/?$/);
    const slug = m ? m[1] : null;
    if (slug && D.work[slug]) renderWorkPage(slug);
    else if (document.querySelector('.contact-page')) renderContactPage();
  }
})();
