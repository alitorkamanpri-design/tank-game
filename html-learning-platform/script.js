// ==========================================
// 1. داده‌های کامل پلتفرم (Database)
// ==========================================

// داده‌های تگ‌های HTML (شامل 70+ تگ در دسته‌بندی‌های مختلف)
const tagsDatabase = [
  {
    category: "متن (Text)",
    id: "cat-text",
    tags: [
      {
        name: "h1 تا h6",
        desc: "تگ‌های تیتر (Heading) برای ایجاد عناوین استفاده می‌شوند. تگ h1 مهم‌ترین و h6 کم‌اهمیت‌ترین عنوان است.",
        usage:
          "جهت ساختاردهی متنی و سئو. در هر صفحه ترجیحاً یک h1 داشته باشید.",
        snippet:
          "<h1>عنوان اصلی سایت</h1>\n<h2>عنوان بخش اول</h2>\n<h3>عنوان زیربخش</h3>",
      },
      {
        name: "p",
        desc: "پاراگراف (Paragraph) برای نمایش بلوک‌های متنی استاندارد.",
        usage: "متن‌های طولانی و توضیحات درون این تگ قرار می‌گیرند.",
        snippet: "<p>این یک پاراگراف ساده در HTML است.</p>",
      },
      {
        name: "span",
        desc: "یک ظرف درون‌خطی (Inline) برای گروه‌بندی بخش‌های کوچکی از متن.",
        usage:
          "معمولاً برای اعمال استایل (CSS) روی یک کلمه خاص استفاده می‌شود.",
        snippet: '<p>این کلمه <span style="color: red;">قرمز</span> است.</p>',
      },
      {
        name: "strong",
        desc: "متن را با اهمیت بالا (Bold) نشان می‌دهد.",
        usage: "برای کلمات کلیدی و مهم درون متن.",
        snippet: "<p>توجه: این یک پیغام <strong>بسیار مهم</strong> است.</p>",
      },
      {
        name: "em",
        desc: "متن را به صورت تاکیدی (Italic) نشان می‌دهد.",
        usage: "برای تاکید لحن روی بخشی از جمله.",
        snippet: "<p>من <em>واقعاً</em> به برنامه‌نویسی علاقه دارم.</p>",
      },
      {
        name: "mark",
        desc: "متن را هایلایت (برجسته) می‌کند.",
        usage: "برای نشانه‌گذاری بخش‌هایی از متن مانند مارکر کشیدن.",
        snippet: "<p>در این جمله کلمه <mark>HTML</mark> هایلایت شده است.</p>",
      },
      {
        name: "small",
        desc: "اندازه متن را کوچکتر از حالت عادی نمایش می‌دهد.",
        usage: "برای قوانین کپی‌رایت یا متن‌های حاشیه‌ای.",
        snippet:
          "<p>قیمت محصول: ۱۰۰ دلار <small>(بدون احتساب مالیات)</small></p>",
      },
      {
        name: "del",
        desc: "نشان می‌دهد که یک متن حذف شده است (روی آن خط کشیده می‌شود).",
        usage: "برای نمایش قیمت‌های تخفیف خورده یا ویرایش‌های متن.",
        snippet:
          "<p>قیمت قبلی: <del>۵۰۰ هزار تومان</del> - قیمت جدید: ۴۰۰ هزار تومان</p>",
      },
      {
        name: "ins",
        desc: "نشان می‌دهد متنی جدیداً اضافه شده است (زیر آن خط کشیده می‌شود).",
        usage: "اغلب همراه با del استفاده می‌شود.",
        snippet: "<p>متن <del>قدیمی</del> <ins>جدید</ins></p>",
      },
      {
        name: "sub",
        desc: "متن را به صورت زیرنویس (Subscript) نمایش می‌دهد.",
        usage: "برای فرمول‌های شیمیایی مثل H2O.",
        snippet: "<p>فرمول آب: H<sub>2</sub>O</p>",
      },
      {
        name: "sup",
        desc: "متن را به صورت بالانویس (Superscript) نمایش می‌دهد.",
        usage: "برای توان در ریاضی یا پاورقی.",
        snippet: "<p>ایکس به توان دو: X<sup>2</sup></p>",
      },
      {
        name: "br",
        desc: "یک شکست خط (Line Break) ایجاد می‌کند.",
        usage: "برای رفتن به خط بعدی بدون ایجاد پاراگراف جدید.",
        snippet: "<p>خط اول<br>خط دوم</p>",
      },
      {
        name: "hr",
        desc: "یک خط افقی (Horizontal Rule) رسم می‌کند.",
        usage: "برای جداسازی بخش‌های مختلف محتوا.",
        snippet: "<p>بخش اول</p>\n<hr>\n<p>بخش دوم</p>",
      },
    ],
  },
  {
    category: "لینک‌ها (Links)",
    id: "cat-links",
    tags: [
      {
        name: "a",
        desc: "تگ Anchor (لینک) برای ارجاع به صفحات دیگر یا بخش‌هایی از همان صفحه.",
        usage: "ویژگی href آدرس مقصد را مشخص می‌کند.",
        snippet:
          '<a href="https://google.com" target="_blank">ورود به گوگل</a>',
      },
      {
        name: "nav",
        desc: "بخش ناوبری (Navigation) سایت را مشخص می‌کند.",
        usage: "برای دربرگرفتن لینک‌های اصلی منوی سایت.",
        snippet:
          '<nav>\n  <a href="/home">خانه</a> |\n  <a href="/about">درباره ما</a>\n</nav>',
      },
    ],
  },
  {
    category: "لیست‌ها (Lists)",
    id: "cat-lists",
    tags: [
      {
        name: "ul",
        desc: "لیست نامرتب (Unordered List) با بولت‌های نقطه‌ای.",
        usage: "برای لیست‌هایی که ترتیب آن‌ها مهم نیست.",
        snippet: "<ul>\n  <li>سیب</li>\n  <li>پرتقال</li>\n</ul>",
      },
      {
        name: "ol",
        desc: "لیست مرتب (Ordered List) با اعداد.",
        usage: "برای دستورالعمل‌ها یا لیست‌های دارای اولویت.",
        snippet: "<ol>\n  <li>مرحله اول</li>\n  <li>مرحله دوم</li>\n</ol>",
      },
      {
        name: "li",
        desc: "آیتم لیست (List Item).",
        usage: "همیشه درون تگ‌های ul، ol یا menu قرار می‌گیرد.",
        snippet: "<ul>\n  <li>آیتم من</li>\n</ul>",
      },
      {
        name: "dl, dt, dd",
        desc: "لیست توضیحی (Description List). dl ظرف اصلی، dt عنوان و dd توضیح آن است.",
        usage: "برای ساخت لغت‌نامه یا پرسش و پاسخ.",
        snippet:
          "<dl>\n  <dt>HTML</dt>\n  <dd>زبان نشانه‌گذاری ابرمتن</dd>\n  <dt>CSS</dt>\n  <dd>زبان استایل‌دهی</dd>\n</dl>",
      },
    ],
  },
  {
    category: "تصاویر و رسانه (Media)",
    id: "cat-media",
    tags: [
      {
        name: "img",
        desc: "برای نمایش تصویر استفاده می‌شود.",
        usage:
          "تگ خودبسته است و ویژگی src مسیر عکس و alt متن جایگزین را تعیین می‌کند.",
        snippet: '<img src="https://picsum.photos/200" alt="تصویر تصادفی">',
      },
      {
        name: "audio",
        desc: "برای پخش فایل‌های صوتی.",
        usage: "استفاده از ویژگی controls دکمه‌های پخش را اضافه می‌کند.",
        snippet:
          '<audio controls>\n  <source src="audio.mp3" type="audio/mpeg">\n  مرورگر شما از صدا پشتیبانی نمی‌کند.\n</audio>',
      },
      {
        name: "video",
        desc: "برای پخش فایل‌های ویدیویی.",
        usage: "می‌توان ابعاد آن را با width و height مشخص کرد.",
        snippet:
          '<video width="320" height="240" controls>\n  <source src="movie.mp4" type="video/mp4">\n  مرورگر شما ویدیو را پشتیبانی نمی‌کند.\n</video>',
      },
      {
        name: "figure & figcaption",
        desc: "برای گروه‌بندی یک رسانه (مثل عکس) همراه با کپشن یا توضیحات آن.",
        usage: "معنای بهتری برای موتورهای جستجو فراهم می‌کند.",
        snippet:
          '<figure>\n  <img src="https://picsum.photos/150" alt="طبیعت">\n  <figcaption>تصویر شماره ۱: طبیعت زیبا</figcaption>\n</figure>',
      },
    ],
  },
  {
    category: "جدول‌ها (Tables)",
    id: "cat-tables",
    tags: [
      {
        name: "table",
        desc: "ظرف اصلی برای ایجاد جدول.",
        usage: "همراه با سایر تگ‌های جدول استفاده می‌شود.",
        snippet:
          '<table border="1">\n  <tr>\n    <th>نام</th>\n    <th>سن</th>\n  </tr>\n  <tr>\n    <td>علی</td>\n    <td>۲۵</td>\n  </tr>\n</table>',
      },
      {
        name: "tr, th, td",
        desc: "tr برای ایجاد سطر (Row)، th برای سلول عنوان (Header) و td برای سلول داده (Data).",
        usage: "برای ساختار شبکه‌ای جدول.",
        snippet:
          '<table border="1">\n  <tr>\n    <th>محصول</th>\n  </tr>\n  <tr>\n    <td>لپ‌تاپ</td>\n  </tr>\n</table>',
      },
      {
        name: "thead, tbody, tfoot",
        desc: "برای بخش‌بندی معنایی جدول به سربرگ، بدنه اصلی و پاصفحه.",
        usage: "در جداول بزرگ و پیچیده مفید است.",
        snippet:
          '<table border="1">\n  <thead>\n    <tr><th>عنوان</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>داده</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><td>مجموع</td></tr>\n  </tfoot>\n</table>',
      },
      {
        name: "caption",
        desc: "عنوان یا توضیح کوتاهی برای جدول تعریف می‌کند.",
        usage: "باید بلافاصله بعد از تگ table قرار گیرد.",
        snippet:
          '<table border="1">\n  <caption>لیست نمرات دانش‌آموزان</caption>\n  <tr><td>ریاضی</td><td>۲۰</td></tr>\n</table>',
      },
    ],
  },
  {
    category: "فرم‌ها (Forms)",
    id: "cat-forms",
    tags: [
      {
        name: "form",
        desc: "ظرف اصلی برای جمع‌آوری اطلاعات از کاربر.",
        usage: "ویژگی action مقصد ارسال داده‌ها را مشخص می‌کند.",
        snippet:
          '<form action="/submit">\n  <input type="text" placeholder="نام">\n  <button type="submit">ارسال</button>\n</form>',
      },
      {
        name: "input",
        desc: "فیلد ورودی داده با انواع مختلف (text, password, email, radio, checkbox, etc).",
        usage: "پرکاربردترین تگ در فرم‌ها.",
        snippet:
          '<input type="text" placeholder="نام کاربری">\n<input type="password" placeholder="رمز عبور">\n<input type="color">',
      },
      {
        name: "textarea",
        desc: "یک فیلد متنی چندخطی برای دریافت پیام‌های طولانی.",
        usage: "برای فرم‌های تماس یا ارسال نظرات.",
        snippet:
          '<textarea rows="4" cols="30" placeholder="پیام خود را بنویسید..."></textarea>',
      },
      {
        name: "select & option",
        desc: "لیست کشویی (Dropdown) برای انتخاب یک یا چند گزینه.",
        usage: "select ظرف اصلی و option گزینه‌ها هستند.",
        snippet:
          '<select>\n  <option value="tehran">تهران</option>\n  <option value="shiraz">شیراز</option>\n  <option value="isfahan">اصفهان</option>\n</select>',
      },
      {
        name: "label",
        desc: "برچسب متنی برای عناصر فرم.",
        usage:
          "اتصال label به input با استفاده از ویژگی for (برابر با id ورودی) باعث بهبود دسترسی‌پذیری می‌شود.",
        snippet:
          '<label for="age">سن شما:</label>\n<input type="number" id="age" name="age">',
      },
      {
        name: "button",
        desc: "دکمه قابل کلیک.",
        usage: "برای ارسال فرم (submit) یا اجرای دستورات جاوااسکریپت.",
        snippet: '<button type="button">روی من کلیک کن</button>',
      },
      {
        name: "fieldset & legend",
        desc: "برای گروه‌بندی فیلدهای مرتبط در یک فرم و قرار دادن عنوان برای آن‌ها.",
        usage: "فرم‌های طولانی را مرتب می‌کند.",
        snippet:
          '<fieldset>\n  <legend>اطلاعات شخصی</legend>\n  نام: <input type="text">\n</fieldset>',
      },
    ],
  },
  {
    category: "ساختار صفحه (Semantic Layout)",
    id: "cat-layout",
    tags: [
      {
        name: "header",
        desc: "هدر یا بخش بالایی یک صفحه یا مقاله.",
        usage: "معمولاً شامل لوگو، عنوان و منوی اصلی است.",
        snippet: "<header>\n  <h1>وب‌سایت من</h1>\n</header>",
      },
      {
        name: "main",
        desc: "محتوای اصلی و منحصر‌به‌فرد یک صفحه را مشخص می‌کند.",
        usage: "فقط یک تگ main در هر صفحه باید وجود داشته باشد.",
        snippet:
          "<main>\n  <h2>خوش آمدید</h2>\n  <p>این محتوای اصلی سایت است.</p>\n</main>",
      },
      {
        name: "footer",
        desc: "پاصفحه یا فوتر یک سند یا بخش.",
        usage: "شامل اطلاعات کپی‌رایت، لینک‌های مفید و اطلاعات تماس.",
        snippet: "<footer>\n  <p>تمامی حقوق محفوظ است © ۲۰۲۶</p>\n</footer>",
      },
      {
        name: "section",
        desc: "یک بخش مستقل از محتوا که معمولاً دارای عنوان است.",
        usage: "برای تقسیم صفحه به قسمت‌های معنایی.",
        snippet:
          "<section>\n  <h2>بخش اخبار</h2>\n  <p>جدیدترین اخبار در اینجا قرار می‌گیرد.</p>\n</section>",
      },
      {
        name: "article",
        desc: "یک محتوای کاملاً مستقل و قابل توزیع (مثل یک پست وبلاگ).",
        usage: "در سایت‌های خبری و وبلاگ‌ها بسیار کاربردی است.",
        snippet:
          "<article>\n  <h2>آموزش HTML</h2>\n  <p>امروز یاد می‌گیریم چگونه سایت بسازیم.</p>\n</article>",
      },
      {
        name: "aside",
        desc: "محتوای حاشیه‌ای و جانبی نسبت به محتوای اصلی.",
        usage: "مانند سایدبار، تبلیغات یا لینک‌های مرتبط.",
        snippet:
          '<aside>\n  <h3>لینک‌های مرتبط</h3>\n  <ul><li><a href="#">مقاله ۱</a></li></ul>\n</aside>',
      },
      {
        name: "div",
        desc: "یک ظرف بلوکی عمومی بدون معنای خاص.",
        usage:
          "برای ساختاردهی و استایل‌دهی (CSS) یا گروه‌بندی عناصر استفاده می‌شود.",
        snippet:
          '<div style="background: lightblue; padding: 10px;">\n  این یک بلوک div است.\n</div>',
      },
    ],
  },
  {
    category: "متادیتا (Metadata)",
    id: "cat-metadata",
    tags: [
      {
        name: "title",
        desc: "عنوان صفحه را مشخص می‌کند که در تب مرورگر نمایش داده می‌شود.",
        usage: "برای سئو حیاتی است و حتماً باید داخل تگ head باشد.",
        snippet:
          "<!-- این کد در خروجی قابل مشاهده نیست زیرا مربوط به تب مرورگر است -->\n<title>صفحه درباره ما</title>\n<p>به تب مرورگر نگاه کنید!</p>",
      },
      {
        name: "meta",
        desc: "اطلاعاتی درباره داده‌ها (متا دیتا) مانند کاراکترسِت، توضیحات سئو و تنظیمات ریسپانسیو.",
        usage: "داخل تگ head قرار می‌گیرد.",
        snippet:
          '<meta charset="UTF-8">\n<meta name="description" content="آموزش برنامه نویسی">\n<p>تگ‌های متا در پس‌زمینه (Head) عمل می‌کنند.</p>',
      },
      {
        name: "link",
        desc: "برای اتصال اسناد خارجی (مانند فایل CSS) به صفحه.",
        usage: "داخل تگ head استفاده می‌شود.",
        snippet:
          '<link rel="stylesheet" href="style.css">\n<p>تگ link فایل‌های خارجی را متصل می‌کند.</p>',
      },
      {
        name: "style",
        desc: "برای نوشتن کدهای CSS به صورت مستقیم (درون‌سندی).",
        usage: "توصیه می‌شود در تگ head باشد.",
        snippet:
          '<style>\n  .red-text { color: red; font-weight: bold; }\n</style>\n<p class="red-text">این متن با CSS قرمز شده است.</p>',
      },
    ],
  },
  {
    category: "اسکریپت‌ها (Scripts)",
    id: "cat-scripts",
    tags: [
      {
        name: "script",
        desc: "برای تعبیه یا ارجاع به کدهای جاوااسکریپت.",
        usage: "جهت پویایی بخشیدن به صفحه استفاده می‌شود.",
        snippet:
          "<button id=\"myBtn\">کلیک کن</button>\n<script>\n  document.getElementById('myBtn').onclick = function() {\n    alert('سلام دنیا!');\n  }\n</script>",
      },
      {
        name: "noscript",
        desc: "محتوایی که در صورت غیرفعال بودن جاوااسکریپت در مرورگر نمایش داده می‌شود.",
        usage: "برای اطلاع‌رسانی به کاربرانی که JS را بسته‌اند.",
        snippet:
          '<noscript>\n  <p style="color: red;">لطفا جاوااسکریپت مرورگر خود را فعال کنید.</p>\n</noscript>\n<p>اگر JS فعال باشد، تگ بالا نمایش داده نمی‌شود.</p>',
      },
    ],
  },
  {
    category: "متفرقه (Misc)",
    id: "cat-misc",
    tags: [
      {
        name: "iframe",
        desc: "برای نمایش یک صفحه وب دیگر در داخل صفحه فعلی.",
        usage: "برای درج نقشه گوگل، ویدیوهای یوتیوب یا سایت‌های دیگر.",
        snippet:
          '<iframe src="https://example.com" width="300" height="200"></iframe>',
      },
      {
        name: "details & summary",
        desc: "یک ویجت کشویی (آکاردئون) بومی HTML ایجاد می‌کند.",
        usage: "برای ساخت بخش پرسش و پاسخ (FAQ) بدون نیاز به JS.",
        snippet:
          "<details>\n  <summary>برای دیدن جزئیات کلیک کنید</summary>\n  <p>این متن مخفی بود که حالا نمایش داده می‌شود.</p>\n</details>",
      },
      {
        name: "dialog",
        desc: "یک پنجره مودال یا دیالوگ پاپ‌آپ ایجاد می‌کند.",
        usage: "برای نمایش پیام‌های مهم روی صفحه.",
        snippet:
          "<dialog open>\n  <p>این یک پنجره دیالوگ بومی است!</p>\n  <button>بستن</button>\n</dialog>",
      },
      {
        name: "progress",
        desc: "نوار پیشرفت برای نمایش میزان تکمیل یک کار (مثل دانلود).",
        usage: "ویژگی value مقدار فعلی و max مقدار کل را مشخص می‌کند.",
        snippet:
          '<label>درصد دانلود: </label>\n<progress value="70" max="100">70%</progress>',
      },
      {
        name: "meter",
        desc: "برای نمایش مقداری در یک بازه مشخص (مانند میزان پر بودن حافظه یا قدرت رمزعبور).",
        usage: "متفاوت از progress است و برای کارهای در حال پیشرفت نیست.",
        snippet:
          '<label>فضای دیسک: </label>\n<meter value="0.6" min="0" max="1">60%</meter>',
      },
    ],
  },
];

