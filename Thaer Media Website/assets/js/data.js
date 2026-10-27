/* ============================================================
   data.js — محتوى الصفحات الرئيسية
   ============================================================
   معظم نصوص وصور صفحات الموقع الرئيسية موجودة هون لتسهيل تحديثها
   من غير تعديل ملفات الـHTML أو الـCSS. صفحة الدورة مستقلة بملفاتها.

   كيف تستخدمه:
   - أي نص: لاقي المكان المناسب تحت وبدّل القيمة بين علامتي التنصيص "...".
     معظم نصوص صفحات الموقع الرئيسية لها لغتين { ar: "...", en: "..." } —
     لازم تعدّل الاثنين مع بعض حتى يبقى المحتوى متطابق بالعربي والإنجليزي.
   - أي صورة: حمّل الصورة الجديدة داخل مجلد assets/images (أو المجلد
     المناسب المذكور جنب كل حقل صورة)، وبدّل بس اسم/مسار الملف بالقيمة.
     خلي نفس صيغة الملف تقريباً (jpg/png) وحجم مقارب حتى ما يتغيّر شكل
     الموقع. لازم الصورة تكون فعلاً موجودة بنفس المسار وإلا بتظهر مكسورة.
   - عناصر زي "آراء العملاء" و"معرض الأعمال" هي قائمة (array) — تقدر
     تضيف عنصر جديد بنسخ آخر {...} داخل الأقواس المربعة [...] وتعدّل
     قيَمه، أو تحذف عنصر كامل بحذف الـ{...} تبعه (وحذف الفاصلة الزايدة
     إذا صار آخر عنصر).
   - لا تحذف الفواصل (,) أو الأقواس { } [ ] — بس بدّل النصوص والمسارات
     بين علامتي التنصيص. لو صار خطأ بالملف الموقع كله بيتوقف عن الشغل،
     فبعد أي تعديل افتح الموقع وتأكد إنه شغال زي العادة.
   ============================================================ */

