window.renderCourseMarkup=function(assetPrefix=''){
  return `
    <main class="container course-main">
      <section class="course-layout" aria-labelledby="courseTitle">
        <figure class="course-portrait glass">
          <img src="${assetPrefix}assets/images/course-instructor.jpg?v=image-opt-20261026-1" alt="ثائر القُريناوي" data-alt-ar="ثائر القُريناوي" data-alt-en="Thaer AlQrenawi" decoding="async" loading="lazy">
          <span class="course-photo-shade" aria-hidden="true"></span>
          <div class="contact-photo-caption">
            <span class="contact-photo-status"><i aria-hidden="true"></i><span data-ar="دورة تدريبية وجاهية" data-en="In-person training course">دورة تدريبية وجاهية</span></span>
          </div>
        </figure>
        <div class="course-content">
          <h1 id="courseTitle"><span class="course-title-ar" lang="ar">احترف التسويق عبر منصات التواصل الاجتماعي.</span><span class="course-title-en" lang="en">Master Marketing on Social Media Platforms.</span></h1>
          <p class="course-description" data-ar="محاور عملية لإدارة حضورك على منصات التواصل والاستفادة من أدوات الذكاء الاصطناعي." data-en="Practical topics for managing your social media presence and making use of artificial intelligence tools.">محاور عملية لإدارة حضورك على منصات التواصل والاستفادة من أدوات الذكاء الاصطناعي.</p>
          <h2 class="course-topics-title" data-ar="محاور الورشة:" data-en="Workshop topics:">محاور الورشة:</h2>
          <ul class="course-topics" aria-label="محاور الورشة:" data-aria-label-ar="محاور الورشة:" data-aria-label-en="Workshop topics:">
            <li data-ar="إنشاء وإدارة صفحات فيسبوك وإنستغرام وربطهم بواتساب الأعمال." data-en="Creating and managing Facebook and Instagram pages and linking them to WhatsApp Business.">إنشاء وإدارة صفحات فيسبوك وإنستغرام وربطهم بواتساب الأعمال.</li>
            <li data-ar="إنشاء حافظة أعمال مخصصة لنشاطك التجاري عبر تطبيق Meta Business Suite وكيفية التعامل معها." data-en="Creating a business portfolio tailored to your business in Meta Business Suite and learning how to use it.">إنشاء حافظة أعمال مخصصة لنشاطك التجاري عبر تطبيق Meta Business Suite وكيفية التعامل معها.</li>
            <li data-ar="تصميم إعلاني احترافي واستخدام أدوات الذكاء الاصطناعي." data-en="Creating professional ad designs and using artificial intelligence tools.">تصميم إعلاني احترافي واستخدام أدوات الذكاء الاصطناعي.</li>
            <li data-ar="إنشاء وإدارة الحملات الإعلانية عبر منصات Meta، والوصول للجمهور الدقيق." data-en="Creating and managing ad campaigns across Meta platforms and reaching the right audience.">إنشاء وإدارة الحملات الإعلانية عبر منصات Meta، والوصول للجمهور الدقيق.</li>
          </ul>
          <div class="course-highlights">
            <section class="course-highlight course-duration" aria-label="تفاصيل مدة الدورة">
              <span class="course-highlight-label" data-ar="عدد الساعات" data-en="Duration">عدد الساعات</span>
              <div class="course-duration-value"><strong>12</strong> <span data-ar="ساعة تدريبية مكثفة." data-en="intensive training hours.">ساعة تدريبية مكثفة.</span></div>
            </section>
            <section class="course-highlight course-instructor-name" aria-label="اسم المدرب">
              <span class="course-highlight-label" data-ar="المتخصص في التسويق عبر منصات التواصل:" data-en="Social Media Marketing Specialist:">المتخصص في التسويق عبر منصات التواصل:</span>
              <strong class="course-instructor-value" data-ar="ثائر القريناوي" data-en="Thaer AlQrenawi">ثائر القريناوي</strong>
            </section>
          </div>
          <form class="course-form glass" id="courseRegistrationForm" novalidate>
            <label><span data-ar="اسم المتدرب كاملاً" data-en="Trainee's full name">اسم المتدرب كاملاً</span><input name="fullName" type="text" autocomplete="name" required minlength="3" data-placeholder-ar="اكتب اسمك الكامل" data-placeholder-en="Enter your full name" placeholder="اكتب اسمك الكامل"></label>
            <label><span data-ar="رقم الواتساب المعتمد" data-en="WhatsApp number">رقم الواتساب المعتمد</span><input name="whatsapp" type="tel" autocomplete="tel" inputmode="tel" required data-placeholder-ar="+970599000000" data-placeholder-en="+970599000000" placeholder="+970599000000"></label>
            <label><span data-ar="البريد الإلكتروني" data-en="Email address">البريد الإلكتروني</span><input name="email" type="email" autocomplete="email" required data-placeholder-ar="name@example.com" data-placeholder-en="name@example.com" placeholder="name@example.com"></label>
            <button class="course-submit" type="submit"><span data-ar="أكمل التسجيل عبر واتساب" data-en="Complete registration via WhatsApp">أكمل التسجيل عبر واتساب</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></button>
            <p class="course-form-status" id="courseFormStatus" role="status" aria-live="polite" hidden></p>
            <a class="course-whatsapp-fallback" id="courseWhatsappFallback" target="_blank" rel="noopener noreferrer" hidden><span data-ar="افتح رسالة التسجيل في واتساب" data-en="Open your registration message in WhatsApp">افتح رسالة التسجيل في واتساب</span></a>
          </form>
        </div>
      </section>
    </main>`;
};
