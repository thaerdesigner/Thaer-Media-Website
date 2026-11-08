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
      { href: "work-social/",   icon: "social",
        title: { ar: "تصاميم السوشيال ميديا", en: "Social media design" },
        desc:  { ar: "تصاميم تميّز حضورك، وتلفت انتباه جمهورك، وتحمل طابع علامتك التجارية.", en: "Designs that set your presence apart, catch your audience’s eye and carry your brand’s character." } },
      { href: "work-identity/", icon: "identity",
        title: { ar: "تصاميم الهوية البصرية", en: "Visual identity design" },
        desc:  { ar: "نصمّم لمشروعك الشعار الأمثل، ونمنحه هوية بصرية متكاملة ومميزة.", en: "We design the right logo for your business and build a complete, distinctive identity around it." } },
      { href: "work-ads/",      icon: "ads",
        title: { ar: "إدارة الحملات الإعلانية", en: "Ad campaign management" },
        desc:  { ar: "نطلق حملاتك ونتابعها باستمرار، لتصل إلى جمهورك المستهدف بدقة.", en: "We launch and monitor your campaigns so they reach exactly the right audience." } },
      { href: "work-print/",    icon: "print",
        title: { ar: "تصاميم المطبوعات", en: "Print design" },
        desc:  { ar: "ننجز تصاميم مطبوعاتك باحترافية ولمسات فنية تمنحها حضوراً إبداعياً.", en: "Print designs made with professionalism and artistic touches that make them stand out." } },
      { href: "contact/",       icon: "content",
        title: { ar: "صناعة المحتوى", en: "Content creation" },
        desc:  { ar: "نرتّب أفكارك ونصنع محتوى يليق بعلامتك التجارية، من الموشن جرافيك إلى مونتاج الفيديو.", en: "We shape your ideas into content worthy of your brand, from motion graphics to video editing." } },
      { href: "contact/",       icon: "marketing",
        title: { ar: "حلول تسويقية", en: "Marketing solutions" },
        desc:  { ar: "نساعدك على حل تحديات حساباتك على منصات التواصل من خلال استشارات مفصّلة وفعّالة.", en: "We help you solve your social media challenges through detailed, effective consultations." } }
    ],

    /* بطاقات "أعمالنا" — غلاف لكل لغة من مجلد assets/work-covers */
    workTeaser: [
      { href: "work-social/",   coverAr: "assets/work-covers/ar/01-social-media.jpg",   coverEn: "assets/work-covers/en/01-social-media.jpg",   title: { ar: "تصاميم السوشيال ميديا", en: "Social media design" } },
      { href: "work-identity/", coverAr: "assets/work-covers/ar/02-brand-identity.jpg", coverEn: "assets/work-covers/en/02-brand-identity.jpg", title: { ar: "تصاميم الهوية البصرية", en: "Visual identity design" } },
      { href: "work-print/",    coverAr: "assets/work-covers/ar/04-print-design.jpg",   coverEn: "assets/work-covers/en/04-print-design.jpg",   title: { ar: "تصاميم المطبوعات",      en: "Print design" } },
      { href: "work-ads/",      coverAr: "assets/work-covers/ar/03-advertising.jpg",    coverEn: "assets/work-covers/en/03-advertising.jpg",    title: { ar: "إدارة الحملات الإعلانية", en: "Ad campaign management" } }
    ],

    process: [
      { title: { ar: "نسمع",  en: "We listen" },  desc: { ar: "نفهم تفاصيل نشاطك، ونتعرّف على جمهورك واحتياجك.", en: "We get to know your business, your audience and what you need." } },
      { title: { ar: "نخطّط", en: "We plan" },    desc: { ar: "نرسم لك خطة واضحة واستراتيجية فعّالة.", en: "We draw up a clear plan and an effective strategy." } },
      { title: { ar: "نبتكر", en: "We create" },  desc: { ar: "نحوّل خطتك إلى محتوى مرئي ومكتوب يلفت الانتباه.", en: "We turn your plan into visual and written content that stands out." } },
      { title: { ar: "ننفّذ", en: "We execute" }, desc: { ar: "ننفّذ أعمالك لتكون جاهزة للانتشار.", en: "We produce your work so it is ready to reach your audience." } },
      { title: { ar: "نراجع ونسلّم", en: "We review and deliver" }, desc: { ar: "نراجع معك كل تفاصيل العمل، ثم نبدأ النشر.", en: "We review every detail with you, then go live." } }
    ],

    /* آراء العملاء — أضف رأياً جديداً بنسخ عنصر كامل */
    testimonials: [
      { quote: { ar: "تصميم احترافي ونتيجة تعكس علامتنا كما نريد.", en: "Professional design and a result that feels true to our brand." },
        author: { ar: "عميل Thaer Media", en: "Thaer Media client" } },
      { quote: { ar: "عمل منظّم من الفكرة إلى التسليم، وهوية أقوى.", en: "An organized process from concept to delivery, and a much stronger identity." },
        author: { ar: "عميل Thaer Media", en: "Thaer Media client" } },
      { quote: { ar: "اهتمام بالتفاصيل ونتيجة عملية، وليست مجرد شكل جميل.", en: "Attention to detail and a result that works, not just looks good." },
        author: { ar: "عميل Thaer Media", en: "Thaer Media client" } },
      { quote: { ar: "تواصل سلس ومراحل واضحة ونتيجة تناسب احتياجنا.", en: "Smooth communication, clear steps and a result that met our needs." },
        author: { ar: "عميل Thaer Media", en: "Thaer Media client" } },
      { quote: { ar: "عناية بالتفاصيل وسرعة في التنفيذ، وتجربة تعاون مريحة.", en: "Careful attention, fast delivery and a genuinely smooth collaboration." },
        author: { ar: "عميل Thaer Media", en: "Thaer Media client" } }
    ]
  },

  /* ======================== معارض الأعمال ======================== */
  /* title: عنوان الصفحة، alt: وصف الصورة لمحركات البحث وقارئات الشاشة.
     في المطبوعات: cover غلاف البطاقة، image التصميم الذي يظهر عند التكبير. */
  work: {
    social: {
      title: { ar: "تصاميم السوشيال ميديا", en: "Social media design" },
      intro: { ar: "مختارات من تصاميم منصات التواصل التي صمّمناها لعلامات تجارية في مجالات مختلفة.", en: "A selection of social media designs we created for brands across different industries." },
      gallery: []   // تُملأ تلقائياً من socialOrder أسفل الملف
    },
    identity: {
      title: { ar: "تصاميم الهوية البصرية", en: "Visual identity design" },
      intro: { ar: "هويات بصرية متكاملة، من الشعار إلى تطبيقاته على المطبوعات والوسائط.", en: "Complete visual identities, from the logo to its applications across print and media." },
      gallery: [
        { image: "assets/gallery/identity/thaer-media.jpg", alt: { ar: "هوية Thaer Media البصرية", en: "Thaer Media visual identity" } },
        { image: "assets/gallery/identity/busma.jpg",       alt: { ar: "هوية بصمة البصرية",        en: "Busma visual identity" } },
        { image: "assets/gallery/identity/mahara.jpg",      alt: { ar: "هوية مركز مهارة البصرية",   en: "Mahara Center visual identity" } },
        { image: "assets/gallery/identity/tomoh.jpg",       alt: { ar: "هوية طموح البصرية",        en: "Tomoh visual identity" } }
      ]
    },
    ads: {
      title: { ar: "إدارة الحملات الإعلانية", en: "Ad campaign management" },
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
    print: {
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