const SITE_DATA = {

  /* عنوان المتصفح ووصف المحرك لكل صفحة */
  meta: {
    home: {
      title: { ar: "Thaer Media — نوظِّفُ خبرتنا لنجاح علامتك التجارية", en: "Thaer Media — We turn experience into brand success" },
      description: "Thaer Media — Social media design, brand identity, advertising campaigns, creative design, content creation and marketing solutions."
    }
  },

  /* بيانات التواصل الأساسية لحقول صفحة التواصل وروابط الفوتر */
  contact: {
    whatsappNumber: "970599351383",
    whatsappUrl: "https://wa.me/970599351383",
    whatsappDisplay: "+970 59 935 1383",
    email: "thaeralqrenawi@gmail.com",
    emailUrl: "mailto:thaeralqrenawi@gmail.com"
  },

  /* روابط منصات التواصل الاجتماعي — تظهر بأيقونات بفوتر كل صفحة */
  socials: [
    { key: "whatsapp", url: "https://wa.me/970599351383" },
    { key: "email", url: "mailto:thaeralqrenawi@gmail.com" },
    { key: "instagram", url: "https://www.instagram.com/thaerdesigner/" },
    { key: "facebook", url: "https://www.facebook.com/thaerdesigner12" },
    { key: "linkedin", url: "https://www.linkedin.com/in/thaerdesigner/" },
    { key: "behance", url: "https://www.behance.net/gallery/215783633/My-Portfolio-2022-2024" },
    { key: "x", url: "https://www.x.com/thaerdesigner" },
    { key: "threads", url: "https://www.threads.net/@thaerdesigner" },
    { key: "tiktok", url: "https://www.tiktok.com/@thaerdesigner" },
    { key: "snapchat", url: "https://www.snapchat.com/add/thaerdesigner" }
  ],

  /* روابط قائمة التنقل بالهيدر (الصفحة الرئيسية فقط، ثنائية اللغة) */
  nav: [
    { href: "#home", ar: "الرئيسية", en: "Home" },
    { href: "#services", ar: "الخدمات", en: "Services" },
    { href: "#work", ar: "أعمالنا", en: "Work" },
    { href: "#about", ar: "من نحن", en: "About" },
    { href: "#process", ar: "كيف نعمل", en: "Process" },
    { href: "#testimonials", ar: "آراء العملاء", en: "Testimonials" },
    { href: "/contact", ar: "تواصل", en: "Contact" }
  ],

  /* ======================== الصفحة الرئيسية ======================== */
  home: {

    hero: {
      // الصورة الشخصية بأعلى الصفحة الرئيسية — غيّر المسار لصورة جديدة بنفس المقاس تقريباً (عمودي)
      photo: "assets/images/hero-person.jpg",
      heading: { ar: "<span class='heading-white'>نوظِّفُ خبرتنا</span><span class='heading-gold'>لنجاح علامتك التجارية</span>", en: "<span class='heading-white'>We turn experience into</span> <span class='heading-gold'>brand success</span>" },
      paragraph: {
        ar: "نصنع حضوراً رقمياً متكاملاً من خلال تقديم خدمات التصميم الإبداعي والهوية البصرية وصناعة المحتوى والحملات الإعلانية",
        en: "We build distinctive brands with design, content and campaigns."
      },
      primaryButton: { href: "/contact", ar: "لنتحدث عن مشروعك", en: "Let's discuss your project" },
      secondaryButton: { href: "#work", ar: "شاهد أعمالنا", en: "Explore our work" },
      chipOne: { ar: "إبداع × استراتيجية", en: "Creative × Strategy" },
      chipTwo: { ar: "تصميم • محتوى • إعلانات", en: "Design • Content • Ads" },
      yearsOfExperience: 12,
      metricYearsLabel: { ar: "عاماً من الخبرة", en: "Years of experience" },
      metricSolutions: { ar: "حلول تسويقية<br>متكاملة", en: "Marketing solutions" },
      metricPresence: { ar: "حضور عربي<br>وعالمي", en: "Arabic & global reach" }
    },

    servicesHead: {
      heading: { ar: "<span class='section-kicker'>خدماتنا:</span> ما نستطيع تقديمه لعلامتك أو نشاطك التجاري", en: "<span class='section-kicker'>Our services:</span> Creative solutions for brands" },
      paragraph: {
        ar: "من الفكرة إلى التنفيذ، نربط التصميم والتسويق والمحتوى ضمن منظومة واحدة متناسقة.",
        en: "We bring design, marketing and content together to grow your brand."
      }
    },
    /* بطاقات الخدمات الست — الأيقونة من مجلد assets/service-icons */
    services: [
      { slug: "social", href: "/work-social/", icon: "assets/service-icons/social.svg",
        title: { ar: "تصاميم السوشيال ميديا", en: "Social Media Design" },
        desc: { ar: "تصاميم تجارية مميزة ولافتة تعكس هوية العلامة التجارية وتبني حضوراً بصرياً ثابتاً.", en: "Designs that make your brand stand out." } },
      { slug: "identity", href: "/work-identity/", icon: "assets/service-icons/branding.png",
        title: { ar: "الهوية البصرية", en: "Brand Identity" },
        desc: { ar: "نظام بصري متكامل يمنح علامتك التجارية حضوراً احترافياً قابلاً للتوسع والانتشار.", en: "A clear visual identity for your brand." } },
      { slug: "ads", href: "/work-ads/", icon: "assets/service-icons/megaphone.png",
        title: { ar: "إدارة الحملات الإعلانية", en: "Advertising Campaign Management" },
        desc: { ar: "إنشاء وإدارة حملاتك الإعلانية المدفوعة على منصات التواصل للوصول إلى أكبر جمهور ممكن.", en: "Campaigns that expand your reach." } },
      { slug: "print", href: "/work-print/", icon: "assets/service-icons/offset.png",
        title: { ar: "تصاميم المطبوعات", en: "Print Design" },
        desc: { ar: "تصاميم بصرية مبتكرة وغير تقليدية للمطبوعات لأصحاب الشركات والمؤسسات والأنشطة التجارية.", en: "Distinctive designs for print." } },
      { slug: "content", href: "#work", icon: "assets/service-icons/video.png",
        title: { ar: "صناعة المحتوى", en: "Content Creation" },
        desc: { ar: "إنشاء وتعديل المحتوى المرئي لإظهار علامتك التجارية من خلال فيديوهات مميزة تشمل الموشن جرافيك والمونتاج.", en: "Video content that brings your brand to life." } },
      { slug: "marketing", href: "#work", icon: "assets/service-icons/innovation.png",
        title: { ar: "حلول تسويقية", en: "Marketing Solutions" },
        desc: { ar: "استشارات تسويقية عملية تساعدك على اتخاذ قرارات أفضل وبناء حضور أقوى.", en: "Practical guidance to grow your brand." } }
    ],

    workHead: {
      heading: { ar: "<span class='section-kicker'>مختارات من أعمالنا:</span> معرض لبعض أعمالنا المميزة", en: "<span class='section-kicker'>Selected work:</span> A selection of our featured work" },
      paragraph: {
        ar: "معرض مرن لعرض المشاريع بأسلوب بصري متنوع، مع معلومات المشروع فوق الصورة عند التفاعل.",
        en: "Explore projects shaped by original ideas and thoughtful design."
      }
    },
    /* شريط "مختارات من أعمالنا" بالصفحة الرئيسية — صورة الغلاف مختلفة حسب
       اللغة (عربي/إنجليزي)، من مجلد assets/work-covers/ar أو /en */
    workTeaser: [
      { slug: "social", href: "/work-social/", coverAr: "assets/work-covers/ar/01-social-media.jpg", coverEn: "assets/work-covers/en/01-social-media.jpg", badge: "01 · SOCIAL MEDIA",
        title: { ar: "تصاميم السوشيال ميديا", en: "Social Media Design" },
        desc: { ar: "استعرض أعمالنا في تصاميم السوشيال ميديا.", en: "Explore our social media design work." } },
      { slug: "identity", href: "/work-identity/", coverAr: "assets/work-covers/ar/02-brand-identity.jpg", coverEn: "assets/work-covers/en/02-brand-identity.jpg", badge: "02 · BRAND IDENTITY",
        title: { ar: "الهوية البصرية", en: "Brand Identity" },
        desc: { ar: "استعرض أعمالنا في بناء الهوية البصرية.", en: "Explore our brand identity work." } },
      { slug: "ads", href: "/work-ads/", coverAr: "assets/work-covers/ar/03-advertising.jpg", coverEn: "assets/work-covers/en/03-advertising.jpg", badge: "03 · ADVERTISING",
        title: { ar: "إدارة الحملات الإعلانية", en: "Advertising Campaigns" },
        desc: { ar: "استعرض أعمالنا في الحملات الإعلانية.", en: "Explore our advertising campaign work." } },
      { slug: "print", href: "/work-print/", coverAr: "assets/work-covers/ar/04-print-design.jpg", coverEn: "assets/work-covers/en/04-print-design.jpg", badge: "04 · PRINT DESIGN",
        title: { ar: "تصاميم المطبوعات", en: "Print Design" },
        desc: { ar: "استعرض أعمالنا في تصاميم المطبوعات.", en: "Explore our print design work." } },
    ],

    about: {
      // ثلاث صور قسم "من نحن" (اللوحة الكبيرة + صورتين صغار)
      mainPhoto: "assets/images/about-main.jpg",
      miniPhotoOne: "assets/images/about-palette.jpg",
      miniPhotoTwo: "assets/images/about-desk.jpg",
      heading: { ar: "<span class='section-kicker'>من نحن:</span> خبرة تفهم العلامة قبل أن تصممها", en: "<span class='section-kicker'>About us:</span> Strategy behind every design" },
      lead: {
        ar: "نبدأ من فهم علامتك التجارية، جمهورها وهدفها، ثم نبني لغة بصرية وتسويقية تخدمها.",
        en: "We learn your brand before we create."
      },
      paragraph: {
        ar: "نجمع بين خدمات متنوعة ما بين التصميم الإحترافي وصناعة المحتوى وإدارة الحملات والحلول التسويقية لنمنح المشاريع حضوراً متماسكاً في منصات التواصل.",
        en: "Design, content and campaigns for a consistent brand."
      },
      bullets: [
        { ar: "تفكير استراتيجي", en: "Strategic thinking" },
        { ar: "تنفيذ إبداعي", en: "Creative execution" },
        { ar: "هوية متناسقة", en: "Consistent identity" },
        { ar: "حلول قابلة للتوسع", en: "Scalable solutions" }
      ]
    },

    processHead: {
      heading: { ar: "<span class='section-kicker'>كيف نعمل:</span> من الاستماع إلى التسليم", en: "<span class='section-kicker'>Our process:</span> From listening to delivery" },
      paragraph: {
        ar: "خمس مراحل واضحة تحافظ على جودة المشروع واتساقه من البداية للنهاية.",
        en: "Five focused stages, from first conversation to final delivery."
      }
    },
    process: [
      { num: "01", title: { ar: "نفهم", en: "Listen" }, desc: { ar: "نستمع للهدف، الجمهور والتحدي.", en: "We listen to the goal, audience and challenge." } },
      { num: "02", title: { ar: "نخطط", en: "Plan" }, desc: { ar: "نحدد الاتجاه والرسالة والأولويات.", en: "We define direction, message and priorities." } },
      { num: "03", title: { ar: "نبدع", en: "Create" }, desc: { ar: "نحوّل الاستراتيجية إلى أفكار بصرية.", en: "We turn strategy into visual ideas." } },
      { num: "04", title: { ar: "ننّفذ", en: "Execute" }, desc: { ar: "ننتج ونطوّر ونجهز المخرجات.", en: "We produce, refine and prepare deliverables." } },
      { num: "05", title: { ar: "نراجع", en: "Review" }, desc: { ar: "نتأكد من الجودة والتسليم بالشكل الصحيح.", en: "We review quality and deliver everything properly." } }
    ],

    testimonialsHead: {
      heading: { ar: "<span class='section-kicker'>آراء العملاء:</span> تجارب تستحق أن تُسمع", en: "<span class='section-kicker'>Client feedback:</span> Experiences worth hearing" },
      paragraph: {
        ar: "مساحة تفاعلية لعرض آراء العملاء بشكل واضح وأنيق.",
        en: "An interactive space for presenting client feedback with clarity and style."
      }
    },
    /* آراء العملاء — كل ما تضيف عميل جديد ضيف {...} جديد هون، بينضاف
       تلقائياً كشريحة جديدة بالسلايدر (وما في حد أقصى للعدد) */
    testimonials: [
      { quote: { ar: "“تصميم احترافي، فهم سريع للهدف، ونتيجة تعكس العلامة بالشكل الذي كنا نبحث عنه.”", en: "“Professional design, fast understanding of the objective, and a result that truly reflects the brand.”" },
        author: { ar: "عميل Thaer Media", en: "Thaer Media client" } },
      { quote: { ar: "“العمل كان منظماً وواضحاً من الفكرة حتى التسليم، والهوية ظهرت بشكل أقوى بكثير.”", en: "“The process was clear and organized from concept to delivery, and the identity became much stronger.”" },
        author: { ar: "عميل Thaer Media", en: "Thaer Media client" } },
      { quote: { ar: "“احترافية في التفاصيل، ومرونة في التعديل، والأهم أن النتيجة كانت عملية وليست مجرد شكل.”", en: "“Attention to detail, flexibility during revisions, and most importantly, a result that works—not just looks good.”" },
        author: { ar: "عميل Thaer Media", en: "Thaer Media client" } },
      { quote: { ar: "“التواصل كان سلساً، وكل مرحلة كانت واضحة، والنتيجة جاءت متوافقة مع احتياجنا.”", en: "“Communication was smooth, every stage was clear, and the result matched our needs.”" },
        author: { ar: "عميل Thaer Media", en: "Thaer Media client" } },
      { quote: { ar: "“اهتمام جميل بالتفاصيل وسرعة في التنفيذ، تجربة تعاون مريحة من البداية للنهاية.”", en: "“Great attention to detail and fast delivery—a smooth collaboration from start to finish.”" },
        author: { ar: "عميل Thaer Media", en: "Thaer Media client" } }
    ],

    cta: {
      heading: { ar: "<span class='section-kicker'>لنبدأ:</span> لديك فكرة؟ خلّينا نحولها إلى حضور قوي.", en: "<span class='section-kicker'>Let's begin:</span> Turn your idea into impact" },
      paragraph: {
        ar: "أرسل تفاصيل مشروعك أو الخدمة التي تحتاجها، وسنبدأ من فهم احتياجك وتحديد أفضل اتجاه للتنفيذ.",
        en: "Tell us what you need, and we'll recommend the right next step."
      },
      whatsappButton: { ar: "تواصل عبر واتساب", en: "Chat on WhatsApp" },
      emailButton: { ar: "راسلنا بالبريد", en: "Email us" }
    }
  },

  /* ======================== الفوتر (كل الصفحات) ======================== */
  footer: {
    tagline: {
      ar: "حلول إبداعية وتسويقية تساعد العلامات التجارية على بناء حضور أقوى وأكثر اتساقاً.",
      en: "Creative ideas that help brands grow."
    },
    linksTitle: { ar: "روابط", en: "Links" },
    servicesTitle: { ar: "الخدمات", en: "Services" },
    contactTitle: { ar: "تواصل", en: "Contact" },
    /* روابط الخدمات بعمود الفوتر */
    servicesList: [
      { ar: "تصاميم السوشيال ميديا", en: "Social Media Design" },
      { ar: "الهوية البصرية", en: "Brand Identity" },
      { ar: "إدارة الحملات الإعلانية", en: "Advertising Campaigns" },
      { ar: "تصاميم المطبوعات", en: "Print Design" },
      { ar: "صناعة المحتوى", en: "Content Creation" },
      { ar: "حلول تسويقية", en: "Marketing Solutions" }
    ],
    copyright: {
      ar: " Thaer Media. جميع الحقوق محفوظة.",
      en: " Thaer Media. All rights reserved."
    }
  },

  /* ======================== صفحات الأعمال الستة ======================== */
  /* كل صفحة إلها عنوان ووصف بلغتين، ومعرض صور (gallery) تقدر تضيف/تحذف/
     تعدّل عناصره بحرية. "image" خليها فاضية "" لين توفر صورة حقيقية
     للمشروع — وقتها بتظهر الصورة بدل الخلفية الزخرفية الحالية. */
  work: {
    social: {
      title: { ar: "تصاميم السوشيال ميديا", en: "Social Media Design" },
      description: { ar: "هنا سنعرض الأعمال الخاصة بخدمة تصاميم السوشيال ميديا بعد إضافة المشاريع والصور المعتمدة.", en: "Explore our social media design projects." },
      gallery: [
        { number: "01", title: { ar: "مساحة عمل", en: "Project Space" }, description: { ar: "سيتم إضافة المشروع هنا.", en: "The project will be added here." }, image: "assets/gallery/social/01.jpg" },
        { number: "02", title: { ar: "مساحة عمل", en: "Project Space" }, description: { ar: "سيتم إضافة المشروع هنا.", en: "The project will be added here." }, image: "assets/gallery/social/02.jpg" },
        { number: "03", title: { ar: "مساحة عمل", en: "Project Space" }, description: { ar: "سيتم إضافة المشروع هنا.", en: "The project will be added here." }, image: "assets/gallery/social/03.jpg" },
        { number: "04", title: { ar: "مساحة عمل", en: "Project Space" }, description: { ar: "سيتم إضافة المشروع هنا.", en: "The project will be added here." }, image: "assets/gallery/social/04.jpg" },
        { number: "05", title: { ar: "مساحة عمل", en: "Project Space" }, description: { ar: "سيتم إضافة المشروع هنا.", en: "The project will be added here." }, image: "assets/gallery/social/05.jpg" },
        { number: "06", title: { ar: "مساحة عمل", en: "Project Space" }, description: { ar: "سيتم إضافة المشروع هنا.", en: "The project will be added here." }, image: "assets/gallery/social/06.jpg" }
      ]
    },
    identity: {
      title: { ar: "الهوية البصرية", en: "Brand Identity" },
      description: { ar: "هنا سنعرض الأعمال الخاصة بخدمة الهوية البصرية بعد إضافة المشاريع والصور المعتمدة.", en: "Explore our brand identity projects." },
      gallery: [
        { number: "01", title: { ar: "هوية Thaer Media", en: "Thaer Media Identity" }, description: { ar: "تصميم هوية بصرية.", en: "Brand identity design." }, image: "assets/gallery/identity/Idendety.jpg?v=image-opt-20261026-1" },
        { number: "02", title: { ar: "هوية بصمة", en: "Busma Identity" }, description: { ar: "تصميم هوية بصرية.", en: "Brand identity design." }, image: "assets/gallery/identity/براند بصمة.jpg?v=image-opt-20261026-1" },
        { number: "03", title: { ar: "هوية مركز مهارة", en: "Mahara Center Identity" }, description: { ar: "تصميم هوية بصرية.", en: "Brand identity design." }, image: "assets/gallery/identity/براند جديد.jpg?v=image-opt-20261026-1" },
        { number: "04", title: { ar: "هوية طموح", en: "Tomoh Identity" }, description: { ar: "تصميم هوية بصرية.", en: "Brand identity design." }, image: "assets/gallery/identity/براند.jpg?v=image-opt-20261026-1" },
      ]
    },
    ads: {
      title: { ar: "إدارة الحملات الإعلانية", en: "Advertising Campaigns" },
      description: { ar: "هنا سنعرض الأعمال الخاصة بخدمة إدارة الحملات الإعلانية بعد إضافة المشاريع والصور المعتمدة.", en: "Explore our advertising campaign projects." },
      gallery: [
        { number: "01", title: { ar: "حملة تفاعل", en: "Engagement campaign" }, description: { ar: "التفاعلات والمبلغ المنفق وتكلفة النتيجة موضحة في تقرير الحملة.", en: "The report shows interactions, amount spent, and cost per result." }, image: "assets/gallery/ads/06.jpg?v=image-opt-20261026-1" },
        { number: "02", title: { ar: "حملة تفاعل", en: "Engagement campaign" }, description: { ar: "التفاعلات والمبلغ المنفق وتكلفة النتيجة موضحة في تقرير الحملة.", en: "The report shows interactions, amount spent, and cost per result." }, image: "assets/gallery/ads/09.jpg?v=image-opt-20261026-1" },
        { number: "03", title: { ar: "حملة وصول ووعي", en: "Reach and awareness campaign" }, description: { ar: "الوصول والمبلغ المنفق وتكلفة الوصول موضحة في تقرير الحملة.", en: "The report shows reach, amount spent, and cost per reach." }, image: "assets/gallery/ads/04.jpg?v=image-opt-20261026-1" },
        { number: "04", title: { ar: "حملة رسائل", en: "Messaging campaign" }, description: { ar: "المحادثات التي بدأها الإعلان والمبلغ المنفق وتكلفة المحادثة موضحة في التقرير.", en: "The report shows conversations started, amount spent, and cost per conversation." }, image: "assets/gallery/ads/05.jpg?v=image-opt-20261026-1" },
        { number: "05", title: { ar: "حملة تفاعل", en: "Engagement campaign" }, description: { ar: "التفاعلات والمبلغ المنفق وتكلفة النتيجة موضحة في تقرير الحملة.", en: "The report shows interactions, amount spent, and cost per result." }, image: "assets/gallery/ads/01.jpg?v=image-opt-20261026-1" },
        { number: "06", title: { ar: "حملة تفاعل", en: "Engagement campaign" }, description: { ar: "التفاعلات والمبلغ المنفق وتكلفة النتيجة موضحة في تقرير الحملة.", en: "The report shows interactions, amount spent, and cost per result." }, image: "assets/gallery/ads/08.jpg?v=image-opt-20261026-1" },
        { number: "07", title: { ar: "حملة رسائل", en: "Messaging campaign" }, description: { ar: "المحادثات التي بدأها الإعلان والمبلغ المنفق وتكلفة المحادثة موضحة في التقرير.", en: "The report shows conversations started, amount spent, and cost per conversation." }, image: "assets/gallery/ads/02.jpg?v=image-opt-20261026-1" },
        { number: "08", title: { ar: "حملة رسائل", en: "Messaging campaign" }, description: { ar: "المحادثات التي بدأها الإعلان والمبلغ المنفق وتكلفة المحادثة موضحة في التقرير.", en: "The report shows conversations started, amount spent, and cost per conversation." }, image: "assets/gallery/ads/07.jpg?v=image-opt-20261026-1" },
        { number: "09", title: { ar: "حملة رسائل", en: "Messaging campaign" }, description: { ar: "المحادثات التي بدأها الإعلان والمبلغ المنفق وتكلفة المحادثة موضحة في التقرير.", en: "The report shows conversations started, amount spent, and cost per conversation." }, image: "assets/gallery/ads/10.jpg?v=image-opt-20261026-1" },
        { number: "10", title: { ar: "حملة وصول ووعي", en: "Reach and awareness campaign" }, description: { ar: "الوصول والمبلغ المنفق وتكلفة الوصول موضحة في تقرير الحملة.", en: "The report shows reach, amount spent, and cost per reach." }, image: "assets/gallery/ads/03.jpg?v=image-opt-20261026-1" },
      ]
    },
    print: {
      title: { ar: "تصاميم المطبوعات", en: "Print Design" },
      description: { ar: "هنا سنعرض الأعمال الخاصة بخدمة تصاميم المطبوعات بعد إضافة المشاريع والصور المعتمدة.", en: "Explore our print design projects." },
      gallery: [
        { number: "01", title: { ar: "430.110 يافطة", en: "Print design 02" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/430.110 يافطة.jpg", cover: "assets/gallery/print/covers/02.jpg", mockup: "wide-billboard" },
        { number: "02", title: { ar: "BillBoard 220.100", en: "Print design 03" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/BillBoard 220.100.jpg", cover: "assets/gallery/print/covers/03.jpg", mockup: "rollup" },
        { number: "03", title: { ar: "600.90 يافطة", en: "Print design 04" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/600.90 يافطة.jpg", cover: "assets/gallery/print/covers/04.jpg", mockup: "medium-banner" },
        { number: "04", title: { ar: "اليافطة", en: "Print design 05" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/اليافطة.jpg", cover: "assets/gallery/print/covers/05.jpg", mockup: "medium-banner" },
        { number: "05", title: { ar: "جانب الثلاجة", en: "Print design 06" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/جانب الثلاجة.jpg", cover: "assets/gallery/print/covers/06.jpg?v=20261025-9", mockup: "freezer-side" },
        { number: "06", title: { ar: "واجهة الثلاجة", en: "Print design 07" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/واجهة الثلاجة.jpg", cover: "assets/gallery/print/covers/07.jpg", mockup: "freezer" },
        { number: "07", title: { ar: "364.118", en: "Print design 01" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/364.118.jpg", cover: "assets/gallery/print/covers/01.jpg", mockup: "billboard" },
        { number: "08", title: { ar: "المنيو كامل", en: "Print design 08" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/المنيو كامل.jpg", cover: "assets/gallery/print/covers/08.jpg", mockup: "menu-portrait" },
        { number: "09", title: { ar: "دوندورما 430.100", en: "Print design 09" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/دوندورما 430.100.jpg", cover: "assets/gallery/print/covers/09.jpg", mockup: "wide-billboard" },
        { number: "10", title: { ar: "مطحنة طيبة للتوابل والبهارات والعطارة", en: "Print design 10" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/مطحنة طيبة للتوابل والبهارات والعطارة.jpg", cover: "assets/gallery/print/covers/10.jpg", mockup: "medium-banner" },
        { number: "11", title: { ar: "حائط الشعار 500.280", en: "Print design 11" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/حائط الشعار 500.280.jpg", cover: "assets/gallery/print/covers/11.jpg", mockup: "wall" },
        { number: "12", title: { ar: "320.125 يافطة", en: "Print design 12" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/320.125 يافطة.jpg", cover: "assets/gallery/print/covers/12.jpg", mockup: "billboard" },
        { number: "13", title: { ar: "فتيات القران", en: "Print design 13" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/فتيات القران.jpg", cover: "assets/gallery/print/covers/13.jpg", mockup: "billboard" },
        { number: "14", title: { ar: "يافطة الدكتور نجدت 3.1", en: "Print design 18" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/يافطة الدكتور نجدت 3.1.jpg", cover: "assets/gallery/print/covers/18.jpg", mockup: "banner" },
        { number: "15", title: { ar: "رول اب 200.80 رمضان", en: "Print design 14" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/رول اب 200.80 رمضان.jpg", cover: "assets/gallery/print/covers/14.jpg", mockup: "rollup" },
        { number: "16", title: { ar: "يافطة برنامج التدريب على البروتوكول الدولي لرعاية الجروح 200.60", en: "Print design 15" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/يافطة برنامج التدريب على البروتوكول الدولي لرعاية الجروح 200.60.jpg", cover: "assets/gallery/print/covers/15.jpg", mockup: "billboard" },
        { number: "17", title: { ar: "لافتة اعلانية 220.100", en: "Print design 16" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/لافتة اعلانية 220.100.jpg", cover: "assets/gallery/print/covers/16.jpg", mockup: "rollup" },
        { number: "18", title: { ar: "يافطة صيدلية الطاهر 430.110", en: "Print design 17" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/يافطة صيدلية الطاهر 430.110.jpg", cover: "assets/gallery/print/covers/17.jpg", mockup: "wide-billboard" },
        { number: "19", title: { ar: "يافطة 150.120", en: "Print design 20" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/يافطة 150.120.jpg", cover: "assets/gallery/print/covers/20.jpg", mockup: "portrait-wall" },
        { number: "20", title: { ar: "يافطة", en: "Print design 22" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/يافطة.jpg", cover: "assets/gallery/print/covers/22.jpg", mockup: "billboard" },
        { number: "21", title: { ar: "يافطة طولية", en: "Print design 19" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/يافطة طولية.jpg", cover: "assets/gallery/print/covers/19.jpg", mockup: "wide-rollup" },
        { number: "22", title: { ar: "ستاند", en: "Print design 21" }, description: { ar: "تصميم مطبوع.", en: "Print design." }, image: "assets/gallery/print/artwork/ستاند.jpg", cover: "assets/gallery/print/covers/21.jpg", mockup: "wide-rollup" },
      ]
    },
  },

  /* ======================== صفحة التواصل ======================== */
  contactPage: {
    title: { ar: "Thaer Media — تواصل معنا", en: "Thaer Media — Contact Us" },
    heading: { ar: "<span class='section-kicker'>لنتحدث:</span> ما الفكرة التي تعمل عليها؟", en: "<span class='section-kicker'>Let's talk about</span> your project" },
    paragraph: { ar: "أخبرني عن مشروعك أو التحدي الذي تريد حله، وسأساعدك في تحديد الخطوة المناسبة.", en: "Tell me about your project, and I'll help you take the next step." },
    /* type يحدد واتساب أو إيميل حتى ياخذ الرقم/الرابط من SITE_DATA.contact تلقائياً (مكان
       واحد لتحديث رقم الواتساب أو الإيميل بدل تكراره هون كمان) */
    methods: [
      { type: "whatsapp", title: { ar: "تواصل عبر واتساب", en: "Message me on WhatsApp" }, description: { ar: "ابدأ محادثة مباشرة لمشاركة فكرتك وتفاصيل مشروعك.", en: "Start a direct conversation and share your idea and project details." } },
      { type: "email", title: { ar: "البريد الإلكتروني", en: "Email" }, description: { ar: "أرسل تفاصيل أكثر أو أرفق ملفات مشروعك.", en: "Share more details or attach files related to your project." } }
    ],
    processHeading: { ar: "<span class='section-kicker'>كيف نبدأ:</span> خطوة بسيطة تفصل فكرتك عن التنفيذ", en: "<span class='section-kicker'>How we work:</span> Idea to launch" },
    processParagraph: { ar: "نقاش واضح يساعدنا على فهم احتياجك ورسم اتجاه مناسب.", en: "A clear conversation helps us find the right direction." },
    process: [
      { num: "01", title: { ar: "شارك فكرتك", en: "Share your idea" }, description: { ar: "أرسل رسالة مختصرة عن مشروعك والنتيجة التي تطمح إليها.", en: "Send a short message about your project and the result you're aiming for." } },
      { num: "02", title: { ar: "نحدد احتياجك", en: "Define what you need" }, description: { ar: "نناقش التفاصيل والجمهور والاتجاه الأنسب للعمل.", en: "We discuss the details, audience and the best direction for the work." } },
      { num: "03", title: { ar: "نبدأ بخطة واضحة", en: "Set a clear plan" }, description: { ar: "نتفق على نطاق العمل والخطوة التالية قبل التنفيذ.", en: "We agree on the scope and next step before execution." } }
    ]
  }

};

// Curated social-media campaign portfolio: the original designs remain in
// assets/Designs/social media designs, while these optimized copies are served
// directly in the gallery and lightbox.
const socialGallerySourceOrder = ["02","04","03","05","06","07","09","10","08","11","13","12","14","15","16","17","19","18","20","21","22","23","24","01","32","33","34","25","26","27","28","29","31","30"];
SITE_DATA.work.social.gallery = socialGallerySourceOrder.map((source, index) => {
  const number = String(index + 1).padStart(2, "0");
  const label = "Social media design " + number;
  return {
    number,
    title: { ar: label, en: label },
    description: { ar: "", en: "" },
    image: "assets/gallery/social/" + source + ".jpg?v=social-portfolio-ordered-20261026-1"
  };
});
