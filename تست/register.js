// گرفتن المان‌ها
const form = document.querySelector("form");
const modal = document.getElementById("successModal");
const closeBtn = document.getElementById("closeModal");

// وقتی فرم سابمیت میشه
form.addEventListener("submit", function (e) {
  e.preventDefault(); // جلوگیری از ارسال واقعی فرم

  // بررسی اعتبارسنجی مرورگر
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // نمایش مودال
  modal.classList.add("show");
  document.body.style.overflow = "hidden"; // قفل اسکرول
});

// بستن مودال با دکمه
closeBtn.addEventListener("click", function () {
  modal.classList.remove("show");
  document.body.style.overflow = "";
  form.reset(); // پاک کردن فرم
});

// بستن مودال با کلیک روی پس‌زمینه
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeBtn.click();
  }
});

// بستن مودال با کلید Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("show")) {
    closeBtn.click();
  }
});