// داده‌های تمرین‌ها
const exercisesDatabase = [
  {
    instruction:
      "تمرین ۱: یک عنوان اصلی (h1) با متن «سلام HTML» و یک پاراگراف (p) ایجاد کنید.",
    template: "<!-- کد خود را اینجا بنویسید -->\n\n\n",
    expected: "باید یک متن درشت و یک متن معمولی زیر آن نمایش داده شود.",
  },
  {
    instruction:
      "تمرین ۲: یک لیست نامرتب (ul) از سه رنگ مورد علاقه خود بسازید.",
    template: "<!-- لیست خود را بسازید -->\n<ul>\n  \n</ul>",
    expected: "سه آیتم بولت‌دار باید دیده شود.",
  },
  {
    instruction:
      "تمرین ۳: یک فرم ساده شامل یک فیلد متنی برای نام و یک دکمه ارسال بسازید.",
    template:
      "<form>\n  <!-- ورودی و دکمه را اینجا اضافه کنید -->\n  \n</form>",
    expected: "یک باکس متنی و یک دکمه در کنار هم.",
  },
];

// کد پیش‌فرض برای آزمایشگاه
const defaultPlaygroundCode = `<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Tahoma, sans-serif; direction: rtl; padding: 20px; }
  h1 { color: #2563eb; }
  .box { background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; }
</style>
</head>
<body>

<h1>سلام HTML!</h1>
<div class="box">
  <p>این آزمایشگاه شماست. کدها را تغییر دهید و روی <strong>اجرای کد</strong> کلیک کنید.</p>
</div>

</body>
</html>`;

