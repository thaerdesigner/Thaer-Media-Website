/* ============================================================
   data.js — محتوى الموقع
   ============================================================
   كل النصوص والصور والروابط التي تتكرر في الموقع موجودة هنا،
   لتعديلها من مكان واحد دون لمس ملفات HTML أو CSS.

   - كل نص له لغتان: { ar: "...", en: "..." } — عدّل الاثنتين معاً.
   - مسارات الصور تبدأ من جذر الموقع (assets/...)، ويجب أن تكون
     الصورة موجودة فعلاً في المسار المكتوب. استخدم أسماء ملفات
     إنجليزية بلا مسافات (مثل 23.jpg أو new-brand.jpg).
   - القوائم [ ... ] يمكن الإضافة إليها بنسخ عنصر { ... } كامل
     وتعديل قيمه. لا تحذف الفواصل أو الأقواس.
   - بعد أي تعديل افتح الموقع وتأكد أنه يعمل كالمعتاد.
   ============================================================ */

const SITE_DATA = window.SITE_DATA = {

  /* بيانات التواصل — تُستخدم في النماذج وزر واتساب والفوتر */
  contact: {
    whatsappNumber: "970599351383",          // أرقام فقط، مع رمز الدولة
    email: "thaeralqrenawi@gmail.com"
  },

  /* حسابات التواصل الاجتماعي — تظهر في فوتر كل الصفحات */
  socials: [
    { key: "whatsapp",  url: "https://wa.me/970599351383" },
    { key: "email",     url: "mailto:thaeralqrenawi@gmail.com" },
    { key: "instagram", url: "https://www.instagram.com/thaerdesigner/" },
    { key: "facebook",  url: "https://www.facebook.com/thaerdesigner12" },
    { key: "linkedin",  url: "https://www.linkedin.com/in/thaerdesigner/" },
    { key: "behance",   url: "https://www.behance.net/gallery/215783633/My-Portfolio-2022-2024" },
    { key: "x",         url: "https://x.com/thaerdesigner" },
    { key: "threads",   url: "https://www.threads.net/@thaerdesigner" },
    { key: "tiktok",    url: "https://www.tiktok.com/@thaerdesigner" },
    { key: "snapchat",  url: "https://www.snapchat.com/add/thaerdesigner" }
  ],

  /* روابط القائمة العلوية — "#" تعني قسماً داخل الصفحة الرئيسية */
  nav: [
    { href: "#home",         ar: "الرئيسية",     en: "Home" },
    { href: "#services",     ar: "خدماتنا",      en: "Services" },
    { href: "#work",         ar: "أعمالنا",      en: "Work" },
    { href: "#about",        ar: "من نحن",       en: "About" },
    { href: "#process",      ar: "كيف نعمل",     en: "Process" },
    { href: "#testimonials", ar: "آراء العملاء", en: "Reviews" },
    { href: "contact/",      ar: "تواصل معنا",   en: "Contact" }
  ],

  /* ======================== الصفحة الرئيسية ======================== */
  home: {
    metrics: [
      { value: 12,  ar: "سنة خبرة",    en: "Years of experience" },
      { value: 500, ar: "مشروع منجز",  en: "Completed projects" },
      { value: 100, ar: "عميل مميز",   en: "Valued clients" }
    ],

    /* السلايدات الإعلانية — صورة لكل لغة بمقاس 1440×480 */
    slides: [
      { ar: "assets/ad-slides/ad-slide-01.jpg", en: "assets/ad-slides/ad-slide-01-en.jpg", altAr: "دورة التواصل الاجتماعي واستخدام منصات الذكاء الاصطناعي", altEn: "Social media and AI platforms course" },
      { ar: "assets/ad-slides/ad-slide-02.jpg", en: "assets/ad-slides/ad-slide-02-en.jpg", altAr: "تعلّم أساسيات العمل الحر عبر منصات التواصل", altEn: "Learn the basics of freelancing on social media" },
      { ar: "assets/ad-slides/ad-slide-03.jpg", en: "assets/ad-slides/ad-slide-03-en.jpg", altAr: "اكتسب الفرصة في تعلّم أساسيات التواصل الاجتماعي ومنصات الذكاء الاصطناعي", altEn: "Learn social media and AI platform essentials" },
      { ar: "assets/ad-slides/ad-slide-04.jpg", en: "assets/ad-slides/ad-slide-04-en.jpg", altAr: "فرصتك لبناء مصدر دخل إضافي عبر منصات التواصل", altEn: "Build an additional income source through social media" },
      { ar: "assets/ad-slides/ad-slide-05.jpg", en: "assets/ad-slides/ad-slide-05-en.jpg", altAr: "سجّل في ورشة التواصل الاجتماعي", altEn: "Register for the social media workshop" }
    ],
    slidesLink: "socialmedia.courses1/",

    /* بطاقات الخدمات — icon: اسم الأيقونة (social, identity, ads, print, content, marketing) */
    services: [
      { href: "work.social/",   icon: "social",
        title: { ar: "تصاميم السوشيال ميديا", en: "Social media design" },
        desc:  { ar: "تصاميم تميّز حضورك، وتلفت انتباه جمهورك، وتحمل طابع علامتك التجارية.", en: "Designs that set your presence apart, catch your audience’s eye and carry your brand’s character." } },
      { href: "work.brand/", icon: "identity",
        title: { ar: "تصاميم الهوية البصرية", en: "Visual identity design" },
        desc:  { ar: "نصمّم لمشروعك الشعار الأمثل، ونمنحه هوية بصرية متكاملة ومميزة.", en: "We design the right logo for your business and build a complete, distinctive identity around it." } },
      { href: "work.print/",    icon: "print",
        title: { ar: "تصاميم المطبوعات", en: "Print design" },
        desc:  { ar: "ننجز تصاميم مطبوعاتك باحترافية ولمسات فنية تمنحها حضوراً إبداعياً.", en: "Print designs made with professionalism and artistic touches that make them stand out." } },
      { href: "work.ads/",      icon: "ads",
        title: { ar: "نتائج الحملات الإعلانية", en: "Ad campaign results" },
        desc:  { ar: "نطلق حملاتك ونتابعها باستمرار، لتصل إلى جمهورك المستهدف بدقة.", en: "We launch and monitor your campaigns so they reach exactly the right audience." } },
      { href: "work.video/",    icon: "content",
        title: { ar: "صناعة المحتوى", en: "Content creation" },
        desc:  { ar: "نرتّب أفكارك ونصنع محتوى يليق بعلامتك التجارية، من الموشن جرافيك إلى مونتاج الفيديو.", en: "We shape your ideas into content worthy of your brand, from motion graphics to video editing." } },
      { href: "contact/",       icon: "marketing",
        title: { ar: "حلول تسويقية", en: "Marketing solutions" },
        desc:  { ar: "نساعدك على حل تحديات حساباتك على منصات التواصل من خلال استشارات مفصّلة وفعّالة.", en: "We help you solve your social media challenges through detailed, effective consultations." } }
    ],

    /* بطاقات "أعمالنا" — غلاف لكل لغة من مجلد assets/work-covers */
    workTeaser: [
      { href: "work.social/",   coverAr: "assets/work-covers/ar/01-social-media.jpg",   coverEn: "assets/work-covers/en/01-social-media.jpg",   title: { ar: "تصاميم السوشيال ميديا", en: "Social media design" } },
      { href: "work.brand/", coverAr: "assets/work-covers/ar/02-brand-identity.jpg", coverEn: "assets/work-covers/en/02-brand-identity.jpg", title: { ar: "تصاميم الهوية البصرية", en: "Visual identity design" } },
      { href: "work.print/",    coverAr: "assets/work-covers/ar/04-print-design.jpg",   coverEn: "assets/work-covers/en/04-print-design.jpg",   title: { ar: "تصاميم المطبوعات",      en: "Print design" } },
      { href: "work.ads/",      coverAr: "assets/work-covers/ar/03-advertising.jpg",    coverEn: "assets/work-covers/en/03-advertising.jpg",    title: { ar: "نتائج الحملات الإعلانية", en: "Ad campaign results" } },
      /* غلاف عريض متحرك (فيديو قصير بدون صوت) — poster صورة تظهر قبل تحميل الفيديو */
      { href: "work.video/", wide: true, coverVideo: "assets/work-covers/video/content-cover.mp4?v=3", poster: "assets/work-covers/video/content-cover.jpg?v=3", title: { ar: "صناعة المحتوى", en: "Content creation" } }
    ],

    process: [
      { title: { ar: "نسمع",  en: "We listen" },  desc: { ar: "نفهم تفاصيل نشاطك، ونتعرّف على جمهورك واحتياجك.", en: "We get to know your business, your audience and what you need." } },
      { title: { ar: "نخطّط", en: "We plan" },    desc: { ar: "نرسم لك خطة واضحة واستراتيجية فعّالة.", en: "We draw up a clear plan and an effective strategy." } },
      { title: { ar: "نبتكر", en: "We create" },  desc: { ar: "نحوّل خطتك إلى محتوى مرئي ومكتوب يلفت الانتباه.", en: "We turn your plan into visual and written content that stands out." } },
      { title: { ar: "ننفّذ", en: "We execute" }, desc: { ar: "ننفّذ أعمالك لتكون جاهزة للانتشار.", en: "We produce your work so it is ready to reach your audience." } },
      { title: { ar: "نراجع ونسلّم", en: "We review and deliver" }, desc: { ar: "نراجع معك كل تفاصيل العمل، ثم نبدأ النشر.", en: "We review every detail with you, then go live." } }
    ],

    /* آراء العملاء — ردود العملاء كما وصلت (بصيغة المخاطبة).
       initial: الحرف الذي يظهر في الدائرة، service: الخدمة التي قُدّمت للعميل */
    testimonials: [
      { quote: { ar: "ما شاء الله. والله صرلنا أكثر من سنة شغالين مع بعض، وكل شهر بتطلع التصاميم أحلى من اللي قبله، الناس صارت تعرف منشوراتنا حتى قبل ما تشوف اسمنا", en: "Honestly, we’ve been working together for over a year and every month the designs get better than the last. People now recognize our posts before they even see our name." },
        author: { ar: "Golden Dent Clinic", en: "Golden Dent Clinic" }, initial: "G", service: { ar: "تصاميم السوشيال ميديا", en: "Social media design" } },
      { quote: { ar: "أكثر إشي مريحني معك إنك بتفهم شو بدي من أول مرة، ما بضطر أعيد وأزيد، ببعتلك الفكرة بترجعلي بتصميم أحسن من اللي كنت متخيلاه", en: "What I love most is that you get what I want the first time. I never have to repeat myself; I send you the idea and you come back with a design better than I imagined." },
        author: { ar: "مركز تولين للعناية بالشعر والبشرة", en: "Tuleen Hair & Skin Care Center" }, initial: "ت", service: { ar: "تصاميم السوشيال ميديا", en: "Social media design" } },
      { quote: { ar: "للأمانة الهوية اللي عملتها إلنا فرقت معنا كثير، اليوم الزباين بحكولنا إنه شكلنا صار زي الشركات الكبيرة، وهاد بيّن بالمبيعات كثير، بجد شكراً لجهودك", en: "To be honest, the identity you made for us changed a lot. Customers now tell us we look like a big company, and it really shows in our sales. Thank you so much for your effort." },
        author: { ar: "UniWay للدراسة في ماليزيا", en: "UniWay — Study in Malaysia" }, initial: "U", service: { ar: "الهوية البصرية", en: "Visual identity" } },
      { quote: { ar: "قبل ما نشتغل مع بعض كنا ندفع على الإعلانات وما نعرف وين بتروح المصاري. هالوقت صار في تقرير واضح، والرسائل صارت توصلنا بتكلفة أقل بكثيييير من قبل", en: "Before we worked together, we paid for ads without knowing where the money went. Now there’s a clear report, and messages reach us at a much, much lower cost than before." },
        author: { ar: "مركز السعد التعليمي", en: "Al-Saad Educational Center" }, initial: "س", service: { ar: "الحملات الإعلانية", en: "Ad campaigns" } },
      { quote: { ar: "أول حملة عملتها إلنا جابت رسائل أكثر من كل الحملات اللي قبلها مع بعض، صدقاً من وقتها ما بنطلق أي إعلان إلا من عندك", en: "The first campaign you ran for us brought more messages than all our previous campaigns combined. Since then, we don’t launch any ad without you." },
        author: { ar: "متجر ميديكال ستور", en: "Medical Store" }, initial: "M", service: { ar: "الحملات الإعلانية", en: "Ad campaigns" } },
      { quote: { ar: "اليافطة اللي صممتها للمحل غيّرت شكل الواجهة كلها، ناس كثير صارت توقف تصوّرها، وصارت علامتنا بالشارع", en: "The sign you designed changed our whole storefront. Lots of people stop to take photos of it, and it has become our landmark on the street." },
        author: { ar: "دوندورما", en: "Dondurma" }, initial: "د", service: { ar: "المطبوعات", en: "Print design" } },
      { quote: { ar: "عن جد شغلك الإعلامي كثير مميز، الفيديوهات اللي بتعملها بتوصل الرسالة صح، آخر فيديو نزلناه انتشر أكثر من أي إشي نزلناه قبل، يعطيك العافية", en: "Your media work is truly special. Your videos get the message across just right; our latest video spread more than anything we’ve posted before. Thank you!" },
        author: { ar: "Twix", en: "Twix" }, initial: "T", service: { ar: "صناعة المحتوى", en: "Content creation" } },
      { quote: { ar: "بصراحة أكثر إشي بميزك الالتزام: بتسلّم بالموعد، وبترد على طول، وبتتعامل مع المشروع كأنه مشروعك", en: "Honestly, what sets you apart is commitment: you deliver on time, reply right away, and treat the project as if it were your own." },
        author: { ar: "معرض Milano للبدل الشبابية", en: "Milano Youth Suits Showroom" }, initial: "M", service: { ar: "تعاون مستمر", en: "Ongoing partnership" } }
    ]
  },

  /* ======================== معارض الأعمال ======================== */
  /* title: عنوان الصفحة، alt: وصف الصورة لمحركات البحث وقارئات الشاشة.
     في المطبوعات: cover غلاف البطاقة، image التصميم الذي يظهر عند التكبير. */
  work: {
    social: {
      path: "work.social/",
      title: { ar: "تصاميم السوشيال ميديا", en: "Social media design" },
      intro: { ar: "مختارات من تصاميم منصات التواصل التي صمّمناها لعلامات تجارية في مجالات مختلفة.", en: "A selection of social media designs we created for brands across different industries." },
      gallery: []   // تُملأ تلقائياً من socialOrder أسفل الملف
    },
    identity: {
      path: "work.brand/",
      title: { ar: "تصاميم الهوية البصرية", en: "Visual identity design" },
      intro: { ar: "هويات بصرية متكاملة، من الشعار إلى تطبيقاته على المطبوعات والوسائط.", en: "Complete visual identities, from the logo to its applications across print and media." },
      gallery: [
        { image: "assets/gallery/identity/thaer-media.jpg", alt: { ar: "هوية Thaer Media البصرية", en: "Thaer Media visual identity" } },
        { image: "assets/gallery/identity/busma.jpg",       alt: { ar: "هوية بصمة البصرية",        en: "Busma visual identity" } },
        { image: "assets/gallery/identity/mahara.jpg",      alt: { ar: "هوية مركز مهارة البصرية",   en: "Mahara Center visual identity" } },
        { image: "assets/gallery/identity/tomoh.jpg",       alt: { ar: "هوية طموح البصرية",        en: "Tomoh visual identity" } }
      ]
    },
    print: {
      path: "work.print/",
      title: { ar: "تصاميم المطبوعات", en: "Print design" },
      intro: { ar: "لافتات ومنيو ورول أب وتصاميم عرض، معروضة كما تظهر في مكانها الحقيقي.", en: "Signage, menus, roll-ups and displays, shown as they appear in place." },
      gallery: [
        { cover: "assets/gallery/print/covers/02.jpg", image: "assets/gallery/print/artwork/02.jpg", alt: { ar: "لافتة محل بمقاس 430×110 سم", en: "Storefront sign, 430×110 cm" } },
        { cover: "assets/gallery/print/covers/03.jpg", image: "assets/gallery/print/artwork/03.jpg", alt: { ar: "لوحة إعلانية بمقاس 220×100 سم", en: "Billboard, 220×100 cm" } },
        { cover: "assets/gallery/print/covers/04.jpg", image: "assets/gallery/print/artwork/04.jpg", alt: { ar: "لافتة محل بمقاس 600×90 سم", en: "Storefront sign, 600×90 cm" } },
        { cover: "assets/gallery/print/covers/05.jpg", image: "assets/gallery/print/artwork/05.jpg", alt: { ar: "لافتة محل تجاري", en: "Storefront sign" } },
        { cover: "assets/gallery/print/covers/06.jpg", image: "assets/gallery/print/artwork/06.jpg", alt: { ar: "تصميم جانب ثلاجة عرض", en: "Display freezer side panel" } },
        { cover: "assets/gallery/print/covers/07.jpg", image: "assets/gallery/print/artwork/07.jpg", alt: { ar: "تصميم واجهة ثلاجة عرض", en: "Display freezer front panel" } },
        { cover: "assets/gallery/print/covers/01.jpg", image: "assets/gallery/print/artwork/01.jpg", alt: { ar: "لافتة بمقاس 364×118 سم", en: "Sign, 364×118 cm" } },
        { cover: "assets/gallery/print/covers/08.jpg", image: "assets/gallery/print/artwork/08.jpg", alt: { ar: "قائمة طعام (منيو) كاملة", en: "Full restaurant menu" } },
        { cover: "assets/gallery/print/covers/09.jpg", image: "assets/gallery/print/artwork/09.jpg", alt: { ar: "لافتة دوندورما بمقاس 430×100 سم", en: "Dondurma sign, 430×100 cm" } },
        { cover: "assets/gallery/print/covers/10.jpg", image: "assets/gallery/print/artwork/10.jpg", alt: { ar: "لافتة مطحنة طيبة للتوابل والبهارات والعطارة", en: "Taiba spice mill sign" } },
        { cover: "assets/gallery/print/covers/11.jpg", image: "assets/gallery/print/artwork/11.jpg", alt: { ar: "جدار الشعار بمقاس 500×280 سم", en: "Logo wall, 500×280 cm" } },
        { cover: "assets/gallery/print/covers/12.jpg", image: "assets/gallery/print/artwork/12.jpg", alt: { ar: "لافتة بمقاس 320×125 سم", en: "Sign, 320×125 cm" } },
        { cover: "assets/gallery/print/covers/13.jpg", image: "assets/gallery/print/artwork/13.jpg", alt: { ar: "لافتة مشروع فتيات القرآن", en: "Quran Girls project banner" } },
        { cover: "assets/gallery/print/covers/18.jpg", image: "assets/gallery/print/artwork/18.jpg", alt: { ar: "لافتة عيادة الدكتور نجدت", en: "Dr. Najdat clinic sign" } },
        { cover: "assets/gallery/print/covers/14.jpg", image: "assets/gallery/print/artwork/14.jpg", alt: { ar: "رول أب رمضاني بمقاس 200×80 سم", en: "Ramadan roll-up, 200×80 cm" } },
        { cover: "assets/gallery/print/covers/15.jpg", image: "assets/gallery/print/artwork/15.jpg", alt: { ar: "لافتة برنامج التدريب على البروتوكول الدولي لرعاية الجروح", en: "International wound care protocol training banner" } },
        { cover: "assets/gallery/print/covers/16.jpg", image: "assets/gallery/print/artwork/16.jpg", alt: { ar: "لافتة إعلانية بمقاس 220×100 سم", en: "Advertising banner, 220×100 cm" } },
        { cover: "assets/gallery/print/covers/17.jpg", image: "assets/gallery/print/artwork/17.jpg", alt: { ar: "لافتة صيدلية الطاهر بمقاس 430×110 سم", en: "Al-Taher pharmacy sign, 430×110 cm" } },
        { cover: "assets/gallery/print/covers/20.jpg", image: "assets/gallery/print/artwork/20.jpg", alt: { ar: "لافتة بمقاس 150×120 سم", en: "Sign, 150×120 cm" } },
        { cover: "assets/gallery/print/covers/22.jpg", image: "assets/gallery/print/artwork/22.jpg", alt: { ar: "لافتة إعلانية", en: "Advertising sign" } },
        { cover: "assets/gallery/print/covers/19.jpg", image: "assets/gallery/print/artwork/19.jpg", alt: { ar: "لافتة طولية", en: "Vertical banner" } },
        { cover: "assets/gallery/print/covers/21.jpg", image: "assets/gallery/print/artwork/21.jpg", alt: { ar: "ستاند عرض", en: "Display stand" } }
      ]
    },
    ads: {
      path: "work.ads/",
      title: { ar: "نتائج الحملات الإعلانية", en: "Ad campaign results" },
      intro: { ar: "نتائج حقيقية من تقارير حملات أدرناها: تفاعل، ووصول، ومحادثات بتكلفة مدروسة.", en: "Real results from campaigns we managed: engagement, reach and conversations at a measured cost." },
      gallery: [
        { image: "assets/gallery/ads/06.jpg", alt: { ar: "تقرير حملة تفاعل", en: "Engagement campaign report" } },
        { image: "assets/gallery/ads/09.jpg", alt: { ar: "تقرير حملة تفاعل", en: "Engagement campaign report" } },
        { image: "assets/gallery/ads/04.jpg", alt: { ar: "تقرير حملة وصول ووعي", en: "Reach and awareness campaign report" } },
        { image: "assets/gallery/ads/05.jpg", alt: { ar: "تقرير حملة رسائل", en: "Messaging campaign report" } },
        { image: "assets/gallery/ads/01.jpg", alt: { ar: "تقرير حملة تفاعل", en: "Engagement campaign report" } },
        { image: "assets/gallery/ads/08.jpg", alt: { ar: "تقرير حملة تفاعل", en: "Engagement campaign report" } },
        { image: "assets/gallery/ads/02.jpg", alt: { ar: "تقرير حملة رسائل", en: "Messaging campaign report" } },
        { image: "assets/gallery/ads/07.jpg", alt: { ar: "تقرير حملة رسائل", en: "Messaging campaign report" } },
        { image: "assets/gallery/ads/10.jpg", alt: { ar: "تقرير حملة رسائل", en: "Messaging campaign report" } },
        { image: "assets/gallery/ads/03.jpg", alt: { ar: "تقرير حملة وصول ووعي", en: "Reach and awareness campaign report" } }
      ]
    },
    /* معرض الفيديو (مونتاج وموشن جرافيك) — فيديوهات عمودية 9:16 قصيرة.
       لكل فيديو: video ملف الفيديو، poster غلافه (1080×1920، المحتوى الأساسي في
       منتصفه بمقاس 4:5)، duration مدته كما تظهر على البطاقة، alt وصف قصير. */
    video: {
      path: "work.video/",
      type: "video",
      title: { ar: "صناعة المحتوى", en: "Content creation" },
      intro: { ar: "مونتاج فيديو وموشن جرافيك لمحتوى قصير يلفت الانتباه على منصات التواصل.", en: "Video editing and motion graphics for short-form content that stands out on social media." },
      gallery: [
        { video: "assets/gallery/video/01.mp4", poster: "assets/gallery/video/posters/01.jpg", duration: "1:16", alt: { ar: "على مائدة الكرامة 2 — سفينة الكرامة", en: "Dignity Table 2 — Karama Ship" } },
        { video: "assets/gallery/video/02.mp4", poster: "assets/gallery/video/posters/02.jpg", duration: "0:40", alt: { ar: "موشن جرافيك — الأردن 2", en: "Motion graphics — Jordan 2" } },
        { video: "assets/gallery/video/03.mp4", poster: "assets/gallery/video/posters/03.jpg", duration: "1:09", alt: { ar: "حفل تكريم طالبات البراعم — أكاديمية الماهر بالقرآن", en: "Honoring ceremony — Al-Maher Quran Academy" } },
        { video: "assets/gallery/video/04.mp4", poster: "assets/gallery/video/posters/04.jpg", duration: "0:35", alt: { ar: "إعلان مركز تولين للعناية بالشعر والبشرة", en: "Tuleen hair and skin care center ad" } },
        { video: "assets/gallery/video/05.mp4", poster: "assets/gallery/video/posters/05.jpg", duration: "1:05", alt: { ar: "حملة ري الظمآن 4 — سفينة الكرامة", en: "Quench the Thirsty campaign 4 — Karama Ship" } },
        { video: "assets/gallery/video/06.mp4", poster: "assets/gallery/video/posters/06.jpg", duration: "0:23", alt: { ar: "تلاوة قرآن كريم — فاطمة الشناوي", en: "Quran recitation — Fatima Al-Shinnawi" } },
        { video: "assets/gallery/video/07.mp4", poster: "assets/gallery/video/posters/07.jpg", duration: "1:22", alt: { ar: "فعالية عيد الفطر — أكاديمية الماهر بالقرآن", en: "Eid al-Fitr event — Al-Maher Quran Academy" } },
        { video: "assets/gallery/video/08.mp4", poster: "assets/gallery/video/posters/08.jpg", duration: "0:32", alt: { ar: "موشن جرافيك — الأردن", en: "Motion graphics — Jordan" } },
        { video: "assets/gallery/video/09.mp4", poster: "assets/gallery/video/posters/09.jpg", duration: "1:19", alt: { ar: "على مائدة الكرامة 1 — سفينة الكرامة", en: "Dignity Table 1 — Karama Ship" } },
        { video: "assets/gallery/video/10.mp4", poster: "assets/gallery/video/posters/10.jpg", duration: "0:28", alt: { ar: "حلقة الماهر — أكاديمية الماهر بالقرآن", en: "Al-Maher circle — Al-Maher Quran Academy" } },
        { video: "assets/gallery/video/11.mp4", poster: "assets/gallery/video/posters/11.jpg", duration: "0:40", alt: { ar: "تلاوة قرآن كريم — فرح المغاري", en: "Quran recitation — Farah Al-Maghari" } },
        { video: "assets/gallery/video/12.mp4", poster: "assets/gallery/video/posters/12.jpg", duration: "0:23", alt: { ar: "مقتطفات حلقة أبو بكر الصديق — أكاديمية الماهر بالقرآن", en: "Abu Bakr circle highlights — Al-Maher Quran Academy" } }
      ]
    }
  }
};

/* ترتيب صور السوشيال ميديا (أسماء الملفات داخل assets/gallery/social/).
   الصور الطولية (4:5) أولاً، ثم المربعة (1:1). لإضافة صورة جديدة
   ارفعها باسم رقمي جديد (مثل 35.jpg) وأضف رقمها هنا في المكان المناسب.
   يمكنك أيضاً وضع نسخة مصغّرة منها (عرض 640px) في مجلد social/thumbs
   بنفس الاسم لتسريع تحميل المعرض؛ إن لم توجد تُستخدم الصورة الأصلية. */
const socialOrder = ["02","04","03","05","06","07","09","10","08","11","13","12","14","15","16","17","19","18","20","21","22","23","24","01","32","33","34","25","26","27","28","29","31","30"];
SITE_DATA.work.social.gallery = socialOrder.map((file, index) => ({
  image: "assets/gallery/social/" + file + ".jpg",
  thumb: "assets/gallery/social/thumbs/" + file + ".jpg",
  alt: { ar: "تصميم سوشيال ميديا " + (index + 1), en: "Social media design " + (index + 1) }
}));
