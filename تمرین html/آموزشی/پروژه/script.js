// script.js

document.addEventListener("DOMContentLoaded", () => {
  // --- کپی کردن کد ---
  const copyButtons = document.querySelectorAll(".copy-button");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const codeElement = document.querySelector(targetId);
      if (codeElement) {
        // استخراج متن از تگ <pre><code>
        const codeText = codeElement.innerText;
        navigator.clipboard
          .writeText(codeText)
          .then(() => {
            button.textContent = "کپی شد!";
            setTimeout(() => {
              button.textContent = "کپی";
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
            alert("خطا در کپی کردن کد.");
          });
      }
    });
  });

  // --- اجرای آزمایشگاه (Playground) ---
  const runButton = document.getElementById("run-button");
  const editor = document.getElementById("playground-editor");
  const iframe = document.getElementById("playground-iframe");
  const iframeDocument =
    iframe.contentDocument || iframe.contentWindow.document;

  function runPlayground() {
    const htmlCode = editor.innerText;
    iframeDocument.open();
    iframeDocument.write(`
            <!DOCTYPE html>
            <html lang="fa" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>Playground Output</title>
                <style>
                    /* استایل‌های پایه برای نمایش بهتر در iframe */
                    body { font-family: 'Vazirmatn', sans-serif; margin: 20px; background-color: #fff; }
                    code { font-family: 'Courier New', monospace; background-color: #eee; padding: 2px 5px; border-radius: 3px;}
                    img { max-width: 100%; height: auto; }
                </style>
            </head>
            <body>
                ${htmlCode}
            </body>
            </html>
        `);
    iframeDocument.close();
  }

  runButton.addEventListener("click", runPlayground);

  // اجرای اولیه در بارگذاری صفحه
  runPlayground();

  // --- جستجو و پیمایش سایدبار ---
  const searchInput = document.getElementById("tag-search");
  const categoryList = document.getElementById("category-list");
  const allTagSections = document.querySelectorAll(".tag-section");

  // ایجاد آیتم‌های دسته بندی در سایدبار (این بخش باید با داده‌های واقعی پر شود)
  // در اینجا فقط یک نمونه اولیه داریم
  const categories = {
    متن: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "span",
      "strong",
      "em",
      "code",
      "pre",
      "blockquote",
    ],
    لینک‌ها: ["a"],
    لیست‌ها: ["ul", "ol", "li"],
    جدول: ["table", "thead", "tbody", "tr", "th", "td", "caption"],
    رسانه: ["img", "audio", "video", "source"],
    فرم: [
      "form",
      "input",
      "textarea",
      "button",
      "select",
      "option",
      "label",
      "fieldset",
      "legend",
    ],
    معنایی: [
      "header",
      "nav",
      "main",
      "article",
      "section",
      "aside",
      "footer",
      "figure",
      "figcaption",
    ],
    دیگر: [
      "div",
      "span",
      "br",
      "hr",
      "style",
      "script",
      "meta",
      "link",
      "base",
      "head",
      "html",
      "body",
      "title",
    ],
  };

  function populateSidebar() {
    const sidebarList = document.getElementById("category-list");
    sidebarList.innerHTML = ""; // پاک کردن محتوای فعلی

    Object.keys(categories).forEach((categoryName) => {
      const li = document.createElement("li");
      li.textContent = categoryName;
      li.dataset.category = categoryName; // ذخیره نام دسته برای فیلتر
      sidebarList.appendChild(li);
    });

    // افزودن event listener به آیتم‌های سایدبار
    sidebarList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const categoryName = event.target.dataset.category;
        filterByCategory(categoryName);
        // فعال کردن آیتم انتخاب شده
        document
          .querySelectorAll("#category-list li")
          .forEach((item) => item.classList.remove("active"));
        event.target.classList.add("active");
      }
    });
  }

  function filterByCategory(categoryName) {
    allTagSections.forEach((section) => {
      const tagId = section.id; // مثل 'tag-h1'
      const tagName = tagId.replace("tag-", ""); // مثل 'h1'
      let found = false;
      if (categories[categoryName].includes(tagName)) {
        found = true;
      }
      if (found) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  }

  populateSidebar(); // پر کردن سایدبار هنگام بارگذاری

  // جستجو
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    allTagSections.forEach((section) => {
      const sectionHtml = section.innerHTML.toLowerCase();
      const tagName = section.querySelector("h3 code")
        ? section.querySelector("h3 code").textContent.toLowerCase()
        : "";
      const tagDescription = section.querySelector("p")
        ? section.querySelector("p").textContent.toLowerCase()
        : "";

      if (
        tagName.includes(searchTerm) ||
        tagDescription.includes(searchTerm) ||
        sectionHtml.includes(searchTerm)
      ) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  });

  // --- پیمایش نرم (Smooth Scrolling) ---
  // این قسمت نیازمند پیاده‌سازی لینک‌ها به بخش‌های مختلف است
  // مثال: <a href="#tag-h1">رفتن به h1</a> در HTML
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // فعال کردن آیتم اول سایدبار به صورت پیش‌فرض
  if (categoryList.querySelector("li")) {
    categoryList.querySelector("li").classList.add("active");
  }
});