// ==========================================
// 2. توابع کمکی (Utilities)
// ==========================================

// تبدیل کاراکترهای خاص HTML برای نمایش در بلوک کد
function escapeHTML(str) {
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[tag] || tag,
  );
}

// تولید قالب کامل سند HTML برای کدهای نمونه
function wrapCodeInDocument(snippet) {
  return `<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="UTF-8">
<title>مثال تگ</title>
</head>
<body>

${snippet}

</body>
</html>`;
}

// ==========================================
// 3. رندر کردن رابط کاربری (UI Rendering)
// ==========================================

// ساخت منوی کناری و محتوای اصلی
function initializeContent() {
  const sidebarNav = document.getElementById("sidebar-nav");
  const referenceSection = document.getElementById("reference-section");

  // اضافه کردن عنوان بخش اصلی
  referenceSection.innerHTML = `
        <h2 class="section-title">آموزش تگ‌های HTML</h2>
        <p class="section-desc">در این بخش می‌توانید تگ‌های مختلف، کاربرد آن‌ها و پیش‌نمایش زنده را مشاهده کنید.</p>
    `;

  tagsDatabase.forEach((categoryData) => {
    // --- ساخت منوی کناری ---
    const li = document.createElement("li");
    li.className = "category-item";

    const catTitle = document.createElement("span");
    catTitle.className = "category-title";
    catTitle.textContent = categoryData.category;

    const tagUl = document.createElement("ul");
    tagUl.className = "tag-list";

    // باز و بسته شدن دسته‌بندی
    catTitle.onclick = () => {
      tagUl.classList.toggle("active");
    };

    // --- ساخت بخش محتوای متناظر ---
    const catBlock = document.createElement("div");
    catBlock.className = "category-block";
    catBlock.id = categoryData.id;
    catBlock.innerHTML = `<h3 class="category-block-title">${categoryData.category}</h3>`;

    categoryData.tags.forEach((tag) => {
      // ساخت لینک در منو
      const tagLi = document.createElement("li");
      const tagA = document.createElement("a");
      tagA.className = "tag-link";
      tagA.href = `#tag-${tag.name.replace(/[^a-zA-Z0-9]/g, "")}`;
      tagA.textContent = `<${tag.name}>`;
      tagA.onclick = (e) => {
        e.preventDefault();
        document
          .getElementById(`tag-${tag.name.replace(/[^a-zA-Z0-9]/g, "")}`)
          .scrollIntoView({ behavior: "smooth" });
        // در موبایل بعد از کلیک منو بسته شود
        if (window.innerWidth <= 768) {
          document.getElementById("sidebar").classList.remove("open");
        }
      };
      tagLi.appendChild(tagA);
      tagUl.appendChild(tagLi);

      // ساخت کارت آموزش تگ
      const fullCodeString = wrapCodeInDocument(tag.snippet);
      const escapedCode = escapeHTML(fullCodeString);

      const article = document.createElement("article");
      article.className = "tag-card search-target";
      article.id = `tag-${tag.name.replace(/[^a-zA-Z0-9]/g, "")}`;
      article.setAttribute(
        "data-search",
        `${tag.name} ${categoryData.category} ${tag.desc}`.toLowerCase(),
      );

      article.innerHTML = `
                <h3>&lt;${tag.name}&gt;</h3>
                <p class="tag-desc">${tag.desc}</p>
                <div class="tag-meta">
                    <strong>کاربرد:</strong> ${tag.usage}
                </div>
                <div class="code-output-container">
                    <div class="code-wrapper">
                        <div class="code-header">
                            <div class="window-dots">
                                <span class="dot red"></span>
                                <span class="dot yellow"></span>
                                <span class="dot green"></span>
                            </div>
                            <span class="lang-label">HTML</span>
                            <button class="copy-btn" onclick="copyCode(this)">کپی</button>
                        </div>
                        <div class="code-body">
                            <pre><code>${escapedCode}</code></pre>
                        </div>
                    </div>
                    <div class="output-preview">
                        <div class="preview-header">پیش‌نمایش خروجی</div>
                        <div class="preview-body" dir="rtl">
                            ${tag.snippet}
                        </div>
                    </div>
                </div>
            `;
      catBlock.appendChild(article);
    });

    li.appendChild(catTitle);
    li.appendChild(tagUl);
    sidebarNav.appendChild(li);
    referenceSection.appendChild(catBlock);
  });

  // باز کردن اولین دسته‌بندی به صورت پیش‌فرض
  const firstTagList = document.querySelector(".tag-list");
  if (firstTagList) firstTagList.classList.add("active");
}

// ساخت بخش تمرین‌ها
function initializeExercises() {
  const practiceContainer = document.getElementById("practice-container");

  exercisesDatabase.forEach((ex, index) => {
    const fullTemplateString = wrapCodeInDocument(ex.template);
    const escapedCode = escapeHTML(fullTemplateString);

    const div = document.createElement("div");
    div.className = "exercise-card";
    div.innerHTML = `
            <div class="exercise-inst">${ex.instruction}</div>
            <div class="code-wrapper" style="margin-top:1rem;">
                <div class="code-header">
                    <div class="window-dots">
                        <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                    </div>
                    <span class="lang-label">HTML Template</span>
                    <button class="copy-btn" onclick="copyCode(this)">کپی قالب</button>
                </div>
                <div class="code-body">
                    <pre><code>${escapedCode}</code></pre>
                </div>
            </div>
            <div class="exercise-expected">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                خروجی مورد انتظار: ${ex.expected}
            </div>
            <button class="btn primary" style="margin-top:1rem; font-size:0.9rem" onclick="transferToPlayground('${encodeURIComponent(fullTemplateString)}')">حل در آزمایشگاه</button>
        `;
    practiceContainer.appendChild(div);
  });
}

// راه‌اندازی آزمایشگاه
function initializePlayground() {
  const editor = document.getElementById("playground-editor");
  const btnRun = document.getElementById("btn-run-playground");
  const btnReset = document.getElementById("btn-reset-playground");

  editor.value = defaultPlaygroundCode;
  runPlaygroundCode();

  btnRun.addEventListener("click", runPlaygroundCode);
  btnReset.addEventListener("click", () => {
    editor.value = defaultPlaygroundCode;
    runPlaygroundCode();
  });
}

// اجرای کد آزمایشگاه در iframe
function runPlaygroundCode() {
  const code = document.getElementById("playground-editor").value;
  const iframe = document.getElementById("playground-preview");
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  iframeDoc.open();
  iframeDoc.write(code);
  iframeDoc.close();
}

// انتقال کد تمرین به آزمایشگاه
window.transferToPlayground = function (encodedCode) {
  const code = decodeURIComponent(encodedCode);
  const editor = document.getElementById("playground-editor");
  editor.value = code;
  scrollToSection("playground-section");
  runPlaygroundCode();
};

// ==========================================
// 4. تعاملات (Interactions)
// ==========================================

// اسکرول نرم به بخش‌ها
window.scrollToSection = function (sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

// کپی کردن کد در کلیپ‌بورد
window.copyCode = function (buttonElement) {
  const codeBlock =
    buttonElement.parentElement.nextElementSibling.querySelector("code");
  // چون در کدها از &lt; استفاده کردیم، textContent مقدار واقعی را برمی‌گرداند
  const textToCopy = codeBlock.textContent;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = buttonElement.textContent;
    buttonElement.textContent = "کپی شد!";
    buttonElement.style.background = "#16a34a";
    setTimeout(() => {
      buttonElement.textContent = originalText;
      buttonElement.style.background = "rgba(255, 255, 255, 0.1)";
    }, 2000);
  });
};

// جستجوی زنده (Live Search)
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const targets = document.querySelectorAll(".search-target");
    const categories = document.querySelectorAll(".category-block");

    targets.forEach((card) => {
      const searchData = card.getAttribute("data-search");
      if (searchData.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // مخفی کردن دسته‌بندی‌هایی که هیچ تگ قابل نمایشی ندارند
    categories.forEach((cat) => {
      const visibleCards = cat.querySelectorAll(
        '.tag-card[style="display: block;"], .tag-card:not([style*="display: none"])',
      );
      if (visibleCards.length === 0) {
        cat.style.display = "none";
      } else {
        cat.style.display = "block";
      }
    });

    // اگر جستجو خالی بود، همه چیز را نمایش بده
    if (query === "") {
      targets.forEach((card) => (card.style.display = "block"));
      categories.forEach((cat) => (cat.style.display = "block"));
    }
  });
}

// منوی موبایل
function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const sidebar = document.getElementById("sidebar");

  btn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // بستن سایدبار با کلیک روی فضای خالی در موبایل
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && e.target !== btn) {
        sidebar.classList.remove("open");
      }
    }
  });
}

// ==========================================
// 5. مقداردهی اولیه (Initialization)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initializeContent();
  initializeExercises();
  initializePlayground();
  setupSearch();
  setupMobileMenu();
});
